/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        mont: "var(--font-mont)",
        roboto: "var(--font-roboto",
        love: "var(--font-love)",
      },
    },
  },
  plugins: [],
};
