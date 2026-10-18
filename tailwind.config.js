/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        shopee: {
          primary: '#EE4D2D',
          hover: '#F05D40',
          dark: '#E2492B',
          tint: '#FACAC0',
          red: '#D0011B',
          yellow: '#FFCE3D',
          teal: '#00BFA5',
          blue: '#066BC8',
          bg: '#F5F5F5',
          card: '#FFFFFF',
          'card-light': '#FAFAFA',
          subtle: '#FBFBFB',
          divider: '#F8F8F8',
          border: '#CCCCCC',
          'text-dark': '#222222',
          'text-muted': '#555555',
          'text-sub': '#5A5A5A',
        },
      },
      borderRadius: {
        none: '0',
        xs: '2px',
        sm: '2px',
        DEFAULT: '2px',
        md: '3px',
        lg: '4px',
        xl: '4px',
        '2xl': '4px',
        '3xl': '4px',
        full: '9999px',
      },
      fontFamily: {
        sans: ['Roboto', 'Titillium Web', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        titillium: ['Titillium Web', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        shopee: '0 1px 1px 0 rgba(0, 0, 0, 0.05)',
        'shopee-hover': '0 1px 20px 0 rgba(0, 0, 0, 0.08)',
        'shopee-header': '0 4px 6px -1px rgba(0, 0, 0, 0.07)',
      },
    },
  },
  plugins: [],
};
