import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClickSpark from "@/components/ClickSpark";
import CustomCursor from "@/components/layout/CustomCursor";
import VercelAnalyticsClient from "@/components/layout/VercelAnalyticsClient";
import { PersonJsonLd, WebsiteJsonLd } from "@/components/seo/JsonLd";
import { Toaster } from "sonner";

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
  // Core SEO
  title: {
    default: "Mikhail | Fullstack Developer Portfolio",
    template: "%s | Mikhail Portfolio",
  },
  description:
    "Fullstack Developer from Cebu, Philippines specializing in React, Next.js, TypeScript, and modern web technologies. View my projects, skills, and get in touch for collaboration.",

  // Keywords
  keywords: [
    "Mikhail",
    "Fullstack Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "JavaScript",
    "Portfolio",
    "Philippines",
    "Cebu Developer",
    "Cebu Web Developer",
    "Cebu Fullstack Developer",
    "Filipino Developer",
    "Philippines Web Developer",
    "Freelance Developer",
    "Hire Developer Cebu",
    "Software Engineer Philippines",
  ],

  // Author
  authors: [{ name: "Mikhail" }],
  creator: "Mikhail",

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Mikhail's Portfolio",
    title: "Mikhail | Fullstack Developer Portfolio",
    description:
      "Fullstack Developer from Cebu, Philippines specializing in React, Next.js, TypeScript, and modern web technologies.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mikhail - Fullstack Developer Portfolio",
      },
    ],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons (keep existing)
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
        {/* JSON-LD Structured Data */}
        <PersonJsonLd />
        <WebsiteJsonLd />
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
        <CustomCursor />
        <ClickSpark
          sparkColor="#fff"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
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
          <VercelAnalyticsClient />
        </ClickSpark>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "rgba(15, 23, 42, 0.95)",
              border: "1px solid rgba(100, 116, 139, 0.2)",
              color: "#f1f5f9",
              backdropFilter: "blur(12px)",
            },
            className: "shadow-2xl",
          }}
          richColors
          closeButton
        />
      </body>
    </html>
  );
}
