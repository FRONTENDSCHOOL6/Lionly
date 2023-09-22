/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.js', './src/**/*.jsx'],
  theme: {
    extend: {
      colors: {
        'lionly-primary-color': '#FFA726',
        'lionly-secondary-color': '#ffb74d',
        'lionly-black': '#333',
        'lionly-gray-1': '#4f4f4f',
        'lionly-gray-2': '#7a7a7a',
        'lionly-gray-3': '#a6a6a6',
        'lionly-gray-4': '#d9d9d9',
        'lionly-white': '#fff',
        'lionly-red': '#ff0000',
      },
      fontSize: {
        'lionly-xs': [
          '10px',

          {
            lineHeight: '160%',
            fontWeight: '400',
          },
        ],
        'lionly-sm': [
          '12px',
          {
            lineHeight: '160%',
            fontWeight: '400',
          },
        ],
        'lionly-sm-bold': [
          '12px',
          {
            lineHeight: '160%',
            fontWeight: '700',
          },
        ],
        'lionly-md': [
          '14px',
          {
            lineHeight: '160%',
            fontWeight: '700',
          },
        ],
        'lionly-base': [
          '16px',
          {
            lineHeight: '160%',
            fontWeight: '400',
          },
        ],
        'lionly-lg': [
          '18px',
          {
            lineHeight: '160%',
            fontWeight: '700',
          },
        ],
        'lionly-xl': [
          '28px',
          {
            lineHeight: '160%',
            fontWeight: '700',
          },
        ],
        'lionly-2xl': [
          '32px',
          {
            lineHeight: '160%',
            fontWeight: '700',
          },
        ],
        'lionly-3xl': [
          '40px',
          {
            lineHeight: '160%',
            fontWeight: '700',
          },
        ],
      },
    },
  },
  plugins: [],
};
