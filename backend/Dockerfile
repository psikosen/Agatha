FROM rust:1.83-slim AS build

WORKDIR /app

# Build dependencies first for caching
COPY Cargo.toml Cargo.lock ./
RUN mkdir src && echo 'fn main() {}' > src/main.rs
RUN cargo build --release && rm -rf src

# Build actual application
COPY src ./src
RUN touch src/main.rs && cargo build --release

# Runtime image
FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/target/release/gsad-backend /usr/local/bin/gsad-backend

ENV FRONTEND_DIST=/app/frontend/dist
EXPOSE 3001

CMD ["gsad-backend"]
