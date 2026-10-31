/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        kinetic: {
          black: '#080808',
          dark: '#0e0e11',
          surface: '#15151a',
          surfaceBorder: '#23232b',
          purple: '#8B5CF6',
          purpleLight: '#A78BFA',
          purpleDark: '#6D28D9',
          purpleGlow: 'rgba(139, 92, 246, 0.4)',
          grey: '#9CA3AF',
          lightGrey: '#E5E7EB',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Syne', 'Space Grotesk', 'sans-serif']
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', filter: 'blur(20px)' },
          '50%': { opacity: '0.8', filter: 'blur(30px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        glowPulse: 'glowPulse 4s ease-in-out infinite',
        marquee: 'marquee 25s linear infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
