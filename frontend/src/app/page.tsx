"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ContactSection from "@/components/sections/ContactSection";
import PagePilingWrapper from "@/components/layout/PagePilingWrapper";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sections = [
    { anchor: "hero", component: <HeroSection /> },
    { anchor: "about", component: <AboutSection /> },
    { anchor: "skills", component: <SkillsSection /> },
    { anchor: "projects", component: <ProjectsSection /> },
    { anchor: "achievements", component: <AchievementsSection /> },
    { anchor: "certifications", component: <CertificationsSection /> },
    { anchor: "contact", component: <ContactSection /> },
  ];

  const handleSectionChange = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const hash = window.location.hash.replace("#", "") || "hero";
    const sectionIndex = sections.findIndex((s) => s.anchor === hash);
    if (sectionIndex !== -1) {
      setActiveIndex(sectionIndex);
    }
  }, []);

  return (
    <>
      <Navbar activeSection={sections[activeIndex].anchor} />
      <PagePilingWrapper onSectionChange={handleSectionChange}>
        {sections.map((section) => (
          <div key={section.anchor}>
            {section.component}
          </div>
        ))}
      </PagePilingWrapper>
      <Footer />
    </>
  );
}
