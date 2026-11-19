import Link from "next/link";

const columns = [
  {
    title: "Boutique",
    links: [
      { href: "/boutique", label: "Tous les objets" },
      { href: "/nouveautes", label: "Nouveautés" },
      { href: "/boutique/ceramique", label: "Céramique" },
      { href: "/boutique/textile", label: "Textile" },
    ],
  },
  {
    title: "La maison",
    links: [
      { href: "/maison", label: "Notre histoire" },
      { href: "/contact", label: "Nous écrire" },
      { href: "/contact", label: "Retrait en boutique" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-shell">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-2xl">Maison Léonie</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Une petite sélection d&apos;objets faits main, choisis un par un
              pour la maison et pour soi.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              12 rue des Tanneurs
              <br />
              69003 Lyon
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-[11px] uppercase tracking-[0.18em] text-ink">
                {column.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-[11px] uppercase tracking-[0.14em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Maison Léonie</p>
          <p>Ouvert du mardi au samedi, 10 h — 19 h</p>
        </div>
      </div>
    </footer>
  );
}
