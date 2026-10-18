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
        leaf: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E', // Hijau Daun Muda Segar
          600: '#16A34A', // Hijau Daun Utama
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
          lime: '#84CC16', // Aksen Pucuk Daun
        },
        inhil: {
          river: '#0284C7',
          riverSoft: '#E0F2FE',
          gold: '#F59E0B',
          goldSoft: '#FEF3C7',
          red: '#EF4444',
          redSoft: '#FEE2E2',
        },
      },
      borderRadius: {
        none: '0',
        xs: '6px',
        sm: '8px',
        DEFAULT: '12px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '28px',
        full: '9999px',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Roboto', 'sans-serif'],
        titillium: ['Plus Jakarta Sans', 'Titillium Web', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 10px -2px rgba(22, 163, 74, 0.08), 0 1px 3px 0 rgba(0, 0, 0, 0.04)',
        hover: '0 10px 25px -4px rgba(22, 163, 74, 0.12), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        header: '0 4px 20px -2px rgba(21, 128, 61, 0.15)',
      },
    },
  },
  plugins: [],
};
