import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

/**
 * Connectivity check for the Supabase instance.
 * GET /api/supabase/status — confirms the server is reachable and the anon
 * key is accepted by PostgREST. Does not require any tables to exist.
 */
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    return NextResponse.json(
      { ok: false, error: 'Missing NEXT_PUBLIC_SUPABASE_URL / ANON_KEY' },
      { status: 500 },
    );
  }

  try {
    // Construct the SSR client (proves env + cookie wiring is valid)...
    await createClient();

    // ...then ping PostgREST's root to prove the server is reachable.
    const res = await fetch(`${url}/rest/v1/`, {
      headers: { apikey: anon, Authorization: `Bearer ${anon}` },
      cache: 'no-store',
    });

    return NextResponse.json({
      ok: res.ok,
      url,
      restStatus: res.status,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, url, error: err instanceof Error ? err.message : String(err) },
      { status: 502 },
    );
  }
}
