"use client";
import React, { useEffect, useRef } from "react";
import "fullpage.js/dist/fullpage.css";

type Props = {
  children: React.ReactNode;
  onSectionChange: (index: number) => void;
};

export default function PagePilingWrapper({ children, onSectionChange }: Props) {
  const fullpageRef = useRef<HTMLDivElement>(null);
  const fullpageInstance = useRef<any>(null);
  const onSectionChangeRef = useRef(onSectionChange);

  useEffect(() => {
    onSectionChangeRef.current = onSectionChange;
  }, [onSectionChange]);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined" || fullpageInstance.current) return;

    // Dynamically import fullpage.js
    const initFullPage = async () => {
      try {
        const FullPageJS = (await import("fullpage.js")).default;

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
            anchors: [
              "hero",
              "about",
              "skills",
              "projects",
              "achievements",
              "certifications",
              "contact",
            ],
            menu: "#navbar-menu",
            scrollingSpeed: 700,
            autoScrolling: true,
            fitToSection: true,
            scrollBar: false,
            easing: "easeInOutCubic",
            loopBottom: false,
            loopTop: false,
            touchSensitivity: 15,
            onLeave: function (origin: any, destination: any, direction: string) {
              onSectionChangeRef.current(destination.index);
            },
            afterLoad: function (origin: any, destination: any, direction: string) {
              // Callback after load
            },
          });

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
    };
  }, []);

  return (
    <div id="fullpage" ref={fullpageRef}>
      {React.Children.map(children, (child) => (
        <div className="section">{child}</div>
      ))}
    </div>
  );
}
