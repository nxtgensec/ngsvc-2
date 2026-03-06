GRANT UPDATE ON TABLE public.team_registrations TO anon;
GRANT UPDATE ON TABLE public.team_registrations TO authenticated;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'team_registrations'
      AND policyname = 'Allow public team registration update'
  ) THEN
    CREATE POLICY "Allow public team registration update"
    ON public.team_registrations
    FOR UPDATE
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);
  END IF;
END
$$;
