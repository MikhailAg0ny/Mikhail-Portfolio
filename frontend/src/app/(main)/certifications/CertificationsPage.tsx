const certifications = [
  {
    name: "Google UX Design Professional Certificate",
    issuer: "Google / Coursera",
    date: "2024",
    focus: "Human-centered research, low-to-high fidelity prototyping, usability testing.",
  },
  {
    name: "Meta Front-End Developer Certificate",
    issuer: "Meta / Coursera",
    date: "2023",
    focus: "React, design systems, accessibility-first component development, CI/CD pipelines.",
  },
  {
    name: "Unity Certified Associate: Game Developer",
    issuer: "Unity",
    date: "2022",
    focus: "Gameplay systems, performance optimization, and cross-platform deployment.",
  },
];

function CertificationsPage() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-4xl px-6 py-16 sm:px-10">
      <header className="space-y-6">
        <p className="text-sm uppercase tracking-[0.45em] text-teal-500">Certifications</p>
        <h1 className="text-3xl font-semibold text-slate-100 md:text-4xl">
          Continuous learning that reinforces product craft.
        </h1>
        <p className="text-base text-slate-300 md:text-lg">
          A blend of UX, engineering, and game development credentials that inform the way I plan, build, and iterate on digital experiences.
        </p>
      </header>

      <section className="mt-12 space-y-6">
        {certifications.map((certificate) => (
          <article
            key={certificate.name}
            className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6"
          >
            <h2 className="text-2xl font-semibold text-slate-100">{certificate.name}</h2>
            <p className="text-sm text-teal-300">{certificate.issuer}</p>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{certificate.date}</p>
            <p className="mt-3 text-sm text-slate-300">{certificate.focus}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export default CertificationsPage;
