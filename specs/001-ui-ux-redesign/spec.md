# Feature Specification: Refonte UI/UX du portfolio

**Feature Branch**: `001-ui-ux-redesign`

**Created**: 2026-10-22

**Status**: Draft

**Input**: User description: "Refonte complète de l'UI/UX du portfolio de Landry Simo. Le site actuel
fait « généré par IA » (glassmorphisme, particules, curseur custom, typewriter, dégradés
cyan/violet, badges qui pulsent). Objectif : un site neuf, sobre, sans aucun effet spécial, où le
visiteur comprend immédiatement où il se trouve et quoi faire. Cible : recruteurs d'abord, clients
freelance en second. Grille de cas visuels, cadre uniforme pour les captures. Accueil, /work,
/work/[projet], /about, /cv. Bilingue FR/EN, thème clair/sombre automatique, micro-transitions
uniquement, formulaire de contact réellement envoyé par le SMTP personnel de Landry."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Comprendre qui est Landry en arrivant (Priority: P1)

Une recruteuse ouvre le lien du portfolio reçu dans une candidature. Sans défiler, elle lit le nom
de Landry, son métier, sa spécialité (web et mobile en production), sa localisation et sa
disponibilité. Elle voit trois actions claires : voir les projets, voir le CV, le contacter. En
défilant, elle découvre une grille de 6 projets phares illustrés par de vraies captures, puis un
bloc de contact.

**Why this priority**: c'est la première impression et la raison d'être du site. Si l'accueil
n'est pas clair, le reste n'est jamais vu.

**Independent Test**: ouvrir l'accueil sur mobile et sur desktop, chronométrer 5 secondes, puis
demander au testeur qui est la personne, ce qu'elle fait et ce qu'il peut faire ensuite.

**Acceptance Scenarios**:

1. **Given** un visiteur arrive sur l'accueil, **When** la page s'affiche, **Then** le nom, le
   métier, la spécialité et les trois actions (projets, CV, contact) sont visibles sans défiler
   sur un écran de 360 × 640 px et plus.
2. **Given** l'accueil est affiché, **When** le visiteur défile, **Then** il voit les 6 projets
   phares, chacun avec une capture dans un cadre de même format, un titre, une phrase d'accroche,
   le type (web / mobile / autre) et l'année.
3. **Given** le visiteur clique sur un projet de la grille, **When** la page s'ouvre, **Then** il
   arrive sur l'étude de cas de ce projet.
4. **Given** le visiteur est un client potentiel, **When** il lit l'accueil, **Then** il trouve
   une mention secondaire indiquant que Landry accepte aussi des missions freelance.

---

### User Story 2 - Lire une étude de cas (Priority: P1)

Le recruteur veut des preuves. Il ouvre l'étude de cas d'un projet et lit, dans l'ordre : le
problème, la solution, le rôle de Landry, l'impact, la stack. Il voit le statut du projet, la
période, l'équipe, et les liens vers la version en ligne, le store ou le code quand ils existent.
Un fil d'Ariane lui indique où il se trouve et lui permet de revenir à la liste des projets.

**Why this priority**: c'est ici que le recruteur évalue le niveau réel. Avec l'accueil, c'est le
minimum utile du site.

**Independent Test**: ouvrir directement l'URL d'une étude de cas, vérifier l'ordre des sections,
la présence des métadonnées et le fonctionnement du fil d'Ariane et des liens externes.

**Acceptance Scenarios**:

1. **Given** une étude de cas est ouverte, **When** la page s'affiche, **Then** le titre du
   projet, le fil d'Ariane (Accueil › Projets › Nom du projet) et l'élément « Projets » actif dans
   la navigation indiquent où se trouve le visiteur.
2. **Given** une étude de cas, **When** le visiteur la parcourt, **Then** les sections
   apparaissent dans l'ordre problème → solution → rôle → impact → stack.
3. **Given** un projet sans lien de code public, **When** l'étude de cas s'affiche, **Then** aucun
   lien de code vide ou cassé n'apparaît.
