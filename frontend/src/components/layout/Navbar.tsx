import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { useState } from "react";

const navLinks = [
  { label: "Home", anchor: "hero" },
  { label: "About", anchor: "about" },
  { label: "Skills", anchor: "skills" },
  { label: "Projects", anchor: "projects" },
  { label: "Achievements", anchor: "achievements" },
  { label: "Certifications", anchor: "certifications" },
  { label: "Contact", anchor: "contact" },
];

type NavbarProps = {
  activeSection?: (typeof navLinks)[number]["anchor"];
  onNavigate?: (anchor: (typeof navLinks)[number]["anchor"]) => void;
};

export default function Navbar({ activeSection = "hero", onNavigate }: NavbarProps) {
  const isHeroSection = activeSection === "hero";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleNavClick = (anchor: (typeof navLinks)[number]["anchor"]) => {
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(anchor);
    }
  };
  
  return (
    <nav
      id="navbar"
      className={`fixed top-0 z-[100] w-full border-b transition-all duration-300 ${
        isHeroSection
          ? "border-transparent bg-transparent backdrop-blur-none"
          : "border-text-secondary/20 bg-mica-light/85 backdrop-blur-xl shadow-[0_8px_32px_rgba(26,29,33,0.55)]"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        <a
          href="/"
          className="flex items-center gap-3"
          onClick={(event) => {
            if (!onNavigate) return;
            event.preventDefault();
            handleNavClick("hero");
          }}
        >
          <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-victus-blue">
            <ImageWithFallback
              src="/images/profile.jpg"
              alt="Mikhail James P. Navarro"
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-lg font-semibold text-victus-blue">Mikhail's Portfolio</span>
        </a>
        
        {/* Desktop Menu */}
        <ul id="navbar-menu" className="hidden gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.anchor;
            const path = link.anchor === "hero" ? "/" : `/${link.anchor}`;
            return (
              <li key={link.label}>
                <a
                  className={`text-sm font-medium transition ${
                    isActive
                      ? "text-victus-blue"
                      : "text-text-secondary hover:text-victus-blue"
                  }`}
                  href={path}
                  data-menuanchor={link.anchor}
                  onClick={(event) => {
                    if (!onNavigate) return;
                    event.preventDefault();
                    handleNavClick(link.anchor);
                  }}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile Hamburger Menu Button */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-mica-light/20 text-victus-blue hover:bg-mica-light/30 transition-all"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-mica-light/95 backdrop-blur-xl border-t border-text-secondary/20">
          <ul className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.anchor;
              return (
                <li key={link.label}>
                  <a
                    className={`block px-4 py-2 rounded-lg font-medium transition ${
                      isActive
                        ? "bg-victus-blue/20 text-victus-blue"
                        : "text-text-secondary hover:bg-mica-light/50 hover:text-victus-blue"
                    }`}
                    href={link.anchor === "hero" ? "/" : `/${link.anchor}`}
                    data-menuanchor={link.anchor}
                    onClick={(event) => {
                      event.preventDefault();
                      handleNavClick(link.anchor);
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}
