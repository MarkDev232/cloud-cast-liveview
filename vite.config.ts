import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  base: "/cloud-cast-liveview/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Disable lovable-tagger for now to debug build
    // mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Let Vite automatically detect `index.html` — remove explicit input config
  // build: {
  //   rollupOptions: {
  //     input: path.resolve(__dirname, "index.html"),
  //   },
  // },
}));
