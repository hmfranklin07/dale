/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /** Replaces default #fff site-wide — cards, panels, text-on-dark, gradient stops */
        white: '#faf9f5',
        sage: {
          50: '#f6f7f4',
          100: '#e8ebe3',
          200: '#d2d8c8',
          300: '#b3bea3',
          400: '#93a37e',
          500: '#768963',
          600: '#5c6d4d',
          700: '#49573f',
          800: '#3c4735',
          900: '#333c2e',
        },
        earth: {
          50: '#faf8f5',
          100: '#f0ece4',
          200: '#e0d7c8',
          300: '#ccbda5',
          400: '#8f7c6b',
          500: '#6a5848',
          600: '#4a3d32',
          700: '#362c24',
          800: '#261f19',
          900: '#1a1512',
        },
        rust: {
          50: '#fdf6f3',
          100: '#fce9e2',
          200: '#fad7c9',
          300: '#f5bca4',
          400: '#ed9473',
          500: '#e2724d',
          600: '#cf5733',
          700: '#ad4528',
          800: '#8f3b24',
          900: '#773524',
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(1.35rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.07) translate(-0.6%, -0.4%)' },
        },
        'scroll-cue': {
          '0%, 100%': { opacity: '0.35', transform: 'translateY(0)' },
          '50%': { opacity: '0.9', transform: 'translateY(6px)' },
        },
        'shimmer-bar': {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.95s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fade-in 0.8s ease forwards',
        'ken-burns': 'ken-burns 22s ease-in-out infinite alternate',
        'scroll-cue': 'scroll-cue 2.2s ease-in-out infinite',
        'shimmer-bar': 'shimmer-bar 4.5s linear infinite',
      },
      backgroundSize: {
        'shimmer': '200% auto',
      },
    },
  },
  plugins: [],
}
