/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FEF2F7',
          100: '#FDE5EF',
          200: '#FBCCE0',
          300: '#F8BBD9', // Main primary
          400: '#F599C3',
          500: '#F277AE',
          600: '#EE5599',
          700: '#EA3384',
          800: '#E6126F',
          900: '#C10D5E',
        },
        secondary: {
          50: '#F3FBF6',
          100: '#E7F6ED',
          200: '#D0EEDD',
          300: '#B7E4C7', // Main secondary
          400: '#9EDAB1',
          500: '#85D09B',
          600: '#6CC685',
          700: '#52BC6F',
          800: '#39B359',
          900: '#309A4D',
        },
        accent: {
          50: '#FFFAF2',
          100: '#FFF5E5',
          200: '#FFEBCC',
          300: '#FFE5B4', // Main accent
          400: '#FFD99B',
          500: '#FFCD82',
          600: '#FFC169',
          700: '#FFB550',
          800: '#FFA937',
          900: '#FF9D1E',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      spacing: {
        '0.5': '4px',
        '1': '8px',
        '1.5': '12px',
        '2': '16px',
        '2.5': '20px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '8': '64px',
        '10': '80px',
        '12': '96px',
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};