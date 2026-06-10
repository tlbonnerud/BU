#!/bin/sh
# Pull the latest main and rebuild the Next.js service. Runs inside the
# webhook container, which has the repo mounted at /app and access to the
# host docker daemon via /var/run/docker.sock.
set -eu

cd /app
export COMPOSE_PROJECT_NAME=bedriftutility-app
export HOME=/tmp
mkdir -p "$HOME"

git_safe() {
  git -c safe.directory=/app "$@"
}

lockdir="/tmp/bedriftutility-deploy.lock"
if ! mkdir "$lockdir" 2>/dev/null; then
  echo "[deploy] another deploy is already running"
  exit 0
fi
trap 'rmdir "$lockdir"' EXIT INT TERM

echo "[deploy] current HEAD: $(git_safe rev-parse HEAD)"
echo "[deploy] git fetch --prune origin"
git_safe fetch --prune origin

echo "[deploy] git reset --hard origin/main"
git_safe reset --hard origin/main

echo "[deploy] new HEAD: $(git_safe rev-parse HEAD)"
echo "[deploy] rebuilding nextjs"
docker compose -p bedriftutility-app --env-file .env.production up -d --build nextjs

echo "[deploy] stack status"
docker compose -p bedriftutility-app --env-file .env.production ps

echo "[deploy] done"
