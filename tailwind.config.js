/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {},
    screens: {
      xs: '430px',
      sm: '650px',
      md: '720px',
      lg: '976px',
      xl: '1440px',
    },
   
  },
  plugins: [],
  darkMode: 'selector',
}