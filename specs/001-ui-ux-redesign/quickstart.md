# Quickstart: valider la refonte

Guide d'exécution et de vérification. Détails des formats : [data-model.md](./data-model.md),
[contracts/](./contracts/).

## Prérequis

- Node ≥ 22.18 (Docker : Node 24), pnpm 10 (`~/.local/share/pnpm/pnpm` sur cette machine).
- Accès réseau au premier build (polices Google auto-hébergées par `next/font`).
- Facultatif : `.env.local` copié depuis `.env.example` (SMTP, `GITHUB_TOKEN`).

```bash
pnpm install
pnpm dev            # http://localhost:3000 → redirige vers /fr ou /en
pnpm typecheck      # TypeScript strict, complétude des traductions
pnpm test           # node --test : langue, contact, limite de débit, contenu
pnpm build && pnpm start
```

## Scénarios de validation

| # | Scénario | Attendu | Couvre |
| --- | --- | --- | --- |
| 1 | Ouvrir `/` avec un navigateur en français, puis en allemand | `/fr`, puis `/en` | FR-026, US5 |
| 2 | Sur `/fr/work/secret`, cliquer « EN » | `/en/work/secret` ; revenir sur `/` → `/en` | FR-027, US5-4 |
| 3 | Accueil en 360 × 640 (DevTools) | nom, rôle, accroche, 3 actions visibles sans défiler | FR-006, SC-002 |
| 4 | Accueil : compter les cartes phares | 6, cadres de même format, aucune image déformée ou floue | FR-008, FR-011 |
| 5 | `/fr/work?type=mobile` puis « Tous » | seuls les projets mobiles, filtre actif visible, puis 17 projets | FR-012, US6 |
| 6 | `/fr/work/secret` | fil d'Ariane, « Projets » actif, sections 01→06 dans l'ordre, lien Google Play, pas de lien de code | FR-003, FR-013, FR-014 |
| 7 | `/fr/work/inconnu` | 404 en français avec liens utiles | Edge case |
| 8 | `curl -sI localhost:3000/projects/secret` | `308` → `/work/secret`, puis `307` → `/{langue}/work/secret` | FR-005, SC-010 |
| 9 | `/fr/cv` → Imprimer → Enregistrer en PDF | ≤ 2 pages A4, thème clair, sans navigation ; idem `/en/cv` | FR-019, SC-008 |
| 10 | Formulaire vide → Envoyer | erreurs sous les champs, focus sur le premier, saisie conservée | FR-020, US4-2 |
| 11 | Formulaire valide (SMTP réel configuré) | message reçu < 1 min, `Reply-To` = visiteur | FR-021, SC-006 |
| 12 | Désactiver JavaScript, envoyer le formulaire | envoi fonctionnel, état affiché après rechargement | FR-024 |
| 13 | Remplir le champ piège via DevTools, envoyer | « succès » affiché, aucun e-mail reçu | FR-022, SC-006 |
| 14 | 6 envois valides en moins d'une heure | 6ᵉ refusé avec message et adresse directe | FR-022 |
| 15 | SMTP volontairement faux (`SMTP_PASS` erroné) | message d'erreur + adresse directe, saisie conservée | FR-023, US4-3 |
| 16 | `/fr/about` avec `GITHUB_TOKEN` invalide ou réseau coupé | page complète, bloc GitHub avec message discret | FR-017, US7-2 |
| 17 | Système en sombre, aucun choix manuel, recharger | sombre dès le premier affichage, aucun flash | FR-029, US8-1 |
| 18 | Basculer en clair, recharger, changer de page | clair conservé | US8-2 |
| 19 | Activer « réduire les animations » (DevTools > Rendering) | aucune transition au survol | FR-030 |
| 20 | Charger chaque page sans interagir | rien ne bouge | FR-031, SC-009 |
| 21 | Parcours complet au clavier (Tab, Maj+Tab, Entrée, Échap sur le menu mobile) | tout est atteignable, focus toujours visible, jamais masqué par l'en-tête collant | FR-032, SC-004 |
| 22 | Largeurs 360, 390, 768, 1024, 1440, 1920 px | aucun défilement horizontal ni texte coupé | SC-011 |
| 23 | Supprimer `headline.fr` d'un JSON de projet, `pnpm build` | build en échec avec le fichier et le champ nommés | FR-028, SC-007 |
| 24 | Retirer une clé de `fr.json`, `pnpm typecheck` | erreur de compilation | FR-028 |
| 25 | `pnpm dlx lighthouse http://localhost:3000/fr --form-factor=mobile` (+ `/fr/work`, `/fr/work/secret`, `/fr/cv`, et `/en/…`) | ≥ 95 dans les 4 catégories | SC-003, SC-005 |
| 26 | `curl -s localhost:3000/sitemap.xml` | 2 × (5 + 17) URL avec `xhtml:link` hreflang | FR-033 |
| 27 | `curl -s 'localhost:3000/api/projects?category=mobile&limit=3'` | même forme de réponse qu'avant | contracts/api-projects.md |

## Déploiement (Docker)

Variables à fournir au conteneur : `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
(+ facultatives `SMTP_SECURE`, `CONTACT_TO`, `CONTACT_FROM`, `GITHUB_TOKEN`).
Limite de débit en mémoire : valable pour **une seule instance** ; à revoir si le site passe sur
plusieurs conteneurs.

## Données à compléter par Landry

- `src/content/profile.json` → `photo` (fichier dans `public/images/`, ratio 4:5 conseillé).
- `src/content/education.json` et `languages.json` (rubriques masquées tant qu'elles sont vides).
- Relecture des traductions françaises des 17 projets.
