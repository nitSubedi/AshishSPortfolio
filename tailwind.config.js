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
        'cinema-overlay': 'rgba(0,0,0,0.5)',
        'cream': '#f5f5f0',
        'cream-dark': '#e8e8e3',
      },
      fontFamily: {
        sans: ['Jost', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
      letterSpacing: {
        'superwide': '0.5em',
        'extrawide': '0.2em',
        'wide': '0.15em',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.33, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}