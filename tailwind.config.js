/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "container-sm": "500px",
        "container-xl": "1200px",
      },
    },
  },

  plugins: [],
};
