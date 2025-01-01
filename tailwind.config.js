/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "450px",
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
      wiggle: "wiggle 0.1s cubic-bezier(0.36, 0.07, 0.19, 1.0) 3 alternate",
      punchy1: "punchy 0.6s ease-in-out 1 0s",
      punchy2: "punchy 0.6s ease-in-out 1 0.1s",
      punchy3: "punchy 0.6s ease-in-out 1 0.2s",
      punchy4: "punchy 0.6s ease-in-out 1 0.4s",
      punchy5: "punchy 0.6s ease-in-out 1 0.5s",
    },
    keyframes: {
      punchy: {
        "0%": {
          transform: "scale(0.8) translateY(0px)",
        },
        "50%": {
          transform: "scale(1.1) translateY(-10px)",
        },
        "100%": {
          transform: "scale(1) translateY(0)",
        },
      },
      wiggle: {
        "0%": {
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
