"use client";

import { useState } from "react";

import { myProjects } from "@/lib/projects";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ProjectsSection() {
  // Use the dataset as-is (no duplication or looping)
  const projects = myProjects;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="flex h-full w-full flex-col justify-center gap-6 px-6 pb-20 pt-28 sm:gap-8 sm:px-10">
        {/* Header */}
        <div className="flex-shrink-0 space-y-2 text-center sm:space-y-3">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">My Projects</h2>
          <p className="text-base text-text-secondary sm:text-lg">A selection of my recent work</p>
        </div>

        {/* Swiper Carousel */}
        <div className="relative group mx-auto w-full max-w-7xl px-4 overflow-hidden">
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
            onSlideChange={(swiper: SwiperType) => setActiveIndex(swiper.realIndex)}
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
            style={{ minHeight: '420px', overflow: 'hidden', paddingBottom: '12px', paddingTop: '12px' }}
          >
            {projects.map((project, idx) => {
              const primaryTech = project.primaryTech;
              const secondaryTechs =
                project.featuredTechs && project.featuredTechs.length > 0
                  ? project.featuredTechs
                  : project.stack.filter((tech) => tech !== primaryTech);
              const isActive = idx === activeIndex;

              return (
                <SwiperSlide key={idx} className="flex h-full items-center justify-center overflow-visible">
                  <article
                    className={`group relative flex max-h-[85vh] min-h-[300px] flex-col overflow-hidden rounded-3xl border p-4 backdrop-blur-md transition-all duration-300 sm:p-6 ${
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
