import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#6B1E2B',
          dark: '#4A1019',
          light: '#8B2635',
        },
        gold: {
          DEFAULT: '#C9A227',
          soft: '#E5C76B',
          light: '#F0DFA0',
          dark: '#A07D10',
        },
        cream: {
          DEFAULT: '#FFF8E7',
          warm: '#FAF3E0',
          dark: '#F0E6C8',
        },
        brown: {
          DEFAULT: '#3A2418',
          light: '#6B4423',
        },
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        lora: ['var(--font-lora)', 'Georgia', 'serif'],
        noto: ['var(--font-noto)', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A227 0%, #E5C76B 50%, #C9A227 100%)',
        'maroon-gradient': 'linear-gradient(180deg, #4A1019 0%, #6B1E2B 50%, #8B2635 100%)',
        'ivory-gradient': 'linear-gradient(180deg, #FFF8E7 0%, #FAF3E0 100%)',
      },
      animation: {
        'petal-fall': 'petalFall var(--duration, 8s) linear infinite',
        'gold-shimmer': 'goldShimmer 3s ease-in-out infinite',
        'gentle-bob': 'gentleBob 3s ease-in-out infinite',
        'draw-line': 'drawLine 1.5s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'scroll-bounce': 'scrollBounce 2s ease-in-out infinite',
      },
      keyframes: {
        petalFall: {
          '0%': { transform: 'translateY(-10px) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '0.7' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        },
        goldShimmer: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
        gentleBob: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        drawLine: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scrollBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
      },
      screens: {
        xs: '375px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      letterSpacing: {
        'widest-2': '0.3em',
        'widest-3': '0.5em',
      },
    },
  },
  plugins: [],
}

export default config
