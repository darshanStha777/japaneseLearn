/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        japanese: {
          red: '#DC143C',
          dark: '#1a1a2e',
          navy: '#16213e',
          blue: '#0f3460',
        }
      }
    },
  },
  plugins: [],
}

