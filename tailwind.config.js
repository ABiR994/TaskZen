/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#66b3ba', // Serene Teal/Aqua
          light: '#80ced6',
          dark: '#529197',
        },
        'accent': {
          DEFAULT: '#aad9a9', // Soft Green
          light: '#c2e3c2',
          dark: '#8ebc8e',
        },
        'background-light': '#f8f9fa', // Off-white
        'background-dark': '#1f2937', // Dark Gray
        'text-light': '#343a40', // Dark Gray
        'text-dark': '#e2e8f0', // Light Blue-Gray
        'completed-light': '#ced4da', // Muted gray for completed tasks
        'completed-dark': '#4a5568', // Darker gray for completed tasks
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Ensure Inter is default sans-serif
      }
    },
  },
  plugins: [],
}

