/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      regular: "abmont_proregular",
      bold: "abmont_probold",
      light: "abmont_prolight",
      medium: "abmont_prodemibold",
      black: "abmont_problack", 
    },
    colors: {
      "black": "#07080A",
      "dark-blue": "#0C0F12",
      "dark-grey": "#101518",
      "grey": "#161C21",
      "medium-grey": "#1F272E",
      "light-grey": "#323B43",
      "lighter-grey": "#2C3640",
      "green": "#039855",
      "secondary": "#28313B",
      "red": "#E01F28",
      "red-error": "#F06A60",
      "white": "#FFFFFF",
      "white-border": "#D8D8D8",
      "white-secondary": "#EDEDED",
      "silver": "#9AA2AC",
      "blue": "#1877F2",
      "football": "#4C8E18",
      "basketball": "#F76D2E",
      "tennis": "#ACB52C",
      "rugby": "#70133B",
      "ufc": "#C2291C",
      "light-bg": "#EAECED",
      "silver-lower": "#9AA2AC4D",
      "silver-ground": "#9AA2AC4D",
      "black-low": "#000000B2",
      "black-lower": "#0000004D"
    },
    extend: {
      fontSize: {
        xxs: '10px'
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}