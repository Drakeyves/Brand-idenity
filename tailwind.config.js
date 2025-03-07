module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0d0d14',
          secondary: '#141421',
        },
        'accent-purple': {
          light: '#9F7AEA',
          DEFAULT: '#7A6FE3',
          dark: '#553C9A',
        },
        'accent-teal': {
          light: '#2ED6A7',
          DEFAULT: '#25B592',
          dark: '#1C8870',
        },
        'accent-gold': {
          light: '#F7B731',
          DEFAULT: '#F5A623',
          dark: '#D48806',
        },
        'accent-metallic': {
          light: '#C5C5D3',
          DEFAULT: '#A1A1B5',
          dark: '#71718A',
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        drake: {
          "primary": "#7A6FE3",    // Our accent-purple
          "secondary": "#25B592",  // Our accent-teal
          "accent": "#F5A623",     // Our accent-gold
          "neutral": "#A1A1B5",    // Our accent-metallic
          "base-100": "#0d0d14",   // Our background
          "base-200": "#141421",   // Our background-secondary
          "base-content": "#ffffff",
          "info": "#2ED6A7",
          "success": "#25B592",
          "warning": "#F7B731",
          "error": "#FF5252",
        }
      },
      'black'  // Keep only the black theme as an alternative
    ],
    darkTheme: "drake", // Set drake as the default dark theme
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
