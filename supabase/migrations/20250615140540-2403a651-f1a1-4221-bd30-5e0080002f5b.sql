
-- First, let's completely remove the old trigger-based system
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- This new function can be called directly from our app.
-- It checks if a profile exists for the currently logged-in user and creates one if not.
-- This is safer and more reliable than a trigger.
CREATE OR REPLACE FUNCTION public.ensure_profile_exists()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER -- Allows this function to read from auth.users
AS $$
DECLARE
  _user_id uuid := auth.uid();
  _user_metadata jsonb;
  _user_email text;
BEGIN
  -- Exit early if a profile already exists for the current user
  IF EXISTS (SELECT 1 FROM public.profiles WHERE id = _user_id) THEN
    RAISE NOTICE 'Profile for user % already exists. Skipping creation.', _user_id;
    RETURN;
  END IF;

  -- If no profile exists, get the required data from the auth.users table
  SELECT raw_user_meta_data, email INTO _user_metadata, _user_email
  FROM auth.users WHERE id = _user_id;

  -- Create the profile
  INSERT INTO public.profiles (id, name, email, location, interests, dream, latitude, longitude)
  VALUES (
    _user_id,
    COALESCE(_user_metadata->>'name', ''),
    _user_email,
    COALESCE(_user_metadata->>'location', ''),
    COALESCE(ARRAY(SELECT jsonb_array_elements_text(_user_metadata->'interests')), '{}'::text[]),
    COALESCE(_user_metadata->>'dream', ''),
    (_user_metadata->>'latitude')::numeric,
    (_user_metadata->>'longitude')::numeric
  );

  RAISE NOTICE 'Successfully created profile for user %.', _user_id;

EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Error in ensure_profile_exists for user %: %', _user_id, SQLERRM;
END;
$$;
