"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { getSkillsByCategory, ITEMS_PER_PAGE, SKILL_CATEGORIES } from "@/lib/skills";
import type { SkillCategory } from "@/lib/skills";
import SkillCard from "@/components/ui/SkillCard";
import { useBreakpoints, useSectionPadding } from "@/hooks/useBreakpoints";

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<SkillCategory>("languages");
  const [currentPage, setCurrentPage] = useState(0);
  const { padding } = useSectionPadding();
  const { isMobile } = useBreakpoints();
  const swiperRef = useRef<SwiperType | null>(null);

  const itemsPerPage = isMobile ? 6 : ITEMS_PER_PAGE;

  // Memoize current skills to avoid recalculation
  const currentSkills = useMemo(() => getSkillsByCategory(activeTab), [activeTab]);

  // Chunk skills into pages
  const pagedSkills = useMemo(() => {
    const pages: typeof currentSkills[] = [];
    for (let i = 0; i < currentSkills.length; i += itemsPerPage) {
      pages.push(currentSkills.slice(i, i + itemsPerPage));
    }
    return pages;
  }, [currentSkills, itemsPerPage]);

  const totalPages = pagedSkills.length || 1;

  useEffect(() => {
    setCurrentPage(0);
  }, [itemsPerPage]);

  useEffect(() => {
    swiperRef.current?.slideTo(0, 0);
  }, [activeTab, itemsPerPage]);

  const handleTabChange = (tab: SkillCategory) => {
    setActiveTab(tab);
    setCurrentPage(0);
  };

  // Navigation is handled via pagination dots only when multiple pages exist


  return (
    <section
      className={`flex w-full items-center justify-center overflow-hidden px-2 sm:px-4 lg:px-6 ${padding}`}
    >
      <div className="flex w-full max-w-5xl flex-col justify-center gap-2.5 sm:gap-4 md:gap-6">
        <header className="flex-shrink-0 space-y-0.5 text-center sm:space-y-2 md:space-y-3">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-victus-blue/80 sm:text-xs md:text-sm">Technical Expertise</p>
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            My Skills
          </h2>
          <p className="text-[0.7rem] text-text-secondary/80 sm:text-sm md:text-base">
            Technologies and tools I work with
          </p>
        </header>

        <div className="flex w/full min-h-[380px] max-w-5xl flex-col space-y-4 overflow-hidden rounded-[24px] border border-text-secondary/20 bg-mica-light/60 p-4 sm:min-h-[500px] sm:space-y-5 sm:p-6 md:min-h-[540px] md:space-y-6 md:p-6 lg:min-w-[700px] shadow-lg shadow-victus-blue/10 backdrop-blur-xl">
          <Tooltip.Provider delayDuration={150} skipDelayDuration={400}>
            <div className="flex h-8 flex-shrink-0 justify-center gap-1 overflow-hidden rounded-full bg-mica-dark/80 p-1 shadow-inner shadow-black/20 sm:h-10 sm:gap-1.5">
              {SKILL_CATEGORIES.map((category) => (
                <Tooltip.Root key={category.key}>
                  <Tooltip.Trigger asChild>
                    <button
                      onClick={() => handleTabChange(category.key)}
                      className={`relative flex-1 rounded-full px-1.5 py-0.5 text-[0.65rem] sm:px-2.5 sm:py-1.5 sm:text-xs md:text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
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

          <div className="flex-1 p-2.5 sm:p-4 md:p-5">
            {totalPages > 1 ? (
              <Swiper
                modules={[Keyboard]}
                slidesPerView={1}
                spaceBetween={18}
                allowTouchMove
                keyboard={{ enabled: true }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => {
                  setCurrentPage(swiper.realIndex);
                }}
                className="skills-swiper"
                autoHeight
              >
                {pagedSkills.map((pageSkills, pageIndex) => (
                  <SwiperSlide key={`${activeTab}-page-${pageIndex}`} className="h-auto">
                    <ul
                      className="skill-grid grid w-full grid-cols-2 items-stretch gap-3 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-3 lg:grid-cols-3 lg:gap-4 xl:grid-cols-3 xl:gap-5 [grid-auto-rows:minmax(0,1fr)]"
                    >
                      {pageSkills.map((skill, index) => (
                        <SkillCard
                          key={skill.name}
                          skill={skill}
                          index={pageIndex * itemsPerPage + index}
                        />
                      ))}
                    </ul>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <ul
                className="skill-grid grid w-full grid-cols-2 items-stretch gap-3 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-3 lg:grid-cols-3 lg:gap-4 xl:grid-cols-3 xl:gap-5 [grid-auto-rows:minmax(0,1fr)]"
              >
                {currentSkills.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </ul>
            )}

            {totalPages > 1 && (
              <div className="mt-3 flex justify-center gap-2 sm:mt-6">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentPage(index);
                      swiperRef.current?.slideTo(index);
                    }}
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
    </section>
  );
}
