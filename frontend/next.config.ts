import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Security: Prevent technology fingerprinting
  poweredByHeader: false,
  // Security (4.6): Disable source maps in production
  productionBrowserSourceMaps: false,
  devIndicators: false,
  images: {
    localPatterns: [
      {
        pathname: "/images/**",
        search: "",
      },
      {
        pathname: "/images/**",
        search: "?v=new",
      },
    ],
  },

  // ── Security Headers (4.1) ──
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking
          { key: "X-Frame-Options", value: "DENY" },

          // Block MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },

          // Control referrer data leakage
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },

          // Restrict browser features
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },

          // Enforce HTTPS
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },

          // Prevent cross-origin window reference leaks
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },

          // Protect resources from unauthorized cross-origin embedding
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },

          // DNS prefetching control
          { key: "X-DNS-Prefetch-Control", value: "on" },

          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "media-src 'self'",
              "connect-src 'self' https://api.emailjs.com https://vitals.vercel-insights.com",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
