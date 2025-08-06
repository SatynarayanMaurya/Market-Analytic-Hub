// tailwind.config.js
module.exports = {
  content: [
    "./index.html",             // for Vite or plain HTML
    "./src/**/*.{js,jsx,ts,tsx}" // adjust based on your folder structure
  ],
  darkMode: 'class', // 👈 Enables class-based dark mode
  theme: {
    extend: {},
  },
  plugins: [],
}
