"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wedding } from '@/data/wedding';
import OrnamentalBorder from '@/components/ui/OrnamentalBorder';
import FlowerPetals from '@/components/FlowerPetals';

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const [openAnimation, setOpenAnimation] = useState(false);

  const handleOpen = () => {
    setOpenAnimation(true);
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-maroon-dark overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Background radial gold glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,162,39,0.12)_0%,transparent_70%)]" />

        {/* Floating petals */}
        <FlowerPetals count={10} />

        {/* Ornamental corner frames */}
        <OrnamentalBorder className="absolute inset-4 sm:inset-8 pointer-events-none" />

        {/* Skip button */}
        <button
          onClick={onComplete}
          className="absolute top-6 right-6 z-10 text-xs font-lora text-cream/40 hover:text-cream/70 transition-colors tracking-widest uppercase focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
          aria-label="Skip introduction"
        >
          Skip →
        </button>

        {/* Center Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-lg w-full">

          {/* Diya */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="mb-8"
            aria-hidden="true"
          >
            <span className="text-5xl">🪔</span>
          </motion.div>

          {/* Shubh Vivah */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-cormorant text-gold-soft text-4xl sm:text-5xl italic tracking-wedding mb-6 font-noto"
          >
            शुभ विवाह
          </motion.h1>

          {/* Thin gold line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="w-32 h-px bg-gold-soft/50 mb-8"
          />

          {/* Blessing text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="font-lora text-cream/70 text-xs sm:text-sm tracking-widest uppercase mb-10"
          >
            With the blessings of our families
          </motion.p>

          {/* Couple names */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
            className="flex flex-col items-center gap-4 mb-12"
          >
            <h2 className="font-cormorant text-gold text-3xl sm:text-4xl font-light">
              {wedding.groom.shortName}
            </h2>
            <span className="font-cormorant text-gold/60 text-xl italic" aria-hidden="true">&amp;</span>
            <h2 className="font-cormorant text-gold text-3xl sm:text-4xl font-light">
              {wedding.bride.shortName}
            </h2>
          </motion.div>

          {/* Open Invitation Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
            onClick={handleOpen}
            className="btn-gold px-8 py-3 font-lora text-sm tracking-widest uppercase relative overflow-hidden group"
            aria-label="Open the wedding invitation"
          >
            <span className="relative z-10">Open Invitation</span>
            <div className="absolute inset-0 bg-gold/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
          </motion.button>
        </div>

        {/* Gold light expansion on click */}
        <AnimatePresence>
          {openAnimation && (
            <motion.div
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 25, opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute z-50 w-32 h-32 bg-gold/30 rounded-full blur-2xl pointer-events-none"
              aria-hidden="true"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
