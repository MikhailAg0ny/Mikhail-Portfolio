"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import * as Tooltip from "@radix-ui/react-tooltip";

import { projects as sortedProjects } from "@/lib/projects";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { useSectionPadding, useBreakpoints } from "@/hooks/useBreakpoints";
import { ArrowLeftRight, MousePointerClick } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import type { ProjectCaseStudy } from "@/types";
import clsx from "clsx";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const IMAGE_ROTATION_INTERVAL = 4000;

const getProjectTypeBadge = (type?: "school" | "client" | "side") => {
  if (!type) return null;

  const badges = {
    school: { label: "School Project", colorClass: "bg-cyan-500/15 text-cyan-400 border-cyan-400/30" },
    client: { label: "Client Project", colorClass: "bg-green-500/15 text-green-400 border-green-400/30" },
    side: { label: "Side Project", colorClass: "bg-purple-500/15 text-purple-400 border-purple-400/30" },
  };

  return badges[type];
};

const getProjectMediaSources = (project: ProjectCaseStudy): string[] => {
  if (project.images && project.images.length > 0) {
    return project.images;
  }

  if (project.image) {
    return [project.image];
  }

  return [];
};

type ProjectImageCarouselProps = {
  images?: string[];
  fallbackImage?: string;
  alt: string;
  sizes: string;
  imageClassName?: string;
  activeIndex: number;
};

