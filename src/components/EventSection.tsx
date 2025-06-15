
import { Button } from "@/components/ui/button";
import { CalendarDays, Rocket, Users } from "lucide-react";

export default function EventSection() {
  return (
    <section className="relative w-full py-16 md:py-24 bg-gradient-to-br from-indigo-800/90 to-slate-900/80 rounded-xl my-8 shadow-lg overflow-hidden">
      {/* Ornaments */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[110%] h-[75%] bg-gradient-to-t from-indigo-400/30 to-pink-200/0 blur-2xl rounded-full opacity-80" />
        <div className="absolute -bottom-8 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
        <div className="absolute top-8 right-8 w-16 h-16 bg-pink-500/20 rounded-full blur-lg" />
        <div className="absolute bottom-0 left-5 w-24 h-24 bg-fuchsia-400/20 rounded-full blur-lg" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 flex flex-col items-center text-center">
        <div className="flex items-center gap-2 mb-4">
          <Rocket className="text-fuchsia-400 animate-bounce" size={32} />
          <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            FIA Ideathon 2025: Reimagining the Future of Space Living
          </h2>
        </div>
        <p className="text-lg md:text-xl text-slate-100 font-medium mb-4">
          🚀 Calling all dreamers, designers, space lovers, and problem-solvers!
          Join the global challenge to propose groundbreaking ideas for sustainable living in space. If you can dream it, you can join it!
        </p>
        <div className="mb-6 flex flex-wrap justify-center gap-2 text-xs">
          <span className="bg-black/40 rounded px-3 py-1 text-white flex items-center gap-1">
            <CalendarDays className="w-4 h-4 text-indigo-200" /> Submission Deadline: <strong className="ml-1 text-fuchsia-200">July 31, 2025</strong>
          </span>
          <span className="bg-fuchsia-900/40 rounded px-3 py-1 text-pink-100 flex items-center gap-1">
            <Users className="w-4 h-4 text-blue-200" /> Age 13+ • Teams up to 3 • Students & Enthusiasts
          </span>
        </div>

        <ul className="grid gap-2 text-left text-sm md:text-base mb-6 max-w-xl w-full mx-auto px-3">
          <li>
            <strong className="text-indigo-200">Theme:</strong> <span>“Reimagining the Future of Space Living”</span>
          </li>
          <li>
            <span className="text-slate-200"><strong>Examples:</strong> Space health • AI Support • Space food • Mental wellness • Smart habitats • Space education • Rovers • Culture</span>
          </li>
          <li>
            <span className="text-indigo-100">Not a coding competition — Idea only!</span>
          </li>
          <li>
            <span className="text-fuchsia-200 font-medium">Top 3 ideas win certificates & feature on FIA page + mentorship!</span>
          </li>
        </ul>

        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSdmU220q3UtGZVYw7sMx8zPhHHrDk9nPQTdncpvbZxEwQvv4Q/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-auto"
        >
          <Button
            size="lg"
            className="bg-fuchsia-500 hover:bg-fuchsia-600 text-xl font-semibold tracking-wide px-8 py-4 shadow-2xl shadow-fuchsia-500/20 transition-all duration-200"
          >
            Submit Your Idea Now 🚀
          </Button>
        </a>
        <p className="mt-4 text-xs text-slate-300">
          <span className="font-medium">Questions?</span> Contact the FIA team or check the event details above!
        </p>
      </div>
    </section>
  );
}
