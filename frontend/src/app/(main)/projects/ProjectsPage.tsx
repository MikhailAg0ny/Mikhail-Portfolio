const projects = [
  {
    title: "Mythic Quest Companion",
    role: "Product Designer & Front-End Developer",
    timeframe: "2024",
    problem:
      "Increase player retention with a lore companion experience that works seamlessly on web and mobile.",
    solution:
      "Built a headless CMS driven site with in-browser mini games, accessibility-first navigation, and a React component library shared with in-game overlays.",
    results: [
      "+38% session duration", "22% reduction in support tickets", "Optimized TTI under 1.2s"
    ],
    caseStudyUrl: "#",
    sourceUrl: "#",
    stack: ["Next.js", "TypeScript", "TailwindCSS", "Storybook"],
  },
  {
    title: "Indie Dev Portfolio Engine",
    role: "Lead Developer",
    timeframe: "2023",
    problem:
      "Ship customizable portfolio templates for game developers with minimal setup.",
    solution:
      "Architected a modular content model, delivered theming controls, and automated deployments through GitHub Actions.",
    results: ["12+ live portfolios", "Average Lighthouse 95+", "2 week turnaround"],
    caseStudyUrl: "#",
    sourceUrl: "#",
    stack: ["Next.js", "MDX", "Framer Motion", "Vercel"],
  },
];

function ProjectsPage() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-6xl px-6 py-16 sm:px-10">
      <header className="space-y-6">
        <p className="text-sm uppercase tracking-[0.45em] text-teal-500">Projects</p>
        <h1 className="text-3xl font-semibold text-slate-100 md:text-4xl">
          Selected case studies that connect story, UX, and engineering.
        </h1>
        <p className="max-w-2xl text-base text-slate-300 md:text-lg">
          Each project balances experimentation with delivery. Explore the challenge, approach, and measurable outcomes that shaped these builds.
        </p>
      </header>

      <section className="mt-12 space-y-10">
        {projects.map((project) => (
          <article
            key={project.title}
            className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 transition hover:border-teal-400"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{project.timeframe}</p>
                  <h2 className="text-2xl font-semibold text-slate-100">{project.title}</h2>
                  <p className="text-sm text-teal-300">{project.role}</p>
                </div>
                <div className="space-y-3 text-sm text-slate-300">
                  <p><strong className="font-medium text-slate-100">Problem:</strong> {project.problem}</p>
                  <p><strong className="font-medium text-slate-100">Solution:</strong> {project.solution}</p>
                  <p className="font-medium text-slate-100">Results</p>
                  <ul className="ml-5 list-disc text-slate-300">
                    {project.results.map((result) => (
                      <li key={result}>{result}</li>
                    ))}
                  </ul>
                </div>
                <ul className="flex flex-wrap gap-2 text-xs text-teal-300">
                  {project.stack.map((item) => (
                    <li key={item} className="rounded-full border border-teal-500/30 px-3 py-1">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4 text-sm font-medium text-teal-300">
                  <a className="transition hover:text-teal-200" href={project.caseStudyUrl}>
                    Read case study →
                  </a>
                  <a className="transition hover:text-teal-200" href={project.sourceUrl}>
                    View source →
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default ProjectsPage;
