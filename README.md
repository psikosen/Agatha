# Agatha — Global Situation Awareness Dashboard (GSAD)

A real-time monitoring dashboard that aggregates 25 data widgets spanning geopolitical events, financial markets, climate data, infrastructure status, and AI-powered analysis. Built with a React/TypeScript frontend and a Rust/Axum backend.

## Architecture

```
frontend/          React 19 + TypeScript + Vite + Zustand
backend/           Rust (Axum + Tokio) API server
```

The frontend renders a 12-column draggable grid (via `react-grid-layout`) of 25 widgets. The Rust backend proxies and aggregates data from free/freemium APIs (GDELT, Finnhub, FRED, NASA FIRMS, Open-Meteo, CoinGecko, and others) and serves the frontend in production.

## Prerequisites

- **Node.js** 22+ (see `.nvmrc`)
- **Rust** 1.75+ (install via [rustup](https://rustup.rs/))
- **Ollama** (optional) — for local AI insights at `http://localhost:11434`

## Quick Start

```bash
# 1. Clone and configure environment
git clone https://github.com/<your-org>/Agatha.git
cd Agatha
cp .env.example .env
# Edit .env and add your API keys

# 2. Start both frontend and backend
make dev
```

Or start each service individually:

```bash
# Frontend (dev server on :5173)
cd frontend
npm install
npm run dev

# Backend (API server on :3001)
cd backend
cargo run
```

## Environment Variables

Copy `.env.example` to `.env` and fill in the required keys:

| Variable | Required | Description |
|---|---|---|
| `FIRMS_MAP_KEY` | Yes | NASA FIRMS fire data API key |
| `FINNHUB_API_KEY` | Yes | Finnhub stock/market data API key |
| `FRED_API_KEY` | Yes | FRED economic data API key |
| `BACKEND_PORT` | No | Backend port (default: `3001`) |
| `FRONTEND_DIST` | No | Path to frontend build (default: `../frontend/dist`) |
| `OLLAMA_URL` | No | Ollama API base URL (default: `http://localhost:11434`) |

## Available Scripts

### Root (via Makefile)

| Command | Description |
|---|---|
| `make dev` | Start frontend + backend concurrently |
| `make build` | Build both frontend and backend |
| `make test` | Run all tests (frontend + backend) |
| `make lint` | Lint both frontend and backend |
| `make clean` | Remove build artifacts |
| `make docker-up` | Start full stack via Docker Compose |
| `make docker-down` | Stop Docker Compose services |

### Frontend

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run test` | Run Vitest test suite |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build locally |

### Backend

| Command | Description |
|---|---|
| `cargo run` | Start the API server |
| `cargo test` | Run the test suite |
| `cargo clippy` | Run linter |
| `cargo fmt --check` | Check formatting |

## Docker

```bash
# Build and start the full stack
docker compose up --build

# Or use the Makefile shortcut
make docker-up
```

The frontend is served by the Rust backend in production mode on port 3001.

## Widget Grid (25 Widgets)

| ID | Widget | Data Source |
|---|---|---|
| GSAD-01 | Map Module | OSM + GDELT + NASA FIRMS |
| GSAD-02 | AI Insights | Ollama (local LLM) |
| GSAD-03 | Strategic Posture | Multi-source risk gauge |
| GSAD-04 | Live News | GDELT |
| GSAD-05 | Live Webcams | Public camera feeds |
| GSAD-06 | Intel Feed | GDELT filtered |
| GSAD-07 | Infrastructure Cascade | Wikidata + GDELT |
| GSAD-08 | World News | GDELT regional |
| GSAD-09 | Middle East Panel | GDELT + Ollama |
| GSAD-10 | Commodities | Finnhub |
| GSAD-11 | Markets / Indices | Finnhub |
| GSAD-12 | Economic Indicators | FRED |
| GSAD-13 | Financial News | Finnhub |
| GSAD-14 | AI/ML Feed | GDELT + Ollama |
| GSAD-15 | Layoffs Tracker | GDELT |
| GSAD-16 | My Monitors | Custom keywords |
| GSAD-17 | Technology Panel | GDELT + Ollama |
| GSAD-18 | Fires / Conflict Events | NASA FIRMS + GDELT |
| GSAD-19 | UNHCR Displacement | UNHCR Open Data |
| GSAD-20 | Climate Anomalies | Open-Meteo |
| GSAD-21 | Population Exposure | World Bank |
| GSAD-22 | BTC ETF Tracker | GDELT inference |
| GSAD-23 | Stablecoins | CoinGecko |
| GSAD-24 | Sector Heatmap | Finnhub ETFs |
| GSAD-25 | Market Radar / Liquidity | Finnhub |

## Project Structure

```
Agatha/
├── .editorconfig            # Cross-editor formatting
├── .env.example             # Environment variable template
├── .github/workflows/       # CI/CD pipelines
├── .nvmrc                   # Node version pin
├── docker-compose.yml       # Full-stack containerization
├── Makefile                 # Monorepo task runner
├── LICENSE                  # MIT License
├── README.md                # This file
├── CONTRIBUTING.md          # Contribution guidelines
├── CHANGELOG.md             # Release history
├── frontend/
│   ├── src/
│   │   ├── components/      # React components (layout + widgets)
│   │   ├── config/          # Widget specs and data source mappings
│   │   ├── stores/          # Zustand state management
│   │   ├── styles/          # Global CSS + theme variables
│   │   └── types/           # TypeScript interfaces
│   ├── package.json
│   ├── vite.config.ts
│   ├── vitest.config.ts     # Test configuration
│   └── tsconfig.json
└── backend/
    ├── src/
    │   ├── models/          # Rust data models
    │   ├── routes/          # API route handlers
    │   └── services/        # Business logic & data fetching
    ├── Cargo.toml
    ├── clippy.toml          # Clippy lint configuration
    └── rustfmt.toml         # Rust formatter configuration
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup, coding standards, and pull request guidelines.

## License

[MIT](LICENSE)
