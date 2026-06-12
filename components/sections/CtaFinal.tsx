"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import Magnetic from "@/components/ui/Magnetic";
import TransitionLink from "@/components/ui/TransitionLink";

export default function CtaFinal() {
  return (
    <section className="bg-mousse py-28 text-center md:py-40">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading
          align="center"
          dark
          label="Et maintenant ?"
          titre="Un projet ? Une idée ? Parlons-en."
        />
        <p className="mt-6 font-display text-xl font-light italic text-ivoire/70">
          Mariage, événement, attention particulière — l&apos;atelier vous répond
          sous 48 heures.
        </p>
        <Magnetic className="mt-12 inline-block">
          <TransitionLink
            href="/contact"
            data-cursor="Contact"
            className="inline-block border border-sienne bg-sienne/10 px-12 py-5 font-caps text-sm uppercase tracking-[0.25em] text-ivoire transition-colors duration-300 hover:bg-sienne hover:text-encre"
          >
            Écrire à l&apos;atelier
          </TransitionLink>
        </Magnetic>
      </div>
    </section>
  );
}
