/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    fontFamily: {
      regular: 'abmont_proregular',
      bold: 'abmont_probold',
      light: 'abmont_prolight',
      medium: 'abmont_prodemibold',
      black: 'abmont_problack',
      regular_uppercase: [
        'abmont_proregular, sans-serif',
        {
          fontFeatureSettings: '"case" on',
        },
      ],
      bold_uppercase: [
        'abmont_probold, sans-serif',
        {
          fontFeatureSettings: '"case" on',
        },
      ],
      light_uppercase: [
        'abmont_prolight, sans-serif',
        {
          fontFeatureSettings: '"case" on',
        },
      ],
      medium_uppercase: [
        'abmont_prodemibold, sans-serif',
        {
          fontFeatureSettings: '"case" on',
        },
      ],
      black_uppercase: [
        'abmont_problack, sans-serif',
        {
          fontFeatureSettings: '"case" on',
        },
      ],
    },
    colors: {
      black: '#07080A',
      'dark-blue': '#0C0F12',
      'dark-grey': '#151A1F',
      grey: '#1B2329',
      'medium-grey': '#1F272E',
      'light-grey': '#29323B',
      'lighter-grey': '#2C3640',
      green: '#039855',
      secondary: '#28313B',
      red: '#E01F28',
      'red-error': '#F06A60',
      white: '#F1F3F4',
      'white-border': '#D8D8D8',
      'white-secondary': '#EDEDED',
      silver: '#9AA2AC',
      blue: '#1877F2',
      football: '#4C8E18',
      basketball: '#F76D2E',
      tennis: '#ACB52C',
      rugby: '#70133B',
      ufc: '#C2291C',
      'light-bg': '#EAECED',
      'dark-silver-text': '#3C4043',
      'silver-lower': '#9AA2AC',
      'silver-ground': '#5F6368',
      'silver-ground-lower': '#38434F',
      'silver-light': '#E8EAED',
      'silver-light-border': '#BDC1C6',
      'silver-lighter': '#DADCE0',
      'black-low': '#000000B2',
      'black-lower': '#0000004D',
    },
    extend: {
      fontSize: {
        xxs: '10px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
