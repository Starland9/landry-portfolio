# Data Model: Refonte UI/UX du portfolio

**Feature**: [spec.md](./spec.md) · **Research**: [research.md](./research.md) (R2, R3)

Tout le contenu vit dans `src/content/` sous forme de fichiers JSON validés au build. Les textes
affichés existent en français et en anglais.

## Conventions

- **Localized\<T\>** : `{ "fr": T, "en": T }`. Les deux clés sont obligatoires ; une chaîne vide
  ou une liste vide est une erreur, sauf mention contraire.
- **URL** : chaîne commençant par `https://`.
- **Chemin d'image** : chaîne commençant par `/images/` (fichier dans `public/`).
- Chaque fichier JSON peut contenir `"$schema"` (ignoré par le validateur, utilisé par l'éditeur).
- Erreur de validation = exception au chargement, message `content/<fichier>: <champ> — <raison>`,
  build en échec.

## Project — `src/content/projects/<slug>.json`

| Champ | Type | Obligatoire | Règles |
| --- | --- | --- | --- |
| `slug` | string | oui | `^[a-z0-9]+(-[a-z0-9]+)*$`, unique, égal au nom du fichier, utilisé dans `/work/<slug>` |
| `title` | string | oui | Nom propre, non traduit |
| `type` | `"web" \| "mobile" \| "other"` | oui | Sert au filtre de `/work` |
| `year` | integer | oui | 2015 ≤ year ≤ année courante + 1 ; tri décroissant |
| `featured` | boolean | oui | Exactement 6 projets `true` (FR-008) |
| `status` | `"live" \| "in-production" \| "pilot" \| "ongoing" \| "maintained"` | oui | Libellé traduit dans les messages |
| `duration` | Localized\<string\> | non | ex. « 4 semaines » / « 4 weeks » |
| `team` | Localized\<string\> | oui | ex. « Projet solo » / « Solo project » |
| `headline` | Localized\<string\> | oui | Accroche ≤ 140 caractères (cartes, en-tête, meta description) |
| `description` | Localized\<string\> | oui | Paragraphe de présentation |
| `summary` | Localized\<string\> | oui | Synthèse (API, recherche) |
| `problem` | Localized\<string\> | oui | Section 01 |
| `solution` | Localized\<string\> | oui | Section 02 |
| `role` | Localized\<string[]\> | oui | Section 03, ≥ 1 élément par langue |
| `impact` | Localized\<string[]\> | oui | Section 04, ≥ 1 élément par langue |
| `features` | Localized\<string[]\> | oui | Section 05, ≥ 1 élément par langue |
| `technologies` | string[] | oui | ≥ 1, section 06 « Stack » |
| `image` | Image | oui | Voir ci-dessous |
| `links` | Links | oui | Voir ci-dessous |
| `highlights` | Highlight[] | non | 0 à 3 chiffres clés vérifiables (tête d'étude de cas) |

**Image** : `{ "src": chemin, "width": int > 0, "height": int > 0, "alt": Localized<string> }`.
Les dimensions sont celles du fichier (évitent tout décalage de mise en page, permettent de ne
jamais agrandir une petite image au-delà de sa taille native).

**Links** : `{ "live": URL | null, "store": URL | null, "code": URL | null }`. Un lien Google
Play / App Store va dans `store`. Un lien `null` n'est jamais affiché (FR-014).

**Highlight** : `{ "value": Localized<string>, "label": Localized<string> }` (ex. « 9 000+ » /
« tests automatisés… »).

**Dérivés (calculés, non stockés)** : ordre de `/work` (année décroissante puis ordre d'index) ;
projet suivant (élément suivant dans cet ordre, bouclage) ; nombre total de projets ; année du
premier projet (« depuis 2020 ») ; libellé de la carte (`Play Store` si `links.store`, sinon
libellé du statut).

### Fichiers à créer (migration depuis `src/lib/constants.ts`)

| Fichier | Phare | Type | Année | Statut | Liens |
| --- | --- | --- | --- | --- | --- |
| `secret.json` | oui (1) | mobile | 2026 | live | store |
| `g-buy-web.json` | oui (2) | web | 2026 | in-production | live |
| `kweekk.json` | oui (3) | mobile | 2022 | live | store |
| `isyjob.json` | oui (4) | mobile | 2021 | in-production | store |
| `gestion-stock-entrepot.json` | oui (5) | web | 2026 | in-production | live |
| `2ln-learning-institute.json` | oui (6) | web | 2026 | live | live |
| `fais-mon-cv.json` | non | web | 2024 | in-production | live |
| `open-whatsapp-bot.json` | non | other | 2025 | maintained | code |
| `flyers-maker.json` | non | web | 2025 | live | live |
| `njangiflow.json` | non | web | 2023 | pilot | live |
| `tchokos.json` | non | web | 2022 | in-production | live |
| `2ln-ai.json` | non | mobile | 2024 | in-production | store |
| `omoh.json` | non | mobile | 2021 | live | store |
| `mbolo-gabon.json` | non | mobile | 2020 | in-production | store |
| `kamte.json` | non | mobile | 2020 | in-production | store |
| `landflix.json` | non | mobile | 2025 | in-production | live + code |
| `social-dl.json` | non | web | 2025 | in-production | live + code |

Les liens Play Store actuels portent un paramètre de suivi `&pcampaignid=web_share`, retiré à la
migration.

## Profile — `src/content/profile.json`

| Champ | Type | Règles |
| --- | --- | --- |
| `fullName` | string | « Landry Simo » |
| `handle` | string | « Starland9 » |
| `role` | Localized\<string\> | « Ingénieur logiciel, web & mobile. » |
| `lead` | Localized\<string\> | Phrase d'accroche du hero |
| `bio` | Localized\<string\> | Texte de présentation (À propos, CV) |
| `freelanceNote` | Localized\<string\> | Mention freelance secondaire (FR-007) |
| `location` | Localized\<string\> | « Douala, Cameroun » |
| `timezone` | string | « UTC+1 » |
| `yearsOfExperience` | integer | Affiché « 4+ » |
| `availability` | `{ "open": boolean, "label": Localized<string> }` | Badge du hero |
| `email` | string | Adresse publique et destinataire par défaut du formulaire |
| `social` | `{ "github": URL, "linkedin": URL, "x": URL }` | |
| `photo` | Image \| null | `null` tant que la photo n'est pas fournie (FR-009) |
| `siteUrl` | URL | `https://portfolio.starland9.dev` |

## Experience — `src/content/experience.json`

Liste ordonnée (plus récent d'abord) de :
`{ "company": Localized<string>, "role": Localized<string>, "start": int (année), "end": int | null, "highlights": Localized<string[]> }`.
`end: null` = « aujourd'hui ».

## Stack — `src/content/stack.json`

Liste de groupes : `{ "id": string, "label": Localized<string>, "items": string[] }`. Groupes
issus de `SKILL_CATEGORIES` (Core, Backend & infrastructure, Mobile, Web, Bases de données, Autres).
Le hero affiche la « stack principale » : `Flutter · Django · Next.js` (champ
`profile`-dérivé du premier groupe, 3 premiers éléments).

## Education — `src/content/education.json`

Liste de `{ "title": Localized<string>, "school": string, "start": int | null, "end": int | null }`.
**Vide au départ** (données à fournir par Landry) ; la rubrique est masquée si la liste est vide.

## Spoken language — `src/content/languages.json`

Liste de `{ "language": Localized<string>, "level": Localized<string> }`. **Vide au départ** ;
rubrique masquée si vide.

## UI messages — `src/i18n/messages/{en,fr}.json`

Arborescence de chaînes (navigation, titres de sections, boutons, libellés de statut et de type,
messages du formulaire, métadonnées par page). `en.json` fait référence ; `fr.json` est vérifié
par le typage (`const fr: typeof en`) : clé manquante = erreur de compilation.

## Contact message (transitoire, non stocké)

| Champ | Type | Règles |
| --- | --- | --- |
| `name` | string | 2–100 caractères après `trim`, retours à la ligne interdits |
| `email` | string | Format e-mail, ≤ 254 caractères |
| `reason` | `"job" \| "freelance" \| "other"` | Défaut `job` |
| `message` | string | 10–5000 caractères après `trim` |
| `locale` | `"fr" \| "en"` | Champ caché, langue de la page |
| `website` | string | Champ piège : doit être vide |
| `startedAt` | int (ms) | Champ caché ; soumission < 3 s = robot |

États de l'action : `idle` → `success` | `invalid` (erreurs par champ) | `rate-limited` |
`error` (échec d'envoi). Détails : [contracts/contact-action.md](./contracts/contact-action.md).

## GitHub stats (lecture seule, cache 1 h)

`{ "publicRepos": int, "followers": int, "memberSince": int (année), "fetchedAt": ISO }` ou
`null` si indisponible.

## Visitor preferences (navigateur uniquement)

| Préférence | Stockage | Valeurs |
| --- | --- | --- |
| Langue | cookie `locale` (1 an, `SameSite=Lax`, posé par le proxy) | `fr`, `en` |
| Thème | `localStorage.theme` | absent (= système), `light`, `dark` |
