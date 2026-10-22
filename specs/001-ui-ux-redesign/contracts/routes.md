# Contract: Routes, redirections et préférences

Interface publique du site : les URL. Toute URL listée ici est un engagement (liens partagés,
référencement).

## Pages

| URL | Page | Rendu | Navigation active | Fil d'Ariane |
| --- | --- | --- | --- | --- |
| `/{locale}` | Accueil | statique | — (le nom du site sert de lien d'accueil) | non |
| `/{locale}/work` | Tous les projets | serveur (lit `?type=`) | Projets | non |
| `/{locale}/work?type={web\|mobile\|other}` | Projets filtrés | serveur | Projets | non |
| `/{locale}/work/{slug}` | Étude de cas | statique (17 × 2) | Projets | Accueil › Projets › {titre} |
| `/{locale}/about` | À propos | statique, régénéré ≤ 1 h | À propos | non |
| `/{locale}/cv` | CV imprimable | statique | CV | non |
| `/{locale}#contact` | Ancre du bloc contact sur l'accueil | — | Contact | — |

`{locale}` ∈ `fr`, `en`. `{slug}` = slug d'un fichier de `src/content/projects/`.
Une valeur de `type` inconnue est ignorée (équivaut à « Tous »).
Slug inconnu ou chemin inexistant → page 404 dans la langue courante, statut HTTP 404, liens vers
l'accueil et `/work`.

## Négociation de langue (proxy)

Appliqué à toute requête hors `/_next/*`, `/api/*` et fichiers avec extension.

| Requête | Réponse |
| --- | --- |
| URL déjà préfixée par `fr` ou `en` | Servie ; cookie `locale` posé si absent ou différent |
| URL sans préfixe (ex. `/`, `/work/secret`) | `307` vers `/{langue}{chemin}{query}` |

Choix de `{langue}` : cookie `locale` valide → premier code `fr*`/`en*` de `Accept-Language` par
ordre de `q` → `en`.

Cookie `locale` : `Path=/; Max-Age=31536000; SameSite=Lax`, pas `HttpOnly` (lisible par le
sélecteur de langue), pas de donnée personnelle.

## Redirections permanentes (next.config)

| Source | Destination | Code |
| --- | --- | --- |
| `/projects` | `/work` | 308 |
| `/projects/:slug` | `/work/:slug` | 308 |

Suivies de la négociation de langue (307). Exemple :
`/projects/secret` → 308 `/work/secret` → 307 `/fr/work/secret`.

## Sélecteur de langue

Sur toute page, le lien vers l'autre langue pointe vers la **même page** : seul le premier
segment change, la query est conservée (`/fr/work?type=mobile` ↔ `/en/work?type=mobile`).

## Routes techniques

| URL | Contenu |
| --- | --- |
| `/sitemap.xml` | Toutes les pages × 2 langues, avec `alternates` hreflang |
| `/robots.txt` | `Allow: /`, lien vers le sitemap |
| `/{locale}/opengraph-image` | Image de partage du site (1200 × 630) |
| `/{locale}/work/{slug}/opengraph-image` | Image de partage d'un projet |
| `/api/projects` | API JSON existante, voir [api-projects.md](./api-projects.md) |

Supprimées : `/api/github/repos`, `/api/github/user` (consommateurs internes retirés).

## Métadonnées par page

Chaque page fournit, dans sa langue : `<title>` unique (`{Page} | Landry Simo`, accueil :
`Landry Simo — {rôle}`), meta description, Open Graph (titre, description, image, `locale`),
`canonical` = sa propre URL, `alternates.languages` = `{ fr, en, x-default: "/" }`.

## Préférence de thème

Pas d'URL. `localStorage.theme` ∈ {absent, `light`, `dark`} lu avant le premier rendu ;
`<html data-theme>` ∈ {`auto`, `light`, `dark`}.
