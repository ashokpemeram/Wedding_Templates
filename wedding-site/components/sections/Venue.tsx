"use client";

import { MapPin, CalendarPlus } from "lucide-react";
import { RevealLine } from "@/components/ui/RevealLine";
import { wedding } from "@/data/wedding";

function buildCalendarUrl() {
  const start = new Date(wedding.weddingDateISO);
  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${wedding.groom.name} & ${wedding.bride.name}'s Wedding`,
    dates: `${fmt(start)}/${fmt(end)}`,
    location: wedding.venue.address,
    details: `Join us as we begin our forever. ${wedding.venue.name}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function Venue() {
  return (
    <section className="relative bg-ink px-6 py-24 md:py-32">
      <div className="mx-auto max-w-xl text-center">
        <RevealLine className="font-body text-xs uppercase tracking-wide2 text-gold">The Venue</RevealLine>
        <RevealLine delay={0.1} as="h2" className="story-line mt-3 text-3xl text-jasmine md:text-4xl">
          {wedding.venue.name}
        </RevealLine>
        <RevealLine delay={0.2} className="mt-3 font-body text-sm text-mist md:text-base">
          {wedding.venue.address}
        </RevealLine>

        <RevealLine delay={0.35} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={wedding.venue.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 font-body text-sm text-jasmine transition-colors hover:border-gold hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          >
            <MapPin className="h-4 w-4" /> Get directions
          </a>
          <a
            href={buildCalendarUrl()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-5 py-2.5 font-body text-sm text-gold transition-colors hover:bg-gold/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          >
            <CalendarPlus className="h-4 w-4" /> Add to calendar
          </a>
        </RevealLine>
      </div>
    </section>
  );
}
