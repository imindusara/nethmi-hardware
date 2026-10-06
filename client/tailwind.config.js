/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // HardwareMart inspired Royal Purple & Gold Palette
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#7e22ce',
          700: '#6b21a8',
          800: '#581c87',
          900: '#4a154b', // Primary Deep Purple from screenshot
          950: '#340b38', // Dark Purple
        },
        brand: {
          purple: '#4a154b',
          purpleHover: '#5b176b',
          darkPurple: '#360a3b',
          gold: '#f59e0b',
          yellow: '#fbbf24',
          orange: '#ea580c',
          cardBorder: '#f59e0b',
        },
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#4a154b', // Primary Brand Purple
          600: '#3d1140',
          700: '#310c34',
          800: '#260829',
          900: '#1b041e',
        },
        charcoal: {
          800: '#1F2937',
          900: '#111827',
          950: '#0B0F17',
        }
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 15px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 10px 25px -3px rgba(74, 21, 75, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      }
    },
  },
  plugins: [],
}
