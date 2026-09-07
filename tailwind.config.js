/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#07080e',
        surface: '#0d101a',
        'surface-card': '#131726',
        'surface-elevated': '#1a2035',
        'surface-border': '#222b46',
        
        // Dark Mode System Colors
        card: '#0f1322',
        border: '#1f2742',
        
        // Brand Color Theory (Cyan -> Electric Blue -> Deep Violet)
        brand: {
          cyan: '#00A3FF',
          sky: '#38BDF8',
          blue: '#0066FF',
          indigo: '#4F46E5',
          violet: '#745EFF',
          purple: '#9D8DFF',
        },

        primary: {
          DEFAULT: '#0066FF',
          hover: '#0052cc',
          light: '#38BDF8',
          glow: 'rgba(0, 163, 255, 0.4)',
        },

        secondary: {
          DEFAULT: '#745EFF',
          hover: '#6148eb',
          light: '#9D8DFF',
          glow: 'rgba(116, 94, 255, 0.4)',
        },

        // Harmonious Functional Accents
        accent: {
          cyan: '#00F0FF',
          emerald: '#00F29D',
          mint: '#10B981',
          amber: '#FFB800',
          orange: '#FF7A00',
          rose: '#FF3366',
          purple: '#B537F2',
        },

        dark: {
          50: '#2b3452',
          100: '#1e2438',
          200: '#141827',
          300: '#0e111d',
          400: '#07080e',
          900: '#030408',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Kanit', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Kanit', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #00A3FF 0%, #0066FF 45%, #745EFF 100%)',
        'aurora-gradient': 'linear-gradient(135deg, #00F29D 0%, #00A3FF 50%, #745EFF 100%)',
        'sunset-gradient': 'linear-gradient(135deg, #FFB800 0%, #FF3366 100%)',
        'cosmic-gradient': 'linear-gradient(135deg, #745EFF 0%, #B537F2 50%, #00F0FF 100%)',
        'hero-radial': 'radial-gradient(circle at 50% 25%, rgba(0, 163, 255, 0.18) 0%, rgba(116, 94, 255, 0.12) 35%, rgba(0, 242, 157, 0.04) 65%, transparent 80%)',
        'glass-sheen': 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.02) 100%)',
      },
      boxShadow: {
        'neon-blue': '0 0 25px -5px rgba(0, 163, 255, 0.5)',
        'neon-purple': '0 0 25px -5px rgba(116, 94, 255, 0.5)',
        'neon-emerald': '0 0 25px -5px rgba(0, 242, 157, 0.4)',
        'neon-amber': '0 0 25px -5px rgba(255, 184, 0, 0.4)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'blur(20px)' },
          '100%': { opacity: '0.8', filter: 'blur(35px)' },
        },
      },
    },
  },
  plugins: [],
}
