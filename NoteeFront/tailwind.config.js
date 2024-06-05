/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      menudark:"#001529",
      customdark: "#1A202C",
      bigdark:"#0c0e14",
      linedark:"#242c3a",
      whiteneige: "#f7f7f7",
    }
  },
  plugins: [],
});
