/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {

      keyframes: {
         drift: {
          '0%': { transform: 'translate(var(--x-start), var(--y-start))' },
          '50%': { transform: 'translate(var(--x-mid), var(--y-mid))' },
          '100%': { transform: 'translate(var(--x-end), var(--y-end))' },
        },
        
        // ... your existing keyframes
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseBright: {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 10px rgba(255, 165, 0, 0.5)' },
          '50%': { opacity: 0.9, boxShadow: '0 0 20px rgba(255, 165, 0, 1)' },
        },
        fadeInStagger: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        confettiFall: {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: 1 },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: 0 },
        },
      },
      animation: {
        // ... your existing animations
        
        float: 'float 3s ease-in-out infinite',
        pulseBright: 'pulseBright 2s ease-in-out infinite',
        fadeInStagger: 'fadeInStagger 0.5s ease-out forwards',
        confettiFall: 'confettiFall 5s linear forwards',
        drift: 'drift 10s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};