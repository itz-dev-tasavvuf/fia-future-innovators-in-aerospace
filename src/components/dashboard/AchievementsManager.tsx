
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trophy, X } from "lucide-react";

interface AchievementsManagerProps {
  achievements: string[];
  onAchievementsChange: (achievements: string[]) => void;
}

const AchievementsManager = ({ achievements, onAchievementsChange }: AchievementsManagerProps) => {
  const [newAchievement, setNewAchievement] = useState("");

  const addAchievement = () => {
    if (newAchievement) {
      onAchievementsChange([...achievements, newAchievement]);
      setNewAchievement("");
    }
  };

  const removeAchievement = (index: number) => {
    onAchievementsChange(achievements.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Label className="text-white text-lg font-medium flex items-center gap-2">
        <Trophy className="h-5 w-5 text-yellow-400" />
        Achievements
      </Label>
      <div className="space-y-2 my-4">
        {achievements.map((achievement, index) => (
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
  );
};

export default AchievementsManager;
