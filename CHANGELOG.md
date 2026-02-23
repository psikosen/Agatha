# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Project scaffolding: LICENSE, README, CONTRIBUTING, CHANGELOG
- Cross-editor configuration (`.editorconfig`)
- Node version pinning (`.nvmrc`)
- Rust formatting and linting configuration (`rustfmt.toml`, `clippy.toml`)
- GitHub Actions CI pipeline for frontend and backend
- Docker support with multi-stage builds and docker-compose
- Vitest testing infrastructure for frontend
- Rust test infrastructure for backend
- Root Makefile for monorepo orchestration
- Meta tags, font loading, and favicon in `index.html`

### Fixed
- Moved `@types/react-grid-layout` and `@types/uuid` to devDependencies
- Added `react-resizable` as explicit dependency
- Removed unused `uuid` dependency
- Made Ollama URL configurable via `OLLAMA_URL` env var
- Made backend port configurable via `BACKEND_PORT` env var
- Updated `.env.example` with all environment variables
