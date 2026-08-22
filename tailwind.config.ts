import type { Config } from "tailwindcss";

/**
 * DESIGN SYSTEM — "Signal"
 * A portfolio built around one idea: turning noise into signal.
 * The palette and type system below are the single source of truth.
 * Never hardcode a hex value in a component — always reach for a token.
 */
const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Surfaces
        base: "rgb(var(--c-base) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        "surface-raised": "rgb(var(--c-surface-raised) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",

        // Text
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        "ink-muted": "rgb(var(--c-ink-muted) / <alpha-value>)",
        "ink-faint": "rgb(var(--c-ink-faint) / <alpha-value>)",

        // Signal accents
        amber: "rgb(var(--c-amber) / <alpha-value>)",
        teal: "rgb(var(--c-teal) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        // Fluid type scale — precise, not default Tailwind steps
        "display-xl": ["clamp(2.75rem, 2rem + 3.5vw, 5.5rem)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 1.7rem + 2.5vw, 4rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.75rem, 1.4rem + 1.5vw, 2.75rem)", { lineHeight: "1.08", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(1.375rem, 1.2rem + 0.8vw, 1.875rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      maxWidth: {
        content: "72rem",
        prose: "38rem",
      },
      borderRadius: {
        sm: "3px",
        DEFAULT: "6px",
        md: "8px",
        lg: "12px",
      },
      transitionTimingFunction: {
        signal: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgb(var(--c-line) / 0.35) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--c-line) / 0.35) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-cell": "40px 40px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        // Slow ambient drift for the background blobs — deliberately gentle,
        // an instrument idling, not a decoration animating for its own sake.
        "drift-a": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(3vw, 2vh) scale(1.08)" },
        },
        "drift-b": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-2.5vw, 3vh) scale(1.05)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        blink: "blink 1.1s step-end infinite",
        "drift-a": "drift-a 22s cubic-bezier(0.45, 0, 0.55, 1) infinite",
        "drift-b": "drift-b 26s cubic-bezier(0.45, 0, 0.55, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
