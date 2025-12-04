/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ecfdf5', // emerald-50
          100: '#d1fae5', // emerald-100
          200: '#a7f3d0', // emerald-200
          300: '#6ee7b7', // emerald-300
          400: '#34d399', // emerald-400
          500: '#10b981', // emerald-500
          600: '#059669', // emerald-600
          700: '#047857', // emerald-700
          800: '#065f46', // emerald-800
          900: '#064e3b', // emerald-900
        },
        secondary: {
          50: '#eef2ff', // indigo-50
          100: '#e0e7ff', // indigo-100
          200: '#c7d2fe', // indigo-200
          300: '#a5b4fc', // indigo-300
          400: '#818cf8', // indigo-400
          500: '#6366f1', // indigo-500
          600: '#4f46e5', // indigo-600
          700: '#4338ca', // indigo-700
          800: '#3730a3', // indigo-800
          900: '#312e81', // indigo-900
        },
        accent: {
          50: '#fff7ed', // orange-50
          100: '#ffedd5', // orange-100
          500: '#f97316', // orange-500
          600: '#ea580c', // orange-600
        },
        surface: {
          DEFAULT: '#ffffff',
          50: '#f9fafb', // gray-50
          100: '#f3f4f6', // gray-100
          200: '#e5e7eb', // gray-200
        },
        text: {
          primary: '#111827', // gray-900
          secondary: '#4b5563', // gray-600
          tertiary: '#9ca3af', // gray-400
        },
        status: {
          success: '#10b981', // emerald-500
          warning: '#f59e0b', // amber-500
          error: '#ef4444', // red-500
          info: '#3b82f6', // blue-500
        }
      }
    },
  },
  plugins: [],
}

