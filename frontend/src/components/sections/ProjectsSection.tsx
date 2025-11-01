"use client";

import { useState } from "react";
import { projects as myProjects } from "@/lib/data";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ProjectsSection() {
  // Ensure we have at least 5 projects for looping, but never cap the total
  const baseProjects = myProjects;
  const minSlides = 5;
  const projects = baseProjects.length >= minSlides
    ? baseProjects
    : [...baseProjects, ...baseProjects.slice(0, minSlides - baseProjects.length)];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="flex h-full w-full items-center justify-center overflow-hidden">
      <div className="flex h-full w-full max-h-[95vh] flex-col justify-center gap-6 px-6 py-8 sm:gap-8 sm:px-10">
        {/* Header */}
        <div className="flex-shrink-0 space-y-2 text-center sm:space-y-3">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">Projects</h2>
          <p className="text-base text-text-secondary sm:text-lg">Featured projects and recent work</p>
        </div>

        {/* Swiper Carousel */}
        <div className="relative group mx-auto w-full max-w-7xl px-4">
          <Swiper
            modules={[Navigation, Pagination, Keyboard, Autoplay]}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            spaceBetween={40}
            loop={true}
            loopAdditionalSlides={5}
            autoHeight={true}
            observer={true}
            observeParents={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={700}
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
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            style={{ minHeight: '420px' }}
          >
            {projects.map((project, idx) => (
              <SwiperSlide key={idx} className="pb-10 h-auto">
                {({ isActive }) => (
                  <article
                    onClick={() => isActive && setIsModalOpen(true)}
                    className={`group relative flex max-h-[75vh] min-h-0 flex-col overflow-hidden rounded-3xl border p-4 backdrop-blur-md transition-all duration-500 sm:p-6 ${
                      isActive
                        ? 'cursor-pointer scale-105 border-victus-blue/30 ring-1 ring-victus-blue/30 bg-gradient-to-b from-mica-light/90 via-mica-dark/90 to-black/90 shadow-2xl shadow-victus-blue/30 hover:-translate-y-0.5 before:content-[""] before:absolute before:inset-x-6 before:bottom-0 before:h-[2px] before:rounded-full before:bg-gradient-to-r before:from-victus-blue/50 before:via-cyan-400/40 before:to-transparent before:opacity-100 after:content-[""] after:pointer-events-none after:absolute after:inset-x-10 after:bottom-0 after:h-10 after:rounded-full after:bg-victus-blue/20 after:blur-2xl'
                        : 'scale-95 border-text-secondary/10 bg-mica-dark/60 opacity-60 brightness-90 hover:opacity-80'
                    }`}
                  >
                    {/* Image Placeholder */}
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className={`mb-3 w-full flex-shrink-0 rounded-xl object-cover shadow-inner transition-all sm:mb-4 ${
                          isActive ? 'h-40 sm:h-48' : 'h-32 sm:h-36'
                        }`}
                      />
                    ) : (
                      <div className={`mb-3 w-full flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-victus-blue/10 to-victus-blue/20 shadow-inner transition-all sm:mb-4 ${
                        isActive ? 'h-40 sm:h-48' : 'h-32 sm:h-36'
                      }`} />
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
                              className="rounded-lg bg-victus-blue/10 px-2.5 py-1 text-xs font-medium text-victus-blue"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* View Project Link */}
                        <div className="mt-3 flex-shrink-0 border-t border-text-secondary/10 pt-2 sm:mt-4 sm:pt-3">
                          <span className="inline-flex items-center text-xs font-semibold text-victus-blue transition-colors hover:text-victus-blue/80">
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
                          </span>
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-victus-blue/30 bg-gradient-to-b from-mica-light via-mica-dark to-black p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="sticky right-6 top-6 z-10 ml-auto mb-4 flex rounded-full border border-text-secondary/30 bg-mica-light/80 p-2 text-text-secondary transition-all hover:border-victus-blue/60 hover:bg-victus-blue/10 hover:text-victus-blue"
              aria-label="Close modal"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="space-y-6 pr-2">
              {/* Header */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="inline-block rounded-full bg-victus-blue/10 px-3 py-1 text-xs font-medium text-victus-blue">
                    {projects[activeIndex].timeframe}
                  </span>
                  <span className="text-sm text-text-secondary">{projects[activeIndex].role}</span>
                </div>
                <h2 className="text-3xl font-bold text-white">{projects[activeIndex].title}</h2>
              </div>

              {/* Problem Section */}
              <div className="space-y-2 rounded-2xl border border-text-secondary/10 bg-mica-light/40 p-6">
                <h3 className="text-lg font-semibold text-victus-blue">Challenge</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{projects[activeIndex].problem}</p>
              </div>

              {/* Solution Section */}
              <div className="space-y-2 rounded-2xl border border-text-secondary/10 bg-mica-light/40 p-6">
                <h3 className="text-lg font-semibold text-victus-blue">Solution</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{projects[activeIndex].solution}</p>
              </div>

              {/* Results Section */}
              <div className="space-y-2 rounded-2xl border border-text-secondary/10 bg-mica-light/40 p-6">
                <h3 className="text-lg font-semibold text-victus-blue">Results</h3>
                <ul className="space-y-2">
                  {projects[activeIndex].results.map((result, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-victus-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-victus-blue">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {projects[activeIndex].stack.map((tech, i) => (
                    <span
                      key={i}
                      className="rounded-lg border border-victus-blue/20 bg-victus-blue/10 px-3 py-1.5 text-sm font-medium text-victus-blue"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 border-t border-text-secondary/10 pt-6">
                <a
                  href={projects[activeIndex].caseStudyUrl}
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-victus-blue to-victus-blue/80 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-victus-blue/30"
                >
                  View Project
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href={projects[activeIndex].sourceUrl}
                  className="inline-flex items-center gap-2 rounded-lg border border-victus-blue/30 bg-victus-blue/5 px-5 py-2.5 text-sm font-semibold text-victus-blue transition-all hover:bg-victus-blue/10"
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
