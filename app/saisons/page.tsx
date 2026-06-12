import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import FloralArt from "@/components/ui/FloralArt";
import TransitionLink from "@/components/ui/TransitionLink";
import { saisons } from "@/lib/data/saisons";

export const metadata: Metadata = {
  title: "Saisons — Le vivant au fil de l'année",
  description:
    "Printemps, été, automne, hiver : les fleurs emblématiques, palettes et compositions de chaque saison, racontées par Maison Verdier.",
};

export default function SaisonsPage() {
  return (
    <div className="bg-ivoire pb-24 pt-36 md:pb-36 md:pt-44">
      <div className="mx-auto max-w-site px-6 md:px-10">
        <SectionHeading
          label="Saisons"
          titre="Quatre saisons, quatre écritures florales."
          className="max-w-3xl"
        />
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-encre/70">
          Nous ne forçons jamais le calendrier. Chaque saison impose ses fleurs,
          ses couleurs et ses gestes — voici ce qu&apos;elles nous racontent.
        </p>

        <div className="mt-20 space-y-8">
          {saisons.map((s, i) => (
            <TransitionLink
              key={s.id}
              href={`/saisons/${s.slug}`}
              data-cursor="Lire"
              className="group block overflow-hidden transition-shadow duration-500 hover:shadow-[0_30px_70px_-30px_rgba(28,28,30,0.3)]"
              style={{ backgroundColor: s.palette.fond, color: s.palette.texte }}
            >
              <div className="grid items-center md:grid-cols-[1fr_280px]">
                <div className="p-10 md:p-14">
                  <p
                    className="font-caps text-xs uppercase tracking-[0.3em]"
                    style={{ color: s.palette.accent }}
                  >
                    {String(i + 1).padStart(2, "0")} — {s.sousTitre}
                  </p>
                  <h2 className="mt-3 font-display text-5xl font-semibold md:text-7xl">
                    {s.titre}
                  </h2>
                  <p className="mt-5 max-w-lg font-display text-lg font-light italic leading-relaxed md:text-xl">
                    {s.manifeste}
                  </p>
                  <p className="link-underline mt-8 inline-block font-caps text-xs uppercase tracking-[0.22em]">
                    Lire la saison
                  </p>
                </div>
                <div className="hidden h-full md:block">
                  <FloralArt
                    seed={`saison-index-${s.id}`}
                    saison={s.id}
                    className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </TransitionLink>
          ))}
        </div>
      </div>
    </div>
  );
}
