import type { Config } from 'tailwindcss';

// Design tokens from design/export (AnnaResumeV2).
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        wine: { DEFAULT: '#5E0B1C', hover: '#8A1A2E' },
        paper: '#FAF7F4',
        ink: '#1C1215',
        muted: '#6B5B5E',
        line: '#E2D6D1',
        blush: { DEFAULT: '#F1E3DF', line: '#D9C3BE' },
        rose: { DEFAULT: '#E8C9C6', soft: '#E9D7D3', pale: '#F3E7E4' },
        portrait: '#EAD3CB',
        stone: '#EDEBEA',
        phone: '#140709',
        film: '#4B4446',
      },
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        script: ['"Marck Script"', 'cursive'],
      },
      maxWidth: { page: '1312px', header: '1440px' },
    },
  },
  plugins: [],
} satisfies Config;
