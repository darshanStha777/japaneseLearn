/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        japanese: {
          red: '#DC2626',
          blue: '#1D4ED8',
          navy: '#1E3A5F',
        }
      }
    }
  },
  plugins: []
}
