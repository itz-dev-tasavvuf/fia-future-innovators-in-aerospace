
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Star, Info } from "lucide-react";
import AchievementsManager from "./AchievementsManager";
import InterestsManager from "./InterestsManager";
import { ProfileState } from "@/hooks/useDashboardProfile";

interface ProfileFormProps {
  profile: ProfileState;
  setProfile: (profile: ProfileState | ((prev: ProfileState) => ProfileState)) => void;
  onSave: () => void;
  saving: boolean;
}

const ProfileForm = ({ profile, setProfile, onSave, saving }: ProfileFormProps) => {
  return (
    <div className="space-y-8">
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

      <div>
        <Label htmlFor="bio" className="text-white text-lg font-medium flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-400" />
          Bio
        </Label>
        <Textarea
          id="bio"
          value={profile.bio}
          onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
          className="bg-slate-700/80 border-purple-500/40 text-white focus:border-purple-400 rounded-xl"
          placeholder="Tell everyone a little about yourself..."
          rows={4}
        />
      </div>

      <InterestsManager 
        interests={profile.interests}
        onInterestsChange={(interests) => setProfile(prev => ({...prev, interests}))}
      />

      <AchievementsManager
        achievements={profile.achievements}
        onAchievementsChange={(achievements) => setProfile(prev => ({...prev, achievements}))}
      />

      <div className="text-center pt-4">
        <Button 
          onClick={onSave}
          disabled={saving}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3 text-lg"
        >
          <Save className="mr-2 h-5 w-5" />
          {saving ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </div>
  );
};

export default ProfileForm;
