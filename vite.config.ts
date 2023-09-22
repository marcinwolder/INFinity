import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ["**/*.md"],
  server: {
    https: true,
  },
  plugins: [react()],
  define: { __APP_ENV__: process.env.VITE_VERCEL_ENV },
});
