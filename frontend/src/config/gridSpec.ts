/**
 * GSAD Dashboard Grid Specification v1.1
 *
 * 12-column responsive grid, auto-expanding rows.
 * Primary viewport: 1920×1080 (27"+ monitors).
 *
 * Each constant below maps directly to the numbered spec
 * (GSAD-01 … GSAD-25) so engineering can reference widget IDs in tickets.
 */

import type { WidgetDefinition } from '../types/widget';

// ─── Grid constants ──────────────────────────────────────────────
export const GRID_COLS = 12;
export const ROW_HEIGHT = 120; // px per grid row
export const GRID_MARGIN: [number, number] = [8, 8];
export const GRID_CONTAINER_PADDING: [number, number] = [12, 12];

// ─── ROW 1 — Geospatial Command Layer ────────────────────────────

export const GSAD_01_MAP: WidgetDefinition = {
  id: 'GSAD-01',
  name: 'Map Module',
  category: 'geospatial',
  priority: 1,
  defaultPosition: { rowStart: 1, colStart: 1, colSpan: 8, rowSpan: 3 },
  dataSources: [
    { provider: 'OpenStreetMap', refreshIntervalMs: 0 },
    { provider: 'GDELT', endpoint: 'https://api.gdeltproject.org/api/v2/geo/geo', refreshIntervalMs: 300_000 },
    { provider: 'NASA FIRMS', endpoint: 'https://firms.modaps.eosdis.nasa.gov/api', apiKeyEnvVar: 'FIRMS_MAP_KEY', refreshIntervalMs: 600_000 },
    { provider: 'Wikidata SPARQL', endpoint: 'https://query.wikidata.org/sparql', refreshIntervalMs: 3_600_000 },
    { provider: 'adsb.lol', endpoint: 'https://api.adsb.lol/v2', refreshIntervalMs: 10_000 },
    { provider: 'aisstream.io', endpoint: 'wss://stream.aisstream.io/v0/stream', refreshIntervalMs: 5_000 },
  ],
  features: [
    'Interactive map',
    'Layer toggles sidebar',
    'Time filter controls',
    'Legend',
    'Global UTC timestamp',
  ],
  description: 'Core geospatial command module with multi-layer overlays.',
};

export const GSAD_02_AI_INSIGHTS: WidgetDefinition = {
  id: 'GSAD-02',
  name: 'AI Insights',
  category: 'ai',
  priority: 1,
  defaultPosition: { rowStart: 1, colStart: 9, colSpan: 2, rowSpan: 2 },
  dataSources: [
    { provider: 'Ollama (local)', refreshIntervalMs: 30_000 },
  ],
  features: [
    'Data acquisition status',
    'AI pipeline progress',
    'Brief generation indicator',
  ],
  description: 'AI pipeline status and insight generation panel.',
};

export const GSAD_03_STRATEGIC_POSTURE: WidgetDefinition = {
  id: 'GSAD-03',
  name: 'Strategic Posture',
  category: 'strategic',
  priority: 1,
  defaultPosition: { rowStart: 1, colStart: 11, colSpan: 2, rowSpan: 2 },
  dataSources: [
    { provider: 'GDELT', refreshIntervalMs: 300_000 },
    { provider: 'Finnhub', endpoint: 'https://finnhub.io/api/v1', apiKeyEnvVar: 'FINNHUB_API_KEY', refreshIntervalMs: 60_000 },
    { provider: 'NASA FIRMS', refreshIntervalMs: 600_000 },
    { provider: 'Open-Meteo', endpoint: 'https://api.open-meteo.com/v1', refreshIntervalMs: 900_000 },
    { provider: 'Ollama (local)', refreshIntervalMs: 60_000 },
  ],
  features: [
    'Strategic Risk Gauge',
    'Trend label (Stable/Volatile/etc.)',
    'Instability Index preview',
  ],
  description: 'Global strategic posture gauge with AI-driven risk scoring.',
};

// ─── ROW 2 — News & Webcams ──────────────────────────────────────

export const GSAD_04_LIVE_NEWS: WidgetDefinition = {
  id: 'GSAD-04',
  name: 'Live News',
  category: 'news',
  priority: 2,
  defaultPosition: { rowStart: 4, colStart: 1, colSpan: 6, rowSpan: 2 },
  dataSources: [
    { provider: 'GDELT', endpoint: 'https://api.gdeltproject.org/api/v2/doc/doc', refreshIntervalMs: 120_000 },
  ],
  features: ['Region tabs', 'LIVE badge', 'Video thumbnails', 'Source + timestamp'],
  description: 'Real-time global news feed with regional filtering.',
};

