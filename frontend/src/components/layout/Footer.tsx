type FooterProps = {
  isVisible?: boolean;
};

export default function Footer({ isVisible = false }: FooterProps) {
  // Set your Facebook URL here or use NEXT_PUBLIC_FACEBOOK_URL env var
  const FACEBOOK_URL = process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/M1kh4ilAg0ny';
  // Set your email address here or use NEXT_PUBLIC_EMAIL env var
  const EMAIL_ADDRESS = process.env.NEXT_PUBLIC_EMAIL || 'mikhailjpn@gmail.com';
  return (
    <footer
      id="footer-bar"
      className={`fixed bottom-0 left-0 right-0 z-40 border-t border-[#9AA5B1]/20 bg-[#2A2F35]/90 backdrop-blur-lg transition-all duration-300 ease-out ${
        isVisible ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-6 sm:px-10">
        {/* Top Section: Name & Social Icons */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-start">
          <div className="text-center sm:text-left">
            <p className="text-lg font-semibold text-[#F0F2F5]">
              Mikhail James P. Navarro
            </p>
            <p className="text-sm text-[#9AA5B1]">
              Web Developer | Game Designer | Creative Technologist
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/MikhailAg0ny"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#00CFE8]/20 text-[#9AA5B1] transition hover:bg-[#00CFE8]/10 hover:text-[#00CFE8]"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/mikhail-james-navarro-030582356/"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#00CFE8]/20 text-[#9AA5B1] transition hover:bg-[#00CFE8]/10 hover:text-[#00CFE8]"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href={FACEBOOK_URL}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#00CFE8]/20 text-[#9AA5B1] transition hover:bg-[#00CFE8]/10 hover:text-[#00CFE8]"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 5.01 3.66 9.16 8.44 9.93v-7.03H8.08v-2.9h2.36V9.41c0-2.33 1.38-3.61 3.5-3.61.99 0 2.03.17 2.03.17v2.23h-1.14c-1.12 0-1.46.69-1.46 1.4v1.68h2.5l-.4 2.9h-2.1v7.03C18.34 21.23 22 17.08 22 12.07z" />
              </svg>
            </a>
            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#00CFE8]/20 text-[#9AA5B1] transition hover:bg-[#00CFE8]/10 hover:text-[#00CFE8]"
              rel="noopener noreferrer"
              aria-label="Email"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Section: Copyright & Links */}
        <div className="border-t border-[#9AA5B1]/10 pt-4 text-center text-xs text-[#9AA5B1]/60">
          <p>© {new Date().getFullYear()} Mikhail James P. Navarro. All rights reserved.</p>
          <p className="mt-2">Built with <span className="text-[#00CFE8]">Next.js</span> &amp; <span className="text-[#00CFE8]">Tailwind CSS</span>.</p>
        </div>
      </div>
    </footer>
  );
}
