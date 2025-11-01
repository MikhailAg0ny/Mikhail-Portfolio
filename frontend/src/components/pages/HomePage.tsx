'use client';

import { useEffect, useRef, useState, useCallback, type ReactNode } from 'react';
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

const PagePilingWrapper = dynamic(() => import('@/components/layout/PagePilingWrapper'), {
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

function sectionToPath(section: SectionKey): string {
  return section === 'hero' ? '/' : `/${section}`;
}

function pathToSection(pathname: string): SectionKey | null {
  const cleaned = pathname.replace(/\/+$/, '').replace(/^\/+/, '');
  if (cleaned === '') return 'hero';
  if (SECTION_ORDER.includes(cleaned as SectionKey)) {
    return cleaned as SectionKey;
  }
  return null;
}

export default function HomePage({ initialSection = 'hero' }: HomePageProps) {
  const [activeIndex, setActiveIndex] = useState(() => {
    const initialIndex = SECTION_ORDER.indexOf(initialSection);
    return initialIndex >= 0 ? initialIndex : 0;
  });

  const navigationIntentRef = useRef<'push' | null>(null);
  const isInitialSync = useRef(true);

  useEffect(() => {
    const currentIndex = SECTION_ORDER.indexOf(initialSection);
    if (currentIndex >= 0) {
      setActiveIndex(currentIndex);
    }
  }, [initialSection]);

  useEffect(() => {
    if (isInitialSync.current) {
      isInitialSync.current = false;
      return;
    }

    const targetSection = SECTION_ORDER[activeIndex];
    const targetPath = sectionToPath(targetSection);
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : targetPath;

    if (navigationIntentRef.current === 'push') {
      navigationIntentRef.current = null;
      return;
    }

    if (targetPath !== currentPath) {
      window.history.replaceState(null, '', targetPath);
    }
  }, [activeIndex]);

  useEffect(() => {
    const handlePopState = () => {
      const targetSection = pathToSection(window.location.pathname);
      if (!targetSection) return;

      const instance = (window as any)?.fullpage_api;
      if (instance && typeof instance.moveTo === 'function') {
        instance.moveTo(targetSection);
      } else {
        const index = SECTION_ORDER.indexOf(targetSection);
        if (index !== -1) {
          setActiveIndex(index);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleSectionChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleNavigate = useCallback((section: string) => {
    if (!SECTION_ORDER.includes(section as SectionKey)) return;
    const typedSection = section as SectionKey;

    const targetPath = sectionToPath(typedSection);
    const currentPath = window.location.pathname;

    if (targetPath !== currentPath) {
      window.history.pushState(null, '', targetPath);
      navigationIntentRef.current = 'push';
    } else {
      navigationIntentRef.current = null;
    }

    const instance = (window as any)?.fullpage_api;
    if (instance && typeof instance.moveTo === 'function') {
      instance.moveTo(typedSection);
    } else {
      const sectionIndex = SECTION_ORDER.indexOf(typedSection);
      if (sectionIndex !== -1) {
        setActiveIndex(sectionIndex);
      }
    }
  }, []);

  return (
    <>
      <Navbar activeSection={SECTION_ORDER[activeIndex]} onNavigate={handleNavigate} />
      <PagePilingWrapper onSectionChange={handleSectionChange} initialAnchor={initialSection}>
        {SECTION_ORDER.map((anchor) => (
          <div key={anchor}>{SECTION_COMPONENTS[anchor]}</div>
        ))}
      </PagePilingWrapper>
      <Footer isVisible={activeIndex === SECTION_ORDER.length - 1} />
    </>
  );
}
