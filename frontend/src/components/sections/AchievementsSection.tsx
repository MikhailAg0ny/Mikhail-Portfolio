import { achievements } from "@/lib/data";

export default function AchievementsSection() {
  return (
    <section className="h-full w-full bg-mica-light/30">
      <div className="h-full px-6 pb-16 pt-28 sm:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <header className="space-y-6">
            <p className="text-sm uppercase tracking-[0.45em] text-victus-blue">Achievements</p>
            <h2 className="text-3xl font-semibold text-text-primary md:text-4xl">
              Recognitions that capture impact and craft.
            </h2>
            <p className="text-base text-text-secondary md:text-lg">
              Milestones across game jams, community events, and product teams that highlight leadership, experimentation, and
              measurable outcomes.
            </p>
          </header>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <article
                key={achievement.title}
                className="group rounded-3xl border border-text-secondary/20 bg-mica-light/60 p-6 transition-all hover:border-transparent hover:shadow-lg hover:shadow-victus-blue/10"
                style={{
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderImage = 'linear-gradient(to right, #1A1D21, #2A2F35, #1A1D21) 1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderImage = '';
                }}
              >
                <div className="flex flex-col gap-2">
                  <p className="text-xs uppercase tracking-[0.35em] text-text-secondary/60">{achievement.year}</p>
                  <h3 className="text-2xl font-semibold text-text-primary">{achievement.title}</h3>
                  <p className="text-sm text-victus-blue">{achievement.event}</p>
                  <p className="text-sm text-text-secondary">{achievement.highlight}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
