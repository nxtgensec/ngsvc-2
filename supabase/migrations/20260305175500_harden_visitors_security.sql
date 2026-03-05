-- Harden visitor tracking data model and access controls.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Replace raw IP storage with hashed identifiers.
ALTER TABLE public.visitors
ADD COLUMN IF NOT EXISTS ip_hash TEXT;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'visitors'
      AND column_name = 'ip_address'
  ) THEN
    UPDATE public.visitors
    SET ip_hash = encode(digest(ip_address, 'sha256'), 'hex')
    WHERE ip_hash IS NULL;
  END IF;
END $$;

-- Only enforce NOT NULL after backfill has run.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.visitors WHERE ip_hash IS NULL) THEN
    ALTER TABLE public.visitors
    ALTER COLUMN ip_hash SET NOT NULL;
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS visitors_ip_hash_key
ON public.visitors (ip_hash);

ALTER TABLE public.visitors
DROP COLUMN IF EXISTS ip_address;

-- Remove public access policies.
DROP POLICY IF EXISTS "Anyone can view visitors" ON public.visitors;
DROP POLICY IF EXISTS "Anyone can insert visitors" ON public.visitors;

-- Remove direct table privileges for anon/authenticated roles.
REVOKE ALL ON TABLE public.visitors FROM anon;
REVOKE ALL ON TABLE public.visitors FROM authenticated;

-- Do not broadcast visitor records over realtime.
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime DROP TABLE public.visitors;
  EXCEPTION
    WHEN undefined_object THEN
      NULL;
  END;
END $$;
