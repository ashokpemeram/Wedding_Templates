"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { RevealLine } from "@/components/ui/RevealLine";
import { wedding } from "@/data/wedding";

const ForeverRing = dynamic(() => import("@/components/three/ForeverRing").then((m) => m.ForeverRing), {
  ssr: false,
});
const SceneCanvas = dynamic(() => import("@/components/three/SceneCanvas").then((m) => m.SceneCanvas), {
  ssr: false,
});

function getTimeLeft() {
  const diff = new Date(wedding.weddingDateISO).getTime() - Date.now();
  const clamped = Math.max(0, diff);
  return {
    days: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    hours: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((clamped / (1000 * 60)) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  };
}

export function Countdown() {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-maroonDeep to-ink px-6 py-28 md:py-36">
      <div className="mx-auto max-w-3xl text-center">
        <RevealLine as="h2" className="story-line text-3xl text-jasmine md:text-4xl">
          Until Forever
        </RevealLine>

        <div className="relative mx-auto mt-10 h-[44vh] w-full max-w-md md:h-[52vh]">
          <SceneCanvas camera={{ position: [0, 0.4, 4.2], fov: 42 }}>
            <ForeverRing size={1.5} />
            <pointLight position={[2, 2, 2]} intensity={0.7} color="#F4D896" />
          </SceneCanvas>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-4 gap-3 md:gap-6" suppressHydrationWarning>
              {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
                <div key={unit} className="text-center">
                  <p className="font-display text-3xl text-jasmine md:text-5xl" suppressHydrationWarning>
                    {time ? String(time[unit]).padStart(2, "0") : "--"}
                  </p>
                  <p className="mt-1 font-body text-[10px] uppercase tracking-wide2 text-gold md:text-xs">
                    {unit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
