"use client";

import { useCallback } from "react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useSectionPadding, useBreakpoints } from "@/hooks/useBreakpoints";
import { motion } from "framer-motion";
import type { FullPageApi } from "fullpage.js";
import clsx from "clsx";

export default function HeroSection() {
  const { padding, minHeight } = useSectionPadding();
  const { isShort } = useBreakpoints();

  const handleNavigate = useCallback((section: string) => {
    if (typeof window === "undefined") return;

    const targetSection = section.toLowerCase();
    const fullpage = (window as typeof window & { fullpage_api?: FullPageApi }).fullpage_api;

    if (fullpage && typeof fullpage.moveTo === "function") {
      fullpage.moveTo(targetSection);
      return;
    }

    const element = document.querySelector(`[data-section="${targetSection}"]`);
    if (element instanceof HTMLElement) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.hash = targetSection;
    }
  }, []);

  const nameText = "Mikhail James P. Navarro";
  const isAvailable = true; // Set to false to show "Busy" status

  return (
    <section
      className={clsx(
        "relative flex w-full items-center justify-center overflow-hidden",
        padding
      )}
      style={{ minHeight }}
    >
      {/* Floating Decorative Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Decorative Float Images */}

        {/* Far Left */}
        <div className="absolute left-[-4%] bottom-[15%] w-64 h-64 opacity-80 animate-float sm:w-40 sm:h-40 z-10">
          <ImageWithFallback src="/images/decorate-float/maxwell-cat.png" alt="" width={128} height={128} className="w-full h-full object-contain" />
        </div>

        {/* Top Left (Above Profile/Name gap) */}
        <div className="absolute left-[30%] top-[10%] w-14 h-14 opacity-80 animate-float-delay-1 sm:w-20 sm:h-20">
          <ImageWithFallback src="/images/decorate-float/shocked-cat.png" alt="" width={80} height={80} className="w-full h-full object-contain" />
        </div>

        {/* Top Right (Above Name) */}
        <div className="absolute right-[30%] top-[10%] w-16 h-16 opacity-80 animate-float sm:w-24 sm:h-24">
          <ImageWithFallback src="/images/decorate-float/bongo-cat-happy.png" alt="" width={96} height={96} className="w-full h-full object-contain" />
        </div>

        {/* Far Right */}
        <div className="absolute right-[5%] top-[50%] w-14 h-14 opacity-80 animate-float-delay-2 sm:w-20 sm:h-20">
          <ImageWithFallback src="/images/decorate-float/popcat-pop.png" alt="" width={80} height={80} className="w-full h-full object-contain" />
        </div>

        {/* Bottom Left (Below Profile) */}
        <div className="absolute left-[25%] bottom-[5%] w-14 h-14 opacity-80 animate-float-delay-1 sm:w-20 sm:h-20">
          <ImageWithFallback src="/images/decorate-float/grumpy-cat.png" alt="" width={80} height={80} className="w-full h-full object-contain" />
        </div>

        {/* Bottom Center (Below Buttons) */}
        <div className="absolute left-[60%] bottom-[2%] w-14 h-14 opacity-80 animate-float sm:w-20 sm:h-20">
          <ImageWithFallback src="/images/decorate-float/polite-cat.png" alt="" width={80} height={80} className="w-full h-full object-contain" />
        </div>
      </div>

      <div
        className={clsx(
          "relative mx-auto w-full max-w-6xl px-4 sm:px-8 lg:px-12 transition-transform duration-300 ease-out",
          isShort && "scale-90 origin-center"
        )}
      >
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          {/* Profile Image with Float Animation */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative animate-float-subtle">
              <div className="h-48 w-48 overflow-hidden rounded-full border-4 border-victus-blue shadow-2xl shadow-victus-blue/20 pulse-glow sm:h-64 sm:w-64 lg:h-80 lg:w-80">
                <ImageWithFallback
                  src="/images/profile_hd.png"
                  alt="Mikhail James P. Navarro"
                  width={320}
                  height={320}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="space-y-5 text-center mx-auto lg:mx-0 lg:max-w-xl lg:text-left">
            {/* Status Badge */}
            <div className="flex justify-center lg:justify-start">
              {isAvailable ? (
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 status-pulse" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  On Job Training
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 status-pulse" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                  </span>
                  Busy / Working on a Project
                </div>
              )}
            </div>

            <p className="text-xs uppercase tracking-[0.45em] text-victus-blue sm:text-sm">Hello There, I am</p>

            {/* Name with Typing Animation + Cursor */}
            <motion.h1
              className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl lg:text-6xl"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 1 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.06,
                  },
                },
              }}
            >
              {nameText.split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  {char}
                </motion.span>
              ))}
              {/* Blinking Cursor */}
              <motion.span
                className="inline-block w-[3px] h-[0.9em] bg-victus-blue ml-1 align-middle animate-blink"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: nameText.length * 0.06 + 0.3 }}
              />
            </motion.h1>

            <p className="text-lg font-semibold text-victus-blue sm:text-xl md:text-2xl gradient-text-animated">
              Full Stack Developer
            </p>
            <p className="max-w-xl text-sm text-text-secondary sm:text-base md:text-lg">
              Experience full stack over 3+ years. I create interactive and engaging web, game and mobile applications.
              Ensuring that the final product is both visually appealing and functional.
            </p>
            <Tooltip.Provider delayDuration={200} skipDelayDuration={400}>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start lg:gap-4">
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button
                      type="button"
                      onClick={() => handleNavigate("projects")}
                      className="btn-shine inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-victus-blue to-cyan-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-victus-blue/20 transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 sm:px-6 sm:py-3"
                    >
                      View My Work
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      sideOffset={10}
                      className="rounded-xl border border-victus-blue/30 bg-mica-dark/95 px-3 py-2 text-xs font-medium text-text-secondary shadow-lg backdrop-blur-xl"
                    >
                      Jump to highlighted projects
                      <Tooltip.Arrow className="fill-mica-dark/95" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>

                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button
                      type="button"
                      onClick={() => handleNavigate("contact")}
                      className="glass-card-hover inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:px-6 sm:py-3"
                    >
                      Get In Touch
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      sideOffset={10}
                      className="rounded-xl border border-victus-blue/30 bg-mica-dark/95 px-3 py-2 text-xs font-medium text-text-secondary shadow-lg backdrop-blur-xl"
                    >
                      Opens contact section with direct links
                      <Tooltip.Arrow className="fill-mica-dark/95" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </div>
            </Tooltip.Provider>
          </div>
        </div>
      </div>
    </section>
  );
}

