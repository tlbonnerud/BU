-- 0010: expand_availability — render-on-read av "mal ⊕ override".
--
-- Gir konkret tilgjengelighet for én bruker i et datospenn ved å ekspandere
-- den typiske uka og la overstyringer vinne. Tider beregnes i organisasjonens
-- tidssone (korrekt over sommertid).
--
--   SELECT * FROM expand_availability('<user-uuid>', '2026-06-01', '2026-06-30');
--
-- Regler:
--   * 'erstatt'-override for en dato → malen ignoreres den dagen.
--   * 'tillegg'-override → legges til i tillegg til malen.
--   * fra_klokke/til_klokke NULL på override → hele dagen (00:00 → neste 00:00).
--   * ukedag: 0=mandag … 6=søndag (ISODOW-1).

CREATE OR REPLACE FUNCTION expand_availability(
  p_user uuid,
  p_fra  date,
  p_til  date
)
RETURNS TABLE (
  dato       date,
  start_tid  timestamptz,
  slutt_tid  timestamptz,
  preferanse availability_preference,
  kilde      text
)
LANGUAGE sql STABLE AS $$
  WITH tz AS (
    SELECT o.tidssone
    FROM users u
    JOIN organisations o ON o.id = u.organisation_id
    WHERE u.id = p_user
  ),
  dager AS (
    SELECT d::date AS dato
    FROM generate_series(p_fra, p_til, interval '1 day') AS d
  ),
  -- datoer som har en 'erstatt'-override → malen gjelder ikke
  erstattet AS (
    SELECT DISTINCT dg.dato
    FROM dager dg
    JOIN availability_override ov
      ON ov.user_id = p_user
     AND ov.type = 'erstatt'
     AND dg.dato BETWEEN ov.fra_dato AND ov.til_dato
  ),
  fra_mal AS (
    SELECT dg.dato,
           (dg.dato + t.fra_klokke) AT TIME ZONE tz.tidssone AS start_tid,
           (dg.dato + t.til_klokke) AT TIME ZONE tz.tidssone AS slutt_tid,
           t.preferanse,
           'mal'::text AS kilde
    FROM dager dg
    CROSS JOIN tz
    JOIN availability_template t
      ON t.user_id = p_user
     AND t.ukedag = (EXTRACT(ISODOW FROM dg.dato)::int - 1)
    WHERE dg.dato NOT IN (SELECT dato FROM erstattet)
  ),
  fra_override AS (
    SELECT dg.dato,
           CASE WHEN ov.fra_klokke IS NULL
                THEN dg.dato::timestamp AT TIME ZONE tz.tidssone
                ELSE (dg.dato + ov.fra_klokke) AT TIME ZONE tz.tidssone END AS start_tid,
           CASE WHEN ov.til_klokke IS NULL
                THEN (dg.dato + 1)::timestamp AT TIME ZONE tz.tidssone
                ELSE (dg.dato + ov.til_klokke) AT TIME ZONE tz.tidssone END AS slutt_tid,
           ov.preferanse,
           'override'::text AS kilde
    FROM dager dg
    CROSS JOIN tz
    JOIN availability_override ov
      ON ov.user_id = p_user
     AND dg.dato BETWEEN ov.fra_dato AND ov.til_dato
  )
  SELECT dato, start_tid, slutt_tid, preferanse, kilde FROM fra_mal
  UNION ALL
  SELECT dato, start_tid, slutt_tid, preferanse, kilde FROM fra_override
  ORDER BY dato, start_tid;
$$;
