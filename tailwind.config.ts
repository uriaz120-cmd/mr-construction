import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0a1128",
          navy: "#101d36",
          navyLight: "#1e2f4d",
          steel: "#283845",
          slate: "#475569",
          slateLight: "#94a3b8",
          bgLight: "#f8fafc",
          accent: "#ea580c",
          accentHover: "#c2410c",
          amber: "#d97706",
          amberLight: "#f59e0b",
          gold: "#f59e0b",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-outfit)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