export const GSAD_05_LIVE_WEBCAMS: WidgetDefinition = {
  id: 'GSAD-05',
  name: 'Live Webcams',
  category: 'webcams',
  priority: 2,
  defaultPosition: { rowStart: 4, colStart: 7, colSpan: 6, rowSpan: 2 },
  dataSources: [
    { provider: 'YouTube Live / Public Cams', refreshIntervalMs: 0 },
  ],
  features: ['Multi-camera grid', 'Regional filters', 'Expand-on-click'],
  description: 'Live webcam feeds from curated public sources.',
};

// ─── ROW 3 — Intelligence & Regional Feeds ───────────────────────

export const GSAD_06_INTEL_FEED: WidgetDefinition = {
  id: 'GSAD-06',
  name: 'Intel Feed',
  category: 'intelligence',
  priority: 2,
  defaultPosition: { rowStart: 6, colStart: 1, colSpan: 3, rowSpan: 2 },
  dataSources: [
    { provider: 'GDELT', refreshIntervalMs: 180_000 },
  ],
  features: ['Conflict themes', 'Cyber events', 'Sanctions', 'Protests'],
  description: 'Filtered intelligence feed from GDELT themes.',
};

export const GSAD_07_INFRA_CASCADE: WidgetDefinition = {
  id: 'GSAD-07',
  name: 'Infrastructure Cascade',
  category: 'intelligence',
  priority: 2,
  defaultPosition: { rowStart: 6, colStart: 4, colSpan: 3, rowSpan: 2 },
  dataSources: [
    { provider: 'Wikidata SPARQL', refreshIntervalMs: 3_600_000 },
    { provider: 'GDELT', refreshIntervalMs: 300_000 },
  ],
  features: ['Cables', 'Pipelines', 'Ports', 'Disruption events'],
  description: 'Critical infrastructure monitoring and cascade analysis.',
};

export const GSAD_08_WORLD_NEWS: WidgetDefinition = {
  id: 'GSAD-08',
  name: 'World News',
  category: 'news',
  priority: 2,
  defaultPosition: { rowStart: 6, colStart: 7, colSpan: 3, rowSpan: 2 },
  dataSources: [
    { provider: 'GDELT', refreshIntervalMs: 180_000 },
  ],
  features: ['Regional tabs', 'Country filter'],
  description: 'Regional world news aggregation.',
};

export const GSAD_09_MIDDLE_EAST: WidgetDefinition = {
  id: 'GSAD-09',
  name: 'Middle East Panel',
  category: 'intelligence',
  priority: 2,
  defaultPosition: { rowStart: 6, colStart: 10, colSpan: 3, rowSpan: 2 },
  dataSources: [
    { provider: 'GDELT', refreshIntervalMs: 180_000 },
    { provider: 'Ollama (local)', refreshIntervalMs: 300_000 },
  ],
  features: ['Region-focused feed', 'AI summarization'],
  description: 'Dedicated Middle East intelligence panel with local AI summaries.',
};

// ─── ROW 4 — Markets & Financial Systems ─────────────────────────

export const GSAD_10_COMMODITIES: WidgetDefinition = {
  id: 'GSAD-10',
  name: 'Commodities',
  category: 'markets',
  priority: 2,
  defaultPosition: { rowStart: 8, colStart: 1, colSpan: 3, rowSpan: 2 },
  dataSources: [
    { provider: 'Finnhub', endpoint: 'https://finnhub.io/api/v1', apiKeyEnvVar: 'FINNHUB_API_KEY', refreshIntervalMs: 30_000 },
  ],
  features: ['Price tickers', 'Sparklines', 'Change indicators'],
  description: 'Real-time commodities pricing.',
};

export const GSAD_11_MARKETS: WidgetDefinition = {
  id: 'GSAD-11',
  name: 'Markets (Indices)',
  category: 'markets',
  priority: 2,
  defaultPosition: { rowStart: 8, colStart: 4, colSpan: 3, rowSpan: 2 },
  dataSources: [
    { provider: 'Finnhub', endpoint: 'https://finnhub.io/api/v1', apiKeyEnvVar: 'FINNHUB_API_KEY', refreshIntervalMs: 30_000 },
  ],
  features: ['Index tickers', 'Mini charts', 'Market status badges'],
  description: 'Global market indices tracker.',
};

export const GSAD_12_ECONOMIC_INDICATORS: WidgetDefinition = {
  id: 'GSAD-12',
  name: 'Economic Indicators',
  category: 'markets',
  priority: 2,
  defaultPosition: { rowStart: 8, colStart: 7, colSpan: 3, rowSpan: 2 },
  dataSources: [
    { provider: 'FRED', endpoint: 'https://api.stlouisfed.org/fred', apiKeyEnvVar: 'FRED_API_KEY', refreshIntervalMs: 3_600_000 },
  ],
  features: ['Fed balance sheet', 'Interest rates', 'Macro series'],
  description: 'Key economic indicators from FRED.',
};

