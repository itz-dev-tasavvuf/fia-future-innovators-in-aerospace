
import { Link } from "react-router-dom";
import { CalendarDays, Rocket } from "lucide-react";

export default function EventSection() {
  return (
    <section className="relative my-8 px-4">
      <Link to="/event" className="block w-full max-w-5xl mx-auto group">
        <div className="flex items-center justify-center gap-4 md:gap-6 bg-gradient-to-br from-purple-700/80 via-fuchsia-800/80 to-blue-900/80 rounded-xl shadow-xl py-4 px-4 md:px-8 ring-2 ring-fuchsia-400/30 transition-all transform group-hover:scale-[1.01] group-hover:shadow-2xl">
          <Rocket className="text-fuchsia-400 group-hover:animate-bounce flex-shrink-0" size={32} />
          <div className="flex-1 min-w-0">
            <h2 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
              FIA Ideathon 2025
            </h2>
            <p className="text-purple-100 text-sm mt-1">
              Reimagining the Future of Space Living. Click to learn more!
            </p>
          </div>
          <div className="hidden sm:flex items-center bg-black/50 text-fuchsia-100 px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0">
            <CalendarDays className="w-4 h-4 mr-1.5 text-indigo-200" />
            Deadline:{" "}
            <span className="ml-1 text-fuchsia-200 font-semibold">
              July 31, 2025
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
