
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Rocket, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import ShinyText from "@/components/ShinyText";

const LoginForm = () => {
  const navigate = useNavigate();
  const { signIn, signInWithGitHub } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn(loginForm.email, loginForm.password);

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Welcome back!",
        description: "Successfully logged in to FIA.",
      });

      // Redirect to authenticated home page
      navigate("/home");
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await signInWithGitHub();
      if (error) {
        toast({
          title: "GitHub Sign-In Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('GitHub sign-in error:', error);
      toast({
        title: "GitHub Sign-In Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-slate-800/90 backdrop-blur-sm border-purple-500/50 rounded-2xl">
      <CardHeader className="pb-6">
        <CardTitle className="text-white text-2xl font-bold">Welcome Back to FIA</CardTitle>
        <CardDescription className="text-purple-200 text-lg">
          Continue your space exploration journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-purple-200 text-lg font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              className="bg-slate-700/80 border-purple-500/40 text-white focus:border-purple-400 rounded-xl h-12 text-lg"
              required
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-purple-200 text-lg font-medium">Password</Label>
            <Input
              id="password"
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              className="bg-slate-700/80 border-purple-500/40 text-white focus:border-purple-400 rounded-xl h-12 text-lg"
              required
            />
          </div>
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl h-12 text-lg font-semibold"
          >
            <Rocket className="mr-2 h-5 w-5" />
            <ShinyText text={loading ? "Signing In..." : "Launch Into FIA"} speed={3} className="text-inherit" />
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-purple-500/40" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-800 px-2 text-purple-200">
              Or
            </span>
          </div>
        </div>

        <Button 
          type="button" 
          variant="outline"
          onClick={handleGithubSignIn}
          disabled={loading}
          className="w-full bg-slate-700/80 border-purple-500/40 text-white hover:bg-slate-700 rounded-xl h-12 text-lg font-semibold"
        >
          <Github className="mr-2 h-5 w-5" />
          Sign in with GitHub
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
