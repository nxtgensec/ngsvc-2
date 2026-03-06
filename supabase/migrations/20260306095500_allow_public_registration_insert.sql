GRANT INSERT ON TABLE public.team_registrations TO anon;
GRANT INSERT ON TABLE public.team_registrations TO authenticated;

CREATE POLICY "Allow public team registration insert"
ON public.team_registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
