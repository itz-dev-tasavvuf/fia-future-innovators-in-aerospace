
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface DreamFieldProps {
  dream: string;
  onDreamChange: (dream: string) => void;
}

export const DreamField = ({ dream, onDreamChange }: DreamFieldProps) => {
  return (
    <div>
      <Label htmlFor="dream" className="text-purple-200 text-base font-medium">Your Space Dream *</Label>
      <Input
        id="dream"
        placeholder="What's your space exploration dream?"
        value={dream}
        onChange={(e) => onDreamChange(e.target.value)}
        className="bg-slate-700/80 border-purple-500/40 text-white focus:border-purple-400 rounded-xl h-11"
        required
      />
    </div>
  );
};
