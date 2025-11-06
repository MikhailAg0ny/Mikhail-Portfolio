import { useMemo } from "react";
import { useMediaQuery } from "react-responsive";

export function useBreakpoints() {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return useMemo(
    () => ({
      isDesktop,
      isTablet,
      isMobile,
    }),
    [isDesktop, isTablet, isMobile]
  );
}

export function useSectionPadding() {
  const { isDesktop, isTablet } = useBreakpoints();

  if (isDesktop) {
    return "pt-32 pb-20";
  }

  if (isTablet) {
    return "pt-32 pb-20";
  }

  return "pt-28 pb-16";
}
