REVOKE SELECT, INSERT, UPDATE, DELETE ON TABLE public.team_registrations FROM anon;
REVOKE SELECT, INSERT, UPDATE, DELETE ON TABLE public.team_registrations FROM authenticated;

DROP POLICY IF EXISTS "Allow public team registration insert" ON public.team_registrations;
DROP POLICY IF EXISTS "Allow public team registration select" ON public.team_registrations;
DROP POLICY IF EXISTS "Allow public team registration update" ON public.team_registrations;
DROP POLICY IF EXISTS "Allow public team registration delete" ON public.team_registrations;
