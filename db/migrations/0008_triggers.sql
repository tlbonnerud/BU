-- 0008: endret (updated_at) — settes automatisk ved UPDATE
CREATE OR REPLACE FUNCTION set_endret() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  NEW.endret = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_endret ON organisations;
CREATE TRIGGER trg_endret BEFORE UPDATE ON organisations
  FOR EACH ROW EXECUTE FUNCTION set_endret();

DROP TRIGGER IF EXISTS trg_endret ON users;
CREATE TRIGGER trg_endret BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION set_endret();

DROP TRIGGER IF EXISTS trg_endret ON shifts;
CREATE TRIGGER trg_endret BEFORE UPDATE ON shifts
  FOR EACH ROW EXECUTE FUNCTION set_endret();

DROP TRIGGER IF EXISTS trg_endret ON time_entries;
CREATE TRIGGER trg_endret BEFORE UPDATE ON time_entries
  FOR EACH ROW EXECUTE FUNCTION set_endret();
