
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  name: string;
  email: string;
  location: string;
  latitude?: number;
  lng?: number;
  lat?: number;
  longitude?: number;
  interests: string[];
  dream: string;
  achievements: string[];
  created_at: string;
}

export const useProfiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfiles();

    // Set up realtime subscription
    const channel = supabase
      .channel('profiles-changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'profiles' 
        }, 
        () => {
          fetchProfiles();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching profiles:', error);
        return;
      }

      // Transform Supabase profiles to match the expected format
      const transformedProfiles = data?.map((profile: any) => ({
        ...profile,
        lat: profile.latitude,
        lng: profile.longitude,
        achievements: profile.achievements || []
      })) || [];

      setProfiles(transformedProfiles);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  return { profiles, loading, refetch: fetchProfiles };
};
