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
          "-200": "#EFEFEF",
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
          400: "#32D583",
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
          300: "#F0ECF9",
          900: "#7F56D9",
          1000: '#6941C6',
        },
        blue: {
          300: "#F0F9FF",
          400: "#0BA5EC",
          500: "#026AA2",
          900: "#1B2A41",
        },
        red: {
          100: "#FFF6ED",
          500: "#C4320A",
        }
      }
    },
    fontFamily: {
      inter: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont']
    },
    boxShadow: {
      100: "0px 0px 24px 0px #6941C626 inset",
      200: "0px 4px 4px 0px #E9EAEB",
      300: "0px 4px 6px -2px #0A0D1208",
    }
  },
  plugins: [],
}
export default config
