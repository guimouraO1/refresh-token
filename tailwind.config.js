const { nord } = require('daisyui/src/theming/themes');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        '@primary': "#5e81ac",
        '@dark': "#202020",
        '@white': "#e9ecef"
      }
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        nord: {
          ...require("daisyui/src/theming/themes")["nord"]
        },
      },
    ],
  },
};