"use client";

import dynamic from "next/dynamic";
import { useSectionProgress } from "@/lib/useSectionProgress";
import { RevealLine } from "@/components/ui/RevealLine";
import { wedding } from "@/data/wedding";

const TwoPathsScene = dynamic(() => import("@/components/three/TwoPathsScene").then((m) => m.TwoPathsScene), {
  ssr: false,
});
const SceneCanvas = dynamic(() => import("@/components/three/SceneCanvas").then((m) => m.SceneCanvas), {
  ssr: false,
});

export function TwoWorlds() {
  const { ref, progress } = useSectionProgress();

  return (
    <section ref={ref} className="relative h-[280vh] bg-ink">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <SceneCanvas camera={{ position: [0, 0.6, 9], fov: 48 }}>
            <TwoPathsScene progress={Math.min(progress, 1) * 0.55} />
          </SceneCanvas>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink/80" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <RevealLine as="h2" className="story-line text-3xl text-jasmine md:text-5xl">
            Two lives, moving in parallel.
          </RevealLine>
          <p className="mt-4 max-w-md font-body text-sm text-mist md:text-base">
            Neither knew the other existed yet. Their worlds were simply
            unfolding, one ordinary day at a time.
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 grid grid-cols-2 gap-4 px-6 pb-10 text-xs md:px-16 md:pb-16 md:text-sm">
          <MilestoneColumn label={wedding.groom.name} items={wedding.groom.milestones} align="left" />
          <MilestoneColumn label={wedding.bride.name} items={wedding.bride.milestones} align="right" />
        </div>
      </div>
    </section>
  );
}

function MilestoneColumn({
  label,
  items,
  align,
}: {
  label: string;
  items: readonly string[];
  align: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <p className="mb-2 font-display text-base italic text-gold md:text-lg">{label}</p>
      <ul className="space-y-1 text-mist">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
