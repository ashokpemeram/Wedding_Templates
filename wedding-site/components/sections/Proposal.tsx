"use client";

import dynamic from "next/dynamic";
import { RevealLine } from "@/components/ui/RevealLine";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { wedding } from "@/data/wedding";

const ForeverRing = dynamic(() => import("@/components/three/ForeverRing").then((m) => m.ForeverRing), {
  ssr: false,
});
const SceneCanvas = dynamic(() => import("@/components/three/SceneCanvas").then((m) => m.SceneCanvas), {
  ssr: false,
});

export function Proposal() {
  const proposal = wedding.story.proposal;

  return (
    <section className="relative overflow-hidden bg-ink px-6 py-28 md:py-40">
      <div className="mx-auto max-w-3xl text-center">
        <RevealLine className="story-line text-xl italic text-mist md:text-2xl">After everything…</RevealLine>
        <RevealLine delay={0.3} className="story-line mt-1 text-2xl text-jasmine md:text-3xl">
          there was only one question left.
        </RevealLine>

        <div className="relative mx-auto mt-10 h-[38vh] w-full max-w-sm md:h-[46vh]">
          <SceneCanvas camera={{ position: [0, 0.6, 4], fov: 42 }}>
            <ForeverRing size={1.3} />
            <pointLight position={[2, 2, 2]} intensity={0.7} color="#F4D896" />
          </SceneCanvas>
        </div>

        <RevealLine delay={0.2} className="story-line -mt-4 text-3xl text-goldBright md:text-5xl">
          "Will you walk with me forever?"
        </RevealLine>

        <RevealLine delay={0.4} className="mx-auto mt-12 max-w-lg">
          <div className="grid grid-cols-1 gap-5 rounded-sm border border-gold/15 bg-maroon/10 p-5 text-left md:grid-cols-[0.9fr_1.1fr] md:p-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
              <PlaceholderImage src={proposal.image} alt="The proposal" label="Proposal photo" />
            </div>
            <div>
              <p className="font-body text-[11px] uppercase tracking-wide2 text-gold">The Proposal</p>
              <p className="mt-1 font-display text-xl text-jasmine">{proposal.location}</p>
              <p className="font-body text-sm text-mist">{proposal.date}</p>
              <p className="mt-3 font-body text-sm leading-relaxed text-jasmine/85">{proposal.description}</p>
            </div>
          </div>
        </RevealLine>
      </div>
    </section>
  );
}