4. **Given** la fin d'une étude de cas, **When** le visiteur y arrive, **Then** il peut aller au
   projet suivant, revenir à la liste ou contacter Landry.

---

### User Story 3 - Consulter et imprimer le CV (Priority: P2)

Une recruteuse veut le CV pour le transmettre en interne. Depuis l'accueil, elle ouvre la page CV,
la lit à l'écran, puis l'imprime ou l'enregistre en PDF depuis son navigateur. Le document imprimé
est propre : pas de navigation, pas de fond sombre, mise en page de CV.

**Why this priority**: recruteurs d'abord. Le CV est l'objet que l'on fait circuler.

**Independent Test**: ouvrir la page CV dans chaque langue, lancer l'impression et vérifier le
rendu PDF.

**Acceptance Scenarios**:

1. **Given** la page CV est ouverte, **When** elle s'affiche, **Then** elle présente identité,
   coordonnées, résumé, expériences, projets sélectionnés, stack, formation et langues parlées,
   issus des mêmes données que le reste du site.
2. **Given** la page CV, **When** le visiteur imprime ou enregistre en PDF, **Then** le document
   tient sur 2 pages A4 au maximum, en thème clair, sans éléments de navigation ni boutons.
3. **Given** un projet ou une expérience est modifié dans les données du site, **When** la page CV
   est consultée, **Then** elle reflète la modification sans autre intervention.
4. **Given** la page CV en français, **When** elle est imprimée, **Then** tout le contenu est en
   français ; idem en anglais.

---

### User Story 4 - Contacter Landry (Priority: P2)

Un recruteur ou un client remplit le formulaire de contact : nom, e-mail, motif (poste, mission
freelance, autre) et message. Il reçoit une confirmation claire. Landry reçoit le message dans sa
boîte mail, avec l'adresse de l'expéditeur en réponse directe.

**Why this priority**: c'est la conversion du site. Aujourd'hui le formulaire est factice et fait
perdre des contacts.

**Independent Test**: envoyer un message réel depuis le site et vérifier sa réception ; provoquer
une erreur d'envoi et vérifier le repli.

**Acceptance Scenarios**:

1. **Given** un formulaire correctement rempli, **When** le visiteur l'envoie, **Then** un message
   de succès s'affiche et Landry reçoit l'e-mail avec le nom, l'e-mail, le motif, le message et la
   langue du visiteur.
2. **Given** un champ invalide ou manquant, **When** le visiteur envoie, **Then** l'erreur est
   indiquée à côté du champ concerné, annoncée aux technologies d'assistance, et la saisie est
   conservée.
3. **Given** l'envoi échoue côté serveur, **When** le visiteur envoie, **Then** un message d'erreur
   explique la situation et propose l'adresse e-mail directe, sans perdre le message saisi.
4. **Given** un robot remplit le champ piège ou un même expéditeur envoie trop de messages,
   **When** l'envoi est tenté, **Then** aucun e-mail n'est transmis à Landry.

---

### User Story 5 - Lire le site dans sa langue (Priority: P2)

Un visiteur francophone arrive et voit le site en français ; un visiteur anglophone le voit en
anglais. Chacun peut changer de langue depuis n'importe quelle page et reste sur la même page
dans l'autre langue.

**Why this priority**: la cible couvre le marché francophone (Cameroun, Afrique, France) et le
remote international.

**Independent Test**: ouvrir le site avec un navigateur réglé en français puis en anglais, changer
de langue sur une étude de cas, vérifier l'URL et le contenu.

**Acceptance Scenarios**:

1. **Given** un navigateur réglé en français, **When** le visiteur arrive sur l'adresse racine,
   **Then** il est dirigé vers la version française ; pour toute autre langue, vers la version
   anglaise.
2. **Given** le visiteur est sur l'étude de cas d'un projet, **When** il change de langue,
   **Then** il arrive sur la même étude de cas dans l'autre langue.
