import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ButtonLink from "@/components/ButtonLink";
import Eyebrow from "@/components/Eyebrow";
import ProductCard from "@/components/ProductCard";
import {
  allProducts,
  formatPrice,
  getProductBySlug,
  getRelatedProducts,
  slugifyCategory,
} from "@/lib/products";

export const instant = false;

export function generateStaticParams() {
  return allProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Objet introuvable" };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProduitPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product, 4);

  return (
    <>
      <article className="mx-auto w-full max-w-6xl px-5 pb-16 pt-8 sm:px-8">
        <nav className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-muted">
          <Link href="/boutique" className="transition-colors hover:text-ink">
            Boutique
          </Link>
          <span aria-hidden>/</span>
          <Link
            href={`/boutique/${slugifyCategory(product.category)}`}
            className="transition-colors hover:text-ink"
          >
            {product.category}
          </Link>
          <span aria-hidden>/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-sand">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            {product.isNew && (
              <span className="absolute left-4 top-4 bg-cream/90 px-3 py-1.5 text-[9px] uppercase tracking-[0.18em]">
                Nouveau
              </span>
            )}
          </div>

          <div className="md:pt-4">
            <Eyebrow>{product.category}</Eyebrow>

            <h1 className="mt-3 font-display text-4xl leading-[1.05] sm:text-5xl">
              {product.name}
            </h1>

            <p className="mt-5 text-lg tabular-nums">
              {formatPrice(product.price)}
            </p>

            <p className="mt-6 max-w-prose text-[15px] leading-relaxed text-muted">
              {product.description}
            </p>

            <ul className="mt-8 divide-y divide-line border-y border-line">
              {product.details.map((detail) => (
                <li key={detail} className="py-3 text-sm text-muted">
                  {detail}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/contact" className="w-full sm:w-auto">
                Réserver cette pièce
              </ButtonLink>
              <span className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3.5 text-[11px] uppercase tracking-[0.18em] text-muted">
                {product.inStock ? "En stock" : "Sur commande"}
              </span>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-muted">
              Retrait en boutique à Lyon sous 48 h · Livraison offerte dès 80 €
              · Retour possible sous 14 jours.
            </p>
          </div>
        </div>
      </article>

      <section className="border-t border-line bg-shell">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
          <Eyebrow>Vous aimerez aussi</Eyebrow>
          <h2 className="mt-3 font-display text-3xl leading-tight">
            Dans le même esprit
          </h2>

          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
