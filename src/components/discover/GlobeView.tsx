
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SpaceGlobe from "@/components/SpaceGlobe";

interface User {
  id: string;
  name: string;
  location: string;
  lat?: number;
  lng?: number;
  latitude?: number;
  longitude?: number;
  interests: string[];
  dream: string;
}

interface GlobeViewProps {
  users: User[];
}

const GlobeView = ({ users }: GlobeViewProps) => {
  // Filter users that have coordinates and transform the data
  const usersWithCoords = users
    .filter(user => (user.lat && user.lng) || (user.latitude && user.longitude))
    .map(user => ({
      ...user,
      lat: user.lat || user.latitude || 0,
      lng: user.lng || user.longitude || 0
    }));

  return (
    <Card className="bg-slate-800/50 border-purple-500/30 mb-8">
      <CardHeader>
        <CardTitle className="text-white">Global Community Map</CardTitle>
        <CardDescription className="text-purple-200">
          Explore where space enthusiasts are located around the world (click on points to view profiles)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full" style={{ height: 'calc(100vh - 300px)' }}>
          <SpaceGlobe users={usersWithCoords} fullscreen={true} />
        </div>
      </CardContent>
    </Card>
  );
};

export default GlobeView;
