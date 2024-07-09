/** @type {import('tailwindcss').Config} */
import preline from "preline/plugin";
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      listStyleType: {
        none: 'none',
        disc: 'disc',
        decimal: 'decimal',
        square: 'square',
        roman: 'upper-roman',
        circle: 'circle',
      },
      height: {
        '8/9': '95%',
      },
      scale: {
        102: "1.02",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        merriweather: ["Merriweather", "serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [preline],
};
