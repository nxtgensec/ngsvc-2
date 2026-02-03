-- Create visitors table to track unique IPs
CREATE TABLE public.visitors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read visitors count
CREATE POLICY "Anyone can view visitors"
ON public.visitors
FOR SELECT
USING (true);

-- Allow inserts from edge functions (service role)
CREATE POLICY "Anyone can insert visitors"
ON public.visitors
FOR INSERT
WITH CHECK (true);

-- Enable realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.visitors;