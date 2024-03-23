import type { Config } from 'tailwindcss';
const colors = require('tailwindcss/colors');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        secondary: colors.purple,
        tertiary: colors.cyan,
        grayscale: {
          ...colors.slate,
          950: '#010101',
        },
        success: colors.green,
        failure: colors.red,
        warning: colors.yellow,
        dark: '#020617',
        light: '#ffffff',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'logo-fade-in': 'fadeIn 1s forwards',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
export default config;
