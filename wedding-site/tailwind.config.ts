import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#140A0D",        // near-black maroon — night sky of the story
        maroon: "#4A1420",     // deep traditional maroon
        maroonDeep: "#2A0B12",
        gold: "#C9A24B",       // antique gold
        goldBright: "#E8C877",
        ember: "#D9662E",      // marigold / warm ember accent
        jasmine: "#EFE7D6",    // warm off-white
        ivory: "#F6EFE2",      // final-act background
        mist: "#8A7768",       // muted warm grey for secondary text
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "serif"],
        telugu: ["var(--font-telugu)", "serif"],
      },
      letterSpacing: {
        wide2: "0.14em",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.82" },
        },
        drift: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)" },
        },
      },
      animation: {
        flicker: "flicker 3.2s ease-in-out infinite",
        drift: "drift 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
