import TransitionLink from "@/components/ui/TransitionLink";
import FloralArt from "@/components/ui/FloralArt";
import { categories, type Creation } from "@/lib/data/creations";

export default function CreationCard({ creation }: { creation: Creation }) {
  const catLabel = categories.find((c) => c.id === creation.categorie)?.label;

  return (
    <TransitionLink
      href={`/creations/${creation.slug}`}
      data-cursor="Voir"
      className="creation-card group relative block overflow-hidden bg-craie"
    >
      <FloralArt seed={creation.slug} saison={creation.saison} className="h-auto w-full" />
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-encre/60 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
        <p className="font-caps text-xs uppercase tracking-[0.2em] text-sienne">
          {catLabel}
        </p>
        <p className="mt-1 font-display text-2xl font-medium text-ivoire">
          {creation.titre}
        </p>
      </div>
      <div className="p-4 md:hidden">
        <p className="font-caps text-xs uppercase tracking-[0.2em] text-sienne">{catLabel}</p>
        <p className="font-display text-xl text-mousse">{creation.titre}</p>
      </div>
    </TransitionLink>
  );
}
