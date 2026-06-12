import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import FloralArt from "@/components/ui/FloralArt";
import Philosophie from "@/components/sections/Philosophie";
import AtelierGallery from "@/components/sections/AtelierGallery";
import CtaFinal from "@/components/sections/CtaFinal";
import TigeDivider from "@/components/ui/TigeDivider";

export const metadata: Metadata = {
  title: "Savoir-faire — Histoire & philosophie de l'atelier",
  description:
    "Dix-huit ans d'art floral artisanal : l'histoire, la philosophie et les gestes de Maison Verdier, fleuriste d'exception à Lyon.",
};

export default function SavoirFairePage() {
  return (
    <>
      <div className="relative h-[70svh] overflow-hidden">
        <FloralArt seed="hero-savoir-faire" saison="automne" ratio="carre" className="h-full w-full" />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-encre/55 via-encre/10 to-transparent">
          <div className="mx-auto w-full max-w-site px-6 pb-14 md:px-10">
            <p className="font-caps text-sm uppercase tracking-[0.25em] text-ivoire/80">
              Savoir-faire
            </p>
            <h1 className="mt-3 max-w-2xl text-balance font-display text-4xl font-semibold text-ivoire md:text-6xl">
              Dix-huit ans à écouter ce que les fleurs veulent dire.
            </h1>
          </div>
        </div>
      </div>

      <section className="bg-ivoire py-24 md:py-32">
        <div className="mx-auto grid max-w-site gap-14 px-6 md:grid-cols-2 md:px-10">
          <div>
            <SectionHeading label="Histoire" titre="Tout a commencé par un marché de gros, à cinq heures du matin." />
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-encre/80">
              <p>
                En 2008, après dix ans passés chez les grandes maisons parisiennes,
                Anne Verdier revient à Lyon avec une conviction : la fleur n&apos;a
                pas besoin d&apos;artifice, elle a besoin de temps. Elle ouvre un
                petit atelier dans le Vieux Lyon, à deux pas de la Saône.
              </p>
              <p>
                Très vite, le bouche-à-oreille fait son œuvre. Les mariés
                reviennent pour leurs anniversaires, les entreprises pour leurs
                galas, les fidèles chaque samedi matin. L&apos;atelier grandit,
                la philosophie ne bouge pas : fleurs de saison, producteurs
                locaux, gestes à la main.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <blockquote className="border-l-2 border-sienne pl-8 md:pl-10">
              <p className="text-balance font-display text-3xl font-light italic leading-snug text-mousse md:text-4xl">
                «&nbsp;Une fleur coupée est une phrase commencée. Notre métier,
                c&apos;est de la finir bien.&nbsp;»
              </p>
              <footer className="mt-6 font-caps text-sm uppercase tracking-[0.2em] text-encre/60">
                Anne Verdier — Fondatrice
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      <Philosophie />
      <TigeDivider />
      <AtelierGallery />
      <CtaFinal />
    </>
  );
}
