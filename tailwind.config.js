/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Open Sans', 'sans-serif'],
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      backfaceVisibility: {
        'hidden': 'hidden',
      },
      rotate: {
        '90': '90deg',
      },
      colors: {
        primary: '##2a3b4c',
        secondary: '##d4af37',
        accent: '#1A2B3C'
      }
    },
  },
  plugins: [],
};