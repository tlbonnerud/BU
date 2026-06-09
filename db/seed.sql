-- Dev-seed (VALGFRITT) — speiler app-mocken. Kjøres IKKE av apply.sh.
-- password_hash er NULL: brukerne settes opp via invitasjon/registrering i appen.
--   psql "$DATABASE_URL" -f db/seed.sql

INSERT INTO organisations (id, navn, org_nr, tidssone) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Nordvik AS', '925123456', 'Europe/Oslo')
ON CONFLICT (id) DO NOTHING;

INSERT INTO users (organisation_id, navn, epost, rolle, status) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Ola Nordmann', 'ola@bedrift.no', 'admin',  'aktiv'),
  ('00000000-0000-0000-0000-000000000001', 'Kim Berge',    'kim@bedrift.no', 'ansatt', 'aktiv'),
  ('00000000-0000-0000-0000-000000000001', 'Liv Aas',      'liv@bedrift.no', 'ansatt', 'invitert'),
  ('00000000-0000-0000-0000-000000000001', 'Per Sund',     'per@bedrift.no', 'ansatt', 'aktiv'),
  ('00000000-0000-0000-0000-000000000001', 'Mia Holt',     'mia@bedrift.no', 'ansatt', 'aktiv'),
  ('00000000-0000-0000-0000-000000000001', 'Tor Lie',      'tor@bedrift.no', 'ansatt', 'inaktiv'),
  ('00000000-0000-0000-0000-000000000001', 'Nina Vik',     'nina@bedrift.no','ansatt', 'aktiv')
ON CONFLICT (epost) DO NOTHING;

-- Eksempel: Kim sin "typiske uke" (man–fre 08–16, kan jobbe)
INSERT INTO availability_template (user_id, ukedag, fra_klokke, til_klokke, preferanse)
SELECT u.id, g.ukedag, TIME '08:00', TIME '16:00', 'kan'
FROM users u, generate_series(0, 4) AS g(ukedag)
WHERE u.epost = 'kim@bedrift.no'
ON CONFLICT DO NOTHING;

-- Eksempel: Kim er utilgjengelig hele sommerferien (override slår malen)
INSERT INTO availability_override (user_id, fra_dato, til_dato, preferanse, type, notat)
SELECT u.id, DATE '2026-07-01', DATE '2026-07-21', 'utilgjengelig', 'erstatt', 'Sommerferie'
FROM users u WHERE u.epost = 'kim@bedrift.no'
ON CONFLICT DO NOTHING;
