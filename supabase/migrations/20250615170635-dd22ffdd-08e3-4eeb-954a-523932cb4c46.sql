
-- 1. Clean up previous attempts to avoid conflicts.
DROP FUNCTION IF EXISTS public.ensure_profile_exists();
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 2. Create the function that will be triggered on new user creation.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert a new row into the public.profiles table with data from the new user.
  -- Use COALESCE to handle cases where metadata might be missing.
  INSERT INTO public.profiles (id, name, email, location, interests, dream, latitude, longitude)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'location', ''),
    COALESCE(ARRAY(SELECT jsonb_array_elements_text(NEW.raw_user_meta_data->'interests')), '{}'::text[]),
    COALESCE(NEW.raw_user_meta_data->>'dream', ''),
    (NEW.raw_user_meta_data->>'latitude')::numeric, -- Will be NULL if not present, which is OK.
    (NEW.raw_user_meta_data->>'longitude')::numeric -- Will be NULL if not present, which is OK.
  );
  RETURN NEW;
END;
$$;

-- 3. Create the trigger that executes the function after a new user is inserted.
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
