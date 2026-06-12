# Améliorations possibles — vers le niveau Awwwards SOTD / FWA

> Brainstorm sans filtre pour passer du « beau site GSAP » à l'**expérience mémorable**
> niveau Lusion, Active Theory, Obys, Basement Studio, Locomotive.
> Classé par thème. 🌶️ = idée osée. 🔥 = très osée. ⚙️ = gros chantier technique.

---

## 1. Three.js / WebGL — le grand saut

- [x] **Fleur 3D qui éclot en scrollant** : implémentée en **version procédurale** (section « Éclosion » — 3 couronnes de pétales générées en code, pilotées par ScrollTrigger). L'upgrade photoréaliste (Blender → glTF Draco + morph targets) reste possible. ⚙️
- [ ] **Bouquet génératif 3D** : chaque visite génère un bouquet unique (tiges en courbes de Bézier 3D, fleurs instanciées, seed aléatoire) — « votre bouquet du jour », partageable par URL. 🌶️⚙️
- [ ] **Pétales fluides en GPGPU** : remplacer les particules actuelles par une simulation **FBO / compute** (100 000+ pétales) qui réagissent au curseur comme un banc de poissons. ⚙️
- [ ] **Shader de croissance** : des tiges qui *poussent* en temps réel le long du scroll (SDF raymarching ou geometry shader sur splines), avec bourgeons qui s'ouvrent au passage. 🔥⚙️
- [ ] **Effet « eau » sur le hero** : plan WebGL avec ripple shader — le curseur crée des ondulations comme à la surface d'un vase. La photo du bouquet est la texture déformée.
- [ ] **Hover distortion sur toutes les images** : chaque visuel du portfolio est un plane WebGL (curtains.js ou drei `<Image/>`) avec déformation RGB shift / vague au survol et au scroll-velocity.
- [ ] **Transition WebGL entre pages** : au lieu du rideau CSS, un **shader de dissolution** (noise + displacement, façon Lusion) qui « efface » la page comme un pétale qui se désagrège. 🌶️⚙️
- [ ] **Saisons en environnement 3D** : la section horizontale devient une **traversée 3D continue** — caméra qui avance dans un champ stylisé dont la lumière, la végétation et la palette muent printemps → hiver. 🔥⚙️
- [ ] **Atelier en 3D explorable** : scan photogrammétrie (ou scène low-poly stylisée) de l'atelier, navigation au scroll avec points d'intérêt cliquables (l'établi, les seaux, les outils). 🔥⚙️
- [ ] **Vase 3D interactif page contact** : un vase que l'on remplit — chaque champ du formulaire validé ajoute une fleur dedans ; à l'envoi, le bouquet complet « part » en s'envolant. 🌶️
- [ ] **Lumière volumétrique** : god rays traversant la scène hero (postprocessing), comme le soleil du matin dans l'atelier.
- [ ] **Matcap / SSS sur les pétales** : subsurface scattering approximé pour cette translucidité de pétale réel — c'est CE détail qui fait « wow ».
- [ ] **Particules typographiques** : le titre hero se désintègre en particules quand on scrolle, et les particules deviennent… les pétales de la section suivante (continuité magique). 🌶️⚙️

## 2. Scroll experiences & narration

- [ ] **Scrollytelling « la vie d'une fleur »** : page dédiée — de la graine au bouquet en 7 chapitres épinglés, mélange 3D + texte + macro-photos, façon documentaire NYT / Apple AirPods.  🌶️⚙️
- [ ] **Scroll horizontal + vertical mélangés** : des sections qui changent d'axe (vertical → horizontal → vertical) avec une caméra qui « tourne » — désoriente juste ce qu'il faut.
- [ ] **Zoom sémantique** : on scrolle « dans » une photo de bouquet → on entre dans le détail d'une fleur → puis dans la texture d'un pétale (3 niveaux de zoom seamless, images pré-cadrées + scale GSAP). 🌶️
- [ ] **Chapitrage visible** : fine timeline verticale fixe (01 — Manifeste, 02 — Geste…) qui se dessine au fil du scroll, cliquable.
- [x] **Vitesse de scroll = vent** : la vélocité Lenis pilote l'inclinaison des tiges 3D et le skew des typos (effet Obys). Scroll fort = bourrasque.
- [ ] **Section « avant/après »** : slider vertical piloté au scroll : table de mariage vide → dressée et fleurie, en fondu morphing.
- [ ] **Intro cinématique skippable** : 8 secondes de séquence caméra 3D (travelling dans des tiges) avant le hero, avec « Passer l'intro » — assumer le côté film. 🔥
- [ ] **Footer « jardin »** : plus on reste sur le site, plus le footer se remplit de fleurs qui poussent (compteur de temps de session → growth). 🌶️

## 3. Curseur, souris & micro-interactions

- [x] **Curseur traînée de pétales** : le mouvement de souris sème des pétales qui tombent et disparaissent (canvas 2D léger, throttlé).
- [ ] **Curseur-sécateur sur le portfolio** : au survol d'une création, le curseur devient un sécateur stylisé qui se « ferme » au clic. 🌶️
- [x] **Images magnétiques** : les cartes du portfolio se penchent vers le curseur (tilt 3D perspective + glare).
- [ ] **Texte qui fleurit au hover** : chaque lettre des gros titres se remplace par un glyphe floral pendant 200 ms quand on la survole (SplitText chars + swap). 🌶️
- [ ] **Drag-to-explore sur la galerie** : grille infinie draggable en 2D (type Lusion / Unseen) avec inertie WebGL, au lieu de la masonry statique. ⚙️
- [ ] **Boutons « tige »** : le souligné des liens est une petite tige SVG qui pousse avec une feuille au bout (DrawSVG au hover).
- [x] **Confettis botaniques** à l'envoi du formulaire : pluie de pétales physiques (matter.js ou simple GSAP physics) sur tout l'écran.

## 5. Typographie & direction artistique

- [ ] **Titres en font variable animée** : poids/largeur qui respirent au scroll (axe wght piloté par GSAP) — le texte « vit ».
- [ ] **Texte sur chemin courbe** : phrases manifestes qui suivent des courbes de tiges (SVG textPath animé).
- [ ] **Mode nuit « serre de minuit »** : palette inversée vert très sombre + sienne lumineuse, pétales luminescents — pas un dark mode, une **autre ambiance**. 🌶️
- [x] **Grain animé** : le grain papier actuel devient vivant (8 frames de noise en steps(), façon pellicule).
- [x] **Énormes mots défilants** (marquee verticale au scroll) entre sections : « ÉPHÉMÈRE — VIVANT — FAIT MAIN » en Display XL outline.
- [ ] **Lettrines botaniques** : la première lettre de chaque chapitre éditorial est une illustration de lettre fleurie (SVG dédiés).

## 6. Personnalisation & data 🌶️

- [x] **Site qui suit les vraies saisons** : la palette, le hero 3D et les contenus changent automatiquement selon la date réelle (et l'heure : lumière d'aube le matin, dorée le soir). 🔥
- [x] **« Quelle fleur êtes-vous ? »** : mini-quiz poétique de 5 questions → une fleur-portrait générée (art génératif seedé par les réponses) + suggestion de bouquet, partageable. 🌶️
- [ ] **Configurateur de bouquet** : choisir saison, palette, émotion → préviz générative du bouquet (2D ou 3D) envoyée avec la demande de devis. C'est un **outil de vente**, pas un gadget. ⚙️
- [ ] **Compteur « fleurs en boutique aujourd'hui »** : données réelles saisies par le fleuriste le matin dans le CMS — fraîcheur prouvée.
- [ ] **Dédicace florale** : générer une carte virtuelle animée (pétales + message manuscrit via font script) à offrir avec un lien unique. 🌶️

## 7. Contenu & storytelling

- [ ] **Journal de l'atelier** : blog éditorial photo-first (1 entrée/semaine), layout magazine avec mises en page variées — l'arme SEO + retour visiteurs.
- [ ] **Page « Une journée à l'atelier »** : récit heure par heure (5h — le marché de gros, 8h — l'eau fraîche…) scrollytellé avec horloge animée.
- [ ] **Portraits de producteurs** : carte interactive des Monts du Lyonnais avec les fermes partenaires (MapLibre stylisée ivoire + tracés DrawSVG).
- [x] **Herbier numérique** : encyclopédie maison des 140 espèces travaillées, chaque fiche avec illustration générative, saison, parfum, symbolique. Énorme long-tail SEO. ⚙️
- [x] **Langage des fleurs** : module « dites-le en fleurs » — on tape une émotion, le site répond par la fleur qui la symbolise. 🌶️
- [ ] **Vidéos macro en boucle** : remplacer certains visuels par des vidéos 3-4 s (rosée, main qui noue le raphia) — muettes, autoplay, ultra courtes.
- [ ] **Time-lapse d'éclosion** en pleine page entre deux sections.

