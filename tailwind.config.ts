import type { Config } from 'tailwindcss';

/**
 * Tailwind configuration — dark-mode only.
 * Every visual value references a CSS custom property defined in
 * `app/globals.css`, so components consume design tokens rather than
 * hard-coded values. The single accent is the deep cobalt blue derived from
 * the supplied palette (no light theme is defined or shipped).
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-base': 'var(--bg-base)',
        'bg-elevated': 'var(--bg-elevated)',
        'bg-surface': 'var(--bg-surface)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        'accent-950': 'var(--accent-950)',
        'accent-900': 'var(--accent-900)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-text': 'var(--accent-text)',
        'accent-glow': 'var(--accent-glow)',
        danger: 'var(--danger)',
        success: 'var(--success)',
      },
      fontFamily: {
        ui: 'var(--font-ui)',
        sans: 'var(--font-ui)',
        mono: 'var(--font-mono)',
      },
      spacing: {
        'ds-1': 'var(--space-1)',
        'ds-2': 'var(--space-2)',
        'ds-3': 'var(--space-3)',
        'ds-4': 'var(--space-4)',
        'ds-6': 'var(--space-6)',
        'ds-8': 'var(--space-8)',
        'ds-12': 'var(--space-12)',
        'ds-16': 'var(--space-16)',
        'ds-24': 'var(--space-24)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },
      boxShadow: {
        1: 'var(--shadow-1)',
        2: 'var(--shadow-2)',
        3: 'var(--shadow-3)',
        glow: '0 0 24px var(--accent-glow)',
      },
      backdropBlur: {
        glass: 'var(--glass-blur)',
      },
      transitionTimingFunction: {
        standard: 'var(--ease-standard)',
      },
      transitionDuration: {
        fast: 'var(--motion-fast)',
        base: 'var(--motion-base)',
        slow: 'var(--motion-slow)',
      },
      fontSize: {
        display: 'var(--text-display)',
        h1: 'var(--text-h1)',
        h2: 'var(--text-h2)',
        h3: 'var(--text-h3)',
        body: 'var(--text-body)',
        small: 'var(--text-small)',
        'mono-base': 'var(--text-mono)',
      },
    },
  },
  plugins: [],
};

export default config;
