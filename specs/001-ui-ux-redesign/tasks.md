---

description: "Tasks for the portfolio UI/UX redesign"
---

# Tasks: Refonte UI/UX du portfolio

**Input**: Design documents from `specs/001-ui-ux-redesign/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md),
[data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md),
visual reference [mockups/index.html](./mockups/index.html) (palette Terre)

**Tests**: limited to pure modules, as decided in research R12 (`node --test`, files in `tests/`).
UI is verified with the scenarios of quickstart.md.

**Organization**: grouped by user story (US1–US8 from spec.md) so each story is an independently
testable increment.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: can run in parallel (different files, no dependency on an unfinished task)
- **[Story]**: user story the task belongs to (US1…US8)
- Paths are relative to the repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: clear the old UI, align dependencies and tooling with the plan.

- [X] T001 Delete the legacy UI: `src/components/animations/`, `src/components/sections/`, `src/components/ui/` (all files), `src/hooks/`, `src/types/`, `src/app/projects/`, `src/app/api/github/`, `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/loading.tsx`, `src/app/error.tsx`, `src/lib/metadata.ts`, `public/{vercel,next,file,globe,window}.svg`, `public/robots.txt` (keep `src/lib/constants.ts` until T022 and `src/lib/utils.ts`)
- [X] T002 Update `package.json` dependencies: remove `framer-motion`, `class-variance-authority`, `@tailwindcss/typography`, `eslint-config-prettier`; add `nodemailer@^10.2.1` (ships its own types); refresh `pnpm-lock.yaml` with pnpm
- [X] T003 [P] Add scripts to `package.json`: `"typecheck": "tsc --noEmit"`, `"test": "node --test tests/"`, `"format": "prettier --write ."`; create `.prettierrc` enabling `prettier-plugin-tailwindcss` with `tailwindStylesheet: "./src/app/globals.css"`
- [X] T004 [P] Create `.env.example` listing `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO`, `CONTACT_FROM`, `GITHUB_TOKEN` with comments from contracts/contact-action.md
- [X] T005 [P] Set `"target": "ES2022"` in `tsconfig.json` and add `tests/**/*.ts` to `include`
- [X] T006 [P] Download `https://2lnlearninginstitute.com/home/approche-pedagogique.webp` to `public/images/projects/2ln-learning-institute.webp`, record its width/height, and remove `images.remotePatterns` from `next.config.ts`
- [X] T007 Add `redirects()` to `next.config.ts`: `/projects` → `/work` and `/projects/:slug` → `/work/:slug`, `permanent: true` (308), per contracts/routes.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: localized routing, content layer, design tokens and page shell. Every story depends on it.

**⚠️ CRITICAL**: no user story work before this phase is complete.

### Localization

- [X] T008 [P] Create `src/i18n/config.ts`: `locales = ["fr", "en"] as const`, `defaultLocale = "en"`, `isLocale()`, and pure `negotiateLocale(cookieValue, acceptLanguageHeader)` (valid cookie → first `fr*`/`en*` tag by descending `q` → `"en"`); no path aliases (tested by node)
- [X] T009 [P] Write `tests/i18n-config.test.ts` covering cookie priority, `q` ordering (`"de,en;q=0.5,fr;q=0.9"` → `fr`), regional tags (`fr-CA` → `fr`), unsupported → `en`, malformed header
- [X] T010 Create `src/proxy.ts` (exported `proxy` function + `config.matcher` excluding `_next`, `api` and paths with a file extension): unprefixed path → `307` to `/{locale}{path}{search}`; prefixed path → pass through and set cookie `locale` (`Path=/; Max-Age=31536000; SameSite=Lax`) when absent or different (contracts/routes.md)
- [X] T011 [P] Create `src/i18n/messages/en.json` with every UI string: navigation, skip link, section titles, buttons, status labels (`live`, `in-production`, `pilot`, `ongoing`, `maintained`), type labels (`web`, `mobile`, `other`), contact form labels/errors/states (verbatim from contracts/contact-action.md), case-study section titles, CV labels, 404/error texts, per-page metadata (title, description)
- [X] T012 [P] Create `src/i18n/messages/fr.json` with the same keys, French wording from the mockup and contracts
- [X] T013 Create `src/i18n/get-messages.ts`: reads the locale with `import { locale } from "next/root-params"`, returns the messages; declare `const fr: typeof en = frJson` so a missing French key fails `tsc`; export `getLocale()` helper

