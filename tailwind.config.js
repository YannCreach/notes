/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {

    },
    colors: {
      darkAccentColor: '#5DB35D',
      darkBackgroundColor: '#212121',
      darkBackgroundAltColor: '#474747',
      darkTextColor: '#fff',
      darkTextAltColor: '#383838',
      darkDangerColor: '#D93400',
      lightAccentColor: '#5DB35D',
      lightBackgroundColor: '#E4E4E4',
      lightBackgroundAltColor: '#fff',
      lightTextColor: '#000',
      lightTextAltColor: '#fff',
      lightDangerColor: '#D93400',
    },
    boxShadow: {
      card: '0 5px 5px 0px rgba(0, 0, 0, 1)',
      button: 'inset 100vw 0 0 0',
    },
  },
  plugins: [],
};
