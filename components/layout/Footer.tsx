"use client";

import { useState } from "react";
import TransitionLink from "@/components/ui/TransitionLink";
import FooterGarden from "@/components/layout/FooterGarden";
import { settings } from "@/lib/data/settings";

export default function Footer() {
  const [newsletterOk, setNewsletterOk] = useState(false);

  return (
    <footer className="bg-mousse text-ivoire">
      <div className="mx-auto max-w-site px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-display text-3xl font-semibold">Maison Verdier</p>
            <p className="mt-2 font-display italic text-ivoire/70">
              Ce que les fleurs ont à dire.
            </p>
            <address className="mt-6 text-sm not-italic leading-relaxed text-ivoire/70">
              {settings.adresse}
              <br />
              <a className="link-underline" href={`tel:${settings.telephone}`}>
                {settings.telephoneAffiche}
              </a>
              <br />
              <a className="link-underline" href={`mailto:${settings.email}`}>
                {settings.email}
              </a>
            </address>
          </div>

          <nav aria-label="Navigation pied de page" className="flex flex-col gap-3">
            <p className="font-caps text-xs uppercase tracking-[0.2em] text-sienne">
              Navigation
            </p>
            {[
              { href: "/savoir-faire", label: "Savoir-faire" },
              { href: "/creations", label: "Créations" },
              { href: "/saisons", label: "Saisons" },
              { href: "/herbier", label: "Herbier" },
              { href: "/quelle-fleur", label: "Quelle fleur êtes-vous ?" },
              { href: "/contact", label: "Contact" },
              { href: "/mentions-legales", label: "Mentions légales" },
            ].map((item) => (
              <TransitionLink
                key={item.href}
                href={item.href}
                className="link-underline w-fit text-sm text-ivoire/80"
              >
                {item.label}
              </TransitionLink>
            ))}
          </nav>

          <div>
            <p className="font-caps text-xs uppercase tracking-[0.2em] text-sienne">
              Lettre des saisons
            </p>
            <p className="mt-3 text-sm text-ivoire/70">
              Quatre e-mails par an, au rythme des floraisons. Rien de plus.
            </p>
            {newsletterOk ? (
              <p className="mt-4 font-display italic text-sienne">
                Merci — à très bientôt parmi les fleurs.
              </p>
            ) : (
              <form
                className="mt-4 flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setNewsletterOk(true);
                }}
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Votre adresse e-mail
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="votre@email.fr"
                  className="w-full border-b border-ivoire/30 bg-transparent py-2 text-sm placeholder:text-ivoire/40 focus:border-sienne focus:outline-none"
                />
                <button
                  type="submit"
                  className="font-caps text-xs uppercase tracking-[0.2em] text-sienne hover:text-ivoire"
                >
                  OK
                </button>
              </form>
            )}
            <div className="mt-8 flex gap-5">
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-sm text-ivoire/80"
              >
                Instagram
              </a>
              <a
                href={settings.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-sm text-ivoire/80"
              >
                Pinterest
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <FooterGarden />
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-ivoire/15 pt-6 text-xs text-ivoire/50 md:flex-row">
          <p>
            © {new Date().getFullYear()} {settings.nomFleuriste} — Tous droits réservés
          </p>
          <p className="font-display italic">L&apos;éphémère, fait main.</p>
        </div>
      </div>
    </footer>
  );
}
