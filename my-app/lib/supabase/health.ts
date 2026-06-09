import 'server-only';
import { createClient } from '@supabase/supabase-js';

export interface SupabaseHealth {
  ok: boolean;
  status?: number;
  latencyMs?: number;
  url?: string;
  error?: string;
}

/**
 * Connectivity check for Supabase. Constructs a supabase-js client (proving the
 * config is valid) and pings PostgREST's root, which responds without requiring
 * any tables to exist. Prefers the server-side URL/keys, falling back to the
 * public ones.
 */
export async function pingSupabase(): Promise<SupabaseHealth> {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return { ok: false, error: 'Missing SUPABASE_URL / key in env' };
  }

  try {
    // Construct the client (validates URL + key shape).
    createClient(url, key, { auth: { persistSession: false } });

    const start = Date.now();
    const res = await fetch(`${url}/rest/v1/`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      cache: 'no-store',
    });

    return { ok: res.ok, status: res.status, latencyMs: Date.now() - start, url };
  } catch (err) {
    return {
      ok: false,
      url,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
