/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eafcfa',
          100: '#cdf6f0',
          200: '#9bece1',
          300: '#5edbcd',
          400: '#2fc4b8',
          500: '#14a89b',
          600: '#0d8a80',
          700: '#0f6e67',
          800: '#125853',
          900: '#134945',
        },
        sun: {
          400: '#f6a53a',
          500: '#ef8f18',
        },
        plum: {
          400: '#9d7de8',
          500: '#7c5cd6',
        },
        ink: '#0f2e2b',
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
        display: ['"Baloo 2"', 'Poppins', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        pill: '0 10px 25px -8px rgba(15, 110, 103, 0.35)',
        card: '0 15px 35px -12px rgba(15, 46, 43, 0.12)',
      },
    },
  },
  plugins: [],
};
