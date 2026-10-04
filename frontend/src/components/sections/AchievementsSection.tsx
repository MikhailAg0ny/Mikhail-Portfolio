"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { PointerEvent as ReactPointerEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Link as LinkIcon, Globe, Newspaper, Play, Trophy, MousePointerClick, Gamepad2 } from "lucide-react";

import { achievements } from "@/lib/achievements";
import { useSectionPadding, useBreakpoints } from "@/hooks/useBreakpoints";
import { cn } from "@/lib/utils";

import type { AchievementImage } from "@/types";

export default function AchievementsSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentAchievement = achievements[selectedIndex] ?? achievements[0];
  const images = currentAchievement?.images ?? [];
  const [heroImage, ...supportImages] = images;

  const { padding, minHeight } = useSectionPadding();
  const { isShort, isMobile } = useBreakpoints();
  const [hoveredImage, setHoveredImage] = useState<AchievementImage | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const hintTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showHoldHint, setShowHoldHint] = useState(true);
  const [canRenderPortal, setCanRenderPortal] = useState(false);

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

  const handleImageTap = useCallback((image: AchievementImage) => (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    event.preventDefault();
    hideHoldHint();
    setHoveredImage((current) => (current?.src === image.src ? null : image));
  }, [hideHoldHint]);

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
      hideHoldHint();
    },
    [hideHoldHint]
  );

  useEffect(() => {
    setCanRenderPortal(true);
  }, []);

  const renderLinkIcon = (icon?: "facebook" | "newspaper" | "globe" | "video" | "trophy" | "game" | "github") => {
    switch (icon) {
      case "facebook":
        return <LinkIcon className="h-4 w-4 text-victus-blue" strokeWidth={2.5} />;
      case "github":
        return (
          <svg className="h-4 w-4 text-victus-blue" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        );
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
      className={cn("flex w-full justify-center", padding)}
      style={{ minHeight }}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-10">
        <header className="space-y-2.5 text-left md:text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-victus-blue">
            Achievements
          </p>
          <h2 className="fluid-heading-section font-semibold text-text-primary">
            My Achievements
          </h2>
          <p className="mx-auto max-w-3xl text-sm text-text-secondary md:text-base">
            My recent milestones so far to participate in hackathons and events.
          </p>
        </header>

        {/* Dynamic Selector Tabs */}
        {achievements.length > 1 && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:mt-6 sm:gap-3">
            {achievements.map((item, index) => {
              const isSelected = selectedIndex === index;
              return (
                <button
                  key={item.id ?? item.title}
                  type="button"
                  onClick={() => {
                    setHoveredImage(null);
                    setSelectedIndex(index);
                  }}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-300 sm:px-5 sm:py-2 sm:text-sm cursor-pointer",
                    isSelected
                      ? "bg-gradient-to-r from-victus-blue to-cyan-400 text-white shadow-lg shadow-victus-blue/25 scale-105"
                      : "border border-text-secondary/20 bg-mica-light/40 text-text-secondary hover:border-victus-blue/40 hover:text-text-primary"
                  )}
                  aria-pressed={isSelected}
                >
                  <Trophy className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4", isSelected ? "text-white" : "text-victus-blue")} />
                  <span>{item.year} • {item.badge ?? item.title}</span>
                </button>
              );
            })}
          </div>
        )}

        {showHoldHint && (
          <div className="pointer-events-none mt-4 mb-2 flex justify-center sm:hidden">
            <div className="z-10 flex items-center justify-center gap-3 rounded-full border border-text-secondary/25 bg-mica-light/70 px-4 py-2 text-xs font-semibold text-text-primary shadow-lg shadow-victus-blue/20 backdrop-blur-xl">
              <MousePointerClick className="h-4 w-4 text-victus-blue" strokeWidth={2.2} />
              <span className="tracking-wide text-text-secondary/90">Tap to preview</span>
              <MousePointerClick className="h-4 w-4 text-victus-blue" strokeWidth={2.2} />
            </div>
          </div>
        )}

        {/* Achievement Card with Animated Transition */}
        <AnimatePresence mode="wait">
          <motion.article
            key={currentAchievement.id ?? currentAchievement.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative mx-auto mt-6 w-full overflow-hidden rounded-2xl border border-text-secondary/20 bg-mica-light/60 p-5 shadow-lg shadow-victus-blue/5 transition-colors hover:border-victus-blue/30 sm:mt-8 sm:p-7 md:mt-10 md:max-w-5xl"
          >
            <div className="flex flex-col gap-5 md:grid md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:gap-7">
              {/* Left: hero image with supporting thumbnails */}
              <div
                className="flex flex-col gap-3.5"
                onMouseLeave={() => setHoveredImage(null)}
              >
                {heroImage && (
                  <div
                    className="group relative h-44 overflow-hidden rounded-2xl sm:h-[200px] md:h-[320px]"
                    onMouseEnter={() => setHoveredImage(heroImage)}
                    onPointerDown={handleImageTap(heroImage)}
                    onPointerLeave={(event) => {
                      if (event.pointerType === "mouse") {
                        setHoveredImage((current) => (current?.src === heroImage.src ? null : current));
                      }
                    }}
                  >
                    <Image
                      src={heroImage.src}
                      alt={heroImage.alt}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 90vw, 45vw"
                      loading="lazy"
                      unoptimized
                    />
                  </div>
                )}

                {supportImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                    {supportImages.map((image) => (
                      <div
                        key={image.src}
                        className="group relative h-20 overflow-hidden rounded-xl sm:h-[80px] md:h-[100px]"
                        onMouseEnter={() => setHoveredImage(image)}
                        onPointerDown={handleImageTap(image)}
                        onPointerLeave={(event) => {
                          if (event.pointerType === "mouse") {
                            setHoveredImage((current) => (current?.src === image.src ? null : current));
                          }
                        }}
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
              <div className="flex flex-col gap-5 rounded-2xl border border-text-secondary/15 bg-mica-light/50 p-5 sm:p-6 md:h-full">
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-[0.65rem] uppercase tracking-[0.35em] text-text-secondary/60 sm:text-xs">{currentAchievement.year}</span>
                    <h3 className="text-xl font-semibold text-text-primary sm:text-2xl md:text-3xl">{currentAchievement.title}</h3>
                    <p className="text-xs font-medium text-victus-blue sm:text-sm">{currentAchievement.event}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-text-secondary sm:text-sm">{currentAchievement.highlight}</p>
                </div>

                {(() => {
                  const featuredLinks = currentAchievement.links ?? [];
                  if (featuredLinks.length === 0) return null;

                  return (
                    <div className="space-y-2.5">
                      <h4 className="text-[0.65rem] uppercase tracking-[0.35em] text-text-secondary/50 sm:text-xs">Featured coverage</h4>
                      <ul className="space-y-2">
                        {featuredLinks.map((link) => (
                          <li key={link.name}>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center gap-2.5 rounded-xl border border-text-secondary/10 bg-mica-light/40 px-3 py-2 text-xs text-text-secondary transition-colors hover:border-victus-blue/30 hover:text-text-primary sm:text-sm"
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
            </div>
          </motion.article>
        </AnimatePresence>
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
