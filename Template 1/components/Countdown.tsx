'use client';

import { wedding } from '@/data/wedding';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GoldDivider from '@/components/ui/GoldDivider';
import SectionReveal from '@/components/ui/SectionReveal';
import { TopOrnament } from '@/components/ui/OrnamentalBorder';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const targetDate = new Date(wedding.weddingDate).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft?.days },
    { label: 'Hours', value: timeLeft?.hours },
    { label: 'Minutes', value: timeLeft?.minutes },
    { label: 'Seconds', value: timeLeft?.seconds },
  ];

  return (
    <section className="bg-maroon-dark relative overflow-hidden py-20 sm:py-28 section-padding">
      {/* Decorative Jasmine left */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block opacity-20 pointer-events-none">
        <svg width="150" height="400" viewBox="0 0 150 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-50 50 Q 50 100 0 200 T 50 350" stroke="#C9A227" strokeWidth="2" fill="none" />
          <circle cx="50" cy="100" r="15" fill="#FFF8E7" opacity="0.8" />
          <circle cx="20" cy="250" r="20" fill="#FFF8E7" opacity="0.8" />
          <circle cx="40" cy="320" r="12" fill="#FFF8E7" opacity="0.8" />
        </svg>
      </div>
      
      {/* Decorative Jasmine right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block opacity-20 pointer-events-none">
        <svg width="150" height="400" viewBox="0 0 150 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M200 50 Q 100 100 150 200 T 100 350" stroke="#C9A227" strokeWidth="2" fill="none" />
          <circle cx="100" cy="150" r="15" fill="#FFF8E7" opacity="0.8" />
          <circle cx="130" cy="220" r="20" fill="#FFF8E7" opacity="0.8" />
          <circle cx="110" cy="300" r="12" fill="#FFF8E7" opacity="0.8" />
        </svg>
      </div>

      <SectionReveal className="relative z-10 flex flex-col items-center max-w-5xl mx-auto text-center px-4">
        <TopOrnament className="mb-6 text-gold opacity-80" />
        
        <h2 className="font-cormorant text-4xl sm:text-5xl text-cream font-light tracking-wedding uppercase mb-4">
          The Big Day
        </h2>
        
        <p className="font-lora text-gold/70 text-sm sm:text-base italic mb-8">
          Counting down to forever
        </p>
        
        <GoldDivider variant="ornate" className="my-8" />
        
        <div className="flex flex-row flex-wrap gap-4 sm:gap-8 justify-center mt-6">
          {timeUnits.map((unit, idx) => (
            <div 
              key={unit.label} 
              className="relative border border-gold/40 gold-border-subtle bg-maroon/60 backdrop-blur-sm px-5 sm:px-8 py-5 sm:py-8 w-[100px] sm:w-[140px] flex flex-col items-center justify-center"
            >
              {/* Corner Dots */}
              <div className="absolute top-1 left-1 w-1 h-1 bg-gold/60 rounded-full" />
              <div className="absolute top-1 right-1 w-1 h-1 bg-gold/60 rounded-full" />
              <div className="absolute bottom-1 left-1 w-1 h-1 bg-gold/60 rounded-full" />
              <div className="absolute bottom-1 right-1 w-1 h-1 bg-gold/60 rounded-full" />
              
              <div className="font-cormorant text-5xl sm:text-7xl text-gold font-light leading-none h-[60px] sm:h-[80px] overflow-hidden flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={hasMounted && unit.value !== undefined ? unit.value : 'empty'}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="inline-block"
                  >
                    {!hasMounted || unit.value === undefined
                      ? '—'
                      : unit.value.toString().padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
              </div>
              
              <span className="font-lora text-cream/50 text-xs tracking-widest uppercase mt-2 sm:mt-4">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
