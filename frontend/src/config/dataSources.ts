/**
 * GSAD Widget → Data Source Mapping
 *
 * Cheap/free-first strategy. Each entry documents the provider,
 * expected API key env var (if any), and notes on licensing.
 */

export interface DataSourceEntry {
  widgetId: string;
  provider: string;
  endpoint: string;
  apiKeyEnvVar?: string;
  protocol: 'REST' | 'WebSocket' | 'GraphQL' | 'SPARQL' | 'Static';
  costTier: 'free' | 'freemium' | 'paid';
  notes: string;
}

export const DATA_SOURCE_MAP: DataSourceEntry[] = [
  // GSAD-01 Map Module
  { widgetId: 'GSAD-01', provider: 'OpenStreetMap', endpoint: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', protocol: 'REST', costTier: 'free', notes: 'No key needed. Can self-host tile server.' },
  { widgetId: 'GSAD-01', provider: 'GDELT', endpoint: 'https://api.gdeltproject.org/api/v2/geo/geo', protocol: 'REST', costTier: 'free', notes: 'Open, free. Conflict/events overlay.' },
  { widgetId: 'GSAD-01', provider: 'NASA FIRMS', endpoint: 'https://firms.modaps.eosdis.nasa.gov/api/area/csv', apiKeyEnvVar: 'FIRMS_MAP_KEY', protocol: 'REST', costTier: 'free', notes: 'Free MAP_KEY required. Fire data.' },
  { widgetId: 'GSAD-01', provider: 'Wikidata SPARQL', endpoint: 'https://query.wikidata.org/sparql', protocol: 'SPARQL', costTier: 'free', notes: 'Free public endpoint. Infrastructure POIs.' },
  { widgetId: 'GSAD-01', provider: 'adsb.lol', endpoint: 'https://api.adsb.lol/v2', protocol: 'REST', costTier: 'free', notes: 'Free/open ADS-B flight tracking.' },
  { widgetId: 'GSAD-01', provider: 'aisstream.io', endpoint: 'wss://stream.aisstream.io/v0/stream', protocol: 'WebSocket', costTier: 'free', notes: 'Free WebSocket AIS ship traffic.' },

  // GSAD-02 AI Insights
  { widgetId: 'GSAD-02', provider: 'Ollama (local)', endpoint: 'http://localhost:11434/api', protocol: 'REST', costTier: 'free', notes: 'Local model. User selects via `ollama list`.' },

  // GSAD-03 Strategic Posture
  { widgetId: 'GSAD-03', provider: 'GDELT + Finnhub + FIRMS + Open-Meteo + Ollama', endpoint: 'aggregate', protocol: 'REST', costTier: 'freemium', notes: 'Composite scoring from multiple free/cheap sources.' },

  // GSAD-04 Live News
  { widgetId: 'GSAD-04', provider: 'GDELT', endpoint: 'https://api.gdeltproject.org/api/v2/doc/doc', protocol: 'REST', costTier: 'free', notes: 'Near-realtime news-derived events.' },

  // GSAD-05 Live Webcams
  { widgetId: 'GSAD-05', provider: 'YouTube Live / Public Cams', endpoint: 'curated-urls', protocol: 'Static', costTier: 'free', notes: 'Embed from public YouTube live channels and traffic cam providers.' },

  // GSAD-06 Intel Feed
  { widgetId: 'GSAD-06', provider: 'GDELT', endpoint: 'https://api.gdeltproject.org/api/v2/doc/doc', protocol: 'REST', costTier: 'free', notes: 'Filtered by conflict/cyber/sanctions/protest themes.' },

  // GSAD-07 Infrastructure Cascade
  { widgetId: 'GSAD-07', provider: 'Wikidata SPARQL', endpoint: 'https://query.wikidata.org/sparql', protocol: 'SPARQL', costTier: 'free', notes: 'Static infrastructure entities + geo.' },
  { widgetId: 'GSAD-07', provider: 'GDELT', endpoint: 'https://api.gdeltproject.org/api/v2/doc/doc', protocol: 'REST', costTier: 'free', notes: 'Disruption events tied to infrastructure.' },

  // GSAD-08 World News
  { widgetId: 'GSAD-08', provider: 'GDELT', endpoint: 'https://api.gdeltproject.org/api/v2/doc/doc', protocol: 'REST', costTier: 'free', notes: 'Region/country filtered.' },

  // GSAD-09 Middle East Panel
  { widgetId: 'GSAD-09', provider: 'GDELT + Ollama', endpoint: 'aggregate', protocol: 'REST', costTier: 'free', notes: 'GDELT region focus + local AI summarization.' },

  // GSAD-10 Commodities
  { widgetId: 'GSAD-10', provider: 'Finnhub', endpoint: 'https://finnhub.io/api/v1/quote', apiKeyEnvVar: 'FINNHUB_API_KEY', protocol: 'REST', costTier: 'freemium', notes: 'Free tier rate-limited but workable.' },

  // GSAD-11 Markets (Indices)
  { widgetId: 'GSAD-11', provider: 'Finnhub', endpoint: 'https://finnhub.io/api/v1/quote', apiKeyEnvVar: 'FINNHUB_API_KEY', protocol: 'REST', costTier: 'freemium', notes: 'Indices/market data.' },

  // GSAD-12 Economic Indicators
  { widgetId: 'GSAD-12', provider: 'FRED', endpoint: 'https://api.stlouisfed.org/fred/series/observations', apiKeyEnvVar: 'FRED_API_KEY', protocol: 'REST', costTier: 'free', notes: 'Free key. Official macro series.' },

  // GSAD-13 Financial News
  { widgetId: 'GSAD-13', provider: 'Finnhub', endpoint: 'https://finnhub.io/api/v1/news', apiKeyEnvVar: 'FINNHUB_API_KEY', protocol: 'REST', costTier: 'freemium', notes: 'Market news paired with GSAD-11/10.' },

  // GSAD-14 AI/ML Feed
  { widgetId: 'GSAD-14', provider: 'GDELT + Ollama', endpoint: 'aggregate', protocol: 'REST', costTier: 'free', notes: 'GDELT AI/tech topics + Ollama summaries.' },

  // GSAD-15 Layoffs Tracker
  { widgetId: 'GSAD-15', provider: 'GDELT', endpoint: 'https://api.gdeltproject.org/api/v2/doc/doc', protocol: 'REST', costTier: 'free', notes: 'News-derived via entity extraction + "layoff" keywords.' },

  // GSAD-16 My Monitors
  { widgetId: 'GSAD-16', provider: 'GDELT + Finnhub + RSS + Ollama', endpoint: 'aggregate', protocol: 'REST', costTier: 'freemium', notes: 'User keyword monitors with AI classification.' },

  // GSAD-17 Technology Panel
  { widgetId: 'GSAD-17', provider: 'GDELT + Ollama', endpoint: 'aggregate', protocol: 'REST', costTier: 'free', notes: 'Cybersecurity/tech + think-tank writeups.' },

  // GSAD-18 Fires / Conflict Events
  { widgetId: 'GSAD-18', provider: 'NASA FIRMS', endpoint: 'https://firms.modaps.eosdis.nasa.gov/api/area/csv', apiKeyEnvVar: 'FIRMS_MAP_KEY', protocol: 'REST', costTier: 'free', notes: 'Fire detections.' },
  { widgetId: 'GSAD-18', provider: 'GDELT', endpoint: 'https://api.gdeltproject.org/api/v2/doc/doc', protocol: 'REST', costTier: 'free', notes: 'Conflict events.' },

  // GSAD-19 UNHCR Displacement
  { widgetId: 'GSAD-19', provider: 'UNHCR Open Data', endpoint: 'https://data.unhcr.org/api', protocol: 'REST', costTier: 'free', notes: 'Periodic dataset ingestion + cache.' },

  // GSAD-20 Climate Anomalies
  { widgetId: 'GSAD-20', provider: 'Open-Meteo', endpoint: 'https://api.open-meteo.com/v1/forecast', protocol: 'REST', costTier: 'free', notes: 'Free for non-commercial; paid plan if monetized.' },

  // GSAD-21 Population Exposure
  { widgetId: 'GSAD-21', provider: 'World Bank', endpoint: 'https://api.worldbank.org/v2', protocol: 'REST', costTier: 'free', notes: 'Batch ingestion of national stats.' },

  // GSAD-22 BTC ETF Tracker
  { widgetId: 'GSAD-22', provider: 'GDELT (headline inference)', endpoint: 'https://api.gdeltproject.org/api/v2/doc/doc', protocol: 'REST', costTier: 'free', notes: 'Phase 1: headline-derived inference. Add paid ETF flow API later.' },

  // GSAD-23 Stablecoins
  { widgetId: 'GSAD-23', provider: 'CoinGecko', endpoint: 'https://api.coingecko.com/api/v3', protocol: 'REST', costTier: 'freemium', notes: 'Public rate limit low; demo/paid gives 30/min+.' },

  // GSAD-24 Sector Heatmap
  { widgetId: 'GSAD-24', provider: 'Finnhub', endpoint: 'https://finnhub.io/api/v1/quote', apiKeyEnvVar: 'FINNHUB_API_KEY', protocol: 'REST', costTier: 'freemium', notes: 'Sector ETFs → compute performance internally.' },

  // GSAD-25 Market Radar / Liquidity
  { widgetId: 'GSAD-25', provider: 'Finnhub', endpoint: 'https://finnhub.io/api/v1/quote', apiKeyEnvVar: 'FINNHUB_API_KEY', protocol: 'REST', costTier: 'freemium', notes: 'Volume proxies. Add options flow later (paid).' },
];

/** Get all data sources for a specific widget */
export function getSourcesForWidget(widgetId: string): DataSourceEntry[] {
  return DATA_SOURCE_MAP.filter((s) => s.widgetId === widgetId);
}

/** Get all unique API key env vars needed */
export function getRequiredApiKeys(): string[] {
  const keys = new Set<string>();
  for (const s of DATA_SOURCE_MAP) {
    if (s.apiKeyEnvVar) keys.add(s.apiKeyEnvVar);
  }
  return [...keys];
}
