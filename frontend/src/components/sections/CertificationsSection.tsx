import { certifications } from "@/lib/data";

export default function CertificationsSection() {
  return (
    <section className="h-full w-full bg-[#2A2F35]/20">
      <div className="h-full px-6 pb-16 pt-28 sm:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <header className="space-y-6">
            <p className="text-sm uppercase tracking-[0.45em] text-[#00CFE8]">Certifications</p>
            <h2 className="text-3xl font-semibold text-[#F0F2F5] md:text-4xl">
              Continuous learning that reinforces product craft.
            </h2>
            <p className="text-base text-[#9AA5B1] md:text-lg">
              A blend of UX, engineering, and game development credentials that inform the way I plan, build, and iterate on
              digital experiences.
            </p>
          </header>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((certificate) => (
              <article
                key={certificate.name}
                className="group rounded-3xl border border-[#9AA5B1]/20 bg-[#2A2F35]/60 p-6 transition-all hover:border-transparent hover:shadow-lg hover:shadow-[#00CFE8]/10"
                style={{
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderImage = 'linear-gradient(to right, #1A1D21, #2A2F35, #1A1D21) 1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderImage = '';
                }}
              >
                <h3 className="text-2xl font-semibold text-[#F0F2F5]">{certificate.name}</h3>
                <p className="text-sm text-[#00CFE8]">{certificate.issuer}</p>
                <p className="text-xs uppercase tracking-[0.35em] text-[#9AA5B1]/60">{certificate.date}</p>
                <p className="mt-3 text-sm text-[#9AA5B1]">{certificate.focus}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
