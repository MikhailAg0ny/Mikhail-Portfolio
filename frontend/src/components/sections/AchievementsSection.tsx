"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { PointerEvent as ReactPointerEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Link as LinkIcon, Globe, Newspaper, Play, Trophy, MousePointerClick, Gamepad2 } from "lucide-react";

import { achievements } from "@/lib/achievements";
import { useSectionPadding } from "@/hooks/useBreakpoints";

const collageImages = [
  // Feature photo covering the main recognition moment
  {
    src: "/Pictures/PROMPTQUEST_AI_HACKATHON_2025/Proweaver%20AI%20HACKATHON%20CHAMPION.jpg",
    alt: "PromptQuest Hackathon champion team photo",
  },
  // Supporting snapshot highlighting collaborative effort
  {
    src: "/Pictures/PROMPTQUEST_AI_HACKATHON_2025/proweaver_champion_1.jpg",
    alt: "Showcasing the winning project",
  },
  // Supporting snapshot capturing presentation energy
  {
    src: "/Pictures/PROMPTQUEST_AI_HACKATHON_2025/proweaver_champion_2.jpg",
    alt: "On-stage presentation",
  },
  // Supporting snapshot from the awards portion
  {
    src: "/Pictures/PROMPTQUEST_AI_HACKATHON_2025/proweaver_champion_3.jpg",
    alt: "Awarding ceremony",
  },
];

