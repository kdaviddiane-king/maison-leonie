import Image from "next/image";
import Link from "next/link";
import ButtonLink from "@/components/ButtonLink";
import Eyebrow from "@/components/Eyebrow";
import ProductCard from "@/components/ProductCard";
import {
  categories,
  getCategoryCover,
  getNewProducts,
  slugifyCategory,
} from "@/lib/products";

const guarantees = [
  {
    title: "Fait main",
    text: "Chaque pièce est tournée, tissée ou assemblée par un artisan que nous connaissons.",
  },
  {
    title: "Livraison soignée",
    text: "Emballage sans plastique, expédition sous 48 h, offerte dès 80 € d'achat.",
  },
  {
    title: "Retrait en boutique",
    text: "Commandez en ligne, récupérez votre pièce à Lyon dès le lendemain.",
  },
];

export default function Home() {
  const newProducts = getNewProducts().slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-10 py-12 md:grid-cols-2 md:gap-16 md:py-20">
          <div className="order-2 md:order-1">
            <Eyebrow>Collection Automne — 2026</Eyebrow>
            <h1 className="mt-5 font-display text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
              Des objets simples,
              <br />
              choisis pour durer.
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
              Céramiques tournées à la main, textiles naturels et bijoux
              discrets. Une petite sélection, renouvelée chaque saison.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href="/boutique">Découvrir la boutique</ButtonLink>
              <ButtonLink href="/nouveautes" variant="ghost">
                Voir les nouveautés
              </ButtonLink>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-sand">
              <Image
                src="/images/hero.jpg"
                alt="Sélection d'objets pour la maison"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Réassurance */}
      <section className="border-y border-line bg-shell">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-10 sm:grid-cols-3 sm:px-8">
          {guarantees.map((item) => (
            <div key={item.title}>
              <p className="text-[11px] uppercase tracking-[0.18em]">
                {item.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Nouveautés */}
      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Derniers arrivages</Eyebrow>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
              Les nouveautés
            </h2>
          </div>
          <Link
            href="/nouveautes"
            className="text-[11px] uppercase tracking-[0.18em] text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            Tout voir
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {newProducts.map((product, index) => (
            <ProductCard
              key={product.slug}
              product={product}
              priority={index < 2}
            />
          ))}
        </div>
      </section>

      {/* Catégories */}
      <section className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8 md:pb-20">
        <Eyebrow>Explorer</Eyebrow>
        <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
          Par matière
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {categories.map((category) => {
            const cover = getCategoryCover(category);

            return (
              <Link
                key={category}
                href={`/boutique/${slugifyCategory(category)}`}
                className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-sand"
              >
                {cover && (
                  <Image
                    src={cover}
                    alt={category}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-[11px] uppercase tracking-[0.18em] text-cream">
                  {category}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Éditorial */}
      <section className="border-t border-line bg-shell">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 md:gap-16 md:py-20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-sand">
            <Image
              src="/images/maison.jpg"
              alt="L'atelier Maison Léonie"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <Eyebrow>La maison</Eyebrow>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
              Une sélection courte,
              <br />
              choisie avec soin.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
              Nous visitons les ateliers avant de choisir une pièce. Rien
              d&apos;industriel, rien d&apos;inutile : seulement des objets
              utiles, beaux, et faits pour traverser les années.
            </p>
            <ButtonLink href="/maison" variant="ghost" className="mt-8">
              Lire notre histoire
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