### Content layer

- [X] T014 [P] Create `src/content/types.ts`: `Locale`, `Localized<T> = { fr: T; en: T }`, `Project`, `ProjectType = "web" | "mobile" | "other"`, `ProjectStatus = "live" | "in-production" | "pilot" | "ongoing" | "maintained"`, `ImageAsset`, `Links`, `Highlight`, `Profile`, `Experience`, `StackGroup`, `Education`, `SpokenLanguage` (fields exactly as data-model.md)
- [X] T015 Create `src/content/validate.ts` (pure, no aliases): validators that throw `content/<file>: <field> — <reason>`; enforce verbatim rules: slug `^[a-z0-9]+(-[a-z0-9]+)*$` "unique, égal au nom du fichier"; `type` ∈ `web|mobile|other`; "2015 ≤ year ≤ année courante + 1"; `status` enum; `headline` "Accroche ≤ 140 caractères"; `role`/`impact`/`features` "≥ 1 élément par langue"; `technologies` "≥ 1"; image `src` starts with `/images/`, "width: int > 0, height: int > 0", `alt` localized; links are `https://` URL or `null`; `highlights` "0 à 3"; every Localized has non-empty `fr` and `en`; ignore `$schema`
- [X] T016 [P] Create JSON Schemas in `src/content/schema/` (`project.schema.json`, `profile.schema.json`, `experience.schema.json`, `stack.schema.json`, `education.schema.json`, `languages.schema.json`) mirroring data-model.md, for editor autocompletion via `"$schema"`
- [X] T017 [P] Write `tests/content.test.ts`: validator accepts a valid project and rejects missing `headline.fr`, bad slug, empty `role.en`, 4 highlights; every `src/content/projects/*.json` is imported in `src/content/projects/index.ts`; exactly 6 projects have `featured: true`; file name equals slug
- [X] T018 [P] Create `src/content/profile.json` (fields of data-model.md "Profile"; `photo: null`; `yearsOfExperience: 4`; availability open "Disponible pour un nouveau poste" / "Open to new roles"; lead, role, freelance note from the mockup), `experience.json` (OVVP Corp 2024–present, Freelance 2021–present, highlights in fr/en), `stack.json` (groups from `SKILL_CATEGORIES` in `src/lib/constants.ts`, labels in fr/en), `education.json` (`[]`), `languages.json` (`[]`)
- [X] T019 [P] Migrate the 6 featured projects from `src/lib/constants.ts` into `src/content/projects/{secret,g-buy-web,kweekk,isyjob,gestion-stock-entrepot,2ln-learning-institute}.json`: English text copied verbatim, French translation written for every Localized field, `timeline` split into `year` + `duration`, status mapped to the enum, `liveUrl`/`githubUrl` mapped to `links` (Play Store → `store`, strip `&pcampaignid=web_share`), image `{src,width,height,alt}` (dimensions from the files; 2LN from T006), `color` dropped; add `highlights` for Secret (9 000+ tests, 4 semaines, 30+ jeux)
- [X] T020 [P] Migrate the 11 other projects the same way into `src/content/projects/{fais-mon-cv,open-whatsapp-bot,flyers-maker,njangiflow,tchokos,2ln-ai,omoh,mbolo-gabon,kamte,landflix,social-dl}.json` (`Bot` → `type: "other"`)
- [X] T021 Create `src/content/projects/index.ts` (ordered static imports, featured first in the order of data-model.md, validation at module load) and `src/content/index.ts` exposing `getProfile()`, `getProjects()` (year desc, then index order), `getFeaturedProjects()`, `getProject(slug)`, `getNextProject(slug)` (wraps), `getExperience()`, `getStack()`, `getEducation()`, `getSpokenLanguages()`, `projectCount()`, `firstProjectYear()`, and `t(localized, locale)`
- [X] T022 Create `src/content/legacy.ts` (English adapter per contracts/api-projects.md), switch `src/app/api/projects/route.ts` to it, then delete `src/lib/constants.ts`

