/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#16213a",
        "health-teal": "#0f9f94",
        "fresh-green": "#5abf7a",
        "warm-coral": "#ef7c72",
        "sun-amber": "#f3b54a",
        "soft-blue": "#dff3ff",
        "mist-green": "#e8f8f2",
        "paper": "#fbfcf9"
      },
      boxShadow: {
        soft: "0 18px 45px -30px rgba(22, 33, 58, 0.45)"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      }
    }
  },
  plugins: []
};
