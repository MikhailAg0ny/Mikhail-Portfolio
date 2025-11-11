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

type SectionSpacing = {
  padding: string;
  minHeight: string;
};

export function useSectionPadding(): SectionSpacing {
  const { isDesktop, isTablet } = useBreakpoints();

  if (isDesktop) {
    return {
      padding: "pt-32 pb-20",
      minHeight: "calc(100svh - 13rem)",
    };
  }

  if (isTablet) {
    return {
      padding: "pt-32 pb-20",
      minHeight: "calc(100svh - 13rem)",
    };
  }

  return {
    padding: "pt-14 pb-10",
    minHeight: "calc(100svh - 7.5rem)",
  };
}
