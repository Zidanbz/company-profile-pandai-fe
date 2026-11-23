import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f7ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0077c8", // Pandai Core Vivid Blue
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#063462", // Pandai Deep Blue
          950: "#032042",
        },
        pandai: {
          blue: "#0077c8",
          dark: "#005a9c",
          light: "#e6f4fc",
          orange: "#f97316", // Pandai Orange CTA
          orangeHover: "#ea580c",
          navy: "#0a2540",
          sky: "#f0f7ff",
        },
        accent: {
          orange: "#f97316",
          orangeHover: "#ea580c",
        },
        navy: {
          800: "#0a2540",
          900: "#06182c",
          950: "#030c17",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-manrope)", "sans-serif"],
        manrope: ["var(--font-manrope)", "sans-serif"],
        heading: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 25px rgba(0, 119, 200, 0.35)",
        card: "0 10px 30px -5px rgba(2, 23, 71, 0.06), 0 4px 12px -2px rgba(2, 23, 71, 0.03)",
        cardHover: "0 20px 40px -10px rgba(0, 119, 200, 0.15), 0 8px 20px -4px rgba(0, 119, 200, 0.08)",
        glass: "0 8px 32px 0 rgba(0, 119, 200, 0.08)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
