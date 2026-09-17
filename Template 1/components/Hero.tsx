"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { wedding } from '@/data/wedding';
import GoldDivider from '@/components/ui/GoldDivider';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-maroon-dark">
      {/* Background with Ken Burns zoom effect */}
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-br from-maroon-dark via-maroon to-brown"
        animate={{ scale: [1.05, 1.12] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        aria-hidden="true"
      >
        {/* Subtle repeating texture overlay */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201,162,39,0.4) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-maroon-dark/60 via-maroon/40 to-brown/80" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto w-full">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-lora tracking-ceremony text-cream/60 text-xs sm:text-sm uppercase mb-8"
        >
          Together with their families
        </motion.p>

        {/* Animated gold line */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 120, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-12"
        />

        {/* Couple names */}
        <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="font-cormorant text-5xl sm:text-7xl lg:text-8xl text-cream font-light italic"
          >
            {wedding.groom.shortName}
          </motion.h1>

          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="font-cormorant text-gold text-2xl italic"
            aria-hidden="true"
          >
            &amp;
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="font-cormorant text-5xl sm:text-7xl lg:text-8xl text-cream font-light italic"
          >
            {wedding.bride.shortName}
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="font-lora text-cream/60 text-xs sm:text-sm tracking-[0.2em] uppercase mb-10"
        >
          Are beginning a beautiful journey together
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2.1 }}
          className="mb-10"
        >
          <GoldDivider />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.4 }}
          className="flex flex-col items-center gap-5"
        >
          <p className="font-cormorant text-gold text-2xl sm:text-3xl tracking-wedding">
            {wedding.weddingDateDisplay}
          </p>

          <div className="border border-gold/30 px-6 py-2">
            <span className="font-lora text-cream/50 text-xs tracking-ceremony uppercase">
              Save the Date
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-lora text-cream/40 text-xs tracking-widest uppercase">
          Scroll to discover our story
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-cream/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
