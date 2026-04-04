/**
 * Scans public/Gallery for images and writes to src/data/gallery-images.json
 * Run: node scripts/gallery-images.js
 * Supports: .jpg, .jpeg, .png, .webp, .gif
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const GALLERY = path.join(__dirname, "../public/Gallery");
const EXT = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

function scan(dir) {
  const list = [];
  if (!fs.existsSync(dir)) return list;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const rel = full.replace(path.join(__dirname, "../public"), "").replace(/\\/g, "/");
    if (fs.statSync(full).isDirectory()) {
      list.push(...scan(full));
    } else if (EXT.includes(path.extname(name).toLowerCase())) {
      list.push(rel);
    }
  }
  return list;
}

const images = scan(GALLERY);
const out = path.join(__dirname, "../src/data/gallery-images.json");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(images, null, 2), "utf8");
console.log("Gallery paths written to src/data/gallery-images.json");
console.log(images.length, "images found");
