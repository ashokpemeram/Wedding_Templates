"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { RevealLine } from "@/components/ui/RevealLine";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { useIsMobile } from "@/lib/useIsMobile";
import { wedding } from "@/data/wedding";

const MemoryUniverseScene = dynamic(
  () => import("@/components/three/MemoryUniverseScene").then((m) => m.MemoryUniverseScene),
  { ssr: false }
);
const SceneCanvas = dynamic(() => import("@/components/three/SceneCanvas").then((m) => m.SceneCanvas), {
  ssr: false,
});

export function MemoryUniverse() {
  const isMobile = useIsMobile();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const photos = wedding.gallery;

  return (
    <section className="relative bg-ink px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <RevealLine as="h2" className="story-line text-center text-3xl text-jasmine md:text-5xl">
          A Universe of Memories
        </RevealLine>
        <p className="mx-auto mt-3 max-w-md text-center font-body text-sm text-mist">
          {isMobile ? "Swipe through a few of their favourite moments." : "Drift through their favourite moments. Click any photo to look closer."}
        </p>

        {isMobile ? (
          <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
            {photos.map((photo, i) => (
              <button
                key={photo.src}
                onClick={() => setLightboxIndex(i)}
                className="relative aspect-[3/4] w-[68vw] flex-shrink-0 snap-center overflow-hidden rounded-sm border border-gold/15"
              >
                <PlaceholderImage src={photo.src} alt={photo.caption} label={photo.caption} />
              </button>
            ))}
          </div>
        ) : (
          <div className="relative mt-10 h-[65vh] w-full overflow-hidden rounded-sm border border-gold/15">
            <SceneCanvas camera={{ position: [0, 0, 4.5], fov: 55 }}>
              <MemoryUniverseScene photos={photos} onSelect={setLightboxIndex} />
              <pointLight position={[3, 3, 3]} intensity={0.5} color="#F4D896" />
            </SceneCanvas>
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/95 px-6"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => setLightboxIndex(null)}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold hover:border-gold"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              onClick={() => setLightboxIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length))}
              aria-label="Previous photo"
              className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold hover:border-gold md:left-8"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-sm border border-gold/25 md:max-w-lg"
            >
              <PlaceholderImage
                src={photos[lightboxIndex].src}
                alt={photos[lightboxIndex].caption}
                label={photos[lightboxIndex].caption}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-4">
                <p className="text-center font-body text-sm text-jasmine">{photos[lightboxIndex].caption}</p>
              </div>
            </motion.div>

            <button
              onClick={() => setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length))}
              aria-label="Next photo"
              className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold hover:border-gold md:right-8"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
