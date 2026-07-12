/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff9ff',
          100: '#d9f1ff',
          400: '#3bb4f2',
          500: '#1494e0',
          600: '#0a76bd',
          700: '#0c5e98',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
