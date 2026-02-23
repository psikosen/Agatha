use axum::{routing::get, Json, Router};

mod widgets;
mod ollama;

pub fn api_router() -> Router {
    Router::new()
        .route("/health", get(health))
        .route("/widgets", get(widgets::list_widgets))
        .route("/ollama/models", get(ollama::list_models))
}

async fn health() -> Json<serde_json::Value> {
    Json(serde_json::json!({
        "status": "ok",
        "service": "gsad-backend",
        "version": env!("CARGO_PKG_VERSION"),
    }))
}
