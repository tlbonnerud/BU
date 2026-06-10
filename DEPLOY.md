# Deploy — BedriftUtility on the home server

Self-hosted stack next to your existing Supabase. Four containers:

| Container | Image / build | Role |
| --- | --- | --- |
| `bedriftutility-next` | `./my-app` (Dockerfile) | the Next.js app (standalone) |
| `bedriftutility-redis` | `redis:7-alpine` | session + refresh-token store |
| `bedriftutility-webhook` | `./deploy/webhook` | redeploys on GitHub push |
| `bedriftutility-cloudflared` | `cloudflare/cloudflared` | public HTTPS via Cloudflare Tunnel |

**Auth model: your own.** Access + refresh tokens live in cookies; sessions and
refresh tokens are stored in **Redis**; role checks run in app code. **Supabase
is used only as a Postgres database** (with Supabase Studio for browsing tables)
— no Supabase Auth, no RLS. So the browser never talks to Supabase; all DB access
is server-side.

---

## 1. Environment

```bash
cp .env.production.example .env.production   # if starting fresh
$EDITOR .env.production                       # fill the <...> blanks
```

`.env.production` is gitignored. Set at minimum:
`AUTH_SECRET`, `DATABASE_URL`, `SUPABASE_NETWORK`, `TUNNEL_TOKEN`, `WEBHOOK_SECRET`.

## 2. Database connection

The app talks to the Supabase Postgres directly. Two ways:

- **Via host port (simplest):** `DATABASE_URL=...@hjemmeserver:5434/postgres`
  (the value you already have). Works without any shared Docker network — you can
  then drop the `supabase` network from `docker-compose.yml`.
- **Via the Supabase Docker network (no host hop):** keep the `supabase` external
  network and point `DATABASE_URL` at the db container, e.g.
  `...@bedriftutility-db:5432/postgres`. Find the network name with:

  ```bash
  docker inspect bedriftutility-kong -f '{{json .NetworkSettings.Networks}}'
  ```

  and set it as `SUPABASE_NETWORK`.

Browse/inspect tables anytime in **Supabase Studio** — it keeps running as part of
the Supabase stack, untouched.

## 3. Redis

Runs internally on `bunet` as `redis://redis:6379` (already wired into the
`nextjs` service via `REDIS_URL`). It is **not** published to a host port. To
require a password, uncomment the `command:` line in `docker-compose.yml` and set
`REDIS_PASSWORD` in `.env.production` (and update `REDIS_URL` to
`redis://:${REDIS_PASSWORD}@redis:6379`).

The volume `redis_data` persists sessions across restarts.

## 4. Cloudflare Tunnel

In the Cloudflare Zero Trust dashboard → **Tunnels**, create (or reuse) a tunnel
and copy its **token** into `TUNNEL_TOKEN`. Add public hostnames (ingress):

| Hostname | Service |
| --- | --- |
| `app.dittdomene.no` | `http://nextjs:3000` |
| `deploy.dittdomene.no` *(for the webhook)* | `http://webhook:9000` |

No Supabase hostname is needed — the browser never calls Supabase.

## 5. GitHub webhook (auto-deploy)

1. Set a long random `WEBHOOK_SECRET` in `.env.production`.
2. In the GitHub repo → **Settings → Webhooks → Add webhook**:
   - Payload URL: `https://deploy.dittdomene.no/hooks/deploy-bedriftutility`
   - Content type: `application/json` *(recommended; the hook also tolerates GitHub's form-encoded `payload=` deliveries)*
   - Secret: the same `WEBHOOK_SECRET`
   - Events: **Just the push event**

On push to `main`, `deploy.sh` runs `git fetch --prune origin`,
`git reset --hard origin/main`, then
`docker compose -p bedriftutility-app --env-file .env.production up -d --build nextjs`.

> The repo is bind-mounted into the webhook container. For a **private** repo,
> give the container pull credentials (a read-only deploy key or a stored
> credential helper), or make the repo public.

## 6. Deploy

```bash
docker compose --env-file .env.production up -d --build
```

`--env-file` is required — compose only reads `.env` for `${VAR}` interpolation by
default, and our values live in `.env.production`.

Check it:

```bash
docker compose --env-file .env.production ps
docker compose --env-file .env.production logs -f nextjs
docker exec -it bedriftutility-redis redis-cli ping   # → PONG
```

## Updating

- **Automatic:** push to `main` → webhook redeploys `nextjs`.
- **Manual:** `git pull && docker compose --env-file .env.production up -d --build nextjs`

## Troubleshooting

- **`network <name> not found`** → wrong `SUPABASE_NETWORK` (step 2), or you're
  using the host-port DB connection and can drop the `supabase` network.
- **App can't reach Postgres** → check `DATABASE_URL`; from a container, host
  `hjemmeserver` must resolve, or use the db container name on the shared network.
- **Sessions lost on restart** → the `redis_data` volume isn't persisting; check
  `docker volume ls`.
- **Webhook does nothing** → secret mismatch, or the push wasn't to `main`; check
  `docker compose logs -f webhook`.
