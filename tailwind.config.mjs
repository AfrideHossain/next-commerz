/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        thenewgreeny: {
          primary: "oklch(69% 0.17 162.48)",
          "primary-content": "oklch(98% 0.026 102.212)",
          secondary: "oklch(76% 0.188 70.08)",
          "secondary-content": "oklch(98% 0.014 180.72)",
          accent: "oklch(70% 0.14 182.503)",
          "accent-content": "oklch(97% 0.014 308.299)",
          neutral: "oklch(37% 0.044 257.287)",
          "neutral-content": "oklch(98% 0.003 247.858)",
          "base-100": "oklch(20% 0.042 265.755)",
          "base-200": "oklch(20% 0.042 265.755)",
          "base-300": "oklch(27% 0.041 260.031)",
          "base-content": "oklch(96% 0.007 247.896)",
          info: "oklch(74% 0.16 232.661)",
          success: "oklch(76% 0.177 163.223)",
          warning: "oklch(75% 0.183 55.934)",
          error: "oklch(70% 0.191 22.216)",
          "border-radius": "1rem",
        },
      },
    ],
  },
};

export default config;
