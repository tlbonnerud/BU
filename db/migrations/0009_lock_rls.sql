-- 0009: Lås tabellene fra det offentlige PostgREST-API-et.
--
-- Vi bruker EGEN auth og kobler til via postgres-rollen / service-role — begge
-- BYPASSER RLS. Å skru på RLS UTEN policyer blokkerer anon/authenticated (det
-- offentlige API-et) helt, mens server-tilgang beholder full tilgang.
-- Studio-bla i tabeller funker fortsatt (privilegert tilkobling).
--
-- Bruk IKKE FORCE — da ville eieren (postgres) også blitt blokkert.
ALTER TABLE organisations         ENABLE ROW LEVEL SECURITY;
ALTER TABLE users                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_template ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_override ENABLE ROW LEVEL SECURITY;
ALTER TABLE shifts                ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_entries          ENABLE ROW LEVEL SECURITY;
