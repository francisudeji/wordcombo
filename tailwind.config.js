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
    animation: {
      none: "none",
      spin: "spin 1s linear infinite",
      ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
      pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      bounce: "bounce 1s infinite",
      wiggle: "wiggle 0.1s cubic-bezier(0.36, 0.07, 0.19, 1.0) 3 alternate",
    },
    keyframes: {
      wiggle: {
        "0%, 100%": {
          transform: "translateX(0)",
        },
        "25%": {
          transform: "translateX(-5px)",
        },
        "50%": {
          transform: "translateX(5px)",
        },
        "75%": {
          transform: "translateX(-5px)",
        },
        "100%": {
          transform: "translateX(0)",
        },
      },
    },
  },
  plugins: [],
};