### Design tokens and shell

- [X] T023 Rewrite `src/app/globals.css`: `@import "tailwindcss"`; Terre tokens for `html[data-theme="light"]`, `html[data-theme="dark"]`, and `html[data-theme="auto"]` with `prefers-color-scheme` (values from contracts/design-tokens.md); `@theme inline` mapping (`--color-bg`, `--color-surface`, `--color-frame`, `--color-fg`, `--color-muted`, `--color-border`, `--color-border-strong`, `--color-accent`, `--color-accent-hover`, `--color-on-accent`, `--color-ok`, `--color-err`, fonts, type scale, radii); base styles (body, links, `:focus-visible` 2 px accent offset 3 px, `::selection`, `[id]{scroll-margin-top:80px}`, `text-wrap`), `@media (prefers-reduced-motion: reduce)` disabling all transitions, no shadows, no gradients
- [X] T024 [P] Create primitives in `src/components/ui/`: `button.tsx` (primary/secondary link-or-button, 48 px, states of design-tokens.md), `section-head.tsx` (1 px `fg` rule, h2, optional action link), `image-frame.tsx` (`next/image`, ratio `4/3` or `16/9`, `object-fit: contain`, padding `clamp(16px, 6%, 40px)`, never upscales past intrinsic width, fallback = project title on `bg-frame`, explicit `sizes`), `status-badge.tsx` (static 8 px dot + text), `external-link.tsx` (↗ icon + visually hidden "(site externe)")
- [X] T025 [P] Create `src/components/layout/skip-link.tsx`, `breadcrumbs.tsx` (`nav` + `ol`, `aria-current="page"` on the last item), `site-footer.tsx` (name, role, links e-mail/GitHub/LinkedIn, "Retour en haut", © year)
- [X] T026 Create `src/components/layout/site-header.tsx` (sticky, solid `bg-bg`, bottom border, wordmark linking to `/{locale}`) with `nav-links.tsx` (client, `usePathname` → `aria-current="page"` + 2 px accent bar) and `mobile-nav.tsx` (client, "Menu" button `aria-expanded`/`aria-controls`, panel without animation, closes on link click and Escape, focus returns to the button); leave slots for the language switch (US5) and theme toggle (US8)
- [X] T027 Create `src/app/[locale]/layout.tsx` as the root layout: `<html lang={locale} data-theme="auto" suppressHydrationWarning>`, `next/font/google` `Instrument_Sans` (subsets latin + latin-ext, variable `--font-sans`) and `JetBrains_Mono` (400/500, `--font-mono`), skip link, header, `<main id="main" tabIndex={-1}>`, footer; `generateStaticParams` → `fr`, `en`; `export const dynamicParams = false`
- [X] T028 Create `src/lib/seo.ts`: `buildMetadata({ locale, path, title, description, image? })` returning title, description, `alternates.canonical`, `alternates.languages` `{ fr, en, "x-default": "/" }`, Open Graph (`locale` `fr_FR`/`en_US`) and Twitter card; `metadataBase` from `profile.siteUrl`
- [X] T029 [P] Create `src/app/[locale]/not-found.tsx` (localized 404, links to home and `/work`) and `src/app/[locale]/error.tsx` (client, localized message, retry button, no animation)

**Checkpoint**: `pnpm build` passes, `/` redirects to `/fr` or `/en`, the shell (header, footer, skip link) renders in both languages, `pnpm test` is green.

---

## Phase 3: User Story 1 — Comprendre qui est Landry en arrivant (Priority: P1) 🎯 MVP

**Goal**: the home page tells who Landry is, what he does and what to do next, then shows the 6 featured projects, the experience summary and direct contact details.

