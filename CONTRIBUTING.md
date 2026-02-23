# Contributing to Agatha

Thank you for your interest in contributing to Agatha. This document covers the development workflow, coding standards, and pull request process.

## Development Setup

1. **Fork and clone** the repository
2. Install prerequisites:
   - Node.js 22+ (use `nvm install` to pick up `.nvmrc`)
   - Rust 1.75+ via [rustup](https://rustup.rs/)
   - (Optional) Ollama for local AI features
3. Copy environment config:
   ```bash
   cp .env.example .env
   # Fill in API keys
   ```
4. Start the dev servers:
   ```bash
   make dev
   ```

## Code Style

### Frontend (TypeScript / React)

- Follow the ESLint config (`eslint.config.js`)
- Run `npm run lint` before committing
- Use functional components with hooks
- State management via Zustand stores

### Backend (Rust)

- Follow `rustfmt.toml` — run `cargo fmt` before committing
- Follow `clippy.toml` — run `cargo clippy` and fix warnings
- Use `tracing` for structured logging (not `println!`)

### General

- `.editorconfig` handles indentation and line endings across editors
- Commits should be small, focused, and well-described
- Use conventional commit messages: `feat:`, `fix:`, `docs:`, `test:`, `chore:`

## Testing

Run the full test suite before submitting a PR:

```bash
make test
```

Or run frontend and backend tests individually:

```bash
cd frontend && npm test
cd backend && cargo test
```

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes with tests
3. Ensure `make lint` and `make test` pass
4. Open a PR with a clear description of what changed and why
5. Link any related issues

## Reporting Issues

Use GitHub Issues. Include:
- Steps to reproduce
- Expected vs. actual behavior
- Browser/OS/Node/Rust versions
- Relevant logs or screenshots
