/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D4AF37', // Oro Metálico P1
        'on-primary': '#000000',
        surface: '#121212',
        'on-surface': '#E5E5E5',
        background: '#0A0A0A',
      },
      fontFamily: {
        headline: ['"Playfair Display"', 'serif'],
        body: ['"Be Vietnam Pro"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
