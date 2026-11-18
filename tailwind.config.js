/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#f6f3ec',
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
          50: '#fbf6ef',
          100: '#f3e6d6',
          200: '#e9d5bf',
          300: '#dbbd9a',
          400: '#be9974',
          500: '#815536',
          600: '#6d452b',
          700: '#5e3a26',
          800: '#4e3020',
          900: '#3c2518',
          950: '#2a1a10',
        },
      },
      fontFamily: {
        display: ['"Crimson Text"', 'Georgia', 'serif'],
        body: ['"Open Sans"', 'system-ui', 'sans-serif'],
        sans: ['"Open Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
