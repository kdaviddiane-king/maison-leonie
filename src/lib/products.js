import products from "@/data/products.json";

/**
 * Toutes les fonctions de ce fichier lisent simplement le fichier
 * src/data/products.json. Pour ajouter un arrivage, il suffit d'ajouter
 * un objet dans ce fichier JSON : le site se met à jour tout seul.
 */

export const allProducts = products;

export const categories = [
  ...new Set(products.map((product) => product.category)),
];

/** "Céramique" -> "ceramique" (utilisé dans les URL) */
export function slugifyCategory(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getProducts() {
  return products;
}

export function getNewProducts() {
  return products.filter((product) => product.isNew);
}

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug) ?? null;
}

export function getProductsByCategory(category) {
  return products.filter((product) => product.category === category);
}

export function getCategoryCover(category) {
  const product = products.find((item) => item.category === category);
  return product ? product.image : null;
}

export function getRelatedProducts(product, limit = 4) {
  const sameCategory = products.filter(
    (item) => item.category === product.category && item.slug !== product.slug,
  );
  const others = products.filter(
    (item) => item.category !== product.category && item.slug !== product.slug,
  );

  return [...sameCategory, ...others].slice(0, limit);
}

export function formatPrice(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}
