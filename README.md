# Landry Simo — Portfolio

Personal site of Landry Simo, software engineer in Douala (Flutter, Django, Next.js):
case studies of shipped projects, a printable CV and a contact form.
Live at [portfolio.starland9.dev](https://portfolio.starland9.dev), in French and English.

The design is deliberately plain: real screenshots in uniform frames, a clear type scale,
light and dark themes, and no decorative effects. The rules behind it are in
[`.specify/memory/constitution.md`](.specify/memory/constitution.md).

## Stack

- Next.js 16 (App Router, `proxy.ts`, `next/root-params`), React 19, TypeScript 7 (strict)
- Tailwind CSS 4 with design tokens in [`src/app/globals.css`](src/app/globals.css)
- Instrument Sans and JetBrains Mono, self-hosted by `next/font`
- nodemailer for the contact form (the only runtime dependency added by the redesign)
- pnpm, Docker (Node 24, `output: "standalone"`)

## Getting started

```bash
pnpm install
cp .env.example .env.local   # optional: SMTP and GitHub token
pnpm dev                     # http://localhost:3000 → redirects to /fr or /en
```

| Script | What it does |
| --- | --- |
| `pnpm dev` | Development server |
| `pnpm build` / `pnpm start` | Production build and server |
| `pnpm typecheck` | Route types + TypeScript (also catches a missing French translation) |
| `pnpm test` | `node --test`: language negotiation, content validation, contact rules |
| `pnpm format` | Prettier with the Tailwind plugin |

## Editing the content

All content lives in [`src/content/`](src/content/), as JSON, with every visible text in French and English:

| File | Content |
| --- | --- |
| `projects/<slug>.json` | One file per project (case study, links, screenshot) |
| `projects/index.ts` | List of project files; its order is the order of the 6 featured projects |
| `profile.json` | Name, role, lead sentence, availability, links, photo |
| `experience.json` | Jobs, newest first |
| `stack.json` | Technologies by area |
| `education.json`, `languages.json` | Shown on the About page and in the CV once they are filled in |

To add a project, copy `projects/secret.json`, rename it after its slug, fill it in, then import it
in `projects/index.ts`. The JSON schemas in `src/content/schema/` give autocompletion in VS Code.
The content is validated when the site is built: a missing field or translation stops the build
with the file and field name. Exactly 6 projects must be `"featured": true`.

Interface texts (buttons, titles, form messages) are in [`src/i18n/messages/`](src/i18n/messages/).
French text can use plain spaces before `: ; ! ? %`; they become non-breaking spaces when rendered.

## Contact form

Messages are sent through your own SMTP server. Set these variables (see [`.env.example`](.env.example)):

| Variable | Required | Notes |
| --- | --- | --- |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | yes, in production | `SMTP_SECURE` defaults to `true` on port 465 |
| `CONTACT_TO`, `CONTACT_FROM` | no | Default to the e-mail in `profile.json` / `SMTP_USER` |
| `GITHUB_TOKEN` | no | Raises the GitHub API limit for the About page stats |

Without `SMTP_HOST` in development, messages are printed in the terminal instead of being sent.
Spam protection: hidden honeypot field, minimum fill time, duplicate detection, and 5 messages per
hour per IP. The rate limit is kept in memory, so it holds for one server instance.

## Project structure

```text
src/
├── proxy.ts                 language redirects (/ → /fr or /en) and 404 routing
├── app/
│   ├── [locale]/            root layout (document, fonts, theme)
│   │   └── (site)/          header, footer and pages: home, work, work/[slug], about, cv
│   ├── global-not-found.tsx server-rendered 404 in the visitor's language
│   ├── api/projects/        JSON API (see docs/API_PROJECTS.md)
│   ├── sitemap.ts, robots.ts
│   └── globals.css          design tokens (palette "Terre"), base styles, print styles
├── components/              layout, ui, home, work, about, contact, cv
├── content/                 JSON content, schemas and validation
├── i18n/                    languages, messages, French typography
└── lib/                     contact (validation, rate limit, mailer, action), GitHub, SEO
tests/                       node --test
specs/001-ui-ux-redesign/    spec, plan, tasks and mockup of the redesign
```

## Deployment

```bash
docker build -t landry-portfolio .
docker run -p 3000:3000 --env-file .env.production landry-portfolio
```

The first build needs network access to download the fonts. Old `/projects/...` URLs redirect
permanently to `/work/...`.
