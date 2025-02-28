// vite.config.js
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    open: true,
    strictPort: true,
  },
  build: {
    outDir: "dist",
  },
  base: "/",
});
