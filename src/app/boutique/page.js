import ShopView from "@/components/ShopView";
import { getProducts } from "@/lib/products";

export const metadata = {
  title: "La boutique",
  description:
    "Céramiques, textiles et bijoux faits main, choisis un par un par Maison Léonie.",
};

export default function BoutiquePage() {
  return (
    <ShopView
      products={getProducts()}
      title="Tous les objets"
      intro="Une sélection courte et renouvelée régulièrement. Chaque pièce est disponible en petite quantité."
    />
  );
}
