module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        robotoMono: ["Roboto Mono", "monospace"],
        monsterrat: ["Montserrat", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
