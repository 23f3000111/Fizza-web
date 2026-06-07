import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary surface: ivory white. Secondary surfaces lean cool/navy (not beige).
        paper: "#FCFCFA",
        cream: "#EEF2F8",
        ink: { DEFAULT: "#15212B", 2: "#3A4753" },
        mute: "#6E7884",
        faint: "#A4ACB6",
        // Navy = secondary brand colour.
        navy: { DEFAULT: "#173352", 2: "#0F2740", soft: "#E5EDF7" },
        // Gold/brass kept as a subtle accent only.
        brass: { DEFAULT: "#B0863F", 2: "#8C6526", soft: "#F2EBDA" },
        line: { DEFAULT: "#E4E8EF", 2: "#EEF1F6", strong: "#D4DAE3" },
        good: "#4F9D69",
        bad: "#C0492F",
      },
      fontFamily: {
        // Simple system serif + sans-serif — no web fonts.
        sans: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
        serif: ["Georgia", "Cambria", "Times New Roman", "Times", "serif"],
      },
      boxShadow: {
        sm2: "0 1px 2px rgba(22,32,28,.04), 0 4px 12px -6px rgba(22,32,28,.08)",
        md2: "0 2px 6px -2px rgba(22,32,28,.06), 0 18px 36px -20px rgba(22,32,28,.22)",
        lg2: "0 8px 18px -8px rgba(22,32,28,.10), 0 40px 70px -30px rgba(22,32,28,.30)",
      },
      borderRadius: {
        xl2: "20px",
        "2xl2": "28px",
      },
      maxWidth: {
        site: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
