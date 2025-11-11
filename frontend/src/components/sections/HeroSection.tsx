"use client";

import { useCallback } from "react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useSectionPadding } from "@/hooks/useBreakpoints";
import type { FullPageApi } from "fullpage.js";

export default function HeroSection() {
  const { padding, minHeight } = useSectionPadding();
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

  return (
    <section
      className={`flex w-full items-center justify-center ${padding}`}
      style={{ minHeight }}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-8 lg:px-12">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="h-48 w-48 overflow-hidden rounded-full border-4 border-victus-blue shadow-2xl shadow-victus-blue/20 sm:h-64 sm:w-64 lg:h-80 lg:w-80">
                <ImageWithFallback
                  src="/images/profile.jpg"
                  alt="Mikhail James P. Navarro"
                  width={320}
                  height={320}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="space-y-5 text-center lg:max-w-xl lg:text-left">
            <p className="text-xs uppercase tracking-[0.45em] text-victus-blue sm:text-sm">Hello There, I am</p>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl lg:text-6xl">
              Mikhail James P. Navarro
            </h1>
            <p className="text-lg font-semibold text-victus-blue sm:text-xl md:text-2xl">
              Frontend Web Developer & AI Enthusiast
            </p>
            <p className="max-w-xl text-sm text-text-secondary sm:text-base md:text-lg">
              Crafting playful, human-centered digital experiences that merge game sensibilities with product delivery.
              I translate ideas into interactive stories, polished design systems, and measurable outcomes.
            </p>
            <Tooltip.Provider delayDuration={200} skipDelayDuration={400}>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start lg:gap-4">
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button
                      type="button"
                      onClick={() => handleNavigate("projects")}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-victus-blue to-cyan-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-victus-blue/20 transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 sm:px-6 sm:py-3"
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
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-105 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:px-6 sm:py-3"
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
