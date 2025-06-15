
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonalInfoFields } from "./registration/PersonalInfoFields";
import { InterestsSelection } from "./registration/InterestsSelection";
import { DreamField } from "./registration/DreamField";
import { SubmitButton } from "./registration/SubmitButton";
import { SPACE_INTERESTS } from "./registration/constants";
import { useRegistrationForm } from "./registration/useRegistrationForm";

const RegisterForm = () => {
  const {
    registerForm,
    setRegisterForm,
    loading,
    geocoding,
    handleRegister,
    toggleInterest
  } = useRegistrationForm();

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
          <PersonalInfoFields 
            registerForm={registerForm}
            setRegisterForm={setRegisterForm}
            geocoding={geocoding}
          />
          <InterestsSelection 
            interests={SPACE_INTERESTS}
            selectedInterests={registerForm.interests}
            onInterestToggle={toggleInterest}
          />
          <DreamField 
            dream={registerForm.dream}
            onDreamChange={(dream) => setRegisterForm({ ...registerForm, dream })}
          />
          <SubmitButton loading={loading} />
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
