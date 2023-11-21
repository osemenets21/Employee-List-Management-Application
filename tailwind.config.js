/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,js,jsx,tsx,ts}",
      "./node_modules/tw-elements/dist/js/**/*.js"
    ],
    darkMode: "class",
    plugins: [require("tw-elements/dist/plugin.cjs")],
  };