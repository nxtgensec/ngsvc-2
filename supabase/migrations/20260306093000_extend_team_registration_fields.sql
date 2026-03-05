ALTER TABLE public.team_registrations
  ADD COLUMN IF NOT EXISTS member1_contact TEXT,
  ADD COLUMN IF NOT EXISTS member1_linkedin TEXT,
  ADD COLUMN IF NOT EXISTS member1_github TEXT,
  ADD COLUMN IF NOT EXISTS member1_post_link TEXT,
  ADD COLUMN IF NOT EXISTS member2_contact TEXT,
  ADD COLUMN IF NOT EXISTS member2_linkedin TEXT,
  ADD COLUMN IF NOT EXISTS member2_github TEXT,
  ADD COLUMN IF NOT EXISTS member2_post_link TEXT;

ALTER TABLE public.team_registrations
  ALTER COLUMN contact_number DROP NOT NULL,
  ALTER COLUMN organization DROP NOT NULL;
