# Maison Verdier — Site vitrine premium fleuriste

Site vitrine haut de gamme à fort storytelling, réalisé selon le
[cahier des charges](./cahier-des-charges-fleuriste-premium.md) (Next.js · GSAP · Three.js · Lenis).

## Démarrage

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de production
npm start          # serveur de production
```

## Stack

| Brique | Rôle |
|---|---|
| **Next.js 15** (App Router, TypeScript) | Framework, SSG, SEO, routing |
| **Tailwind CSS 3** | Styling (palette ivoire/mousse/sienne du CDC §5.2) |
| **GSAP 3.13** + ScrollTrigger, SplitText, DrawSVG, Flip | Toutes les animations (plugins Club désormais gratuits) |
| **Lenis** | Smooth scroll inertiel (désactivé sur mobile et `prefers-reduced-motion`) |
| **Three.js + @react-three/fiber** | Scène hero : pétales en particules (instanced mesh, fallback sans WebGL) |
| **React Hook Form + Zod** | Formulaire intelligent avec validation typée |
| **Zustand** | État global (intro, menu, curseur) |
| **Resend** | Envoi des e-mails de contact (optionnel, voir `.env.example`) |

## Expériences implémentées (CDC §6–7)

- **Loader brandé** : lettres animées + barre de progression, une fois par session.
- **Transitions de page** : rideau mousse profonde descendant/remontant (Power3.inOut, ~600 ms).
- **Curseur custom** desktop : cercle avec lag magnétique, libellés contextuels (« Voir », « Contact »…).
- **Hero Three.js** : 320 pétales en particules (140 sur mobile), parallaxe souris, titre SplitText mot à mot.
- **Manifeste** : révélation mot à mot pilotée par le scroll (scrub).
- **Savoir-faire** : image parallaxe masquée en forme organique + compteurs animés (Expo.out).
- **Portfolio** : masonry, apparition en cascade, filtres animés **GSAP Flip**.
- **Saisons** : horizontal scroll épinglé avec snap (desktop) / carousel natif à snap (mobile).
- **Tige SVG** : séparateurs dessinés au scroll (**DrawSVG**, scrub).
- **Contact** : grille de points interactive (canvas), formulaire à champs conditionnels,
  confirmation animée « pétale qui tombe », honeypot + rate limiting côté API.
- **Smart navbar** : se masque en scroll-down, réapparaît en scroll-up ; `mix-blend-difference`
  pour rester lisible sur fond clair comme sombre.

## Accessibilité & performance

- `prefers-reduced-motion` respecté partout (animations désactivées, Lenis coupé).
- Navigation clavier : focus visible, skip-link, Escape ferme menu/lightbox, labels de formulaire.
- `lang="fr"`, hiérarchie de titres, ARIA sur carrousel/filtres/fil d'Ariane.
- Polices auto-hébergées via `next/font` (`display: swap`), Three.js en dynamic import,
  headers de sécurité dans `next.config.ts`, JSON-LD `Florist`, sitemap + robots générés.

## Visuels

Les visuels sont des **compositions botaniques génératives** (SVG déterministes,
`components/ui/FloralArt.tsx`) qui suivent la palette saisonnière du CDC. Ils sont conçus
pour être remplacés tels quels par les photos du shooting professionnel (CDC §5.5) :
remplacer `FloralArt` par `next/image` dans `CreationCard`, les heros et les galeries.

## CMS (Sanity — prêt à brancher)

Le contenu vit dans `lib/data/*.ts` (même structure que les schémas du CDC §10.2).
Les schémas Sanity v3 sont prêts dans `sanity/schemas/`. Pour basculer :

1. `npm create sanity@latest` (projet + dataset), copier les schémas.
2. Ajouter `@sanity/client` et remplacer les imports `lib/data/*` par des requêtes GROQ.
3. Activer l'ISR (`revalidate`) sur les pages portfolio.

## Formulaire de contact

`POST /api/contact` — validation Zod, honeypot, rate limiting (5 req / 10 min / IP).
Avec `RESEND_API_KEY` (`.env.local`), les demandes partent par e-mail ; sinon elles sont
journalisées en console (mode développement).

## Structure

```
app/                  Pages (App Router) + API + sitemap/robots
components/
  layout/             Header, Footer, Loader, CustomCursor
  providers/          SmoothScroll (Lenis), TransitionProvider (rideau)
  sections/           Sections de pages (Hero, Manifeste, Saisons…)
  three/              Scène R3F (pétales)
  ui/                 Composants atomiques (cartes, magnétique, art génératif…)
hooks/                useGsapScope, prefers-reduced-motion, détection tactile
lib/                  gsap (registre plugins), store, données, schéma contact
sanity/schemas/       Schémas CMS prêts à déployer
```
