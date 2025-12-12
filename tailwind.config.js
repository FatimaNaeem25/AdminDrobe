/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e8e9ff',
          200: '#d1d2ff',
          300: '#b3b4ff',
          400: '#8b8cff',
          500: '#5603CD',
          600: '#4646CD',
          700: '#3494CC',
          800: '#3399CC',
          900: '#2a5aa0',
        },
        brand: {
          purple: '#5603CD',
          'purple-blue': '#4646CD',
          blue: '#3494CC',
          'light-blue': '#3399CC',
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #5603CD 0%, #4646CD 50%, #3494CC 100%)',
        'gradient-brand-alt': 'linear-gradient(135deg, #4646CD 0%, #3494CC 50%, #3399CC 100%)',
        'gradient-brand-hover': 'linear-gradient(135deg, #4646CD 0%, #3494CC 50%, #3399CC 100%)',
      },
    },
  },
  plugins: [],
}

