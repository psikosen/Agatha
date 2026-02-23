use serde::{Deserialize, Serialize};

/// Mirrors the TypeScript `WidgetDefinition` type.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WidgetDefinition {
    pub id: String,
    pub name: String,
    pub category: String,
    pub priority: u8,
    pub default_position: GridPosition,
    pub data_sources: Vec<DataSourceConfig>,
    pub features: Vec<String>,
    pub description: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GridPosition {
    pub col_start: u32,
    pub col_span: u32,
    pub row_start: u32,
    pub row_span: u32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DataSourceConfig {
    pub provider: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub endpoint: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub api_key_env_var: Option<String>,
    pub refresh_interval_ms: u64,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub fallback: Option<String>,
}

/// Cross-linking payload carried by every event.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CrossLinkPayload {
    pub event_id: String,
    pub country_code: String,
    pub severity_score: f64,
    pub timestamp: String,
    pub category_tags: Vec<String>,
}

/// Layout persistence (matches spec §9.2).
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PersistedLayout {
    pub widget_id: String,
    pub col_start: u32,
    pub col_span: u32,
    pub row_start: u32,
    pub row_span: u32,
}
