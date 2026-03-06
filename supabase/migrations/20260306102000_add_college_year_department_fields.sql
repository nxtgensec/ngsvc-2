ALTER TABLE public.team_registrations
  ADD COLUMN IF NOT EXISTS member1_college TEXT,
  ADD COLUMN IF NOT EXISTS member1_year TEXT,
  ADD COLUMN IF NOT EXISTS member1_department TEXT,
  ADD COLUMN IF NOT EXISTS member2_college TEXT,
  ADD COLUMN IF NOT EXISTS member2_year TEXT,
  ADD COLUMN IF NOT EXISTS member2_department TEXT;
