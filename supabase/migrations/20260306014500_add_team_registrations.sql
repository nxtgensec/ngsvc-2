CREATE TABLE IF NOT EXISTS public.team_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_name TEXT NOT NULL,
  member1_name TEXT NOT NULL,
  member1_email TEXT NOT NULL,
  member2_name TEXT NOT NULL,
  member2_email TEXT NOT NULL,
  contact_number TEXT NOT NULL,
  organization TEXT NOT NULL,
  skills TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS team_registrations_team_name_lower_idx
ON public.team_registrations (LOWER(team_name));

ALTER TABLE public.team_registrations ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.team_registrations FROM anon;
REVOKE ALL ON TABLE public.team_registrations FROM authenticated;
