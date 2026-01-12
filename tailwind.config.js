/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#d4af37',
        'gold-light': '#f7e98e',
        'gold-dark': '#b8860b',
      },
    },
  },
  plugins: [],
}