
import { Badge } from "@/components/ui/badge";
import { Globe, Users, Rocket } from "lucide-react";
import RotatingText from './RotatingText';

const HeroSection = () => {
  return (
    <section className="relative z-10 container mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-12 md:mb-20 animate-fade-in">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-8 md:mb-12 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight drop-shadow-2xl">
          Empowering&nbsp;
          <div className="inline-block my-4 md:my-6">
            <RotatingText
              texts={['Future Innovators in', 'Dreamers in', 'Engineers in', 'Explorers in', 'Futurists in']}
              mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </div>
          <br />
          <span className="text-3xl sm:text-5xl md:text-7xl bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Aerospace
          </span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-purple-200 max-w-3xl md:max-w-5xl mx-auto mb-8 md:mb-10 leading-relaxed font-medium px-4">
          Global network for space enthusiasts 🌍 | Share knowledge, connect with others 🚀 | 
          Join FIA and explore the future! 🌌
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-6 mb-12 md:mb-16 px-4">
          <Badge className="bg-purple-600/90 text-white px-4 md:px-6 py-2 md:py-3 text-lg md:text-xl font-semibold rounded-full backdrop-blur-sm">
            <Globe className="mr-2 md:mr-3 h-5 md:h-6 w-5 md:w-6" />
            <span className="text-inherit bg-clip-text inline-block animate-shine" style={{
              backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              animationDuration: '3s',
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear'
            }}>
              Global Network
            </span>
          </Badge>
          <Badge className="bg-blue-600/90 text-white px-4 md:px-6 py-2 md:py-3 text-lg md:text-xl font-semibold rounded-full backdrop-blur-sm">
            <Users className="mr-2 md:mr-3 h-5 md:h-6 w-5 md:w-6" />
            <span className="text-inherit bg-clip-text inline-block animate-shine" style={{
              backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              animationDuration: '3s',
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear'
            }}>
              Space Community
            </span>
          </Badge>
          <Badge className="bg-green-600/90 text-white px-4 md:px-6 py-2 md:py-3 text-lg md:text-xl font-semibold rounded-full backdrop-blur-sm">
            <Rocket className="mr-2 md:mr-3 h-5 md:h-6 w-5 md:w-6" />
            <span className="text-inherit bg-clip-text inline-block animate-shine" style={{
              backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              animationDuration: '3s',
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear'
            }}>
              Future Ready
            </span>
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
