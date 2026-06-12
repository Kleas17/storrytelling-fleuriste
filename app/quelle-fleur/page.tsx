import type { Metadata } from "next";
import QuizFleur from "@/components/sections/QuizFleur";

export const metadata: Metadata = {
  title: "Quelle fleur êtes-vous ? — Le quiz de l'atelier",
  description:
    "Cinq questions poétiques, un portrait floral unique généré pour vous. Découvrez quelle fleur vous ressemble, par Maison Verdier.",
};

export default function QuelleFleurPage() {
  return (
    <div className="bg-ivoire pb-24 pt-36 md:pb-36 md:pt-44">
      <div className="mx-auto max-w-site px-6 md:px-10">
        <div className="mb-16 text-center">
          <p className="font-caps text-sm uppercase tracking-[0.25em] text-sienne">
            Le quiz de l&apos;atelier
          </p>
          <h1 className="mt-4 text-balance font-display text-4xl font-semibold text-mousse md:text-6xl">
            Quelle fleur êtes-vous ?
          </h1>
          <p className="mx-auto mt-5 max-w-md font-display text-lg italic text-encre/60">
            Cinq questions, aucune bonne réponse — et un portrait floral
            unique, généré pour vous.
          </p>
        </div>
        <QuizFleur />
      </div>
    </div>
  );
}
