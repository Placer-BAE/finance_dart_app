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
      },
      colors: {
        dart: {
          blue: '#004EA2',
          light: '#EEF4FB',
          dark: '#002C5F'
        }
      }
    },
  },
  plugins: [],
}
