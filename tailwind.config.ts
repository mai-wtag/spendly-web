import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2DD4BF", // Teal
        "background-light": "#f6f8f8",
        "background-dark": "#11211f",
        "content-light": "#1f2937",
        "content-dark": "#e5e7eb",
        "subtle-light": "#6b7280",
        "subtle-dark": "#9ca3af",
        "surface-light": "#ffffff",
        "surface-dark": "#1f2937",
        "border-light": "#e5e7eb",
        "border-dark": "#374151",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
    },
  },
} satisfies Config;
