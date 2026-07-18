/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#ffffff',
        card: '#0A0A0A',
        border: '#1A1A1A',
        primary: '#3B82F6',
        secondary: '#2563EB',
        accent: '#7C3AED',
      },
    },
  },
  plugins: [],
}