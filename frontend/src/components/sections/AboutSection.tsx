'use client';

import { ReactNode, useState } from "react";

import ImageWithFallback from "@/components/ui/ImageWithFallback";
import * as Popover from "@radix-ui/react-popover";
import { AnimatePresence, motion } from "framer-motion";
import { useSectionPadding } from "@/hooks/useBreakpoints";

export default function AboutSection() {
  const { padding, minHeight } = useSectionPadding();
  const [showPreview, setShowPreview] = useState(false);

  const profileImage = {
    src: "/images/jesus_christ_is_king.jpeg",
    alt: "Portrait of Mikhail standing beside text declaring Jesus Christ is King",
    width: 320,
    height: 384,
  };

  const popovers: LearnMorePopoverProps[] = [
    {
      id: "who",
      heading: "Who I Am",
      summary:
        "Brief introduction about yourself. Share your passion, what drives you, and what makes you unique as a developer.",
      content: (
        <>
          <h4 className="mb-2 text-base font-semibold text-text-primary">Crafted storyteller</h4>
          <p>
            I combine game design instincts with product thinking to turn ambiguous ideas into interactive narratives.
            Every project starts with empathy, playtesting, and clear success metrics so the end result feels intuitive and delightful.
          </p>
        </>
      ),
    },
    {
      id: "what",
      heading: "What I Do",
      summary:
        "Describe your expertise, specializations, and the kind of work you love doing. Highlight your key skills and interests.",
      content: (
        <>
          <h4 className="mb-2 text-base font-semibold text-text-primary">Designing joyful systems</h4>
          <ul className="list-disc space-y-1 pl-4">
            <li>UX audits and rapid prototyping for responsive web apps.</li>
            <li>Component libraries that bridge marketing sites and in-game UI.</li>
            <li>Automation pipelines that keep delivery fast and measurable.</li>
          </ul>
        </>
      ),
    },
    {
      id: "beyond",
      heading: "Beyond Code",
      summary:
        "Share your hobbies, interests outside of programming, or what you do in your free time. Make it personal and engaging.",
      content: (
        <>
          <h4 className="mb-2 text-base font-semibold text-text-primary">Fuel outside the IDE</h4>
          <p>
            When I’m not shipping features you’ll find me prototyping indie games, mentoring aspiring devs, or composing synthwave soundtracks for upcoming projects.
            These creative breaks keep my product instincts sharp.
          </p>
        </>
      ),
    },
  ];

  return (
    <section
      className={`flex w-full items-center justify-center ${padding}`}
      style={{ minHeight }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col justify-center px-4 sm:px-10">
        <header className="mb-12 space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.45em] text-victus-blue">Get to know me</p>
          <h2 className="text-3xl font-semibold text-text-primary md:text-4xl">About Me</h2>
        </header>

        <div className="flex h-full w-full max-w-6xl flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-12">
          {/* Left Side - Profile Card */}
          <div className="hidden w-full max-w-md flex-col lg:flex">
            <div className="relative flex h-full flex-col gap-6 rounded-3xl border border-text-secondary/20 bg-mica-light/60 p-8 shadow-lg shadow-victus-blue/10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
                <div className="space-y-4 lg:flex-[0.7]">
                  <h3 className="text-2xl font-semibold text-text-primary">Mikhail</h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    A passionate developer with a love for creating innovative solutions and exploring new technologies.
                    Focused on building scalable applications and delivering exceptional user experiences.
                  </p>
                </div>

                <div
                  className="mx-auto flex h-72 w-64 flex-shrink-0 items-center justify-center rounded-[36px] cursor-zoom-in lg:flex-[0.7] lg:max-w-[15rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-victus-blue/60"
                  onMouseEnter={() => setShowPreview(true)}
                  onMouseLeave={() => setShowPreview(false)}
                  onFocus={() => setShowPreview(true)}
                  onBlur={() => setShowPreview(false)}
                  onTouchStart={() => setShowPreview(true)}
                  onTouchEnd={() => setShowPreview(false)}
                  onTouchCancel={() => setShowPreview(false)}
                  role="button"
                  tabIndex={0}
                  aria-label="Preview profile portrait"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-[0_0_35px_rgba(33,150,243,0.35)]">
                    <ImageWithFallback
                      src={profileImage.src}
                      alt={profileImage.alt}
                      width={profileImage.width}
                      height={profileImage.height}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-t border-text-secondary/20 pt-6">
                <p className="text-xs uppercase tracking-[0.2em] text-victus-blue">Interests</p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-victus-blue/30 bg-mica-dark/40 px-3 py-1 text-xs text-victus-blue">Game Development</span>
                  <span className="rounded-full border border-victus-blue/30 bg-mica-dark/40 px-3 py-1 text-xs text-victus-blue">Mobile Development</span>
                  <span className="rounded-full border border-victus-blue/30 bg-mica-dark/40 px-3 py-1 text-xs text-victus-blue">Frontend Web Development</span>
                  <span className="rounded-full border border-victus-blue/30 bg-mica-dark/40 px-3 py-1 text-xs text-victus-blue">UI/UX Design</span>
                </div>
              </div>

              <AnimatePresence>
                {showPreview && (
                  <motion.div
                    className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center rounded-3xl bg-black/60 backdrop-blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <motion.div
                      className="pointer-events-none max-h-[85%] max-w-[85%] overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
                      initial={{ scale: 0.94, opacity: 0.95 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.94, opacity: 0.95 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <ImageWithFallback
                        src={profileImage.src}
                        alt={profileImage.alt}
                        width={profileImage.width}
                        height={profileImage.height}
                        className="h-full w-full object-cover"
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        {/* Right Side - Content Sections */}
        <div className="flex h-full w-full flex-col justify-center gap-5 lg:justify-between">
          {popovers.map((item) => (
            <LearnMorePopover key={item.id} {...item} />
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}

type LearnMorePopoverProps = {
  id: string;
  heading: string;
  summary: string;
  content: ReactNode;
};

function LearnMorePopover({ heading, summary, content }: LearnMorePopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <motion.button
          type="button"
          className="group w-full rounded-2xl border border-text-secondary/20 bg-mica-light/60 p-6 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-victus-blue/60"
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          animate={{ borderColor: open ? "rgba(33, 150, 243, 0.3)" : "rgba(148, 163, 184, 0.2)" }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        >
          <h3 className="mb-3 text-lg font-semibold text-victus-blue">{heading}</h3>
          <p className="text-sm leading-relaxed text-text-secondary">{summary}</p>
          <motion.span
            className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-victus-blue/70"
            animate={{ opacity: open ? 1 : 0.85 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            Learn more
            <motion.svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-3 w-3"
              animate={{ rotate: open ? 90 : 0, x: open ? 2 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </motion.svg>
          </motion.span>
        </motion.button>
      </Popover.Trigger>
      <AnimatePresence>
        {open && (
          <Popover.Portal forceMount>
            <Popover.Content sideOffset={12} align="start" asChild>
              <motion.div
                className="z-[90] w-[min(420px,90vw)] rounded-3xl border border-victus-blue/25 bg-mica-dark/95 p-5 text-sm leading-relaxed text-text-secondary shadow-2xl backdrop-blur-xl focus:outline-none"
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {content}
                <Popover.Arrow className="fill-mica-dark/95" />
              </motion.div>
            </Popover.Content>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  );
}
