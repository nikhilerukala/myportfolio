import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--rgb-bg) / <alpha-value>)',
        surface: 'rgb(var(--rgb-surface) / <alpha-value>)',
        elevated: 'var(--color-elevated)',
        fg: 'rgb(var(--rgb-fg) / <alpha-value>)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
        control: 'var(--color-control)',
        success: 'var(--color-success)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          ink: 'var(--color-accent-ink)',
          contrast: 'var(--color-accent-contrast)',
          2: 'var(--color-accent-2)',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        display: ['clamp(2.5rem, 1.5rem + 4.4vw, 5.25rem)', { lineHeight: '1.02', letterSpacing: '-0.04em' }],
        h2: ['clamp(2rem, 1.5rem + 2.2vw, 3.25rem)', { lineHeight: '1.05', letterSpacing: '-0.035em' }],
        h3: ['clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
      },
      maxWidth: {
        content: '1200px',
        prose: '68ch',
      },
      boxShadow: {
        card: '0 1px 0 0 rgb(255 255 255 / 0.04) inset, 0 20px 40px -24px rgb(28 25 23 / 0.18)',
        glow: '0 10px 40px -10px var(--color-glow)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(4%, 6%, 0) scale(1.08)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' },
        },
        shine: {
          '0%, 60%': { transform: 'translateX(-120%) skewX(-20deg)' },
          '100%': { transform: 'translateX(220%) skewX(-20deg)' },
        },
        ping: {
          '75%, 100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 700ms cubic-bezier(0.16, 1, 0.3, 1) both',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        drift: 'drift 18s ease-in-out infinite',
        marquee: 'marquee 60s linear infinite',
        'marquee-reverse': 'marquee-reverse 60s linear infinite',
        shine: 'shine 3.5s ease-in-out infinite',
        ping: 'ping 1.6s cubic-bezier(0, 0, 0.2, 1) infinite',
        'gradient-pan': 'gradient-pan 8s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
};

export default config;
