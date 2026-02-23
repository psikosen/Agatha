use axum::Json;

/// GET /api/ollama/models — proxy to local Ollama `api/tags`.
pub async fn list_models() -> Json<serde_json::Value> {
    let ollama_url = std::env::var("OLLAMA_URL")
        .unwrap_or_else(|_| "http://localhost:11434".into());
    let client = reqwest::Client::new();
    match client
        .get(format!("{ollama_url}/api/tags"))
        .send()
        .await
    {
        Ok(resp) => match resp.json::<serde_json::Value>().await {
            Ok(body) => Json(body),
            Err(e) => Json(serde_json::json!({
                "error": format!("Failed to parse Ollama response: {e}"),
                "models": []
            })),
        },
        Err(e) => Json(serde_json::json!({
            "error": format!("Ollama not reachable: {e}"),
            "models": []
        })),
    }
}
