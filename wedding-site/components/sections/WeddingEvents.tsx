"use client";

import { RevealLine } from "@/components/ui/RevealLine";
import { Divider } from "@/components/ui/Divider";
import { wedding } from "@/data/wedding";

export function WeddingEvents() {
  return (
    <section className="relative bg-maroonDeep px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl">
        <RevealLine as="h2" className="story-line text-center text-3xl text-jasmine md:text-4xl">
          The Celebrations
        </RevealLine>
        <Divider className="my-8" />

        <div className="divide-y divide-gold/10">
          {wedding.events.map((event, i) => (
            <RevealLine key={event.name} delay={i * 0.08} className="grid grid-cols-1 gap-2 py-7 md:grid-cols-[1fr_2fr] md:gap-8">
              <div>
                <p className="font-display text-2xl italic text-gold">{event.name}</p>
                <p className="mt-1 font-body text-sm text-mist">{event.date}</p>
                <p className="font-body text-sm text-mist">{event.time}</p>
              </div>
              <div>
                <p className="font-body text-sm font-medium text-jasmine">{event.venue}</p>
                <p className="mt-1 font-body text-sm leading-relaxed text-jasmine/75">{event.description}</p>
              </div>
            </RevealLine>
          ))}
        </div>
      </div>
    </section>
  );
}
