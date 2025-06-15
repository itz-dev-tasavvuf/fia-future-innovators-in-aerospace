import FloatingElements from "@/components/FloatingElements";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import FounderSpotlight from "@/components/FounderSpotlight";
import FeaturesSection from "@/components/FeaturesSection";
import GlobePreview from "@/components/GlobePreview";
import AuthSection from "@/components/AuthSection";
import Aurora from "@/components/Aurora";
import EventSection from "@/components/EventSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Aurora Background - faster animation */}
      <div className="fixed inset-0 z-0 opacity-80">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.6}
          amplitude={0.8}
          speed={0.6}
        />
      </div>
      
      {/* Content with higher z-index */}
      <div className="relative z-10 w-full">
        <FloatingElements />
        <Header />
        <main className="w-full">
          <HeroSection />
          <EventSection />
          <StatsSection />
          <FounderSpotlight />
          <FeaturesSection />
          <GlobePreview />
          <AuthSection />
        </main>
      </div>
    </div>
  );
};

export default Index;
