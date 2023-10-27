/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: "Plus Jakarta Sans",
      },
      colors: {
        amaranth: {
          DEFAULT: "#e23e57",
          50: "#fef2f3",
          100: "#fde6e8",
          200: "#fad1d5",
          300: "#f5acb4",
          400: "#ef7d8b",
          500: "#e23e57",
          600: "#d02e4e",
          700: "#af2141",
          800: "#931e3c",
          900: "#7e1d39",
          950: "#460b1b",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
