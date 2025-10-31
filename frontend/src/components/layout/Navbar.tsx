import Image from "next/image";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/(main)/about" },
  { label: "Projects", href: "/(main)/projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "/(main)/contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        <div className="flex items-center gap-3">
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
        </div>
        <ul className="hidden gap-6 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                className="text-sm font-medium text-slate-300 transition hover:text-teal-400"
                href={link.href}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
