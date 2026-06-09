#!/bin/sh
# Pull the latest main and rebuild the Next.js service. Runs inside the
# webhook container, which has the repo mounted at /app and access to the
# host docker daemon via /var/run/docker.sock.
set -eu

cd /app

# The repo is bind-mounted; mark it safe for git inside the container.
git config --global --add safe.directory /app

echo "[deploy] git pull --ff-only"
git pull --ff-only

echo "[deploy] rebuilding nextjs"
docker compose --env-file .env.production up -d --build nextjs

echo "[deploy] done"