**Independent Test**: quickstart scenarios 3 and 4 — at 360 × 640 the name, role, lead and the 3 actions are visible without scrolling; 6 project cards with uniform frames link to their case study.

- [X] T030 [P] [US1] Create `src/components/ui/project-card.tsx`: whole card is one link to `/{locale}/work/{slug}`, `image-frame` 4:3, mono meta row (`{type} · {year}` left, `Play Store` if `links.store` else status label right), h3 title with arrow (hover: accent underline + 3 px arrow shift), headline in `text-muted`
- [X] T031 [P] [US1] Create `src/components/home/hero.tsx`: availability badge; `h1` display = full name + role (role in `text-muted`); lead; primary "Voir les projets" → `#work`, secondary "Voir le CV" → `/{locale}/cv`, link "Me contacter" → `#contact`; freelance note; facts `dl` (Basé à / Stack / Livré "{projectCount()} projets depuis {firstProjectYear()}"); photo column 4:5 only when `profile.photo` is set (≥ 900 px) and 40 px avatar beside the badge below 900 px, no photo column when `photo` is `null`
- [X] T032 [P] [US1] Create `src/components/home/featured-work.tsx` (`section#work`, section-head "Projets phares" + link "Tous les projets {count}" → `/{locale}/work`, 2-column grid ≥ 720 px of `project-card`) and `src/components/home/experience-list.tsx` (`section#about`, rows period mono / role · company / highlights, link "En savoir plus" → `/{locale}/about`)
- [X] T033 [US1] Create `src/components/contact/contact-section.tsx` (`section#contact`: section-head "Me contacter", lead, large `mailto:` link, LinkedIn/GitHub/X links) with a slot for the form added in US4
- [X] T034 [US1] Create `src/app/[locale]/page.tsx` assembling hero, featured work, experience list and contact section; `generateMetadata` via `buildMetadata`
- [X] T035 [US1] Check the home page against the mockup and quickstart scenarios 3, 4, 20, 22 in both languages and both system themes; fix spacing/typography deviations

**Checkpoint**: the home page is complete and usable on its own.

---

## Phase 4: User Story 2 — Lire une étude de cas (Priority: P1) 🎯 MVP

**Goal**: one static page per project and language, in the order problem → solution → role → impact → features → stack.

**Independent Test**: quickstart scenarios 6 and 7 — `/fr/work/secret` shows breadcrumb, active "Projets", sections 01→06, the Google Play link and no code link; `/fr/work/inconnu` returns a localized 404.

- [X] T036 [P] [US2] Create `src/components/work/case-study-header.tsx`: mono meta (type · year · team), h1 title, headline lead, actions (primary = first existing link among `store`/`live`/`code` using `external-link`, other links secondary), status badge, `highlights` strip (only when present, 1–3 items, `tabular-nums`)
- [X] T037 [P] [US2] Create `src/components/work/case-study-sheet.tsx` (`aside` + `dl`: Type, Année, Durée, Équipe, Statut, Code = link or "Privé"; sticky at ≥ 960 px) and `src/components/work/case-study-body.tsx` (`article`, sections with mono numbers 01 Problème, 02 Solution, 03 Mon rôle, 04 Impact, 05 Fonctionnalités clés, 06 Stack as mono tags; each section `aria-labelledby`)
- [X] T038 [P] [US2] Create `src/components/work/next-project.tsx`: compact card of `getNextProject(slug)` + lead "Un projet similaire…" + primary "Me contacter" → `/{locale}#contact` + secondary "Tous les projets"
- [X] T039 [US2] Create `src/app/[locale]/work/[slug]/page.tsx`: `generateStaticParams` (all slugs), `dynamicParams = false`, `notFound()` for unknown slug, breadcrumbs Accueil › Projets › {title}, header, 16:9 `image-frame` (priority image), sheet + body grid (`240px | 1fr` ≥ 960 px), next project; `generateMetadata` (title, headline as description, project image)
- [X] T040 [US2] Check `/fr/work/secret`, `/en/work/omoh` (240 px icon must stay sharp), `/fr/work/open-whatsapp-bot` (code link only) against the mockup and quickstart scenarios 6, 7, 8

