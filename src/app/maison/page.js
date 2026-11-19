import Image from "next/image";
import ButtonLink from "@/components/ButtonLink";
import Eyebrow from "@/components/Eyebrow";

export const metadata = {
  title: "La maison",
  description:
    "Maison Léonie est une petite boutique de curation à Lyon : céramiques, textiles et bijoux faits main.",
};

const values = [
  {
    title: "Le fait main avant tout",
    text: "Nous travaillons avec des céramistes, des tisserands et des bijoutiers indépendants. Chaque pièce porte la trace de la main qui l'a faite.",
  },
  {
    title: "Des quantités limitées",
    text: "Nous commandons peu, pour ne jamais brader. Quand une pièce part, elle laisse la place à une autre.",
  },
  {
    title: "Une matière qui vieillit bien",
    text: "Grès, lin, laine, argent massif : des matières qui se patinent et s'embellissent avec le temps.",
  },
];

export default function MaisonPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-5 pb-16 pt-12 sm:px-8">
        <div className="max-w-2xl">
          <Eyebrow>Notre histoire</Eyebrow>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Une maison de curation,
            <br />
            ouverte en 2019 à Lyon.
          </h1>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-sand md:order-2">
            <Image
              src="/images/maison.jpg"
              alt="L'atelier Maison Léonie"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="md:order-1">
            <div className="space-y-5 text-[15px] leading-relaxed text-muted">
              <p>
                Maison Léonie est née d&apos;une envie simple : remettre dans
                nos intérieurs des objets qu&apos;on garde longtemps. Pas de
                collections qui changent tous les trois mois, pas de matières
                synthétiques déguisées en naturel.
              </p>
              <p>
                Nous avons commencé avec quelques céramiques rapportées
                d&apos;un atelier du Var, vendues sur une table les samedis
                matins. Aujourd&apos;hui, la boutique accueille une
                quarantaine d&apos;artisans, tous rencontrés en personne.
              </p>
              <p>
                Chaque pièce est choisie pour une raison précise : une forme,
                une matière, un geste. Si nous ne savons pas pourquoi un objet
                nous plaît, il ne rentre pas dans la maison.
              </p>
            </div>

            <ButtonLink href="/boutique" className="mt-9">
              Voir la sélection
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-shell">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
          <Eyebrow>Ce qui compte pour nous</Eyebrow>
          <div className="mt-8 grid gap-10 sm:grid-cols-3">
            {values.map((value) => (
              <div key={value.title}>
                <h2 className="font-display text-xl leading-snug">
                  {value.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
