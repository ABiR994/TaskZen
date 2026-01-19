/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#00b4d8', // Deeper, richer Teal
          light: '#90e0ef', // Softer, pastel Teal
          dark: '#529197',
        },
        'accent': {
          DEFAULT: '#66cc66', // Slightly deeper green
          light: '#99e699', // More vibrant light green
          dark: '#8ebc8e',
        },
        'background-light': '#fefefe', // Warmer off-white
        'background-dark': '#1f2937',
        'text-light': '#212529', // Softer dark gray
        'text-dark': '#e2e8f0',
        'completed-light': '#e0f2f7', // Lighter, hint of primary for completed tasks
        'completed-dark': '#4a5568', // Darker gray for completed tasks
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Ensure Inter is default sans-serif
      }
    },
  },
  plugins: [],
}