3. **Given** une page dans une langue, **When** elle s'affiche, **Then** aucun texte visible de
   l'interface n'apparaît dans l'autre langue.
4. **Given** le visiteur a choisi une langue manuellement, **When** il revient plus tard sur
   l'adresse racine, **Then** sa langue choisie est conservée.

---

### User Story 6 - Parcourir tous les projets (Priority: P3)

Un visiteur veut voir l'ensemble du travail. La page Projets affiche les 17 projets dans la même
grille que l'accueil, avec un filtre par type (tous, web, mobile, autre).

**Why this priority**: utile pour approfondir, mais l'accueil montre déjà les projets phares.

**Independent Test**: ouvrir la page Projets, appliquer chaque filtre, vérifier le nombre de
projets affichés et que le filtre est reflété dans l'URL.

**Acceptance Scenarios**:

1. **Given** la page Projets, **When** elle s'affiche, **Then** tous les projets apparaissent,
   les plus récents d'abord, et le nombre de projets est indiqué.
2. **Given** le visiteur choisit le filtre « Mobile », **When** le filtre s'applique, **Then**
   seuls les projets mobiles sont affichés, le filtre actif est visible et l'URL permet de
   partager cette vue filtrée.
3. **Given** un filtre ne correspond à aucun projet, **When** il est appliqué, **Then** un message
   l'indique et propose de revenir à « Tous ».

---

### User Story 7 - En savoir plus sur Landry (Priority: P3)

Le visiteur ouvre la page À propos : un texte de présentation, le parcours (expériences), la stack
technique regroupée par domaine, des statistiques GitHub à jour, et un petit jeu de morpion
clairement présenté comme un bonus.

**Why this priority**: renforce la confiance, mais n'est pas nécessaire pour la décision initiale.

**Independent Test**: ouvrir la page À propos, vérifier chaque bloc, puis simuler une
indisponibilité du service GitHub.

**Acceptance Scenarios**:

1. **Given** la page À propos, **When** elle s'affiche, **Then** elle montre présentation,
   expériences (poste, entreprise, période, réalisations), stack par domaine et statistiques
   GitHub.
2. **Given** le service GitHub est indisponible, **When** la page s'affiche, **Then** le reste de
   la page s'affiche normalement et le bloc statistiques montre les dernières valeurs connues ou
   un message discret.
3. **Given** le jeu de morpion, **When** le visiteur y joue au clavier ou à la souris, **Then** il
   est entièrement jouable et accessible, et ne s'affiche pas avant le contenu principal.

---

### User Story 8 - Lire dans le thème de son choix (Priority: P3)

Le site s'affiche en clair ou en sombre selon le réglage de l'appareil. Le visiteur peut basculer
manuellement ; son choix est retenu lors des visites suivantes.

**Why this priority**: confort de lecture ; le site reste utilisable sans cette fonction.

**Independent Test**: changer le réglage système, recharger ; basculer manuellement, recharger.

**Acceptance Scenarios**:

1. **Given** un appareil en mode sombre et aucun choix manuel, **When** le site se charge,
   **Then** il s'affiche en sombre dès le premier affichage, sans flash clair.
2. **Given** le visiteur bascule en thème clair, **When** il revient plus tard, **Then** le thème
   clair est conservé.

---

### Edge Cases

- Une capture de format très différent du cadre (bandeau multi-écrans, photo verticale) : elle
  remplit le cadre et ses bords sont rognés, jamais déformée. Une capture très petite (ex. icône de
  240 px) est affichée entière, centrée sur un fond neutre, jamais agrandie au point d'être floue.
- Une image de projet manquante : le cadre affiche le nom du projet sur fond neutre, sans icône
  d'image cassée.
- Un identifiant de projet inconnu dans l'URL : page « introuvable » dans la langue courante, avec
  liens vers l'accueil et la liste des projets.
