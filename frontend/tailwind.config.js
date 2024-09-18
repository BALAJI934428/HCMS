/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "my-violet": "#390099",
        "my-red": "#FF0054",
        "my-merun": "#9E0059",
        "my-orange": "#FF5400",
        "my-yellow": "#FFBD00",
      },
    },
  },
  plugins: [],
};
