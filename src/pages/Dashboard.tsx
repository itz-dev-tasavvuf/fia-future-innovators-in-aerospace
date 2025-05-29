
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, User, MapPin, Star, Trophy, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import PixelCard from "@/components/PixelCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    location: "",
    dream: "",
    interests: [] as string[],
    achievements: [] as string[]
  });
  const [newInterest, setNewInterest] = useState("");
  const [newAchievement, setNewAchievement] = useState("");

  const spaceInterests = [
    "Space Medicine", "Rocketry", "Astronomy", "Astrophysics", 
    "Planetary Science", "Space Engineering", "Astrobiology", "Satellite Technology"
  ];

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
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
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          name: profile.name,
          email: user.email || "",
          location: profile.location,
          dream: profile.dream,
          interests: profile.interests,
          achievements: profile.achievements
        });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update profile. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addInterest = () => {
    if (newInterest && !profile.interests.includes(newInterest)) {
      setProfile(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest]
      }));
      setNewInterest("");
    }
  };

  const removeInterest = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const addAchievement = () => {
    if (newAchievement) {
      setProfile(prev => ({
        ...prev,
        achievements: [...prev.achievements, newAchievement]
      }));
      setNewAchievement("");
    }
  };

  const removeAchievement = (index: number) => {
    setProfile(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="bg-slate-800 border-purple-500/30">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Please Log In</h2>
            <Button onClick={() => navigate("/")} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Dashboard</h1>
            <p className="text-purple-200">Manage your space journey profile</p>
          </div>
          <Button 
            onClick={() => navigate("/discover")}
            variant="outline"
            className="border-purple-500 text-purple-200 hover:bg-purple-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Discover
          </Button>
        </div>

        <PixelCard variant="blue" className="rounded-3xl max-w-4xl mx-auto">
          <Card className="bg-transparent border-transparent rounded-3xl">
            <CardHeader className="text-center pb-8">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <User className="h-16 w-16 text-white" />
              </div>
              <CardTitle className="text-white text-4xl font-bold mb-2">Edit Profile</CardTitle>
              <CardDescription className="text-purple-200 text-xl">
                Update your space exploration journey
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-white text-lg font-medium">Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-slate-700/80 border-purple-500/40 text-white focus:border-purple-400 rounded-xl h-12"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <Label htmlFor="location" className="text-white text-lg font-medium">Location</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                    className="bg-slate-700/80 border-purple-500/40 text-white focus:border-purple-400 rounded-xl h-12"
                    placeholder="Your location"
                  />
                </div>
              </div>

              {/* Dream */}
              <div>
                <Label htmlFor="dream" className="text-white text-lg font-medium flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  Space Dream
                </Label>
                <Textarea
                  id="dream"
                  value={profile.dream}
                  onChange={(e) => setProfile(prev => ({ ...prev, dream: e.target.value }))}
                  className="bg-slate-700/80 border-purple-500/40 text-white focus:border-purple-400 rounded-xl"
                  placeholder="Share your space exploration dream..."
                  rows={3}
                />
              </div>

              {/* Interests */}
              <div>
                <Label className="text-white text-lg font-medium">Interests & Expertise</Label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.interests.map((interest) => (
                    <Badge 
                      key={interest} 
                      variant="secondary" 
                      className="bg-purple-600 text-white hover:bg-purple-700 cursor-pointer"
                      onClick={() => removeInterest(interest)}
                    >
                      {interest}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    className="bg-slate-700/80 border-purple-500/40 text-white focus:border-purple-400 rounded-xl"
                    placeholder="Add an interest..."
                    list="interests-list"
                  />
                  <datalist id="interests-list">
                    {spaceInterests.map((interest) => (
                      <option key={interest} value={interest} />
                    ))}
                  </datalist>
                  <Button 
                    onClick={addInterest}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <Label className="text-white text-lg font-medium flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  Achievements
                </Label>
                <div className="space-y-2 mb-4">
                  {profile.achievements.map((achievement, index) => (
                    <div key={index} className="bg-slate-800/50 rounded-lg p-3 flex justify-between items-center">
                      <p className="text-purple-200">{achievement}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAchievement(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                    className="bg-slate-700/80 border-purple-500/40 text-white focus:border-purple-400 rounded-xl"
                    placeholder="Add an achievement..."
                  />
                  <Button 
                    onClick={addAchievement}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Save Button */}
              <div className="text-center pt-4">
                <Button 
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3 text-lg"
                >
                  <Save className="mr-2 h-5 w-5" />
                  {loading ? "Saving..." : "Save Profile"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </PixelCard>
      </div>
    </div>
  );
};

export default Dashboard;
