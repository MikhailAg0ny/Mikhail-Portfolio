"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  
  // Explicitly enable vertical scrolling
  html.style.overflowY = "auto";
  html.style.overflowX = "hidden";
  body.style.overflowY = "auto";
  body.style.overflowX = "hidden";
  body.style.height = "auto";

  if (container) {
    container.style.removeProperty("height");
    container.style.removeProperty("overflow");
    container.style.removeProperty("position");
    container.style.height = "auto";
    Array.from(container.children).forEach((child) => {
      if (child instanceof HTMLElement) {
        child.classList.remove("fp-section", "active");
        child.style.removeProperty("height");
        child.style.removeProperty("overflow");
        child.style.removeProperty("position");
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
  const navScrollPositionRef = useRef(0);
  const navTriggersRef = useRef<ScrollTrigger[]>([]);
  const scrollProxyInitializedRef = useRef(false);

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
    
    // Force scroll enable on mobile
    if (!shouldEnable) {
      cleanupFullpageArtifacts(fullpageRef.current);
    }

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
            licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
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
            afterLoad: function (_origin: any, destination: any) {
              navScrollPositionRef.current = destination.index * window.innerHeight;
              ScrollTrigger.update();
            },
          });

          if (!scrollProxyInitializedRef.current && fullpageRef.current) {
            gsap.registerPlugin(ScrollTrigger);
            ScrollTrigger.scrollerProxy(fullpageRef.current, {
              scrollTop(value?: number) {
                if (typeof value === "number" && fullpageInstance.current) {
                  const targetIndex = gsap.utils.clamp(0, ANCHORS.length - 1, Math.round(value / window.innerHeight));
                  fullpageInstance.current.moveTo(ANCHORS[targetIndex]);
                }
                return navScrollPositionRef.current;
              },
              getBoundingClientRect: () => ({
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
              }),
              pinType: "transform",
            });
            scrollProxyInitializedRef.current = true;
          }

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

  useEffect(() => {
    if (typeof window === "undefined") return;

    const killNavTriggers = () => {
      navTriggersRef.current.forEach((trigger) => trigger.kill());
      navTriggersRef.current = [];
    };

    if (!isEnabled) {
      killNavTriggers();
      return;
    }

    const navElement = document.querySelector("#fp-nav");
    if (!navElement || !fullpageRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    gsap.set(navElement, { autoAlpha: 0, x: 40 });

    killNavTriggers();

    const showNav = () =>
      gsap.to(navElement, {
        autoAlpha: 1,
        x: 0,
        duration: 0.6,
        ease: "power3.out",
      });

    const hideNav = () =>
      gsap.to(navElement, {
        autoAlpha: 0,
        x: 40,
        duration: 0.4,
        ease: "power2.out",
      });

    navTriggersRef.current.push(
      ScrollTrigger.create({
        scroller: fullpageRef.current,
        start: 0,
        end: () => (ANCHORS.length - 1) * window.innerHeight,
        onUpdate: (self) => {
          if (self.progress > 0.05) {
            showNav();
          } else {
            hideNav();
          }
        },
      })
    );

    ANCHORS.forEach((anchor, index) => {
      const dotSelector = `#fp-nav ul li:nth-child(${index + 1}) a span`;
      navTriggersRef.current.push(
        ScrollTrigger.create({
          scroller: fullpageRef.current!,
          start: index * window.innerHeight,
          end: (index + 1) * window.innerHeight,
          onToggle: ({ isActive }) => {
            gsap.to(dotSelector, {
              scale: isActive ? 1.25 : 1,
              duration: 0.35,
              ease: "power2.out",
            });
          },
        })
      );
    });

    ScrollTrigger.refresh();

    return () => {
      killNavTriggers();
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
