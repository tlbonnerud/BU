-- 0005: availability — template ⊕ override (render-on-read, aldri materialisert)

-- Den "typiske uka". Default som rendres; aldri lagret per dato.
CREATE TABLE IF NOT EXISTS availability_template (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  ukedag      smallint NOT NULL CHECK (ukedag BETWEEN 0 AND 6),  -- 0=mandag … 6=søndag
  fra_klokke  time NOT NULL,
  til_klokke  time NOT NULL,
  preferanse  availability_preference NOT NULL DEFAULT 'kan',
  opprettet   timestamptz NOT NULL DEFAULT now(),
  CHECK (til_klokke > fra_klokke)
);
CREATE INDEX IF NOT EXISTS availability_template_user_ukedag_idx
  ON availability_template (user_id, ukedag);

-- Overstyringer/forespørsler for konkrete datoer. Vinner over malen.
CREATE TABLE IF NOT EXISTS availability_override (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  fra_dato    date NOT NULL,
  til_dato    date NOT NULL,                 -- = fra_dato for én dag; spenn for ferie
  fra_klokke  time,                          -- null = hele dagen
  til_klokke  time,
  preferanse  availability_preference NOT NULL DEFAULT 'utilgjengelig',
  type        override_type NOT NULL DEFAULT 'erstatt',
  notat       text,
  opprettet   timestamptz NOT NULL DEFAULT now(),
  CHECK (til_dato >= fra_dato),
  CHECK (til_klokke IS NULL OR fra_klokke IS NULL OR til_klokke > fra_klokke)
);
CREATE INDEX IF NOT EXISTS availability_override_user_dato_idx
  ON availability_override (user_id, fra_dato);
