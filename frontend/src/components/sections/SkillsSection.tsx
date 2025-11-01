"use client";

import { useState, useMemo } from "react";
import { getSkillsByCategory, ITEMS_PER_PAGE, SKILL_CATEGORIES } from "@/lib/skills";
import type { SkillCategory } from "@/lib/skills";
import SkillCard from "@/components/ui/SkillCard";

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<SkillCategory>("languages");
  const [currentPage, setCurrentPage] = useState(0);

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

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };


  return (
    <section className="flex h-full w-full items-center justify-center overflow-hidden">
        <div className="flex h-full w-full max-w-6xl max-h-[95vh] flex-col justify-center gap-6 px-6 py-8 sm:gap-8 sm:px-10">
        <header className="flex-shrink-0 space-y-2 text-center sm:space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.45em] text-victus-blue sm:text-sm">Technical Expertise</p>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
            My Skills
          </h2>
          <p className="text-base text-text-secondary sm:text-lg">
            Technologies and tools I work with
          </p>
        </header>

        <div className="mx-auto flex w-full max-w-5xl h-[520px] sm:h-[700px] lg:h-[760px] flex-col overflow-hidden rounded-3xl border border-text-secondary/20 bg-gradient-to-b from-mica-light/80 via-mica-dark/60 to-mica-dark/80 p-3 shadow-2xl backdrop-blur-sm">
          <div className="mb-4 flex h-11 flex-shrink-0 justify-center gap-1 rounded-full bg-mica-dark/80 p-1 shadow-inner sm:mb-6 sm:h-12">
            {SKILL_CATEGORIES.map((category) => (
              <button
                key={category.key}
                onClick={() => handleTabChange(category.key)}
                className={`relative w-1/3 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  activeTab === category.key
                    ? "bg-gradient-to-r from-victus-blue to-victus-blue/80 text-white shadow-lg shadow-victus-blue/40 scale-[1.02]"
                    : "text-text-secondary hover:bg-mica-light/20 hover:text-white"
                }`}
                aria-pressed={activeTab === category.key}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="relative flex flex-1 flex-col p-4 sm:p-6" style={{ transition: 'height 0.3s ease-in-out' }}>
            {/* Navigation Arrows */}
            {totalPages > 1 && (
              <>
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className={`absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-text-secondary/30 bg-mica-light/95 p-3 backdrop-blur-md transition-all duration-300 ${
                    currentPage === 0
                      ? "cursor-not-allowed opacity-20"
                      : "hover:border-victus-blue/60 hover:bg-victus-blue/20 hover:scale-110 hover:shadow-xl hover:shadow-victus-blue/40"
                  }`}
                  aria-label="Previous page"
                >
                  <svg
                    className="h-5 w-5 text-victus-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages - 1}
                  className={`absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-text-secondary/30 bg-mica-light/95 p-3 backdrop-blur-md transition-all duration-300 ${
                    currentPage === totalPages - 1
                      ? "cursor-not-allowed opacity-20"
                      : "hover:border-victus-blue/60 hover:bg-victus-blue/20 hover:scale-110 hover:shadow-xl hover:shadow-victus-blue/40"
                  }`}
                  aria-label="Next page"
                >
                  <svg
                    className="h-5 w-5 text-victus-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Grid Content */}
            <div className="mx-4 flex flex-1 flex-col pb-2 sm:pb-4 sm:mx-10" style={{ transition: 'all 0.3s ease-in-out' }}>
              <ul 
                key={`${activeTab}-${currentPage}`}
                className="skill-grid grid h-full w-full grid-cols-1 items-start content-start gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
                style={{ transition: 'height 0.3s ease-in-out' }}
              >
                {currentItems.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </ul>

              {/* Page Indicator */}
              {totalPages > 1 && (
                <div className="mt-6 flex flex-shrink-0 justify-center gap-2.5 sm:mt-8">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        currentPage === index
                          ? "w-10 bg-gradient-to-r from-victus-blue to-cyan-400 shadow-md shadow-victus-blue/50"
                          : "w-2.5 bg-text-secondary/40 hover:w-4 hover:bg-text-secondary/60"
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
