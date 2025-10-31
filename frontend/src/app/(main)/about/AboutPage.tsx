const experience = [
  {
    role: "Full-Stack Developer",
    company: "Indie Studio Collective",
    period: "2023 — Present",
    summary:
      "Lead developer across web and game prototypes, owning discovery, UX, and front-end build pipelines.",
  },
  {
    role: "Associate Software Engineer",
    company: "Tech Agency",
    period: "2021 — 2023",
    summary:
      "Delivered marketing sites and internal tools with emphasis on accessibility, automation, and developer experience.",
  },
];

const interests = [
  "Gameplay prototyping",
  "Interactive storytelling",
  "Design systems",
  "Developer tooling",
];

function AboutPage() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-4xl px-6 py-16 sm:px-10">
      <section className="space-y-6">
        <p className="text-sm uppercase tracking-[0.45em] text-teal-500">About</p>
        <h1 className="text-3xl font-semibold text-slate-100 md:text-4xl">
          Developer, designer, and storyteller focused on building playful web experiences.
        </h1>
        <p className="text-base text-slate-300 md:text-lg">
          I bridge product strategy, UI craft, and technical execution. From initial problem framing to shipping production-ready interfaces, I translate ideas into digital experiences people enjoy using.
        </p>
      </section>

      <section className="mt-12 grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:gap-16">
        <div className="space-y-8">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="text-xl font-semibold text-slate-100">Professional Highlights</h2>
            <ul className="mt-6 space-y-5 text-sm text-slate-300">
              {experience.map((item) => (
                <li key={item.role}>
                  <p className="text-base font-medium text-teal-300">{item.role}</p>
                  <p className="text-sm text-slate-400">{item.company}</p>
                  <p className="text-xs uppercase tracking-wider text-slate-500">{item.period}</p>
                  <p className="mt-2 text-sm text-slate-300">{item.summary}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="text-xl font-semibold text-slate-100">Design & Dev Philosophy</h2>
            <p className="mt-4 text-sm text-slate-300">
              Ship early, iterate with intention, and make every interaction feel deliberate. I favor component-driven systems, shared language across teams, and constant user feedback loops.
            </p>
          </div>
        </div>
        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="text-lg font-semibold text-slate-100">Certifications & Education</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>BS Computer Science — State University</li>
              <li>Google UX Design Professional Certificate</li>
              <li>Meta Front-End Developer Certificate</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="text-lg font-semibold text-slate-100">Beyond the Editor</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {interests.map((interest) => (
                <li key={interest}>{interest}</li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}

export default AboutPage;
