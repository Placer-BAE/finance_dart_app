/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      colors: {
        terminal: {
          bg: '#090a0f',
          dark: '#12141c',
          panel: '#181b26',
          border: '#262a3b',
          amber: '#f59e0b',
          cyan: '#06b6d4',
          green: '#10b981',
          red: '#ef4444',
          muted: '#858da8',
        }
      }
    },
  },
  plugins: [],
}
