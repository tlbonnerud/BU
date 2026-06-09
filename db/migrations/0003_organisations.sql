-- 0003: organisations
CREATE TABLE IF NOT EXISTS organisations (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  navn       varchar NOT NULL,
  org_nr     varchar UNIQUE,
  tidssone   varchar NOT NULL DEFAULT 'Europe/Oslo',  -- ekspander malen i lokal tid (DST)
  opprettet  timestamptz NOT NULL DEFAULT now(),
  endret     timestamptz NOT NULL DEFAULT now()
);
