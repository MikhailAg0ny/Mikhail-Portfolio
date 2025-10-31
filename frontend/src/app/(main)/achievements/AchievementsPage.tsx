const achievements = [
  {
    title: "Game Jam Grand Winner",
    event: "PromptQuest Hackathon",
    year: "2025",
    highlight:
      "Designed and programmed an AI-assisted puzzle game in 72 hours, earning top marks for storytelling and technical execution.",
  },
  {
    title: "UXPH Spotlight Speaker",
    event: "UXPH Conference",
    year: "2024",
    highlight:
      "Presented a live case study on aligning player empathy with design systems for cross-platform experiences.",
  },
  {
    title: "Design System Accelerator",
    event: "Internal Agency Award",
    year: "2023",
    highlight:
      "Led a cross-functional initiative that reduced component delivery time by 40% and improved accessibility scores across products.",
  },
];

function AchievementsPage() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-4xl px-6 py-16 sm:px-10">
      <header className="space-y-6">
        <p className="text-sm uppercase tracking-[0.45em] text-teal-500">Achievements</p>
        <h1 className="text-3xl font-semibold text-slate-100 md:text-4xl">
          Recognitions that capture impact and craft.
        </h1>
        <p className="text-base text-slate-300 md:text-lg">
          Milestones across game jams, community events, and product teams that highlight leadership, experimentation, and measurable outcomes.
        </p>
      </header>

      <section className="mt-12 space-y-6">
        {achievements.map((achievement) => (
          <article
            key={achievement.title}
            className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6"
          >
            <div className="flex flex-col gap-2">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{achievement.year}</p>
              <h2 className="text-2xl font-semibold text-slate-100">{achievement.title}</h2>
              <p className="text-sm text-teal-300">{achievement.event}</p>
              <p className="text-sm text-slate-300">{achievement.highlight}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default AchievementsPage;
