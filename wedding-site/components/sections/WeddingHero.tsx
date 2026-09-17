"use client";

import { RevealLine } from "@/components/ui/RevealLine";
import { Divider } from "@/components/ui/Divider";
import { formatDate } from "@/lib/utils";
import { wedding } from "@/data/wedding";

export function WeddingHero() {
  return (
    <section className="relative overflow-hidden bg-maroonDeep px-6 py-32 text-center md:py-44">
      {/* Soft warm glow + subtle temple-pattern border frame */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(217,102,46,0.16), transparent 60%), radial-gradient(ellipse at 50% 90%, rgba(201,162,75,0.12), transparent 55%)",
        }}
      />
      <div className="pointer-events-none absolute inset-4 border border-gold/15 md:inset-8" />

      <div className="relative z-10">
        <RevealLine className="font-body text-xs uppercase tracking-wide2 text-gold">The Wedding</RevealLine>

        <RevealLine delay={0.15} as="h1" className="story-line mt-6 text-5xl text-jasmine md:text-7xl">
          {wedding.groom.name}
        </RevealLine>
        <RevealLine delay={0.3} className="my-3 font-display text-2xl italic text-ember md:text-3xl">
          &
        </RevealLine>
        <RevealLine delay={0.45} as="h1" className="story-line text-5xl text-jasmine md:text-7xl">
          {wedding.bride.name}
        </RevealLine>

        <RevealLine delay={0.65}>
          <Divider className="my-8" />
        </RevealLine>

        <RevealLine delay={0.75} className="font-body text-sm tracking-wide text-mist md:text-base">
          {formatDate(wedding.weddingDateISO)}
        </RevealLine>
      </div>
    </section>
  );
}
