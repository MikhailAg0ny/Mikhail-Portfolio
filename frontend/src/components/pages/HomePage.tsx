"use client";

import { useEffect, useCallback, type ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import SectionRail from "@/components/layout/SectionRail";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import { SECTION_ORDER, type SectionKey } from "@/lib/sections";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

type HomePageProps = {
  initialSection?: SectionKey;
};

const SECTION_COMPONENTS: Record<SectionKey, ReactNode> = {
  hero: <HeroSection />,
  about: <AboutSection />,
  skills: <SkillsSection />,
  projects: <ProjectsSection />,
  achievements: <AchievementsSection />,
  certifications: <CertificationsSection />,
  contact: <ContactSection />,
};

export default function HomePage({ initialSection = "hero" }: HomePageProps) {
  const activeSection = useActiveSection(initialSection);

  const handleNavigate = useCallback((section: string) => {
    if (!SECTION_ORDER.includes(section as SectionKey)) return;
    const targetElement = document.getElementById(section);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Handle initial deep-linking if navigated to with a specific section
  useEffect(() => {
    if (initialSection && initialSection !== "hero") {
      const timer = setTimeout(() => {
        handleNavigate(initialSection);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [initialSection, handleNavigate]);

  return (
    <>
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
      <SectionRail activeSection={activeSection} onNavigate={handleNavigate} />

      <main className="relative flex flex-col w-full overflow-x-hidden no-scrollbar">
        {SECTION_ORDER.map((anchor) => (
          <section
            key={anchor}
            id={anchor}
            data-section={anchor}
            className={cn(
              "relative w-full snap-start flex flex-col items-center",
              anchor === "contact"
                ? "min-h-[100svh] justify-between"
                : "min-h-[100svh] justify-center"
            )}
          >
            {SECTION_COMPONENTS[anchor]}
            {anchor === "contact" && <Footer />}
          </section>
        ))}
      </main>
    </>
  );
}
