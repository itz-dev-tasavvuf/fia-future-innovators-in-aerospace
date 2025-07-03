
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PixelCard from "@/components/PixelCard";
import ShinyText from "@/components/ShinyText";

const FounderSpotlight = () => {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto px-4 mb-16 relative z-10">
      <PixelCard variant="pink" className="rounded-3xl">
        <Card className="bg-transparent border-transparent hover:scale-105 transition-transform duration-300 cursor-pointer rounded-3xl"
              onClick={() => navigate("/founder")}>
          <CardContent className="p-10">
            <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
              <div className="relative">
                <div className="w-40 h-40 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 p-1 hover:scale-110 transition-transform duration-300">
                  <img 
                    src="/founder.png" 
                    alt="Firdaus Qayyum Jinabade"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="absolute -top-3 -right-3 bg-yellow-400 rounded-full p-3 animate-bounce">
                  <Star className="h-6 w-6 text-yellow-800" />
                </div>
              </div>
              <div className="text-center md:text-left flex-1">
                <h3 className="text-4xl font-bold text-white mb-3">Meet Our Founder</h3>
                <h4 className="text-2xl text-purple-300 mb-6">Firdaus Qayyum Jinabade</h4>
                <p className="text-purple-100 mb-6 leading-relaxed text-lg">
                  At just 18 years old, Firdaus is a passionate space enthusiast and Analog Astronaut. 
                  Currently studying Aeronautical Engineering, she founded FIA to connect young minds 
                  shaping the future of space exploration.
                </p>
                <Button 
                  variant="outline" 
                  className="border-purple-400 text-purple-300 hover:bg-purple-600 hover:text-white text-lg px-8 py-3"
                >
                  <ShinyText text="Learn More" speed={3} className="text-inherit" />
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </PixelCard>
    </section>
  );
};

export default FounderSpotlight;
