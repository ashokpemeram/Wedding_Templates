"use client";

import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "./useReducedMotion";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Wraps the app in a Lenis smooth-scroll instance and drives it from a
 * single requestAnimationFrame loop. GSAP ScrollTrigger components read
 * scroll position from the native scroll event that Lenis dispatches,
 * so no extra wiring is needed in individual sections.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return; // respect prefers-reduced-motion: native scroll only

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  return <LenisContext.Provider value={lenisRef.current}>{children}</LenisContext.Provider>;
}
