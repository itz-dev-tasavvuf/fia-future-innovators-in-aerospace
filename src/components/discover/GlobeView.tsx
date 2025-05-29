
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SpaceGlobe from "@/components/SpaceGlobe";

interface GlobeViewProps {
  users: Array<{
    id: string;
    name: string;
    location: string;
    lat: number;
    lng: number;
    interests: string[];
    dream: string;
  }>;
}

const GlobeView = ({ users }: GlobeViewProps) => {
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
          <SpaceGlobe users={users} fullscreen={true} />
        </div>
      </CardContent>
    </Card>
  );
};

export default GlobeView;
