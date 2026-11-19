import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/products";

export default function ProductCard({ product, priority = false }) {
  return (
    <Link href={`/produit/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-sand">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.isNew && (
            <span className="bg-cream/90 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-ink backdrop-blur">
              Nouveau
            </span>
          )}
          {!product.inStock && (
            <span className="bg-ink/85 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-cream">
              Sur commande
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
            {product.category}
          </p>
          <h3 className="mt-1.5 font-display text-lg leading-tight transition-colors group-hover:text-accent">
            {product.name}
          </h3>
        </div>
        <p className="whitespace-nowrap pt-4 text-sm tabular-nums">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
