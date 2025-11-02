"use client";

import { useState, useEffect } from "react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

    // Handle modal state changes
  useEffect(() => {
    const nav = document.querySelector('nav');
    const handleWheel = () => {
      setIsModalOpen(false);
    };

    if (isModalOpen) {
      // Hide navbar
      if (nav) {
        (nav as HTMLElement).style.display = 'none';
      }
      // Add wheel listener to close modal on scroll attempt
      window.addEventListener('wheel', handleWheel, { passive: true });

      // Lock body scroll to prevent background from moving while modal is open
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore navbar
        if (nav) {
          (nav as HTMLElement).style.display = '';
        }
        // Remove listener
        window.removeEventListener('wheel', handleWheel);

        // Restore scroll position
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isModalOpen]);

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
            {projects.map((project, idx) => (
              <SwiperSlide key={idx} className="flex h-full items-center justify-center overflow-visible">
                {({ isActive }) => (
                  <article
                    className={`group relative flex max-h-[85vh] min-h-[300px] flex-col overflow-hidden rounded-3xl border p-4 backdrop-blur-md transition-all duration-300 sm:p-6 ${
                      isActive
                        ? 'scale-[1.02] border-victus-blue/30 bg-gradient-to-b from-mica-light/90 via-mica-dark/90 to-black/90'
                        : 'scale-95 border-text-secondary/10 bg-mica-dark/60 opacity-70 brightness-95'
                    } hover:!opacity-100 hover:!brightness-100 hover:scale-[1.03] hover:border-victus-blue/50 hover:shadow-xl hover:shadow-victus-blue/25`}
                  >
                    {/* Image Placeholder */}
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className={`mb-3 w-full flex-shrink-0 rounded-xl object-cover shadow-inner transition-all sm:mb-4 ${
                          isActive ? 'h-[clamp(9rem,22vh,12rem)]' : 'h-[clamp(7rem,18vh,9rem)]'
                        }`}
                      />
                    )}


                    {isActive ? (
                      <>
                        {/* Icon/Badge */}
                        <div className="mb-3 flex flex-shrink-0 items-center justify-between sm:mb-4">
                          <span className="inline-block rounded-full bg-victus-blue/10 px-3 py-1 text-sm font-medium text-victus-blue">
                            {project.timeframe}
                          </span>
                          <svg
                            className="h-5 w-5 text-victus-blue/60 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>

                        {/* Title & Role */}
                        <h3 className="text-lg font-bold text-white line-clamp-2">{project.title}</h3>
                        <p className="mt-1 text-sm text-victus-blue line-clamp-1">{project.role}</p>

                        {/* Problem Statement (limit to 4 lines) */}
                        <p className="mt-2 line-clamp-4 text-sm text-text-secondary sm:mt-3">
                          <span className="font-semibold text-text-primary">Challenge:</span> {project.problem}
                        </p>

                        {/* Stack Tags */}
                        <div className="mt-2 flex flex-shrink-0 flex-wrap gap-1.5 sm:mt-3">
                          {project.stack.slice(0, 2).map((tech, i) => (
                            <span
                              key={i}
                              className="rounded-lg bg-[#2A2F35] px-2.5 py-1 text-xs font-medium text-text-primary"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* View Project Link */}
                        <div className="mt-auto flex-shrink-0 border-t border-text-secondary/10 pt-3 sm:pt-4">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveIndex(idx);
                              setIsModalOpen(true);
                            }}
                            className="inline-flex items-center text-xs font-semibold text-victus-blue transition-colors hover:text-victus-blue/80"
                            aria-label={`View ${project.title}`}
                          >
                            View Project
                            <svg
                              className="ml-1.5 h-3.5 w-3.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                              />
                            </svg>
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Side Card Content */}
                        <h3 className="line-clamp-2 text-base font-semibold text-text-primary">
                          {project.title}
                        </h3>
                        <p className="mt-2 line-clamp-1 text-sm text-text-secondary">
                          {project.role}
                        </p>
                      </>
                    )}
                  </article>
                )}
              </SwiperSlide>
            ))}
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

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 px-4 backdrop-blur-3xl overflow-hidden"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-[#0f1419]/95 via-[#0a0e14]/98 to-[#0f1419]/95 backdrop-blur-xl shadow-2xl shadow-victus-blue/20 ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/60 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white"
              aria-label="Close modal"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="space-y-0">
              {/* Header */}
              <div className="bg-gradient-to-br from-victus-blue/10 to-cyan-400/5 p-8 pb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block rounded-full bg-victus-blue/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-victus-blue">
                    {projects[activeIndex].timeframe}
                  </span>
                  <span className="text-sm font-medium text-text-secondary">{projects[activeIndex].role}</span>
                </div>
                <h2 className="text-4xl font-bold text-white leading-tight">{projects[activeIndex].title}</h2>
              </div>

              {/* Project Image */}
              {projects[activeIndex].image && (
                <div className="px-8 pt-6">
                  <img
                    src={projects[activeIndex].image as string}
                    alt={projects[activeIndex].title}
                    className="w-full max-h-[400px] rounded-xl object-cover ring-1 ring-white/10"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="px-8 py-6 space-y-6">
                {/* Problem Section */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-victus-blue">Challenge</h3>
                  <p className="text-base leading-relaxed text-text-secondary/90">{projects[activeIndex].problem}</p>
                </div>

                {/* Description Section */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-victus-blue">Description</h3>
                  <p className="text-base leading-relaxed text-text-secondary/90">{projects[activeIndex].solution}</p>
                </div>

                {/* Results Section */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-victus-blue">Results</h3>
                  <ul className="space-y-2.5">
                    {projects[activeIndex].results.map((result, i) => (
                      <li key={i} className="flex items-start gap-3 text-base text-text-secondary/90">
                        <svg className="mt-1 h-5 w-5 flex-shrink-0 text-victus-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="px-8 pb-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-victus-blue">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {projects[activeIndex].stack.map((tech, i) => (
                    <span
                      key={i}
                      className="rounded-lg bg-victus-blue/15 px-4 py-2 text-sm font-semibold text-victus-blue ring-1 ring-victus-blue/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-gradient-to-br from-white/5 to-transparent px-8 py-6 flex flex-wrap gap-3">
                <a
                  href={projects[activeIndex].caseStudyUrl}
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-victus-blue to-cyan-400 px-6 py-3 text-sm font-bold text-white transition-all hover:shadow-lg hover:shadow-victus-blue/40 hover:scale-105"
                >
                  View Project
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href={projects[activeIndex].sourceUrl}
                  className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-6 py-3 text-sm font-bold text-white ring-1 ring-white/10 transition-all hover:bg-white/10 hover:scale-105"
                >
                  View Source Code
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
