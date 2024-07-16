import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        bop: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.5)" },
          "100%": { transform: "scale(1)" },
        },
        "bop-1": {
          "0%": { transform: "scale(1)" },
          "15%": { transform: "scale(1.5)" },
          "100%": { transform: "scale(1)" },
        },
        "bop-2": {
          "0%": { transform: "scale(1)" },
          "30%": { transform: "scale(1.5)" },
          "100%": { transform: "scale(1)" },
        },
        "bop-3": {
          "0%": { transform: "scale(1)" },
          "45%": { transform: "scale(1.5)" },
          "100%": { transform: "scale(1)" },
        },
        "bop-4": {
          "0%": { transform: "scale(1)" },
          "60%": { transform: "scale(1.5)" },
          "100%": { transform: "scale(1)" },
        },
        "bop-5": {
          "0%": { transform: "scale(1)" },
          "75%": { transform: "scale(1.5)" },
          "100%": { transform: "scale(1)" },
        },
        "bop-6": {
          "0%": { transform: "scale(1)" },
          "90%": { transform: "scale(1.5)" },
          "100%": { transform: "scale(1)" },
        },
        "bop-7": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.5)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "bop-1": "bop 1.5s 150ms ease-in-out  infinite",
        "bop-2": "bop 1.5s 300ms ease-in-out  infinite",
        "bop-3": "bop 1.5s 450ms ease-in-out  infinite",
        "bop-4": "bop 1.5s 600ms ease-in-out  infinite",
        "bop-5": "bop 1.5s 750ms ease-in-out  infinite",
        "bop-6": "bop 1.5s 900ms ease-in-out  infinite",
        "bop-7": "bop 1.5s 1050ms ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
