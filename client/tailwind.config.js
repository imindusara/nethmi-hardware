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
        // HardwareMart Red & Gold / Charcoal Palette
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#dc2626', // Primary Brand Red
          600: '#b91c1c', // Deep Crimson
          700: '#991b1b', // Dark Red
          800: '#7f1d1d', // Very Dark Red
          900: '#450a0a', // Deep Red
          950: '#2d0606', // Darkest Red
        },
        brand: {
          red: '#dc2626',
          redHover: '#b91c1c',
          darkRed: '#7f1d1d',
          deepRed: '#450a0a',
          gold: '#f59e0b',
          yellow: '#fbbf24',
          orange: '#ea580c',
          cardBorder: '#ef4444',
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
        'card-hover': '0 10px 25px -3px rgba(220, 38, 38, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      }
    },
  },
  plugins: [],
}
