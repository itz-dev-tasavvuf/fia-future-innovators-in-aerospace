
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Rocket, GraduationCap, Users, Globe, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EventSection from "@/components/EventSection";

const Founder = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <Button 
          onClick={() => navigate("/")} 
          variant="ghost" 
          className="mb-8 text-purple-200 hover:text-white hover:bg-purple-800/30"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <EventSection />

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="relative inline-block mb-6">
              <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-r from-purple-400 to-blue-400 p-1 animate-pulse">
                <img 
                  src="/founder.png" 
                  alt="Firdaus Qayyum Jinabade"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2 animate-bounce">
                <Star className="h-6 w-6 text-yellow-800" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Firdaus Qayyum Jinabade
            </h1>
            <p className="text-xl text-purple-200 mb-6">Founder & CEO of FIA - Future Innovators in Aerospace</p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <Badge className="bg-purple-600 text-white">18 Years Old</Badge>
              <Badge className="bg-blue-600 text-white">Analog Astronaut</Badge>
              <Badge className="bg-green-600 text-white">Space Enthusiast</Badge>
              <Badge className="bg-orange-600 text-white">Aeronautical Engineering Student</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-slate-800/50 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <GraduationCap className="h-8 w-8 text-purple-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Education</h3>
                </div>
                <p className="text-purple-200">
                  Currently in her first year of studying Aeronautical Engineering at GIT College, 
                  laying the foundation for her aerospace career with rigorous academic training.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Rocket className="h-8 w-8 text-blue-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Analog Astronaut</h3>
                </div>
                <p className="text-purple-200">
                  Actively participates in space analog missions, gaining valuable hands-on 
                  experience in simulated space environments and mission protocols.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Users className="h-8 w-8 text-green-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Leadership</h3>
                </div>
                <p className="text-purple-200">
                  Founded FIA to create a global network connecting space enthusiasts, 
                  fostering collaboration and knowledge sharing in the aerospace community.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Globe className="h-8 w-8 text-orange-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Vision</h3>
                </div>
                <p className="text-purple-200">
                  Deep commitment to advancing space travel through involvement in various 
                  space-related projects, working toward shaping the future of exploration.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-purple-800/30 to-blue-800/30 border-purple-400/50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4 text-center">The Journey</h3>
              <p className="text-purple-100 text-lg leading-relaxed">
                At just 18 years old, Firdaus Qayyum Jinabade represents the next generation of space pioneers. 
                Her journey began with a childhood fascination with the stars and has evolved into a professional 
                pursuit of aerospace excellence. As an Analog Astronaut, she has participated in multiple 
                simulation missions, testing equipment, protocols, and human factors in controlled environments 
                that mirror the challenges of actual space missions.
              </p>
              <p className="text-purple-100 text-lg leading-relaxed mt-4">
                Her academic pursuit in Aeronautical Engineering at GIT College provides her with the technical 
                foundation necessary to understand the complexities of spacecraft design, propulsion systems, 
                and mission planning. Through FIA, she has created a platform where young innovators can connect, 
                share research, collaborate on projects, and collectively work toward making space more accessible 
                for future generations.
              </p>
              <p className="text-purple-100 text-lg leading-relaxed mt-4">
                Firdaus envisions a future where space travel is not just for professional astronauts but for 
                scientists, researchers, and innovators from all backgrounds. Her work with FIA aims to democratize 
                space knowledge and create pathways for young people to contribute meaningfully to humanity's 
                greatest adventure - exploring the cosmos.
              </p>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <Button 
              onClick={() => navigate("/discover")} 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
            >
              <Users className="mr-2 h-5 w-5" />
              Join the FIA Community
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Founder;
