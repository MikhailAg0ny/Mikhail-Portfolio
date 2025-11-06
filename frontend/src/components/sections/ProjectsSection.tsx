"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

import { myProjects } from "@/lib/projects";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { useSectionPadding } from "@/hooks/useBreakpoints";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ProjectsSection() {
  // Use the dataset as-is (no duplication or looping)
  const projects = myProjects;
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const sectionRef = useRef<HTMLElement | null>(null);
  const hintTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { padding, minHeight } = useSectionPadding();

  const hideSwipeHint = useCallback(() => {
    if (hintTimeoutRef.current) {
      clearTimeout(hintTimeoutRef.current);
      hintTimeoutRef.current = null;
    }
    setShowSwipeHint(false);
  }, []);

  const triggerSwipeHint = useCallback(() => {
    if (hintTimeoutRef.current) {
      clearTimeout(hintTimeoutRef.current);
    }
    setShowSwipeHint(true);
    hintTimeoutRef.current = setTimeout(() => {
      setShowSwipeHint(false);
      hintTimeoutRef.current = null;
    }, 4500);
  }, []);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerSwipeHint();
          }
        });
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(sectionEl);
    triggerSwipeHint();

    return () => {
      observer.disconnect();
      if (hintTimeoutRef.current) {
        clearTimeout(hintTimeoutRef.current);
        hintTimeoutRef.current = null;
      }
    };
  }, [triggerSwipeHint]);

  return (
    <section
      ref={sectionRef}
      className={`relative flex w-full items-center justify-center overflow-visible ${padding}`}
      style={{ minHeight }}
    >
      <div className="flex w-full max-w-7xl flex-col justify-start gap-6 px-4 sm:justify-center sm:gap-8 sm:px-10">
        {/* Header */}
        <div className="flex-shrink-0 space-y-2 text-center sm:space-y-3">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">My Projects</h2>
          <p className="text-base text-text-secondary sm:text-lg">A selection of my recent work</p>
        </div>

        {/* Mobile Swiper */}
        <Tooltip.Provider delayDuration={200} skipDelayDuration={400}>
        <div className="sm:hidden relative">
          {/* Mobile Swipe Hint */}
          {showSwipeHint && (
            <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center">
              <div className="flex items-center gap-3 rounded-full border border-victus-blue/30 bg-mica-dark/90 px-4 py-2 text-xs font-semibold text-victus-blue shadow-lg backdrop-blur-sm animate-pulse">
                <svg className="h-4 w-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Swipe left / right</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          )}
          
          <Swiper
            modules={[Pagination, Keyboard]}
            className="projects-swiper-mobile"
            slidesPerView={1.05}
            spaceBetween={18}
            centeredSlides
            grabCursor
            keyboard={{ enabled: true }}
            pagination={{ clickable: true, el: '.projects-swiper-mobile-pagination' }}
            onSlideChange={(swiper: SwiperType) => {
              setActiveIndex(swiper.realIndex);
              hideSwipeHint();
            }}
            onTouchStart={hideSwipeHint}
          >
            {projects.map((project, idx) => {
              const primaryTech = project.primaryTech;
              const secondaryTechs =
                project.featuredTechs && project.featuredTechs.length > 0
                  ? project.featuredTechs
                  : project.stack.filter((tech) => tech !== primaryTech);

              return (
                <SwiperSlide key={`mobile-${idx}`} className="flex h-full pb-6">
                  {/* Mobile project card layout */}
                  <article className="flex w-full flex-col gap-4 rounded-3xl border border-white/10 bg-gradient-to-b from-mica-light/90 via-mica-dark/90 to-black/90 p-5 shadow-lg shadow-victus-blue/10 backdrop-blur-md">
                    <span className="inline-block w-fit rounded-full bg-victus-blue/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-victus-blue">
                      {project.timeframe}
                    </span>

                    {project.image && (
                      <div className="relative overflow-hidden rounded-xl">
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="h-64 w-full object-cover"
                        />
                      </div>
                    )}

                    <div className="space-y-2 text-left">
                      <h3 className="text-xl font-bold leading-tight text-white">{project.title}</h3>
                      {primaryTech && <p className="text-sm font-semibold text-victus-blue/90">{primaryTech}</p>}
                    </div>

                    <p className="text-sm leading-relaxed text-text-secondary/90">{project.problem}</p>

                    {secondaryTechs.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {secondaryTechs.map((tech, techIdx) => (
                          <Tooltip.Root key={techIdx}>
                            <Tooltip.Trigger asChild>
                              <span
                                className="rounded-lg bg-[#2A2F35] px-3 py-1 text-xs font-medium text-text-primary"
                              >
                                {tech}
                              </span>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                              <Tooltip.Content
                                sideOffset={8}
                                className="rounded-xl border border-victus-blue/30 bg-mica-dark/95 px-2.5 py-1.5 text-[10px] font-medium text-text-secondary shadow-lg backdrop-blur-xl"
                              >
                                Part of the {project.title} stack
                                <Tooltip.Arrow className="fill-mica-dark/95" />
                              </Tooltip.Content>
                            </Tooltip.Portal>
                          </Tooltip.Root>
                        ))}
                      </div>
                    )}

                    <p className="text-sm font-medium text-victus-blue/80">Role: {project.role}</p>

                    <div className="flex flex-col gap-3 pt-2">
                      <a
                        href={project.caseStudyUrl}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-victus-blue/20 px-5 py-2 text-sm font-semibold text-victus-blue transition-colors hover:bg-victus-blue/30"
                        aria-label={`Open ${project.title} case study`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Project
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </a>

                      {project.sourceUrl && (
                        <a
                          href={project.sourceUrl}
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-white transition-colors hover:border-victus-blue hover:text-victus-blue"
                          target="_blank"
                          rel="noreferrer"
                        >
                          View Source
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="projects-swiper-mobile-pagination mt-4 flex justify-center"></div>
        </div>
        </Tooltip.Provider>

        {/* Swiper Carousel */}
        <div className="relative group mx-auto hidden w-full max-w-7xl overflow-visible px-2 sm:block sm:px-4">
          {/* Desktop Hover Hint */}
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center transition-opacity duration-300 ${
              showSwipeHint ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex items-center gap-4 rounded-full border border-victus-blue/40 bg-mica-dark/95 px-6 py-3 text-sm font-semibold text-victus-blue shadow-2xl backdrop-blur-md animate-pulse">
              <svg className="h-5 w-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Click, drag, or use arrows</span>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          
          <Swiper
            modules={[Navigation, Pagination, Keyboard]}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            spaceBetween={36}
            loop={false}
            autoHeight={true}
            observer={true}
            observeParents={true}
            watchOverflow={true}
            allowTouchMove={true}
            speed={500}
            slideToClickedSlide={true}
            keyboard={{
              enabled: true,
            }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{
              clickable: true,
              el: '.swiper-pagination-custom',
              dynamicBullets: true,
            }}
            onSlideChange={(swiper: SwiperType) => {
              setActiveIndex(swiper.realIndex);
              hideSwipeHint();
            }}
            onTouchStart={hideSwipeHint}
            onSliderMove={hideSwipeHint}
            className="projects-swiper"
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 36,
              },
            }}
            style={{ minHeight: '420px', maxHeight: '520px', overflow: 'visible', paddingBottom: '12px', paddingTop: '12px' }}
          >
            {projects.map((project, idx) => {
              const primaryTech = project.primaryTech;
              const secondaryTechs =
                project.featuredTechs && project.featuredTechs.length > 0
                  ? project.featuredTechs
                : project.stack.filter((tech) => tech !== primaryTech);
              const isActive = idx === activeIndex;

              return (
                <SwiperSlide key={idx} className="flex h-full items-center justify-center px-3">
                  <article
                    className={`group relative flex h-[460px] w-full max-w-[420px] flex-col overflow-hidden rounded-3xl border p-5 backdrop-blur-md transition-all duration-300 lg:h-[460px] lg:max-w-[420px] lg:p-6 ${
                      isActive
                        ? 'scale-[1.02] border-victus-blue/30 bg-gradient-to-b from-mica-light/90 via-mica-dark/90 to-black/90'
                        : '!scale-95 border-text-secondary/10 bg-mica-dark/60 opacity-70 brightness-95'
                    } hover:!opacity-100 hover:!brightness-100 hover:scale-[1.03] hover:border-victus-blue/50 hover:shadow-xl hover:shadow-victus-blue/25`}
                  >
                    {isActive ? (
                      <>
                        <div className="flex flex-col gap-4">
                          <span className="inline-block w-fit rounded-full bg-victus-blue/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-victus-blue">
                            {project.timeframe}
                          </span>

                          {project.image && (
                            <div
                              className="relative w-full overflow-hidden rounded-xl shadow-inner"
                              style={{ aspectRatio: "4 / 3" }}
                            >
                              <img
                                src={project.image}
                                alt={project.title}
                                loading="lazy"
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}

                          <div className="space-y-2 text-center sm:text-left">
                            <h3 className="text-xl font-bold text-white leading-tight line-clamp-2">{project.title}</h3>
                            {primaryTech && (
                              <p className="text-sm font-semibold text-victus-blue/90 line-clamp-1">{primaryTech}</p>
                            )}
                          </div>

                          <p className="line-clamp-4 text-sm text-text-secondary">
                            {project.problem}
                          </p>

                          {secondaryTechs.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {secondaryTechs.map((tech, techIdx) => (
                                <span
                                  key={techIdx}
                                  className="rounded-lg bg-[#2A2F35] px-2.5 py-1 text-xs font-medium text-text-primary"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}

                          <p className="text-sm font-medium text-victus-blue/80">Role: {project.role}</p>
                        </div>

                        <div className="mt-auto flex justify-center pt-4">
                          <a
                            href={project.caseStudyUrl}
                            className="inline-flex items-center gap-2 rounded-full bg-victus-blue/20 px-4 py-2 text-xs font-semibold text-victus-blue transition-colors hover:bg-victus-blue/30"
                            aria-label={`Open ${project.title} case study`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View Project
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </a>
                        </div>
                      </>
                    ) : (
                      <div className="flex h-full flex-col justify-between gap-3 text-left">
                        <div className="space-y-2">
                          <h3 className="text-base font-semibold text-text-primary line-clamp-2">{project.title}</h3>
                          {primaryTech && (
                            <p className="text-xs font-semibold uppercase tracking-wide text-victus-blue/80 line-clamp-1">
                              {primaryTech}
                            </p>
                          )}
                        </div>

                        {project.image && (
                          <div
                            className="relative w-full overflow-hidden rounded-xl opacity-80"
                            style={{ aspectRatio: "4 / 3" }}
                          >
                            <img
                              src={project.image}
                              alt={project.title}
                              loading="lazy"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button
            className="swiper-button-prev-custom absolute left-2 top-1/2 z-30 -translate-y-1/2 hidden rounded-full border border-text-secondary/30 bg-mica-light/90 p-2.5 text-victus-blue backdrop-blur-sm opacity-0 transition-all sm:flex group-hover:opacity-100 hover:border-victus-blue/60 hover:bg-victus-blue/10 hover:scale-110"
            aria-label="Previous project"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            className="swiper-button-next-custom absolute right-2 top-1/2 z-30 -translate-y-1/2 hidden rounded-full border border-text-secondary/30 bg-mica-light/90 p-2.5 text-victus-blue backdrop-blur-sm opacity-0 transition-all sm:flex group-hover:opacity-100 hover:border-victus-blue/60 hover:bg-victus-blue/10 hover:scale-110"
            aria-label="Next project"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Custom Pagination */}
          <div className="swiper-pagination-custom mt-6 flex flex-shrink-0 items-center justify-center gap-3 sm:mt-10" />
        </div>
      </div>
    </section>
  );
}
