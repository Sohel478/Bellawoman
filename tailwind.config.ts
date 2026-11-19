import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          poppy: "#FF312C",
          "poppy-hover": "#E02621",
          "poppy-light": "#FFF2F1",
          teal: "#06262B",
          "teal-light": "#0B3B42",
          sand: "#FAF9F5",
          cream: "#F4EFEA",
          border: "#EAE6DF",
        },
      },
    },
  },
  plugins: [],
};

export default config;
