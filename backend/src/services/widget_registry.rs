//! Server-side widget registry.
//!
//! Mirrors the frontend `gridSpec.ts` so the backend can serve the
//! canonical widget list and validate layout payloads.

use crate::models::widget::{DataSourceConfig, GridPosition, WidgetDefinition};

macro_rules! widget {
    ($id:expr, $name:expr, $cat:expr, $pri:expr,
     row=$rs:expr, col=$cs:expr, cspan=$csp:expr, rspan=$rsp:expr,
     sources=[$($src:expr),* $(,)?],
     features=[$($feat:expr),* $(,)?],
     $desc:expr) => {
        WidgetDefinition {
            id: $id.into(),
            name: $name.into(),
            category: $cat.into(),
            priority: $pri,
            default_position: GridPosition {
                row_start: $rs,
                col_start: $cs,
                col_span: $csp,
                row_span: $rsp,
            },
            data_sources: vec![$($src),*],
            features: vec![$($feat.into()),*],
            description: $desc.into(),
        }
    };
}

fn src(provider: &str, refresh_ms: u64) -> DataSourceConfig {
    DataSourceConfig {
        provider: provider.into(),
        endpoint: None,
        api_key_env_var: None,
        refresh_interval_ms: refresh_ms,
        fallback: None,
    }
}

fn src_ep(provider: &str, endpoint: &str, key: Option<&str>, refresh_ms: u64) -> DataSourceConfig {
    DataSourceConfig {
        provider: provider.into(),
        endpoint: Some(endpoint.into()),
        api_key_env_var: key.map(Into::into),
        refresh_interval_ms: refresh_ms,
        fallback: None,
    }
}

