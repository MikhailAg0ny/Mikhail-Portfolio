"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link as LinkIcon, Globe, Newspaper, Play, Trophy } from "lucide-react";

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

  const renderLinkIcon = (icon?: "facebook" | "newspaper" | "globe" | "video" | "trophy") => {
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
      default:
        return <LinkIcon className="h-4 w-4 text-victus-blue" strokeWidth={2.5} />;
    }
  };

  return (
    <section
      className={`flex w-full justify-center ${padding}`}
      style={{ minHeight }}
    >
      <div className="w-full max-w-6xl px-6 sm:px-10">
        {/* Single achievement card constrained to 720x720 on desktop */}
        <article className="relative mx-auto rounded-2xl border border-text-secondary/20 bg-mica-light/60 p-8 shadow-lg shadow-victus-blue/5 transition-colors hover:border-victus-blue/30 md:w-[1000px]">
          <header className="space-y-3 text-left md:text-center">
            <p className="text-sm uppercase tracking-[0.45em] text-victus-blue">Achievements</p>
            <h2 className="text-3xl font-semibold text-text-primary md:text-4xl">Recognitions that capture impact and craft.</h2>
            <p className="text-base text-text-secondary md:text-lg">
              Milestones across game jams, community events, and product teams that highlight leadership, experimentation, and measurable
              outcomes.
            </p>
          </header>

          <div className="mt-10 flex flex-col gap-6 md:grid md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:gap-8">
            {/* Left: hero image with supporting thumbnails */}
            <div
              className="flex flex-col gap-4"
              onMouseLeave={() => setHoveredImage(null)}
            >
              {heroImage && (
                <div
                  className="group overflow-hidden rounded-2xl sm:h-[200px] md:h-[320px]"
                  onMouseEnter={() => setHoveredImage(heroImage)}
                >
                  <img
                    src={heroImage.src}
                    alt={heroImage.alt}
                    className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              )}

              {supportImages.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {supportImages.map((image) => (
                    <div
                      key={image.src}
                      className="group overflow-hidden rounded-xl sm:h-[80px] md:h-[100px]"
                      onMouseEnter={() => setHoveredImage(image)}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
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

                {primaryAchievement.links && primaryAchievement.links.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase tracking-[0.35em] text-text-secondary/50">Featured coverage</h4>
                    <ul className="space-y-2">
                      {primaryAchievement.links.map((link) => (
                        <li key={link.url}>
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
                )}
              </div>
            )}
          </div>
          <AnimatePresence>
            {hoveredImage && (
              <motion.div
                key={hoveredImage.src}
                className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-black/60 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <motion.div
                  className="pointer-events-none max-h-[80vh] max-w-[85%] overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
                  initial={{ scale: 0.95, opacity: 0.9 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0.9 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <img
                    src={hoveredImage.src}
                    alt={hoveredImage.alt}
                    className="block h-full w-full object-cover"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </article>
      </div>

    </section>
  );
}
