-- 0006: shifts
CREATE TABLE IF NOT EXISTS shifts (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id  uuid NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  user_id          uuid REFERENCES users(id) ON DELETE SET NULL,  -- null = ubemannet vakt
  start_tid        timestamptz NOT NULL,
  slutt_tid        timestamptz NOT NULL,
  rolle            varchar,                              -- stilling for vakten
  status           shift_status NOT NULL DEFAULT 'kladd',
  publisert_tid    timestamptz,                          -- satt når status → publisert
  opprettet        timestamptz NOT NULL DEFAULT now(),
  endret           timestamptz NOT NULL DEFAULT now(),
  CHECK (slutt_tid > start_tid)
);
CREATE INDEX IF NOT EXISTS shifts_org_start_idx ON shifts (organisation_id, start_tid);
CREATE INDEX IF NOT EXISTS shifts_user_idx      ON shifts (user_id);

-- Ingen dobbeltbooking for samme bruker (krever btree_gist fra 0001).
ALTER TABLE shifts DROP CONSTRAINT IF EXISTS shifts_no_overlap;
ALTER TABLE shifts ADD CONSTRAINT shifts_no_overlap
  EXCLUDE USING gist (user_id WITH =, tstzrange(start_tid, slutt_tid) WITH &&)
  WHERE (user_id IS NOT NULL);
