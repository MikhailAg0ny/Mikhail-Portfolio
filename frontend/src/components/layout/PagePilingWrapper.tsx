"use client";
import React, { useState, useEffect, useRef, Children } from "react";

type Props = {
  children: React.ReactNode;
  onSectionChange: (index: number) => void;
};

export default function PagePilingWrapper({ children, onSectionChange }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isWheeling = useRef(false);
  const touchStartY = useRef(0);

  const childrenArray = Children.toArray(children);
  const sectionCount = childrenArray.length;

  const changeSection = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < sectionCount && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
      onSectionChange(newIndex);
    }
  };

  const handleWheel = (e: WheelEvent) => {
    if (isWheeling.current) return;
    isWheeling.current = true;

    if (e.deltaY > 0) {
      // Scrolling down
      changeSection(Math.min(activeIndex + 1, sectionCount - 1));
    } else {
      // Scrolling up
      changeSection(Math.max(activeIndex - 1, 0));
    }

    setTimeout(() => {
      isWheeling.current = false;
    }, 1000); // Corresponds to the transition duration
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isWheeling.current) return;
    const touchEndY = e.touches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;

    if (Math.abs(deltaY) > 50) {
      isWheeling.current = true;
      if (deltaY > 0) {
        // Swiping up
        changeSection(Math.min(activeIndex + 1, sectionCount - 1));
      } else {
        // Swiping down
        changeSection(Math.max(activeIndex - 1, 0));
      }
      setTimeout(() => {
        isWheeling.current = false;
      }, 1000);
    }
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener("wheel", handleWheel);
      wrapper.addEventListener("touchstart", handleTouchStart);
      wrapper.addEventListener("touchmove", handleTouchMove);
    }
    return () => {
      if (wrapper) {
        wrapper.removeEventListener("wheel", handleWheel);
        wrapper.removeEventListener("touchstart", handleTouchStart);
        wrapper.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, [activeIndex, sectionCount]);

  return (
    <div ref={wrapperRef} className="page-piling-wrapper">
      <div className="pp-nav">
        {childrenArray.map((_, index) => (
          <div
            key={index}
            className={`pp-dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => changeSection(index)}
          />
        ))}
      </div>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className={`pp-section ${index === activeIndex ? "active" : ""}`}
          style={{
            transform: `translateY(${100 * (index - activeIndex)}%)`,
            zIndex: sectionCount - Math.abs(index - activeIndex),
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
