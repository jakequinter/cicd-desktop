/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];

module.exports = {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ...colors,
        gray: colors.slate,
      },
      fontSize: {
        sm: ['0.75rem', '1.125rem'],
        base: ['0.875rem', '1.25rem'],
        lg: ['1rem', '1.5rem'],
        xl: ['1.125rem', '1.75rem'],
        '2xl': ['1.25rem', '1.75rem'],
        '3xl': ['1.5rem', '2rem'],
        '4xl': ['1.875rem', '2.25rem'],
        '5xl': ['2.25rem', '2.5rem'],
        '6xl': ['3rem', '1'],
        '7xl': ['3.75rem', '1'],
        '8xl': ['4.5rem', '1'],
        '9xl': ['6rem', '1'],
      },
      screens: {
        xs: '575px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
