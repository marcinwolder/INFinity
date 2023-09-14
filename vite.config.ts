import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { qrcode } from "vite-plugin-qrcode";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true,
  },
  plugins: [
    react(),
    qrcode({
      filter(url) {
        return url === "https://192.168.100.10:5173/";
      },
    }),
  ],
  define: { __APP_ENV__: process.env.VITE_VERCEL_ENV },
});
