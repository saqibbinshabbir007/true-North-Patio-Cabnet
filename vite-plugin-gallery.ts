/**
 * Vite plugin: auto-scan public/Gallery on dev & build
 * No need to run npm run gallery - images show automatically
 */
import type { Plugin } from "vite";
import fs from "fs";
import path from "path";

const EXT = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

function scan(dir: string, publicPath: string): string[] {
  const list: string[] = [];
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

export function galleryPlugin(): Plugin {
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
    },
  };
}
