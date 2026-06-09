#!/usr/bin/env bash
# Apply all migrations in order against $DATABASE_URL.
#   DATABASE_URL=postgresql://postgres:...@hjemmeserver:5434/postgres ./db/apply.sh
# Stops on the first error. Migrations are idempotent — safe to re-run.
set -euo pipefail

: "${DATABASE_URL:?Set DATABASE_URL (e.g. export DATABASE_URL=postgresql://...)}"

DIR="$(cd "$(dirname "$0")" && pwd)"

for f in "$DIR"/migrations/*.sql; do
  echo "==> $(basename "$f")"
  psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "$f"
done

echo "✓ Alle migrasjoner kjørt."
echo "  (Valgfri dev-data:  psql \"\$DATABASE_URL\" -f \"$DIR/seed.sql\")"
