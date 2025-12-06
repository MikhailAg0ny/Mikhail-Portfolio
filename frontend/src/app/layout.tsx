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
  description: "Fullstack Developer Portfolio",
  icons: {
    icon: [
      { url: "/icons/hd-bongo-cat-icon.png", sizes: "any" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: ["/icons/hd-bongo-cat-icon.png", "/favicon.ico"],
    apple: [
      { url: "/icons/hd-bongo-cat-icon.png" },
      { url: "/favicon.png" },
    ],
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
      <head>
        {/* Preferred PNG favicon */}
        <link rel="icon" type="image/png" href="/icons/hd-bongo-cat-icon.png" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        {/* Legacy/ICO fallbacks */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/hd-bongo-cat-icon.png" />
        <meta name="theme-color" content="#000000" />
      </head>
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
