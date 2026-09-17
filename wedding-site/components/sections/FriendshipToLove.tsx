"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useSectionProgress } from "@/lib/useSectionProgress";
import { RevealLine } from "@/components/ui/RevealLine";
import { wedding } from "@/data/wedding";

const LoveTreeScene = dynamic(() => import("@/components/three/LoveTreeScene").then((m) => m.LoveTreeScene), {
  ssr: false,
});
const SceneCanvas = dynamic(() => import("@/components/three/SceneCanvas").then((m) => m.SceneCanvas), {
  ssr: false,
});

const MEMORIES = ["First Call", "First Date", "First Trip", "First Photograph", 'First "I Love You"', "First Anniversary"];

export function FriendshipToLove() {
  const { ref, progress } = useSectionProgress();
  const activeMemory = Math.min(MEMORIES.length - 1, Math.floor(progress * MEMORIES.length));

  return (
    <section ref={ref} className="relative h-[320vh] bg-ink">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <SceneCanvas camera={{ position: [0, 0.4, 7], fov: 45 }}>
            <LoveTreeScene progress={progress} />
          </SceneCanvas>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />

        <div className="relative z-10 flex h-full flex-col items-center justify-between px-6 py-14 md:py-20">
          <RevealLine as="h2" className="story-line text-center text-2xl text-jasmine md:text-4xl">
            {wedding.story.friendship.description}
          </RevealLine>

          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {MEMORIES.map((m, i) => (
              <motion.span
                key={m}
                animate={{
                  opacity: i <= activeMemory ? 1 : 0.25,
                  scale: i === activeMemory ? 1.06 : 1,
                }}
                transition={{ duration: 0.4 }}
                className={`rounded-full border px-3 py-1.5 font-body text-xs md:text-sm ${
                  i === activeMemory ? "border-ember text-ember" : "border-gold/25 text-mist"
                }`}
              >
                {m}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
