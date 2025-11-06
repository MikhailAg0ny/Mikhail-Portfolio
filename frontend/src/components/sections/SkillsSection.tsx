"use client";

import { useState, useMemo } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { getSkillsByCategory, ITEMS_PER_PAGE, SKILL_CATEGORIES } from "@/lib/skills";
import type { SkillCategory } from "@/lib/skills";
import SkillCard from "@/components/ui/SkillCard";
import { useSectionPadding } from "@/hooks/useBreakpoints";

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<SkillCategory>("languages");
  const [currentPage, setCurrentPage] = useState(0);
  const { padding, minHeight } = useSectionPadding();

  // Memoize current skills to avoid recalculation
  const currentSkills = useMemo(() => getSkillsByCategory(activeTab), [activeTab]);
  
  // Memoize paginated items
  const currentItems = useMemo(() => {
    const startIndex = currentPage * ITEMS_PER_PAGE;
    return currentSkills.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentSkills, currentPage]);

  // Memoize total pages
  const totalPages = useMemo(() => 
    Math.ceil(currentSkills.length / ITEMS_PER_PAGE),
    [currentSkills.length]
  );

  const handleTabChange = (tab: SkillCategory) => {
    setActiveTab(tab);
    setCurrentPage(0);
  };

  // Navigation is handled via pagination dots only when multiple pages exist


  return (
    <section
      className={`flex w-full items-center justify-center px-4 ${padding}`}
      style={{ minHeight }}
    >
      <div className="flex w-full max-w-5xl flex-col justify-center gap-3 sm:gap-4 md:gap-6">
        <header className="flex-shrink-0 space-y-1 text-center sm:space-y-2 md:space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-victus-blue/80 sm:text-xs md:text-sm">Technical Expertise</p>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            My Skills
          </h2>
          <p className="text-xs text-text-secondary/80 sm:text-sm md:text-base">
            Technologies and tools I work with
          </p>
        </header>

        <div className="w-full rounded-2xl border border-victus-blue/15 bg-gradient-to-b from-[#10141f]/90 via-[#0f1a2b]/80 to-[#0d111c]/90 p-3 sm:p-4 md:p-5 shadow-[0_24px_60px_rgba(12,56,92,0.35)] backdrop-blur-xl">
          <Tooltip.Provider delayDuration={150} skipDelayDuration={400}>
            <div className="mb-3 flex h-9 flex-shrink-0 justify-center gap-1 rounded-full bg-mica-dark/80 p-1 shadow-inner shadow-black/20 sm:mb-4 sm:h-10 sm:gap-1.5">
              {SKILL_CATEGORIES.map((category) => (
                <Tooltip.Root key={category.key}>
                  <Tooltip.Trigger asChild>
                    <button
                      onClick={() => handleTabChange(category.key)}
                      className={`relative flex-1 rounded-full px-1.5 py-1 text-xs sm:px-2.5 sm:py-1.5 sm:text-xs md:text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                        activeTab === category.key
                          ? "bg-gradient-to-r from-victus-blue to-cyan-400 text-white shadow-lg shadow-victus-blue/40 scale-105"
                          : "bg-mica-light/20 text-text-secondary shadow-inner shadow-black/10 hover:bg-mica-light/30 hover:text-white"
                      }`}
                      aria-pressed={activeTab === category.key}
                      type="button"
                    >
                      {category.label}
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      sideOffset={8}
                      className="rounded-lg border border-victus-blue/30 bg-mica-dark/95 px-3 py-1.5 text-xs font-medium text-text-secondary shadow-xl backdrop-blur-lg"
                    >
                      View {category.label.toLowerCase()} I rely on most
                      <Tooltip.Arrow className="fill-mica-dark/95" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              ))}
            </div>
          </Tooltip.Provider>

          <div className="relative flex flex-col rounded-xl border border-white/5 bg-black/10 p-2 sm:p-3 md:p-4">

            {/* Grid Content */}
            <div className="flex flex-col" style={{ transition: 'all 0.3s ease-in-out' }}>
              <ul 
                key={`${activeTab}-${currentPage}`}
                className="skill-grid grid w-full grid-cols-3 items-start content-start gap-1.5 sm:gap-2 md:gap-3"
                style={{ transition: 'height 0.3s ease-in-out' }}
              >
                {currentItems.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </ul>

              {/* Page Indicator */}
              {totalPages > 1 && (
                <div className="mt-2 flex flex-shrink-0 justify-center gap-1.5 sm:mt-3 md:gap-2">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 sm:h-2 ${
                        currentPage === index
                          ? "w-6 sm:w-8 md:w-10 bg-gradient-to-r from-victus-blue to-cyan-400 shadow-md shadow-victus-blue/50"
                          : "w-1.5 sm:w-2 bg-text-secondary/40 hover:w-2.5 sm:hover:w-3 hover:bg-text-secondary/60"
                      }`}
                      aria-label={`Go to page ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
