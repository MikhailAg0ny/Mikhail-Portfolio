"use client";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  onSectionChange: (index: number) => void;
  initialAnchor?: string;
  enableAtWidth?: number;
  onModeChange?: (isPagePilingActive: boolean) => void;
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

function cleanupFullpageArtifacts(container?: HTMLElement | null) {
  if (typeof window === "undefined") return;
  const html = document.documentElement;
  const body = document.body;

  html.classList.remove("fp-enabled", "fp-viewing", "fp-responsive");
  body.classList.remove("fp-enabled", "fp-responsive");

  [html.style, body.style].forEach((style) => {
    style.removeProperty("overflow");
    style.removeProperty("height");
    style.removeProperty("position");
    style.removeProperty("touch-action");
    style.removeProperty("-ms-touch-action");
  });
  html.style.overflowY = "auto";
  body.style.overflowY = "auto";

  if (container) {
    container.style.removeProperty("height");
    container.style.removeProperty("overflow");
    Array.from(container.children).forEach((child) => {
      if (child instanceof HTMLElement) {
        child.classList.remove("fp-section", "active");
        child.style.removeProperty("height");
        child.style.removeProperty("overflow");
      }
    });
  }
}

export default function PagePilingWrapper({ children, onSectionChange, initialAnchor = "hero", enableAtWidth = 1024, onModeChange }: Props) {
  const fullpageRef = useRef<HTMLDivElement>(null);
  const fullpageInstance = useRef<any>(null);
  const onSectionChangeRef = useRef(onSectionChange);
  const initialAnchorRef = useRef(initialAnchor);
  const [isReady, setIsReady] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    onSectionChangeRef.current = onSectionChange;
  }, [onSectionChange]);

  useEffect(() => {
    initialAnchorRef.current = initialAnchor;
    if (isEnabled && fullpageInstance.current && typeof fullpageInstance.current.moveTo === "function") {
      fullpageInstance.current.moveTo(initialAnchor);
    }
  }, [initialAnchor, isEnabled]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const shouldEnable = window.innerWidth >= enableAtWidth;
    setIsEnabled(shouldEnable);
    onModeChange?.(shouldEnable);

    const handleResize = () => {
      const nextShouldEnable = window.innerWidth >= enableAtWidth;

      if (nextShouldEnable === isEnabled) return;

      setIsEnabled(nextShouldEnable);
      onModeChange?.(nextShouldEnable);

      if (!nextShouldEnable) {
        if (fullpageInstance.current) {
          try {
            fullpageInstance.current.destroy("all");
          } catch (error) {
            console.error("Error destroying fullpage.js during resize:", error);
          }
          fullpageInstance.current = null;
          (window as any).fullpage_api = null;
          setIsReady(false);
          cleanupFullpageArtifacts(fullpageRef.current);
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [enableAtWidth, isEnabled]);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;
    if (!isEnabled || fullpageInstance.current) return;

    // Dynamically import fullpage.js
    const initFullPage = async () => {
      try {
        // Import CSS dynamically
        await import("fullpage.js/dist/fullpage.css");
        
        const FullPageModule = await import("fullpage.js");
        const FullPageJS = FullPageModule.default || FullPageModule;

        if (fullpageRef.current && !fullpageInstance.current && isEnabled) {
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
        } catch (e) {
          console.error("Error destroying fullpage:", e);
        }
        fullpageInstance.current = null;
        (window as any).fullpage_api = null;
        cleanupFullpageArtifacts(fullpageRef.current);
      }
      setIsReady(false);
    };
  }, [isEnabled]);

  return (
    <div
      id="fullpage"
      ref={fullpageRef}
      style={{ visibility: isEnabled && !isReady ? "hidden" : "visible" }}
      aria-hidden={isEnabled && !isReady}
    >
      {React.Children.map(children, (child) => (
        <div className={isEnabled ? "section" : "min-h-screen"}>{child}</div>
      ))}
    </div>
  );
}
