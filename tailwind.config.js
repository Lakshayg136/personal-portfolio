/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: 'var(--bg-primary)',
        bgSecondary: 'var(--bg-secondary)',
        bgCard: 'var(--bg-card)',
        bgCardHover: 'var(--bg-card-hover)',
        textPrimary: 'var(--text-primary)',
        textSecondary: 'var(--text-secondary)',
        textMuted: 'var(--text-muted)',
        accentPrimary: 'var(--accent-primary)',
        accentSecondary: 'var(--accent-secondary)',
        borderSubtle: 'var(--border-subtle)',
        borderHover: 'var(--border-hover)',
        statusGreen: 'var(--status-green)',
        statusAmber: 'var(--status-amber)',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 15px rgba(108, 99, 255, 0.2)',
        'glow-accent': '0 0 25px rgba(108, 99, 255, 0.4)',
      },
      backgroundImage: {
        'accent-gradient': 'var(--accent-gradient)',
      },
      animation: {
        'float-slow': 'float 15s ease-in-out infinite',
        'float-slower': 'float 20s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
