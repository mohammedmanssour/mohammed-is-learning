module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: '#f2f5f7',
        accent: '#fec576',
        blue: '#006bb8',
        dark: {
          900: '#0F1624',
          800: '#2c304d',
        },
      },
      gridTemplateRows: {
        '3-60px': 'repeat(3, 60px)',
      },
    },
  },
  plugins: [],
};
