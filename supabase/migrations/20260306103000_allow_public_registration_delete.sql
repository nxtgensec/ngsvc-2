GRANT DELETE ON TABLE public.team_registrations TO anon;
GRANT DELETE ON TABLE public.team_registrations TO authenticated;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'team_registrations'
      AND policyname = 'Allow public team registration delete'
  ) THEN
    CREATE POLICY "Allow public team registration delete"
    ON public.team_registrations
    FOR DELETE
    TO anon, authenticated
    USING (true);
  END IF;
END
$$;