- Une langue de navigateur non prise en charge (ex. allemand) : version anglaise.
- Textes français plus longs que l'anglais : aucun débordement ni texte coupé de 360 px à 1920 px.
- JavaScript désactivé : contenu, navigation, études de cas et CV restent lisibles ; le thème suit
  le réglage système ; le formulaire peut toujours être envoyé.
- Impression du CV alors que le site est en thème sombre : impression en clair.
- Photo de Landry pas encore fournie : l'accueil reste équilibré sans photo, sans espace vide.
- Envois répétés du formulaire (double clic) : un seul e-mail est envoyé.
- Préférence « réduire les animations » active : aucune transition, même au survol.

## Requirements *(mandatory)*

### Functional Requirements

**Structure et orientation**

- **FR-001**: Le site DOIT comporter les pages Accueil, Projets, Étude de cas (une par projet),
  À propos et CV, dans chaque langue.
- **FR-002**: Chaque page DOIT afficher un titre principal explicite, un titre de document unique,
  et la navigation principale DOIT signaler la page courante.
- **FR-003**: Les pages Étude de cas DOIVENT afficher un fil d'Ariane.
- **FR-004**: La navigation principale DOIT donner accès en un clic à Projets, À propos, CV et
  Contact, ainsi qu'au sélecteur de langue et au sélecteur de thème, sur toutes les pages et
  toutes les tailles d'écran.
- **FR-005**: Les anciennes adresses de la liste des projets et de chaque projet DOIVENT rediriger
  de façon permanente vers leur nouvelle adresse.

**Accueil**

- **FR-006**: L'accueil DOIT présenter sans défilement (dès 360 × 640 px) : nom, métier,
  spécialité, localisation, statut de disponibilité, et trois actions : voir les projets, voir le
  CV, contacter.
- **FR-007**: L'accueil DOIT mentionner l'offre freelance de façon secondaire par rapport au
  message destiné aux recruteurs.
- **FR-008**: L'accueil DOIT afficher les 6 projets marqués comme phares dans les données, sous
  forme de grille de cartes.
- **FR-009**: L'accueil DOIT prévoir l'emplacement d'une photo de Landry et rester équilibré tant
  que la photo n'est pas fournie.
- **FR-010**: L'accueil DOIT contenir le bloc de contact (formulaire et coordonnées directes).

**Projets et études de cas**

- **FR-011**: Chaque carte de projet DOIT montrer la capture dans un cadre uniforme (même ratio
  pour tous les projets, image remplissant le cadre sans déformation), le titre, l'accroche, le
  type et l'année, et DOIT être entièrement cliquable vers l'étude de cas.
- **FR-012**: La page Projets DOIT lister tous les projets du plus récent au plus ancien, afficher
  leur nombre et proposer un filtre Tous / Web / Mobile / Autre dont l'état est reflété dans l'URL.
- **FR-013**: L'étude de cas DOIT présenter, dans cet ordre : en-tête (titre, accroche, statut,
  période, équipe, liens), capture, problème, solution, rôle, impact, fonctionnalités clés, stack.
- **FR-014**: Les liens d'une étude de cas (en ligne, store, code) NE DOIVENT apparaître que s'ils
  existent, et les liens externes DOIVENT être identifiables comme tels.
- **FR-015**: Chaque étude de cas DOIT proposer en fin de page : projet suivant, retour à la liste,
  et contact.

**À propos**

- **FR-016**: La page À propos DOIT présenter un texte de présentation, les expériences, la stack
  technique groupée par domaine, des statistiques GitHub et le jeu de morpion étiqueté comme bonus.
- **FR-017**: Les statistiques GitHub DOIVENT être rafraîchies au plus toutes les heures et leur
  indisponibilité NE DOIT jamais empêcher l'affichage de la page.

**CV**

- **FR-018**: La page CV DOIT être générée à partir des mêmes données que le reste du site
  (identité, coordonnées, résumé, expériences, projets sélectionnés, stack, formation, langues
  parlées). La formation et les langues sont ajoutées aux données du site et affichées aussi sur la
  page À propos.
