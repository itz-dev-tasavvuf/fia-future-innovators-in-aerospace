
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">My Dashboard</h1>
        <p className="text-purple-200">Manage your space journey profile</p>
      </div>
      <Button 
        onClick={() => navigate("/discover")}
        variant="outline"
        className="border-purple-500 text-purple-200 hover:bg-purple-700"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Discover
      </Button>
    </div>
  );
};

export default DashboardHeader;
