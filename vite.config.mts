import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


const DEFAULT_PORT = 3000;


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: DEFAULT_PORT,
  },
  build: {
    outDir: "build",
    rollupOptions: {
      output: {
        format: "esm",
      },
    },
  },
  esbuild: {
    target: "esnext",
  },
});
