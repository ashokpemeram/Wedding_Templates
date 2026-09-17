'use client'

// ── OrnamentalBorder ────────────────────────────────────────────
// Traditional corner and border decorations using SVG.
// Adds a gold ornamental frame to any container.

interface OrnamentalBorderProps {
  className?: string
  children?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export default function OrnamentalBorder({
  children,
  className = '',
  size = 'md',
}: OrnamentalBorderProps) {
  const cornerSize = { sm: 'w-6 h-6', md: 'w-10 h-10', lg: 'w-14 h-14' }[size]

  return (
    <div className={`relative ${className}`}>
      {/* Top-left corner */}
      <svg
        className={`absolute top-0 left-0 ${cornerSize} text-gold opacity-60`}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <path d="M2 38 L2 2 L38 2" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="2" cy="2" r="2.5" fill="currentColor" opacity="0.8" />
        <path d="M8 2 L8 8 L2 8" stroke="currentColor" strokeWidth="0.7" opacity="0.6" />
        <circle cx="14" cy="2" r="1" fill="currentColor" opacity="0.5" />
        <circle cx="2" cy="14" r="1" fill="currentColor" opacity="0.5" />
      </svg>

      {/* Top-right corner */}
      <svg
        className={`absolute top-0 right-0 ${cornerSize} text-gold opacity-60`}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <path d="M38 38 L38 2 L2 2" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="38" cy="2" r="2.5" fill="currentColor" opacity="0.8" />
        <path d="M32 2 L32 8 L38 8" stroke="currentColor" strokeWidth="0.7" opacity="0.6" />
        <circle cx="26" cy="2" r="1" fill="currentColor" opacity="0.5" />
        <circle cx="38" cy="14" r="1" fill="currentColor" opacity="0.5" />
      </svg>

      {/* Bottom-left corner */}
      <svg
        className={`absolute bottom-0 left-0 ${cornerSize} text-gold opacity-60`}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <path d="M2 2 L2 38 L38 38" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="2" cy="38" r="2.5" fill="currentColor" opacity="0.8" />
        <path d="M8 38 L8 32 L2 32" stroke="currentColor" strokeWidth="0.7" opacity="0.6" />
        <circle cx="14" cy="38" r="1" fill="currentColor" opacity="0.5" />
        <circle cx="2" cy="26" r="1" fill="currentColor" opacity="0.5" />
      </svg>

      {/* Bottom-right corner */}
      <svg
        className={`absolute bottom-0 right-0 ${cornerSize} text-gold opacity-60`}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <path d="M38 2 L38 38 L2 38" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="38" cy="38" r="2.5" fill="currentColor" opacity="0.8" />
        <path d="M32 38 L32 32 L38 32" stroke="currentColor" strokeWidth="0.7" opacity="0.6" />
        <circle cx="26" cy="38" r="1" fill="currentColor" opacity="0.5" />
        <circle cx="38" cy="26" r="1" fill="currentColor" opacity="0.5" />
      </svg>

      {children}
    </div>
  )
}

// ── TopOrnament ─────────────────────────────────────────────────
// A decorative top border for section headings.

export function TopOrnament({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 200 24"
        className="w-40 sm:w-56 text-gold opacity-60"
        fill="currentColor"
        aria-hidden="true"
      >
        {/* Central piece */}
        <rect x="94" y="6" width="12" height="12" transform="rotate(45 100 12)" />
        {/* Small diamonds */}
        <rect x="78" y="9" width="6" height="6" transform="rotate(45 81 12)" opacity="0.7" />
        <rect x="115" y="9" width="6" height="6" transform="rotate(45 118 12)" opacity="0.7" />
        {/* Lines */}
        <line x1="0" y1="12" x2="72" y2="12" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        <line x1="128" y1="12" x2="200" y2="12" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        {/* Dots */}
        <circle cx="62" cy="12" r="1.5" opacity="0.5" />
        <circle cx="138" cy="12" r="1.5" opacity="0.5" />
      </svg>
    </div>
  )
}
