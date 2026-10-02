import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";

export function useBreakpoints() {
  const [hasMounted, setHasMounted] = useState(false);

  // defaultMatches prevents SSR/client hydration mismatch
  const isDesktop = useMediaQuery({ minWidth: 1024 }, undefined, () => {});
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 }, undefined, () => {});
  const isMobile = useMediaQuery({ maxWidth: 767 }, undefined, () => {});
  const isShort = useMediaQuery({ maxHeight: 900 }, undefined, () => {});

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return useMemo(
    () => ({
      isDesktop: hasMounted ? isDesktop : false,
      isTablet: hasMounted ? isTablet : false,
      isMobile: hasMounted ? isMobile : false,
      isShort: hasMounted ? isShort : false,
    }),
    [hasMounted, isDesktop, isTablet, isMobile, isShort]
  );
}

type SectionSpacing = {
  padding: string;
  minHeight: string;
};

export function useSectionPadding(): SectionSpacing {
  const { isDesktop, isTablet, isShort } = useBreakpoints();

  if (isDesktop) {
    return {
      padding: isShort ? "pt-24 pb-12" : "pt-32 pb-20",
      minHeight: "calc(100svh - 13rem)",
    };
  }

  if (isTablet) {
    return {
      padding: isShort ? "pt-24 pb-12" : "pt-32 pb-20",
      minHeight: "calc(100svh - 13rem)",
    };
  }

  // Mobile fallback — more vertical breathing room below fixed navbar
  return {
    padding: isShort ? "pt-16 pb-8" : "pt-20 pb-12",
    minHeight: "calc(100svh - 5rem)",
  };
}
