/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zinc: {
          850: '#1f1f23',
          925: '#101014',
          950: '#09090b',
        },
        brand: {
          dark: '#030305',
          darker: '#010103',
          card: '#0c0c10',
          cardBorder: '#1c1c24',
          red: '#dc2626',
          crimson: '#e11d48',
          accent: '#f43f5e',
          gold: '#f59e0b',
          goldDark: '#d97706',
          goldLight: '#fde68a',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        luxury: ['Cinzel', 'Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.04)' },
        },
        spotlight: {
          '0%': { opacity: '0', transform: 'translate(-72%, -62%) scale(0.5)' },
          '100%': { opacity: '1', transform: 'translate(-50%,-40%) scale(1)' },
        }
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        shimmer: 'shimmer 2.5s infinite',
        'pulse-slow': 'pulseSlow 6s ease-in-out infinite',
        spotlight: 'spotlight 2s ease .75s 1 forwards',
      }
    },
  },
  plugins: [],
}
