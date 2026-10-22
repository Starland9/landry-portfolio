<!--
Sync Impact Report
- Version change: (template, unratified) → 1.0.0
- Modified principles: all placeholders replaced (initial ratification)
  - [PRINCIPLE_1_NAME] → I. Clarté immédiate
  - [PRINCIPLE_2_NAME] → II. Sobriété, aucun effet spécial
  - [PRINCIPLE_3_NAME] → III. Le travail d'abord
  - [PRINCIPLE_4_NAME] → IV. Accessibilité et lisibilité
  - [PRINCIPLE_5_NAME] → V. Bilingue, source unique de contenu
- Added sections: VI. Performance et simplicité technique; Contraintes techniques;
  Workflow de développement et contrôles qualité
- Removed sections: none
- Templates requiring updates: none (plan/spec/tasks templates read the constitution at runtime;
  the plan template's "Constitution Check" gate applies these principles as-is)
- Follow-up TODOs: none
-->

# Landry Portfolio Constitution

## Core Principles

### I. Clarté immédiate

- En moins de 5 secondes, un visiteur DOIT savoir qui est Landry, ce qu'il fait, et quelles sont
  ses prochaines actions possibles : voir les projets, ouvrir le CV, le contacter.
- Chaque page DOIT indiquer où l'on se trouve : titre de page explicite (`<h1>` et `<title>`),
  élément de navigation actif, fil d'Ariane sur toute page de profondeur ≥ 2 (ex. étude de cas).
- Le message principal vise d'abord les recruteurs ; l'offre freelance est mentionnée en second
  sans concurrencer le message principal.
- Une page a une seule action primaire visible ; les actions secondaires sont visuellement
  subordonnées.

**Rationale** : le site existe pour qu'un recruteur ou un client décide vite. Toute hésitation
sur « où suis-je / que faire » est une perte de visiteur.

### II. Sobriété, aucun effet spécial

- INTERDITS : particules, curseur personnalisé, glassmorphisme, dégradés néon ou décoratifs,
  effet machine à écrire, apparitions/animations déclenchées au scroll, parallax, glow, ombres
  colorées, badges animés en boucle.
- Le mouvement est réservé au feedback d'interaction (survol, focus, pression, changement de
  thème, ouverture/fermeture d'un élément) avec une durée ≤ 200 ms.
- Tout mouvement DOIT être désactivé quand `prefers-reduced-motion: reduce` est actif.
- La hiérarchie visuelle repose sur la typographie, l'espacement et la grille, pas sur des effets.

**Rationale** : les effets rendaient le site « fait par IA » et masquaient le contenu. La qualité
perçue doit venir du travail montré et de la précision de la mise en page.

### III. Le travail d'abord

- Les projets, illustrés par des captures réelles, sont le contenu principal du site.
- Les visuels de projets DOIVENT être présentés dans un cadre uniforme (même ratio, même fond
  neutre, même traitement), quelle que soit la source de l'image.
- Chaque étude de cas DOIT suivre l'ordre : problème → solution → rôle → impact → stack, et
  afficher statut, période et liens (live, store, code) quand ils existent.
- Aucune affirmation chiffrée sans source vérifiable dans les données du projet.

**Rationale** : un recruteur juge sur des preuves. La cohérence du cadre rend la grille lisible
malgré des captures hétérogènes.

### IV. Accessibilité et lisibilité

- Conformité WCAG 2.2 niveau AA minimum : contrastes (4.5:1 texte, 3:1 éléments d'interface),
  focus visible sur tout élément interactif, navigation complète au clavier, lien d'évitement.
- HTML sémantique : landmarks (`header`, `nav`, `main`, `footer`), hiérarchie de titres sans saut,
  textes alternatifs pertinents, libellés de formulaire explicites, erreurs annoncées.
- Thèmes clair et sombre : le thème suit le réglage système par défaut ; une bascule manuelle est
  disponible et mémorisée ; aucun flash de mauvais thème au chargement.
- Les deux thèmes DOIVENT respecter les mêmes exigences de contraste.

**Rationale** : un site lisible par tous est aussi un site plus clair pour tous.

### V. Bilingue, source unique de contenu

- Le site est disponible en français et en anglais, avec des URL distinctes par langue et un
  sélecteur de langue présent sur toutes les pages.
- Tout texte visible (interface, métadonnées, messages d'erreur, CV) DOIT passer par le système
  de traduction ; aucune chaîne en dur dans les composants.
- Le contenu (identité, projets, expériences, stack, CV) vit dans une seule source de données
  typée ; la page CV est générée depuis cette source, pas maintenue à part.
- Une clé de traduction manquante dans une langue DOIT faire échouer le build ou un contrôle
  automatisé.

**Rationale** : deux langues maintenues à la main divergent. Une source unique garantit que le
site et le CV restent identiques et à jour.

### VI. Performance et simplicité technique

- Rendu serveur par défaut ; un composant client n'est créé que s'il a besoin d'état,
  d'événements ou d'API navigateur, et il reste le plus petit possible.
- Images servies via `next/image` avec dimensions et `sizes` explicites ; aucune image décorative
  lourde.
- Objectif Lighthouse ≥ 95 dans chaque catégorie (performance, accessibilité, bonnes pratiques,
  SEO), mesuré sur mobile, pour l'accueil et une étude de cas.
- Toute nouvelle dépendance DOIT être justifiée dans le plan (besoin, alternative native écartée,
  poids). Les dépendances devenues inutiles sont retirées.

**Rationale** : un portfolio rapide et léger démontre la compétence technique qu'il présente.

## Contraintes techniques

- Stack : Next.js (App Router), React, TypeScript en mode strict, Tailwind CSS 4, pnpm.
- Déploiement : image Docker (Dockerfile du dépôt) ; toute variable d'environnement nouvelle est
  documentée (`.env.example` et README).
- Secrets (SMTP, jetons GitHub) uniquement côté serveur, jamais exposés au client.
- Le formulaire de contact envoie réellement les messages via le SMTP du propriétaire, avec
  validation côté serveur et protection anti-spam ; aucun formulaire factice.
- Les appels à des API externes (GitHub) sont mis en cache côté serveur et ont un état de repli
  qui n'empêche jamais l'affichage de la page.

## Workflow de développement et contrôles qualité

- Tout chantier suit le flux Spec Kit : spec → (clarify) → plan → tasks → implement.
- Pour tout changement d'interface significatif, une maquette HTML locale (non publiée en ligne)
  est validée par le propriétaire avant l'écriture du code UI.
- Le design system (couleurs, typographie, espacements, rayons, états) est défini sous forme de
  tokens dans un seul endroit et consommé par les composants ; pas de valeurs arbitraires
  dispersées.
- Avant de considérer une tâche UI terminée : `pnpm build` passe, vérification clavier et lecteur
  d'écran sommaire, contrôle des deux thèmes et des deux langues, contrôle mobile (≥ 360 px) et
  desktop.

## Governance

- Cette constitution prime sur les autres pratiques du projet. Chaque plan Spec Kit DOIT passer
  la porte « Constitution Check » ; toute dérogation est consignée dans la section
  « Complexity Tracking » du plan avec sa justification.
- Amendement : proposition écrite (via `/speckit-constitution`), rapport d'impact en tête de
  fichier, validation par le propriétaire du dépôt, puis mise à jour de la version.
- Versionnement sémantique : MAJOR pour la suppression ou la redéfinition incompatible d'un
  principe ; MINOR pour l'ajout d'un principe ou d'une section ou une extension notable ; PATCH
  pour les clarifications et corrections de formulation.
- Revue de conformité : chaque spec, plan et revue de code vérifie les principes I à VI ; une
  violation non justifiée bloque la fusion.

**Version**: 1.0.0 | **Ratified**: 2026-10-22 | **Last Amended**: 2026-10-22