pub fn all_widgets() -> Vec<WidgetDefinition> {
    vec![
        // ROW 1
        widget!("GSAD-01", "Map Module", "geospatial", 1,
            row=1, col=1, cspan=8, rspan=3,
            sources=[
                src("OpenStreetMap", 0),
                src_ep("GDELT", "https://api.gdeltproject.org/api/v2/geo/geo", None, 300_000),
                src_ep("NASA FIRMS", "https://firms.modaps.eosdis.nasa.gov/api", Some("FIRMS_MAP_KEY"), 600_000),
                src_ep("Wikidata SPARQL", "https://query.wikidata.org/sparql", None, 3_600_000),
                src_ep("adsb.lol", "https://api.adsb.lol/v2", None, 10_000),
                src_ep("aisstream.io", "wss://stream.aisstream.io/v0/stream", None, 5_000),
            ],
            features=["Interactive map", "Layer toggles sidebar", "Time filter controls", "Legend", "Global UTC timestamp"],
            "Core geospatial command module with multi-layer overlays."
        ),
        widget!("GSAD-02", "AI Insights", "ai", 1,
            row=1, col=9, cspan=2, rspan=2,
            sources=[src("Ollama (local)", 30_000)],
            features=["Data acquisition status", "AI pipeline progress", "Brief generation indicator"],
            "AI pipeline status and insight generation panel."
        ),
        widget!("GSAD-03", "Strategic Posture", "strategic", 1,
            row=1, col=11, cspan=2, rspan=2,
            sources=[
                src("GDELT", 300_000),
                src_ep("Finnhub", "https://finnhub.io/api/v1", Some("FINNHUB_API_KEY"), 60_000),
                src("NASA FIRMS", 600_000),
                src_ep("Open-Meteo", "https://api.open-meteo.com/v1", None, 900_000),
                src("Ollama (local)", 60_000),
            ],
            features=["Strategic Risk Gauge", "Trend label", "Instability Index preview"],
            "Global strategic posture gauge with AI-driven risk scoring."
        ),
        // ROW 2
        widget!("GSAD-04", "Live News", "news", 2,
            row=4, col=1, cspan=6, rspan=2,
            sources=[src_ep("GDELT", "https://api.gdeltproject.org/api/v2/doc/doc", None, 120_000)],
            features=["Region tabs", "LIVE badge", "Video thumbnails", "Source + timestamp"],
            "Real-time global news feed with regional filtering."
        ),
        widget!("GSAD-05", "Live Webcams", "webcams", 2,
            row=4, col=7, cspan=6, rspan=2,
            sources=[src("YouTube Live / Public Cams", 0)],
            features=["Multi-camera grid", "Regional filters", "Expand-on-click"],
            "Live webcam feeds from curated public sources."
        ),
        // ROW 3
        widget!("GSAD-06", "Intel Feed", "intelligence", 2,
            row=6, col=1, cspan=3, rspan=2,
            sources=[src("GDELT", 180_000)],
            features=["Conflict themes", "Cyber events", "Sanctions", "Protests"],
            "Filtered intelligence feed from GDELT themes."
        ),
        widget!("GSAD-07", "Infrastructure Cascade", "intelligence", 2,
            row=6, col=4, cspan=3, rspan=2,
            sources=[src("Wikidata SPARQL", 3_600_000), src("GDELT", 300_000)],
            features=["Cables", "Pipelines", "Ports", "Disruption events"],
            "Critical infrastructure monitoring and cascade analysis."
        ),
        widget!("GSAD-08", "World News", "news", 2,
            row=6, col=7, cspan=3, rspan=2,
            sources=[src("GDELT", 180_000)],
            features=["Regional tabs", "Country filter"],
            "Regional world news aggregation."
        ),
        widget!("GSAD-09", "Middle East Panel", "intelligence", 2,
            row=6, col=10, cspan=3, rspan=2,
            sources=[src("GDELT", 180_000), src("Ollama (local)", 300_000)],
            features=["Region-focused feed", "AI summarization"],
            "Dedicated Middle East intelligence panel with local AI summaries."
        ),
        // ROW 4
        widget!("GSAD-10", "Commodities", "markets", 2,
            row=8, col=1, cspan=3, rspan=2,
            sources=[src_ep("Finnhub", "https://finnhub.io/api/v1", Some("FINNHUB_API_KEY"), 30_000)],
            features=["Price tickers", "Sparklines", "Change indicators"],
            "Real-time commodities pricing."
        ),
        widget!("GSAD-11", "Markets (Indices)", "markets", 2,
            row=8, col=4, cspan=3, rspan=2,
            sources=[src_ep("Finnhub", "https://finnhub.io/api/v1", Some("FINNHUB_API_KEY"), 30_000)],
            features=["Index tickers", "Mini charts", "Market status badges"],
            "Global market indices tracker."
        ),
        widget!("GSAD-12", "Economic Indicators", "markets", 2,
            row=8, col=7, cspan=3, rspan=2,
            sources=[src_ep("FRED", "https://api.stlouisfed.org/fred", Some("FRED_API_KEY"), 3_600_000)],
            features=["Fed balance sheet", "Interest rates", "Macro series"],
            "Key economic indicators from FRED."
        ),
        widget!("GSAD-13", "Financial News", "markets", 2,
            row=8, col=10, cspan=3, rspan=2,
            sources=[src_ep("Finnhub", "https://finnhub.io/api/v1/news", Some("FINNHUB_API_KEY"), 120_000)],
            features=["Market headlines", "Source attribution", "Sentiment tags"],
            "Financial news feed from market sources."
        ),
        // ROW 5
        widget!("GSAD-14", "AI/ML Feed", "technology", 3,
            row=10, col=1, cspan=3, rspan=2,
            sources=[src("GDELT", 300_000), src("Ollama (local)", 600_000)],
            features=["AI topic filter", "Curation", "Ollama summaries"],
            "AI and machine learning news feed."
        ),
        widget!("GSAD-15", "Layoffs Tracker", "technology", 3,
            row=10, col=4, cspan=3, rspan=2,
            sources=[src("GDELT", 600_000)],
            features=["News-derived detection", "Entity extraction", "Layoff keywords"],
            "Layoff events detected from news via entity extraction."
        ),
        widget!("GSAD-16", "My Monitors", "technology", 2,
            row=10, col=7, cspan=3, rspan=2,
            sources=[src("GDELT", 180_000), src("Finnhub", 120_000), src("Ollama (local)", 60_000)],
            features=["Keyword alerts", "Custom RSS", "AI classification"],
            "User-defined keyword monitors with AI classification."
        ),
        widget!("GSAD-17", "Technology Panel", "technology", 3,
            row=10, col=10, cspan=3, rspan=2,
            sources=[src("GDELT", 300_000), src("Ollama (local)", 600_000)],
            features=["Cybersecurity", "Tech news", "Think-tank writeups"],
            "Cybersecurity and technology intelligence panel."
        ),
        // ROW 6
        widget!("GSAD-18", "Fires / Conflict Events", "risk", 2,
            row=12, col=1, cspan=3, rspan=2,
            sources=[
                src_ep("NASA FIRMS", "https://firms.modaps.eosdis.nasa.gov/api", Some("FIRMS_MAP_KEY"), 600_000),
                src("GDELT", 300_000),
            ],
            features=["Fire detections", "Conflict events", "Severity overlay"],
            "Active fire detections and armed conflict event monitoring."
        ),
        widget!("GSAD-19", "UNHCR Displacement", "risk", 3,
            row=12, col=4, cspan=3, rspan=2,
            sources=[src("UNHCR Open Data", 86_400_000)],
            features=["Displacement figures", "Regional breakdown", "Trend charts"],
            "UNHCR displacement data ingestion and display."
        ),
        widget!("GSAD-20", "Climate Anomalies", "risk", 3,
            row=12, col=7, cspan=3, rspan=2,
            sources=[src_ep("Open-Meteo", "https://api.open-meteo.com/v1", None, 900_000)],
            features=["Temperature anomalies", "Extreme weather", "Historical comparison"],
            "Climate anomaly tracking and weather intelligence."
        ),
        widget!("GSAD-21", "Population Exposure", "risk", 3,
            row=12, col=10, cspan=3, rspan=2,
            sources=[src("World Bank", 86_400_000)],
            features=["Population stats", "Exposure heatmap", "Severity overlay"],
            "Population exposure analysis overlaid with event severity."
        ),
        // ROW 7
        widget!("GSAD-22", "BTC ETF Tracker", "crypto", 3,
            row=14, col=1, cspan=3, rspan=2,
            sources=[src("GDELT (headline inference)", 600_000)],
            features=["ETF flow tracking", "Headline inference", "Curated sources"],
            "Bitcoin ETF flow tracking from news-derived inference."
        ),
        widget!("GSAD-23", "Stablecoins", "crypto", 3,
            row=14, col=4, cspan=3, rspan=2,
            sources=[src_ep("CoinGecko", "https://api.coingecko.com/api/v3", None, 60_000)],
            features=["Stablecoin prices", "Market cap", "Peg deviation alerts"],
            "Stablecoin market monitoring."
        ),
        widget!("GSAD-24", "Sector Heatmap", "crypto", 3,
            row=14, col=7, cspan=3, rspan=2,
            sources=[src_ep("Finnhub", "https://finnhub.io/api/v1", Some("FINNHUB_API_KEY"), 60_000)],
            features=["Sector ETF performance", "Heatmap visualization", "Relative strength"],
            "Market sector heatmap derived from sector ETFs."
        ),
        widget!("GSAD-25", "Market Radar / Liquidity", "crypto", 3,
            row=14, col=10, cspan=3, rspan=2,
            sources=[src_ep("Finnhub", "https://finnhub.io/api/v1", Some("FINNHUB_API_KEY"), 30_000)],
            features=["Volume proxies", "Liquidity metrics", "Radar visualization"],
            "Market liquidity and volume radar."
        ),
    ]
}
