
-- Drop existing policies to avoid conflicts, just in case.
DROP POLICY IF EXISTS "Profiles are viewable by everyone." ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile." ON public.profiles;

-- Enable Row Level Security on the profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for viewing profiles: Everyone can see all profiles.
-- This is needed for the "Discover" page to work correctly.
CREATE POLICY "Profiles are viewable by everyone."
  ON public.profiles FOR SELECT
  USING (true);

-- Create policy for inserting profiles: Users can create their own profile.
-- While the signup trigger handles this, this policy is good for robustness.
CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create policy for updating profiles: Users can only update their own profile.
-- This is the key policy that should fix the saving issue on the dashboard.
CREATE POLICY "Users can update their own profile."
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);
