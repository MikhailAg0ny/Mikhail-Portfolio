'use client';

import { useEffect, useState, useCallback, useRef, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';
import { SECTION_ORDER, type SectionKey } from '@/lib/sections';

type PagePilingWrapperProps = {
  children: ReactNode;
  onSectionChange: (index: number) => void;
  initialAnchor?: string;
  enableAtWidth?: number;
  onModeChange?: (isPagePilingActive: boolean) => void;
};

const PagePilingWrapper = dynamic<PagePilingWrapperProps>(() => import('@/components/layout/PagePilingWrapper'), {
  ssr: false,
});

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

export default function HomePage({ initialSection = 'hero' }: HomePageProps) {
  const [activeIndex, setActiveIndex] = useState(() => {
    const initialIndex = SECTION_ORDER.indexOf(initialSection);
    return initialIndex >= 0 ? initialIndex : 0;
  });
  const [isPagePilingActive, setIsPagePilingActive] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const currentIndex = SECTION_ORDER.indexOf(initialSection);
    if (currentIndex >= 0) {
      setActiveIndex(currentIndex);
    }
  }, [initialSection]);

  const handleSectionChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    if (isPagePilingActive) {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          const section = visibleEntry.target.getAttribute('data-section');
          if (section && SECTION_ORDER.includes(section as SectionKey)) {
            setActiveIndex(SECTION_ORDER.indexOf(section as SectionKey));
          }
        }
      },
      {
        root: null,
        threshold: [0.25, 0.5, 0.75],
      }
    );

    const sectionElements = document.querySelectorAll('[data-section]');
    sectionElements.forEach((el) => observer.observe(el));
    observerRef.current = observer;

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [isPagePilingActive]);

  const handleNavigate = useCallback((section: string) => {
    if (!SECTION_ORDER.includes(section as SectionKey)) return;
    const typedSection = section as SectionKey;
    const instance = (window as any)?.fullpage_api;
    if (isPagePilingActive && instance && typeof instance.moveTo === 'function') {
      instance.moveTo(typedSection);
    } else {
      const element = document.querySelector(`[data-section="${typedSection}"]`);
      if (element instanceof HTMLElement) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveIndex(SECTION_ORDER.indexOf(typedSection));
      }
    }
  }, [isPagePilingActive]);

  return (
    <>
      <Navbar activeSection={SECTION_ORDER[activeIndex]} onNavigate={handleNavigate} />
      <PagePilingWrapper
        onSectionChange={handleSectionChange}
        initialAnchor={initialSection}
        onModeChange={setIsPagePilingActive}
      >
        {SECTION_ORDER.map((anchor) => (
          <div key={anchor} data-section={anchor}>
            {SECTION_COMPONENTS[anchor]}
          </div>
        ))}
      </PagePilingWrapper>
      <Footer isVisible={activeIndex === SECTION_ORDER.length - 1} />
    </>
  );
}
