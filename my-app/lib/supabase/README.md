# Supabase

Connection helpers for the BedriftUtility Supabase instance.

## Environment

Set in `my-app/.env` (gitignored). Public vars are inlined into the browser
bundle; the service-role key and `DATABASE_URL` must never reach the client.

| Variable | Where | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | client + server | API base URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client + server | public anon key (RLS-scoped) |
| `SUPABASE_URL` | server only | API base URL for admin client |
| `SUPABASE_SERVICE_ROLE_KEY` | server only | bypasses RLS — keep secret |
| `DATABASE_URL` | server only | direct Postgres (migrations) |
| `DATABASE_URL_TX` | server only | transaction-pooler Postgres |

## Clients

- **`client.ts`** → `createClient()` — Client Components (`'use client'`).
- **`server.ts`** → `await createClient()` — Server Components / Actions /
  Route Handlers. Cookie-aware, so it shares the auth session with the browser.
- **`admin.ts`** → `createAdminClient()` — service-role, **server only**
  (guarded by `import 'server-only'`). Bypasses RLS; use for trusted backend work.

## Verify the connection

```bash
npm run dev
# then open:
curl http://localhost:3000/api/supabase/status
# → { "ok": true, "url": "http://hjemmeserver:8005", "restStatus": 200 }
```

`hjemmeserver` only resolves on your local network, so this must be run from a
machine on that network.

## Generating typed schema (later)

Once tables exist, generate types and parameterise the clients with them:

```bash
npx supabase gen types typescript --db-url "$DATABASE_URL" > lib/supabase/types.ts
```

Then `createBrowserClient<Database>(...)` etc. for end-to-end type safety.
