-- 0004: users
CREATE TABLE IF NOT EXISTS users (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id  uuid NOT NULL REFERENCES organisations(id) ON DELETE RESTRICT,
  navn             varchar NOT NULL,
  epost            varchar NOT NULL UNIQUE,            -- global unik = login-nøkkel
  telefon          varchar,
  rolle            user_role   NOT NULL DEFAULT 'ansatt',
  status           user_status NOT NULL DEFAULT 'invitert',
  password_hash    varchar,                            -- null = invitert, ikke satt enda
  invite_token     varchar UNIQUE,
  invited_at       timestamptz,
  accepted_at      timestamptz,
  varsler          jsonb NOT NULL DEFAULT '{}'::jsonb, -- varslingsvalg (Profil-toggles)
  deaktivert_tid   timestamptz,                        -- satt ved soft-delete (status=inaktiv)
  opprettet        timestamptz NOT NULL DEFAULT now(),
  endret           timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS users_organisation_id_idx ON users (organisation_id);
CREATE INDEX IF NOT EXISTS users_status_idx          ON users (status);
