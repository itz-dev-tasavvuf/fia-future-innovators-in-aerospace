
import PixelCard from "@/components/PixelCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import ProfileForm from "./ProfileForm";
import { ProfileState } from "@/hooks/useDashboardProfile";

interface ProfileCardProps {
  profile: ProfileState;
  setProfile: (profile: ProfileState | ((prev: ProfileState) => ProfileState)) => void;
  onSave: () => void;
  saving: boolean;
}

const ProfileCard = ({ profile, setProfile, onSave, saving }: ProfileCardProps) => {
  return (
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
        
        <CardContent>
          <ProfileForm 
            profile={profile}
            setProfile={setProfile}
            onSave={onSave}
            saving={saving}
          />
        </CardContent>
      </Card>
    </PixelCard>
  );
};

export default ProfileCard;
