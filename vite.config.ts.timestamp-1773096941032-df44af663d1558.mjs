// vite.config.ts
import { defineConfig } from "file:///E:/Saqib/ADE/True-North-Patio-cabinet/node_modules/vite/dist/node/index.js";
import react from "file:///E:/Saqib/ADE/True-North-Patio-cabinet/node_modules/@vitejs/plugin-react-swc/index.js";
import path2 from "path";
import { componentTagger } from "file:///E:/Saqib/ADE/True-North-Patio-cabinet/node_modules/lovable-tagger/dist/index.js";

// vite-plugin-gallery.ts
import fs from "fs";
import path from "path";
var EXT = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
function scan(dir, publicPath) {
  const list = [];
  if (!fs.existsSync(dir)) return list;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const rel = full.replace(publicPath, "").replace(/\\/g, "/");
    if (fs.statSync(full).isDirectory()) {
      list.push(...scan(full, publicPath));
    } else if (EXT.includes(path.extname(name).toLowerCase())) {
      list.push(rel);
    }
  }
  return list;
}
function galleryPlugin() {
  return {
    name: "gallery-scan",
    configureServer() {
      const galleryDir = path.resolve(process.cwd(), "public/Gallery");
      const outPath = path.resolve(process.cwd(), "src/data/gallery-images.json");
      const images = scan(galleryDir, path.resolve(process.cwd(), "public"));
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, JSON.stringify(images, null, 2), "utf8");
      console.log("[Gallery] Scanned", images.length, "images from public/Gallery");
    },
    buildStart() {
      const galleryDir = path.resolve(process.cwd(), "public/Gallery");
      const outPath = path.resolve(process.cwd(), "src/data/gallery-images.json");
      const images = scan(galleryDir, path.resolve(process.cwd(), "public"));
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, JSON.stringify(images, null, 2), "utf8");
      console.log("[Gallery] Scanned", images.length, "images from public/Gallery");
    }
  };
}

