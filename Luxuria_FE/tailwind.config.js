/** @type {import('tailwindcss').Config} */
import preline from "preline/plugin";
export default {
  darkMode: "class", // remove for auto change mode based on system settings
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      scale: {
        102: "1.02",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [preline],
};
