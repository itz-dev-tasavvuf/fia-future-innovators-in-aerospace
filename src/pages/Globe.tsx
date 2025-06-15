import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SpaceGlobe from "@/components/SpaceGlobe";
import { useProfiles } from "@/hooks/useProfiles";
import PixelCard from "@/components/PixelCard";
import EventSection from "@/components/EventSection";

const Globe = () => {
  const navigate = useNavigate();
  const { profiles: allUsers, loading } = useProfiles();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("all");

  const spaceInterests = [
    "Space Medicine",
    "Rocketry", 
    "Astronomy",
    "Astrophysics",
    "Planetary Science",
    "Space Engineering",
    "Astrobiology",
    "Satellite Technology"
  ];

  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.dream.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesInterest = selectedInterest === "all" || 
                           user.interests.includes(selectedInterest);
    
    return matchesSearch && matchesInterest;
  });

  // Filter and transform users for the globe (only those with coordinates)
  const globeUsers = filteredUsers
    .filter(user => {
      // Check for coordinates in either format
      const hasLatLng = 'lat' in user && 'lng' in user && user.lat && user.lng;
      const hasLatitudeLongitude = 'latitude' in user && 'longitude' in user && user.latitude && user.longitude;
      return hasLatLng || hasLatitudeLongitude;
    })
    .map(user => ({
      ...user,
      lat: ('lat' in user && user.lat) || ('latitude' in user && user.latitude) || 0,
      lng: ('lng' in user && user.lng) || ('longitude' in user && user.longitude) || 0
    }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading global community...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Global Space Community</h1>
            <p className="text-purple-200">Explore {allUsers.length} space enthusiasts around the world</p>
          </div>
          <Button 
            onClick={() => navigate("/")}
            variant="outline"
            className="border-purple-500 text-purple-200 hover:bg-purple-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>

        <EventSection />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <Input
              placeholder="Search by name, location, or dream..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-800 border-purple-500/30 text-white placeholder-purple-300"
            />
          </div>
          <Select value={selectedInterest} onValueChange={setSelectedInterest}>
            <SelectTrigger className="bg-slate-800 border-purple-500/30 text-white">
              <SelectValue placeholder="Filter by interest" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-purple-500/30">
              <SelectItem value="all" className="text-white">All Interests</SelectItem>
              {spaceInterests.map((interest) => (
                <SelectItem key={interest} value={interest} className="text-white">
                  {interest}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-purple-200" />
            <span className="text-purple-200 text-sm">{globeUsers.length} results</span>
          </div>
        </div>

        <PixelCard variant="pink" className="rounded-3xl">
          <Card className="bg-transparent border-transparent rounded-3xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-white text-3xl font-bold">Interactive Global Map</CardTitle>
              <CardDescription className="text-purple-200">
                Click and drag to explore • Hover over pins to see profiles
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-6">
              <div className="w-full h-[70vh]">
                <SpaceGlobe users={globeUsers} fullscreen={true} />
              </div>
            </CardContent>
          </Card>
        </PixelCard>
      </div>
    </div>
  );
};

export default Globe;