// vite.config.ts
var __vite_injected_original_dirname = "E:\\Saqib\\ADE\\True-North-Patio-cabinet";
var vite_config_default = defineConfig(({ mode }) => ({
  plugins: [
    react(),
    galleryPlugin(),
    mode === "development" && componentTagger()
  ].filter(Boolean),
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("react-dom") || id.includes("react-router")) return "vendor-router";
            if (id.includes("react")) return "vendor-react";
            return "vendor";
          }
        }
      }
    },
    chunkSizeWarningLimit: 600
  },
  resolve: {
    alias: {
      "@": path2.resolve(__vite_injected_original_dirname, "./src"),
      // Use CJS bundle to avoid broken ESM icon resolution (missing .js files in node_modules)
      "lucide-react": path2.resolve(
        __vite_injected_original_dirname,
        "node_modules/lucide-react/dist/cjs/lucide-react.js"
      )
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidml0ZS1wbHVnaW4tZ2FsbGVyeS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXFNhcWliXFxcXEFERVxcXFxUcnVlLU5vcnRoLVBhdGlvLWNhYmluZXRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXFNhcWliXFxcXEFERVxcXFxUcnVlLU5vcnRoLVBhdGlvLWNhYmluZXRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1NhcWliL0FERS9UcnVlLU5vcnRoLVBhdGlvLWNhYmluZXQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBjb21wb25lbnRUYWdnZXIgfSBmcm9tIFwibG92YWJsZS10YWdnZXJcIjtcbmltcG9ydCB7IGdhbGxlcnlQbHVnaW4gfSBmcm9tIFwiLi92aXRlLXBsdWdpbi1nYWxsZXJ5XCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBnYWxsZXJ5UGx1Z2luKCksXG4gICAgbW9kZSA9PT0gXCJkZXZlbG9wbWVudFwiICYmIGNvbXBvbmVudFRhZ2dlcigpLFxuICBdLmZpbHRlcihCb29sZWFuKSxcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogXCI6OlwiLFxuICAgIHBvcnQ6IDgwODAsXG4gICAgaG1yOiB7XG4gICAgICBvdmVybGF5OiBmYWxzZSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IChpZCkgPT4ge1xuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIm5vZGVfbW9kdWxlc1wiKSkge1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwicmVhY3QtZG9tXCIpIHx8IGlkLmluY2x1ZGVzKFwicmVhY3Qtcm91dGVyXCIpKSByZXR1cm4gXCJ2ZW5kb3Itcm91dGVyXCI7XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJyZWFjdFwiKSkgcmV0dXJuIFwidmVuZG9yLXJlYWN0XCI7XG4gICAgICAgICAgICByZXR1cm4gXCJ2ZW5kb3JcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiA2MDAsXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgICAvLyBVc2UgQ0pTIGJ1bmRsZSB0byBhdm9pZCBicm9rZW4gRVNNIGljb24gcmVzb2x1dGlvbiAobWlzc2luZyAuanMgZmlsZXMgaW4gbm9kZV9tb2R1bGVzKVxuICAgICAgXCJsdWNpZGUtcmVhY3RcIjogcGF0aC5yZXNvbHZlKFxuICAgICAgICBfX2Rpcm5hbWUsXG4gICAgICAgIFwibm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2Nqcy9sdWNpZGUtcmVhY3QuanNcIlxuICAgICAgKSxcbiAgICB9LFxuICB9LFxufSkpO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxTYXFpYlxcXFxBREVcXFxcVHJ1ZS1Ob3J0aC1QYXRpby1jYWJpbmV0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxTYXFpYlxcXFxBREVcXFxcVHJ1ZS1Ob3J0aC1QYXRpby1jYWJpbmV0XFxcXHZpdGUtcGx1Z2luLWdhbGxlcnkudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1NhcWliL0FERS9UcnVlLU5vcnRoLVBhdGlvLWNhYmluZXQvdml0ZS1wbHVnaW4tZ2FsbGVyeS50c1wiOy8qKlxuICogVml0ZSBwbHVnaW46IGF1dG8tc2NhbiBwdWJsaWMvR2FsbGVyeSBvbiBkZXYgJiBidWlsZFxuICogTm8gbmVlZCB0byBydW4gbnBtIHJ1biBnYWxsZXJ5IC0gaW1hZ2VzIHNob3cgYXV0b21hdGljYWxseVxuICovXG5pbXBvcnQgdHlwZSB7IFBsdWdpbiB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5jb25zdCBFWFQgPSBbXCIuanBnXCIsIFwiLmpwZWdcIiwgXCIucG5nXCIsIFwiLndlYnBcIiwgXCIuZ2lmXCJdO1xuXG5mdW5jdGlvbiBzY2FuKGRpcjogc3RyaW5nLCBwdWJsaWNQYXRoOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gIGNvbnN0IGxpc3Q6IHN0cmluZ1tdID0gW107XG4gIGlmICghZnMuZXhpc3RzU3luYyhkaXIpKSByZXR1cm4gbGlzdDtcbiAgZm9yIChjb25zdCBuYW1lIG9mIGZzLnJlYWRkaXJTeW5jKGRpcikpIHtcbiAgICBjb25zdCBmdWxsID0gcGF0aC5qb2luKGRpciwgbmFtZSk7XG4gICAgY29uc3QgcmVsID0gZnVsbC5yZXBsYWNlKHB1YmxpY1BhdGgsIFwiXCIpLnJlcGxhY2UoL1xcXFwvZywgXCIvXCIpO1xuICAgIGlmIChmcy5zdGF0U3luYyhmdWxsKS5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICBsaXN0LnB1c2goLi4uc2NhbihmdWxsLCBwdWJsaWNQYXRoKSk7XG4gICAgfSBlbHNlIGlmIChFWFQuaW5jbHVkZXMocGF0aC5leHRuYW1lKG5hbWUpLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICBsaXN0LnB1c2gocmVsKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGxpc3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnYWxsZXJ5UGx1Z2luKCk6IFBsdWdpbiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogXCJnYWxsZXJ5LXNjYW5cIixcbiAgICBjb25maWd1cmVTZXJ2ZXIoKSB7XG4gICAgICBjb25zdCBnYWxsZXJ5RGlyID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIFwicHVibGljL0dhbGxlcnlcIik7XG4gICAgICBjb25zdCBvdXRQYXRoID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIFwic3JjL2RhdGEvZ2FsbGVyeS1pbWFnZXMuanNvblwiKTtcbiAgICAgIGNvbnN0IGltYWdlcyA9IHNjYW4oZ2FsbGVyeURpciwgcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIFwicHVibGljXCIpKTtcbiAgICAgIGZzLm1rZGlyU3luYyhwYXRoLmRpcm5hbWUob3V0UGF0aCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgICAgZnMud3JpdGVGaWxlU3luYyhvdXRQYXRoLCBKU09OLnN0cmluZ2lmeShpbWFnZXMsIG51bGwsIDIpLCBcInV0ZjhcIik7XG4gICAgICBjb25zb2xlLmxvZyhcIltHYWxsZXJ5XSBTY2FubmVkXCIsIGltYWdlcy5sZW5ndGgsIFwiaW1hZ2VzIGZyb20gcHVibGljL0dhbGxlcnlcIik7XG4gICAgfSxcbiAgICBidWlsZFN0YXJ0KCkge1xuICAgICAgY29uc3QgZ2FsbGVyeURpciA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBcInB1YmxpYy9HYWxsZXJ5XCIpO1xuICAgICAgY29uc3Qgb3V0UGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBcInNyYy9kYXRhL2dhbGxlcnktaW1hZ2VzLmpzb25cIik7XG4gICAgICBjb25zdCBpbWFnZXMgPSBzY2FuKGdhbGxlcnlEaXIsIHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBcInB1YmxpY1wiKSk7XG4gICAgICBmcy5ta2RpclN5bmMocGF0aC5kaXJuYW1lKG91dFBhdGgpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICAgIGZzLndyaXRlRmlsZVN5bmMob3V0UGF0aCwgSlNPTi5zdHJpbmdpZnkoaW1hZ2VzLCBudWxsLCAyKSwgXCJ1dGY4XCIpO1xuICAgICAgY29uc29sZS5sb2coXCJbR2FsbGVyeV0gU2Nhbm5lZFwiLCBpbWFnZXMubGVuZ3RoLCBcImltYWdlcyBmcm9tIHB1YmxpYy9HYWxsZXJ5XCIpO1xuICAgIH0sXG4gIH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlTLFNBQVMsb0JBQW9CO0FBQ3RVLE9BQU8sV0FBVztBQUNsQixPQUFPQSxXQUFVO0FBQ2pCLFNBQVMsdUJBQXVCOzs7QUNFaEMsT0FBTyxRQUFRO0FBQ2YsT0FBTyxVQUFVO0FBRWpCLElBQU0sTUFBTSxDQUFDLFFBQVEsU0FBUyxRQUFRLFNBQVMsTUFBTTtBQUVyRCxTQUFTLEtBQUssS0FBYSxZQUE4QjtBQUN2RCxRQUFNLE9BQWlCLENBQUM7QUFDeEIsTUFBSSxDQUFDLEdBQUcsV0FBVyxHQUFHLEVBQUcsUUFBTztBQUNoQyxhQUFXLFFBQVEsR0FBRyxZQUFZLEdBQUcsR0FBRztBQUN0QyxVQUFNLE9BQU8sS0FBSyxLQUFLLEtBQUssSUFBSTtBQUNoQyxVQUFNLE1BQU0sS0FBSyxRQUFRLFlBQVksRUFBRSxFQUFFLFFBQVEsT0FBTyxHQUFHO0FBQzNELFFBQUksR0FBRyxTQUFTLElBQUksRUFBRSxZQUFZLEdBQUc7QUFDbkMsV0FBSyxLQUFLLEdBQUcsS0FBSyxNQUFNLFVBQVUsQ0FBQztBQUFBLElBQ3JDLFdBQVcsSUFBSSxTQUFTLEtBQUssUUFBUSxJQUFJLEVBQUUsWUFBWSxDQUFDLEdBQUc7QUFDekQsV0FBSyxLQUFLLEdBQUc7QUFBQSxJQUNmO0FBQUEsRUFDRjtBQUNBLFNBQU87QUFDVDtBQUVPLFNBQVMsZ0JBQXdCO0FBQ3RDLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLGtCQUFrQjtBQUNoQixZQUFNLGFBQWEsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGdCQUFnQjtBQUMvRCxZQUFNLFVBQVUsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLDhCQUE4QjtBQUMxRSxZQUFNLFNBQVMsS0FBSyxZQUFZLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxRQUFRLENBQUM7QUFDckUsU0FBRyxVQUFVLEtBQUssUUFBUSxPQUFPLEdBQUcsRUFBRSxXQUFXLEtBQUssQ0FBQztBQUN2RCxTQUFHLGNBQWMsU0FBUyxLQUFLLFVBQVUsUUFBUSxNQUFNLENBQUMsR0FBRyxNQUFNO0FBQ2pFLGNBQVEsSUFBSSxxQkFBcUIsT0FBTyxRQUFRLDRCQUE0QjtBQUFBLElBQzlFO0FBQUEsSUFDQSxhQUFhO0FBQ1gsWUFBTSxhQUFhLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxnQkFBZ0I7QUFDL0QsWUFBTSxVQUFVLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyw4QkFBOEI7QUFDMUUsWUFBTSxTQUFTLEtBQUssWUFBWSxLQUFLLFFBQVEsUUFBUSxJQUFJLEdBQUcsUUFBUSxDQUFDO0FBQ3JFLFNBQUcsVUFBVSxLQUFLLFFBQVEsT0FBTyxHQUFHLEVBQUUsV0FBVyxLQUFLLENBQUM7QUFDdkQsU0FBRyxjQUFjLFNBQVMsS0FBSyxVQUFVLFFBQVEsTUFBTSxDQUFDLEdBQUcsTUFBTTtBQUNqRSxjQUFRLElBQUkscUJBQXFCLE9BQU8sUUFBUSw0QkFBNEI7QUFBQSxJQUM5RTtBQUFBLEVBQ0Y7QUFDRjs7O0FEN0NBLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sY0FBYztBQUFBLElBQ2QsU0FBUyxpQkFBaUIsZ0JBQWdCO0FBQUEsRUFDNUMsRUFBRSxPQUFPLE9BQU87QUFBQSxFQUNoQixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixLQUFLO0FBQUEsTUFDSCxTQUFTO0FBQUEsSUFDWDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWMsQ0FBQyxPQUFPO0FBQ3BCLGNBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUMvQixnQkFBSSxHQUFHLFNBQVMsV0FBVyxLQUFLLEdBQUcsU0FBUyxjQUFjLEVBQUcsUUFBTztBQUNwRSxnQkFBSSxHQUFHLFNBQVMsT0FBTyxFQUFHLFFBQU87QUFDakMsbUJBQU87QUFBQSxVQUNUO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSx1QkFBdUI7QUFBQSxFQUN6QjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBS0MsTUFBSyxRQUFRLGtDQUFXLE9BQU87QUFBQTtBQUFBLE1BRXBDLGdCQUFnQkEsTUFBSztBQUFBLFFBQ25CO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbInBhdGgiLCAicGF0aCJdCn0K
