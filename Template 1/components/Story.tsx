'use client';

import { wedding } from '@/data/wedding';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import GoldDivider from '@/components/ui/GoldDivider';
import SectionReveal from '@/components/ui/SectionReveal';
import { TopOrnament } from '@/components/ui/OrnamentalBorder';

export default function Story() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px 0px" });

  return (
    <section className="bg-cream-warm py-20 sm:py-28 section-padding relative overflow-hidden">
      <SectionReveal className="text-center max-w-4xl mx-auto px-4 mb-16">
        <TopOrnament className="mb-6 text-maroon opacity-80" />
        <h2 className="font-cormorant text-4xl sm:text-5xl text-maroon font-light tracking-wedding uppercase mb-4">
          Our Story
        </h2>
        <p className="font-lora text-brown/60 text-sm sm:text-base italic">
          "Every love story is beautiful, but ours is our favorite."
        </p>
        <GoldDivider className="my-10" />
      </SectionReveal>

      <div ref={containerRef} className="relative max-w-5xl mx-auto px-4 sm:px-8">
        {/* Central Vertical Line Desktop / Left Line Mobile */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-maroon/10 md:-translate-x-1/2 overflow-hidden">
          <motion.div 
            className="w-full h-full bg-gradient-to-b from-maroon/10 via-gold/50 to-maroon/10"
            initial={{ y: "-100%" }}
            animate={isInView ? { y: 0 } : { y: "-100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 flex flex-col gap-12 sm:gap-20">
          {wedding.story.map((item, index) => {
            const isEven = index % 2 === 0;
            const direction = isEven ? 'left' : 'right';

            return (
              <SectionReveal 
                key={index} 
                direction={direction} 
                delay={index * 0.2}
                className={`relative flex flex-col md:flex-row w-full ${isEven ? 'md:justify-start' : 'md:justify-end'} pl-16 md:pl-0`}
              >
                {/* Gold Diamond Node */}
                <div className="absolute left-0 md:left-1/2 top-0 md:top-8 w-4 h-4 bg-maroon border-2 border-gold rotate-45 -translate-x-[7px] md:-translate-x-1/2 z-20" />
                
                {/* Step Number Background */}
                <div className={`absolute top-0 ${isEven ? 'md:right-4' : 'md:left-4'} hidden md:block opacity-30 pointer-events-none select-none z-0`}>
                  <span className="font-cormorant text-gold/30 text-8xl md:text-9xl font-light">
                    0{index + 1}
                  </span>
                </div>

                <div className={`w-full md:w-5/12 bg-cream p-6 sm:p-8 shadow-sm border border-gold-border-subtle relative z-10 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                  
                  {item.image ? (
                    <div className="w-full h-[200px] mb-6 img-placeholder bg-maroon/5 flex items-center justify-center">
                      <span className="font-lora text-brown/50 text-sm">Wedding Photo</span>
                    </div>
                  ) : null}

                  <h3 className="font-cormorant text-2xl sm:text-3xl text-maroon mb-2">
                    {item.title}
                  </h3>
                  
                  <span className="block font-lora text-gold text-sm italic mb-4">
                    {item.subtitle}
                  </span>
                  
                  <p className="font-lora text-brown/70 text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
