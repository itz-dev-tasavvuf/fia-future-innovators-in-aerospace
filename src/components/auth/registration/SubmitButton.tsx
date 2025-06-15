
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import ShinyText from "@/components/ShinyText";

interface SubmitButtonProps {
  loading: boolean;
}

export const SubmitButton = ({ loading }: SubmitButtonProps) => {
  return (
    <Button 
      type="submit" 
      disabled={loading}
      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl h-12 text-lg font-semibold"
    >
      <Star className="mr-2 h-5 w-5" />
      <ShinyText text={loading ? "Creating Account..." : "Join FIA Community"} speed={3} className="text-inherit" />
    </Button>
  );
};
