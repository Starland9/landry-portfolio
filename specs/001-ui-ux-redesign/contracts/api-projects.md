# Contract: API `/api/projects` (existante)

Documentée dans [docs/API_PROJECTS.md](../../../docs/API_PROJECTS.md). Elle est **conservée** :
mêmes paramètres (`category`, `search`, `status`, `featured`, `technologies`, `sortBy`, `order`,
`page`, `limit`) et même forme de réponse.

## Adaptation à la nouvelle source de données

La route lit désormais `src/content/projects/*.json` via un adaptateur qui reconstruit l'ancienne
forme en **anglais** :

| Champ de réponse | Source |
| --- | --- |
| `id` | `slug` |
| `title` | `title` |
| `headline`, `description`, `summary`, `problem`, `solution` | `.en` |
| `features`, `impact`, `role` | `.en` |
| `technologies` | `technologies` |
| `timeline` | `"{year} · {duration.en}"` (ou `"{year}"` sans durée) |
| `team` | `team.en` |
| `status` | libellé anglais du statut (ex. `"In production"`) |
| `image` | `image.src` |
| `liveUrl` | `links.live ?? links.store` |
| `githubUrl` | `links.code` |
| `featured` | `featured` |
| `category` | `type` |

## Changements visibles (mineurs)

- `category` vaut `other` au lieu de `Bot` pour Open WhatsApp Bot (la valeur `Bot` n'était pas
  documentée).
- Le champ `color` (dégradé décoratif) disparaît.
- Les liens Play Store perdent le paramètre de suivi `pcampaignid`.

`docs/API_PROJECTS.md` est mis à jour en conséquence.
