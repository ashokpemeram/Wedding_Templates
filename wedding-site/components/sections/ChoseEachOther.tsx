"use client";

import dynamic from "next/dynamic";
import { useSectionProgress } from "@/lib/useSectionProgress";
import { RevealLine } from "@/components/ui/RevealLine";

const ChosenLightsScene = dynamic(
  () => import("@/components/three/ChosenLightsScene").then((m) => m.ChosenLightsScene),
  { ssr: false }
);
const SceneCanvas = dynamic(() => import("@/components/three/SceneCanvas").then((m) => m.SceneCanvas), {
  ssr: false,
});

export function ChoseEachOther() {
  const { ref, progress } = useSectionProgress();

  return (
    <section ref={ref} className="relative h-[300vh] bg-ink">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <SceneCanvas camera={{ position: [0, 0, 6], fov: 50 }}>
            <ChosenLightsScene progress={progress} />
          </SceneCanvas>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink/70" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
          <RevealLine className="story-line text-xl italic text-mist md:text-2xl">Through every storm…</RevealLine>
          <RevealLine delay={0.3} className="story-line text-3xl text-goldBright md:text-5xl">
            …they still chose each other.
          </RevealLine>
          <div className="mt-6 flex flex-col items-center gap-1 font-display text-lg italic text-jasmine/80 md:text-xl">
            <span>Again.</span>
            <span>And again.</span>
            <span>And again.</span>
          </div>
          <RevealLine delay={0.5} className="story-line mt-6 text-4xl text-ember md:text-6xl">
            Together.
          </RevealLine>
        </div>
      </div>
    </section>
  );
}
