'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import Intro from '@/components/Intro'
import Hero from '@/components/Hero'
import Countdown from '@/components/Countdown'
import Story from '@/components/Story'
import Events from '@/components/Events'
import Gallery from '@/components/Gallery'
import Family from '@/components/Family'
import Venue from '@/components/Venue'
import RSVP from '@/components/RSVP'
import Closing from '@/components/Closing'
import FloatingControls from '@/components/FloatingControls'

export default function HomePage() {
  const [introComplete, setIntroComplete] = useState(false)
  const [showMain, setShowMain] = useState(false)

  // Check if intro has been seen this session (skip on revisit)
  useEffect(() => {
    const seen = sessionStorage.getItem('wedding-intro-seen')
    if (seen === 'true') {
      setIntroComplete(true)
      setShowMain(true)
    }
  }, [])

  const handleIntroComplete = () => {
    sessionStorage.setItem('wedding-intro-seen', 'true')
    setIntroComplete(true)
    // Small delay so the intro exit animation can play
    setTimeout(() => setShowMain(true), 400)
  }

  return (
    <>
      {/* ── Opening Intro ─────────────────────────────────────────── */}
      <AnimatePresence>
        {!introComplete && (
          <motion.div
            key="intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50"
          >
            <Intro onComplete={handleIntroComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Website ──────────────────────────────────────────── */}
      <AnimatePresence>
        {showMain && (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* 1. Hero */}
            <section id="home">
              <Hero />
            </section>

            {/* 2. Countdown */}
            <section id="countdown">
              <Countdown />
            </section>

            {/* 3. Our Story */}
            <section id="story">
              <Story />
            </section>

            {/* 4. Events */}
            <section id="events">
              <Events />
            </section>

            {/* 5. Gallery */}
            <section id="gallery">
              <Gallery />
            </section>

            {/* 6. Family */}
            <section id="family">
              <Family />
            </section>

            {/* 7. Venue */}
            <section id="venue">
              <Venue />
            </section>

            {/* 8. RSVP */}
            <section id="rsvp">
              <RSVP />
            </section>

            {/* 9. Closing */}
            <section id="closing">
              <Closing />
            </section>

            {/* ── Floating Controls (mobile FAB) ─────────────────── */}
            <FloatingControls />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  )
}
