import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FloralArt from "@/components/ui/FloralArt";
import TransitionLink from "@/components/ui/TransitionLink";
import { categories, creations, getCreation } from "@/lib/data/creations";
import { saisons } from "@/lib/data/saisons";

export function generateStaticParams() {
  return creations.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const creation = getCreation(slug);
  if (!creation) return {};
  return {
    title: creation.titre,
    description: creation.accroche,
  };
}

export default async function CreationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const creation = getCreation(slug);
  if (!creation) notFound();

  const index = creations.findIndex((c) => c.slug === slug);
  const precedent = creations[(index - 1 + creations.length) % creations.length];
  const suivant = creations[(index + 1) % creations.length];
  const catLabel = categories.find((c) => c.id === creation.categorie)?.label;
  const saisonLabel = saisons.find((s) => s.id === creation.saison)?.titre;

  return (
    <article className="bg-ivoire pb-24 pt-32 md:pb-36 md:pt-40">
      <div className="relative h-[55svh] overflow-hidden md:h-[70svh]">
        <FloralArt
          seed={creation.slug}
          saison={creation.saison}
          ratio="carre"
          className="h-full w-full"
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-encre/50 via-transparent to-transparent">
          <div className="mx-auto w-full max-w-site px-6 pb-12 md:px-10">
            <p className="font-caps text-sm uppercase tracking-[0.25em] text-ivoire/80">
              {catLabel} — {saisonLabel} {creation.annee}
            </p>
            <h1 className="mt-3 text-balance font-display text-4xl font-semibold text-ivoire md:text-6xl">
              {creation.titre}
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-site gap-14 px-6 md:grid-cols-[2fr_1fr] md:px-10">
        <div>
          <p className="font-display text-2xl font-light italic leading-relaxed text-mousse md:text-3xl">
            {creation.accroche}
          </p>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-encre/80">
            {creation.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {creation.temoignage && (
            <blockquote className="mt-14 border-l-2 border-sienne pl-8">
              <p className="font-display text-xl font-light italic leading-relaxed text-mousse md:text-2xl">
                «&nbsp;{creation.temoignage.texte}&nbsp;»
              </p>
              <footer className="mt-4 font-caps text-sm uppercase tracking-[0.2em] text-encre/60">
                {creation.temoignage.auteur}
              </footer>
            </blockquote>
          )}
        </div>

        <aside className="h-fit space-y-8 border border-craie bg-craie/40 p-8">
          {creation.lieu && (
            <div>
              <p className="font-caps text-xs uppercase tracking-[0.2em] text-sienne">Lieu</p>
              <p className="mt-2 text-encre/80">{creation.lieu}</p>
            </div>
          )}
          <div>
            <p className="font-caps text-xs uppercase tracking-[0.2em] text-sienne">Saison</p>
            <p className="mt-2 text-encre/80">
              {saisonLabel} {creation.annee}
            </p>
          </div>
          <div>
            <p className="font-caps text-xs uppercase tracking-[0.2em] text-sienne">
              Fleurs & matières
            </p>
            <ul className="mt-2 space-y-1 text-encre/80">
              {creation.fleurs.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <TransitionLink
            href="/contact"
            data-cursor="Contact"
            className="link-underline inline-block font-caps text-sm uppercase tracking-[0.2em] text-mousse"
          >
            Un projet similaire ?
          </TransitionLink>
        </aside>
      </div>

      <nav
        aria-label="Navigation entre créations"
        className="mx-auto mt-24 flex max-w-site items-center justify-between border-t border-craie px-6 pt-10 md:px-10"
      >
        <TransitionLink
          href={`/creations/${precedent.slug}`}
          className="group flex flex-col"
          data-cursor="Voir"
        >
          <span className="font-caps text-xs uppercase tracking-[0.2em] text-encre/50">
            ← Précédent
          </span>
          <span className="link-underline mt-1 font-display text-xl text-mousse">
            {precedent.titre}
          </span>
        </TransitionLink>
        <TransitionLink
          href={`/creations/${suivant.slug}`}
          className="group flex flex-col text-right"
          data-cursor="Voir"
        >
          <span className="font-caps text-xs uppercase tracking-[0.2em] text-encre/50">
            Suivant →
          </span>
          <span className="link-underline mt-1 font-display text-xl text-mousse">
            {suivant.titre}
          </span>
        </TransitionLink>
      </nav>
    </article>
  );
}
