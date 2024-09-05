import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"], // Dark mode using class strategy
  content: [
    "./pages/**/*.{ts,tsx}", // Scan these directories for class names
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true, // Center the container
      padding: {
        DEFAULT: "2rem", // Set default padding
        sm: "1.5rem",
        md: "2rem",
        lg: "2.5rem",
        xl: "3rem",
      },
      screens: {
        "2xl": "1400px", // Max width for extra-large screens
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
          dark: "hsl(var(--primary-dark))", // Ensure this variable is in your CSS
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        caution: {
          DEFAULT: "hsl(var(--caution))",
          foreground: "hsl(var(--caution-foreground))",
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
        customColor: "#D0BFB4", // Example custom color
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // Add Poppins font
        syne: ['Syne', 'sans-serif'], // Add Syne font
      },
      borderRadius: {
        lg: "var(--radius)", // Use CSS variable for large radius
        md: "calc(var(--radius) - 2px)", // Medium radius
        sm: "calc(var(--radius) - 4px)", // Small radius
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out", // Accordion down animation
        "accordion-up": "accordion-up 0.2s ease-out", // Accordion up animation
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), // Plugin for animations
    // Add more plugins here if needed
  ],
};

export default config;
