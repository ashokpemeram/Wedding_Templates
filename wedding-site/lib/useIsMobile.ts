"use client";

import { useEffect, useState } from "react";

/**
 * Simple viewport + coarse-pointer based mobile detection.
 * Used to gate expensive 3D scenes and swap them for lightweight
 * fallbacks on mid-range Android phones, per the performance brief.
 */
export function useIsMobile(breakpoint = 820) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const narrow = window.innerWidth < breakpoint;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(narrow || coarse);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}
