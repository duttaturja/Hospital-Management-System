/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        light: {
          primary: '#2563EB',
          secondary: '#64748B',
          accent: '#10B981',
          background: '#F9FAFB',
          surface: '#FFFFFF',
          border: '#E5E7EB',
          'text-primary': '#111827',
          'text-secondary': '#4B5563',
          muted: '#9CA3AF',
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6',
        },
        dark: {
          primary: '#3B82F6',
          secondary: '#94A3B8',
          accent: '#34D399',
          background: '#0F172A',
          surface: '#1E293B',
          border: '#334155',
          'text-primary': '#F9FAFB',
          'text-secondary': '#CBD5E1',
          muted: '#64748B',
          success: '#4ADE80',
          warning: '#FBBF24',
          error: '#F87171',
          info: '#60A5FA',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
};