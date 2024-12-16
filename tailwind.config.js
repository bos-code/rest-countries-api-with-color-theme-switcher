/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {},
    screens: {
      xxs: '370px',
      xs: '480px',
      sm: '650px',
      md: '720px',
      lg: '976px',
      xl: '1440px',
    },
   
  },
  plugins: [],
  darkMode: 'selector',
}