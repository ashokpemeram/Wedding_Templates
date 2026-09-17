"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * A single line of cinematic statement text that fades and rises into
 * view once, on scroll — the shared visual language for every "story
 * beat" line across the site ("And then...", "They met.", etc).
 */
export function RevealLine({
  children,
  delay = 0,
  className,
  as = "p",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "p" | "h1" | "h2" | "h3";
}) {
  const Component = motion[as as "p"];
  return (
    <Component
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}
