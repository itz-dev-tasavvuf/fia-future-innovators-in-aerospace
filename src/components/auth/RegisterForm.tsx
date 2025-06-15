
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { geocodeLocation } from "@/utils/geocoding";
import { useToast } from "@/hooks/use-toast";
import ShinyText from "@/components/ShinyText";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [geocoding, setGeocoding] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    interests: [] as string[],
    dream: ""
  });

  const spaceInterests = [
    "Space Medicine",
    "Rocketry", 
    "Astronomy",
    "Astrophysics",
    "Planetary Science",
    "Space Engineering",
    "Astrobiology",
    "Satellite Technology"
  ];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setGeocoding(true);

    try {
      console.log('Starting registration process for:', registerForm.email);
      console.log('Location to geocode:', registerForm.location);
      
      // Get coordinates for location
      const coordinates = await geocodeLocation(registerForm.location);
      setGeocoding(false);
      
      if (!coordinates) {
        toast({
          title: "Location Warning",
          description: "Couldn't find exact coordinates for your location. You can update this later in your profile.",
          variant: "default",
        });
      }
      
      const metadata = {
        name: registerForm.name,
        location: registerForm.location,
        interests: registerForm.interests,
        dream: registerForm.dream,
        latitude: coordinates?.lat,
        longitude: coordinates?.lng
      };

      console.log('Registration metadata:', metadata);

      const { data, error } = await signUp(registerForm.email, registerForm.password, metadata);

      if (error) {
        console.error('Registration error:', error);
        toast({
          title: "Registration Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      console.log('Registration successful:', data);
      toast({
        title: "Registration Successful!",
        description: "Welcome to the FIA community!",
      });

      navigate("/home");
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setGeocoding(false);
    }
  };

  const toggleInterest = (interest: string) => {
    const updated = registerForm.interests.includes(interest)
      ? registerForm.interests.filter(i => i !== interest)
      : [...registerForm.interests, interest];
    setRegisterForm({ ...registerForm, interests: updated });
  };

  return (
    <Card className="bg-slate-800/90 backdrop-blur-sm border-purple-500/50 rounded-2xl">
      <CardHeader className="pb-6">
        <CardTitle className="text-white text-2xl font-bold">Join the Future</CardTitle>
        <CardDescription className="text-purple-200 text-lg">
          Become part of the global space innovation community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <Label htmlFor="name" className="text-purple-200 text-base font-medium">Full Name</Label>
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
            <Label htmlFor="reg-email" className="text-purple-200 text-base font-medium">Email</Label>
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
            <Label htmlFor="reg-password" className="text-purple-200 text-base font-medium">Password</Label>
            <Input
              id="reg-password"
              type="password"
              value={registerForm.password}
              onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
              className="bg-slate-700/80 border-purple-500/40 text-white focus:border-purple-400 rounded-xl h-11"
              required
            />
          </div>
          <div>
            <Label htmlFor="location" className="text-purple-200 text-base font-medium">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
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
          <div>
            <Label className="text-purple-200 text-base font-medium">Space Interests</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {spaceInterests.map((interest) => (
                <Badge
                  key={interest}
                  variant={registerForm.interests.includes(interest) ? "default" : "outline"}
                  className={`cursor-pointer text-xs transition-all duration-200 rounded-lg ${
                    registerForm.interests.includes(interest)
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "border-purple-500 text-purple-200 hover:bg-purple-600 hover:text-white"
                  }`}
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="dream" className="text-purple-200 text-base font-medium">Your Space Dream</Label>
            <Input
              id="dream"
              placeholder="What's your space exploration dream?"
              value={registerForm.dream}
              onChange={(e) => setRegisterForm({ ...registerForm, dream: e.target.value })}
              className="bg-slate-700/80 border-purple-500/40 text-white focus:border-purple-400 rounded-xl h-11"
              required
            />
          </div>
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl h-12 text-lg font-semibold"
          >
            <Star className="mr-2 h-5 w-5" />
            <ShinyText text={loading ? "Creating Account..." : "Join FIA Community"} speed={3} className="text-inherit" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
