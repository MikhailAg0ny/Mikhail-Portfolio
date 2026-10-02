"use client";

import { useEffect, useState } from "react";
import { SECTION_ORDER, type SectionKey } from "@/lib/sections";

export function useActiveSection(defaultSection: SectionKey = "hero") {
  const [activeSection, setActiveSection] = useState<SectionKey>(defaultSection);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const visibleRatios = new Map<SectionKey, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const targetId = entry.target.getAttribute("id") as SectionKey;
          if (targetId && SECTION_ORDER.includes(targetId)) {
            if (entry.isIntersecting) {
              visibleRatios.set(targetId, entry.intersectionRatio);
            } else {
              visibleRatios.delete(targetId);
            }
          }
        });

        // Pick section with highest visible ratio in the gaze window
        let bestSection: SectionKey | null = null;
        let maxRatio = -1;

        visibleRatios.forEach((ratio, section) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            bestSection = section;
          }
        });

        if (bestSection) {
          setActiveSection(bestSection);
        }
      },
      {
        rootMargin: "-20% 0px -40% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    SECTION_ORDER.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return activeSection;
}
