"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RevealLine } from "@/components/ui/RevealLine";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { wedding } from "@/data/wedding";

const JourneyGlobe = dynamic(() => import("@/components/three/JourneyGlobe").then((m) => m.JourneyGlobe), {
  ssr: false,
});
const SceneCanvas = dynamic(() => import("@/components/three/SceneCanvas").then((m) => m.SceneCanvas), {
  ssr: false,
});

export function Journey() {
  const [active, setActive] = useState<number | null>(null);
  const stops = wedding.journey;
  const activeStop = active !== null ? stops[active] : null;

  return (
    <section className="relative bg-ink px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <RevealLine as="h2" className="story-line text-center text-3xl text-jasmine md:text-5xl">
          Their Journey
        </RevealLine>
        <p className="mx-auto mt-3 max-w-md text-center font-body text-sm text-mist">
          Every place they went, they went a little more sure of each other.
          Tap a point on the globe to revisit it.
        </p>

        <div className="relative mt-10 h-[62vh] w-full overflow-hidden rounded-sm border border-gold/15 md:h-[70vh]">
          <SceneCanvas camera={{ position: [0, 0, 6.5], fov: 45 }}>
            <JourneyGlobe stops={stops} activeIndex={active} onSelect={setActive} />
            <pointLight position={[5, 5, 5]} intensity={0.6} color="#F4D896" />
          </SceneCanvas>

          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex flex-wrap items-center justify-center gap-2 px-4">
            {stops.map((s, i) => (
              <button
                key={s.location}
                onClick={() => setActive(i)}
                className={`pointer-events-auto rounded-full border px-3 py-1 font-body text-xs transition-colors md:text-sm ${
                  active === i ? "border-ember text-ember" : "border-gold/25 text-mist hover:border-gold/60"
                }`}
              >
                {s.location}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeStop && (
            <motion.div
              key={activeStop.location}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-5 rounded-sm border border-gold/15 bg-maroon/10 p-5 md:grid-cols-[1fr_1.3fr] md:p-6"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-sm md:aspect-[4/3]">
                <PlaceholderImage
                  src={activeStop.image}
                  alt={activeStop.location}
                  label={`${activeStop.location} photo`}
                />
              </div>
              <div className="flex flex-col justify-center text-left">
                <p className="font-body text-[11px] uppercase tracking-wide2 text-gold">{activeStop.date}</p>
                <p className="mt-1 font-display text-2xl text-jasmine">{activeStop.location}</p>
                <p className="mt-2 font-body text-sm leading-relaxed text-jasmine/85">{activeStop.description}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
