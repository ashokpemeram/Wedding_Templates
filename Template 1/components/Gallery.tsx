'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { wedding } from '@/data/wedding';
import GoldDivider from '@/components/ui/GoldDivider';
import SectionReveal from '@/components/ui/SectionReveal';

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) => 
      prev !== null ? (prev === 0 ? wedding.gallery.length - 1 : prev - 1) : null
    );
  }, []);

  const handleNext = useCallback(() => {
    setLightboxIndex((prev) => 
      prev !== null ? (prev === wedding.gallery.length - 1 ? 0 : prev + 1) : null
    );
  }, []);

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') handleClose();
    };
    
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, handlePrev, handleNext, handleClose]);

  return (
    <section className="bg-maroon-dark section-padding relative" id="gallery">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <SectionReveal>
          <div className="text-center mb-12">
            <h2 className="font-cormorant text-4xl sm:text-5xl text-cream font-light tracking-wedding mt-6 uppercase">
              Memories
            </h2>
            <p className="font-lora text-gold/60 italic text-sm mt-3">
              A glimpse into our journey
            </p>
            <div className="flex justify-center my-10">
              <GoldDivider />
            </div>
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {wedding.gallery.map((item, index) => {
              const isOdd = index % 2 !== 0;
              const aspectClass = isOdd ? 'aspect-[3/4]' : (index % 3 === 0 ? 'aspect-square' : 'aspect-[4/3]');
              const gradientClass = `bg-gradient-to-br from-maroon to-brown`;
              
              return (
                <button
                  key={item.id || index}
                  className={`w-full relative overflow-hidden block break-inside-avoid border border-gold/10 hover:border-gold/50 transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-gold ${aspectClass}`}
                  onClick={() => setLightboxIndex(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  aria-label={`View image ${index + 1}`}
                >
                  <motion.div
                    className={`w-full h-full flex items-center justify-center ${gradientClass}`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    {item.src ? (
                      <img 
                        src={item.src} 
                        alt={item.alt || `Gallery image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-cream/60 text-xs px-4 text-center font-lora italic">
                        {item.alt || 'Beautiful Memory'}
                      </div>
                    )}
                    
                    {/* Hover Overlay */}
                    <motion.div 
                      className={`absolute inset-0 bg-maroon-dark/40 flex items-center justify-center transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <span className="text-gold/80 text-sm tracking-widest uppercase font-cormorant border border-gold/30 px-4 py-2 backdrop-blur-sm">View</span>
                    </motion.div>
                  </motion.div>
                </button>
              );
            })}
          </div>
        </SectionReveal>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-maroon-dark/95 backdrop-blur-md"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 z-50 p-2 text-cream/70 hover:text-gold transition-colors focus:outline-none"
              aria-label="Close gallery"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 z-50 p-2 text-cream/70 hover:text-gold transition-colors focus:outline-none hidden sm:block"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 z-50 p-2 text-cream/70 hover:text-gold transition-colors focus:outline-none hidden sm:block"
              aria-label="Next image"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            {/* Main Image Container */}
            <div className="w-full max-w-5xl max-h-[80vh] px-4 md:px-16 flex flex-col items-center justify-center relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-h-[70vh] flex items-center justify-center"
                >
                  {wedding.gallery[lightboxIndex].src ? (
                    <img
                      src={wedding.gallery[lightboxIndex].src}
                      alt={wedding.gallery[lightboxIndex].alt || `Gallery image ${lightboxIndex + 1}`}
                      className="max-w-full max-h-[70vh] object-contain border border-gold/20 shadow-2xl"
                    />
                  ) : (
                    <div className="w-full md:w-3/4 aspect-[4/3] bg-gradient-to-br from-maroon to-brown border border-gold/20 flex items-center justify-center shadow-2xl">
                       <span className="text-gold/60 text-lg font-cormorant italic px-8 text-center">
                         {wedding.gallery[lightboxIndex].alt || 'A beautiful captured moment'}
                       </span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Caption & Counter */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center"
              >
                <p className="text-cream font-lora italic text-lg mb-2">
                  {wedding.gallery[lightboxIndex].alt || 'Gallery Image'}
                </p>
                <p className="text-gold/50 text-sm font-cormorant tracking-widest">
                  {lightboxIndex + 1} / {wedding.gallery.length}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
