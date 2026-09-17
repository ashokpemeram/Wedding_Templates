'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── FlowerPetals ────────────────────────────────────────────────
// Reusable floating flower petal animation component.
// Uses CSS animations for performance; no Canvas needed.
// Automatically respects prefers-reduced-motion.

interface Petal {
  id: number
  left: number       // vw percentage
  size: number       // px
  duration: number   // s
  delay: number      // s
  drift: number      // px (horizontal drift)
  spin: number       // deg
  color: 'gold' | 'cream' | 'rose' | 'orange'
}

const COLORS = {
  gold: '#E5C76B',
  cream: '#FFF0CC',
  rose: '#FFDDD6',
  orange: '#FFBB66',
}

const COLOR_KEYS: Petal['color'][] = ['gold', 'cream', 'rose', 'orange']

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function generatePetal(id: number): Petal {
  return {
    id,
    left: randomBetween(0, 100),
    size: randomBetween(8, 20),
    duration: randomBetween(7, 14),
    delay: randomBetween(0, 8),
    drift: randomBetween(-80, 80),
    spin: randomBetween(180, 540),
    color: COLOR_KEYS[Math.floor(Math.random() * COLOR_KEYS.length)],
  }
}

interface FlowerPetalsProps {
  count?: number
  className?: string
}

export default function FlowerPetals({ count = 12, className = '' }: FlowerPetalsProps) {
  const [petals, setPetals] = useState<Petal[]>([])
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (prefersReduced) return
    const initial = Array.from({ length: count }, (_, i) => generatePetal(i))
    setPetals(initial)
  }, [count, prefersReduced])

  if (prefersReduced || petals.length === 0) return null

  return (
    <div
      className={`petals-layer ${className}`}
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          style={{
            position: 'absolute',
            left: `${petal.left}%`,
            top: '-20px',
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            animation: `floatPetal ${petal.duration}s ${petal.delay}s linear infinite`,
            '--drift': `${petal.drift}px`,
            '--spin': `${petal.spin}deg`,
          } as React.CSSProperties}
        >
          <PetalShape color={COLORS[petal.color]} size={petal.size} />
        </div>
      ))}
    </div>
  )
}

function PetalShape({ color, size }: { color: string; size: number }) {
  // Alternate between petal shapes
  const type = Math.floor(Math.random() * 3)

  if (type === 0) {
    // Teardrop / jasmine petal
    return (
      <svg viewBox="0 0 20 30" width={size} height={size * 1.5} aria-hidden="true">
        <path
          d="M10 2 C16 8, 18 16, 10 28 C2 16, 4 8, 10 2 Z"
          fill={color}
          opacity="0.75"
        />
      </svg>
    )
  }

  if (type === 1) {
    // Round marigold petal
    return (
      <svg viewBox="0 0 20 20" width={size} height={size} aria-hidden="true">
        <ellipse cx="10" cy="10" rx="8" ry="6" fill={color} opacity="0.7" />
      </svg>
    )
  }

  // Star / tiny sparkle
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} aria-hidden="true">
      <path
        d="M10 2 L11.5 8.5 L18 10 L11.5 11.5 L10 18 L8.5 11.5 L2 10 L8.5 8.5 Z"
        fill={color}
        opacity="0.65"
      />
    </svg>
  )
}
