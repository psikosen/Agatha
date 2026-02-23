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

#[cfg(test)]
mod tests {
    use super::*;
    use axum::body::Body;
    use axum::http::{Request, StatusCode};
    use tower::ServiceExt;

    #[tokio::test]
    async fn health_returns_ok() {
        let app = api_router();
        let req = Request::builder()
            .uri("/health")
            .body(Body::empty())
            .unwrap();
        let resp = app.oneshot(req).await.unwrap();
        assert_eq!(resp.status(), StatusCode::OK);
    }

    #[tokio::test]
    async fn widgets_returns_ok() {
        let app = api_router();
        let req = Request::builder()
            .uri("/widgets")
            .body(Body::empty())
            .unwrap();
        let resp = app.oneshot(req).await.unwrap();
        assert_eq!(resp.status(), StatusCode::OK);
    }
}
