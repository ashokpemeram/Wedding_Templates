'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { wedding } from '@/data/wedding';
import GoldDivider from '@/components/ui/GoldDivider';
import { StaggerReveal, StaggerItem } from '@/components/ui/SectionReveal';
import { TopOrnament } from '@/components/ui/OrnamentalBorder';
import OrnamentalBorder from '@/components/ui/OrnamentalBorder';

export default function Events() {
  return (
    <section className="bg-cream section-padding relative overflow-hidden" id="events">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <TopOrnament />
          <h2 className="font-cormorant text-4xl sm:text-5xl text-maroon font-light tracking-wedding mt-6 uppercase">
            The Celebrations
          </h2>
          <p className="font-lora text-brown/50 italic text-sm mt-3">
            Four sacred moments, one beautiful journey
          </p>
          <div className="flex justify-center my-10">
            <GoldDivider />
          </div>
        </div>

        <StaggerReveal className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {wedding.events.map((event, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="relative border border-gold/30 bg-cream-warm p-8 sm:p-10 h-full flex flex-col group transition-colors duration-500 hover:border-gold"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <OrnamentalBorder size="sm" />
                <div className="flex flex-col h-full relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl" aria-hidden="true">{event.icon}</span>
                    <div>
                      <h3 className="font-cormorant text-2xl sm:text-3xl text-maroon font-light tracking-wedding uppercase">
                        {event.name}
                      </h3>
                      {event.teluguName && (
                        <p className="font-noto text-gold/60 text-sm mt-1">{event.teluguName}</p>
                      )}
                    </div>
                  </div>

                  <div className="w-full h-px bg-gold/20 my-4" />

                  <div className="space-y-4 flex-grow">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-gold/60 mt-0.5 shrink-0" aria-hidden="true" />
                      <p className="font-lora text-brown text-sm">{event.date}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-gold/60 mt-0.5 shrink-0" aria-hidden="true" />
                      <p className="font-lora text-brown text-sm">{event.time}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gold/60 mt-0.5 shrink-0" aria-hidden="true" />
                      <div>
                        <p className="font-medium text-brown text-sm">{event.venue}</p>
                        <p className="text-brown/60 text-xs mt-1">{event.address}</p>
                      </div>
                    </div>
                  </div>

                  <p className="font-lora text-brown/60 text-sm italic leading-relaxed mt-6 mb-6">
                    {event.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gold/10">
                    <span className="text-gold text-xs tracking-widest uppercase font-cormorant">
                      {event.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
