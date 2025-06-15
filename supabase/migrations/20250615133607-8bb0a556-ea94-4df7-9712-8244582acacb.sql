
-- First, let's drop the existing trigger and function to start fresh
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Now let's recreate the function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    name, 
    email, 
    location, 
    interests, 
    dream, 
    latitude, 
    longitude
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'location', ''),
    COALESCE(
      ARRAY(SELECT jsonb_array_elements_text(NEW.raw_user_meta_data->'interests')),
      ARRAY[]::text[]
    ),
    COALESCE(NEW.raw_user_meta_data->>'dream', ''),
    CASE 
      WHEN NEW.raw_user_meta_data->>'latitude' IS NOT NULL 
      THEN (NEW.raw_user_meta_data->>'latitude')::numeric 
      ELSE NULL 
    END,
    CASE 
      WHEN NEW.raw_user_meta_data->>'longitude' IS NOT NULL 
      THEN (NEW.raw_user_meta_data->>'longitude')::numeric 
      ELSE NULL 
    END
  );
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't block user creation
    RAISE WARNING 'Failed to create profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();