export const GSAD_13_FINANCIAL_NEWS: WidgetDefinition = {
  id: 'GSAD-13',
  name: 'Financial News',
  category: 'markets',
  priority: 2,
  defaultPosition: { rowStart: 8, colStart: 10, colSpan: 3, rowSpan: 2 },
  dataSources: [
    { provider: 'Finnhub', endpoint: 'https://finnhub.io/api/v1/news', apiKeyEnvVar: 'FINNHUB_API_KEY', refreshIntervalMs: 120_000 },
  ],
  features: ['Market headlines', 'Source attribution', 'Sentiment tags'],
  description: 'Financial news feed from market sources.',
};

// ─── ROW 5 — AI / Monitoring / Technology ────────────────────────

export const GSAD_14_AI_ML_FEED: WidgetDefinition = {
  id: 'GSAD-14',
  name: 'AI/ML Feed',
  category: 'technology',
  priority: 3,
  defaultPosition: { rowStart: 10, colStart: 1, colSpan: 3, rowSpan: 2 },
  dataSources: [
    { provider: 'GDELT', refreshIntervalMs: 300_000 },
    { provider: 'Ollama (local)', refreshIntervalMs: 600_000 },
  ],
  features: ['AI topic filter', 'Curation', 'Ollama summaries'],
  description: 'AI and machine learning news feed.',
};

export const GSAD_15_LAYOFFS_TRACKER: WidgetDefinition = {
  id: 'GSAD-15',
  name: 'Layoffs Tracker',
  category: 'technology',
  priority: 3,
  defaultPosition: { rowStart: 10, colStart: 4, colSpan: 3, rowSpan: 2 },
  dataSources: [
    { provider: 'GDELT', refreshIntervalMs: 600_000 },
  ],
  features: ['News-derived detection', 'Entity extraction', 'Layoff keywords'],
  description: 'Layoff events detected from news via entity extraction.',
};

export const GSAD_16_MY_MONITORS: WidgetDefinition = {
  id: 'GSAD-16',
  name: 'My Monitors',
  category: 'technology',
  priority: 2,
  defaultPosition: { rowStart: 10, colStart: 7, colSpan: 3, rowSpan: 2 },
  dataSources: [
    { provider: 'GDELT', refreshIntervalMs: 180_000 },
    { provider: 'Finnhub', refreshIntervalMs: 120_000 },
    { provider: 'Ollama (local)', refreshIntervalMs: 60_000 },
  ],
  features: ['Keyword alerts', 'Custom RSS', 'AI classification'],
  description: 'User-defined keyword monitors with AI classification.',
};

export const GSAD_17_TECHNOLOGY: WidgetDefinition = {
  id: 'GSAD-17',
  name: 'Technology Panel',
  category: 'technology',
  priority: 3,
  defaultPosition: { rowStart: 10, colStart: 10, colSpan: 3, rowSpan: 2 },
  dataSources: [
    { provider: 'GDELT', refreshIntervalMs: 300_000 },
    { provider: 'Ollama (local)', refreshIntervalMs: 600_000 },
  ],
  features: ['Cybersecurity', 'Tech news', 'Think-tank writeups'],
  description: 'Cybersecurity and technology intelligence panel.',
};

// ─── ROW 6 — Risk & Global Indicators ────────────────────────────

export const GSAD_18_FIRES_CONFLICT: WidgetDefinition = {
  id: 'GSAD-18',
  name: 'Fires / Conflict Events',
  category: 'risk',
  priority: 2,
  defaultPosition: { rowStart: 12, colStart: 1, colSpan: 3, rowSpan: 2 },
  dataSources: [
    { provider: 'NASA FIRMS', apiKeyEnvVar: 'FIRMS_MAP_KEY', refreshIntervalMs: 600_000 },
    { provider: 'GDELT', refreshIntervalMs: 300_000 },
  ],
  features: ['Fire detections', 'Conflict events', 'Severity overlay'],
  description: 'Active fire detections and armed conflict event monitoring.',
};

export const GSAD_19_UNHCR: WidgetDefinition = {
  id: 'GSAD-19',
  name: 'UNHCR Displacement',
  category: 'risk',
  priority: 3,
  defaultPosition: { rowStart: 12, colStart: 4, colSpan: 3, rowSpan: 2 },
  dataSources: [
    { provider: 'UNHCR Open Data', refreshIntervalMs: 86_400_000 },
  ],
  features: ['Displacement figures', 'Regional breakdown', 'Trend charts'],
  description: 'UNHCR displacement data ingestion and display.',
};

export const GSAD_20_CLIMATE: WidgetDefinition = {
  id: 'GSAD-20',
  name: 'Climate Anomalies',
  category: 'risk',
  priority: 3,
  defaultPosition: { rowStart: 12, colStart: 7, colSpan: 3, rowSpan: 2 },
  dataSources: [
    { provider: 'Open-Meteo', endpoint: 'https://api.open-meteo.com/v1', refreshIntervalMs: 900_000 },
  ],
  features: ['Temperature anomalies', 'Extreme weather', 'Historical comparison'],
  description: 'Climate anomaly tracking and weather intelligence.',
};

