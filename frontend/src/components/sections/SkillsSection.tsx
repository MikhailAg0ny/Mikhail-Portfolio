import { frameworks, programmingLanguages } from "@/lib/data";
import Image from "next/image";

const languageIcons: Record<string, string> = {
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "C#": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  "HTML/CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
};

const frameworkIcons: Record<string, string> = {
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  TailwindCSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  "Chakra UI": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/chakraui/chakraui-original.svg",
  "Three.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
  Unity: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  Express: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
};

const rankColors: Record<"S" | "A" | "B" | "C" | "D" | "E" | "F", string> = {
  S: "bg-[#00CFE8] text-[#1A1D21]",
  A: "bg-[#00CFE8]/80 text-[#1A1D21]",
  B: "bg-[#00CFE8]/60 text-[#F0F2F5]",
  C: "bg-[#9AA5B1] text-[#F0F2F5]",
  D: "bg-[#9AA5B1]/60 text-[#F0F2F5]",
  E: "bg-[#9AA5B1]/40 text-[#F0F2F5]",
  F: "bg-[#9AA5B1]/20 text-[#F0F2F5]",
};

const rankDescriptions: Record<"S" | "A" | "B" | "C" | "D" | "E" | "F", string> = {
  S: "Signature stack mastery",
  A: "Advanced production-ready",
  B: "Confident contributor",
  C: "Solid fundamentals",
  D: "Actively growing",
  E: "Exploratory",
  F: "Learning stage",
};

export default function SkillsSection() {
  return (
    <section className="flex h-full w-full items-center justify-center overflow-hidden">
      <div className="flex h-full w-full max-w-6xl flex-col justify-center gap-10 px-6 pb-14 pt-24 sm:px-10">
        <header className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.45em] text-[#00CFE8]">Technical Expertise</p>
          <h2 className="text-3xl font-semibold text-[#F0F2F5] md:text-4xl">
            Programming Languages & Skills
          </h2>
          <p className="text-base text-[#9AA5B1]">
            Building full-stack solutions with modern technologies
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-[#9AA5B1]/20 bg-[#2A2F35]/60 p-6 sm:p-8">
            <h3 className="mb-6 text-xl font-semibold text-[#F0F2F5]">Core Languages</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {programmingLanguages.map((lang) => {
                const iconUrl = languageIcons[lang.name];
                return (
                  <div
                    key={lang.name}
                    className="group flex items-center justify-between rounded-2xl border border-[#9AA5B1]/20 bg-[#1A1D21]/40 px-5 py-4 transition-all hover:border-transparent hover:shadow-lg hover:shadow-[#00CFE8]/20"
                    style={{
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderImage = 'linear-gradient(to right, #00CFE8, #008C9E) 1';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderImage = '';
                    }}
                  >
                    <div className="flex items-center gap-3 max-w-[70%]">
                      {iconUrl && (
                        <img
                          src={iconUrl}
                          alt={lang.name}
                          className="h-8 w-8 flex-shrink-0 drop-shadow-[0_0_10px_rgba(0,207,232,0.3)] transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(0,207,232,0.5)]"
                        />
                      )}
                      <div>
                        <p className="font-medium text-[#F0F2F5]">{lang.name}</p>
                        <p className="text-xs text-[#9AA5B1]">{rankDescriptions[lang.level]}</p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold ${rankColors[lang.level]}`}
                    >
                      {lang.level}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-[#9AA5B1]/20 bg-[#2A2F35]/60 p-6 sm:p-8">
            <h3 className="mb-6 text-xl font-semibold text-[#F0F2F5]">Frameworks & Tools</h3>
            <ul className="grid grid-cols-2 gap-3 text-sm text-[#9AA5B1] sm:grid-cols-3">
              {frameworks.map((framework) => {
                const iconUrl = frameworkIcons[framework];
                return (
                  <li
                    key={framework}
                    className="group flex flex-col items-center gap-2 rounded-xl border border-[#9AA5B1]/20 bg-[#1A1D21]/40 px-4 py-3 text-center transition-all hover:border-transparent hover:text-[#00CFE8] hover:shadow-lg hover:shadow-[#00CFE8]/20"
                    style={{
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderImage = 'linear-gradient(to right, #00CFE8, #008C9E) 1';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderImage = '';
                    }}
                  >
                    {iconUrl && (
                      <img
                        src={iconUrl}
                        alt={framework}
                        className="h-10 w-10 drop-shadow-[0_0_10px_rgba(0,207,232,0.3)] transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(0,207,232,0.5)]"
                      />
                    )}
                    <span>{framework}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