export default function AchievementsSection() {
  const [heroImage, ...supportImages] = collageImages;
  const primaryAchievement = achievements[0];
  const { padding, minHeight } = useSectionPadding();
  const [hoveredImage, setHoveredImage] = useState<(typeof collageImages)[number] | null>(null);
  const holdTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const hintTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showHoldHint, setShowHoldHint] = useState(true);
  const [canRenderPortal, setCanRenderPortal] = useState(false);

  const clearTouchHold = () => {
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
  };

  const hideHoldHint = useCallback(() => {
    if (hintTimeoutRef.current) {
      clearTimeout(hintTimeoutRef.current);
      hintTimeoutRef.current = null;
    }
    setShowHoldHint(false);
  }, []);

  const triggerHoldHint = useCallback(() => {
    hideHoldHint();
    setShowHoldHint(true);
    hintTimeoutRef.current = setTimeout(() => {
      setShowHoldHint(false);
      hintTimeoutRef.current = null;
    }, 4000);
  }, [hideHoldHint]);

  const startTouchHold = (image: (typeof collageImages)[number]) => (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    clearTouchHold();
    hideHoldHint();
    holdTimeoutRef.current = setTimeout(() => {
      setHoveredImage(image);
    }, 250);
  };

  const endTouchHold = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    clearTouchHold();
    setHoveredImage(null);
  };

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerHoldHint();
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(sectionEl);

    return () => {
      observer.disconnect();
    };
  }, [triggerHoldHint]);

  useEffect(
    () => () => {
      clearTouchHold();
      hideHoldHint();
    },
    [hideHoldHint]
  );

  useEffect(() => {
    setCanRenderPortal(true);
  }, []);

  const renderLinkIcon = (icon?: "facebook" | "newspaper" | "globe" | "video" | "trophy" | "game") => {
    switch (icon) {
      case "facebook":
        return <LinkIcon className="h-4 w-4 text-victus-blue" strokeWidth={2.5} />;
      case "newspaper":
        return <Newspaper className="h-4 w-4 text-victus-blue" strokeWidth={2.5} />;
      case "globe":
        return <Globe className="h-4 w-4 text-victus-blue" strokeWidth={2.5} />;
      case "video":
        return <Play className="h-4 w-4 text-victus-blue" strokeWidth={2.5} />;
      case "trophy":
        return <Trophy className="h-4 w-4 text-victus-blue" strokeWidth={2.5} />;
      case "game":
        return <Gamepad2 className="h-4 w-4 text-victus-blue" strokeWidth={2.5} />;
      default:
        return <LinkIcon className="h-4 w-4 text-victus-blue" strokeWidth={2.5} />;
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`flex w-full justify-center ${padding}`}
      style={{ minHeight }}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-10">
        <header className="space-y-3 text-left md:text-center">
          <p className="text-sm uppercase tracking-[0.45em] text-victus-blue">Achievements</p>
          <h2 className="text-3xl font-semibold text-text-primary md:text-4xl">Recognitions that capture impact and craft.</h2>
          <p className="text-base text-text-secondary md:text-lg">
            Milestones across game jams, community events, and product teams that highlight leadership, experimentation, and measurable
            outcomes.
          </p>
        </header>

        {/* Single achievement card constrained to 720x720 on desktop */}
        <article className="relative mx-auto mt-8 w-full overflow-hidden rounded-2xl border border-text-secondary/20 bg-mica-light/60 p-6 shadow-lg shadow-victus-blue/5 transition-colors hover:border-victus-blue/30 sm:p-8 md:mt-12 md:max-w-5xl">
          <div className="flex flex-col gap-6 md:grid md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:gap-8">
            {/* Left: hero image with supporting thumbnails */}
            <div
              className="flex flex-col gap-4"
              onMouseLeave={() => setHoveredImage(null)}
            >
              {heroImage && (
                <div
                  className="group relative overflow-hidden rounded-2xl sm:h-[200px] md:h-[320px]"
                  onMouseEnter={() => setHoveredImage(heroImage)}
                  onPointerDown={startTouchHold(heroImage)}
                  onPointerUp={endTouchHold}
                  onPointerLeave={endTouchHold}
                  onPointerCancel={endTouchHold}
                >
                  <Image
                    src={heroImage.src}
                    alt={heroImage.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 90vw, 45vw"
                    loading="lazy"
                    unoptimized
                  />
                </div>
              )}

              {showHoldHint && (
                <div className="pointer-events-none sm:hidden">
                  <div className="flex items-center justify-center gap-3 rounded-full border border-text-secondary/25 bg-mica-light/60 px-4 py-2 text-xs font-semibold text-text-primary shadow-lg shadow-victus-blue/20 backdrop-blur-xl animate-pulse">
                    <MousePointerClick className="h-4 w-4 text-victus-blue" strokeWidth={2.2} />
                    <span className="tracking-wide text-text-secondary/90">Press & hold to preview</span>
                    <MousePointerClick className="h-4 w-4 text-victus-blue" strokeWidth={2.2} />
                  </div>
                </div>
              )}

              {supportImages.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {supportImages.map((image) => (
                    <div
                      key={image.src}
                      className="group relative overflow-hidden rounded-xl sm:h-[80px] md:h-[100px]"
                      onMouseEnter={() => setHoveredImage(image)}
                      onPointerDown={startTouchHold(image)}
                      onPointerUp={endTouchHold}
                      onPointerLeave={endTouchHold}
                      onPointerCancel={endTouchHold}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 28vw, 20vw"
                        loading="lazy"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: achievement copy and metadata */}
            {primaryAchievement && (
              <div className="flex flex-col gap-6 rounded-2xl border border-text-secondary/15 bg-mica-light/50 p-6 md:h-full">
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-[0.35em] text-text-secondary/60">{primaryAchievement.year}</span>
                    <h3 className="text-2xl font-semibold text-text-primary md:text-3xl">{primaryAchievement.title}</h3>
                    <p className="text-sm font-medium text-victus-blue">{primaryAchievement.event}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-text-secondary">{primaryAchievement.highlight}</p>
                </div>

                {(() => {
                  const featuredLinks = primaryAchievement.links ?? [];
                  if (featuredLinks.length === 0) return null;

                  return (
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase tracking-[0.35em] text-text-secondary/50">Featured coverage</h4>
                    <ul className="space-y-2">
                      {featuredLinks.map((link) => (
                        <li key={link.name}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 rounded-xl border border-text-secondary/10 bg-mica-light/40 px-3 py-2 text-sm text-text-secondary transition-colors hover:border-victus-blue/30 hover:text-text-primary"
                          >
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-victus-blue/10 text-victus-blue transition-colors group-hover:bg-victus-blue/20 group-hover:text-victus-blue">
                              {renderLinkIcon(link.icon)}
                            </span>
                            <span className="font-medium text-text-primary transition-colors group-hover:text-victus-blue">{link.name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  );
                })()}
              </div>
            )}
          </div>
        </article>
      </div>

      {canRenderPortal &&
        createPortal(
          <AnimatePresence>
            {hoveredImage && (
              <motion.div
                key={hoveredImage.src}
                className="pointer-events-none fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-[6px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <motion.div
                  className="pointer-events-none relative mx-4 w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 shadow-2xl aspect-[4/3]"
                  style={{ maxHeight: "90vh" }}
                  initial={{ scale: 0.95, opacity: 0.9 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0.9 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <Image
                    src={hoveredImage.src}
                    alt={hoveredImage.alt}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                    unoptimized
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
