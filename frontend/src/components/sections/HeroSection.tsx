"use client";

import ImageWithFallback from "@/components/ui/ImageWithFallback";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useSectionPadding } from "@/hooks/useBreakpoints";

export default function HeroSection() {
  const { padding, minHeight } = useSectionPadding();

  return (
    <section
      className={`flex w-full items-center justify-center ${padding}`}
      style={{ minHeight }}
    >
      <div className="w-full max-w-6xl px-6 sm:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="h-64 w-64 overflow-hidden rounded-full border-4 border-victus-blue shadow-2xl shadow-victus-blue/20 sm:h-80 sm:w-80">
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

          <div className="space-y-6 text-center lg:text-left">
            <p className="text-sm uppercase tracking-[0.45em] text-victus-blue">Hello There, I am</p>
            <h1 className="text-4xl font-bold tracking-tight text-text-primary md:text-6xl">
              Mikhail James P. Navarro
            </h1>
            <p className="text-xl font-semibold text-victus-blue md:text-2xl">
              Web Developer & AI Enthusiast
            </p>
            <p className="max-w-xl text-base text-text-secondary md:text-lg">
              Crafting playful, human-centered digital experiences that merge game sensibilities with product delivery.
              I translate ideas into interactive stories, polished design systems, and measurable outcomes.
            </p>
            <Tooltip.Provider delayDuration={200} skipDelayDuration={400}>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <a
                      className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-victus-blue to-victus-blue/80 px-6 py-3 text-sm font-medium text-mica-dark transition-all hover:shadow-lg hover:shadow-victus-blue/30"
                      href="#projects"
                    >
                      View My Work
                    </a>
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
                    <a
                      className="inline-flex items-center justify-center rounded-full border border-text-secondary/30 px-6 py-3 text-sm font-medium text-text-primary transition-all hover:border-victus-blue hover:text-victus-blue"
                      href="#contact"
                    >
                      Get In Touch
                    </a>
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
