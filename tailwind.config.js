/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    screens: {
      xs: '300px',
      sm: '650px',
      md: '720px',
      lg: '976px',
      xl: '1440px',
    },
   
  },
  plugins: [],
  darkMode: 'selector',
}