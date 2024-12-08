import { theme } from "tailwindcss/defaultConfig";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm: "512px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
        "4xl": "2560px",
        "5xl": "3840px",
        "6xl": "5120px",
        "7xl": "7680px",
        "8xl": "10240px",
        "9xl": "15360px",
        "10xl": "20480px",
      },
    },
  },
  plugins: [],
};
