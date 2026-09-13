/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ama: {
          blue: {
            50: "#EFF6FF",
            100: "#DBEAFE",
            500: "#3B82F6",
            600: "#2563EB",
            700: "#1D4ED8",
            800: "#1E40AF",
            900: "#1E3A8A", // Royal Blue Institutionnel
            950: "#0F172A",
          },
          gold: {
            50: "#FFFBEB",
            100: "#FEF3C7",
            400: "#FBBF24",
            500: "#F59E0B",
            600: "#D97706", // Or / Ambre
            700: "#B45309",
            800: "#92400E",
          },
          earth: {
            50: "#FDF8F6",
            100: "#F2E8E5",
            600: "#8C4A32",
            700: "#78350F", // Terre Plateau Central
            800: "#5C260D",
          },
          cream: "#FAF9F6",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "'Helvetica Neue'",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(30, 58, 138, 0.08)',
        'card': '0 2px 10px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
