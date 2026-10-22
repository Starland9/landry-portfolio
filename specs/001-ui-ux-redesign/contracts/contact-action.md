# Contract: Action de contact

Server Action appelée par le formulaire du bloc contact (accueil). Fonctionne avec et sans
JavaScript.

## Entrée (`FormData`)

| Champ | Contrainte | Erreur affichée (fr / en) |
| --- | --- | --- |
| `name` | 2–100 caractères, sans retour à la ligne | « Indiquez votre nom. » / « Enter your name. » |
| `email` | e-mail valide, ≤ 254 | « Indiquez une adresse e-mail valide, par exemple nom@domaine.com. » / « Enter a valid email address, for example name@domain.com. » |
| `reason` | `job` \| `freelance` \| `other` | (valeur inconnue → `other`) |
| `message` | 10–5000 caractères | « Votre message doit faire au moins 10 caractères. » / « Your message must be at least 10 characters long. » (+ variante « au plus 5000 ») |
| `locale` | `fr` \| `en` | (valeur inconnue → `en`) |
| `website` | vide | — (piège) |
| `startedAt` | timestamp ms | — (piège temporel) |

## Sortie (`ContactState`)

```ts
type Values = { name: string; email: string; reason: string; message: string };
type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "invalid"; errors: Partial<Record<"name" | "email" | "message", string>>; values: Values }
  | { status: "rate-limited"; values: Values }
  | { status: "error"; values: Values }; // envoi SMTP impossible
```

- `invalid`, `rate-limited` et `error` renvoient les valeurs saisies pour que rien ne soit perdu (sans JS aussi).
- Piège rempli, soumission < 3 s, ou doublon (même e-mail + message < 60 s) → `success` sans envoi
  (le robot ne doit rien apprendre ; un humain qui double-clique voit le succès une fois).
- Plus de 5 envois / heure / IP → `rate-limited` : « Trop de messages envoyés. Réessayez dans une
  heure ou écrivez directement à contact@starland9.dev. »
- `error` → « L'envoi a échoué. Votre message est conservé ci-dessous ; vous pouvez réessayer ou
  écrire directement à contact@starland9.dev. » (adresse cliquable).

## Comportement de l'interface

- Bouton désactivé et libellé « Envoi… » pendant l'envoi (`aria-busy`).
- Erreurs sous chaque champ, reliées par `aria-describedby`, champ `aria-invalid="true"` ; le focus
  va au premier champ invalide après une soumission refusée.
- Succès et erreurs générales annoncés dans une région `role="status"` / `aria-live="polite"`.
- Après succès : formulaire vidé, message de confirmation visible.

## E-mail envoyé

| Élément | Valeur |
| --- | --- |
| `From` | `CONTACT_FROM` (défaut : `SMTP_USER`) |
| `To` | `CONTACT_TO` (défaut : adresse de `profile.json`) |
| `Reply-To` | e-mail du visiteur |
| `Subject` | `[Portfolio] {Poste \| Mission freelance \| Autre} — {name}` |
| Corps (texte brut) | nom, e-mail, motif, langue, date ISO, message |

## Configuration (variables d'environnement, serveur uniquement)

| Variable | Obligatoire en production | Exemple |
| --- | --- | --- |
| `SMTP_HOST` | oui | `mail.starland9.dev` |
| `SMTP_PORT` | oui | `465` |
| `SMTP_SECURE` | non (défaut `true` si port 465) | `true` |
| `SMTP_USER` | oui | `contact@starland9.dev` |
| `SMTP_PASS` | oui | — |
| `CONTACT_TO` | non | `contact@starland9.dev` |
| `CONTACT_FROM` | non | `"Portfolio <contact@starland9.dev>"` |

Sans `SMTP_HOST` en développement : transport JSON (message affiché dans la console, statut
`success`). Sans `SMTP_HOST` en production : statut `error` et journal serveur explicite.