## 8. Transitions & navigation avancées

- [ ] **Transitions contextuelles** : l'image cliquée dans le portfolio **devient** le hero de la page projet (GSAP Flip entre routes + View Transitions API) — la signature des meilleurs sites. ⚙️
- [ ] **Menu plein écran « jardin »** : chaque item du menu est entouré de tiges qui poussent à l'ouverture ; le fond est une scène 3D floue du hero en pause. 🌶️
- [ ] **Préchargement prédictif** : précharger la page au survol du lien (hover intent) → navigation perçue instantanée.
- [ ] **Historique « bouquet de visite »** : les pages visitées s'accumulent en petites fleurs dans un coin — cliquer dessus = revenir. Navigation poétique. 🔥
- [x] **Barre de progression florale** : une tige qui pousse le long du viewport indique la progression de lecture de chaque page.

## 9. Mobile-spécifique

- [x] **Gyroscope** : sur mobile, les pétales 3D réagissent à l'inclinaison du téléphone (DeviceOrientation, avec permission iOS propre). 🌶️
- [ ] **Swipe storytelling** : sur mobile, la home devient des « chapitres » full-screen swipables verticalement avec snap, façon stories — assumé, pas un fallback dégradé.
- [ ] **Haptique** : micro-vibrations (navigator.vibrate) aux moments clés sur Android.
- [x] **PWA** : installable, offline pour les pages éditoriales, splash screen brandé.

