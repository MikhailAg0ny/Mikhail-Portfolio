import { achievements } from "@/lib/data";

export default function AchievementsSection() {
  return (
    <section className="h-full w-full bg-slate-950/50">
      <div className="h-full px-6 pb-16 pt-28 sm:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <header className="space-y-6">
            <p className="text-sm uppercase tracking-[0.45em] text-teal-500">Achievements</p>
            <h2 className="text-3xl font-semibold text-slate-100 md:text-4xl">
              Recognitions that capture impact and craft.
            </h2>
            <p className="text-base text-slate-300 md:text-lg">
              Milestones across game jams, community events, and product teams that highlight leadership, experimentation, and
              measurable outcomes.
            </p>
          </header>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <article
                key={achievement.title}
                className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6"
              >
                <div className="flex flex-col gap-2">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{achievement.year}</p>
                  <h3 className="text-2xl font-semibold text-slate-100">{achievement.title}</h3>
                  <p className="text-sm text-teal-300">{achievement.event}</p>
                  <p className="text-sm text-slate-300">{achievement.highlight}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
