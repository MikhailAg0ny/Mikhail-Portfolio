"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import Image from "next/image";

export default function CustomCursor() {
    const [isPointer, setIsPointer] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Use Framer Motion values for performance
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);



    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            if (!isVisible) setIsVisible(true);

            // Check if hovering over clickable element
            const target = e.target as HTMLElement;
            const isClickable =
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.closest('[role="button"]') ||
                target.tagName === "INPUT" ||
                target.tagName === "LABEL" ||
                target.classList.contains("pointer-cursor");

            setIsPointer(!!isClickable);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [mouseX, mouseY, isVisible]);

    // If touch device or not visible, don't render
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[99999]"
            style={{
                x: mouseX,
                y: mouseY,
                opacity: isVisible ? 1 : 0,
                translateX: "-30%", // Center the detailed part of cursor mostly
                translateY: "-20%",
            }}
        >
            {/* Regular Cursor */}
            <motion.div
                animate={{
                    scale: isPointer ? 0 : 1,
                    opacity: isPointer ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="absolute"
            >
                {/* Adjusted size: w-8 h-8 (32px) */}
                <div className="relative h-8 w-8">
                    <Image
                        src="/cursors/Cute Kitty Eats Popcorn Animated--cursor--SweezyCursors.png"
                        alt="cursor"
                        fill
                        className="object-contain"
                        priority
                        unoptimized
                    />
                </div>
            </motion.div>

            {/* Pointer Cursor (Eating Popcorn) */}
            <motion.div
                animate={{
                    scale: isPointer ? 1 : 0,
                    opacity: isPointer ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="absolute"
            >
                {/* Adjusted size: w-10 h-10 (40px) for the pointer state */}
                <div className="relative h-10 w-10">
                    <Image
                        src="/cursors/Cute Kitty Eats Popcorn Animated--pointer--SweezyCursors.png"
                        alt="pointer"
                        fill
                        className="object-contain"
                        priority
                        unoptimized
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}