export const GSAD_21_POPULATION: WidgetDefinition = {
  id: 'GSAD-21',
  name: 'Population Exposure',
  category: 'risk',
  priority: 3,
  defaultPosition: { rowStart: 12, colStart: 10, colSpan: 3, rowSpan: 2 },
  dataSources: [
    { provider: 'World Bank', refreshIntervalMs: 86_400_000 },
  ],
  features: ['Population stats', 'Exposure heatmap', 'Severity overlay'],
  description: 'Population exposure analysis overlaid with event severity.',
};

// ─── ROW 7 — Crypto & Sector Analysis ────────────────────────────

export const GSAD_22_BTC_ETF: WidgetDefinition = {
  id: 'GSAD-22',
  name: 'BTC ETF Tracker',
  category: 'crypto',
  priority: 3,
  defaultPosition: { rowStart: 14, colStart: 1, colSpan: 3, rowSpan: 2 },
  dataSources: [
    { provider: 'GDELT', refreshIntervalMs: 600_000 },
  ],
  features: ['ETF flow tracking', 'Headline inference', 'Curated sources'],
  description: 'Bitcoin ETF flow tracking from news-derived inference.',
};

export const GSAD_23_STABLECOINS: WidgetDefinition = {
  id: 'GSAD-23',
  name: 'Stablecoins',
  category: 'crypto',
  priority: 3,
  defaultPosition: { rowStart: 14, colStart: 4, colSpan: 3, rowSpan: 2 },
  dataSources: [
    { provider: 'CoinGecko', endpoint: 'https://api.coingecko.com/api/v3', refreshIntervalMs: 60_000 },
  ],
  features: ['Stablecoin prices', 'Market cap', 'Peg deviation alerts'],
  description: 'Stablecoin market monitoring.',
};

export const GSAD_24_SECTOR_HEATMAP: WidgetDefinition = {
  id: 'GSAD-24',
  name: 'Sector Heatmap',
  category: 'crypto',
  priority: 3,
  defaultPosition: { rowStart: 14, colStart: 7, colSpan: 3, rowSpan: 2 },
  dataSources: [
    { provider: 'Finnhub', apiKeyEnvVar: 'FINNHUB_API_KEY', refreshIntervalMs: 60_000 },
  ],
  features: ['Sector ETF performance', 'Heatmap visualization', 'Relative strength'],
  description: 'Market sector heatmap derived from sector ETFs.',
};

export const GSAD_25_MARKET_RADAR: WidgetDefinition = {
  id: 'GSAD-25',
  name: 'Market Radar / Liquidity',
  category: 'crypto',
  priority: 3,
  defaultPosition: { rowStart: 14, colStart: 10, colSpan: 3, rowSpan: 2 },
  dataSources: [
    { provider: 'Finnhub', apiKeyEnvVar: 'FINNHUB_API_KEY', refreshIntervalMs: 30_000 },
  ],
  features: ['Volume proxies', 'Liquidity metrics', 'Radar visualization'],
  description: 'Market liquidity and volume radar.',
};

// ─── Registry (ordered) ─────────────────────────────────────────
export const ALL_WIDGETS: WidgetDefinition[] = [
  GSAD_01_MAP,
  GSAD_02_AI_INSIGHTS,
  GSAD_03_STRATEGIC_POSTURE,
  GSAD_04_LIVE_NEWS,
  GSAD_05_LIVE_WEBCAMS,
  GSAD_06_INTEL_FEED,
  GSAD_07_INFRA_CASCADE,
  GSAD_08_WORLD_NEWS,
  GSAD_09_MIDDLE_EAST,
  GSAD_10_COMMODITIES,
  GSAD_11_MARKETS,
  GSAD_12_ECONOMIC_INDICATORS,
  GSAD_13_FINANCIAL_NEWS,
  GSAD_14_AI_ML_FEED,
  GSAD_15_LAYOFFS_TRACKER,
  GSAD_16_MY_MONITORS,
  GSAD_17_TECHNOLOGY,
  GSAD_18_FIRES_CONFLICT,
  GSAD_19_UNHCR,
  GSAD_20_CLIMATE,
  GSAD_21_POPULATION,
  GSAD_22_BTC_ETF,
  GSAD_23_STABLECOINS,
  GSAD_24_SECTOR_HEATMAP,
  GSAD_25_MARKET_RADAR,
];

/** Lookup map keyed by widget ID */
export const WIDGET_MAP = new Map<string, WidgetDefinition>(
  ALL_WIDGETS.map((w) => [w.id, w]),
);
