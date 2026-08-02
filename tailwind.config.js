/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Deliberate soft porcelain (neutral, not the default warm cream)
        paper: '#f6f6f4',
        gold: {
          light: '#e0b84d',
          DEFAULT: '#b8860b',
          dark: '#8a6508',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 9s ease-in-out infinite',
        'spin-slow': 'spin-slow 55s linear infinite',
        shimmer: 'shimmer 6s linear infinite',
        'pulse-slow': 'pulse-slow 10s ease-in-out infinite',
        marquee: 'marquee 44s linear infinite',
      },
    },
  },
  plugins: [],
}
