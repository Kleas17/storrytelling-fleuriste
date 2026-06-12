import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FloralArt from "@/components/ui/FloralArt";
import TransitionLink from "@/components/ui/TransitionLink";
import CreationCard from "@/components/ui/CreationCard";
import { getSaison, saisons } from "@/lib/data/saisons";
import { creations } from "@/lib/data/creations";

export function generateStaticParams() {
  return saisons.map((s) => ({ saison: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ saison: string }>;
}): Promise<Metadata> {
  const { saison } = await params;
  const data = getSaison(saison);
  if (!data) return {};
  return {
    title: `${data.titre} — ${data.sousTitre}`,
    description: data.manifeste,
  };
}

export default async function SaisonPage({
  params,
}: {
  params: Promise<{ saison: string }>;
}) {
  const { saison } = await params;
  const data = getSaison(saison);
  if (!data) notFound();

  const index = saisons.findIndex((s) => s.slug === saison);
  const suivante = saisons[(index + 1) % saisons.length];
  const creationsSaison = creations.filter((c) => c.saison === data.id).slice(0, 3);

  return (
    <article>
      <header
        className="px-6 pb-20 pt-40 md:px-10 md:pb-28 md:pt-48"
        style={{ backgroundColor: data.palette.fond, color: data.palette.texte }}
      >
        <div className="mx-auto max-w-site">
          <nav
            aria-label="Fil d'Ariane"
            className="mb-8 font-caps text-xs uppercase tracking-[0.2em] opacity-60"
          >
            <TransitionLink href="/saisons" className="link-underline">
              Saisons
            </TransitionLink>
            <span className="mx-2" aria-hidden="true">/</span>
            <span aria-current="page">{data.titre}</span>
          </nav>
          <p
            className="font-caps text-sm uppercase tracking-[0.3em]"
            style={{ color: data.palette.accent }}
          >
            {data.sousTitre}
          </p>
          <h1 className="mt-4 font-display text-6xl font-semibold md:text-9xl">
            {data.titre}
          </h1>
          <p className="mt-8 max-w-2xl font-display text-2xl font-light italic leading-relaxed md:text-3xl">
            {data.manifeste}
          </p>
        </div>
      </header>

      <div className="bg-ivoire py-20 md:py-28">
        <div className="mx-auto grid max-w-site gap-14 px-6 md:grid-cols-[2fr_1fr] md:px-10">
          <div className="space-y-6 text-lg leading-relaxed text-encre/80">
            {data.texte.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <aside className="space-y-10">
            <div>
              <p className="font-caps text-xs uppercase tracking-[0.2em] text-sienne">
                Fleurs emblématiques
              </p>
              <ul className="mt-3 space-y-1.5 text-encre/80">
                {data.fleurs.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-caps text-xs uppercase tracking-[0.2em] text-sienne">
                Palette de la saison
              </p>
              <div className="mt-3 flex gap-3" aria-hidden="true">
                {[data.palette.fond, data.palette.accent, data.palette.texte].map((c) => (
                  <span
                    key={c}
                    className="h-10 w-10 rounded-full border border-encre/10"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="font-caps text-xs uppercase tracking-[0.2em] text-sienne">
                Compositions suggérées
              </p>
              <ul className="mt-3 space-y-1.5 text-encre/80">
                {data.compositions.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div className="overflow-hidden rounded-t-full">
              <FloralArt seed={`saison-detail-${data.id}`} saison={data.id} className="h-auto w-full" />
            </div>
          </aside>
        </div>

        {creationsSaison.length > 0 && (
          <div className="mx-auto mt-24 max-w-site px-6 md:px-10">
            <p className="mb-10 font-caps text-sm uppercase tracking-[0.25em] text-sienne">
              Créations de cette saison
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {creationsSaison.map((c) => (
                <CreationCard key={c.slug} creation={c} />
              ))}
            </div>
          </div>
        )}

        <div className="mx-auto mt-24 max-w-site border-t border-craie px-6 pt-10 text-right md:px-10">
          <TransitionLink
            href={`/saisons/${suivante.slug}`}
            data-cursor="Lire"
            className="group inline-flex flex-col items-end"
          >
            <span className="font-caps text-xs uppercase tracking-[0.2em] text-encre/50">
              Saison suivante →
            </span>
            <span className="link-underline mt-1 font-display text-3xl text-mousse">
              {suivante.titre}
            </span>
          </TransitionLink>
        </div>
      </div>
    </article>
  );
}
