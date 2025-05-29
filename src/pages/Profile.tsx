
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Star, Trophy } from "lucide-react";
import { mockUsers } from "@/data/mockData";
import { supabase } from "@/integrations/supabase/client";
import PixelCard from "@/components/PixelCard";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;

      // Check if it's a mock user ID
      if (id.startsWith('mock-')) {
        const mockId = parseInt(id.replace('mock-', ''));
        const mockUser = mockUsers.find(u => u.id === mockId);
        setUser(mockUser);
        setLoading(false);
        return;
      }

      // Fetch real user from Supabase
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          setUser(null);
        } else {
          setUser({
            ...data,
            achievements: data.achievements || []
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="bg-slate-800 border-purple-500/30">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">User Not Found</h2>
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
          <Button 
            onClick={() => navigate(-1)}
            variant="outline"
            className="border-purple-500 text-purple-200 hover:bg-purple-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <PixelCard variant="blue" className="rounded-3xl max-w-4xl mx-auto">
          <Card className="bg-transparent border-transparent rounded-3xl">
            <CardHeader className="text-center pb-8">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">{user.name.charAt(0)}</span>
              </div>
              <CardTitle className="text-white text-4xl font-bold mb-2">{user.name}</CardTitle>
              <CardDescription className="text-purple-200 text-xl flex items-center justify-center gap-2">
                <MapPin className="h-5 w-5" />
                {user.location}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Dream Section */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-2">
                  <Star className="h-6 w-6 text-yellow-400" />
                  Space Dream
                </h3>
                <p className="text-lg text-purple-200 italic">"{user.dream}"</p>
              </div>

              {/* Interests */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Interests & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="bg-purple-600 text-white hover:bg-purple-700">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  Achievements
                </h3>
                <div className="space-y-2">
                  {user.achievements.map((achievement, index) => (
                    <div key={index} className="bg-slate-800/50 rounded-lg p-3">
                      <p className="text-purple-200">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="text-center pt-4">
                <Button 
                  onClick={() => window.location.href = `mailto:${user.email}`}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Connect via Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </PixelCard>
      </div>
    </div>
  );
};

export default Profile;
