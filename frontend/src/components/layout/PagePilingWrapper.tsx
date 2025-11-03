"use client";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  onSectionChange: (index: number) => void;
  initialAnchor?: string;
};

const ANCHORS = [
  "hero",
  "about",
  "skills",
  "projects",
  "achievements",
  "certifications",
  "contact",
];

export default function PagePilingWrapper({ children, onSectionChange, initialAnchor = "hero" }: Props) {
  const fullpageRef = useRef<HTMLDivElement>(null);
  const fullpageInstance = useRef<any>(null);
  const onSectionChangeRef = useRef(onSectionChange);
  const initialAnchorRef = useRef(initialAnchor);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    onSectionChangeRef.current = onSectionChange;
  }, [onSectionChange]);

  useEffect(() => {
    initialAnchorRef.current = initialAnchor;
    if (fullpageInstance.current && typeof fullpageInstance.current.moveTo === "function") {
      fullpageInstance.current.moveTo(initialAnchor);
    }
  }, [initialAnchor]);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined" || fullpageInstance.current) return;

    // Dynamically import fullpage.js
    const initFullPage = async () => {
      try {
        // Import CSS dynamically
        await import("fullpage.js/dist/fullpage.css");
        
        const FullPageModule = await import("fullpage.js");
        const FullPageJS = FullPageModule.default || FullPageModule;

        if (fullpageRef.current && !fullpageInstance.current) {
          fullpageInstance.current = new FullPageJS("#fullpage", {
            // License key for open-source/non-commercial use
            licenseKey: "gplv3-license",
            navigation: true,
            navigationPosition: "right",
            navigationTooltips: [
              "Home",
              "About",
              "Skills",
              "Projects",
              "Achievements",
              "Certifications",
              "Contact",
            ],
            anchors: ANCHORS,
            menu: "#navbar-menu",
            scrollingSpeed: 700,
            autoScrolling: true,
            fitToSection: true,
            scrollBar: false,
            easing: "easeInOutCubic",
            loopBottom: false,
            loopTop: false,
            touchSensitivity: 15,
            lockAnchors: true,
            recordHistory: false,
            animateAnchor: false,
            onLeave: function (origin: any, destination: any, direction: string) {
              onSectionChangeRef.current(destination.index);
            },
          });

          const initial = initialAnchorRef.current;
          const initialIndex = ANCHORS.indexOf(initial);
          if (initialIndex >= 0 && fullpageInstance.current?.moveTo) {
            fullpageInstance.current.moveTo(initial);
            onSectionChangeRef.current(initialIndex);
          }

          setIsReady(true);

          // Expose instance globally for navbar navigation
          (window as any).fullpage_api = fullpageInstance.current;
        }
      } catch (error) {
        console.error("Error initializing fullpage.js:", error);
      }
    };

    initFullPage();

    // Cleanup
    return () => {
      if (fullpageInstance.current) {
        try {
          fullpageInstance.current.destroy("all");
          (window as any).fullpage_api = null;
        } catch (e) {
          console.error("Error destroying fullpage:", e);
        }
        fullpageInstance.current = null;
      }
      setIsReady(false);
    };
  }, []);

  return (
    <div
      id="fullpage"
      ref={fullpageRef}
      style={{ visibility: isReady ? "visible" : "hidden" }}
      aria-hidden={!isReady}
    >
      {React.Children.map(children, (child) => (
        <div className="section">{child}</div>
      ))}
    </div>
  );
}
