"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/boutique", label: "Boutique" },
  { href: "/nouveautes", label: "Nouveautés" },
  { href: "/maison", label: "La maison" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <div className="bg-ink px-4 py-2.5 text-center text-[10px] uppercase tracking-[0.2em] text-cream/85">
        Livraison offerte dès 80 € · Retrait en boutique à Lyon
      </div>

      <header className="sticky top-0 z-50 border-b border-line/80 bg-cream/90 backdrop-blur-md">
        <div className="mx-auto grid h-16 w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label="Ouvrir le menu"
              className="-ml-2 flex h-10 w-10 items-center justify-center md:hidden"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 block h-px w-5 bg-ink transition-transform duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-5 bg-ink transition-transform duration-300 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>

            <nav className="hidden items-center gap-7 md:flex">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[11px] uppercase tracking-[0.18em] transition-colors hover:text-accent ${
                    isActive(link.href) ? "text-accent" : "text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="justify-self-center font-display text-[22px] leading-none tracking-[0.01em] sm:text-[26px]"
          >
            Maison Léonie
          </Link>

          <div className="flex items-center justify-end gap-6">
            <Link
              href="/contact"
              className={`hidden text-[11px] uppercase tracking-[0.18em] transition-colors hover:text-accent sm:block ${
                isActive("/contact") ? "text-accent" : "text-ink"
              }`}
            >
              Contact
            </Link>
          </div>
        </div>

        {open && (
          <nav className="border-t border-line bg-cream md:hidden">
            <div className="mx-auto flex w-full max-w-6xl flex-col px-5 py-2 sm:px-8">
              {[...links, { href: "/contact", label: "Contact" }].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line/60 py-4 text-[12px] uppercase tracking-[0.18em] last:border-0"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
