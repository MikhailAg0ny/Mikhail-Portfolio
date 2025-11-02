import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mikhail's Portfolio",
  description: "Web Developer Portfolio",
  icons: {
    icon: "/icons/catto-favicon.ico",
    shortcut: "/icons/catto-favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen overflow-hidden text-slate-100`}
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
