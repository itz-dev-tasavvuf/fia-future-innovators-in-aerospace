
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useProfiles } from "@/hooks/useProfiles";
import SearchFilters from "@/components/discover/SearchFilters";
import GlobeView from "@/components/discover/GlobeView";
import GridView from "@/components/discover/GridView";

const Discover = () => {
  const navigate = useNavigate();
  const { profiles: allUsers, loading } = useProfiles();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "globe">("grid");

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
            onClick={() => navigate("/home")}
            variant="outline"
            className="border-purple-500 text-purple-200 hover:bg-purple-700"
          >
            Back to Home
          </Button>
        </div>

        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedInterest={selectedInterest}
          setSelectedInterest={setSelectedInterest}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {viewMode === "globe" ? (
          <GlobeView users={filteredUsers} />
        ) : (
          <GridView users={filteredUsers} onUserClick={handleUserClick} />
        )}

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-purple-200 text-lg">No space enthusiasts found matching your criteria.</p>
            <p className="text-purple-300 text-sm mt-2">Try adjusting your search or filter settings.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;
