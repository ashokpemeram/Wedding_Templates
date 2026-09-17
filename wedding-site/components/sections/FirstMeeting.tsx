"use client";

import dynamic from "next/dynamic";
import { useSectionProgress } from "@/lib/useSectionProgress";
import { RevealLine } from "@/components/ui/RevealLine";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { wedding } from "@/data/wedding";

const TwoPathsScene = dynamic(() => import("@/components/three/TwoPathsScene").then((m) => m.TwoPathsScene), {
  ssr: false,
});
const SceneCanvas = dynamic(() => import("@/components/three/SceneCanvas").then((m) => m.SceneCanvas), {
  ssr: false,
});

export function FirstMeeting() {
  const { ref, progress } = useSectionProgress();
  const meeting = wedding.story.firstMeeting;

  return (
    <section ref={ref} className="relative h-[260vh] bg-ink">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <SceneCanvas camera={{ position: [0, 0.4, 7], fov: 48 }}>
            <TwoPathsScene progress={0.55 + Math.min(progress, 1) * 0.45} />
          </SceneCanvas>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink/90" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-8 px-6 text-center">
          <div>
            <RevealLine className="story-line text-2xl italic text-mist md:text-3xl">And then…</RevealLine>
            <RevealLine delay={0.35} className="story-line mt-1 text-4xl text-goldBright md:text-6xl">
              They met.
            </RevealLine>
          </div>

          <RevealLine delay={0.7} className="w-full max-w-3xl">
            <div className="mx-auto grid grid-cols-1 items-center gap-6 rounded-sm border border-gold/20 bg-ink/50 p-5 backdrop-blur-md md:grid-cols-[1.1fr_1fr] md:p-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
                <PlaceholderImage
                  src={meeting.image}
                  alt={`${wedding.groom.name} and ${wedding.bride.name} at their first meeting`}
                  label="First meeting photo"
                />
              </div>
              <div className="text-left">
                <p className="font-body text-[11px] uppercase tracking-wide2 text-gold">First Meeting</p>
                <p className="mt-2 font-display text-xl text-jasmine md:text-2xl">{meeting.location}</p>
                <p className="font-body text-sm text-mist">{meeting.date}</p>
                <p className="mt-3 font-body text-sm leading-relaxed text-jasmine/85">{meeting.description}</p>
              </div>
            </div>
          </RevealLine>
        </div>
      </div>
    </section>
  );
}
