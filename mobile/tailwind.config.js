/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      
      // Background & Surfaces
      surface: 'var(--color-surface)',
      'surface-dim': 'var(--color-surface-dim)',
      'surface-bright': 'var(--color-surface-bright)',
      'surface-container-lowest': 'var(--color-surface-container-lowest)',
      'surface-container-low': 'var(--color-surface-container-low)',
      'surface-container': 'var(--color-surface-container)',
      'surface-container-high': 'var(--color-surface-container-high)',
      'surface-container-highest': 'var(--color-surface-container-highest)',
      'surface-variant': 'var(--color-surface-variant)',
      'surface-tint': 'var(--color-surface-tint)',
      
      // Brand Colors
      primary: 'var(--color-primary)',
      'on-primary': 'var(--color-on-primary)',
      'primary-container': 'var(--color-primary-container)',
      'on-primary-container': 'var(--color-on-primary-container)',
      'inverse-primary': 'var(--color-inverse-primary)',
      
      secondary: 'var(--color-secondary)',
      'on-secondary': 'var(--color-on-secondary)',
      'secondary-container': 'var(--color-secondary-container)',
      'on-secondary-container': 'var(--color-on-secondary-container)',
      
      tertiary: 'var(--color-tertiary)',
      'on-tertiary': 'var(--color-on-tertiary)',
      'tertiary-container': 'var(--color-tertiary-container)',
      'on-tertiary-container': 'var(--color-on-tertiary-container)',
      
      // Text & Accents
      'on-surface': 'var(--color-on-surface)',
      'on-surface-variant': 'var(--color-on-surface-variant)',
      'inverse-surface': 'var(--color-inverse-surface)',
      'inverse-on-surface': 'var(--color-inverse-on-surface)',
      outline: 'var(--color-outline)',
      'outline-variant': 'var(--color-outline-variant)',
      
      // Status
      error: 'var(--color-error)',
      'on-error': 'var(--color-on-error)',
      'error-container': 'var(--color-error-container)',
      'on-error-container': 'var(--color-on-error-container)',
      
      background: 'var(--color-background)',
      'on-background': 'var(--color-on-background)',
    },
    extend: {
      fontFamily: {
        jakarta: ['PlusJakarta-Regular'],
        'jakarta-medium': ['PlusJakarta-Medium'],
        'jakarta-semibold': ['PlusJakarta-SemiBold'],
        'jakarta-bold': ['PlusJakarta-Bold'],
        'jakarta-extrabold': ['PlusJakarta-ExtraBold'],
      },
      fontSize: {
        'headline-xl': ['24px', { lineHeight: '32px', fontWeight: '700' }],
        'headline-lg': ['20px', { lineHeight: '28px', fontWeight: '700' }],
        'headline-md': ['18px', { lineHeight: '24px', fontWeight: '600' }],
        'body-lg': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-md': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'label-md': ['12px', { lineHeight: '16px', fontWeight: '500' }],
        'label-sm': ['10px', { lineHeight: '14px', fontWeight: '600', letterSpacing: '0.02em' }],
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
      },
      spacing: {
        'margin-page': '16px',
        'gutter-grid': '12px',
        'stack-sm': '8px',
        'stack-md': '16px',
        'stack-lg': '24px',
      }
    },
  },
  plugins: [],
};
