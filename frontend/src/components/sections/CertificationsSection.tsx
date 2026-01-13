"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";
import { useSectionPadding, useBreakpoints } from "@/hooks/useBreakpoints";
import { certifications } from "@/lib/certification";
import type { Certificate } from "@/types";
import clsx from "clsx";

export default function CertificationsSection() {
  const { padding, minHeight } = useSectionPadding();
  const { isShort } = useBreakpoints();
  const adjustedMinHeight = isShort ? minHeight : "calc(100vh - 80px)"; // account for navbar without forcing overflow
  const pageSize = 6;
  const [page, setPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animTimeout = useRef<NodeJS.Timeout | null>(null);
  const certificateImages = useMemo<Certificate[]>(
    () =>
      [...certifications]
        .sort((a, b) => parseInt(b.date) - parseInt(a.date))
        .map((certificate) => ({
          ...certificate,
          image: certificate.image ? encodeURI(certificate.image) : undefined,
        })),
    []
  );

  const totalPages = Math.max(1, Math.ceil(certificateImages.length / pageSize));
  const currentPage = Math.min(page, totalPages - 1);
  const pagedCertificates = useMemo(
    () =>
      certificateImages.slice(
        currentPage * pageSize,
        currentPage * pageSize + pageSize
      ),
    [certificateImages, currentPage]
  );

  const placeholders = Math.max(0, pageSize - pagedCertificates.length);

  const safelySetPage = (updater: (p: number) => number) => {
    setIsAnimating(true);
    if (animTimeout.current) clearTimeout(animTimeout.current);
    animTimeout.current = setTimeout(() => {
      setPage((p) => updater(p));
      setIsAnimating(false);
    }, 160);
  };

  const handlePrev = () => safelySetPage((p) => Math.max(0, p - 1));
  const handleNext = () => safelySetPage((p) => Math.min(totalPages - 1, p + 1));

  useEffect(() => () => {
    if (animTimeout.current) clearTimeout(animTimeout.current);
  }, []);

  return (
    <section
      className={`flex w-full justify-center ${padding}`}
      style={{ minHeight: adjustedMinHeight }}
    >
      <div
        className={clsx(
          "mx-auto flex w-full max-w-6xl flex-col gap-2 sm:gap-2 px-4 sm:px-4 transition-transform duration-300 ease-out",
          isShort && "scale-90 origin-center"
        )}
      >
        <header className="space-y-2 sm:space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-victus-blue">
            Certifications
          </p>
          <h2 className="text-3xl font-semibold text-text-primary md:text-4xl">
            My Certifications and Event Participations
          </h2>
          <p className="mx-auto max-w-3xl text-sm text-text-secondary md:text-base">
            Highlights from my recent certifications, commitment completion and event participations.
          </p>
        </header>

        <div
          className={clsx(
            "grid grid-cols-2 gap-2.5 sm:gap-3.5 lg:grid-cols-3 [grid-auto-rows:minmax(0,1fr)] justify-items-center transition-all duration-200",
            isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          )}
        >
          {pagedCertificates.map((certificate) => (
            <SpotlightCard
              key={certificate.name}
              className="group relative mx-auto flex h-full w-full max-w-[280px] flex-col items-center justify-between overflow-hidden rounded-[16px] border border-text-secondary/20 bg-mica-light/60 p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:border-victus-blue/30 hover:bg-mica-light/70 sm:max-w-[280px] sm:p-3.5"
            >
              <div className="relative aspect-square w-18 sm:w-20 overflow-hidden rounded-[14px] border border-white/15 shadow-inner shadow-black/30">
                {certificate.image ? (
                  <Image
                    src={certificate.image}
                    alt={`${certificate.name} certificate preview`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 40vw, 120px"
                    loading="lazy"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-victus-blue/10">
                    <span className="text-2xl">🏆</span>
                  </div>
                )}
              </div>

              <div className="mt-3.5 space-y-1">
                <h3 className="text-sm font-semibold text-text-primary sm:text-base leading-snug text-center">{certificate.name}</h3>
                <p className="text-[0.62rem] uppercase tracking-[0.3em] text-victus-blue/90 sm:text-[0.68rem]">{certificate.issuer}</p>
                <p className="text-[0.64rem] font-medium text-text-secondary/80 sm:text-[0.7rem]">Issued {certificate.date}</p>
              </div>

              {certificate.link && (
                <a
                  href={certificate.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-full border border-victus-blue/40 bg-gradient-to-r from-victus-blue/15 via-victus-blue/5 to-transparent px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-victus-blue transition-all hover:-translate-y-0.5 hover:border-victus-blue/60 hover:shadow-lg hover:shadow-victus-blue/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-victus-blue/60"
                >
                  View Proof
                  <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.2} />
                </a>
              )}
            </SpotlightCard>
          ))}

          {placeholders > 0 &&
            Array.from({ length: placeholders }).map((_, idx) => (
              <SpotlightCard
                key={`placeholder-${currentPage}-${idx}`}
                className="group relative mx-auto flex h-full w-full max-w-[280px] flex-col items-center justify-center overflow-hidden rounded-[16px] border border-dashed border-text-secondary/30 bg-mica-light/40 p-3 text-center text-text-secondary/70 sm:max-w-[280px] sm:p-3.5"
              >
                <div className="relative aspect-square w-18 sm:w-20 overflow-hidden rounded-[14px] border border-white/10 bg-black/20 shadow-inner shadow-black/20" />
                <div className="mt-3.5 space-y-1">
                  <h3 className="text-sm font-semibold text-text-secondary sm:text-base">Coming Soon</h3>
                  <p className="text-[0.7rem] uppercase tracking-[0.22em] text-text-secondary/60">Certification</p>
                </div>
              </SpotlightCard>
            ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-3 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="inline-flex items-center justify-center rounded-md px-2.5 py-2 text-sm font-semibold text-text-primary ring-1 ring-text-secondary/30 transition-all disabled:cursor-not-allowed disabled:opacity-50 hover:bg-white/5 hover:-translate-y-0.5"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
              <span className="sr-only">Previous</span>
            </button>
            <span className="text-xs font-medium text-text-secondary">
              Page {currentPage + 1} / {totalPages}
            </span>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
              className="inline-flex items-center justify-center rounded-md px-2.5 py-2 text-sm font-semibold text-text-primary ring-1 ring-text-secondary/30 transition-all disabled:cursor-not-allowed disabled:opacity-50 hover:bg-white/5 hover:-translate-y-0.5"
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
              <span className="sr-only">Next</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
