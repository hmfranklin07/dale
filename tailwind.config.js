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
          50: '#f7f7f4',
          100: '#eaebe3',
          200: '#d5d8c8',
          300: '#b8bea3',
          400: '#9aa37e',
          500: '#7e8963',
          600: '#626d4d',
          700: '#4e573f',
          800: '#404735',
          900: '#363c2e',
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
    },
  },
  plugins: [],
}
