import { notFound } from "next/navigation";
import ShopView from "@/components/ShopView";
import {
  categories,
  getProductsByCategory,
  slugifyCategory,
} from "@/lib/products";

// Pages entièrement générées à la compilation : on indique à Next.js
// que la navigation n'a pas besoin d'être « instantanée » au sens strict.
export const instant = false;

export function generateStaticParams() {
  return categories.map((category) => ({
    categorie: slugifyCategory(category),
  }));
}

export async function generateMetadata({ params }) {
  const { categorie } = await params;
  const category = categories.find(
    (item) => slugifyCategory(item) === categorie,
  );

  if (!category) {
    return { title: "Catégorie introuvable" };
  }

  return {
    title: category,
    description: `Notre sélection ${category.toLowerCase()} : pièces faites main, en petite quantité.`,
  };
}

export default async function CategoriePage({ params }) {
  const { categorie } = await params;
  const category = categories.find(
    (item) => slugifyCategory(item) === categorie,
  );

  if (!category) {
    notFound();
  }

  return (
    <ShopView
      products={getProductsByCategory(category)}
      active={category}
      title={category}
      intro="Les pièces de cette matière, disponibles en quantité limitée."
    />
  );
}
