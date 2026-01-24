/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cinema-black': '#0a0a0a',
        'cinema-gray': '#1a1a1a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Ensure you import Inter or a clean font in index.css
      }
    },
  },
  plugins: [],
}