import { certifications } from "@/lib/data";

export default function CertificationsSection() {
  return (
    <section className="h-full w-full bg-slate-900/30">
      <div className="h-full px-6 pb-16 pt-28 sm:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <header className="space-y-6">
            <p className="text-sm uppercase tracking-[0.45em] text-teal-500">Certifications</p>
            <h2 className="text-3xl font-semibold text-slate-100 md:text-4xl">
              Continuous learning that reinforces product craft.
            </h2>
            <p className="text-base text-slate-300 md:text-lg">
              A blend of UX, engineering, and game development credentials that inform the way I plan, build, and iterate on
              digital experiences.
            </p>
          </header>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((certificate) => (
              <article
                key={certificate.name}
                className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6"
              >
                <h3 className="text-2xl font-semibold text-slate-100">{certificate.name}</h3>
                <p className="text-sm text-teal-300">{certificate.issuer}</p>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{certificate.date}</p>
                <p className="mt-3 text-sm text-slate-300">{certificate.focus}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
