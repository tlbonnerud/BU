# Database — BedriftUtility

Schema for the Supabase Postgres (used as a plain database; own auth, no RLS
policies). Migrations are plain SQL, ordered, and idempotent (safe to re-run).

## Files

| File | What |
| --- | --- |
| `migrations/0001_extensions.sql` | `pgcrypto`, `btree_gist` |
| `migrations/0002_enums.sql` | all enums |
| `migrations/0003_organisations.sql` | `organisations` |
| `migrations/0004_users.sql` | `users` (status, invite, soft-delete) |
| `migrations/0005_availability.sql` | `availability_template` + `availability_override` |
| `migrations/0006_shifts.sql` | `shifts` + no-overlap exclusion constraint |
| `migrations/0007_time_entries.sql` | `time_entries` + generated `timer` column |
| `migrations/0008_triggers.sql` | `endret` (updated_at) triggers |
| `migrations/0009_lock_rls.sql` | enable RLS (no policies) → lock public API |
| `migrations/0010_expand_availability.sql` | `expand_availability()` render-on-read |
| `seed.sql` | optional dev data (not run by `apply.sh`) |
| `apply.sh` | runs every migration in order |

## Apply

**Option A — runner (psql):**
```bash
export DATABASE_URL=postgresql://postgres:...@hjemmeserver:5434/postgres
./db/apply.sh
# optional dev data:
psql "$DATABASE_URL" -f db/seed.sql
```

**Option B — Supabase Studio:** open the SQL editor and paste each
`migrations/*.sql` in order (0001 → 0010), running each.

## Data model in one line

Availability is rendered as `template ⊕ override` (never materialized); the
durable history lives in `shifts` + `time_entries`. See the DBML / project notes.

```sql
-- concrete availability for a user over a range:
SELECT * FROM expand_availability('<user-uuid>', '2026-06-01', '2026-06-30');
```

## Security note (0009)

We connect via the `postgres` role / service-role, which **bypass RLS**.
Enabling RLS with **no policies** blocks `anon`/`authenticated` (the public
PostgREST API) while server-side access stays full. Studio browsing still works.
If you ever want the auto-generated REST API, add policies or skip `0009`.

## Verify

```sql
-- tables present
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public' ORDER BY 1;

-- generated column works
INSERT INTO time_entries (user_id, inn_tid, ut_tid)
SELECT id, now() - interval '4 hours', now() FROM users LIMIT 1;
SELECT timer FROM time_entries ORDER BY opprettet DESC LIMIT 1;  -- → 4.00
```
