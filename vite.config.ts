import { resolve } from "path"; /// npm install @types/node --save-dev
import { defineConfig } from "vite";
// import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";

const host = process.env.TAURI_DEV_HOST;

export default defineConfig(async () => ({
  plugins: [react()],
  // plugins: [react(), svgr({ svgrOptions: { icon: true } })],
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
        protocol: "ws",
        host,
        port: 1421,
      }
      : undefined,
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, 'src'),
      "@layout": resolve(__dirname, 'src/layout'),
      "@utility": resolve(__dirname, 'src/utility'),
      "@components": resolve(__dirname, 'src/components'),
      "@actions": resolve(__dirname, 'src/components/actions'),
      "@models": resolve(__dirname, 'src/components/models'),
      "@pages": resolve(__dirname, 'src/components/pages'),
      "@views": resolve(__dirname, 'src/components/views'),
    },
  },
}));
