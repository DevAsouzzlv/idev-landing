/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        idev: {
          black: '#0D0F17',
          pureBlack: '#000000',
          amber: '#FACC15',
          amberHover: '#EAB308',
          amberSoft: '#FEF08A',
          lightBg: '#F8FAFC',
          pureWhite: '#FFFFFF',
          cardLight: '#FFFFFF',
          cardDark: '#131722',
          muted: '#64748B',
          borderLight: '#E2E8F0',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      boxShadow: {
        soft: '0 20px 40px -15px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 25px 50px -12px rgba(0, 0, 0, 0.12)',
        'amber-pill': '0 10px 25px -5px rgba(250, 204, 21, 0.40)',
        'dark-float': '0 25px 60px -15px rgba(13, 15, 23, 0.35)',
        'tech-glow': '0 0 40px -10px rgba(250, 204, 21, 0.30)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.38s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in': 'scale-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};
