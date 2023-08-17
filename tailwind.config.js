/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      textShadow: {
        white: '2px 0 white, -2px 0 white, 0 2px white, 0 -2px white, 1px 1px white, -1px -1px white, -1px 1px white, 1px -1px white',
      },
    },
    colors: {
      whiteVariantColor: '#F2F3F7',
      darkAccentColor: '#5DB35D',
      darkBackgroundColor: '#212121',
      darkBackgroundAltColor: '#474747',
      darkTextsubColor: '#858991',
      darkTextColor: '#fff',
      darkTextAltColor: '#383838',
      darkDangerColor: '#D93400',
      lightGrey: '#eaeaea',
      lightAccentColor: '#5DB35D',
      lightBackgroundColor: '#E4E4E4',
      lightBackgroundAltColor: '#fff',
      lightTextColor: '#000',
      lightTextAltColor: '#fff',
      lightDangerColor: '#D93400',
    },
    boxShadow: {
      card: '2px 2px 3px rgba(0, 0, 0, 0.5)',
      button: 'inset 100vw 0 0 0',
    },
  },
  plugins: [],
};
