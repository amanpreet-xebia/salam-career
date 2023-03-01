/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'salam-blue': '#081F33',
        'base-grey': '#F5F8FB',
        'bright-green': '#00B140',
        'salamgreen': '#00AE42',
        'accent': '#00AE42',
        'aqua-green': '#D9FFE9',
        'light-red': '#FFEFEF',
        'light-green': 'rgba(26, 176, 70, 0.2)',
        //'primary': '#01B140',
        'primary-light': '#c4e9d6',
        'roman-silver': '#80909A',
        'black-rgba': 'rgba(0, 0, 0, 0.35)',
        'salam-background': '#E5E5E5',
      },
    },
  },
  plugins: [],
};
