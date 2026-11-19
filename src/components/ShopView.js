import Link from "next/link";
import ProductCard from "./ProductCard";
import Eyebrow from "./Eyebrow";
import { categories, slugifyCategory } from "@/lib/products";

export default function ShopView({
  products,
  active = null,
  title,
  intro,
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-20 pt-12 sm:px-8">
      <header className="max-w-2xl">
        <Eyebrow>La boutique</Eyebrow>
        <h1 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-4 text-[15px] leading-relaxed text-muted">{intro}</p>
        )}
      </header>

      <div className="mt-10 flex flex-wrap gap-2">
        <Link
          href="/boutique"
          className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.14em] transition-colors ${
            active === null
              ? "border-ink bg-ink text-cream"
              : "border-line text-muted hover:border-ink hover:text-ink"
          }`}
        >
          Tout
        </Link>

        {categories.map((category) => {
          const isActive = active === category;

          return (
            <Link
              key={category}
              href={`/boutique/${slugifyCategory(category)}`}
              className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.14em] transition-colors ${
                isActive
                  ? "border-ink bg-ink text-cream"
                  : "border-line text-muted hover:border-ink hover:text-ink"
              }`}
            >
              {category}
            </Link>
          );
        })}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <p className="mt-12 text-sm text-muted">
          Aucun objet dans cette catégorie pour le moment.
        </p>
      )}
    </div>
  );
}
