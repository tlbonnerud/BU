-- 0007: time_entries
CREATE TABLE IF NOT EXISTS time_entries (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,   -- bevar historikk
  shift_id      uuid REFERENCES shifts(id) ON DELETE SET NULL,           -- null = uten planlagt vakt
  inn_tid       timestamptz NOT NULL,
  ut_tid        timestamptz,
  -- Faktiske timer, beregnet i Postgres. NULL mens vakta er åpen (ut_tid IS NULL).
  timer         numeric(6,2) GENERATED ALWAYS AS
                  (round((EXTRACT(EPOCH FROM (ut_tid - inn_tid)) / 3600.0)::numeric, 2)) STORED,
  status        time_entry_status NOT NULL DEFAULT 'venter',
  godkjent_av   uuid REFERENCES users(id) ON DELETE SET NULL,            -- admin som behandlet
  behandlet_tid timestamptz,
  opprettet     timestamptz NOT NULL DEFAULT now(),
  endret        timestamptz NOT NULL DEFAULT now(),
  CHECK (ut_tid IS NULL OR ut_tid > inn_tid)
);
CREATE INDEX IF NOT EXISTS time_entries_user_inn_idx    ON time_entries (user_id, inn_tid);
CREATE INDEX IF NOT EXISTS time_entries_shift_idx       ON time_entries (shift_id);
CREATE INDEX IF NOT EXISTS time_entries_godkjent_av_idx ON time_entries (godkjent_av);
CREATE INDEX IF NOT EXISTS time_entries_status_idx      ON time_entries (status);
