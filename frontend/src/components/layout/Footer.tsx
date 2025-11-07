import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";

type FooterProps = {
  isVisible?: boolean;
};

const CURRENT_YEAR = new Date().getUTCFullYear();

export default function Footer({ isVisible = false }: FooterProps) {
  // Set your Facebook URL here or use NEXT_PUBLIC_FACEBOOK_URL env var
  const FACEBOOK_URL = process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/M1kh4ilAg0ny';
  return (
    <footer
      id="footer-bar"
      className={`fixed bottom-0 left-0 right-0 z-40 border-t border-text-secondary/20 bg-mica-light/90 backdrop-blur-lg transition-all duration-300 ease-out ${
        isVisible ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-6 sm:px-10">
        {/* Top Section: Name & Social Icons */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-start">
          <div className="text-center sm:text-left">
            <p className="text-lg font-semibold text-text-primary">
              Mikhail James P. Navarro
            </p>
            <p className="text-sm text-text-secondary">
              Web Developer | Game Designer | AI Enthusiast
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/MikhailAg0ny"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-victus-blue/20 text-text-secondary transition hover:bg-victus-blue/10 hover:text-victus-blue"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/mikhail-james-navarro-030582356/"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-victus-blue/20 text-text-secondary transition hover:bg-victus-blue/10 hover:text-victus-blue"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="h-5 w-5" />
            </a>
            <a
              href={FACEBOOK_URL}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-victus-blue/20 text-text-secondary transition hover:bg-victus-blue/10 hover:text-victus-blue"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Bottom Section: Copyright & Links */}
        <div className="border-t border-text-secondary/10 pt-4 text-center text-xs text-text-secondary/60">
          <p>{CURRENT_YEAR} Mikhail James P. Navarro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
