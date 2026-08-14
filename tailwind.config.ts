import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--color-ink)",
        paper: "var(--color-paper)",
        surface: "var(--color-surface)",
        "surface-strong": "var(--color-surface-strong)",
        muted: "var(--color-muted)",
        olive: "var(--color-olive)",
        "olive-dark": "var(--color-olive-dark)",
        "olive-soft": "var(--color-olive-soft)",
        yellow: "var(--color-yellow)",
      },
      maxWidth: {
        container: "var(--container-max)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
    },
  },
  plugins: [],
};

export default config;
