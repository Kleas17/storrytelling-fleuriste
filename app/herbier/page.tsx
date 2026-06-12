import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import HerbierGrid from "@/components/sections/HerbierGrid";
import TransitionLink from "@/components/ui/TransitionLink";

export const metadata: Metadata = {
  title: "Herbier — Les espèces de l'atelier",
  description:
    "L'herbier numérique de Maison Verdier : les fleurs travaillées à l'atelier, saison par saison — notes, textures et langage des fleurs.",
};

export default function HerbierPage() {
  return (
    <div className="bg-ivoire pb-24 pt-36 md:pb-36 md:pt-44">
      <div className="mx-auto max-w-site px-6 md:px-10">
        <SectionHeading
          label="Herbier"
          titre="Cent quarante espèces passent par l'atelier. En voici quelques pages."
          className="max-w-3xl"
        />
        <p className="mb-16 mt-6 max-w-xl text-lg leading-relaxed text-encre/70">
          Chaque fleur a son caractère, sa saison et son mot à dire — c&apos;est
          le langage des fleurs. Cet herbier se feuillette comme un carnet de
          notes de l&apos;atelier.{" "}
          <TransitionLink href="/quelle-fleur" className="link-underline text-sienne">
            Et vous, quelle fleur êtes-vous ?
          </TransitionLink>
        </p>
        <HerbierGrid />
      </div>
    </div>
  );
}
