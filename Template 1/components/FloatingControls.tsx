'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Mail, X, Plus } from 'lucide-react'
import MusicPlayer from '@/components/MusicPlayer'
import { wedding } from '@/data/wedding'

// ── FloatingControls ────────────────────────────────────────────
// Mobile-first floating action button cluster.
// Shows: 🎵 Music · 📍 Venue · 💌 RSVP
// Expands on tap, collapses when any action is taken or backdrop tapped.

interface FloatingControlsProps {
  onRsvpClick?: () => void
}

export default function FloatingControls({ onRsvpClick }: FloatingControlsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleVenue = () => {
    setIsOpen(false)
    window.open(wedding.venue.mapsUrl, '_blank', 'noopener,noreferrer')
  }

  const handleRsvp = () => {
    setIsOpen(false)
    if (onRsvpClick) {
      onRsvpClick()
    } else {
      const el = document.getElementById('rsvp')
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const actions = [
    {
      label: 'RSVP',
      icon: <Mail className="w-4 h-4" />,
      onClick: handleRsvp,
      ariaLabel: 'Go to RSVP section',
      color: 'bg-maroon border-gold/50',
    },
    {
      label: 'Venue',
      icon: <MapPin className="w-4 h-4" />,
      onClick: handleVenue,
      ariaLabel: 'Open venue in Google Maps',
      color: 'bg-maroon border-gold/50',
    },
  ]

  return (
    <div
      className="fixed bottom-6 right-4 z-40 flex flex-col items-end gap-3"
      role="region"
      aria-label="Quick actions"
    >
      {/* Expanded action buttons */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Music player */}
            <motion.div
              key="music"
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ duration: 0.2, delay: 0 }}
              className="flex items-center gap-2"
            >
              <span className="bg-brown/80 text-cream/70 text-xs font-lora px-2 py-1 rounded">
                Music
              </span>
              <MusicPlayer />
            </motion.div>

            {actions.map((action, i) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ duration: 0.2, delay: (i + 1) * 0.06 }}
                className="flex items-center gap-2"
              >
                <span className="bg-brown/80 text-cream/70 text-xs font-lora px-2 py-1 rounded">
                  {action.label}
                </span>
                <button
                  onClick={action.onClick}
                  aria-label={action.ariaLabel}
                  className={`w-11 h-11 rounded-full ${action.color} border flex items-center justify-center text-gold shadow-lg transition-colors hover:bg-maroon-light focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2`}
                >
                  {action.icon}
                </button>
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Backdrop (tap to close) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 -z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Main toggle button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close quick actions' : 'Open quick actions'}
        aria-expanded={isOpen}
        className="w-13 h-13 w-[52px] h-[52px] rounded-full bg-gold border-2 border-gold-dark flex items-center justify-center text-maroon-dark shadow-xl transition-colors hover:bg-gold-soft focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <Plus className="w-5 h-5" strokeWidth={2.5} />
        </motion.div>
      </motion.button>
    </div>
  )
}
