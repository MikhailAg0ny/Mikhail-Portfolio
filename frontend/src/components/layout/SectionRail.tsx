"use client";

import { motion } from "framer-motion";
import { SECTION_ORDER, type SectionKey } from "@/lib/sections";

const SECTION_METADATA: Record<SectionKey, { index: string; label: string }> = {
  hero: { index: "01", label: "Home" },
  about: { index: "02", label: "About" },
  skills: { index: "03", label: "Skills" },
  projects: { index: "04", label: "Projects" },
  achievements: { index: "05", label: "Achievements" },
  certifications: { index: "06", label: "Certifications" },
  contact: { index: "07", label: "Contact" },
};

type SectionRailProps = {
  activeSection: SectionKey;
  onNavigate: (section: SectionKey) => void;
};

export default function SectionRail({ activeSection, onNavigate }: SectionRailProps) {
  return (
    <nav
      aria-label="Section navigation rail"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-3.5 select-none"
    >
      <div className="flex flex-col items-center gap-3 rounded-full border border-white/10 bg-black/40 px-2.5 py-4 backdrop-blur-md shadow-2xl">
        {SECTION_ORDER.map((section) => {
          const isActive = activeSection === section;
          const meta = SECTION_METADATA[section];

          return (
            <button
              key={section}
              type="button"
              onClick={() => onNavigate(section)}
              aria-label={`Scroll to ${meta.label} section`}
              aria-current={isActive ? "true" : undefined}
              className="group relative flex h-8 w-8 items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-victus-blue rounded-full transition-transform active:scale-90"
            >
              {/* Tooltip on hover */}
              <span className="pointer-events-none absolute right-full mr-3.5 hidden rounded-md border border-white/15 bg-mica-dark/95 px-2.5 py-1 text-xs font-mono font-medium text-slate-200 shadow-xl backdrop-blur-lg whitespace-nowrap transition-all opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:block">
                <span className="text-victus-blue mr-1.5">{meta.index}</span>
                {meta.label}
              </span>

              {/* Indicator Dot / Pill */}
              <span
                className={`relative block rounded-full transition-all duration-300 ease-out ${
                  isActive
                    ? "h-6 w-2 bg-gradient-to-b from-cyan-300 to-victus-blue shadow-[0_0_12px_rgba(0,207,232,0.85)]"
                    : "h-2 w-2 bg-slate-500/40 hover:bg-slate-300/80 hover:scale-125"
                }`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
