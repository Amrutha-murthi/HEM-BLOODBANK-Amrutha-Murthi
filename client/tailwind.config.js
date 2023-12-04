/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#B73E3E",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
