import type { Config } from "tailwindcss";

// Editorial classicism token set, mirrored from Prototype/canvas/chrome.jsx.
// Tailwind is used sparingly — most surfaces lean on CSS in editorial.css.
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        ink2: "#29261b",
        grey: "#666666",
        grey2: "#999999",
        hair: "#111111",
        paper: "#fafaf7",
        white: "#ffffff",
        oxblood: "#a8412a",
        inkblue: "#1c3a5e",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "EB Garamond", "Georgia", "serif"],
        sans: ["Inter", "Söhne", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "IBM Plex Mono", "ui-monospace", "monospace"],
        script: ["Italianno", "cursive"],
      },
      letterSpacing: {
        eyebrow: "0.18em",
        label: "0.14em",
        cta: "0.16em",
      },
    },
  },
  plugins: [],
} satisfies Config;
