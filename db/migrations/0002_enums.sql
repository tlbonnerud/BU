-- 0002: Enums (idempotent — hopper over hvis de finnes)
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('ansatt', 'admin');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE user_status AS ENUM ('invitert', 'aktiv', 'inaktiv');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE availability_preference AS ENUM ('kan', 'oensker', 'utilgjengelig');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE override_type AS ENUM ('erstatt', 'tillegg');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE shift_status AS ENUM ('kladd', 'publisert');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE time_entry_status AS ENUM ('venter', 'godkjent', 'avvist');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
