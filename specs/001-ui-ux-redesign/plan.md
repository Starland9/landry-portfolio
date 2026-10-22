# Implementation Plan: Refonte UI/UX du portfolio

**Branch**: `001-ui-ux-redesign` | **Date**: 2026-10-22 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-ui-ux-redesign/spec.md`

## Summary

Remplacer l'interface actuelle (glassmorphisme, particules, curseur, typewriter, dégradés) par un
site sobre « grille de cas visuels », bilingue FR/EN, clair/sombre, conforme à la maquette validée
(palette Terre). Le site passe sous un segment `[locale]` avec négociation de langue par proxy ;
le contenu migre de `src/lib/constants.ts` vers des fichiers JSON validés au build (un par projet) ;
le formulaire de contact devient réel (Server Action + nodemailer vers le SMTP du propriétaire) ;
toutes les pages sont statiques sauf la liste filtrable des projets. Décisions détaillées :
[research.md](./research.md).

## Technical Context

**Language/Version**: TypeScript 7.0 (strict), Node 24 LTS en production (≥ 22.18 en local)

**Primary Dependencies**: Next.js 16.4 (App Router, proxy, `next/root-params`, `next/font`,
`next/og`), React 19.3, Tailwind CSS 4.3, lucide-react 1.61, **nodemailer 10.2 (ajout)**.
Retirées : framer-motion, class-variance-authority, @tailwindcss/typography,
eslint-config-prettier.

**Storage**: fichiers JSON versionnés dans `src/content/` (aucune base de données) ; préférences
visiteur : cookie `locale`, `localStorage.theme`.

**Testing**: `node --test` natif sur les modules purs (langue, contact, limite de débit, contenu) ;
`pnpm build` (typage strict + validation du contenu) ; Lighthouse et parcours manuels
([quickstart.md](./quickstart.md)).

**Target Platform**: serveur Node.js dans Docker (`output: "standalone"`), navigateurs evergreen,
mobile ≥ 360 px.

**Project Type**: application web Next.js unique (site vitrine + une Server Action + une route API
existante).

**Performance Goals**: Lighthouse mobile ≥ 95 sur les 4 catégories (accueil, projets, étude de
cas, CV, 2 langues) ; contenu principal < 2,5 s en 4G ; CLS ≈ 0 (dimensions d'images connues).

**Constraints**: zéro effet décoratif (constitution II) ; fonctionne sans JS (lecture, navigation,
formulaire) ; WCAG 2.2 AA dans les 2 thèmes ; pas de nouvelle dépendance hors nodemailer.

**Scale/Scope**: 5 types de pages × 2 langues, 17 projets (34 études de cas), ~25 composants,
~17 fichiers de contenu à migrer et traduire.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principe | Vérification | Pré-design | Post-design |
| --- | --- | --- | --- |
| I. Clarté immédiate | Hero avec nom, rôle, 3 actions sans défilement à 360 × 640 (vérifié en maquette) ; `<h1>`/`<title>` uniques ; navigation active ; fil d'Ariane sur les études de cas ; une action primaire par page | ✅ | ✅ [routes.md](./contracts/routes.md), [design-tokens.md](./contracts/design-tokens.md) |
| II. Sobriété | Liste d'interdits reprise dans la spec (FR-031) ; transitions 150 ms limitées à couleur/bordure + flèche ; `prefers-reduced-motion` coupe tout ; framer-motion supprimé | ✅ | ✅ R11 |
| III. Le travail d'abord | Grille de captures réelles ; cadre uniforme 4:3 / 16:9 ; ordre problème → solution → rôle → impact → stack ; chiffres clés uniquement issus des données | ✅ | ✅ [data-model.md](./data-model.md) |
| IV. Accessibilité | Contrastes AA vérifiés dans les 2 thèmes ; focus visible ; clavier ; landmarks ; erreurs de formulaire annoncées ; thème auto + bascule sans flash | ✅ | ✅ R4, [contact-action.md](./contracts/contact-action.md) |
| V. Bilingue, source unique | URL `/fr` `/en` ; messages JSON avec complétude vérifiée par le typage ; contenu JSON `{fr,en}` validé au build ; CV généré depuis les mêmes données | ✅ | ✅ R1, R2 |
| VI. Performance et simplicité | Rendu serveur/statique par défaut ; 6 petits composants client seulement (thème, langue, menu mobile, formulaire, morpion, bouton d'impression) ; `next/image` avec dimensions ; une dépendance ajoutée et justifiée (R6), quatre retirées | ✅ | ✅ |
| Contraintes techniques | Stack inchangée ; Docker conservé ; secrets SMTP/GitHub côté serveur ; formulaire réel avec anti-spam ; API GitHub en cache avec repli | ✅ | ✅ |
| Workflow | spec → plan → tasks → implement ; maquette locale validée (palette Terre) ; tokens centralisés dans `globals.css` | ✅ | ✅ |

Aucune violation : la section Complexity Tracking reste vide.

## Project Structure

### Documentation (this feature)

```text
specs/001-ui-ux-redesign/
├── spec.md
├── plan.md              # ce fichier
├── research.md          # décisions R1–R12 + ajustements complémentaires
├── data-model.md        # schémas JSON du contenu
├── quickstart.md        # exécution + 27 scénarios de validation
├── contracts/
│   ├── routes.md        # URL, redirections, langue, métadonnées
│   ├── contact-action.md
│   ├── api-projects.md
│   └── design-tokens.md # tokens Terre, typo, états des composants
├── mockups/index.html   # maquette validée (référence visuelle)
├── checklists/requirements.md
└── tasks.md             # /speckit-tasks
```

### Source Code (repository root)

```text
src/
├── proxy.ts                        # négociation de langue + cookie `locale`
├── app/
│   ├── global-not-found.tsx        # 404 localisée rendue côté serveur (R13)
│   ├── [locale]/
│   │   ├── layout.tsx              # layout racine : <html lang data-theme>, polices, script thème
│   │   ├── opengraph-image.tsx
│   │   └── (site)/
│   │       ├── layout.tsx          # lien d'évitement, en-tête, <main>, pied
│   │       ├── page.tsx            # Accueil
│   │       ├── not-found.tsx       # navigations côté client
│   │       ├── error.tsx
│   │       ├── about/page.tsx
│   │       ├── cv/page.tsx
│   │       └── work/
│   │           ├── page.tsx        # liste + filtre ?type=
│   │           └── [slug]/
│   │               ├── page.tsx    # étude de cas
│   │               └── opengraph-image.tsx
│   ├── api/projects/route.ts       # conservée, branchée sur l'adaptateur legacy
│   ├── globals.css                 # tokens Terre + @theme inline + base + impression
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/                     # site-header, mobile-nav (client), site-footer, breadcrumbs, skip-link
│   ├── ui/                         # button, image-frame, project-card, section-head, status-badge,
│   │                               # theme-toggle (client), language-switch (client), theme-script
│   ├── home/                       # hero, featured-work, experience-list
│   ├── work/                       # work-filter, project-grid, case-study-header, case-study-sheet, next-project
│   ├── about/                      # github-stats, stack-groups, tic-tac-toe (client, sans framer-motion)
│   ├── contact/                    # contact-section, contact-form (client)
│   ├── cv/                         # cv-document, print-button (client)
│   └── icons/brand-icons.tsx
├── content/
│   ├── projects/
│   │   ├── index.ts                # imports ordonnés des 17 JSON + validation
│   │   └── *.json                  # un fichier par projet
│   ├── schema/                     # project/profile/experience/stack/education/languages .schema.json
│   ├── profile.json  experience.json  stack.json  education.json  languages.json
│   ├── validate.ts                 # validateur maison (erreurs nommant fichier + champ)
│   ├── index.ts                    # API de lecture : getProjects, getProject, getProfile…
│   └── legacy.ts                   # adaptateur pour /api/projects
├── i18n/
│   ├── config.ts                   # locales, isLocale, negotiateLocale (pur, testé)
│   ├── messages/en.json  fr.json
│   └── get-messages.ts             # lit la langue via next/root-params
└── lib/
    ├── contact/                    # validate.ts, rate-limit.ts (purs, testés), mailer.ts (server-only), action.ts ('use server')
    ├── github.ts                   # stats avec revalidate 3600 et repli
    ├── seo.ts                      # metadata, alternates, JSON-LD
    └── utils.ts                    # cn()

