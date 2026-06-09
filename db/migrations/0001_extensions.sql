-- 0001: Extensions
-- gen_random_uuid() er i core fra PG13, men pgcrypto er ufarlig å ha med.
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
-- Trengs for EXCLUDE-constrainten på (uuid =, tstzrange &&) i shifts.
CREATE EXTENSION IF NOT EXISTS btree_gist;
