import { achievements } from "@/lib/achievements";

const collageImages = [
  // Feature photo covering the main recognition moment
  {
    src: "/Pictures/PROMPTQUEST_AI_HACKATHON_2025/Proweaver AI HACKATHON CHAMPION.jpg",
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

  return (
    <section className="flex w-full justify-center py-16 sm:py-20">
      <div className="w-full max-w-6xl px-6 sm:px-10">
        {/* Single achievement card constrained to 720x720 on desktop */}
        <article className="mx-auto rounded-2xl border border-text-secondary/20 bg-mica-light/60 p-8 shadow-lg shadow-victus-blue/5 transition-colors hover:border-victus-blue/30 md:h-[720px] md:w-[1000px]">
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
            <div className="flex flex-col gap-4">
              {heroImage && (
                <div className="group overflow-hidden rounded-2xl sm:h-[220px] md:h-[360px]">
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
                    <div key={image.src} className="group overflow-hidden rounded-xl sm:h-[90px] md:h-[110px]">
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
              <div className="flex flex-col justify-between gap-6 rounded-2xl border border-text-secondary/15 bg-mica-light/50 p-6 md:h-full">
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-[0.35em] text-text-secondary/60">{primaryAchievement.year}</span>
                    <h3 className="text-2xl font-semibold text-text-primary md:text-3xl">{primaryAchievement.title}</h3>
                    <p className="text-sm font-medium text-victus-blue">{primaryAchievement.event}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-text-secondary">{primaryAchievement.highlight}</p>
                </div>

                <div className="space-y-2 text-xs text-text-secondary/70">
                  <p>Role: Lead Developer & Designer</p>
                  <p>Focus: Rapid prototyping, narrative design, team orchestration</p>
                  <p>Outcome: Delivered playable demo with award-winning presentation</p>
                </div>
              </div>
            )}
          </div>
        </article>
      </div>

    </section>
  );
}
