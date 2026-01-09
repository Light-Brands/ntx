import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // VIBEUP Brand Colors
        'vibe-deep-blue': '#002B7F',
        'vibe-white': '#F7F9FC',
        'vibe-graphite': '#0A0C10',
        'sky-blue': '#5BB8FF',
        'soft-aqua': '#A7E6FF',
        'midnight-blue': '#001A47',
        'light-grey': '#E6E9EF',
        'cool-grey': '#C7CEDA',
        
        // Semantic color mappings
        primary: '#002B7F',
        'primary-hover': '#001A47',
        accent: '#5BB8FF',
        'accent-light': '#A7E6FF',
        background: '#F7F9FC',
        foreground: '#0A0C10',
        border: '#C7CEDA',
        'border-light': '#E6E9EF',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      borderRadius: {
        'sm': '8px',
        'DEFAULT': '12px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(0, 43, 127, 0.05)',
        'DEFAULT': '0 2px 8px rgba(0, 43, 127, 0.08)',
        'md': '0 4px 12px rgba(0, 43, 127, 0.12)',
        'lg': '0 8px 24px rgba(0, 43, 127, 0.15)',
        'xl': '0 12px 32px rgba(0, 43, 127, 0.18)',
        'mira': '0 0 24px rgba(91, 184, 255, 0.2)',
        'mira-strong': '0 0 32px rgba(91, 184, 255, 0.3)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #002B7F 0%, #5BB8FF 100%)',
        'gradient-depth': 'linear-gradient(135deg, #002B7F 0%, #001A47 100%)',
        'gradient-subtle': 'linear-gradient(135deg, #F7F9FC 0%, rgba(167, 230, 255, 0.1) 100%)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config

