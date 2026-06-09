import 'server-only';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Service-role Supabase client — bypasses Row Level Security.
 * SERVER ONLY. Never import this into a Client Component; the `server-only`
 * import will throw at build time if you do. Use it for trusted backend work
 * (admin tasks, seeding, cron) inside Route Handlers or Server Actions.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}
