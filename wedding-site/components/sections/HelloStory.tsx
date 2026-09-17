"use client";

import { motion } from "framer-motion";
import { RevealLine } from "@/components/ui/RevealLine";
import { wedding } from "@/data/wedding";

const MESSAGES: { from: "groom" | "bride"; text: string }[] = [
  { from: "groom", text: "Hi 👋" },
  { from: "bride", text: "Hey!" },
  { from: "groom", text: "How are you?" },
  { from: "bride", text: "Good — that was a fun evening. Small world." },
  { from: "groom", text: "Smaller than you'd think, apparently." },
];

const CLOSERS = [
  "One conversation became many.",
  "Many conversations became memories.",
  "Memories became something neither of them expected.",
];

export function HelloStory() {
  return (
    <section className="relative bg-ink px-6 py-28 md:py-40">
      <div className="mx-auto max-w-md">
        <div className="space-y-3">
          {MESSAGES.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14, x: m.from === "groom" ? -8 : 8 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.5, delay: i * 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`flex ${m.from === "groom" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 font-body text-sm leading-snug ${
                  m.from === "groom"
                    ? "rounded-bl-sm bg-maroon/60 text-jasmine"
                    : "rounded-br-sm bg-gold/15 text-jasmine border border-gold/25"
                }`}
              >
                {m.text}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 space-y-3 text-center">
          {CLOSERS.map((line, i) => (
            <RevealLine key={line} delay={i * 0.15} className="story-line text-lg text-jasmine/90 md:text-2xl">
              {line}
            </RevealLine>
          ))}
        </div>
      </div>
    </section>
  );
}
