import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import SkillsSection from "@/components/sections/SkillsSection";
import FeaturedProjectsSection from "@/components/sections/FeaturedProjectsSection";

const principles = [
  "Start with narrative clarity",
  "Prototype quickly, iterate publicly",
  "Document decisions and measure impact",
];

export default function HomePage() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <Navbar />
      <HeroSection />
      <SkillsSection />
      <FeaturedProjectsSection />

      <section className="snap-start h-screen flex items-center justify-center px-6 sm:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4 self-center">
              <p className="text-sm uppercase tracking-[0.45em] text-teal-400">Approach</p>
              <h2 className="text-2xl font-semibold text-slate-100 md:text-3xl">
                Personal principles that guide every build
              </h2>
              <p className="text-sm text-slate-300 md:text-base">
                My portfolio is a living lab. I treat each experience like a narrative arc.
              </p>
            </div>
            <div className="grid gap-4 self-center">
              {principles.map((principle) => (
                <div
                  key={principle}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 px-5 py-4 text-sm text-slate-200"
                >
                  {principle}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
