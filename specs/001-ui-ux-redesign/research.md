# Research: Refonte UI/UX du portfolio

**Feature**: [spec.md](./spec.md) · **Plan**: [plan.md](./plan.md) · **Date**: 2026-10-22

Sources vérifiées : documentation Next.js 16.4.2 livrée dans `node_modules/next/dist/docs/`
(guides `internationalization`, `preventing-flash-before-hydration`, `forms`,
`caching-without-cache-components`, `self-hosting`, référence `proxy` et `next/root-params`),
registre npm (nodemailer), base de données du skill ui-ux-pro-max, maquette validée
[`mockups/index.html`](./mockups/index.html).

---

## R1 — Routage bilingue

**Decision** : i18n natif. Tout le site vit sous `src/app/[locale]/` (`locale` ∈ `fr`, `en`),
`[locale]/layout.tsx` est le layout racine (`<html lang>`). Un `src/proxy.ts` (nouveau nom de
`middleware` en Next 16, runtime Node.js) redirige toute URL sans préfixe vers la bonne langue.
La langue courante est lue côté serveur via `next/root-params` (`import { locale } from
'next/root-params'`, disponible depuis 16.3) pour éviter de la passer en props partout.

Négociation (ordre) : cookie `locale` → en-tête `Accept-Language` (analyse maison des valeurs `q`,
premier code `fr*` ou `en*`) → `en`. Le proxy pose le cookie `locale` à chaque navigation sur une
URL préfixée dont la langue diffère du cookie : la dernière langue consultée est retenue, même sans
JavaScript (FR-026, US5-4).

**Rationale** : 2 langues, aucune pluralisation complexe, contenu statique → une bibliothèque
n'apporterait rien d'indispensable. Le guide officiel décrit exactement ce montage.

**Alternatives considered** : `next-intl` (complet mais dépendance + configuration, inutile ici) ;
`@formatjs/intl-localematcher` + `negotiator` (2 dépendances pour 15 lignes de code) ; langue par
cookie sans préfixe d'URL (contraire à FR-025 et mauvais pour le référencement).

**Contraintes notées** : `next/root-params` n'est pas utilisable dans les Server Actions ni les
Route Handlers → l'action de contact reçoit la langue dans un champ caché.

## R2 — Contenu : un fichier JSON par projet

**Decision** (demande du propriétaire) : le contenu sort de `src/lib/constants.ts` vers
`src/content/` :

- `src/content/projects/<slug>.json` — un fichier par projet (17 fichiers) ;
- `src/content/profile.json`, `experience.json`, `stack.json`, `education.json`,
  `languages.json` ;
- `src/content/schema/*.schema.json` — schémas JSON référencés par `$schema` dans chaque fichier,
  pour l'autocomplétion et la validation dans l'éditeur ;
- `src/content/projects/index.ts` — liste ordonnée des imports (l'ordre = ordre d'affichage des
  projets phares) ;
- `src/content/validate.ts` — validateur maison exécuté au chargement : un champ manquant, un type
  invalide ou une traduction absente lève une erreur qui nomme le fichier et le champ, et fait
  échouer `next build`.

Les textes traduisibles sont des objets `{ "fr": ..., "en": ... }`. Les textes d'interface
(boutons, titres de sections, messages) vivent dans `src/i18n/messages/fr.json` et `en.json` ; la
complétude est garantie par le typage : `const fr: typeof en = frJson` échoue à la compilation si
une clé manque (FR-028, SC-007).

**Rationale** : un fichier par projet est plus lisible, se relit et se traduit isolément, et
produit des diffs propres. Les imports statiques (et non `fs.readdir`) garantissent que les données
sont embarquées dans le bundle, y compris dans l'image Docker `standalone` où `src/` n'existe pas.

**Alternatives considered** : lecture du dossier avec `fs` (fragile en `output: standalone`) ;
MDX par projet (puissant mais plus lourd, et le contenu est structuré, pas rédactionnel) ; `zod`
pour la validation (dépendance de ~60 ko pour un besoin couvert par 80 lignes) ; TypeScript
(`.ts`) au lieu de JSON (typage gratuit, mais le propriétaire veut du JSON).

**Garde-fou** : un test vérifie que chaque `*.json` du dossier `projects/` est bien importé dans
`index.ts` (pas de projet oublié).

## R3 — Modèle de projet normalisé

