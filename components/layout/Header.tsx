"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useSiteStore } from "@/lib/store";
import TransitionLink from "@/components/ui/TransitionLink";
import { settings } from "@/lib/data/settings";

const NAV_ITEMS = [
  { href: "/savoir-faire", label: "Savoir-faire" },
  { href: "/creations", label: "Créations" },
  { href: "/saisons", label: "Saisons" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const barRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuOpen = useSiteStore((s) => s.menuOpen);
  const setMenuOpen = useSiteStore((s) => s.setMenuOpen);

  // Smart navbar : disparaît en scroll-down, réapparaît en scroll-up.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const show = gsap.quickTo(bar, "yPercent", { duration: 0.4, ease: "power3.out" });
    const trigger = ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        if (useSiteStore.getState().menuOpen) return;
        if (self.direction === 1 && self.scroll() > 140) show(-130);
        else show(0);
      },
    });
    return () => trigger.kill();
  }, []);

  // Drawer fullscreen.
  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;

    const ctx = gsap.context(() => {
      if (menuOpen) {
        gsap.set(drawer, { display: "flex" });
        gsap.fromTo(
          drawer,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "power3.inOut" }
        );
        gsap.fromTo(
          ".drawer-link",
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.07, delay: 0.25, ease: "power4.out" }
        );
        gsap.fromTo(
          ".drawer-meta",
          { opacity: 0 },
          { opacity: 1, duration: 0.6, delay: 0.55 }
        );
      } else {
        gsap.to(drawer, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.5,
          ease: "power3.inOut",
          onComplete: () => gsap.set(drawer, { display: "none" }),
        });
      }
    }, drawer);

    return () => ctx.revert();
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setMenuOpen]);

  return (
    <>
      <header
        ref={barRef}
        className="fixed inset-x-0 top-0 z-[80] mix-blend-difference"
      >
        <div className="mx-auto flex max-w-site items-center justify-between px-6 py-5 md:px-10">
          <TransitionLink
            href="/"
            className="font-display text-xl font-semibold tracking-wide text-ivoire md:text-2xl"
            aria-label="Maison Verdier — accueil"
          >
            Maison Verdier
          </TransitionLink>

          <nav aria-label="Navigation principale" className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <TransitionLink
                key={item.href}
                href={item.href}
                className="link-underline font-caps text-sm uppercase tracking-[0.18em] text-ivoire"
              >
                {item.label}
              </TransitionLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="menu-drawer"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`block h-px w-7 bg-ivoire transition-transform duration-300 ${
                menuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-7 bg-ivoire transition-transform duration-300 ${
                menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      <div
        id="menu-drawer"
        ref={drawerRef}
        className="fixed inset-0 z-[79] hidden flex-col justify-between bg-mousse px-8 pb-10 pt-32"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <nav aria-label="Menu mobile" className="flex flex-col gap-2">
          {[{ href: "/", label: "Accueil" }, ...NAV_ITEMS].map((item) => (
            <div key={item.href} className="overflow-hidden">
              <TransitionLink
                href={item.href}
                className="drawer-link block font-display text-5xl font-medium text-ivoire"
              >
                {item.label}
              </TransitionLink>
            </div>
          ))}
        </nav>
        <div className="drawer-meta flex flex-col gap-2 text-sm text-ivoire/70">
          <a href={`tel:${settings.telephone}`}>{settings.telephoneAffiche}</a>
          <a href={`mailto:${settings.email}`}>{settings.email}</a>
          <a href={settings.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </div>
    </>
  );
}
