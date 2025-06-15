
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { geocodeLocation } from "@/utils/geocoding";
import { useToast } from "@/hooks/use-toast";

interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
  location: string;
  interests: string[];
  dream: string;
}

export const useRegistrationForm = () => {
  const { signUp } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [geocoding, setGeocoding] = useState(false);
  const [registerForm, setRegisterForm] = useState<RegistrationFormData>({
    name: "",
    email: "",
    password: "",
    location: "",
    interests: [],
    dream: ""
  });

  const toggleInterest = (interest: string) => {
    const updated = registerForm.interests.includes(interest)
      ? registerForm.interests.filter(i => i !== interest)
      : [...registerForm.interests, interest];
    setRegisterForm({ ...registerForm, interests: updated });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerForm.name || !registerForm.email || !registerForm.password || !registerForm.location || !registerForm.dream) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setGeocoding(true);

    try {
      console.log('Starting registration process for:', registerForm.email);
      console.log('Location to geocode:', registerForm.location);
      
      const coordinates = await geocodeLocation(registerForm.location);
      setGeocoding(false);
      
      if (!coordinates) {
        console.log('Geocoding failed, proceeding without coordinates');
        toast({
          title: "Location Warning",
          description: "Couldn't find exact coordinates for your location. You can update this later in your profile.",
          variant: "default",
        });
      } else {
        console.log('Geocoding successful:', coordinates);
      }
      
      const metadata = {
        name: registerForm.name,
        location: registerForm.location,
        interests: registerForm.interests,
        dream: registerForm.dream,
        latitude: coordinates?.lat || null,
        longitude: coordinates?.lng || null
      };

      console.log('Registration metadata:', metadata);

      const { data, error } = await signUp(registerForm.email, registerForm.password, metadata);

      if (error) {
        console.error('Registration error:', error);
        toast({
          title: "Registration Failed",
          description: error.message || "An error occurred during registration.",
          variant: "destructive",
        });
        return;
      }

      console.log('Registration successful:', data);
      
      toast({
        title: "Registration Successful!",
        description: "Please check your email to confirm your account, then you can sign in.",
        variant: "default",
      });

      setRegisterForm({
        name: "",
        email: "",
        password: "",
        location: "",
        interests: [],
        dream: ""
      });

      console.log('Registration completed - user should check email for confirmation');

    } catch (error: any) {
      console.error('Unexpected registration error:', error);
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

  return {
    registerForm,
    setRegisterForm,
    loading,
    geocoding,
    handleRegister,
    toggleInterest
  };
};
