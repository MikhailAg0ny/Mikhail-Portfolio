const programmingLanguages = [
  { name: "JavaScript", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "Java", level: 80 },
  { name: "Python", level: 75 },
  { name: "C#", level: 70 },
  { name: "HTML/CSS", level: 95 },
];

const frameworks = [
  "Next.js",
  "React",
  "TailwindCSS",
  "Chakra UI",
  "Three.js",
  "Unity",
  "Node.js",
  "Express",
];

export default function SkillsSection() {
  return (
    <section id="skills" className="snap-start h-screen flex items-center justify-center px-6 sm:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="space-y-8">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.45em] text-teal-400">Technical Expertise</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-100 md:text-4xl">
              Programming Languages & Skills
            </h2>
            <p className="mt-4 text-base text-slate-300">
              Building full-stack solutions with modern technologies
            </p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
              <h3 className="mb-6 text-xl font-semibold text-slate-100">Core Languages</h3>
              <div className="space-y-4">
                {programmingLanguages.map((lang) => (
                  <div key={lang.name}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-medium text-slate-200">{lang.name}</span>
                      <span className="text-teal-300">{lang.level}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-300"
                        style={{ width: `${lang.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
              <h3 className="mb-6 text-xl font-semibold text-slate-100">Frameworks & Tools</h3>
              <ul className="grid grid-cols-2 gap-3 text-sm text-slate-300">
                {frameworks.map((framework) => (
                  <li
                    key={framework}
                    className="rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3 text-center transition hover:border-teal-400 hover:text-teal-300"
                  >
                    {framework}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
