import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Users, Filter, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SpaceGlobe from "@/components/SpaceGlobe";
import { useProfiles } from "@/hooks/useProfiles";

const Discover = () => {
  const navigate = useNavigate();
  const { profiles: allUsers, loading } = useProfiles();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "globe">("grid");

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

  const handleUserClick = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading community...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Discover Community</h1>
            <p className="text-purple-200">Connect with {allUsers.length} space enthusiasts worldwide</p>
          </div>
          <Button 
            onClick={() => navigate("/")}
            variant="outline"
            className="border-purple-500 text-purple-200 hover:bg-purple-700"
          >
            Back to Home
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-2">
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
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-purple-600" : "border-purple-500 text-purple-200"}
            >
              <Users className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "globe" ? "default" : "outline"}
              onClick={() => setViewMode("globe")}
              className={viewMode === "globe" ? "bg-purple-600" : "border-purple-500 text-purple-200"}
            >
              <MapPin className="h-4 w-4" />
            </Button>
          </div>
        </div>
      
      {viewMode === "globe" ? (
        <Card className="bg-slate-800/50 border-purple-500/30 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Global Community Map</CardTitle>
            <CardDescription className="text-purple-200">
              Explore where space enthusiasts are located around the world (click on points to view profiles)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full" style={{ height: 'calc(100vh - 300px)' }}>
              <SpaceGlobe users={filteredUsers} fullscreen={true} />
            </div>
          </CardContent>
        </Card>
      ) : null}

      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <Card 
              key={user.id} 
              className="bg-slate-800/50 border-purple-500/30 hover:border-purple-400 transition-colors cursor-pointer transform hover:scale-105 duration-200"
              onClick={() => handleUserClick(user.id)}
            >
              <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white text-lg">{user.name}</CardTitle>
                      <CardDescription className="text-purple-200 flex items-center mt-1">
                        <MapPin className="mr-1 h-3 w-3" />
                        {user.location}
                      </CardDescription>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-purple-100 text-sm italic">"{user.dream}"</p>
                    </div>
                    
                    <div>
                      <h4 className="text-purple-200 text-sm font-medium mb-2">Interests</h4>
                      <div className="flex flex-wrap gap-1">
                        {user.interests.slice(0, 3).map((interest) => (
                          <Badge 
                            key={interest} 
                            variant="secondary" 
                            className="bg-purple-600/50 text-purple-100 text-xs"
                          >
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-purple-200 text-sm font-medium mb-2">Achievements</h4>
                      <div className="space-y-1">
                        {user.achievements.slice(0, 2).map((achievement, index) => (
                          <p key={index} className="text-purple-300 text-xs">• {achievement}</p>
                        ))}
                      </div>
                    </div>

                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full border-purple-500 text-purple-200 hover:bg-purple-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUserClick(user.id);
                      }}
                    >
                      View Profile
                    </Button>
                  </div>
                </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-purple-200 text-lg">No space enthusiasts found matching your criteria.</p>
          <p className="text-purple-300 text-sm mt-2">Try adjusting your search or filter settings.</p>
        </div>
      )}
    </div>
  );
};

export default Discover;
