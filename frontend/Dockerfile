FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Output: /app/dist — consumed by backend image or nginx
FROM scratch AS dist
COPY --from=build /app/dist /dist
