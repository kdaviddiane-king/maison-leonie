import ContactForm from "@/components/ContactForm";
import Eyebrow from "@/components/Eyebrow";

export const metadata = {
  title: "Contact",
  description:
    "Une question sur une pièce ou une commande ? Écrivez à Maison Léonie, 12 rue des Tanneurs à Lyon.",
};

const infos = [
  {
    label: "Boutique",
    lines: ["12 rue des Tanneurs", "69003 Lyon"],
  },
  {
    label: "Horaires",
    lines: ["Mardi — Samedi", "10 h — 19 h"],
  },
  {
    label: "Écrire",
    lines: ["bonjour@maison-leonie.fr", "Réponse sous 24 h ouvrées"],
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-20 pt-12 sm:px-8">
      <header className="max-w-2xl">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">
          Une question ?
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          Pour réserver une pièce, poser une question sur une matière ou suivre
          une commande, écrivez-nous. Nous répondons nous-mêmes.
        </p>
      </header>

      <div className="mt-12 grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <ContactForm />

        <aside className="space-y-8 border-t border-line pt-8 md:border-l md:border-t-0 md:pl-16 md:pt-0">
          {infos.map((info) => (
            <div key={info.label}>
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
                {info.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed">
                {info.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