**Checkpoint**: MVP — home + case studies work end to end in both languages.

---

## Phase 5: User Story 3 — Consulter et imprimer le CV (Priority: P2)

**Goal**: a CV page generated from the content, printable to ≤ 2 A4 pages.

**Independent Test**: quickstart scenario 9 in both languages.

- [X] T041 [P] [US3] Create `src/components/cv/print-button.tsx` (client, `window.print()`, label "Imprimer / Enregistrer en PDF", hidden in print)
- [X] T042 [US3] Create `src/components/cv/cv-document.tsx`: header (name, role, location, e-mail, site, LinkedIn, GitHub), summary (`bio`), experience, selected projects (featured, one line each: title — headline — year — main link), stack (groups inline), education and spoken languages sections rendered only when their list is non-empty
- [X] T043 [US3] Create `src/app/[locale]/cv/page.tsx` (h1 "CV", print button, document, `generateMetadata`) and add print rules to `src/app/globals.css`: `@page { size: A4; margin: 14mm }`, light tokens forced, header/footer/skip link/buttons hidden, links printed with their URL where useful, `break-inside: avoid` on entries
- [X] T044 [US3] Print `/fr/cv` and `/en/cv` to PDF from Chrome headless and confirm ≤ 2 pages; tighten spacing if needed

---

## Phase 6: User Story 4 — Contacter Landry (Priority: P2)

**Goal**: the contact form really sends e-mails through the owner's SMTP, with validation, anti-spam and fallbacks, with or without JavaScript.

**Independent Test**: quickstart scenarios 10–15.

- [X] T045 [P] [US4] Create `src/lib/contact/validate.ts` (pure): `validateContact(input, locale)` with verbatim rules — `name` "2–100 caractères après trim, retours à la ligne interdits", `email` "Format e-mail, ≤ 254 caractères", `reason` "`job` | `freelance` | `other`" (unknown → `other`), `message` "10–5000 caractères après trim", `locale` unknown → `en`; returns field errors with the localized messages of contracts/contact-action.md
- [X] T046 [P] [US4] Create `src/lib/contact/rate-limit.ts` (pure, injectable clock): sliding window "5 envois par heure et par IP" and duplicate detection "même e-mail + même message dans les 60 s"
- [X] T047 [P] [US4] Write `tests/contact.test.ts` covering validation boundaries (1/2/100/101 chars name, 9/10/5000/5001 chars message, newline in name, invalid e-mail), rate limit (6th call in an hour refused, allowed again after the window) and duplicate detection
- [X] T048 [P] [US4] Create `src/lib/contact/mailer.ts` (`import "server-only"`): nodemailer transport from `SMTP_*` env (secure defaults to `true` on port 465), JSON transport when `SMTP_HOST` is missing in development, explicit error in production; `sendContactMail()` with From/To/Reply-To/Subject/body per contracts/contact-action.md (subject without line breaks)
- [X] T049 [US4] Create `src/lib/contact/action.ts` (`"use server"`): `sendContactMessage(prevState, formData)` → honeypot `website` filled or `startedAt` < 3 s or duplicate → `{ status: "success" }` without sending; client IP from `x-forwarded-for` (first hop) or `x-real-ip` via `headers()`; rate limited → `rate-limited`; invalid → `invalid` with errors and submitted values; SMTP failure → `error` (logged server-side)
- [X] T050 [US4] Create `src/components/contact/contact-form.tsx` (client, `useActionState`): labelled fields with native constraints (`required`, `type="email"`, `minLength`, `maxLength`, `autocomplete`), reason as radio pills in a `fieldset`/`legend`, hidden `locale` and `startedAt`, honeypot outside tab order, errors under fields with `aria-describedby` + `aria-invalid`, focus on first invalid field, `role="status"` region for success/rate-limited/error (with clickable direct e-mail), submit disabled + "Envoi…" while pending, values preserved on error, form reset on success
- [X] T051 [US4] Mount the form in `src/components/contact/contact-section.tsx` (two columns ≥ 900 px) and run quickstart scenarios 10, 12, 13, 14, 15 (and 11 when SMTP credentials are available)

