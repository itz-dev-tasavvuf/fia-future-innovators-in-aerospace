
import { CalendarDays, Rocket, Users, Image, Sparkles } from "lucide-react";

const mainBanner = "/11bce938-ccda-4701-9cec-5c8e6d1f05dc.png";
const visual1 = "/5c70e0f5-4a9d-45f7-b31d-4543ec85d18c.png";
const visual2 = "/7c0ecc5b-617d-4d96-a38b-892a50df8b9e.png";

export default function EventPage() {
  return (
    <div className="bg-gradient-to-tr from-slate-950 via-indigo-900 to-purple-950 min-h-screen pb-12">
      <div className="relative">
        <img
          src={mainBanner}
          className="w-full h-72 md:h-[420px] object-cover"
          alt="FIA Ideathon 2025 Banner"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-slate-900 opacity-90 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-fuchsia-300 drop-shadow-lg text-center mt-16">
            FIA Ideathon 2025
          </h1>
          <h2 className="text-xl md:text-2xl text-white font-medium mt-3 mb-8 text-center max-w-3xl">
            Reimagining the Future of Space Living
          </h2>
        </div>
      </div>

      <div className="max-w-3xl mx-auto bg-black/70 rounded-xl py-10 px-6 md:px-12 -mt-12 relative z-10 shadow-2xl">

        <div className="flex items-center gap-3 mb-5 justify-center">
          <Rocket className="text-fuchsia-400 animate-bounce" size={28} />
          <CalendarDays className="text-indigo-300" size={24} />
          <span className="text-white font-semibold">
            Submission Deadline:
            <span className="text-fuchsia-200 ml-2">July 31, 2025</span>
          </span>
        </div>
        <p className="text-white text-lg md:text-xl mb-8 text-center font-normal">
          <span className="font-bold text-purple-200">Calling all dreamers, designers, space lovers, and problem-solvers!</span> <br /> FIA invites you to the Ideathon 2025 — a challenge to shape the future of space living. No code needed — just ideas! Pitch solutions for Mars, the Moon, or life aboard space stations.
        </p>

        <div className="mb-6 grid md:grid-cols-2 gap-6 items-center">
          <img src={visual1} className="rounded-xl shadow-lg object-cover w-full max-h-60 bg-indigo-900" alt="Reimagine Space Living Visual" />
          <div>
            <h3 className="text-2xl font-bold text-fuchsia-300 mb-2 flex items-center gap-2">
              <Sparkles className="text-pink-400" size={22}/> Theme
            </h3>
            <p className="text-indigo-100 mb-3">
              <b>“Reimagining the Future of Space Living”</b>
              <br />
              Propose innovative ideas that could transform how humans live, work, stay healthy, or communicate in space!
            </p>
            <ul className="list-disc list-inside text-slate-200 text-base">
              <li>Health and human performance (space adaptation)</li>
              <li>AI-powered support systems</li>
              <li>Space food & sustainable ecosystems</li>
              <li>Mental wellness in isolation</li>
              <li>Smart habitats for extreme environments</li>
              <li>Creative education for "space kids"</li>
              <li>Redesign spacesuits, rovers, or habitats</li>
              <li>Culture & spiritual life in colonies</li>
            </ul>
          </div>
        </div>
        
        <div className="mb-7">
          <h3 className="text-2xl font-bold text-fuchsia-300 mb-2 flex items-center gap-2">
            <Image className="text-indigo-300" size={22}/> What to Submit
          </h3>
          <ul className="list-decimal list-inside space-y-1 text-slate-200 text-base pl-2">
            <li><b>Idea Title</b></li>
            <li><b>Problem Statement</b></li>
            <li><b>Your Idea (Concept)</b></li>
            <li><b>Who It Helps / Why It Matters</b></li>
            <li>(Optional) Diagrams, mockups, or video</li>
            <li>(Optional) Mini pitch deck (PDF or slides)</li>
          </ul>
        </div>

        <div className="mb-6 grid md:grid-cols-2 gap-6 items-center">
          <img src={visual2} className="rounded-xl shadow-lg object-cover w-full max-h-56 bg-indigo-900" alt="FIA Ideathon Mars Visual" />
          <div>
            <h3 className="text-xl font-bold text-fuchsia-300 mb-2 flex items-center gap-2">
              <Users className="text-blue-300" size={22}/> Who Can Participate?
            </h3>
            <ul className="list-disc list-inside text-slate-200 text-base">
              <li>Age 13+, any background</li>
              <li>Students, professionals, or enthusiasts</li>
              <li>Solo or teams up to 3</li>
              <li>No prior experience needed!</li>
            </ul>
          </div>
        </div>

        <div className="mb-7">
          <h3 className="text-xl font-bold text-fuchsia-300 mb-2 flex items-center gap-2">
            <Rocket className="text-fuchsia-500" size={22}/> Prizes & Fame
          </h3>
          <ul className="text-slate-200 text-base space-y-1 list-disc list-inside">
            <li>Top 3 ideas featured on FIA site</li>
            <li>Winners receive digital certificates</li>
            <li>Opportunity to co-develop idea with FIA team</li>
            <li>Mentorship or spotlight interview for winners</li>
          </ul>
        </div>

        <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 mb-6">
          <div className="flex-1">
            <span className="flex items-center gap-2 text-purple-200 text-base font-semibold">
              <CalendarDays/> Submission Deadline:
              <span className="text-fuchsia-200 font-bold ml-1">July 31, 2025</span>
            </span>
            <span className="block text-white mt-1 text-sm">
              Submit your idea using the form below!
            </span>
          </div>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdmU220q3UtGZVYw7sMx8zPhHHrDk9nPQTdncpvbZxEwQvv4Q/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold px-8 py-3 rounded-full transition-all text-lg shadow-lg mt-3 md:mt-0"
          >
            Submit Your Idea 🚀
          </a>
        </div>

        <div className="bg-black/50 text-slate-300 rounded-lg px-6 py-4 mt-8 border border-fuchsia-700 text-sm">
          <p>
            <span className="font-semibold">Questions?</span> Email the FIA team, or use <span className="text-fuchsia-300">#FIA-Ideathon2025</span> on your socials!
            <br />
            <span className="font-semibold">Note:</span> This is NOT a coding competition — just submit your ideas!
          </p>
          <p className="mt-3 italic text-fuchsia-300">
            FIA — inspiring the next era of space innovation 🌌
          </p>
        </div>
      </div>
    </div>
  );
}
