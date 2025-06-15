import { Button } from "@/components/ui/button";
import { CalendarDays, Rocket, Users } from "lucide-react";

export default function EventSection() {
  return (
    <section className="relative my-8">
      <div className="flex items-center justify-center gap-6 bg-gradient-to-br from-purple-700/80 via-fuchsia-800/80 to-blue-900/80 rounded-xl shadow-xl py-6 px-4 md:px-10 ring-2 ring-fuchsia-400/30 hover:scale-[1.02] transform transition-all">
        <Rocket className="text-fuchsia-400 animate-bounce" size={32} />
        <div className="flex-1 min-w-0">
          <div className="flex flex-col items-start md:items-center md:flex-row gap-1 md:gap-3">
            <h2 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg whitespace-nowrap">
              FIA Ideathon 2025 is LIVE!
            </h2>
            <span className="inline-flex items-center bg-black/50 text-fuchsia-100 px-2.5 py-1 rounded-lg text-xs font-semibold ml-0 md:ml-2">
              <CalendarDays className="w-4 h-4 mr-1 text-indigo-200" />
              Deadline:{" "}
              <span className="ml-1 text-fuchsia-200 font-semibold">
                July 31, 2025
              </span>
            </span>
          </div>
          <div className="text-purple-100 text-xs mt-1 italic">
            Dreamers, makers, students & space lovers — submit your idea for how humans should live beyond Earth.
          </div>
        </div>
        <a
          href="/event"
          className="ml-4"
        >
          <button className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white text-base font-bold px-6 py-2 rounded-full shadow-lg transition-all focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-300">
            Learn More
          </button>
        </a>
      </div>
    </section>
  );
}
