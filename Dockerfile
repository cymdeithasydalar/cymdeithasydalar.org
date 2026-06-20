# syntax=docker/dockerfile:1

# ── Dependencies ──
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ── Build ──
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# NEXT_PUBLIC_* vars are inlined at build time
ARG NEXT_PUBLIC_FORMSPREE_ID=YOUR_FORMSPREE_ID
ENV NEXT_PUBLIC_FORMSPREE_ID=$NEXT_PUBLIC_FORMSPREE_ID
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ── Runtime ──
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# Writable data dir for admin-edited settings (gate codes). A named volume is
# mounted here at runtime; creating it owned by nextjs lets the volume inherit
# writable ownership. Keep in sync with DATA_DIR in docker-compose.yml.
RUN mkdir -p /data && chown nextjs:nodejs /data

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
