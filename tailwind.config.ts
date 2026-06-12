import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivoire: "#F5F0EB",
        mousse: "#3D4A3E",
        sienne: "#B8814A",
        encre: "#1C1C1E",
        craie: "#EDE8E1",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        caps: ["var(--font-cormorant-sc)", "serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
      },
      maxWidth: {
        site: "1440px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
