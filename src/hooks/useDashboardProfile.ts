
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
}

export const useDashboardProfile = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState<ProfileState>({
        name: "",
        location: "",
        dream: "",
        interests: [],
        achievements: []
    });
    const [initialLocation, setInitialLocation] = useState("");

    const fetchProfile = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('name, location, dream, interests, achievements')
                .eq('id', user.id)
                .single();

            if (error && error.code !== 'PGRST116') {
                console.error('Error fetching profile:', error);
                toast({ title: "Error", description: "Could not fetch your profile.", variant: "destructive" });
                return;
            }

            if (data) {
                setProfile({
                    name: data.name || "",
                    location: data.location || "",
                    dream: data.dream || "",
                    interests: data.interests || [],
                    achievements: data.achievements || []
                });
                setInitialLocation(data.location || "");
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

        const profileUpdateData: any = {
            id: user.id,
            email: user.email || "",
            name: profile.name,
            location: profile.location,
            dream: profile.dream,
            interests: profile.interests,
            achievements: profile.achievements,
        };

        if (profile.location && profile.location !== initialLocation) {
            try {
                const coordinates = await geocodeLocation(profile.location);
                if (coordinates) {
                    profileUpdateData.latitude = coordinates.lat;
                    profileUpdateData.longitude = coordinates.lng;
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
                .from('profiles')
                .upsert(profileUpdateData);

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
