/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{html,jsx}",
    "./components/**/*.{html,jsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: { min: "0px", max: "600px" },
      pr: { min: "601px", max: "900px" },
      ld: { min: "901px", max: "1279px" },
      lg: { min: "1280px" },
    },
    extend: {},
  },
};
