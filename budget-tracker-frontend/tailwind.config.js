/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"SF Mono"', 'monospace'],
      },
      colors: {
        'bg-color': 'var(--bg-color)',
        'text-color': 'var(--text-color)',
        'border-color': 'var(--border-color)',
        'hover-bg-color': 'var(--hover-bg-color)',
      }
    },
  },
  plugins: [],
}