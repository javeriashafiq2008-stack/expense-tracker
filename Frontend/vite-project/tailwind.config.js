export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "var(--text)",
        "text-h": "var(--text-h)",
        bg: "var(--bg)",
        border: "var(--border)",
        "code-bg": "var(--code-bg)",
        accent: "var(--accent)",
      },
      fontFamily: {
        sans: ["var(--sans)"],
        heading: ["var(--heading)"],
        mono: ["var(--mono)"],
      },
    },
  },
  plugins: [],
};