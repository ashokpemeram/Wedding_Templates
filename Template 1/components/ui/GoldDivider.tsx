'use client'

// ── GoldDivider ─────────────────────────────────────────────────
// Ornamental SVG gold divider with traditional Indian motif.
// Usage: <GoldDivider />  or  <GoldDivider variant="flower" />

interface GoldDividerProps {
  variant?: 'line' | 'flower' | 'ornate'
  className?: string
}

export default function GoldDivider({ variant = 'ornate', className = '' }: GoldDividerProps) {
  if (variant === 'line') {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
        <span className="text-gold text-lg">✦</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
      </div>
    )
  }

  if (variant === 'flower') {
    return (
      <div className={`flex items-center justify-center gap-3 ${className}`}>
        <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-gold opacity-50" />
        <svg
          viewBox="0 0 60 60"
          className="w-8 h-8 text-gold opacity-80"
          fill="currentColor"
          aria-hidden="true"
        >
          {/* Lotus / flower motif */}
          <circle cx="30" cy="30" r="5" />
          {[0, 60, 120, 180, 240, 300].map((angle) => {
            const rad = (angle * Math.PI) / 180
            const x = 30 + 14 * Math.cos(rad)
            const y = 30 + 14 * Math.sin(rad)
            return (
              <ellipse
                key={angle}
                cx={x}
                cy={y}
                rx="5"
                ry="8"
                transform={`rotate(${angle}, ${x}, ${y})`}
                opacity="0.9"
              />
            )
          })}
        </svg>
        <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-gold opacity-50" />
      </div>
    )
  }

  // ornate — the default
  return (
    <div className={`flex items-center justify-center gap-2 sm:gap-4 ${className}`}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/50 to-gold/70" />
      <svg
        viewBox="0 0 160 30"
        className="w-28 sm:w-40 shrink-0 text-gold opacity-80"
        fill="none"
        aria-hidden="true"
      >
        {/* Central diamond */}
        <rect x="72" y="8" width="16" height="16" transform="rotate(45 80 16)" fill="currentColor" opacity="0.9" />
        {/* Left ornaments */}
        <circle cx="52" cy="15" r="3.5" fill="currentColor" opacity="0.7" />
        <circle cx="36" cy="15" r="2" fill="currentColor" opacity="0.5" />
        <circle cx="24" cy="15" r="1.2" fill="currentColor" opacity="0.35" />
        {/* Right ornaments */}
        <circle cx="108" cy="15" r="3.5" fill="currentColor" opacity="0.7" />
        <circle cx="124" cy="15" r="2" fill="currentColor" opacity="0.5" />
        <circle cx="136" cy="15" r="1.2" fill="currentColor" opacity="0.35" />
        {/* Left lines */}
        <line x1="8" y1="15" x2="44" y2="15" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
        {/* Right lines */}
        <line x1="116" y1="15" x2="152" y2="15" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/50 to-gold/70" />
    </div>
  )
}
