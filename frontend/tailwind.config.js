module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Tell Tailwind where to find your components
  ],
  theme: {
    fontFamily: {
    sans: ['Inter', 'sans-serif'],
    mono: ['Fira Code', 'monospace'],
  },
  extend: {
    colors: {
      darkCard: '#1e293b',
      darkBg: '#0f172a',
    },
  },
  },
  plugins: [],
};
