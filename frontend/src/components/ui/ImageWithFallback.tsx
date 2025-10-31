"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

type Props = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
  className?: string;
};

export default function ImageWithFallback({ src, alt, className, ...rest }: Props) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    // Simple inline SVG fallback avatar (keeps UI consistent when profile is missing)
    return (
      <div
        className={className}
        aria-hidden
        style={{ display: "inline-block", lineHeight: 0 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 128 128"
          width="100%"
          height="100%"
          className="rounded-full bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900"
        >
          <defs>
            <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#0ea5a4" />
              <stop offset="1" stopColor="#0369a1" />
            </linearGradient>
          </defs>
          <rect width="128" height="128" rx="64" fill="url(#g)" />
          <g transform="translate(14,22)" fill="#fff" opacity="0.92">
            <circle cx="50" cy="28" r="20" />
            <rect x="6" y="64" width="88" height="28" rx="14" />
          </g>
        </svg>
      </div>
    );
  }

  return (
    // next/image uses native img on the client; we attach onError to signal fallback
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      src={src}
      alt={alt}
      {...(rest as any)}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
