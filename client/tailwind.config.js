/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        linen: '#f7f2eb',
        sand: '#ede3d5',
        cocoa: '#6e5845',
        ink: '#221f1b',
        clay: '#b98c64',
        moss: '#5f6d63'
      },
      fontFamily: {
        heading: ['"Playfair Display"', '"Iowan Old Style"', '"Palatino Linotype"', 'serif'],
        body: ['Poppins', '"Avenir Next"', '"Segoe UI"', 'sans-serif']
      },
      boxShadow: {
        soft: '0 20px 60px rgba(43, 35, 26, 0.08)',
        card: '0 18px 40px rgba(34, 31, 27, 0.08)'
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' }
        },
        pulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(17, 24, 39, 0.16)' },
          '70%': { boxShadow: '0 0 0 14px rgba(17, 24, 39, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(17, 24, 39, 0)' }
        }
      },
      animation: {
        'fade-up': 'fade-up 700ms ease-out forwards',
        shimmer: 'shimmer 1.6s linear infinite',
        float: 'float 3.2s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2.2s ease-out infinite'
      }
    }
  },
  plugins: []
};
