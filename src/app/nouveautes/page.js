import ProductCard from "@/components/ProductCard";
import Eyebrow from "@/components/Eyebrow";
import { getNewProducts } from "@/lib/products";

export const metadata = {
  title: "Nouveautés",
  description:
    "Les derniers arrivages de la boutique : céramiques, textiles et bijoux fraîchement reçus.",
};

export default function NouveautesPage() {
  const products = getNewProducts();

  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-20 pt-12 sm:px-8">
      <header className="max-w-2xl">
        <Eyebrow>Derniers arrivages</Eyebrow>
        <h1 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">
          Nouveautés
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          Les pièces qui viennent d&apos;arriver à la maison. Elles partent
          souvent vite, chaque modèle est disponible en petite quantité.
        </p>
      </header>

      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard
            key={product.slug}
            product={product}
            priority={index < 2}
          />
        ))}
      </div>
    </div>
  );
}
