const colors = {
  white: '#ffffff',
  black: '#000000',
  brown: '#88583e',
  pink: '#c20a52',
  beige: '#a08a7a',
  orange: '#a06347',
};

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
};