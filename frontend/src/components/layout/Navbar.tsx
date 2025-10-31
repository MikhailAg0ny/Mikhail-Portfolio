import ImageWithFallback from "@/components/ui/ImageWithFallback";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

type NavbarProps = {
  activeSection?: string;
};

export default function Navbar({ activeSection = "hero" }: NavbarProps) {
  const isHeroSection = activeSection === "hero";
  
  return (
    <nav
      id="navbar"
      className={`fixed top-0 z-[100] w-full border-b transition-all duration-300 ${
        isHeroSection
          ? "border-transparent bg-transparent backdrop-blur-none"
          : "border-[#9AA5B1]/20 bg-[#2A2F35]/85 backdrop-blur-xl shadow-[0_8px_32px_rgba(26,29,33,0.55)]"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        <a href="#hero" className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-[#00CFE8]">
            <ImageWithFallback
              src="/images/profile.jpg"
              alt="Mikhail James P. Navarro"
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-lg font-semibold text-[#00CFE8]">Mikhail Navarro</span>
        </a>
        <ul id="navbar-menu" className="hidden gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <li key={link.label}>
                <a
                  className={`text-sm font-medium transition ${
                    isActive
                      ? "text-[#00CFE8]"
                      : "text-[#9AA5B1] hover:text-[#00CFE8]"
                  }`}
                  href={link.href}
                  data-menuanchor={link.href.substring(1)}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
