/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#c084fc",
        "secondary": "#f472b6",
        "tertiary": "#67e8f9",
        "background": "#0d0d14",
        "surface": "#13131f",
        "surface-bright": "#1a1a2e",
        "surface-container": "#16162a",
        "surface-container-highest": "#1e1e35",
        "outline-variant": "#1e1e2e",
        "on-surface": "#f1f0ff",
        "on-background": "#f1f0ff",
        "muted": "#9d9dbf",
        "success": "#86efac",
        "error": "#fca5a5",
        "on-primary": "#0a0012",
        "on-secondary": "#09090b",
        "on-tertiary": "#001a12"
      },
      fontFamily: {
        headline: ["Geist", "sans-serif"],
        display: ["Geist", "sans-serif"],
        body: ["Geist", "sans-serif"],
        label: ["Geist", "sans-serif"]
      },
      spacing: {
        "m3-xs": "4px",
        "m3-lg": "24px",
        "m3-sm": "8px",
        "m3-base": "8px",
        "m3-xl": "32px",
        "margin-desktop": "24px",
        "max-width": "1280px",
        "gutter": "16px",
        "margin-mobile": "16px",
        "m3-2xl": "48px",
        "m3-md": "16px"
      },
      fontSize: {
        "headline-lg": ["32px", { "lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "700" }],
        "display-lg": ["48px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "body-sm": ["14px", { "lineHeight": "1.5", "fontWeight": "400" }],
        "label-sm": ["12px", { "lineHeight": "1", "fontWeight": "500" }],
        "headline-lg-mobile": ["24px", { "lineHeight": "1.2", "fontWeight": "700" }],
        "headline-sm": ["20px", { "lineHeight": "1.4", "fontWeight": "600" }],
        "headline-md": ["24px", { "lineHeight": "1.3", "fontWeight": "600" }],
        "body-md": ["16px", { "lineHeight": "1.6", "fontWeight": "400" }],
        "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }],
        "label-md": ["14px", { "lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "600" }]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      maxWidth: {
        "xs": "20rem",
        "sm": "24rem",
        "md": "28rem",
        "lg": "32rem",
        "xl": "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "max-width": "1280px",
      },
      keyframes: {
        slideUpFade: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fluidGradient: {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
      },
      animation: {
        'slide-up': 'slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fluid-anim': 'fluidGradient 15s ease infinite',
      },
    },
  },
  plugins: [],
}
