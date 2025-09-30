/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Georgia', 'Times New Roman', 'serif'],
      },
      colors: {
        slate: {
          850: '#1e293b',
        },
      },
      scale: {
        '102': '1.02',
      },
    },
  },
  plugins: [],
};
