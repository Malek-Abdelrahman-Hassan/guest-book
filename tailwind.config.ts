import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Playing card theme palette
        cardred: {
          DEFAULT: "#B91C1C",
          light: "#DC2626",
          dark: "#7F1D1D",
        },
        ink: {
          DEFAULT: "#1A1A2E",
          soft: "#252545",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#E8C86A",
          dark: "#A88A2A",
        },
        cream: {
          DEFAULT: "#FFF8F0",
          dark: "#F3E9D9",
        },
        felt: {
          DEFAULT: "#065F46",
          dark: "#043D2D",
          light: "#0A7D5C",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        body: ['"Inter"', "sans-serif"],
        arabic: ['"Cairo"', "sans-serif"],
        script: ['"Great Vibes"', "cursive"],
      },
      boxShadow: {
        card: "0 10px 30px -5px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)",
        cardhover: "0 24px 50px -8px rgba(0,0,0,0.55)",
        gold: "0 0 20px rgba(212,175,55,0.5)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(6deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        dealIn: {
          "0%": { transform: "translateY(-120vh) rotate(-40deg) scale(0.6)", opacity: "0" },
          "100%": { transform: "translateY(0) rotate(0deg) scale(1)", opacity: "1" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(212,175,55,0.5)" },
          "50%": { boxShadow: "0 0 25px 6px rgba(212,175,55,0.35)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        dealIn: "dealIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        pulseGold: "pulseGold 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