- **FR-019**: La page CV DOIT proposer une action « Imprimer / Enregistrer en PDF » et produire à
  l'impression un document en thème clair, sans navigation ni boutons, sur 2 pages A4 maximum.

**Contact**

- **FR-020**: Le formulaire DOIT demander nom, e-mail, motif (Poste / Mission freelance / Autre) et
  message, avec validation côté client et côté serveur.
- **FR-021**: Un message valide DOIT être réellement transmis à la boîte de Landry via son serveur
  d'envoi d'e-mails personnel, avec l'adresse du visiteur comme adresse de réponse.
- **FR-022**: Le formulaire DOIT rejeter silencieusement les soumissions dont le champ piège est
  rempli, et limiter le nombre d'envois par expéditeur (5 par heure).
- **FR-023**: Le formulaire DOIT afficher un état d'envoi, un message de succès, et en cas d'échec
  un message d'erreur avec l'adresse e-mail directe, sans perdre la saisie.
- **FR-024**: Le formulaire DOIT pouvoir être envoyé sans JavaScript.

**Langues**

- **FR-025**: Le site DOIT exister en français et en anglais, avec une adresse distincte par
  langue pour chaque page.
- **FR-026**: L'adresse racine DOIT diriger vers la langue préférée du navigateur (français si le
  français est préféré, anglais sinon), sauf si le visiteur a déjà choisi une langue.
