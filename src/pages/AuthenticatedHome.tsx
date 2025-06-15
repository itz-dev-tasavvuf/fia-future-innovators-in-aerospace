
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Globe, Users, Settings, Map, Rocket, Star } from "lucide-react";
import Header from "@/components/Header";
import Aurora from "@/components/Aurora";
import SpaceGlobe from "@/components/SpaceGlobe";
import { useProfiles } from "@/hooks/useProfiles";
import ShinyText from "@/components/ShinyText";
import EventSection from "@/components/EventSection";
import ApodSection from "@/components/ApodSection";

const AuthenticatedHome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profiles } = useProfiles();

  // Sample users for the mini globe (first 10 with coordinates)
  const sampleUsers = profiles
    .filter(profile => profile.lat && profile.lng)
    .slice(0, 10)
    .map(profile => ({
      id: profile.id,
      name: profile.name,
      lat: profile.lat!,
      lng: profile.lng!,
      location: profile.location,
      interests: profile.interests || [],
      dream: profile.dream
    }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Aurora Background */}
      <div className="fixed inset-0 z-0 opacity-60">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.7}
          amplitude={0.9}
          speed={0.4}
        />
      </div>
      
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Welcome Back!
            </h1>
            <p className="text-2xl text-purple-200 mb-2">
              Hello, <span className="font-bold text-white">{user?.user_metadata?.name || user?.email}</span>
            </p>
            <div className="inline-flex items-center gap-2 bg-purple-600/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-6 py-3">
              <Star className="h-5 w-5 text-yellow-400" />
              <ShinyText text="Space Explorer" speed={2} className="text-purple-200" />
            </div>
          </div>

          <EventSection />

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Discover Community Card */}
            <Card 
              className="bg-slate-800/50 border-purple-500/30 hover:border-purple-400 transition-all duration-300 cursor-pointer transform hover:scale-105 backdrop-blur-sm"
              onClick={() => navigate("/discover")}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Discover Community</CardTitle>
                <CardDescription className="text-purple-200">
                  Connect with {profiles.length}+ space enthusiasts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                  Explore Now
                </Button>
              </CardContent>
            </Card>

            {/* Global Map Card */}
            <Card 
              className="bg-slate-800/50 border-blue-500/30 hover:border-blue-400 transition-all duration-300 cursor-pointer transform hover:scale-105 backdrop-blur-sm"
              onClick={() => navigate("/globe")}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Global Map</CardTitle>
                <CardDescription className="text-blue-200">
                  View our worldwide community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                  View Globe
                </Button>
              </CardContent>
            </Card>

            {/* Dashboard Card */}
            <Card 
              className="bg-slate-800/50 border-green-500/30 hover:border-green-400 transition-all duration-300 cursor-pointer transform hover:scale-105 backdrop-blur-sm"
              onClick={() => navigate("/dashboard")}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">My Dashboard</CardTitle>
                <CardDescription className="text-green-200">
                  Manage your profile & settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                  Go to Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* APOD Section */}
          <ApodSection />

          {/* Interactive Globe Section */}
          <Card className="bg-slate-800/30 border-purple-500/20 backdrop-blur-md mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-3xl font-bold mb-2">Live Community Globe</CardTitle>
              <CardDescription className="text-purple-200 text-lg">
                See where space enthusiasts are located around the world
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="w-full max-w-2xl h-96">
                <SpaceGlobe users={sampleUsers} fullscreen={false} />
              </div>
            </CardContent>
          </Card>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-500/20">
              <Rocket className="h-12 w-12 text-purple-300 mx-auto mb-4" />
              <h3 className="text-white text-2xl font-bold mb-2">{profiles.length}</h3>
              <p className="text-purple-200">Space Enthusiasts</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-blue-500/20">
              <Globe className="h-12 w-12 text-blue-300 mx-auto mb-4" />
              <h3 className="text-white text-2xl font-bold mb-2">Global</h3>
              <p className="text-blue-200">Community Network</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-cyan-600/20 to-green-600/20 backdrop-blur-sm border border-cyan-500/20">
              <Map className="h-12 w-12 text-cyan-300 mx-auto mb-4" />
              <h3 className="text-white text-2xl font-bold mb-2">Interactive</h3>
              <p className="text-cyan-200">Exploration Tools</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedHome;