tests/                              # *.test.ts exécutés par node --test
```

**Supprimés** : `src/app/{layout,page,loading,error}.tsx`, `src/app/projects/`,
`src/app/api/github/`, `src/components/{animations,sections}/`, `src/components/ui/{glass-*,
custom-cursor,typewriter,project-carousel,project-image,back-to-top,loading,skip-link,
tic-tac-toe}.tsx` (remplacés), `src/hooks/`, `src/lib/{constants,metadata}.ts`, `src/types/`,
`public/{vercel,next,file,globe,window}.svg`, `public/robots.txt`.

**Structure Decision**: application Next.js unique ; le segment `[locale]` porte le layout racine
(recommandation du guide i18n de Next 16) ; contenu séparé du code dans `src/content/` ; logique
pure isolée (`i18n/config.ts`, `lib/contact/{validate,rate-limit}.ts`, `content/validate.ts`) pour
être testable avec `node --test` sans alias de chemins.

## Ordre de réalisation (guide pour /speckit-tasks)

1. **Fondations** : nettoyage des dépendances, scripts, `.env.example`, `.prettierrc` ; tokens et
   base CSS ; polices ; `[locale]` + proxy + messages ; thème sans flash ; layout (en-tête, pied,
   lien d'évitement) ; redirections.
2. **Contenu** : schémas + validateur + migration des 17 projets en JSON (anglais repris tel quel)
   + traduction française + profil/expériences/stack ; adaptateur `/api/projects`.
3. **US1 Accueil** (P1) → **US2 Étude de cas** (P1) → MVP démontrable.
4. **US3 CV**, **US4 Contact**, **US5 Langues** (P2).
5. **US6 Projets**, **US7 À propos**, **US8 Thème** (P3).
6. **Finitions** : SEO (metadata, sitemap, robots, OG, JSON-LD), 404/erreur, suppression de
   l'ancien code, README, docs API, passes accessibilité/performance (quickstart).

## Complexity Tracking

Aucune violation de la constitution à justifier.