---

## Phase 7: User Story 5 — Lire le site dans sa langue (Priority: P2)

**Goal**: language switch on every page, same page in the other language, remembered choice.

**Independent Test**: quickstart scenarios 1, 2 and 24.

- [X] T052 [US5] Create `src/components/ui/language-switch.tsx` (client): two links `FR` / `EN` (mono, active one underlined accent, `aria-current="true"`, `hrefLang`, `lang`), target = current path with the first segment swapped (`usePathname`), current query appended on click; mount it in `site-header.tsx` and in `mobile-nav.tsx`
- [X] T053 [US5] Verify `lang` on `<html>`, `hreflang` alternates and translated `<title>`s on every page; grep `src/components` and `src/app` for hard-coded user-visible strings and move them to the messages; run quickstart scenarios 1, 2, 24

---

## Phase 8: User Story 6 — Parcourir tous les projets (Priority: P3)

**Goal**: `/work` lists all 17 projects with a shareable type filter.

**Independent Test**: quickstart scenario 5.

- [X] T054 [P] [US6] Create `src/components/work/work-filter.tsx` (server): `nav` of links Tous / Web / Mobile / Autre → `?type=…`, active one with `aria-current="page"` and filled style, counts per type
- [X] T055 [US6] Create `src/app/[locale]/work/page.tsx`: reads `searchParams.type` (unknown → all), h1 "Projets" + total count, filter, grid of `project-card` (year desc), empty state with a link back to "Tous", `generateMetadata`

---

## Phase 9: User Story 7 — En savoir plus sur Landry (Priority: P3)

**Goal**: About page with bio, experience, stack, GitHub stats with fallback, and the tic-tac-toe bonus.

**Independent Test**: quickstart scenario 16.

- [X] T056 [P] [US7] Create `src/lib/github.ts`: `getGithubStats()` → `fetch("https://api.github.com/users/Starland9", { next: { revalidate: 3600 } })` with `Authorization` when `GITHUB_TOKEN` is set; returns `{ publicRepos, followers, memberSince, fetchedAt }` or `null` on any error
- [X] T057 [P] [US7] Create `src/components/about/github-stats.tsx` (3 figures + "mis à jour …" + profile link; `null` → discreet sentence + profile link) and `src/components/about/stack-groups.tsx` (groups as `dl` with mono tags)
- [X] T058 [P] [US7] Rewrite `src/components/about/tic-tac-toe.tsx` (client, no framer-motion): 3×3 grid of `button`s with `aria-label` ("Case 1, vide" / "Case 1, X"), keyboard playable, simple AI, result and turn announced in a `role="status"` region, reset button, labelled as a bonus; rendered after the main content
- [X] T059 [US7] Create `src/app/[locale]/about/page.tsx`: h1, bio, experience list (full highlights), stack groups, education and languages (only when non-empty), GitHub stats, tic-tac-toe section "Bonus"; JSON-LD `Person`; `generateMetadata`

---

## Phase 10: User Story 8 — Lire dans le thème de son choix (Priority: P3)

**Goal**: manual light/dark toggle, remembered, never a flash.

**Independent Test**: quickstart scenarios 17, 18, 19.

- [X] T060 [P] [US8] Create `src/components/ui/theme-script.tsx`: inline `<script>` for `<head>` that reads `localStorage.theme` (`light` | `dark`) inside `try/catch` and sets `data-theme` on `<html>` before first paint (guide "Preventing flash before hydration"); mount it in `src/app/[locale]/layout.tsx`
- [X] T061 [US8] Create `src/components/ui/theme-toggle.tsx` (client): 40 px icon button (moon/sun from lucide), accessible label "Passer au thème sombre/clair" from the messages, resolves `auto` with `matchMedia`, writes `data-theme` + `localStorage.theme`, follows system changes while no manual choice; mount it in `site-header.tsx`

