-- Daily visitor tracking using India timezone day boundaries.
CREATE TABLE IF NOT EXISTS public.daily_visitors (
  day DATE PRIMARY KEY,
  unique_visitors INTEGER NOT NULL DEFAULT 0,
  total_hits INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.daily_visitor_hashes (
  day DATE NOT NULL,
  ip_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (day, ip_hash)
);

ALTER TABLE public.daily_visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_visitor_hashes ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.daily_visitors FROM anon;
REVOKE ALL ON TABLE public.daily_visitors FROM authenticated;
REVOKE ALL ON TABLE public.daily_visitor_hashes FROM anon;
REVOKE ALL ON TABLE public.daily_visitor_hashes FROM authenticated;

CREATE OR REPLACE FUNCTION public.increment_daily_total_hits(target_day DATE)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.daily_visitors
  SET total_hits = total_hits + 1,
      updated_at = now()
  WHERE day = target_day;
END;
$$;

CREATE OR REPLACE FUNCTION public.increment_daily_unique_visitors(target_day DATE)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.daily_visitors
  SET unique_visitors = unique_visitors + 1,
      updated_at = now()
  WHERE day = target_day;
END;
$$;

REVOKE ALL ON FUNCTION public.increment_daily_total_hits(DATE) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.increment_daily_unique_visitors(DATE) FROM PUBLIC;

CREATE OR REPLACE FUNCTION public.ensure_india_daily_row()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  india_today DATE;
BEGIN
  india_today := (now() AT TIME ZONE 'Asia/Kolkata')::date;
  INSERT INTO public.daily_visitors (day)
  VALUES (india_today)
  ON CONFLICT (day) DO NOTHING;
END;
$$;

REVOKE ALL ON FUNCTION public.ensure_india_daily_row() FROM PUBLIC;

DO $cron$
BEGIN
  BEGIN
    CREATE EXTENSION IF NOT EXISTS pg_cron;
  EXCEPTION
    WHEN insufficient_privilege OR undefined_file THEN
      RAISE NOTICE 'pg_cron is not available in this environment.';
      RETURN;
  END;

  PERFORM cron.unschedule(jobid)
  FROM cron.job
  WHERE jobname = 'ensure-india-daily-visitors-row';

  -- Runs daily at 00:05 IST (18:35 UTC).
  PERFORM cron.schedule(
    'ensure-india-daily-visitors-row',
    '35 18 * * *',
    $$SELECT public.ensure_india_daily_row();$$
  );
END $cron$;
