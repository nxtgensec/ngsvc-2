GRANT SELECT ON TABLE public.team_registrations TO anon;
GRANT SELECT ON TABLE public.team_registrations TO authenticated;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'team_registrations'
      AND policyname = 'Allow public team registration select'
  ) THEN
    CREATE POLICY "Allow public team registration select"
    ON public.team_registrations
    FOR SELECT
    TO anon, authenticated
    USING (true);
  END IF;
END
$$;
