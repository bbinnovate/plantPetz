/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Primary
        primary: {
          DEFAULT: "#F4C430",
          light: "#FFF8DC",
          dark: "#E6B800",
        },
        // Secondary
        secondary: {
          DEFAULT: "#5F7D61",
          light: "#8FA186",
          medium: "#7A9876",
        },
        // Accents
        accent: {
          olive: "#8B8B3D",
          moss: "#6B8E23",
          sage: "#A9B19C",
          terracotta: "#D4896A",
          coral: "#FF6B6B",
        },
        // Neutrals
        neutral: {
          brown: "#8B7355",
          tan: "#D9C8B4",
          cream: "#F5F0E8",
          beige: "#FAF8F5",
        },
        // Grayscale
        black: "#1A1A1A",
        darkGray: "#2C2C2C",
        mediumGray: "#666666",
        lightGray: "#CCCCCC",
        white: "#FFFFFF",
        // UI
        background: "#FFFFFF",
        surface: "#FAF8F5",
        card: "#FFFFFF",
        border: "#E5E5E5",
        // Semantic
        success: "#5F7D61",
        warning: "#F4C430",
        error: "#D4896A",
        info: "#8FA186",
      },
      fontFamily: {
        regular: ["Poppins_400Regular"],
        medium: ["Poppins_500Medium"],
        semibold: ["Poppins_600SemiBold"],
        bold: ["Poppins_700Bold"],
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
      },
    },
  },
  plugins: [],
};
