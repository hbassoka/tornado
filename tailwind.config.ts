import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{html,ts}'],

  theme: {
    extend: {
      colors: {
        primary: '#0f172a',     // Bleu foncé pro
        secondary: '#4f46e5',   // Indigo
        accent: '#facc15',      // Jaune doré
        background: '#f9fafb',
        dark: '#1e293b',
      },

      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Luckiest Guy"', 'cursive'],
      },

      animation: {
        float: 'float 4s ease-in-out infinite',
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

export default config;
