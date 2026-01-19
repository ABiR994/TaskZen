/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#0A7D9D', // Vibrant Teal
          light: '#E0F7FA',   // Very light Teal
          dark: '#005F73',    // Darker Teal for dark mode primary interactions
        },
        'accent': {
          DEFAULT: '#4CAF50', // Brighter Green
          light: '#E8F5E9',   // Very light Green
          dark: '#388E3C',    // Darker Green for dark mode accent interactions
        },
        'background': { // Default background (light mode)
          DEFAULT: '#F9FAFB', // Subtle light gray
          dark: '#1A202C',    // Dark mode background (darker, professional charcoal)
        },
        'text': {       // Default text (light mode)
          DEFAULT: '#374151', // Richer dark gray
          dark: '#E2E8F0',    // Dark mode text (light gray)
        },
        'completed': {  // Default completed state (light mode)
          light: '#EBF4F6',   // Subtle light blue-gray
          dark: '#4A5568',    // Dark mode completed state (medium dark gray)
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Ensure Inter is default sans-serif
      }
    },
  },
  plugins: [],
}