- **FR-027**: Le sélecteur de langue DOIT conduire à la même page dans l'autre langue.
- **FR-028**: Tous les textes visibles (interface, contenu des projets, expériences, CV, messages
  d'erreur, titres de documents, aperçus de partage) DOIVENT exister dans les deux langues ; un
  texte manquant dans une langue DOIT être détecté avant mise en ligne.

**Thème et mouvement**

- **FR-029**: Le site DOIT proposer un thème clair et un thème sombre, suivre le réglage de
  l'appareil par défaut, permettre une bascule manuelle mémorisée, et ne jamais afficher le
  mauvais thème au chargement.
- **FR-030**: Les seuls mouvements autorisés sont les retours visuels d'interaction (survol, focus,
  pression, changement de thème, ouverture d'un menu), d'une durée de 200 ms au plus, et ils
  DOIVENT être supprimés quand le visiteur a demandé de réduire les animations.
- **FR-031**: Le site NE DOIT contenir aucun des éléments suivants : particules, curseur
  personnalisé, effet de verre dépoli, dégradés décoratifs, texte tapé lettre à lettre,
  apparitions au défilement, parallaxe, halos lumineux, indicateurs animés en boucle, transitions
  entre pages.

**Accessibilité, partage et référencement**

- **FR-032**: Le site DOIT respecter le niveau AA des règles d'accessibilité WCAG 2.2 dans les
  deux thèmes : contrastes, focus visible, navigation complète au clavier, lien d'accès direct au
  contenu, structure de titres sans saut, textes alternatifs pertinents.
- **FR-033**: Chaque page DOIT avoir, dans chaque langue, un titre, une description et un aperçu de
  partage (image, titre, description) propres, et indiquer aux moteurs de recherche l'existence de
  sa version dans l'autre langue.
- **FR-034**: Les captures de projets DOIVENT être servies dans une taille adaptée à l'écran du
  visiteur.

### Key Entities

- **Profil** : identité de Landry (nom complet, pseudonyme, métier, spécialité, localisation,
  statut de disponibilité, résumé, photo optionnelle, coordonnées, liens sociaux), dans les deux
  langues.
- **Projet** : identifiant stable (utilisé dans l'adresse), titre, accroche, description, problème,
  solution, rôle, impact, fonctionnalités, stack, type (web / mobile / autre), période, équipe,
  statut, capture, liens (en ligne, store, code), marqueur « phare ». Textes dans les deux langues.
- **Expérience** : poste, entreprise, période, réalisations, dans les deux langues.
- **Stack** : technologies groupées par domaine (mobile, web, backend, données, outils).
- **Formation** : diplôme ou certification, établissement, période, dans les deux langues.
- **Langue parlée** : langue et niveau, dans les deux langues.
- **Message de contact** : nom, e-mail, motif, message, langue du visiteur, horodatage ; transmis
  par e-mail, non stocké sur le site.
- **Statistiques GitHub** : nombre de dépôts publics, abonnés, ancienneté du compte, date de mise à
  jour.
- **Préférences du visiteur** : langue choisie, thème choisi ; conservées sur l'appareil du
  visiteur uniquement.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Lors d'un test de 5 secondes sur l'accueil avec au moins 5 personnes, au moins 4
  savent dire qui est Landry, quel est son métier et citer une action possible.
- **SC-002**: Depuis l'accueil, une étude de cas, le CV et le formulaire de contact sont chacun
  atteignables en 1 action (clic ou lien d'ancre).
- **SC-003**: L'accueil, la page Projets, une étude de cas et la page CV obtiennent au moins
  95/100 aux audits standards de performance, accessibilité, bonnes pratiques et référencement,
  mesurés sur mobile, dans les deux langues.
- **SC-004**: Aucune erreur de niveau A ou AA n'est relevée par un audit d'accessibilité
  automatisé sur l'ensemble des pages, dans les deux thèmes, et toutes les pages sont parcourables
  intégralement au clavier.
- **SC-005**: Le contenu principal de chaque page s'affiche en moins de 2,5 secondes sur une
  connexion mobile moyenne.
- **SC-006**: Sur 10 envois de test valides, 10 messages arrivent dans la boîte de Landry en moins
  d'une minute ; sur 10 envois avec champ piège rempli, aucun n'arrive.
- **SC-007**: 100 % des textes visibles existent en français et en anglais (zéro texte manquant
  détecté).
- **SC-008**: Le CV imprimé dans chaque langue tient sur 2 pages A4 au maximum et ne contient aucun
  élément de navigation.
- **SC-009**: En chargeant chaque page sans interagir, aucun élément ne bouge à l'écran.
- **SC-010**: Les 17 anciennes adresses de projets et l'ancienne liste répondent par une
  redirection permanente vers la bonne nouvelle adresse.
- **SC-011**: Aucune page ne présente de défilement horizontal ni de texte tronqué entre 360 px et
  1920 px de large.

## Assumptions

- Les 6 projets actuellement marqués « phares » dans les données (Secret, G-Buy, KweekK, IsyJob,
  Warehouse Stock Manager, 2LN Learning Institute) sont ceux de l'accueil.
- Les catégories actuelles sont ramenées à trois types : Web, Mobile, Autre (le projet « Bot »
  passe dans Autre).
- La traduction française du contenu existant (projets, expériences, profil) est produite dans le
  cadre de ce chantier puis relue par Landry ; le contenu anglais n'est pas réécrit.
- L'adresse de réception des messages est contact@starland9.dev ; les identifiants du serveur
  d'envoi sont fournis par Landry au moment du déploiement.
- La photo de Landry sera fournie plus tard ; le site est livrable sans elle.
- Les données de formation et de langues parlées sont fournies par Landry ; en attendant, des
  valeurs à compléter sont clairement marquées et la rubrique est masquée si elle est vide.
- Le statut de disponibilité est une valeur fixe dans les données, modifiée manuellement.
- Les captures existantes sont conservées telles quelles ; seule leur présentation change.
- Les choix de langue et de thème sont stockés sur l'appareil du visiteur, sans compte ni suivi.
- L'interface publique de données projets existante (documentée dans docs/API_PROJECTS.md) est
  conservée sans changement.
- Une maquette visuelle locale de l'accueil et d'une étude de cas, en clair et en sombre, est
  validée par Landry avant l'écriture du code d'interface.
- Hors périmètre : blog, nouvelles captures, réécriture du contenu anglais des études de cas,
  statistiques d'audience.
