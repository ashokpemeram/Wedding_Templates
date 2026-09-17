'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// ── SectionReveal ──────────────────────────────────────────────
// Reusable scroll-triggered reveal wrapper using Framer Motion.
// Wraps children in a motion.div that fades + slides up when
// the element enters the viewport.

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  duration?: number
  once?: boolean
}

export default function SectionReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.7,
  once = true,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-80px 0px' })

  const directionMap = {
    up: { y: 30, x: 0 },
    left: { y: 0, x: -30 },
    right: { y: 0, x: 30 },
    none: { y: 0, x: 0 },
  }

  const offset = directionMap[direction]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: offset.y, x: offset.x }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── StaggerReveal ──────────────────────────────────────────────
// Reveals children with staggered animation.

interface StaggerRevealProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  once?: boolean
}

export function StaggerReveal({
  children,
  className = '',
  staggerDelay = 0.15,
  once = true,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── StaggerItem ────────────────────────────────────────────────
// Individual item to use inside <StaggerReveal>.

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 25 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease: [0.25, 0.4, 0.25, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
