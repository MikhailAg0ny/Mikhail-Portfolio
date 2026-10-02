"use client";

import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiArrowUp } from "react-icons/hi2";
import { profile } from "@/lib/profile";

const CURRENT_YEAR = new Date().getUTCFullYear();

type FooterProps = {
  isVisible?: boolean;
};

export default function Footer({}: FooterProps) {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      id="footer-bar"
      className="relative z-20 w-full border-t border-white/10 bg-mica-dark/95 backdrop-blur-xl transition-all duration-300"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:gap-5 px-6 py-5 sm:py-6 sm:px-10 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))]">
        {/* Top Section: Name, Socials & Back to Top */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-center">
          <div className="text-center sm:text-left">
            <p className="text-base sm:text-lg font-semibold text-text-primary">
              {profile.name}
            </p>
            <p className="text-xs sm:text-sm text-text-secondary">
              {profile.title}
            </p>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="hidden sm:inline text-xs font-mono text-text-secondary uppercase tracking-wider">
              Connect:
            </span>
            <a
              href={profile.socials.github}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-text-secondary transition hover:border-victus-blue hover:bg-victus-blue/10 hover:text-victus-blue hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-victus-blue"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <FaGithub className="h-5 w-5" />
            </a>
            <a
              href={profile.socials.linkedin}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-text-secondary transition hover:border-victus-blue hover:bg-victus-blue/10 hover:text-victus-blue hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-victus-blue"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedinIn className="h-5 w-5" />
            </a>
            <a
              href={profile.socials.facebook}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-text-secondary transition hover:border-victus-blue hover:bg-victus-blue/10 hover:text-victus-blue hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-victus-blue"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Profile"
            >
              <FaFacebookF className="h-5 w-5" />
            </a>

            {/* Back to top button */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="ml-2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 transition hover:border-cyan-300 hover:bg-cyan-500/20 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              title="Back to Top"
            >
              <HiArrowUp className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="border-t border-white/5 pt-3 text-center text-xs text-text-secondary/60">
          <p>© {CURRENT_YEAR} {profile.name}. All rights reserved. Crafted with Next.js & Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
