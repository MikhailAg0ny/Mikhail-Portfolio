const featuredProjects = [
  {
    title: "Interactive Dev Portfolio",
    description:
      "A polished Next.js portfolio showcasing end-to-end product thinking with clean visuals and case-study storytelling.",
    link: "/(main)/projects",
    tags: ["Next.js", "TailwindCSS", "Content Strategy"],
  },
  {
    title: "GameDev Showcase",
    description:
      "Responsive landing page for a jam game featuring lightweight motion, embedded demo, and performance budget.",
    link: "#",
    tags: ["Three.js", "TypeScript", "Design Systems"],
  },
];

const skills = [
  "TypeScript",
  "React & Next.js",
  "Design Systems",
  "Game Development",
  "UX Writing",
  "Web Performance",
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 pb-20 pt-24 sm:px-10 sm:pt-28">
        <section className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.45em] text-teal-400">Portfolio</p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Building human-focused experiences across web apps, games, and interactive prototypes.
            </h1>
            <p className="max-w-xl text-base text-slate-300 md:text-lg">
              I design and code digital products that balance craft and speed. Every project highlights the problem, the process, and the measurable results.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                className="inline-flex items-center justify-center rounded-full bg-teal-500 px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-teal-400"
                href="/(main)/projects"
              >
                View Projects
              </a>
              <a
                className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-3 text-sm font-medium text-slate-100 transition hover:border-teal-400 hover:text-teal-300"
                href="/(main)/contact"
              >
                Work Together
              </a>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl backdrop-blur">
            <h2 className="text-lg font-semibold text-slate-100">Key Skills</h2>
            <ul className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-300 sm:grid-cols-3">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2 text-center"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.45em] text-teal-400">Featured Projects</p>
              <h2 className="text-2xl font-semibold text-slate-100 md:text-3xl">
                Case studies with impact
              </h2>
            </div>
            <a
              className="text-sm font-medium text-teal-300 transition hover:text-teal-200"
              href="/(main)/projects"
            >
              Browse all work →
            </a>
          </header>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <article
                key={project.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-teal-400"
              >
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-slate-100">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-300">{project.description}</p>
                  <ul className="flex flex-wrap gap-2 text-xs text-teal-300">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-teal-500/30 px-3 py-1"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <a
                    className="inline-flex items-center gap-2 text-sm font-medium text-teal-300 transition hover:text-teal-200"
                    href={project.link}
                  >
                    View case study
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.45em] text-teal-400">Approach</p>
            <h2 className="text-2xl font-semibold text-slate-100 md:text-3xl">
              Product mindset, shipped craftsmanship
            </h2>
            <p className="text-sm text-slate-300 md:text-base">
              Every build starts with understanding the story. I map user goals, prototype quickly, and measure results. The output: accessible, fast experiences that feel purposeful.
            </p>
          </div>
          <div className="grid gap-4">
            {["Discovery & positioning", "Experience design & front-end", "Testing, polish, and analytics"].map(
              (phase) => (
                <div
                  key={phase}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 px-5 py-4 text-sm text-slate-200"
                >
                  {phase}
                </div>
              ),
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
