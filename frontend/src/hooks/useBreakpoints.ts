import { useMemo } from "react";
import { useMediaQuery } from "react-responsive";

export function useBreakpoints() {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isShort = useMediaQuery({ maxHeight: 900 });

  return useMemo(
    () => ({
      isDesktop,
      isTablet,
      isMobile,
      isShort,
    }),
    [isDesktop, isTablet, isMobile, isShort]
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

  return {
    padding: "pt-14 pb-10",
    minHeight: "calc(100svh - 7.5rem)",
  };
}
