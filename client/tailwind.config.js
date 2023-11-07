/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{html,ts}"],
  content: ["./client/**/*.html", "./client/js/**/*.ts"],
  theme: {
    extend: {
      colors: {
        primary: "#231f20",
        primaryDarker: "#1c191a",
        secondary: "#ffc629",
        border: "#b0b3b2",
        hover: "#fab700",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/herobg.jpg')",
      },
    },
  },
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
