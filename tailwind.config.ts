import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#00D4FF", // Electric Cyan
        secondary: "#7C3AED", // Violet
        dark: "#05050A", // Deep space
      },
      fontFamily: {
        syne: ["var(--font-syne)"],
        sans: ["var(--font-dm-sans)"],
      },
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
        'border-color': 'border-color',
      }
    },
  },
  plugins: [],
};
export default config;
