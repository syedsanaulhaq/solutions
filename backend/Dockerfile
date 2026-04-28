# ── Stage 1: dependencies ─────────────────────────────────────────────────────
FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev


# ── Stage 2: production image ─────────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

# Non-root user for least-privilege runtime
RUN addgroup -S hoce && adduser -S hoce -G hoce

# Copy production deps and source
COPY --from=deps /app/node_modules ./node_modules
COPY src ./src
COPY package.json ./

# Owned by non-root user
RUN chown -R hoce:hoce /app
USER hoce

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

CMD ["node", "src/index.js"]