---

## Phase 11: Polish & Cross-Cutting Concerns

- [X] T062 [P] Create `src/app/sitemap.ts` (5 pages + 17 case studies × 2 locales, `alternates.languages`) and `src/app/robots.ts` (allow all, sitemap URL)
- [X] T063 [P] Create `src/app/[locale]/opengraph-image.tsx` and `src/app/[locale]/work/[slug]/opengraph-image.tsx` with `next/og` (1200 × 630, Terre colours, name/role or project title/headline/type, no gradient)
- [X] T064 [P] Add JSON-LD `Person` (name, jobTitle, url, sameAs, address locality Douala) to `src/app/[locale]/page.tsx` via `src/lib/seo.ts`
- [X] T065 [P] Rewrite `README.md` (what the site is, stack, content editing in `src/content/`, scripts, env vars, Docker) and update `docs/API_PROJECTS.md` per contracts/api-projects.md
- [X] T066 Grep the codebase for forbidden patterns (`backdrop-blur`, `bg-gradient`, `bg-linear`, `animate-`, `shadow-`, `blur-`, `framer-motion`, raw hex colours outside `globals.css`) and remove any occurrence
- [X] T067 Run `pnpm typecheck`, `pnpm test`, `pnpm build`; then quickstart scenarios 20–27 including Lighthouse mobile on `/fr`, `/fr/work`, `/fr/work/secret`, `/fr/cv` and their `/en` equivalents; fix every score below 95 and every accessibility finding
- [X] T068 Final visual pass against `specs/001-ui-ux-redesign/mockups/index.html` at 360, 768, 1440 px in light and dark; screenshots of the result for the owner

---

## Dependencies & Execution Order

### Phase dependencies

- **Setup (1)** → **Foundational (2)** → user stories → **Polish (11)**.
- T022 needs T019–T021 (content migrated) before deleting `constants.ts`. T019/T020 need T014–T016 and T006.
- T027 needs T023–T026. T013 needs T011–T012.

### User story dependencies

- **US1 (P1)** and **US2 (P1)**: only Foundational. US2 reuses `image-frame` (T024), not US1 components.
- **US3 (P2)**: Foundational only.
- **US4 (P2)**: needs `contact-section.tsx` from US1 (T033) to mount the form (T051); T045–T050 can start right after Foundational.
- **US5 (P2)**: Foundational (header slots). Best done after US1/US2 so the string audit (T053) covers real pages.
- **US6 (P3)**: needs `project-card.tsx` (T030).
- **US7 (P3)**: Foundational only.
- **US8 (P3)**: Foundational only (auto theme already works through CSS from T023).

### Within a story

Pure modules and tests → server pieces → client components → page assembly → verification.

## Parallel Opportunities

- Setup: T003, T004, T005, T006 together.
- Foundational: T008/T009, T011/T012, T014, T016, T017, T018, T019, T020 together; then T024, T025, T029 together.
- US1: T030, T031, T032 together. US2: T036, T037, T038 together.
- US4: T045, T046, T047, T048 together.
- US7: T056, T057, T058 together.
- Once Foundational is done, US1, US2, US3, US7 and US8 can be built in parallel.

### Parallel example: Foundational content migration

```text
Task: "T019 Migrate the 6 featured projects into src/content/projects/*.json with FR translation"
Task: "T020 Migrate the 11 other projects into src/content/projects/*.json with FR translation"
Task: "T018 Create profile.json, experience.json, stack.json, education.json, languages.json"
```

## Implementation Strategy

### MVP first

1. Phase 1 + Phase 2.
2. US1 (home) → validate scenarios 3, 4.
3. US2 (case studies) → validate scenarios 6, 7, 8.
4. **Stop and validate**: the site can replace the old one with home + case studies.

### Incremental delivery

5. US3 CV → US4 Contact → US5 language switch (P2).
6. US6 projects list → US7 about → US8 theme toggle (P3).
7. Polish: SEO, README, Lighthouse/accessibility passes.

Commit after each phase (branch `001-ui-ux-redesign`).
