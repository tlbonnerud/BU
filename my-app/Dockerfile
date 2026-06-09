# syntax=docker/dockerfile:1
# Multi-stage build for the Next.js app (standalone output).

FROM node:22-alpine AS base

# --- deps: install from lockfile ---
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# --- builder: compile the app ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# No NEXT_PUBLIC_* build args: the browser doesn't talk to Supabase. Auth runs
# server-side (own tokens in cookies, sessions in Redis), so nothing public
# needs to be inlined into the client bundle at build time. If you later add a
# build-time public var, declare it here as: ARG NEXT_PUBLIC_FOO / ENV ...
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# --- runner: minimal runtime image ---
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
