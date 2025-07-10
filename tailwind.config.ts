import type { Config } from 'tailwindcss'

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      sm: '420px',
      md: '768px',
      lg: '1060px',
    },
    extend: {
      colors: {
        primary: "#181D27",
        gray: {
          "-100": "#F2F2F7",
          0: "#F9F5FF",
          100: "#FAFAFA",
          200: "#D5D7DA",
          300: "#E9EAEB",
          400: "#F5F5F5",
          500: "#A4A7AE",
          600: "#717680",
        },
        dark: {
          400: "#535862",
          500: "#414651",
          600: "#242424"
        },
        green: {
          100: "#F3F8ED",
          200: "#EAF2D9",
          300: "#ECFDF3",
          400: "#12B76A",
          500: "#027A48",
          800: "#83906A",
          900: "#6D7A52",
          1000: "#5C6549",
          1100: "#424931",
        },
        orange: {
          300: "#FFFAEB",
          400: "#F79009",
          500: "#B54708"
        },
        purple: {
          100: "rgba(105, 65, 198, 0.1)",
          200: "#F4EBFF",
          900: "#7F56D9",
          1000: '#6941C6',
        },
        blue: {
          300: "#F0F9FF",
          400: "#0BA5EC",
          500: "#026AA2",
          900: "#1B2A41",
        }
      }
    },
    fontFamily: {
      inter: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont']
    },
  },
  plugins: [],
}
export default config
