
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { geocodeLocation } from "@/utils/geocoding";

export interface ProfileState {
  name: string;
  location: string;
  dream: string;
  interests: string[];
  achievements: string[];
  bio: string;
}

export const useDashboardProfile = () => {
    const { user, setProfileAsComplete } = useAuth();
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState<ProfileState>({
        name: "",
        location: "",
        dream: "",
        interests: [],
        achievements: [],
        bio: "",
    });
    const [initialLocation, setInitialLocation] = useState("");

    const fetchProfile = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('profiles' as any)
                .select('name, location, dream, interests, achievements, bio')
                .eq('id', user.id)
                .single();

            if (error && error.code !== 'PGRST116') {
                console.error('Error fetching profile:', error);
                toast({ title: "Error", description: "Could not fetch your profile.", variant: "destructive" });
                return;
            }

            if (data) {
                const profileData = data as any;
                setProfile({
                    name: profileData.name || "",
                    location: profileData.location || "",
                    dream: profileData.dream || "",
                    interests: profileData.interests || [],
                    achievements: profileData.achievements || [],
                    bio: profileData.bio || "",
                });
                setInitialLocation(profileData.location || "");
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            toast({ title: "Error", description: "An unexpected error occurred while fetching your profile.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    }, [user, toast]);

    useEffect(() => {
        if (user) {
            fetchProfile();
        }
    }, [user, fetchProfile]);

    const handleSave = async () => {
        if (!user) return;

        setSaving(true);

        const profileDataToUpdate = {
            name: profile.name,
            location: profile.location,
            dream: profile.dream,
            interests: profile.interests,
            achievements: profile.achievements,
            bio: profile.bio,
        };

        const updatePayload: any = { ...profileDataToUpdate };

        if (profile.location && profile.location !== initialLocation) {
            try {
                const coordinates = await geocodeLocation(profile.location);
                if (coordinates) {
                    updatePayload.latitude = coordinates.lat;
                    updatePayload.longitude = coordinates.lng;
                } else {
                    toast({
                        title: "Location Warning",
                        description: "Couldn't find coordinates for your new location. It might not appear on the globe correctly.",
                    });
                }
            } catch (err) {
                console.error("Geocoding failed during profile update:", err);
            }
        }

        try {
            const { error } = await supabase
                .from('profiles' as any)
                .update(updatePayload)
                .eq('id', user.id);

            if (error) {
                console.error('Error updating profile:', error);
                toast({
                    title: "Error",
                    description: `Failed to update profile: ${error.message}`,
                    variant: "destructive",
                });
                return;
            }

            toast({
                title: "Success",
                description: "Profile updated successfully!",
            });

            if (profile.location && profile.dream) {
                setProfileAsComplete();
            }

            await fetchProfile(); // Re-fetch to show updated data
        } catch (error: any) {
            console.error('Unexpected error updating profile:', error);
            toast({
                title: "Error",
                description: `An unexpected error occurred: ${error.message}`,
                variant: "destructive",
            });
        } finally {
            setSaving(false);
        }
    };

    return {
        profile,
        setProfile,
        loading,
        saving,
        handleSave,
    };
};
