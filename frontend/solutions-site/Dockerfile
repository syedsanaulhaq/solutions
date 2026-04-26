# ── Stage 1: builder ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies first (layer caching)
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# ── Stage 2: runner ───────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 hoce \
 && adduser  --system --uid 1001 hoce

# Copy standalone output produced by output: 'standalone'
COPY --from=builder --chown=hoce:hoce /app/.next/standalone ./
COPY --from=builder --chown=hoce:hoce /app/.next/static    ./.next/static
COPY --from=builder --chown=hoce:hoce /app/public          ./public

USER hoce

EXPOSE 3001

CMD ["node", "server.js"]
