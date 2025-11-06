import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mikhail's Portfolio",
  description: "Web Developer Portfolio",
  icons: {
    icon: "/icons/catto-favicon.ico",
    shortcut: "/icons/catto-favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} antialiased min-h-[100svh] overflow-x-hidden bg-black text-slate-100`}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed left-0 top-0 z-[-1] h-full w-full object-cover"
          aria-hidden="true"
        >
          <source src="/videos/video_bg.mp4" type="video/mp4" />
        </video>
        <div className="relative z-0 h-full w-full bg-black/50">{children}</div>
      </body>
    </html>
  );
}