**Decision** : les champs libres actuels sont normalisés pendant la migration :
`timeline: "2026 · 4 weeks"` → `year: 2026` + `duration: {fr,en}` ; `status` texte → énumération
`live | in-production | pilot | ongoing | maintained` (libellés dans les messages) ;
`category: "web" | "mobile" | "Bot"` → `type: "web" | "mobile" | "other"` ; `liveUrl/githubUrl` →
`links: { live, store, code }` (un lien Play Store va dans `store`) ; image → `{ src, width,
height, alt: {fr,en} }` ; le champ `color` (dégradé) est supprimé (constitution II) ; ajout
optionnel de `highlights` (chiffres clés vérifiables, affichés en tête d'étude de cas).

**Rationale** : tri par année, filtres, libellés traduits et images sans décalage de mise en page
deviennent triviaux et vérifiables.

## R4 — Thème clair/sombre sans flash

**Decision** : `<html data-theme="auto" suppressHydrationWarning>` rendu par le serveur ; script
inline dans `<head>` (technique du guide officiel « Preventing flash before hydration ») qui lit
`localStorage.theme` (`light` | `dark`) et pose l'attribut avant le premier rendu. Les tokens CSS
dépendent de `[data-theme]` et, pour `auto`, de `@media (prefers-color-scheme)`. Sans JavaScript,
le thème suit donc le système. Le bouton de bascule est un petit composant client.

**Rationale** : zéro dépendance, pas de flash, page toujours pré-rendue statiquement (pas de
lecture de cookie côté serveur).

**Alternatives considered** : `next-themes` (dépendance pour ~30 lignes) ; cookie lu côté serveur
(rend tout le site dynamique).

## R5 — Design system

**Decision** : ui-ux-pro-max a confirmé le style « Minimalism & Swiss » et le motif
« Portfolio Grid » (hero → grille de projets → à propos → contact, fond neutre, accent minimal).
Ses autres suggestions ont été écartées car contraires à la constitution : motif « Scroll-Triggered
Storytelling », animation d'apparition au scroll (GSAP), palette rose/cyan, et Inter + bleu (trop
générique). Palette **Terre** retenue par le propriétaire ; typographie **Instrument Sans**
(texte, variable 400–700, latin-ext) + **JetBrains Mono** (métadonnées) via `next/font/google`
(auto-hébergées au build). Tokens et règles : [contracts/design-tokens.md](./contracts/design-tokens.md).
Contrastes vérifiés : tous les couples texte ≥ 4.5:1, bordures de champs et focus ≥ 3:1, dans les
deux thèmes.

**Tailwind 4** : les tokens sont des variables CSS exposées via `@theme inline`
(`bg-bg`, `text-fg`, `text-muted`, `border-border`, `bg-frame`, `text-accent`…). Les composants
n'utilisent jamais de couleur brute.

**Icônes** : `lucide-react` conservé (déjà présent, style trait homogène) ; logos de marques en SVG
local (`brand-icons.tsx`). Phosphor, suggéré par le skill, n'apporte rien qui justifie une
dépendance de plus.

## R6 — Formulaire de contact

