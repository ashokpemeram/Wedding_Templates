"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A slim, elegant scroll-progress rail down the right edge of the
 * viewport — the site's only persistent navigation chrome, deliberately
 * minimal so it never competes with the story.
 */
export function ProgressRail() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.3 });

  return (
    <div
      className="fixed right-4 top-0 z-50 hidden h-screen w-px md:block"
      aria-hidden="true"
    >
      <div className="absolute inset-y-10 right-0 w-px bg-gold/15" />
      <motion.div
        style={{ scaleY: progress }}
        className="absolute inset-y-10 right-0 w-px origin-top bg-gradient-to-b from-gold via-ember to-gold"
      />
    </div>
  );
}
