"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the user's `prefers-reduced-motion` OS setting.
 * Every scene / heavy animation component should check this and fall
 * back to a static or near-static presentation when true.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}
