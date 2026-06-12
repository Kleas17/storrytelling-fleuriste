# Cahier des Charges — Site Vitrine Premium
## Fleuriste · Expérience Storytelling · Budget 15 000 – 20 000 €

---

> **Document de référence** · Version 1.0  
> **Type de projet** : Site vitrine haut de gamme à fort storytelling  
> **Budget estimé** : 15 000 € – 20 000 € HT  
> **Technologies clés** : Next.js · GSAP · Three.js · Lenis · Sanity CMS  

---

## Table des matières

1. [Contexte & vision](#1-contexte--vision)
2. [Objectifs stratégiques](#2-objectifs-stratégiques)
3. [Cibles & personas](#3-cibles--personas)
4. [Architecture de l'information](#4-architecture-de-linformation)
5. [Direction artistique & identité visuelle](#5-direction-artistique--identité-visuelle)
6. [Expérience utilisateur (UX)](#6-expérience-utilisateur-ux)
7. [Animations & interactions (GSAP + Three.js)](#7-animations--interactions-gsap--threejs)
8. [Stack technique complète](#8-stack-technique-complète)
9. [Pages & contenu détaillé](#9-pages--contenu-détaillé)
10. [CMS & gestion de contenu](#10-cms--gestion-de-contenu)
11. [Performance & Core Web Vitals](#11-performance--core-web-vitals)
12. [SEO & marketing digital](#12-seo--marketing-digital)
13. [Accessibilité (WCAG 2.1 AA)](#13-accessibilité-wcag-21-aa)
14. [Responsive & multi-device](#14-responsive--multi-device)
15. [Sécurité & conformité RGPD](#15-sécurité--conformité-rgpd)
16. [Livrables & jalons](#16-livrables--jalons)
17. [Recette & tests](#17-recette--tests)
18. [Maintenance & évolutions](#18-maintenance--évolutions)
19. [Budget détaillé](#19-budget-détaillé)
20. [Glossaire technique](#20-glossaire-technique)

---

## 1. Contexte & vision

### 1.1 Présentation du client

Le client est un fleuriste artisan positionné sur le segment **ultra-premium** : créations sur-mesure, art floral événementiel (mariages, galas, entreprises), bouquets de saison en circuit court. Sa clientèle est exigeante, sensible à l'esthétique et prête à payer le prix de l'excellence.

L'enseigne dispose déjà d'une réputation locale solide et d'une présence Instagram forte (~15 k abonnés), mais son site actuel — un template Wix — ne reflète pas du tout son niveau de prestation. Il perd des clients premium qui jugent la vitrine digitale avant tout.

### 1.2 Vision du projet

> *"Faire entrer le visiteur dans un monde : celui du vivant, de l'éphémère, de la beauté qui pousse."*

Le site ne doit pas être une simple carte de visite numérique. C'est une **expérience narrative immersive** qui raconte :

- Le geste du fleuriste (savoir-faire, philosophie)
- La vie des fleurs (de la tige au bouquet)
- L'émotion transmise (le don, la célébration, le deuil)

L'ambition est d'atteindre le niveau visuel et narratif des sites des grandes maisons de luxe (Chanel, Hermès, Dior) transposé à l'artisanat floral. Chaque scroll doit être une micro-expérience.

### 1.3 Positionnement marché

Le site doit s'inscrire dans la catégorie des **"award-worthy websites"** (Awwwards, CSS Design Awards, FWA). Il doit être suffisamment mémorable pour être partagé spontanément, cité dans des articles, et générer du bouche-à-oreille digital.

---

## 2. Objectifs stratégiques

### 2.1 Objectifs primaires

| Objectif | Indicateur de succès | Cible à 6 mois |
|---|---|---|
| Augmenter les demandes de devis | Formulaire de contact envoyés / mois | +150 % vs. site actuel |
| Capter la clientèle événementielle | Leads "mariage / événement" qualifiés | 20 leads/mois |
| Asseoir le positionnement premium | Taux de rebond < 35 % | < 35 % |
| Générer du trafic organique | Classement Google sur mots-clés cibles | Top 3 local |
| Renforcer la notoriété de marque | Partages sociaux, citations presse | 5 mentions/mois |

### 2.2 Objectifs secondaires

- Permettre au fleuriste de gérer ses contenus en autonomie (CMS headless)
- Construire une base d'e-mails pour une newsletter saisonnière
- Présenter un catalogue visuel évolutif sans refonte
- Faciliter les demandes de devis personnalisés (formulaire intelligent)

---

## 3. Cibles & personas

### Persona 1 — Sophie, 34 ans · Future mariée

**Situation** : Se marie dans 8 mois, budget floral 3 000–5 000 €, habituée des réseaux sociaux, très inspirée par Pinterest et Instagram. Elle compare 4–5 fleuristes avant de prendre rendez-vous.

**Besoins sur le site** : Voir des réalisations pour des mariages, comprendre l'approche créative, trouver des prix indicatifs ou une plaquette téléchargeable, pouvoir envoyer un message facilement.

**Frustrations** : Sites génériques, galeries photos mal organisées, absence de tarification, processus de contact opaque.

**Ce que le site doit lui donner** : Confiance dans le talent, sentiment d'exclusivité, facilité à se projeter.

---

### Persona 2 — Laurent, 47 ans · Directeur des achats, ETI

**Situation** : Gère les commandes florales pour les événements d'entreprise (séminaires, inaugurations). Budget annuel 15 000–25 000 €. Recherche un prestataire fiable, professionnel, capable de gérer des volumes.

**Besoins sur le site** : Voir des références B2B, comprendre les capacités logistiques, trouver un interlocuteur dédié, crédibilité immédiate.

**Frustrations** : Sites trop "grand public", absence de références corporate, difficultés à obtenir un devis rapide.

---

### Persona 3 — Marie, 62 ans · Fidèle cliente

**Situation** : Cliente depuis 5 ans, commande régulièrement des bouquets pour offrir. Connaît la boutique mais utilise peu le site actuel. Sensible à la beauté, moins tech-savvy.

**Besoins sur le site** : Retrouver le style qu'elle aime, voir les créations du moment, contacter facilement pour passer une commande.

**Frustrations** : Navigation complexe, trop d'animations qui ralentissent, textes trop petits.

---

## 4. Architecture de l'information

### 4.1 Sitemap

```
/                          → Page d'accueil (Manifeste + storytelling)
/savoir-faire              → Histoire & philosophie du fleuriste
/creations                 → Galerie portfolio (toutes catégories)
  /creations/mariages      → Spécial mariage
  /creations/evenements    → Événementiel corporate & privé
  /creations/bouquets      → Bouquets & compositions courantes
  /creations/deuil         → Fleurs de deuil (sobre, discret)
/saisons                   → Le vivant au fil des saisons (contenu éditorial)
  /saisons/printemps
  /saisons/ete
  /saisons/automne
  /saisons/hiver
/contact                   → Formulaire de contact + carte + infos pratiques
/mentions-legales          → Mentions légales & politique de confidentialité
```

### 4.2 Navigation principale

Navigation **minimaliste et discrète** : logotype centré ou à gauche, menu hamburger animé ou navigation horizontale réduite à 4–5 items max. Sur mobile, menu drawer avec animation fluide.

La navigation doit disparaître en scroll-down et réapparaître en scroll-up (comportement "smart navbar").

### 4.3 Hiérarchie des contenus

Chaque page suit une logique **Émotionnel → Rationnel** :

1. Accroche sensorielle (image, animation, titre poétique)
2. Récit (texte court, storytelling)
3. Preuves visuelles (galerie, références)
4. Appel à l'action clair

---

## 5. Direction artistique & identité visuelle

### 5.1 Univers visuel

L'esthétique du site doit évoquer :

- **L'atelier artisanal haut de gamme** : matières brutes, lumière naturelle, silence
- **La typographie éditoriale de luxe** : magazines comme Kinfolk, Cereal, Vogue Living
- **La nature organique** : formes irrégulières, courbes végétales, texture du papier

### 5.2 Palette de couleurs

| Rôle | Nom | Valeur hexadécimale | Usage |
|---|---|---|---|
| Fond principal | Ivoire brumeux | `#F5F0EB` | Background global |
| Accent primaire | Mousse profonde | `#3D4A3E` | Titres, CTA principaux |
| Accent secondaire | Terre de Sienne | `#B8814A` | Liens, highlights, ornements |
| Neutre foncé | Encre nuit | `#1C1C1E` | Corps de texte |
| Neutre clair | Craie | `#EDE8E1` | Séparateurs, cartes |
| Blanc pur | — | `#FFFFFF` | Espaces de respiration |

> **Note** : Le fond ivoire brumeux est délibéré — contrairement au blanc pur, il évoque le papier de soie, la délicatesse. Il ne doit jamais tirer vers le beige chaleureux (risque de banalité), mais rester dans le spectre du luxe éditorial.

### 5.3 Typographie

**Affichage principal (H1, grands titres)** : `Cormorant Garamond` — serif élégant à fort contraste de pleins et de déliés. Évoque la presse de luxe, la joaillerie. Utilisé en gras (700) pour les accroches, en italique fin (300) pour les sous-titres poétiques.

**Corps de texte** : `DM Sans` — sans-serif moderne et lisible, neutre sans être froid. Apporte une respiration contemporaine face au serif classique.

**Détails & labels** : `Cormorant SC` (small caps) — pour les catégories, étiquettes, breadcrumbs. Donne un cachet éditorial sans alourdir.

**Échelle typographique** :

```
Display XL  : 96–120px / Cormorant Garamond Bold
Display L   : 64–80px  / Cormorant Garamond Bold
H1          : 48–56px  / Cormorant Garamond Bold
H2          : 36–42px  / Cormorant Garamond Regular
H3          : 24–28px  / DM Sans Medium
Body Large  : 18–20px  / DM Sans Regular / line-height: 1.7
Body        : 16px     / DM Sans Regular / line-height: 1.6
Caption     : 12–13px  / Cormorant SC Regular
```

### 5.4 Éléments graphiques

- **Ligne de trait organique** : Un motif de tige florale SVG animée utilisé comme séparateur de sections — dessinée progressivement par GSAP (`stroke-dashoffset`).
- **Grain de texture** : Superposition subtile d'une texture grain (SVG ou PNG) en `mix-blend-mode: multiply` à 4–6 % d'opacité sur les sections ivoire — donne un rendu "papier".
- **Cercle végétal** : Ornement circulaire vectoriel de feuilles pour les introductions de section.
- **Ratio photographique** : Toutes les photos en format portrait 3:4 ou carré 1:1 — jamais de paysage 16:9 qui banalise.

### 5.5 Photographie

La direction photo est centrale. Le client doit impérativement fournir ou faire réaliser un shooting professionnel conforme au brief suivant :

- **Lumière** : naturelle, latérale, douce (jamais de flash)
- **Fond** : marbre blanc, bois brut, papier de soie ivoire, béton ciré
- **Cadrage** : gros plans sur textures florales, mains du fleuriste au travail, détails de composition
- **Post-traitement** : étalonnage cohérent, tons légèrement désaturés et chauds
- **Formats livrés** : WebP optimisé, minimum 2400px côté long, ratio 3:4 pour portraits

> Si le client ne dispose pas de photos conformes, il est fortement recommandé de prévoir **1–2 jours de shooting** dans le budget (photographe + direction artistique). Coût estimé : 1 500–2 500 € HT.

---

## 6. Expérience utilisateur (UX)

### 6.1 Principe de navigation immersive

Le site adopte un modèle de **scroll narratif vertical** sur la page d'accueil : chaque section est une scène. L'utilisateur ne "navigue pas" un site — il "traverse une histoire". Ce modèle est comparable aux sites de Loewe, Miu Miu, ou des agences créatives comme Active Theory ou Resn.

**Règles UX fondamentales** :

- Jamais plus de 3 CTA distincts sur une même page
- Chaque page doit pouvoir être comprise en **5 secondes** sans lecture
- Le formulaire de contact doit être joignable en **maximum 2 clics** depuis n'importe quelle page
- Temps de chargement perçu < 1,5 secondes (avec loader animé branded)

### 6.2 Loader / Intro screen

Un loader branded est affiché pendant le chargement des assets critiques :

- Logotype qui apparaît progressivement (tracé SVG animé)
- Barre de progression subtile ou animation de pétale
- Durée maximale : 2,5 secondes — après quoi le loader se dissout en révélant le hero
- Géré par GSAP Timeline, coordonné avec le chargement des assets

### 6.3 Transitions entre pages

Navigation avec **transitions de page** fluides via GSAP + Barba.js (ou Next.js App Router avec View Transitions API) :

- Sortie : rideau vertical qui descend (couleur mousse profonde `#3D4A3E`)
- Entrée : rideau qui remonte en révélant la nouvelle page
- Durée : 600ms easing `Power3.inOut`

### 6.4 Curseur personnalisé

Sur desktop uniquement :

- Remplacement du curseur natif par un curseur custom (cercle transparent avec bordure fine)
- Sur éléments interactifs (boutons, images) : le curseur se dilate et change de libellé (`"Voir"`, `"Contact"`, `"Découvrir"`)
- Implémenté en CSS + GSAP avec lag magnétique

### 6.5 Interactions magnétiques

Éléments CTA principaux avec **effet magnétique** : la souris attire légèrement le bouton dans son sillon (rayon : 60px), créant une sensation de matérialité premium.

### 6.6 Formulaire de contact intelligent

Le formulaire adapte ses champs selon le type de demande sélectionné :

```
Type de demande → Mariage        : champs date, budget indicatif, lieu
Type de demande → Événement pro  : champs entreprise, quantité, date
Type de demande → Commande       : champs type de fleurs, occasion, livraison
Type de demande → Autre          : message libre
```

Validation en temps réel, retour visuel animé, message de confirmation avec animation de confirmation (pétale qui tombe).

---

## 7. Animations & interactions (GSAP + Three.js)

> GSAP (GreenSock Animation Platform) est la référence absolue pour les animations web performantes. En 2024–2025, c'est encore la meilleure option pour les projets premium : performances supérieures à CSS, API expressive, support ScrollTrigger natif, et compatibilité universelle. Aucune alternative (Framer Motion, Motion One, anime.js) n'égale GSAP sur des projets de cette ambition.

### 7.1 Stack d'animation

| Outil | Rôle | Version |
|---|---|---|
| **GSAP 3.x** | Moteur d'animation principal | 3.12+ |
| **GSAP ScrollTrigger** | Animations pilotées par le scroll | Plugin officiel |
| **GSAP SplitText** | Animation lettre par lettre / mot par mot | Plugin officiel (Club) |
| **GSAP DrawSVG** | Tracé progressif de SVG | Plugin officiel (Club) |
| **GSAP MorphSVG** | Transformation de formes SVG | Plugin officiel (Club) |
| **Lenis** | Smooth scroll inertiel | 1.x |
| **Three.js** | Scène 3D WebGL (hero & section immersive) | r165+ |
| **@react-three/fiber** | Bridge Three.js / React | 8.x |

> **Note sur GSAP Club** : Les plugins SplitText, DrawSVG et MorphSVG nécessitent une licence GSAP Club (~150 $/an). À prévoir dans le budget ou utiliser les alternatives open-source (SplitType pour SplitText).

### 7.2 Animations par section

#### Hero (page d'accueil)

**Scène Three.js — Pétales en particules** :

- 200–400 particules représentant des pétales (géométries `PlaneGeometry` texturées)
- Mouvement : flottement sinusoïdal lent, réaction subtile au mouvement de la souris (parallaxe 3D)
- Shader personnalisé : les pétales tournent lentement sur eux-mêmes
- Performance : instanced mesh, 60 fps garanti, fallback désactivé si GPU low-end (`renderer.getContext()` check)
- Fond : noir profond ou fondu sur photo de bouquet

**Titre hero** :

```
Animation SplitText GSAP :
- Les mots apparaissent de bas en haut, décalés (stagger: 0.08s)
- Durée par mot : 0.9s, easing : Power4.out
- Déclenchement : après dissolution du loader (Timeline coordonnée)
```

**Sous-titre** : fondu enchaîné après le titre, délai 0.4s.

**CTA principal** : clip-path reveal de gauche à droite, durée 0.6s.

---

#### Section Manifeste (page d'accueil)

**Scroll-driven text reveal** via ScrollTrigger :

- Chaque paragraphe se révèle mot par mot en scrollant (scrub: true)
- Les mots non encore atteints sont à 20 % d'opacité
- Les mots lus passent à 100 % d'opacité avec une translation Y subtile (+8px → 0px)
- Référence esthétique : Stripe.com, Linear.app, Basement Studio

---

#### Section Savoir-faire

**Image parallaxe** :

- Photo du fleuriste en train de travailler
- Parallaxe vertical : l'image avance à 80 % de la vitesse du scroll (illusion de profondeur)
- Masque de clip-path : l'image est contenue dans une forme végétale SVG (feuille elliptique)

**Compteurs animés** (chiffres clés : années d'expérience, créations par an, espèces travaillées) :

- CountUp GSAP déclenché au scroll (ScrollTrigger `once: true`)
- Easing : `Expo.out`

---

#### Galerie Portfolio

**Layout masonry animé** :

- Grille masonry en CSS columns ou layouter JS
- À l'entrée dans le viewport : les cartes apparaissent en cascade (stagger 0.06s), avec un léger scale (0.92 → 1) et fade
- Hover : scale 1.04, ombre portée, curseur custom "Voir"
- Clic : modal ou page dédiée avec transition GSAP flip (GSAP Flip Plugin)

**Filtres de catégorie** :

- Transition de layout fluide lors du filtrage (GSAP Flip : les cartes se repositionnent avec une animation physique)

---

#### Section Saisons (page éditoriale)

**Horizontal scroll sur desktop** :

- ScrollTrigger horizontal : le scroll vertical traduit en défilement horizontal (pin: true)
- 4 panneaux (Printemps / Été / Automne / Hiver), chacun avec sa palette de couleurs
- Transition de couleur de fond progressive au passage d'un panneau à l'autre (`gsap.to(document.body, { backgroundColor: ... })`)

---

#### Tige SVG animée (séparateur de sections)

```javascript
// Exemple de code GSAP DrawSVG
gsap.from("#tige-svg path", {
  drawSVG: "0%",
  duration: 2.5,
  ease: "power2.inOut",
  scrollTrigger: {
    trigger: "#tige-svg",
    start: "top 75%",
    end: "bottom 25%",
    scrub: 1
  }
});
```

---

#### Page Contact

**Fond interactif** :

- Grille de points (canvas 2D ou SVG) qui se distordent au mouvement de la souris
- Amplitude maximale : 30px, rayon d'influence : 150px
- Rendu aérien et vivant sans être distrayant

---

### 7.3 Règles d'animation

**Performance** :
- Toujours animer `transform` et `opacity` (compositing layer, pas de reflow)
- Jamais animer `width`, `height`, `top`, `left` directement
- Utiliser `will-change: transform` uniquement sur les éléments réellement animés
- Désactiver les animations si `prefers-reduced-motion: reduce` (GSAP le gère nativement)

**Timing global** :
- Animations d'entrée : 0.6–1.2s maximum
- Micro-interactions (hover) : 0.2–0.35s
- Transitions de page : 0.5–0.8s
- Animations scrub (liées au scroll) : pas de durée fixe, asservies au scroll

**Cohérence des easings** :
- Entrées : `Power4.out` ou `Expo.out` (démarrage rapide, fin douce)
- Sorties : `Power3.in`
- Transitions de page : `Power3.inOut`
- Scrub : `none` ou `0.5–1` (inertie légère)

---

## 8. Stack technique complète

### 8.1 Frontend

| Technologie | Rôle | Justification |
|---|---|---|
| **Next.js 14+** (App Router) | Framework React, SSG/SSR | Performance, SEO, routing, image optimization |
| **TypeScript** | Typage statique | Maintenabilité, moins d'erreurs runtime |
| **Tailwind CSS 3.x** | Styling utilitaire | Rapidité, cohérence, purge CSS automatique |
| **GSAP 3.x + plugins** | Animations | Standard industrie pour sites premium |
| **Three.js + R3F** | Scène WebGL 3D | Expérience immersive hero & sections |
| **Lenis** | Smooth scroll | Scroll inertiel fluide, compatible GSAP ST |
| **Framer Motion** | Animations React | Complémentaire GSAP pour composants React |
| **Zustand** | State management léger | Gestion état global (menu, modal, filters) |
| **React Hook Form + Zod** | Formulaires | Validation performante et typée |

### 8.2 Backend & CMS

| Technologie | Rôle |
|---|---|
| **Sanity CMS v3** | CMS headless, gestion de contenu autonome pour le client |
| **Sanity GROQ** | Requêtes de données |
| **Resend** (ou Nodemailer) | Envoi d'e-mails de contact |
| **Vercel** | Hébergement, edge network, CDN, ISR |

### 8.3 Outils de développement

| Outil | Rôle |
|---|---|
| **pnpm** | Gestionnaire de paquets |
| **ESLint + Prettier** | Qualité & formatage du code |
| **Husky + lint-staged** | Pre-commit hooks |
| **Playwright** | Tests E2E |
| **Storybook** | Documentation composants UI |
| **Lighthouse CI** | Automatisation Core Web Vitals |

### 8.4 Médias & optimisation

| Outil | Rôle |
|---|---|
| **Next/Image** | Optimisation images (WebP, AVIF, lazy) |
| **Cloudinary** (optionnel) | Transformations images à la volée depuis le CMS |
| **next-sitemap** | Génération sitemap XML automatique |
| **@vercel/analytics** | Analytics privacy-first |

### 8.5 Architecture des dossiers (Next.js App Router)

```
/
├── app/
│   ├── layout.tsx              # Root layout (fonts, providers, Lenis)
│   ├── page.tsx                # Page d'accueil
│   ├── savoir-faire/page.tsx
│   ├── creations/
│   │   ├── page.tsx
│   │   ├── [slug]/page.tsx     # Page projet dynamique
│   ├── saisons/
│   │   ├── page.tsx
│   │   ├── [saison]/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── ui/                     # Composants atomiques (Button, Card, Input...)
│   ├── sections/               # Sections de pages (Hero, Manifeste, Portfolio...)
│   ├── layout/                 # Header, Footer, Navigation, Loader
│   └── three/                  # Composants Three.js / R3F
├── lib/
│   ├── sanity.ts               # Client Sanity
│   ├── gsap.ts                 # Registre GSAP + plugins
│   └── utils.ts
├── hooks/                      # Custom React hooks (useGSAP, useLenis, useScrollTrigger)
├── styles/                     # globals.css, variables CSS
└── sanity/                     # Schémas CMS
    ├── schemas/
    │   ├── creation.ts
    │   ├── saison.ts
    │   └── settings.ts
```

---

## 9. Pages & contenu détaillé

### 9.1 Page d'accueil `/`

**Structure narrative (scroll vertical)** :

```
┌──────────────────────────────────────────┐
│  SECTION 1 — HERO                        │
│  Scène Three.js plein écran              │
│  Titre : "Ce que les fleurs ont à dire." │
│  Sous-titre italique fin                 │
│  CTA : "Entrer dans l'atelier"           │
└──────────────────────────────────────────┘
┌──────────────────────────────────────────┐
│  SECTION 2 — MANIFESTE                  │
│  Texte scroll-driven word-by-word        │
│  "Nous ne vendons pas des fleurs.        │
│   Nous cultivons des instants."          │
└──────────────────────────────────────────┘
┌──────────────────────────────────────────┐
│  SECTION 3 — SAVOIR-FAIRE               │
│  Photo pleine largeur (parallaxe)        │
│  3 chiffres clés animés                  │
│  Lien → /savoir-faire                   │
└──────────────────────────────────────────┘
┌──────────────────────────────────────────┐
│  SECTION 4 — PORTFOLIO (aperçu)         │
│  Grille 3 photos, masonry               │
│  CTA : "Voir toutes les créations"       │
└──────────────────────────────────────────┘
┌──────────────────────────────────────────┐
│  SECTION 5 — SAISONS                    │
│  Horizontal scroll 4 panneaux            │
│  (Desktop) / Carousel (Mobile)          │
└──────────────────────────────────────────┘
┌──────────────────────────────────────────┐
│  SECTION 6 — TÉMOIGNAGES                │
│  3 témoignages clients, fade carousel   │
└──────────────────────────────────────────┘
┌──────────────────────────────────────────┐
│  SECTION 7 — CTA FINAL                  │
│  Fond mousse profonde                    │
│  "Un projet ? Une idée ? Parlons-en."   │
│  Bouton contact magnétique              │
└──────────────────────────────────────────┘
┌──────────────────────────────────────────┐
│  FOOTER                                  │
│  Logo · Nav · RS · Mentions légales      │
└──────────────────────────────────────────┘
```

---

### 9.2 Page Savoir-faire `/savoir-faire`

**Structure** :

1. **Hero éditorial** : grande photo du fleuriste de dos, regardant ses créations. Titre en Cormorant superposé.
2. **Histoire** : récit en deux colonnes (texte + photo), avec pull quote en grand italique.
3. **Philosophie** : 3 piliers en layout horizontal avec icônes SVG dessinés au scroll (DrawSVG).
   - *Le vivant d'abord* — saisons, circuits courts
   - *La main avant la machine* — geste artisanal
   - *L'émotion comme boussole* — créer pour toucher
4. **Atelier en images** : galerie lightbox (4–6 photos de l'atelier, des outils, des mains).
5. **CTA** : lien vers le portfolio ou le contact.

---

### 9.3 Page Créations `/creations`

**Filtres** : Tous / Mariages / Événements / Bouquets / Deuil

**Layout** : Grille masonry 2–3 colonnes (desktop), 1–2 colonnes (mobile)

**Carte projet** :
- Photo en 3:4
- Survol : overlay semi-transparent avec titre et catégorie
- Clic : page projet `/creations/[slug]`

**Page projet individuelle** :
- Hero : photo en pleine largeur (ou diaporama 2–3 photos)
- Contexte : occasion, type de fleurs, saison
- Galerie : photos supplémentaires
- Témoignage client (si disponible)
- Navigation : projet précédent / suivant

---

### 9.4 Page Saisons `/saisons`

Page éditoriale à fort contenu et fort impact visuel. Chaque saison est une mini-histoire :

- Fleurs emblématiques de la saison
- Palette de couleurs saisonnières
- Suggestion de compositions
- Photo inspirationnelle

Navigation inter-saisons avec **transition de couleur de fond** animée (GSAP).

---

### 9.5 Page Contact `/contact`

**Layout** :
- Colonne gauche (40 %) : informations pratiques + carte Google Maps stylisée (style monochrome ivoire)
- Colonne droite (60 %) : formulaire intelligent

**Formulaire** :

```
Champ 1 : Prénom & Nom *
Champ 2 : Email *
Champ 3 : Téléphone
Champ 4 : Type de demande * [select : Mariage / Événement / Commande / Autre]
Champ 5 : [conditionnel selon type]
Champ 6 : Message *
Champ 7 : Comment nous avez-vous trouvés ? [optionnel]
Bouton   : "Envoyer ma demande"
```

**Confirmation** : Message animé sur place (pas de redirect), avec animation pétale.

**Infos pratiques** :
- Adresse & horaires
- Téléphone (cliquable)
- Email (cliquable)
- Lien Instagram

---

### 9.6 Footer

- Logo + tagline courte
- Navigation secondaire (5 liens max)
- Icônes réseaux sociaux (Instagram, Pinterest en priorité)
- Mentions légales / Politique de confidentialité
- Copyright + année (dynamique)
- Éventuellement : newsletter signup (e-mail + bouton)

---

## 10. CMS & gestion de contenu

### 10.1 Choix du CMS : Sanity v3

Sanity est un CMS headless moderne avec Studio personnalisable. Il est choisi pour :

- Interface d'administration claire et adaptable aux non-développeurs
- API GROQ performante et flexible
- Support des types d'images avancés (hotspot, crop)
- CDN images intégré (Sanity Image Pipeline)
- Collaboration en temps réel si nécessaire

### 10.2 Schémas de contenu

**Création (projet portfolio)** :

```typescript
// sanity/schemas/creation.ts
{
  name: 'creation',
  title: 'Création',
  type: 'document',
  fields: [
    { name: 'titre', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'titre' } },
    { name: 'categorie', type: 'string', 
      options: { list: ['mariage', 'evenement', 'bouquet', 'deuil'] } },
    { name: 'saison', type: 'string',
      options: { list: ['printemps', 'ete', 'automne', 'hiver'] } },
    { name: 'imageHero', type: 'image', options: { hotspot: true } },
    { name: 'galerie', type: 'array', of: [{ type: 'image' }] },
    { name: 'description', type: 'blockContent' },
    { name: 'fleurs', type: 'array', of: [{ type: 'string' }] },
    { name: 'temoignage', type: 'object', fields: [
      { name: 'texte', type: 'text' },
      { name: 'auteur', type: 'string' }
    ]},
    { name: 'dateCreation', type: 'date' },
    { name: 'ordre', type: 'number' },
    { name: 'featured', type: 'boolean' }
  ]
}
```

**Paramètres globaux (Settings)** :

```typescript
{
  name: 'settings',
  title: 'Paramètres du site',
  type: 'document',
  fields: [
    { name: 'nomFleuriste', type: 'string' },
    { name: 'tagline', type: 'string' },
    { name: 'logo', type: 'image' },
    { name: 'adresse', type: 'text' },
    { name: 'telephone', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'horaires', type: 'array', of: [{ type: 'string' }] },
    { name: 'instagram', type: 'url' },
    { name: 'pinterest', type: 'url' },
    { name: 'metaDescription', type: 'text' },
    { name: 'ogImage', type: 'image' }
  ]
}
```

### 10.3 Formation client

Une session de formation de **2 heures** est incluse dans le projet :

- Créer et modifier une création portfolio
- Mettre à jour les informations pratiques
- Modifier les textes éditoriaux
- Gérer les images (recadrage via hotspot)

Un guide utilisateur PDF de 10–15 pages est livré avec le projet.

---

## 11. Performance & Core Web Vitals

### 11.1 Objectifs

| Métrique | Cible |
|---|---|
| **LCP** (Largest Contentful Paint) | < 2.0s |
| **INP** (Interaction to Next Paint) | < 100ms |
| **CLS** (Cumulative Layout Shift) | < 0.05 |
| **FCP** (First Contentful Paint) | < 1.0s |
| **TTFB** (Time to First Byte) | < 200ms |
| **Score Lighthouse** (mobile) | ≥ 90 |
| **Score Lighthouse** (desktop) | ≥ 95 |

### 11.2 Stratégies d'optimisation

**Images** :
- Format WebP/AVIF via `next/image`
- `sizes` et `srcset` adaptés aux breakpoints
- `priority` sur les images above-the-fold (LCP)
- Lazy loading natif pour les images hors viewport
- Dimensions explicites pour éviter le CLS

**JavaScript** :
- Code splitting automatique (Next.js)
- Chargement GSAP uniquement côté client (`"use client"`, dynamic import)
- Three.js chargé en dynamic import avec `ssr: false`
- Bundle analyzer intégré (Webpack Bundle Analyzer)

**Fonts** :
- `font-display: swap` pour Cormorant Garamond et DM Sans
- Preload des variantes critiques (Bold + Regular)
- Auto-hébergement via `next/font` (pas de Google Fonts externe)

**Scroll & animations** :
- `will-change: transform` uniquement sur les éléments en cours d'animation
- Pas d'animation sur des propriétés coûteuses (filter: blur sauf si nécessaire)
- `requestAnimationFrame` pour les animations canvas
- Lenis désactivé sur appareils mobiles (scroll natif plus performant)

**Caching & CDN** :
- Vercel Edge Network (CDN mondial)
- ISR (Incremental Static Regeneration) pour les pages portfolio
- Headers de cache agressifs sur assets statiques

### 11.3 Monitoring continu

- Intégration **Vercel Analytics** + Speed Insights
- Alertes si Lighthouse score descend sous 85 (CI GitHub Actions)

---

## 12. SEO & marketing digital

### 12.1 SEO technique

- URLs en français, avec tirets (`/creations/mariage-champetre`)
- Balises `<title>` et `<meta description>` uniques par page (gérées depuis Sanity)
- Balises Open Graph et Twitter Card complètes
- Structured data JSON-LD :
  - `LocalBusiness` (fleuriste, adresse, horaires, téléphone)
  - `ItemList` pour la galerie portfolio
  - `BreadcrumbList` pour les pages secondaires
- Sitemap XML généré automatiquement (`next-sitemap`)
- `robots.txt` configuré
- Canonicals sur toutes les pages
- Pas de contenu dupliqué

### 12.2 Mots-clés cibles (exemples)

| Intention | Mot-clé principal | Volume estimé |
|---|---|---|
| Local générique | "fleuriste [ville]" | Fort |
| Mariage | "fleuriste mariage [ville]" | Moyen-fort |
| Événement | "fleuriste événementiel [région]" | Moyen |
| Bouquet | "bouquet de fleurs [ville]" | Fort |
| Deuil | "fleurs deuil [ville]" | Moyen |

### 12.3 Contenu SEO

La section **Saisons** et les descriptions de créations constituent le cœur du contenu SEO long-tail. Chaque création est une page indexable avec contenu unique.

### 12.4 Google My Business

Recommandation de synchronisation entre le site et la fiche Google My Business : même adresse, mêmes horaires, liens croisés.

### 12.5 Réseaux sociaux

- Balises Open Graph optimisées pour les partages Instagram/Pinterest
- Images OG au format 1200×630px générées dynamiquement (`@vercel/og`)

---

## 13. Accessibilité (WCAG 2.1 AA)

### 13.1 Standards requis

Le site vise la conformité **WCAG 2.1 niveau AA**, qui est le standard légal recommandé en France (RGAA).

### 13.2 Points de contrôle principaux

**Perceptible** :
- Toutes les images ont un `alt` text descriptif (ou `alt=""` si décorative)
- Ratio de contraste ≥ 4.5:1 pour le texte normal, ≥ 3:1 pour le texte grand
- Sous-titres disponibles pour tout contenu vidéo éventuel
- Le contenu ne repose pas uniquement sur la couleur

**Utilisable** :
- Navigation entièrement possible au clavier (Tab, Shift+Tab, Enter, Escape)
- Focus visible sur tous les éléments interactifs (ring CSS clairement stylisé)
- Pas de piège au focus (modals avec focus trap correct)
- `prefers-reduced-motion` respecté (toutes animations GSAP désactivées ou réduites)
- Pas de contenu clignotant à plus de 3 fois/seconde

**Compréhensible** :
- `lang="fr"` sur le `<html>`
- Labels associés à chaque champ de formulaire (`<label for="">`)
- Messages d'erreur explicites et programmatiquement associés
- Structure de headings logique (un seul H1 par page, hiérarchie respectée)

**Robuste** :
- HTML valide (validator W3C)
- Attributs ARIA utilisés correctement (pas de sur-ARIA)
- Compatible avec les lecteurs d'écran (testé NVDA/Windows + VoiceOver/macOS)

---

## 14. Responsive & multi-device

### 14.1 Breakpoints

```css
/* Tailwind CSS breakpoints utilisés */
sm:  640px   /* Smartphone paysage */
md:  768px   /* Tablette portrait */
lg:  1024px  /* Tablette paysage / petit laptop */
xl:  1280px  /* Desktop standard */
2xl: 1536px  /* Grand écran */
```

### 14.2 Adaptations par device

**Mobile (< 768px)** :
- Navigation : hamburger drawer
- Hero : titre vertical, scène Three.js simplifiée (moins de particules) ou image statique
- Horizontal scroll saisons → carousel vertical natif
- Curseur custom désactivé
- Animations allégées (moins de parallaxe, stagger réduit)
- Grille portfolio : 1 colonne
- Taille typographique ajustée (Display XL → 48px max)

**Tablette (768–1024px)** :
- Navigation : idem desktop ou hamburger selon espace
- Grille portfolio : 2 colonnes
- Sections en colonne unique ou 2 colonnes

**Desktop large (> 1536px)** :
- Contenu centré avec max-width: 1440px
- Typographie légèrement agrandie

### 14.3 Tests multi-devices

Tests requis sur :
- iPhone 14 Pro (Safari iOS)
- Samsung Galaxy S23 (Chrome Android)
- iPad Pro 12.9" (Safari iPadOS)
- MacBook Pro 14" (Chrome, Safari, Firefox)
- Windows 11 Desktop (Chrome, Edge, Firefox)

---

## 15. Sécurité & conformité RGPD

### 15.1 RGPD

**Formulaire de contact** :
- Collecte minimale (seuls les champs nécessaires)
- Mention d'information claire : finalité, durée de conservation, droit d'accès/suppression
- Pas de stockage en base de données sans consentement explicite (les données sont envoyées par e-mail et supprimées)

**Analytics** :
- Vercel Analytics est privacy-first et ne nécessite pas de bandeau cookies si configuré sans identifiants cross-site
- Si Google Analytics est requis : bandeau de consentement conforme (Axeptio ou Cookiebot)

**Newsletter** (si incluse) :
- Double opt-in obligatoire
- Lien de désinscription dans chaque e-mail

### 15.2 Sécurité technique

- Connexion HTTPS forcée (SSL Let's Encrypt via Vercel, renouvellement automatique)
- Headers de sécurité configurés (via `next.config.js`) :
  - `Content-Security-Policy`
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy`
- Protection contre le spam sur le formulaire : honeypot field + rate limiting (Vercel Edge Middleware)
- Variables d'environnement sensibles dans Vercel (jamais dans le repo)

### 15.3 Mentions légales

Page `/mentions-legales` avec :
- Identité de l'éditeur
- Identité de l'hébergeur
- Politique de confidentialité
- Gestion des cookies
- Droits des utilisateurs (accès, rectification, suppression)

---

## 16. Livrables & jalons

### 16.1 Phases du projet

```
PHASE 1 — Cadrage & direction artistique          [2 semaines]
  ✓ Kick-off meeting
  ✓ Validation du cahier des charges
  ✓ Benchmark concurrentiel (5 références)
  ✓ Moodboard direction artistique
  ✓ Validation identité visuelle (couleurs, typo, style photo)
  ✓ Wireframes basse fidélité (toutes pages)

PHASE 2 — Design UI haute fidélité                [3 semaines]
  ✓ Design Figma : page d'accueil complète (desktop + mobile)
  ✓ Design Figma : pages secondaires (5 templates)
  ✓ Prototype interactif Figma (transitions, états hover)
  ✓ Design system : composants, tokens, guide de style
  ✓ Validation client (2 tours de corrections inclus)

PHASE 3 — Développement frontend                  [5 semaines]
  ✓ Setup projet (Next.js, Tailwind, TypeScript, GSAP)
  ✓ Développement composants UI (Storybook)
  ✓ Intégration pages (HTML/CSS pixel-perfect)
  ✓ Animations GSAP : Hero, Manifeste, Portfolio, Saisons
  ✓ Scène Three.js (pétales hero)
  ✓ Transitions de page (Barba.js ou GSAP Flip)
  ✓ Curseur custom + interactions magnétiques
  ✓ Horizontal scroll section Saisons
  ✓ Responsive (mobile + tablette)
  ✓ Accessibilité (prefers-reduced-motion, focus, ARIA)

PHASE 4 — CMS & intégrations                      [2 semaines]
  ✓ Configuration Sanity Studio
  ✓ Schémas de contenu
  ✓ Connexion frontend → CMS (GROQ queries)
  ✓ Intégration formulaire contact (Resend)
  ✓ Saisie du contenu initial (textes + photos fournis par le client)
  ✓ Formation client (2h)
  ✓ Guide utilisateur PDF

PHASE 5 — SEO, performance & tests               [1,5 semaine]
  ✓ Audit SEO technique (structured data, sitemap, metas)
  ✓ Optimisation Core Web Vitals (Lighthouse ≥ 90 mobile)
  ✓ Tests cross-browser (Chrome, Safari, Firefox, Edge)
  ✓ Tests multi-devices (5 appareils)
  ✓ Audit accessibilité WCAG 2.1 AA
  ✓ Tests de charge basiques
  ✓ Sécurité headers + RGPD

PHASE 6 — Recette & mise en ligne                 [0,5 semaine]
  ✓ Livraison environnement de recette (URL de staging)
  ✓ Corrections recette (1 tour inclus)
  ✓ Mise en production (Vercel)
  ✓ Configuration DNS
  ✓ Transfert des accès (Vercel, Sanity, domaine)

TOTAL : ~14 semaines (3,5 mois)
```

### 16.2 Livrables documentaires

- [ ] Cahier des charges validé (ce document)
- [ ] Moodboard direction artistique (PDF)
- [ ] Wireframes (Figma, accès view-only)
- [ ] Design haute fidélité complet (Figma)
- [ ] Design system (Figma + export tokens)
- [ ] Code source (repo GitHub privé, transfert à la livraison)
- [ ] Guide utilisateur CMS (PDF, 10–15 pages)
- [ ] Documentation technique (README + commentaires code)
- [ ] Rapport d'audit Lighthouse (PDF)
- [ ] Rapport d'accessibilité (PDF)

---

## 17. Recette & tests

### 17.1 Plan de tests fonctionnels

| Test | Critère de validation |
|---|---|
| Navigation toutes pages | Accès sans erreur 404 |
| Formulaire contact | Réception e-mail, validation erreurs |
| Filtres portfolio | Résultats corrects, animation fluide |
| Lightbox/modal galerie | Ouverture, fermeture, navigation |
| Responsive mobile | Aucun débordement, lisibilité |
| Transitions de page | Fluidité, pas de flash blanc |
| Animations scroll | Déclenchement correct, pas de saccade |
| Loader | Apparaît, disparaît, timing correct |
| Curseur custom | Desktop uniquement, comportement correct |
| Horizontal scroll saisons | Fonctionne desktop, désactivé mobile |
| Performance Lighthouse | Score ≥ 90 mobile, ≥ 95 desktop |
| SEO | Toutes metas présentes, sitemap valide |
| RGPD | Mentions légales complètes, formulaire conforme |

### 17.2 Critères d'acceptation

Le projet est considéré livré quand :

1. Score Lighthouse mobile ≥ 90 sur toutes les pages principales
2. Score WAVE (accessibilité) : 0 erreurs critiques
3. Validation W3C HTML : 0 erreurs
4. Tests fonctionnels tous passés (tableau ci-dessus)
5. Compatible sur les 5 appareils de test listés
6. Contenu initial saisi dans le CMS et visible sur le site
7. DNS configuré, HTTPS actif, site accessible sur le domaine définitif
8. Accès transmis au client (Vercel, Sanity, repo)

---

## 18. Maintenance & évolutions

### 18.1 Contrat de maintenance recommandé

Une prestation de maintenance est fortement recommandée post-lancement :

**Maintenance corrective** (incluse 3 mois) :
- Correction de bugs remontés par le client
- Mises à jour de sécurité mineures

**Maintenance évolutive** (sur devis) :
- Ajout de nouvelles pages ou sections
- Évolutions du design
- Intégration de nouvelles fonctionnalités (boutique en ligne, réservation, blog)

### 18.2 Hébergement & infrastructure

- **Vercel** : plan Pro recommandé (~20 $/mois) pour les fonctionnalités analytics et bandwidth
- **Sanity** : plan Growth si volume > 10 000 documents (~99 $/mois au-delà du free tier)
- **Nom de domaine** : renouvellement annuel (~15–20 € HT/an)

### 18.3 Évolutions futures envisageables

À terme, les évolutions suivantes pourraient valoriser le site :

- **Boutique en ligne** (bouquets à commander en ligne, livraison) → intégration Shopify ou Stripe
- **Module de réservation** (RDV consultation mariage) → Calendly embed ou solution custom
- **Blog éditorial** → articles SEO sur l'art floral, les tendances, les saisons
- **Version multilingue** (FR/EN) pour clientèle internationale
- **Application mobile PWA** pour les commandes clients réguliers

---

## 19. Budget détaillé

### 19.1 Répartition estimative

| Poste | Fourchette HT | % du budget |
|---|---|---|
| Direction artistique & design UX/UI | 3 500 – 4 500 € | 22 % |
| Développement frontend (Next.js, GSAP, Three.js) | 7 000 – 9 000 € | 47 % |
| Intégration CMS (Sanity) + formulaire | 1 500 – 2 000 € | 11 % |
| SEO technique + performance | 800 – 1 200 € | 6 % |
| Tests, recette, mise en ligne | 600 – 800 € | 4 % |
| Formation client + documentation | 500 – 700 € | 3,5 % |
| Gestion de projet (chef de projet) | 1 000 – 1 500 € | 7 % |
| **TOTAL** | **14 900 – 19 700 €** | **100 %** |

> **Options hors forfait à prévoir séparément** :
> - Shooting photo professionnel : 1 500 – 2 500 €
> - Rédaction de contenu (copywriting) : 800 – 1 500 €
> - Licence GSAP Club : ~150 $/an
> - Vercel Pro (hébergement annuel) : ~240 $/an

### 19.2 Modalités de paiement recommandées

| Étape | Montant |
|---|---|
| Signature du devis (acompte) | 30 % |
| Validation du design haute fidélité | 30 % |
| Livraison environnement de staging | 25 % |
| Mise en production | 15 % |

---

## 20. Glossaire technique

| Terme | Définition |
|---|---|
| **GSAP** | GreenSock Animation Platform — bibliothèque JavaScript d'animation web haute performance |
| **ScrollTrigger** | Plugin GSAP permettant de déclencher et piloter des animations en fonction du scroll |
| **SplitText** | Plugin GSAP permettant de diviser un texte en caractères, mots ou lignes pour les animer individuellement |
| **DrawSVG** | Plugin GSAP pour animer le tracé progressif de chemins SVG |
| **Three.js** | Bibliothèque JavaScript pour créer des scènes 3D WebGL dans le navigateur |
| **WebGL** | API Web permettant le rendu 3D accéléré par GPU dans le navigateur |
| **Lenis** | Bibliothèque de smooth scroll inertiel, compatible avec GSAP ScrollTrigger |
| **Next.js** | Framework React avec rendu hybride (SSG, SSR, ISR) et optimisations intégrées |
| **App Router** | Nouveau système de routing Next.js 13+ basé sur le système de fichiers |
| **Sanity** | CMS headless avec studio personnalisable et API GROQ |
| **GROQ** | Langage de requête de Sanity (Graph-Relational Object Queries) |
| **ISR** | Incremental Static Regeneration — revalidation des pages statiques à intervalle défini |
| **LCP** | Largest Contentful Paint — temps d'affichage du plus grand élément visible |
| **CLS** | Cumulative Layout Shift — mesure des décalages de mise en page inattendus |
| **INP** | Interaction to Next Paint — réactivité aux interactions utilisateur |
| **WCAG** | Web Content Accessibility Guidelines — normes d'accessibilité web |
| **RGAA** | Référentiel Général d'Amélioration de l'Accessibilité (version française du WCAG) |
| **Open Graph** | Protocole de métadonnées pour les aperçus sur les réseaux sociaux |
| **JSON-LD** | Format de données structurées pour le SEO (Schema.org) |
| **Masonry** | Layout en grille avec des éléments de hauteurs variables, comme un mur de briques |
| **GSAP Flip** | Plugin GSAP pour animer des changements de layout de manière fluide |
| **Barba.js** | Bibliothèque de transitions entre pages pour sites multipage |
| **PWA** | Progressive Web App — application web installable avec fonctionnalités natives |
| **CDN** | Content Delivery Network — réseau de distribution de contenu géographiquement distribué |

---

*Document rédigé dans le cadre d'un projet de site vitrine premium pour un fleuriste artisan. Tous les chiffrages sont indicatifs et soumis à validation lors du kick-off. Ce cahier des charges est un document contractuel de référence qui engage les deux parties une fois signé et validé.*

---

**Version** : 1.0 · **Date** : Juin 2026  
**Statut** : À valider par le client avant démarrage du projet
