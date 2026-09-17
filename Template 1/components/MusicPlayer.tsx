'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, VolumeX, Volume2 } from 'lucide-react'
import { wedding } from '@/data/wedding'

// ── MusicPlayer ─────────────────────────────────────────────────
// Floating ambient music toggle.
// - HTML5 <audio> with session storage preference.
// - Respects prefers-reduced-motion for button animation.
// - Drop the wedding track at: public/music/wedding-bg.mp3

const SESSION_KEY = 'wedding-music-playing'

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  // Restore session preference after first user gesture
  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY)
    if (stored === 'true') {
      // We'll attempt play on next user interaction
      setHasInteracted(false)
    }
  }, [])

  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      sessionStorage.setItem(SESSION_KEY, 'false')
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true)
          setHasInteracted(true)
          sessionStorage.setItem(SESSION_KEY, 'true')
        })
        .catch(() => {
          // autoplay blocked — silently ignore
        })
    }
  }

  if (!wedding.music.enabled) return null

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={wedding.music.src}
        loop
        preload="none"
        aria-hidden="true"
      />

      {/* Floating button */}
      <div className="relative">
        <motion.button
          onClick={toggleMusic}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
          className="w-11 h-11 rounded-full bg-maroon border border-gold/50 flex items-center justify-center text-gold shadow-lg transition-colors hover:bg-maroon-light focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.span
                key="playing"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2 }}
              >
                <Volume2 className="w-4 h-4" />
              </motion.span>
            ) : (
              <motion.span
                key="paused"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2 }}
              >
                <VolumeX className="w-4 h-4" />
              </motion.span>
            )}
          </AnimatePresence>

          {/* Pulsing ring when playing */}
          {isPlaying && (
            <motion.span
              className="absolute inset-0 rounded-full border border-gold/40"
              animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
        </motion.button>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              className="absolute right-14 top-1/2 -translate-y-1/2 bg-brown text-cream text-xs font-lora whitespace-nowrap px-3 py-1.5 rounded pointer-events-none"
            >
              {isPlaying ? `♪ ${wedding.music.title}` : 'Play music'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
