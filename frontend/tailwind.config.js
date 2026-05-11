/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rosette-pink': '#FFD1DC',
        'rosette-baby': '#FCE4EC',
        'rosette-rose': '#F06292',
        'rosette-cream': '#FFF9F9',
        'rosette-lavender': '#E1BEE7',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
