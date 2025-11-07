"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { FiArrowUpRight } from "react-icons/fi";
import { useSectionPadding } from "@/hooks/useBreakpoints";

const FACEBOOK_URL = process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/M1kh4ilAg0ny';
const EMAIL_ADDRESS = process.env.NEXT_PUBLIC_EMAIL || 'mikhailjpn@gmail.com';

export default function ContactSection() {
  const { padding, minHeight } = useSectionPadding();

  return (
    <section
      className={`flex w-full items-center justify-center overflow-hidden ${padding}`}
      style={{ minHeight }}
    >
      <div className="flex w-full max-w-6xl flex-col items-center justify-center gap-8 px-4 sm:gap-8 sm:px-10">
        <div className="max-w-3xl space-y-3 text-center sm:space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-victus-blue/80 sm:text-sm">Get In Touch</p>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
            Let's Work Together
          </h2>
          <p className="text-sm leading-relaxed text-text-secondary/80 sm:text-base md:text-lg">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </div>

        <Tooltip.Provider delayDuration={150} skipDelayDuration={400}>
          <div className="flex w-full justify-center">
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-victus-blue to-cyan-400 px-6 py-3 text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-victus-blue/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 sm:px-8 sm:py-4 sm:text-base"
                >
                  Send Me An Email
                  <FiArrowUpRight className="h-4 w-4" />
                </a>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  sideOffset={8}
                  className="rounded-lg border border-victus-blue/30 bg-mica-dark/95 px-3 py-1.5 text-xs font-medium text-text-secondary shadow-xl backdrop-blur-lg"
                >
                  Opens your mail client with a pre-addressed message
                  <Tooltip.Arrow className="fill-mica-dark/95" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>

          </div>
        </Tooltip.Provider>

        <div className="mt-8 w-full max-w-3xl border-t border-text-secondary/10 pt-8">
          <Tooltip.Provider delayDuration={0} skipDelayDuration={400}>
            <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-victus-blue sm:text-sm">Email</p>
                    <p className="break-all text-xs text-text-secondary/80 sm:text-sm">{EMAIL_ADDRESS}</p>
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    sideOffset={6}
                    className="rounded-lg border border-victus-blue/30 bg-mica-dark/95 px-3 py-1 text-[11px] font-medium text-text-secondary shadow-lg backdrop-blur-md"
                  >
                    Tap to copy or email me directly
                    <Tooltip.Arrow className="fill-mica-dark/95" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>

              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-victus-blue sm:text-sm">Phone</p>
                    <p className="text-xs text-text-secondary/80 sm:text-sm">0927 720 4496</p>
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    sideOffset={6}
                    className="rounded-lg border border-victus-blue/30 bg-mica-dark/95 px-3 py-1 text-[11px] font-medium text-text-secondary shadow-lg backdrop-blur-md"
                  >
                    Available for quick calls or SMS follow-ups
                    <Tooltip.Arrow className="fill-mica-dark/95" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>

              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-victus-blue sm:text-sm">Location</p>
                    <p className="text-xs text-text-secondary/80 sm:text-sm">Philippines</p>
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    sideOffset={6}
                    className="rounded-lg border border-victus-blue/30 bg-mica-dark/95 px-3 py-1 text-[11px] font-medium text-text-secondary shadow-lg backdrop-blur-md"
                  >
                    Operating on GMT+8 — happy to sync across time zones
                    <Tooltip.Arrow className="fill-mica-dark/95" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </div>
          </Tooltip.Provider>
        </div>
      </div>
    </section>
  );
}
