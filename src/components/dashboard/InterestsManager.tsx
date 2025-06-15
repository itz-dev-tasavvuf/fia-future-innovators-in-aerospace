
import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

interface InterestsManagerProps {
  interests: string[];
  onInterestsChange: (interests: string[]) => void;
}

const spaceInterests = [
  "Space Medicine", "Rocketry", "Astronomy", "Astrophysics", 
  "Planetary Science", "Space Engineering", "Astrobiology", "Satellite Technology"
];

const InterestsManager = ({ interests, onInterestsChange }: InterestsManagerProps) => {
  const [newInterest, setNewInterest] = useState("");

  const addInterest = () => {
    if (newInterest && !interests.includes(newInterest)) {
      onInterestsChange([...interests, newInterest]);
      setNewInterest("");
    }
  };

  const removeInterest = (interest: string) => {
    onInterestsChange(interests.filter(i => i !== interest));
  };

  return (
    <div>
      <Label className="text-white text-lg font-medium">Interests & Expertise</Label>
      <div className="flex flex-wrap gap-2 my-4">
        {interests.map((interest) => (
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
  );
};

export default InterestsManager;
