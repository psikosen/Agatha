//! GSAD Backend — axum + tokio
//!
//! Serves:
//! - `/api/widgets`       → widget registry
//! - `/api/health`        → health check
//! - `/api/ollama/models` → proxy to local Ollama `api/tags`
//! - Static files from `../frontend/dist` (production)

mod models;
mod routes;
mod services;

use axum::Router;
use std::net::SocketAddr;
use tower_http::cors::{Any, CorsLayer};
use tower_http::services::ServeDir;
use tower_http::trace::TraceLayer;
use tracing_subscriber::EnvFilter;

#[tokio::main]
async fn main() {
    // Initialise tracing
    tracing_subscriber::fmt()
        .with_env_filter(
            EnvFilter::try_from_default_env().unwrap_or_else(|_| EnvFilter::new("info")),
        )
        .init();

    dotenvy::dotenv().ok();

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    // Serve the frontend build when running in production
    let frontend_dir = std::env::var("FRONTEND_DIST")
        .unwrap_or_else(|_| "../frontend/dist".into());

    let app = Router::new()
        .nest("/api", routes::api_router())
        .fallback_service(ServeDir::new(&frontend_dir))
        .layer(cors)
        .layer(TraceLayer::new_for_http());

    let addr = SocketAddr::from(([0, 0, 0, 0], 3001));
    tracing::info!("GSAD backend listening on {addr}");
    tracing::info!("Serving frontend from {frontend_dir}");

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app)
        .with_graceful_shutdown(shutdown_signal())
        .await
        .unwrap();
}

async fn shutdown_signal() {
    tokio::signal::ctrl_c()
        .await
        .expect("failed to install Ctrl+C handler");
    tracing::info!("Shutdown signal received, stopping server");
}
