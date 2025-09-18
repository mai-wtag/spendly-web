/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2DD4BF",   // Teal
        secondary: "#0F172A", // Dark Navy
      },
    },
  },
  plugins: [],
}
