
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

interface PersonalInfoFieldsProps {
  registerForm: {
    name: string;
    email: string;
    password: string;
    location: string;
  };
  setRegisterForm: (form: any) => void;
  geocoding: boolean;
}

export const PersonalInfoFields = ({ registerForm, setRegisterForm, geocoding }: PersonalInfoFieldsProps) => {
  return (
    <>
      <div>
        <Label htmlFor="name" className="text-purple-200 text-base font-medium">Full Name *</Label>
        <Input
          id="name"
          placeholder="Your name"
          value={registerForm.name}
          onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
          className="bg-slate-700/80 border-purple-500/40 text-white focus:border-purple-400 rounded-xl h-11"
          required
        />
      </div>
      <div>
        <Label htmlFor="reg-email" className="text-purple-200 text-base font-medium">Email *</Label>
        <Input
          id="reg-email"
          type="email"
          placeholder="your@email.com"
          value={registerForm.email}
          onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
          className="bg-slate-700/80 border-purple-500/40 text-white focus:border-purple-400 rounded-xl h-11"
          required
        />
      </div>
      <div>
        <Label htmlFor="reg-password" className="text-purple-200 text-base font-medium">Password *</Label>
        <Input
          id="reg-password"
          type="password"
          value={registerForm.password}
          onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
          className="bg-slate-700/80 border-purple-500/40 text-white focus:border-purple-400 rounded-xl h-11"
          required
          minLength={6}
        />
      </div>
      <div>
        <Label htmlFor="location" className="text-purple-200 text-base font-medium">
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Location *
            {geocoding && <span className="text-xs text-yellow-400">(Finding coordinates...)</span>}
          </span>
        </Label>
        <Input
          id="location"
          placeholder="City, Country (e.g., New York, USA)"
          value={registerForm.location}
          onChange={(e) => setRegisterForm({ ...registerForm, location: e.target.value })}
          className="bg-slate-700/80 border-purple-500/40 text-white focus:border-purple-400 rounded-xl h-11"
          required
        />
        <p className="text-xs text-purple-300 mt-1">
          This helps us place you on our global community map
        </p>
      </div>
    </>
  );
};
