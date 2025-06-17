
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AuthCallback from "@/components/AuthCallback";
import Index from "./pages/Index";
import Discover from "./pages/Discover";
import Founder from "./pages/Founder";
import Globe from "./pages/Globe";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import AuthenticatedHome from "./pages/AuthenticatedHome";
import NotFound from "./pages/NotFound";
import EventPage from "@/pages/EventPage";
import NasaPage from "./pages/NasaPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/event" element={<EventPage />} />
              <Route path="/nasa" element={<NasaPage />} />
              <Route path="/home" element={
                <ProtectedRoute>
                  <AuthenticatedHome />
                </ProtectedRoute>
              } />
              <Route path="/discover" element={
                <ProtectedRoute>
                  <Discover />
                </ProtectedRoute>
              } />
              <Route path="/founder" element={<Founder />} />
              <Route path="/globe" element={
                <ProtectedRoute>
                  <Globe />
                </ProtectedRoute>
              } />
              <Route path="/profile/:id" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
