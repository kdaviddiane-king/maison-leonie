import ButtonLink from "@/components/ButtonLink";
import Eyebrow from "@/components/Eyebrow";

export const metadata = {
  title: "Page introuvable",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-start px-5 py-24 sm:px-8">
      <Eyebrow>Erreur 404</Eyebrow>
      <h1 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">
        Cette page n&apos;existe pas.
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
        L&apos;objet que vous cherchez a peut-être déjà trouvé sa maison.
        Retrouvez le reste de la sélection dans la boutique.
      </p>
      <ButtonLink href="/boutique" className="mt-8">
        Retour à la boutique
      </ButtonLink>
    </div>
  );
}
