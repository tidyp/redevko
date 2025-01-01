/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: { min: "375px", max: "667px" },
      // md: { min: "820px", max: "1023px" },
      // lg: { min: "1080px" },
    },
    extend: {
      fontFamily: {
        sans: ["Noto Sans KR", "sans-serif"],
        en: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