function ProjectImageCarousel({
  images,
  fallbackImage,
  alt,
  sizes,
  imageClassName = "object-cover object-center",
  activeIndex,
}: ProjectImageCarouselProps) {
  const sources = useMemo(() => {
    if (images && images.length > 0) {
      return images;
    }

    if (fallbackImage) {
      return [fallbackImage];
    }

    return [];
  }, [images, fallbackImage]);

  if (sources.length === 0) {
    return null;
  }

  const resolvedIndex = sources.length > 0
    ? Math.min(activeIndex, sources.length - 1)
    : 0;

  return (
    <>
      {sources.map((src, idx) => (
        <motion.div
          key={`${src}-${idx}`}
          className="absolute inset-0"
          initial={{ opacity: idx === 0 ? 1 : 0 }}
          animate={{ opacity: idx === resolvedIndex ? 1 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className={imageClassName}
            sizes={sizes}
            loading="lazy"
            unoptimized
          />
        </motion.div>
      ))}
    </>
  );
}

export default function ProjectsSection() {
  // Use the dataset as-is (no duplication or looping)
  const projects = sortedProjects;
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const projectMediaSources = useMemo(
    () => projects.map(getProjectMediaSources),
    [projects],
  );
  const [imageIndexes, setImageIndexes] = useState<number[]>(() =>
    projectMediaSources.map(() => 0),
  );
  const sectionRef = useRef<HTMLElement | null>(null);
  const hintTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { padding, minHeight } = useSectionPadding();
  const { isShort, isMobile } = useBreakpoints();

  useEffect(() => {
    setImageIndexes(projectMediaSources.map(() => 0));
  }, [projectMediaSources, activeIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndexes((prev) =>
        prev.map((current, idx) => {
          const sources = projectMediaSources[idx];
          if (!sources || sources.length <= 1) {
            return 0;
          }

          if (idx !== activeIndex) {
            return 0;
          }

          return (current + 1) % sources.length;
        }),
      );
    }, IMAGE_ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, [projectMediaSources, activeIndex]);

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

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 24,
      scale: 0.96,
      backgroundColor: "rgba(24, 31, 43, 0.34)",
      borderColor: "rgba(59, 130, 246, 0.08)",
      boxShadow: "0px 12px 26px rgba(8, 15, 26, 0.16)",
    },
    inactive: {
      opacity: 0.88,
      y: 0,
      scale: 0.95,
      backgroundColor: "rgba(27, 36, 52, 0.45)",
      borderColor: "rgba(59, 130, 246, 0.12)",
      boxShadow: "0px 18px 30px rgba(12, 20, 33, 0.18)",
      transition: {
        duration: 0.45,
        ease: [0.22, 0.61, 0.36, 1],
        backgroundColor: { duration: 0.45 },
        borderColor: { duration: 0.45 },
        boxShadow: { duration: 0.45 },
      },
    },
    active: {
      opacity: 1,
      y: 0,
      scale: 1.02,
      backgroundColor: "rgba(18, 24, 36, 0.74)",
      borderColor: "rgba(56, 189, 248, 0.25)",
      boxShadow: "0px 16px 28px rgba(0, 0, 0, 0.25), 0 0 15px rgba(0, 207, 232, 0.08)",
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 24,
        backgroundColor: { duration: 0.3, ease: "easeOut" },
        borderColor: { duration: 0.3, ease: "easeOut" },
        boxShadow: { duration: 0.3, ease: "easeOut" },
      },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0px 20px 44px rgba(56, 189, 248, 0.18)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 22,
        boxShadow: { duration: 0.25, ease: "easeOut" },
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className={`relative flex w-full items-center justify-center overflow-hidden ${padding}`}
      style={{ minHeight }}
    >
      <div
        className={clsx(
          "mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-4 px-4 sm:gap-6 sm:px-8 lg:px-10 transition-transform duration-300 ease-out",
          isShort && "scale-[0.85] origin-center"
        )}
      >
        {/* Header */}
        <div className="relative flex-shrink-0 w-full space-y-1.5 text-center sm:space-y-3">
          {/* Subtle glow behind header */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-28 w-56 rounded-full bg-victus-blue/10 blur-3xl" />
          <p className="relative text-sm font-semibold uppercase tracking-[0.4em] text-victus-blue">
            Projects
          </p>
          <h2 className="relative text-3xl font-semibold text-text-primary md:text-4xl">
            My Projects
          </h2>
          <p className="relative mx-auto max-w-3xl text-sm text-text-secondary md:text-base">
            Recent projects or side projects I have worked on.
          </p>
        </div>

        {/* Mobile Swiper */}
        <Tooltip.Provider delayDuration={200} skipDelayDuration={400}>
          <div className="relative w-full sm:hidden">
            {/* Mobile Swipe Hint */}
            {showSwipeHint && (
              <div className="pointer-events-none mb-4 flex justify-center sm:hidden">
                <div className="z-10 flex items-center justify-center gap-2.5 rounded-full border border-text-secondary/25 bg-mica-light/60 px-3.5 py-1.5 text-[0.7rem] font-semibold text-text-primary shadow-lg shadow-victus-blue/20 backdrop-blur-xl animate-pulse">
                  <ArrowLeftRight className="h-3.5 w-3.5 text-victus-blue" strokeWidth={2.2} />
                  <span className="tracking-wide text-text-secondary/90">Swipe or drag to explore</span>
                  <MousePointerClick className="h-3.5 w-3.5 text-victus-blue" strokeWidth={2.2} />
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
                const secondaryTechs = project.featuredTechs || [];
                const showCaseStudyButton =
                  project.showCaseStudyButton ?? Boolean(project.caseStudyUrl);

                return (
                  <SwiperSlide
                    key={`mobile-${idx}`}
                    className="flex h-full pb-6"
                  >
                    {/* Mobile project card layout */}
                    <motion.article
                      className="projects-card flex w-full flex-col gap-3.5 rounded-3xl border border-text-secondary/20 bg-mica-light/60 p-5 shadow-lg shadow-victus-blue/10 backdrop-blur-md"
                      variants={cardVariants}
                      initial="hidden"
                      animate="active"
                      transition={{ delay: idx * 0.07 }}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-block rounded-full bg-victus-blue/15 px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wider text-victus-blue">
                          {project.timeframe}
                        </span>
                        {project.projectType && (
                          <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wider ${getProjectTypeBadge(project.projectType)?.colorClass}`}>
                            {getProjectTypeBadge(project.projectType)?.label}
                          </span>
                        )}
                      </div>

                      {(project.images?.length || project.image) && (
                        <div className="relative h-56 overflow-hidden rounded-xl">
                          <ProjectImageCarousel
                            images={project.images}
                            fallbackImage={project.image}
                            alt={project.title}
                            sizes="(max-width: 640px) 100vw, 33vw"
                            activeIndex={imageIndexes[idx] ?? 0}
                          />
                        </div>
                      )}

                      <div className="space-y-1.5 text-left">
                        <h3 className="text-lg font-bold leading-tight text-white">{project.title}</h3>
                        {primaryTech && <p className="text-xs font-semibold text-victus-blue/90">{primaryTech}</p>}
                      </div>

                      <p className="text-sm leading-relaxed text-text-secondary/90">{project.description}</p>

                      {secondaryTechs.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {secondaryTechs.map((tech, techIdx) => (
                            <Tooltip.Root key={techIdx}>
                              <Tooltip.Trigger asChild>
                                <span
                                  className="rounded-lg bg-[#2A2F35] px-3 py-1 text-xs font-medium text-text-primary transition-all duration-300 hover:bg-victus-blue/20 hover:scale-105"
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



                      <div className="flex flex-col gap-3 pt-2">
                        {showCaseStudyButton && project.caseStudyUrl && (
                          <a
                            href={project.caseStudyUrl}
                            className="btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-victus-blue/20 px-4 py-2 text-xs font-semibold text-victus-blue transition-colors hover:bg-victus-blue/30"
                            aria-label={`Open ${project.title} case study`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View Project
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </a>
                        )}

                        {project.sourceUrl && (
                          <a
                            href={project.sourceUrl}
                            className="glass-card-hover inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-white"
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
                    </motion.article>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className="projects-swiper-mobile-pagination mt-4 flex justify-center"></div>
          </div>
        </Tooltip.Provider>

        {/* Swiper Carousel */}
        <div className="relative group mx-auto hidden w-full max-w-7xl overflow-x-hidden px-2 sm:block sm:px-4">
          {/* Desktop Hover Hint */}
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center transition-opacity duration-300 ${showSwipeHint ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <div className="flex items-center gap-3 rounded-full border border-text-secondary/25 bg-mica-light/60 px-5 py-2.5 text-xs font-semibold text-text-primary shadow-lg shadow-victus-blue/20 backdrop-blur-xl animate-pulse">
              <ArrowLeftRight className="h-4 w-4 text-victus-blue" strokeWidth={2.2} />
              <span className="tracking-wide text-text-secondary/90">Click, drag, or use arrows</span>
              <MousePointerClick className="h-4 w-4 text-victus-blue" strokeWidth={2.2} />
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
            // Keep swiper tall enough to avoid internal scrolling when cards are active
            style={{ minHeight: '420px', overflow: 'visible', paddingBottom: '16px', paddingTop: '12px' }}
          >
            {projects.map((project, idx) => {
              const primaryTech = project.primaryTech;
              const secondaryTechs = project.featuredTechs || [];
              const showCaseStudyButton =
                project.showCaseStudyButton ?? Boolean(project.caseStudyUrl);
              const isActive = idx === activeIndex;

              return (
                <SwiperSlide key={idx} className="flex h-full items-center justify-center px-3">
                  <motion.article
                    className={`projects-card group relative flex h-auto w-full max-w-[540px] flex-col overflow-hidden rounded-3xl border bg-transparent p-5 shadow-lg backdrop-blur-md lg:max-w-[580px] lg:p-5 ${isActive ? 'min-h-[380px] lg:min-h-[400px]' : 'min-h-[280px] text-text-secondary/90'
                      }`}
                    style={{
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: isActive ? 'scale(1.08)' : 'scale(0.92)',
                    }}
                    variants={cardVariants}
                    initial="hidden"
                    animate={isActive ? "active" : "inactive"}
                    whileHover="hover"
                    transition={{ delay: idx * 0.08 }}
                  >
                    {isActive ? (
                      <>
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-block rounded-full bg-victus-blue/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-victus-blue">
                              {project.timeframe}
                            </span>
                            {project.projectType && (
                              <span className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${getProjectTypeBadge(project.projectType)?.colorClass}`}>
                                {getProjectTypeBadge(project.projectType)?.label}
                              </span>
                            )}
                          </div>

                          {(project.images?.length || project.image) && (
                            <div
                              className="relative w-full overflow-hidden rounded-xl shadow-inner"
                              style={{ aspectRatio: "4 / 3" }}
                            >
                              <ProjectImageCarousel
                                images={project.images}
                                fallbackImage={project.image}
                                alt={project.title}
                                sizes="(max-width: 1024px) 60vw, 28vw"
                                activeIndex={imageIndexes[idx] ?? 0}
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
                            {project.description}
                          </p>

                          {secondaryTechs.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {secondaryTechs.map((tech, techIdx) => (
                                <span
                                  key={techIdx}
                                  className="rounded-lg bg-[#2A2F35] px-2.5 py-1 text-xs font-medium text-text-primary transition-all duration-300 hover:bg-victus-blue/20 hover:scale-105"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}


                        </div>

                        <div className="mt-auto flex flex-col items-center gap-2 pt-4 sm:flex-row sm:justify-center">
                          {showCaseStudyButton && project.caseStudyUrl && (
                            <a
                              href={project.caseStudyUrl}
                              className="btn-shine inline-flex items-center gap-2 rounded-full bg-victus-blue/20 px-4 py-2 text-xs font-semibold text-victus-blue transition-colors hover:bg-victus-blue/30"
                              aria-label={`Open ${project.title} case study`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              View Project
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </a>
                          )}

                          {project.sourceUrl && (
                            <a
                              href={project.sourceUrl}
                              className="glass-card-hover inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-white"
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
                      </>
                    ) : (
                      <div className="flex h-full flex-col gap-4 text-left">
                        {(project.images?.length || project.image) && (
                          <div
                            className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-mica-dark/20 shadow-md"
                            style={{ aspectRatio: "4 / 3" }}
                          >
                            {project.timeframe && (
                              <div className="absolute left-3 top-3 z-10 flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center rounded-full bg-victus-blue/20 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-victus-blue shadow-sm">
                                  {project.timeframe}
                                </span>
                                {project.projectType && (
                                  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide shadow-sm ${getProjectTypeBadge(project.projectType)?.colorClass}`}>
                                    {getProjectTypeBadge(project.projectType)?.label}
                                  </span>
                                )}
                              </div>
                            )}
                            <ProjectImageCarousel
                              images={project.images}
                              fallbackImage={project.image}
                              alt={project.title}
                              sizes="(max-width: 1024px) 60vw, 25vw"
                              imageClassName="object-cover object-center transition-transform duration-500 group-hover:scale-[1.06]"
                              activeIndex={imageIndexes[idx] ?? 0}
                            />
                          </div>
                        )}

                        <div className="space-y-2">
                          <h3 className="text-base font-semibold text-text-primary line-clamp-2">{project.title}</h3>
                          {primaryTech && (
                            <p className="text-xs font-semibold uppercase tracking-wide text-victus-blue/80 line-clamp-1">
                              {primaryTech}
                            </p>
                          )}
                        </div>

                        {!project.image && project.timeframe && (
                          <span className="inline-flex w-fit items-center rounded-full bg-victus-blue/20 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-victus-blue">
                            {project.timeframe}
                          </span>
                        )}
                      </div>
                    )}
                  </motion.article>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Custom Pagination */}
          <div className="swiper-pagination-custom mt-6 flex flex-shrink-0 items-center justify-center gap-3 sm:mt-10" />
        </div>
      </div>
    </section>
  );
}
