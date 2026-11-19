/**
 * Génère les visuels de démonstration (dégradés + silhouette) dans public/images.
 * Lancement : node scripts/create-images.mjs
 *
 * Ces images sont des placeholders élégants : remplace-les simplement par
 * tes vraies photos en gardant les mêmes noms de fichiers.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const productsDir = path.join(root, "public", "images", "products");

function composition(variant) {
  if (variant === "circle") {
    return `<circle cx="600" cy="780" r="265" fill="url(#shape)"/>`;
  }

  if (variant === "stack") {
    return `
      <rect x="330" y="700" width="540" height="110" rx="55" fill="url(#shape)"/>
      <rect x="360" y="830" width="540" height="110" rx="55" fill="url(#shape)" opacity="0.85"/>
      <rect x="310" y="960" width="540" height="110" rx="55" fill="url(#shape)" opacity="0.7"/>
    `;
  }

  return `<path d="M 370 1120 L 370 660 A 230 230 0 0 1 830 660 L 830 1120 Z" fill="url(#shape)"/>`;
}

function buildSvg({ width, height, colors, variant, lightOpacity = 0.5 }) {
  const [warm, deep, pale] = colors;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.85" y2="1">
      <stop offset="0%" stop-color="${pale}"/>
      <stop offset="52%" stop-color="${warm}"/>
      <stop offset="100%" stop-color="${deep}"/>
    </linearGradient>
    <radialGradient id="light" cx="0.3" cy="0.18" r="0.8">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="${lightOpacity}"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="shape" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.13"/>
    </linearGradient>
    <radialGradient id="vignette" cx="0.5" cy="0.45" r="0.75">
      <stop offset="55%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.1"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#light)"/>
  ${composition(variant)}
  <rect width="100%" height="100%" fill="url(#vignette)"/>
</svg>`;
}

const productImages = [
  { slug: "vase-solene", colors: ["#d9c4ad", "#a97e56", "#f4ece1"], variant: "arch" },
  { slug: "plaid-laine-alpes", colors: ["#b3b79c", "#6f7457", "#f1efe4"], variant: "stack" },
  { slug: "bougie-cedre-figue", colors: ["#e2cba8", "#bf8b4f", "#faf2e3"], variant: "circle" },
  { slug: "bols-terracotta", colors: ["#e3b9a2", "#b0663f", "#f8ebe2"], variant: "stack" },
  { slug: "coussin-lin-brut", colors: ["#dad4c9", "#a9a094", "#f7f4ee"], variant: "circle" },
  { slug: "collier-perle-ambre", colors: ["#e9d0a7", "#b98a3f", "#fbf3e1"], variant: "circle" },
  { slug: "miroir-ovale-chene", colors: ["#e6d4bb", "#b18a5d", "#f9f2e7"], variant: "arch" },
  { slug: "carafe-ondine", colors: ["#cfd7d4", "#8fa3a0", "#f2f6f4"], variant: "arch" },
  { slug: "serviettes-lin", colors: ["#e7ded1", "#bdb09c", "#faf5ec"], variant: "stack" },
  { slug: "bagues-lune-argent", colors: ["#dcdde0", "#9fa3ab", "#f6f7f9"], variant: "circle" },
];

const editorialImages = [
  {
    file: path.join(root, "public", "images", "hero.jpg"),
    width: 1500,
    height: 1875,
    colors: ["#e0c6ad", "#b0704a", "#f7efe4"],
    variant: "arch",
    lightOpacity: 0.55,
  },
  {
    file: path.join(root, "public", "images", "maison.jpg"),
    width: 1600,
    height: 1100,
    colors: ["#ded7c8", "#8f8878", "#f7f3ea"],
    variant: "circle",
    lightOpacity: 0.4,
  },
];

await mkdir(productsDir, { recursive: true });

for (const item of productImages) {
  const svg = buildSvg({
    width: 1200,
    height: 1500,
    colors: item.colors,
    variant: item.variant,
  });

  await sharp(Buffer.from(svg))
    .jpeg({ quality: 88 })
    .toFile(path.join(productsDir, `${item.slug}.jpg`));

  console.log(`✓ products/${item.slug}.jpg`);
}

for (const item of editorialImages) {
  const svg = buildSvg({
    width: item.width,
    height: item.height,
    colors: item.colors,
    variant: item.variant,
    lightOpacity: item.lightOpacity,
  });

  await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile(item.file);

  console.log(`✓ ${path.relative(root, item.file)}`);
}
