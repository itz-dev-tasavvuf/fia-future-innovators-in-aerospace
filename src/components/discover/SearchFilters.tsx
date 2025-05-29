
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin, Users } from "lucide-react";

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedInterest: string;
  setSelectedInterest: (interest: string) => void;
  viewMode: "grid" | "globe";
  setViewMode: (mode: "grid" | "globe") => void;
}

const SearchFilters = ({
  searchTerm,
  setSearchTerm,
  selectedInterest,
  setSelectedInterest,
  viewMode,
  setViewMode
}: SearchFiltersProps) => {
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

  return (
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
  );
};

export default SearchFilters;