**Decision** : Server Action `sendContactMessage(prevState, formData)` + composant client
`useActionState` (validation, état d'envoi, messages) ; le formulaire fonctionne aussi sans
JavaScript (amélioration progressive native de React 19). Envoi par **nodemailer 10.2.1** (zéro
dépendance, types inclus, licence MIT-0, Node ≥ 20) vers le SMTP personnel, configuré par
variables d'environnement. En développement sans SMTP configuré : transport JSON de nodemailer
(le message est affiché dans la console, rien n'est envoyé).

Anti-spam, sans service tiers :
1. champ piège `website` (masqué, hors tabulation) → rejet silencieux, réponse « succès » ;
2. horodatage caché : soumission en moins de 3 s → rejet silencieux ;
3. limite de débit en mémoire : 5 envois par heure et par IP (`x-forwarded-for` premier saut,
   sinon `x-real-ip`) ;
4. déduplication : même e-mail + même message dans les 60 s → un seul envoi (double clic, double
   soumission sans JS).

Validation : fonction pure partagée client/serveur (nom 2–100 caractères, e-mail valide ≤ 254,
motif ∈ `job | freelance | other`, message 10–5000 caractères) ; attributs HTML natifs
(`required`, `type=email`, `minLength`, `maxLength`) en premier filet.

**Rationale** : le propriétaire a choisi son SMTP ; nodemailer est la référence, sans dépendance
transitive. Les protections couvrent le spam courant d'un portfolio sans captcha (qui nuirait à
l'accessibilité).

**Alternatives considered** : Resend / Formspree (écartés par le propriétaire) ; `zod`
(dépendance inutile) ; reCAPTCHA / Turnstile (tiers, traçage, friction).

**Limite connue** : la limite de débit en mémoire vaut pour une seule instance (cas actuel :
un conteneur Docker). Documentée dans `quickstart.md`.

## R7 — Statistiques GitHub

**Decision** : récupération côté serveur dans la page À propos,
`fetch('https://api.github.com/users/Starland9', { next: { revalidate: 3600 } })`, en-tête
`Authorization` si `GITHUB_TOKEN` est défini. Données affichées : dépôts publics, abonnés,
ancienneté du compte. En cas d'échec : le bloc affiche un message discret et un lien vers le
profil ; le reste de la page n'est pas affecté. Les routes `/api/github/*` et le hook client
`use-github-data` sont supprimés (seuls consommateurs : les anciens composants).

**Rationale** : modèle de cache « classique » de Next 16 (pas besoin d'activer Cache
Components) ; la page reste statique et se régénère au plus toutes les heures (FR-017).

## R8 — Redirections des anciennes URL

**Decision** : `next.config.ts` `redirects()` : `/projects` → `/work` et `/projects/:slug` →
`/work/:slug`, **permanentes (308)** ; puis le proxy ajoute la langue (307). Ordre d'exécution
Next : redirections de config avant le proxy. Les identifiants de projets actuels deviennent les
slugs (aucune table de correspondance).

**Rationale** : le déplacement `/projects → /work` est permanent et indépendant de la langue ; le
choix de la langue est une négociation, donc temporaire. Chaque code HTTP dit la vérité.

## R9 — Référencement et partage

**Decision** : `generateMetadata` par page avec `alternates.canonical` et
`alternates.languages` (`fr`, `en`, `x-default` → `/`) ; `src/app/sitemap.ts` (toutes les pages ×
2 langues, avec alternates) et `src/app/robots.ts` (remplacent `public/robots.txt`) ; images Open
Graph générées par `next/og` (`opengraph-image.tsx`) pour le site et pour chaque étude de cas ;
JSON-LD `Person` sur l'accueil et À propos.

## R10 — Pages et rendu

**Decision** : toutes les pages sont pré-rendues statiquement (`generateStaticParams` pour
`locale` et `slug`, `dynamicParams = false`), sauf `/[locale]/work` qui lit `searchParams.type`
(filtre partageable par URL, fonctionne sans JS) et est rendue côté serveur à la demande. La page
CV est une page HTML avec feuille de style d'impression (`@page A4`, thème clair forcé, en-tête,
pied et boutons masqués) et un bouton client « Imprimer / Enregistrer en PDF » (`window.print()`).

## R11 — Mouvement et nettoyage

**Decision** : transitions CSS uniquement (couleur, bordure, décalage de 3 px d'une flèche au
survol), 150 ms, coupées par `prefers-reduced-motion`. Suppression de `framer-motion` (le morpion
est réécrit sans), des particules, du curseur, du typewriter, des composants « glass », des
transitions de page, du carrousel et du bouton « retour en haut » flottant. Dépendances retirées :
`framer-motion`, `class-variance-authority`, `@tailwindcss/typography`, `eslint-config-prettier`
(aucun usage). Ajoutée : `nodemailer`.

## R12 — Vérifications automatisées

**Decision** : pas de framework de test ajouté. `node --test` (natif, Node ≥ 22.18 exécute le
TypeScript sans option) couvre les fonctions pures : négociation de langue, validation du contact,
limite de débit, validation du contenu, présence de chaque JSON dans l'index. `pnpm build`
garantit le typage strict et la complétude des traductions. Accessibilité et performance :
Lighthouse via `pnpm dlx lighthouse` et parcours manuel décrit dans [quickstart.md](./quickstart.md).

**Alternatives considered** : Vitest + Testing Library (dépendances lourdes pour 5 modules
purs) ; Playwright + axe (pertinent plus tard, hors périmètre de ce chantier).

## Ajustements complémentaires retenus (hors demande initiale)

| Ajustement | Pourquoi |
| --- | --- |
| `sitemap.xml` et `robots` générés | `robots.txt` pointe vers un sitemap inexistant |
| Images Open Graph générées | `og-image.jpg` référencé mais absent |
| Image 2LN rapatriée dans `public/images/projects/` | Elle est chargée depuis le site du client et casserait s'il la déplace |
| Suppression des SVG par défaut de Next dans `public/` | Inutilisés |
| README réécrit | Il annonce des fonctionnalités et scores qui ne sont pas vrais (glassmorphisme, Lighthouse 100) |
| `.env.example` | Variables SMTP et GitHub documentées |
| Scripts `typecheck`, `test`, `format` + `.prettierrc` | Le plugin Prettier Tailwind est installé mais jamais configuré |
| `docs/API_PROJECTS.md` mis à jour | Valeur `other` du type, nouveaux champs |
