import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { useEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

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
  const [isHeroSection, setIsHeroSection] = useState(activeSection === "hero");
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleNavClick = (anchor: (typeof navLinks)[number]["anchor"]) => {
    if (onNavigate) {
      onNavigate(anchor);
    }
  };

  useEffect(() => {
    setIsHeroSection(activeSection === "hero");
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 24;
      setHasScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 z-[100] w-full border-b transition-all duration-300 ${
        isHeroSection && !hasScrolled
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

        {/* Mobile Navigation Dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg bg-mica-light/20 text-victus-blue transition-all hover:bg-mica-light/30"
              aria-label="Open navigation menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              sideOffset={12}
              align="end"
              className="z-[110] w-52 rounded-2xl border border-white/10 bg-mica-dark/95 p-2 text-sm text-text-secondary shadow-2xl backdrop-blur-md focus:outline-none"
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.anchor;
                return (
                  <DropdownMenu.Item
                    key={link.anchor}
                    className={`flex cursor-pointer items-center rounded-xl px-3 py-2 transition ${
                      isActive
                        ? "bg-victus-blue/20 text-victus-blue"
                        : "hover:bg-mica-light/30 hover:text-victus-blue"
                    }`}
                    onSelect={(event) => {
                      event.preventDefault();
                      handleNavClick(link.anchor);
                    }}
                  >
                    {link.label}
                  </DropdownMenu.Item>
                );
              })}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </nav>
  );
}
