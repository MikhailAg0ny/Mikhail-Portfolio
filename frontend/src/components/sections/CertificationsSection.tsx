"use client";

import { certifications } from "@/lib/certification";
import { useSectionPadding } from "@/hooks/useBreakpoints";

export default function CertificationsSection() {
  const { padding, minHeight } = useSectionPadding();

  return (
    <section
      className={`flex w-full justify-center ${padding}`}
      style={{ minHeight }}
    >
      <div className="flex w-full max-w-6xl flex-col gap-8 px-6 sm:px-10">
        <header className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-victus-blue">
            Certifications
          </p>
          <h2 className="text-3xl font-semibold text-text-primary md:text-4xl">
            Continuous learning that reinforces product craft
          </h2>
          <p className="mx-auto max-w-3xl text-sm text-text-secondary md:text-base">
            Highlights from UX, engineering, and game development programs that shape how I build, collaborate, and ship polished experiences.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((certificate) => (
            <article
              key={certificate.name}
              className="group flex h-full flex-col items-center justify-between rounded-[28px] border border-white/10 bg-transparent p-5 text-center transition-transform duration-300 hover:-translate-y-1 hover:border-victus-blue/40 sm:p-6"
            >
              <div className="relative h-32 w-32 overflow-hidden rounded-[24px] border border-white/15 shadow-inner shadow-black/30 sm:h-36 sm:w-36">
                <img
                  src={certificate.image}
                  alt={`${certificate.name} certificate preview`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="mt-5 space-y-1.5">
                <h3 className="text-base font-semibold text-text-primary sm:text-lg">{certificate.name}</h3>
                <p className="text-[0.65rem] uppercase tracking-[0.35em] text-victus-blue/90 sm:text-xs">{certificate.issuer}</p>
                <p className="text-[0.7rem] font-medium text-text-secondary/80 sm:text-xs">Issued {certificate.date}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
