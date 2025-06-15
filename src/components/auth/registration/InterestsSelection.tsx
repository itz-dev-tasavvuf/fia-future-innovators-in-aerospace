
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface InterestsSelectionProps {
  interests: string[];
  selectedInterests: string[];
  onInterestToggle: (interest: string) => void;
}

export const InterestsSelection = ({ interests, selectedInterests, onInterestToggle }: InterestsSelectionProps) => {
  return (
    <div>
      <Label className="text-purple-200 text-base font-medium">Space Interests</Label>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {interests.map((interest) => (
          <Badge
            key={interest}
            variant={selectedInterests.includes(interest) ? "default" : "outline"}
            className={`cursor-pointer text-xs transition-all duration-200 rounded-lg ${
              selectedInterests.includes(interest)
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "border-purple-500 text-purple-200 hover:bg-purple-600 hover:text-white"
            }`}
            onClick={() => onInterestToggle(interest)}
          >
            {interest}
          </Badge>
        ))}
      </div>
    </div>
  );
};
