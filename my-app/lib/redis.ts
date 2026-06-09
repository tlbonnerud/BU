import 'server-only';
import { createClient } from 'redis';

/**
 * Redis client (node-redis), mirroring the laanesystem setup.
 * Used for sessions + refresh tokens (and any caching). Server-only.
 *
 * A single client is reused across hot reloads in dev via globalThis, and the
 * connection is opened lazily (not at import) so `next build` never tries to
 * connect.
 */
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

type RedisClient = ReturnType<typeof createClient>;

const globalForRedis = globalThis as unknown as { __redis?: RedisClient };

export const redis: RedisClient =
  globalForRedis.__redis ?? createClient({ url: REDIS_URL });

if (!globalForRedis.__redis) {
  redis.on('error', (err) => console.error('Redis Client Error', err));
  redis.on('connect', () => console.log('Connected to Redis'));
  globalForRedis.__redis = redis;
}

/** Open the connection on first use. */
export async function getRedis(): Promise<RedisClient> {
  if (!redis.isOpen) await redis.connect();
  return redis;
}

export interface RedisHealth {
  ok: boolean;
  pong?: string;
  roundtrip?: boolean;
  latencyMs?: number;
  url: string;
  error?: string;
}

/** Connectivity check: PING + a set/get round-trip on a throwaway key. */
export async function pingRedis(): Promise<RedisHealth> {
  // Redact any credentials in the URL before returning it to the page.
  const safeUrl = REDIS_URL.replace(/\/\/[^@]*@/, '//***@');
  try {
    const client = await getRedis();
    const start = Date.now();
    const pong = await client.ping();
    const token = `bu-health-${start}`;
    await client.set('bu:healthcheck', token, { EX: 30 });
    const readback = await client.get('bu:healthcheck');
    return {
      ok: pong === 'PONG' && readback === token,
      pong,
      roundtrip: readback === token,
      latencyMs: Date.now() - start,
      url: safeUrl,
    };
  } catch (err) {
    return {
      ok: false,
      url: safeUrl,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
