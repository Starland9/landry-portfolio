# Contract: Design tokens et composants (palette Terre)

Référence visuelle : [mockups/index.html](../mockups/index.html) (palette Terre). Les tokens sont
définis **une seule fois** dans `src/app/globals.css` et exposés à Tailwind 4 via `@theme inline`.
Aucun composant n'utilise de couleur, de taille ou de rayon arbitraire.

## Couleurs

| Token | Utilitaire Tailwind | Clair | Sombre | Usage |
| --- | --- | --- | --- | --- |
| `--bg` | `bg-bg` | `#F7F5F0` | `#13110F` | Fond de page, champs |
| `--surface` | `bg-surface` | `#FDFCF9` | `#1A1715` | Formulaire, badges |
| `--frame` | `bg-frame` | `#EDE9E1` | `#221F1B` | Cadre des captures, survol |
| `--fg` | `text-fg` | `#1A1714` | `#F0ECE6` | Texte principal, règles de section |
| `--muted` | `text-muted` | `#5C554D` | `#A8A097` | Texte secondaire, métadonnées |
| `--border` | `border-border` | `#E0D9CD` | `#302B26` | Séparateurs, bordures de cartes |
| `--border-strong` | `border-border-strong` | `#8C8378` | `#6F675E` | Bordures de champs et boutons secondaires (≥ 3:1) |
| `--accent` | `text-accent` / `bg-accent` | `#A83A14` | `#EE8A5E` | Liens, bouton primaire, focus, navigation active |
| `--accent-hover` | `bg-accent-hover` | `#8F3110` | `#F4A27E` | Survol du primaire |
| `--on-accent` | `text-on-accent` | `#FFFFFF` | `#13110F` | Texte sur l'accent |
| `--ok` | `text-ok` / `bg-ok` | `#2F6B2F` | `#7BC97B` | Disponibilité, succès (toujours avec texte) |
| `--err` | `text-err` | `#B42318` | `#F2836B` | Erreurs de formulaire (toujours avec icône + texte) |

Sélection du thème : `html[data-theme="light"]`, `html[data-theme="dark"]`, et
`html[data-theme="auto"]` qui suit `prefers-color-scheme`. `color-scheme` est réglé en
conséquence (barres de défilement, contrôles natifs). Impression : thème clair forcé.

Contrastes vérifiés (AA) : texte principal ≥ 16:1, secondaire ≥ 6.1:1 (y compris sur `--frame`),
accent sur fond ≥ 5.9:1, texte sur accent ≥ 6.4:1, bordures de champs ≥ 3.4:1, succès et erreur
≥ 5.9:1 — dans les deux thèmes.

## Typographie

