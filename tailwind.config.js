/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#0A7D9D', // A slightly darker, more professional teal for default
          light: '#E0F7FA', // A very light, almost white, teal background
          dark: '#005F73',  // A deep teal for hover/active states
        },
        'accent': {
          DEFAULT: '#4CAF50', // A classic, brighter green
          light: '#E8F5E9', // A very soft, natural green
          dark: '#388E3C',  // A deeper green for interactions
        },
        'background-light': '#F9FAFB', // A very subtle, modern light gray, almost white
        'text-light': '#374151',     // A slightly darker and richer gray for better contrast and depth
        'completed-light': '#EBF4F6', // A very subtle light blue-gray, echoing primary light but toned down
        'completed-dark': '#4a5568', // Darker gray for completed tasks
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Ensure Inter is default sans-serif
      }
    },
  },
  plugins: [],
}

