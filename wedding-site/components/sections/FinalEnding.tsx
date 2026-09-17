"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { useSectionProgress } from "@/lib/useSectionProgress";
import { RevealLine } from "@/components/ui/RevealLine";
import { useIsMobile } from "@/lib/useIsMobile";
import { wedding } from "@/data/wedding";

const TwoPathsScene = dynamic(() => import("@/components/three/TwoPathsScene").then((m) => m.TwoPathsScene), {
  ssr: false,
});
const SceneCanvas = dynamic(() => import("@/components/three/SceneCanvas").then((m) => m.SceneCanvas), {
  ssr: false,
});

const LINES = ["Two strangers.", "One beautiful journey.", "One forever."];

export function FinalEnding() {
  const { ref, progress } = useSectionProgress();
  const isMobile = useIsMobile();

  const petals = useMemo(
    () =>
      Array.from({ length: isMobile ? 8 : 16 }, (_, i) => ({
        left: (i * 97) % 100,
        delay: (i * 1.3) % 6,
        duration: 9 + (i % 5),
      })),
    [isMobile]
  );

  return (
    <section ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <SceneCanvas camera={{ position: [0, 0.3, 10], fov: 42 }}>
            <TwoPathsScene progress={1} color="#E8C877" />
          </SceneCanvas>
        </div>

        {/* Fade the whole scene toward warm ivory as the visitor nears the end */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background: "radial-gradient(circle at 50% 55%, transparent 20%, #F6EFE2 100%)",
            opacity: Math.min(1, progress * 1.4),
          }}
        />

        {petals.map((p, i) => (
          <span
            key={i}
            className="pointer-events-none absolute top-[-5%] h-2 w-2 rounded-full bg-ember/60"
            style={{
              left: `${p.left}%`,
              animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
            }}
          />
        ))}
        <style>{`
          @keyframes petal-fall {
            0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
            10% { opacity: 0.7; }
            100% { transform: translate(40px, 110vh) rotate(200deg); opacity: 0; }
          }
        `}</style>

        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
          {LINES.map((line, i) => (
            <RevealLine key={line} delay={i * 0.2} className="story-line text-3xl text-maroonDeep md:text-5xl" as="p">
              <span
                style={{
                  color: progress > 0.55 ? "#2A0B12" : "#F6EFE2",
                  transition: "color 0.6s ease",
                }}
              >
                {line}
              </span>
            </RevealLine>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-8 flex items-center gap-3 font-display text-3xl italic md:text-4xl"
            style={{ color: progress > 0.55 ? "#4A1420" : "#E8C877" }}
          >
            <span>{wedding.groom.name}</span>
            <span className="text-ember">❤</span>
            <span>{wedding.bride.name}</span>
          </motion.div>

          <RevealLine delay={1.1} className="mt-2 font-body text-sm tracking-wide text-mist md:text-base">
            <span style={{ color: progress > 0.55 ? "#8A7768" : "#8A7768" }}>Our forever starts here.</span>
          </RevealLine>
        </div>
      </div>
    </section>
  );
}
