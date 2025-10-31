const featuredProjects = [
  {
    title: "PromptQuest AI Hackathon Winner",
    description:
      "Shipped an AI-assisted puzzle narrative in 72 hours, owning gameplay systems, UX writing, and pitch-ready storytelling.",
    link: "/(main)/projects#promptquest",
    tags: ["Next.js", "OpenAI", "Game Design"],
  },
  {
    title: "UXPH 2025 Experience Hub",
    description:
      "Built an event microsite with speaker journeys, schedule personalization, and analytics-informed content strategy.",
    link: "/(main)/projects#uxph",
    tags: ["Content Design", "TailwindCSS", "Accessibility"],
  },
  {
    title: "Java OOP2 Game Showcase",
    description:
      "Crafted a lightweight arcade experience to demonstrate clean architecture, smooth animations, and controller support.",
    link: "/(main)/projects#oop2",
    tags: ["Java", "Game Loop", "Pixel Art"],
  },
];

export default function FeaturedProjectsSection() {
  return (
    <section className="snap-start h-screen flex items-center justify-center px-6 sm:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col justify-center gap-6">
          <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.45em] text-teal-400">Featured Projects</p>
              <h2 className="text-2xl font-semibold text-slate-100 md:text-3xl">
                Case studies with personal impact
              </h2>
            </div>
            <a
              className="text-sm font-medium text-teal-300 transition hover:text-teal-200"
              href="/(main)/projects"
            >
              Browse all work →
            </a>
          </header>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </div>
    </section>
  );
}
