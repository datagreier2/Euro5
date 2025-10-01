/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Source Serif 4"', 'serif'],
        sans: ['"Source Sans 3"', 'ui-sans-serif', 'system-ui'],
      },
      colors: { slate: { 850: '#1e293b' } },
      scale: { '102': '1.02' },
    },
  },
  plugins: [],
};
