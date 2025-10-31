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
  return (
    <nav id="navbar" className="fixed top-0 z-[100] w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        <a href="#hero" className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-teal-400">
            <ImageWithFallback
              src="/images/profile.jpg"
              alt="Mikhail James P. Navarro"
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-lg font-semibold text-teal-400">Mikhail Navarro</span>
        </a>
        <ul id="navbar-menu" className="hidden gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <li key={link.label}>
                <a
                  className={`text-sm font-medium transition ${
                    isActive
                      ? "text-teal-400"
                      : "text-slate-300 hover:text-teal-400"
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
