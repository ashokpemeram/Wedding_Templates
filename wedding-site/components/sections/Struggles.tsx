"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealLine } from "@/components/ui/RevealLine";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useIsMobile } from "@/lib/useIsMobile";
import { wedding } from "@/data/wedding";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Struggles() {
  const sectionRef = useRef<HTMLElement>(null);
  const rainRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const drops = useMemo(() => {
    const count = isMobile ? 26 : 60;
    return Array.from({ length: count }, (_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 2.4,
      duration: 1.1 + Math.random() * 0.9,
      opacity: 0.15 + Math.random() * 0.35,
    }));
  }, [isMobile]);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !rainRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rainRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 10%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-b from-ink via-[#0D0708] to-ink px-6 py-32 md:py-44">
      {!reducedMotion && (
        <div ref={rainRef} className="pointer-events-none absolute inset-0 opacity-0" aria-hidden="true">
          {drops.map((d, i) => (
            <span
              key={i}
              className="absolute top-[-10%] w-px bg-gradient-to-b from-transparent via-mist/40 to-transparent"
              style={{
                left: `${d.left}%`,
                height: "14vh",
                opacity: d.opacity,
                animation: `rainfall ${d.duration}s linear ${d.delay}s infinite`,
              }}
            />
          ))}
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(20,10,13,0.7) 100%)" }}
          />
        </div>
      )}

      <style>{`
        @keyframes rainfall {
          0% { transform: translateY(0); }
          100% { transform: translateY(120vh); }
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <RevealLine className="story-line text-2xl text-jasmine/90 md:text-4xl">
          But every real love story has its storms.
        </RevealLine>

        <div className="mx-auto mt-14 max-w-lg space-y-6 text-left">
          {wedding.story.struggles.map((s, i) => (
            <RevealLine key={s} delay={i * 0.12} className="border-l border-mist/30 pl-5 font-body text-base italic text-mist md:text-lg">
              {s}
            </RevealLine>
          ))}
        </div>
      </div>
    </section>
  );
}