## 10. Technique & craft (ce qui se voit dans les coulisses)

- [ ] **Passage à @gsap/react `useGSAP()`** : remplacer le hook maison.
- [ ] **View Transitions API** en progressive enhancement par-dessus le rideau.
- [ ] **Vraies photos** : intégrer le shooting (CDC §5.5) — AVIF, `next/image`, blur placeholders générés ; les FloralArt deviennent les fallbacks.
- [ ] **Sanity branché** pour de vrai + preview drafts + ISR.
- [ ] **Storybook** des composants UI + tests Playwright des parcours critiques (formulaire, filtres, transitions).
- [ ] **Lighthouse CI** en GitHub Action avec budget perf bloquant (LCP < 2 s même avec la 3D).
- [ ] **Qualité adaptative WebGL** : détection GPU (detect-gpu) → 3 presets (full / medium / static) au lieu du simple on/off actuel.
- [ ] **Page `/lab`** 🔥 : assumée expérimentale, où vivent les démos shaders les plus folles — c'est ce que les jurys Awwwards adorent.
- [x] **Console easter egg** : un bouquet en ASCII art + lien « on recrute des mains vertes » dans la console dev. 🌶️
- [x] **Konami code** : ↑↑↓↓←→←→ … et il pleut 2 000 pétales. 🌶️

## 11. Conversion & business (le « pourquoi » de tout ça)

- [ ] **Prise de RDV consultation mariage** : Cal.com embarqué stylisé — le lead chaud ne retombe jamais.
- [ ] **Plaquette mariage téléchargeable** contre e-mail (PDF designé) — capture de leads qualifiés.
- [ ] **Preuve sociale dynamique** : « 3 demandes de mariage cette semaine » (réel, depuis l'API contact).
- [ ] **Espace presse** : kit média, photos HD, logos — facilite les retombées visées par le CDC.
- [ ] **Click & collect simple** : 3 bouquets signature commandables (Stripe Payment Links, zéro back-office) — tester l'e-commerce sans le construire. 🌶️
- [ ] **Page B2B dédiée** : abonnements floraux entreprises avec simulateur de budget interactif.

---

## Par où commencer (mon top 5 impact/effort)

1. **Transitions contextuelles Flip portfolio → projet** — la signature « site de luxe » la plus rentable.
2. **Hover distortion WebGL sur les images** — transforme instantanément la perception du site.
3. **Site qui suit les vraies saisons** — l'idée la plus *storytelling* : le site est vivant, comme les fleurs.
4. **Fleur 3D qui éclot au scroll dans le hero** — le moment « truc de dingue » à montrer.
5. **Sound design opt-in** — quasiment personne ne le fait bien ; différenciation immédiate.

> Règle d'or pour tout ce qui précède : chaque effet doit **raconter le végétal**
> (pousser, éclore, faner, onduler). Un effet impressionnant mais hors-sujet = à jeter.
> Et toujours : fallback propre, `prefers-reduced-motion`, 60 fps ou rien.
