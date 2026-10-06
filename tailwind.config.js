/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /** Real white for type on photographs. Page paper is #f6f3ec, not this. */
        white: '#ffffff',
        sage: {
          50: '#f3f4ef',
          100: '#e3e6dc',
          200: '#cdd3c4',
          300: '#b0b9a2',
          400: '#8c987c',
          500: '#6e7b5c',
          600: '#566248',
          700: '#3f4a36',
          800: '#323b2c',
          900: '#272f23',
          950: '#1a2118',
        },
        earth: {
          50: '#f7f4ee',
          100: '#efeae2',
          200: '#e2dbd0',
          300: '#c9bfb1',
          400: '#8a7d6e',
          500: '#65584c',
          600: '#4a4036',
          700: '#332d27',
          800: '#242019',
          900: '#161410',
        },
        rust: {
          50: '#faf4f0',
          100: '#f6e6de',
          200: '#efd4c6',
          300: '#e4b49f',
          400: '#d4896c',
          500: '#c45c3a',
          600: '#a3482c',
          700: '#863b25',
          800: '#6e3220',
          900: '#5c2c1d',
          950: '#3d1c12',
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
