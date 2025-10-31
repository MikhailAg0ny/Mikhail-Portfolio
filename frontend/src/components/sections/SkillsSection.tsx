import { frameworks, programmingLanguages } from "@/lib/data";

const rankColors: Record<"S" | "A" | "B" | "C" | "D" | "E" | "F", string> = {
  S: "bg-teal-400 text-slate-950",
  A: "bg-emerald-400 text-slate-950",
  B: "bg-sky-400 text-slate-950",
  C: "bg-slate-500 text-slate-100",
  D: "bg-amber-500 text-slate-950",
  E: "bg-orange-500 text-slate-950",
  F: "bg-rose-500 text-slate-50",
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
    <section className="h-full w-full">
      <div className="h-full px-6 pb-16 pt-28 sm:px-10">
        <div className="mx-auto w-full max-w-6xl space-y-8">
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
                  <div
                    key={lang.name}
                    className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/40 px-5 py-4"
                  >
                    <div>
                      <p className="font-medium text-slate-100">{lang.name}</p>
                      <p className="text-xs text-slate-400">
                        {rankDescriptions[lang.level]}
                      </p>
                    </div>
                    <span
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold ${rankColors[lang.level]}`}
                    >
                      {lang.level}
                    </span>
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
