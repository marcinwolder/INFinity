import { createRequire } from "module";
import daisyuiPlugin from "daisyui";
import opentypePlugin from "tailwindcss-opentype";
import { themeNames } from "./src/utils/theme.ts";

const require = createRequire(import.meta.url);
const tailwindTextShadowPlugin = require(
  "@designbycode/tailwindcss-text-shadow",
);

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textShadow: {
        codeBack: "0 0 40px rgba(0,0,0,0.5)",
      },
      colors: {
        stara: "#8c8c8c",
        2015: "#bfbfbf",
        2023: "#d5b8ea",
      },
    },
  },
  plugins: [opentypePlugin, daisyuiPlugin, tailwindTextShadowPlugin],
  daisyui: {
    themes: themeNames,
  },
};
