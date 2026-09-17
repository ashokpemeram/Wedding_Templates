"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

const LINES = ["Every love story has a beginning.", "Sometimes…", "Two people simply find their way to each other."];

/**
 * The very first thing a visitor sees: a near-black screen where two
 * particles of light drift toward each other and meet in a warm flare,
 * intercut with three short statement lines. Capped at ~4s of held
 * content plus transition, and always skippable.
 */
export function CinematicIntro({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const [lineIndex, setLineIndex] = useState(-1);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      const t = setTimeout(finish, 1200);
      return () => clearTimeout(t);
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setLineIndex(0), 900));
    timers.push(setTimeout(() => setLineIndex(1), 1900));
    timers.push(setTimeout(() => setLineIndex(2), 2500));
    timers.push(setTimeout(finish, 4200));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  function finish() {
    setVisible(false);
    setTimeout(onDone, 700);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-ink"
        >
          {!reducedMotion && (
            <div className="pointer-events-none absolute inset-0">
              <motion.span
                className="absolute left-[30%] top-1/2 h-1.5 w-1.5 rounded-full bg-goldBright shadow-[0_0_20px_6px_rgba(232,200,119,0.55)]"
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{ x: "20vw", y: 0, opacity: [0, 1, 1, 0.3] }}
                transition={{ duration: 3.4, times: [0, 0.2, 0.75, 1], ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.span
                className="absolute left-[70%] top-1/2 h-1.5 w-1.5 rounded-full bg-ember shadow-[0_0_20px_6px_rgba(217,102,46,0.55)]"
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{ x: "-20vw", y: 0, opacity: [0, 1, 1, 0.3] }}
                transition={{ duration: 3.4, times: [0, 0.2, 0.75, 1], ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.span
                className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-jasmine"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 0, 0.9, 0], scale: [0, 0, 9, 14] }}
                transition={{ duration: 1.1, delay: 2.5, times: [0, 0.3, 0.55, 1], ease: "easeOut" }}
                style={{ boxShadow: "0 0 60px 30px rgba(244,216,150,0.35)" }}
              />
            </div>
          )}

          <div className="relative z-10 px-6 text-center">
            <AnimatePresence mode="wait">
              {lineIndex >= 0 && (
                <motion.p
                  key={lineIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="story-line text-xl italic text-jasmine/90 md:text-3xl"
                >
                  {LINES[lineIndex]}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={finish}
            className="absolute bottom-8 right-8 z-20 font-body text-xs tracking-wide2 text-mist/70 underline-offset-4 transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          >
            Skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
