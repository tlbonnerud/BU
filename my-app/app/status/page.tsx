import { Card, Badge } from '@/components/ds';
import { pingRedis } from '@/lib/redis';
import { pingSupabase } from '@/lib/supabase/health';

// Always run fresh — never cache the health result.
export const dynamic = 'force-dynamic';

interface Detail {
  label: string;
  value: React.ReactNode;
}

function ServiceCard({
  name,
  ok,
  details,
  error,
}: {
  name: string;
  ok: boolean;
  details: Detail[];
  error?: string;
}) {
  return (
    <Card
      elevation="shadow"
      title={name}
      action={
        <Badge tone={ok ? 'success' : 'danger'}>
          {ok ? '● Tilkoblet' : '● Feil'}
        </Badge>
      }
    >
      <dl
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: '8px 16px',
          margin: 0,
          fontSize: 'var(--fs-sm)',
        }}
      >
        {details.map((d) => (
          <div key={d.label} style={{ display: 'contents' }}>
            <dt style={{ color: 'var(--text-muted)' }}>{d.label}</dt>
            <dd
              style={{
                margin: 0,
                color: 'var(--text-heading)',
                fontFamily: 'var(--font-mono)',
                wordBreak: 'break-all',
              }}
            >
              {d.value}
            </dd>
          </div>
        ))}
      </dl>
      {error && (
        <p
          style={{
            marginTop: 12,
            padding: '10px 12px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--danger-100)',
            color: 'var(--danger-600)',
            fontSize: 'var(--fs-xs)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {error}
        </p>
      )}
    </Card>
  );
}

export default async function StatusPage() {
  // Create + test both clients in parallel.
  const [supabase, redis] = await Promise.all([pingSupabase(), pingRedis()]);
  const allOk = supabase.ok && redis.ok;

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--bg-app)',
        fontFamily: 'var(--font-sans)',
        padding: '48px 24px',
      }}
    >
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <header style={{ marginBottom: 28 }}>
          <h1
            className="bd-display"
            style={{ fontSize: 'clamp(28px, 4vw, 38px)' }}
          >
            Tilkoblingsstatus
          </h1>
          <p
            style={{
              color: 'var(--text-muted)',
              marginTop: 8,
              fontSize: 'var(--fs-base)',
            }}
          >
            Live-sjekk av Supabase- og Redis-klientene.{' '}
            <Badge tone={allOk ? 'success' : 'danger'}>
              {allOk ? 'Alt OK' : 'Problem oppdaget'}
            </Badge>
          </p>
        </header>

        <div
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          <ServiceCard
            name="Supabase"
            ok={supabase.ok}
            error={supabase.error}
            details={[
              { label: 'URL', value: supabase.url ?? '—' },
              {
                label: 'HTTP-status',
                value: supabase.status ?? '—',
              },
              {
                label: 'Svartid',
                value:
                  supabase.latencyMs != null ? `${supabase.latencyMs} ms` : '—',
              },
            ]}
          />

          <ServiceCard
            name="Redis"
            ok={redis.ok}
            error={redis.error}
            details={[
              { label: 'URL', value: redis.url },
              { label: 'PING', value: redis.pong ?? '—' },
              {
                label: 'Set/get round-trip',
                value: redis.roundtrip ? 'OK' : '—',
              },
              {
                label: 'Svartid',
                value: redis.latencyMs != null ? `${redis.latencyMs} ms` : '—',
              },
            ]}
          />
        </div>

        <p style={{ marginTop: 24, fontSize: 'var(--fs-sm)' }}>
          <a
            href="/status"
            style={{ color: 'var(--brand-hover)', fontWeight: 600 }}
          >
            ↻ Oppdater
          </a>
        </p>
      </div>
    </main>
  );
}
