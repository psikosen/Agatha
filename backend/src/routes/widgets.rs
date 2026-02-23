use axum::Json;
use crate::services::widget_registry;

/// GET /api/widgets — returns the full widget registry.
pub async fn list_widgets() -> Json<serde_json::Value> {
    Json(serde_json::json!(widget_registry::all_widgets()))
}
