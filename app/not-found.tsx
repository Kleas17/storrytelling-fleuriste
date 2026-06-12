import TransitionLink from "@/components/ui/TransitionLink";

export default function NotFound() {
  return (
    <div className="flex min-h-[80svh] flex-col items-center justify-center bg-ivoire px-6 text-center">
      <p className="font-caps text-sm uppercase tracking-[0.3em] text-sienne">Erreur 404</p>
      <h1 className="mt-4 text-balance font-display text-4xl font-semibold text-mousse md:text-6xl">
        Cette fleur n&apos;a pas pris racine ici.
      </h1>
      <p className="mt-6 max-w-md font-display text-lg italic text-encre/60">
        La page que vous cherchez a peut-être été coupée, fanée, ou n&apos;a
        jamais été semée.
      </p>
      <TransitionLink
        href="/"
        className="mt-10 inline-block border border-mousse px-10 py-4 font-caps text-sm uppercase tracking-[0.25em] text-mousse transition-colors duration-300 hover:bg-mousse hover:text-ivoire"
      >
        Retour à l&apos;atelier
      </TransitionLink>
    </div>
  );
}
