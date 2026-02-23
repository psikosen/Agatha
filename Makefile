.PHONY: dev build test lint clean docker-up docker-down install fmt

# ─── Development ────────────────────────────────────────────────

dev:
	@echo "Starting frontend and backend..."
	@(cd frontend && npm run dev) & \
	 (cd backend && cargo run) & \
	 wait

install:
	cd frontend && npm install
	cd backend && cargo fetch

# ─── Build ──────────────────────────────────────────────────────

build: build-frontend build-backend

build-frontend:
	cd frontend && npm run build

build-backend:
	cd backend && cargo build --release

# ─── Test ───────────────────────────────────────────────────────

test: test-frontend test-backend

test-frontend:
	cd frontend && npm test

test-backend:
	cd backend && cargo test

# ─── Lint & Format ──────────────────────────────────────────────

lint: lint-frontend lint-backend

lint-frontend:
	cd frontend && npm run lint

lint-backend:
	cd backend && cargo clippy -- -D warnings

fmt:
	cd backend && cargo fmt
	cd frontend && npx eslint . --fix

# ─── Docker ─────────────────────────────────────────────────────

docker-up:
	docker compose up --build -d

docker-down:
	docker compose down

# ─── Clean ──────────────────────────────────────────────────────

clean:
	rm -rf frontend/dist frontend/node_modules
	cd backend && cargo clean
