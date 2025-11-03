import ImageWithFallback from "@/components/ui/ImageWithFallback";

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
            onNavigate("hero");
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
                    onNavigate(link.anchor);
                  }}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
        {/* (no social icons in navbar) */}
      </div>
    </nav>
  );
}
