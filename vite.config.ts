import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { galleryPlugin } from "./vite-plugin-gallery";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    galleryPlugin(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Single vendor chunk — splitting React into vendor-react vs vendor caused
        // "createContext of undefined" in preview/production (Radix etc. need same React instance)
        manualChunks: (id) =>
          id.includes("node_modules") ? "vendor" : undefined,
      },
    },
    chunkSizeWarningLimit: 700,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Use CJS bundle to avoid broken ESM icon resolution (missing .js files in node_modules)
      "lucide-react": path.resolve(
        __dirname,
        "node_modules/lucide-react/dist/cjs/lucide-react.js"
      ),
    },
  },
}));
