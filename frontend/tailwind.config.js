/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f8fbff',
          100: '#eef6ff',
          200: '#dbeefe',
          300: '#bfe5fd',
          400: '#96d8fb',
          500: '#46b5f2',
          600: '#2d8fcc',
          700: '#246f9e',
          800: '#1a567e',
          900: '#113d56',
        },
        accent: {
          500: '#ff7a59',
          600: '#ff5c3b',
        },
      },
    },
  },
  plugins: [],
}

