"use client";

import dynamic from "next/dynamic";
import { useSectionProgress } from "@/lib/useSectionProgress";
import { RevealLine } from "@/components/ui/RevealLine";

const TwoPathsScene = dynamic(() => import("@/components/three/TwoPathsScene").then((m) => m.TwoPathsScene), {
  ssr: false,
});
const SceneCanvas = dynamic(() => import("@/components/three/SceneCanvas").then((m) => m.SceneCanvas), {
  ssr: false,
});

const LINES = ["Two hearts became one.", "Two families became one.", "One future begins."];

export function FamiliesUnite() {
  const { ref, progress } = useSectionProgress();

  return (
    <section ref={ref} className="relative h-[260vh] bg-gradient-to-b from-ink to-maroonDeep">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <SceneCanvas camera={{ position: [0, 0.5, 8], fov: 46 }}>
            <TwoPathsScene progress={1} showFamilies color="#E8C877" />
          </SceneCanvas>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-maroonDeep/80" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
          {LINES.map((line, i) => {
            const threshold = i / LINES.length;
            const active = progress >= threshold;
            return (
              <p
                key={line}
                className="story-line text-2xl transition-all duration-700 md:text-4xl"
                style={{
                  opacity: active ? 1 : 0.15,
                  color: active ? "#F6EFE2" : "#8A7768",
                  transform: active ? "translateY(0)" : "translateY(8px)",
                }}
              >
                {line}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
}
