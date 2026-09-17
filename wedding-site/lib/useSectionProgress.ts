"use client";

import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

/**
 * Tracks 0→1 scroll progress of a tall section as it passes through the
 * viewport, and mirrors it into plain React state so it can be fed as a
 * prop into React Three Fiber scenes (which re-render on props, not on
 * framer-motion's own imperative motion values).
 */
export function useSectionProgress(offset: ["start end", "end start"] | ["start start", "end end"] = ["start end", "end start"]) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(Math.min(1, Math.max(0, v)));
  });

  return { ref, progress };
}
