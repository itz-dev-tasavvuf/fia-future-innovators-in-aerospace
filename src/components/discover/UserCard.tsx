
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, User } from "lucide-react";

interface UserCardProps {
  user: {
    id: string;
    name: string;
    location: string;
    dream: string;
    interests: string[];
    achievements: string[];
  };
  onUserClick: (userId: string) => void;
}

const UserCard = ({ user, onUserClick }: UserCardProps) => {
  return (
    <Card 
      className="bg-slate-800/50 border-purple-500/30 hover:border-purple-400 transition-colors cursor-pointer transform hover:scale-105 duration-200"
      onClick={() => onUserClick(user.id)}
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
              onUserClick(user.id);
            }}
          >
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
