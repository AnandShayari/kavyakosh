import forms from '@tailwindcss/forms';

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0B0B0F',
        primary: '#D4AF37',
        secondary: '#8B5CF6',
        surface: '#14141A',
        border: '#23232B',
        text: '#F5F5F5',
        muted: '#A1A1AA',
        success: '#22C55E',
        error: '#EF4444',
      },
      boxShadow: {
        glow: '0 0 48px rgba(212, 175, 55, 0.18)',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        accent: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top, rgba(212,175,55,0.12), transparent 45%), radial-gradient(circle at bottom right, rgba(139,92,246,0.18), transparent 35%)',
      },
    },
  },
  plugins: [forms],
};
