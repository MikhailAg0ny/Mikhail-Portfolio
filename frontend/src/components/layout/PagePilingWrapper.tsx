"use client";

import React from "react";

type Props = {
  children: React.ReactNode;
  onSectionChange?: (index: number) => void;
  initialAnchor?: string;
  enableAtWidth?: number;
  onModeChange?: (isPagePilingActive: boolean) => void;
};

/**
 * @deprecated Fullpage.js and PagePiling have been decommissioned in favor of native fluid single-page scrolling.
 * This component acts as a lightweight passthrough wrapper for backward compatibility.
 */
export default function PagePilingWrapper({ children }: Props) {
  return <div className="w-full">{children}</div>;
}