| Token | Valeur | Usage |
| --- | --- | --- |
| `--font-sans` | Instrument Sans (variable 400–700, latin + latin-ext) | Tout le texte |
| `--font-mono` | JetBrains Mono 400/500 | Métadonnées : année, type, statut, libellés de fiche, numéros de section, tags de stack |
| `--text-display` | `clamp(2.5rem, 1.55rem + 4.2vw, 4.75rem)` / interligne 1.02 / tracking −0.035em / 600 | Nom + rôle (accueil) |
| `--text-h1` | `clamp(2.25rem, 1.6rem + 2.8vw, 3.75rem)` / 1.05 / −0.03em | Titre d'étude de cas et de page |
| `--text-h2` | `clamp(1.5rem, 1.25rem + 1.1vw, 2rem)` / 1.2 / −0.02em | Titres de section |
| `--text-h3` | `1.25rem` / 1.3 | Titres de cartes |
| `--text-lead` | `clamp(1.125rem, 1.03rem + 0.45vw, 1.375rem)` / 1.5 | Accroches |
| `--text-body` | `1rem` / 1.6 (prose d'étude de cas : 1.0625rem / 1.7) | Texte courant, jamais < 16 px |
| `--text-small` | `0.875rem` | Notes, fil d'Ariane |
| `--text-mono` | `0.8125rem` | Métadonnées mono |

Largeur de lecture : prose ≤ 42rem, accroches ≤ 40rem. `text-wrap: balance` sur les titres,
`pretty` sur les paragraphes. Chiffres clés en `tabular-nums`.

## Espacement, grille, formes

- Échelle (base 4 px) : 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Sections : `clamp(64px, 8vw, 112px)` entre deux sections.
- Conteneur : `max-width: 72rem`, gouttière `clamp(16px, 4vw, 40px)`.
- Points de rupture : 720 px (2 colonnes de cartes, faits en ligne), 820 px (navigation complète),
  900 px (hero à 2 colonnes, contact à 2 colonnes), 960 px (fiche latérale collante des études
  de cas).
- Rayons : `--radius-control: 6px` (boutons, champs), `--radius-frame: 10px` (cadres, formulaire),
  `999px` (badges, choix du motif).
- **Aucune ombre.** Séparation par bordures 1 px et espaces. Titres de section précédés d'un filet
  1 px en `--fg`.

## Mouvement

- `--dur: 150ms`, `--ease: cubic-bezier(.2, 0, 0, 1)`.
- Propriétés animées autorisées : `color`, `background-color`, `border-color`,
  `text-decoration-color`, et `transform: translateX(3px)` de la flèche d'une carte au survol.
- `@media (prefers-reduced-motion: reduce)` : toute transition désactivée.
- Pas de `scroll-behavior: smooth`, pas d'animation au chargement, pas d'animation en boucle.

## Composants et états

| Composant | Repos | Survol | Focus clavier | Autres |
| --- | --- | --- | --- | --- |
| Bouton primaire | `bg-accent text-on-accent`, h 48 px, rayon 6 | `bg-accent-hover` | anneau 2 px accent, décalage 3 px | désactivé : opacité 0.5, `cursor: not-allowed` |
| Bouton secondaire | transparent, bordure `border-strong` | `bg-frame` | idem | — |
| Lien | `text-accent`, souligné 1 px, décalage 3 px | soulignement 2 px | anneau | externe : icône ↗ + texte masqué « (site externe) » |
| Navigation | `text-muted` | `text-fg bg-frame` | anneau | active : `text-fg` + barre 2 px accent sous l'élément, `aria-current="page"` |
| Carte projet | cadre `bg-frame` + bordure `border` | bordure `border-strong`, titre souligné accent, flèche +3 px | anneau autour de la carte (décalage 6 px) | carte entièrement cliquable, un seul lien |
| Cadre image | ratio 4:3 (cartes) ou 16:9 (étude de cas), `object-fit: contain`, marge interne `clamp(16px, 6%, 40px)` | — | — | image absente : titre du projet centré sur `bg-frame` |
| Champ | fond `bg-bg`, bordure `border-strong`, h ≥ 48 px | bordure `fg` | anneau accent + bordure accent | invalide : bordure `err` + message sous le champ |
| Choix du motif | pastille bordée `border-strong` | bordure `fg` | anneau | coché : fond `fg`, texte `bg` |
| Badge de statut | pastille bordée, point 8 px `ok` (statique) | — | — | jamais animé |
| Sélecteur de langue | `FR` `EN` en mono, langue active soulignée accent | `bg-frame` | anneau | `aria-pressed` / lien vers la même page |
| Bascule de thème | bouton icône 40 px (lune / soleil) | `bg-frame` | anneau | libellé accessible « Passer au thème sombre/clair » |

Cibles tactiles ≥ 40 px (≥ 24 px exigés par WCAG 2.2 AA), 48 px pour les actions principales.

## Mise en page de référence

- **Accueil** : badge de disponibilité → nom + rôle (display) → accroche → primaire « Voir les
  projets », secondaire « Voir le CV », lien « Me contacter » → note freelance → faits (Basé à /
  Stack / Livré) ; photo 4:5 à droite (≥ 900 px) ou vignette 40 px à côté du badge (< 900 px),
  aucune colonne photo si `profile.photo` est `null`. Puis Projets phares (grille 2 colonnes),
  Parcours, Contact.
- **Étude de cas** : fil d'Ariane → méta mono → titre → accroche → actions + statut → chiffres
  clés (si présents) → capture 16:9 → fiche (collante ≥ 960 px) + sections numérotées 01–06 →
  projet suivant + contact.
- À 360 × 640 px, l'accueil montre sans défilement : nom, rôle, accroche et les trois actions.
