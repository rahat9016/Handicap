/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          xsm: "100%",
          xm: "100%",
          xlg: "100%",
          sm: "100%",
          md: "100%",
          tab: "100%",
          lg: "1024px",
          xl: "1280px",
          '2xl': "1536px",
        },
        padding: {
          DEFAULT: "1rem",
          "2xl": "0rem",
        },
      },
      colors: {
        "primary": "#242D65",
        "secondary": "#F68C25",
        aliceBlue: "#F2FBFD",
        lightBlue: "#EFF3F4",
        greyLight: "#F2F2F2",
        pureBlack: "#000000",
        black: "#0D121F",
        charcoalGray: "#363739",
        darkGray: "#6B6B6B",
        mediumGray: "#9B9B9C",
        lightGray: "#CDCDCD",
        softGray: "#E6E6E6",
        pureWhite: "#EFF0EF",
        forestWhite: "#FCFCFD",
        // primary: {
        //   DEFAULT: "hsl(var(--primary))",
        //   foreground: "hsl(var(--primary-foreground))",
        // },
        // secondary: {
        //   DEFAULT: "hsl(var(--secondary))",
        //   foreground: "hsl(var(--secondary-foreground))",
        // },
        "secondary-transparent": "rgba(255, 0, 0,.1)",
        gray: "#D9D9D9",
        gainsboro: "#DDDDDD",
        light: "#E6E6E6",
        "gray-dark": "#7A7A7A",
        "spanish-gray": "#9B9B9C",
        "light-gray": "#F3F5F6",
        "dim-gray": "#8D8D8D",
        "slate-gray": "#CDCDCD",
        yellow: "#FFC702",
        "black-dim": "#2B2B2B",
        "black-dark": "#363739",
        "black-light": "#7E7E7E",
        link: "#2C77AC",
        "white-light": "#EAEAEA",
        overlay: "rgba(0,0,0,0.5)",
        blue: "#1877F2",
        silver: "#6F6E77",
        green: "#02BF6C",
        cultured: "#F6F6F6",
        "gray-light": "#F4F4F4",
        skeleton: "#E0E0E0",
        "skeleton-white": "#F0F0F0",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontSize: {
        "8xl": "8px",
        xsm: "10px",
        "15xl": "15px",
        "18xl": "18px",
        "22xl": "22px",
        "26xl": "26px",
        "45xl": "45px",
        "80xl": "80px",
      },
      borderRadius: {
        "5px": "5px",
        "15px": "15px",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
      },
      screens: {
        xsm: "320px",
        xm: "390px",
        xlg: "425px",
        sm: "640px",
        md: "768px",
        tab: "992px",
        lg: "1024px",
        xl: "1245px",
      },
      spacing: {
        "1px": "1px",
        "2px": "2px",
        "3px": "3px",
        "15px": "15px",
        "17px": "17px",
        "18px": "18px",
        "19px": "19px",
        "25px": "25px",
        "30px": "30px",
        "60px": "60px",
      },
      gap: {
        "19px": "19px",
      },
      filter: {
        "custom-filter":
          "brightness(0) saturate(0%) invert(37%) sepia(77%) saturate(597%) hue-rotate(-8deg) brightness(137%) contrast(160%)",
        // "white-filter": "brightness(0) saturate(100%) invert(100%)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        zoomInOut: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
        floatUp: {
          "0%": { transform: "translateY(100px)" },
          "100%": { transform: "translateY(0)" },
        },
        floatDown: {
          "0%": { transform: "translateY(-100px)" },
          "100%": { transform: "translateY(0)" },
        },
        'pulse-ring-small': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.2)', opacity: '0.3' },
        },
        'pulse-ring-big': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.4)', opacity: '0.3' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "zoom-in-out": "zoomInOut 4s ease-in-out infinite",
        floatUp: "floatUp 4s ease-out infinite",
        floatDown: "floatDown 4s ease-out infinite",
        'pulse-ring-small': 'pulse-ring-small 2s ease-in-out infinite',
        'pulse-ring-big': 'pulse-ring-big 2s ease-in-out infinite',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.white-filter': {
          filter: 'brightness(0) saturate(100%) invert(100%)',
        },
      });
    },
  ],
}

