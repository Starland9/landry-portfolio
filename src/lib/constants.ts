import {
  Code2,
  Database,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Palette,
  Phone,
  Server,
  Smartphone,
  Twitter,
} from "lucide-react";

export const PERSONAL_INFO = {
  name: "Starland9",
  fullName: "Landry Simo",
  title: "Développeur Full-Stack",
  subtitle: "Full-Stack Developer & UI/UX Enthusiast",
  email: "contact@starland9.dev",
  github: "https://github.com/Starland9",
  linkedin: "https://www.linkedin.com/in/landry-simo-7b326122b/",
  twitter: "https://x.com/starland237",
  location: "Douala, Cameroun",
  bio: "Développeur passionné avec plus de 4 ans d'expérience dans la création d'applications web et mobiles performantes",
  tagline:
    "Je crée des expériences exceptionnelles qui allient performance, esthétique et innovation. Passionné par les technologies modernes et les interfaces utilisateur révolutionnaires.",
};

export const SKILLS = [
  { name: "React/Next.js", level: 95, category: "frontend" as const },
  { name: "TypeScript", level: 92, category: "frontend" as const },
  { name: "Node.js", level: 90, category: "backend" as const },
  { name: "Python", level: 85, category: "backend" as const },
  { name: "PostgreSQL", level: 85, category: "database" as const },
  { name: "MongoDB", level: 80, category: "database" as const },
  { name: "Docker", level: 75, category: "tools" as const },
  { name: "UI/UX Design", level: 88, category: "other" as const },
  { name: "Flutter", level: 80, category: "mobile" as const },
  { name: "Godot Engine", level: 70, category: "game" as const },
  { name: "Git", level: 90, category: "tools" as const },
  { name: "Tailwind CSS", level: 90, category: "frontend" as const },
];

export const BIG_SKILLS = [
  {
    name: "Frontend",
    icon: Code2,
    level: 95,
    color: "from-cyan-400 to-blue-500",
    technologies: ["Flutter", "Next.js", "TypeScript", "Tailwind"],
  },
  {
    name: "Backend",
    icon: Server,
    level: 90,
    color: "from-green-400 to-emerald-500",
    technologies: ["Django", "Node.js", "Python", "Express", "FastAPI"],
  },
  {
    name: "Database",
    icon: Database,
    level: 85,
    color: "from-orange-400 to-red-500",
    technologies: ["MySQL", "Firestore", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    name: "Mobile",
    icon: Smartphone,
    level: 80,
    color: "from-purple-400 to-pink-500",
    technologies: ["Flutter"],
  },
  {
    name: "DevOps",
    icon: Globe,
    level: 75,
    color: "from-yellow-400 to-orange-500",
    technologies: ["Docker", "Vercel", "GitHub Actions"],
  },
  {
    name: "UI/UX",
    icon: Palette,
    level: 88,
    color: "from-indigo-400 to-purple-500",
    technologies: ["Google Stitch"],
  },
  {
    name: "AI Coding",
    icon: Code2,
    level: 85,
    color: "from-slate-400 to-gray-500",
    technologies: ["GitHub Copilot", "Gemini", "ChatGPT", "Windsurf"],
  },
  {
    name: "Game Dev",
    icon: Code2,
    level: 70,
    color: "from-pink-400 to-red-500",
    technologies: ["Godot Engine"],
  },
];

export const TECH_STACK = [
  "Flutter",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "Godot Engine",
];

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: PERSONAL_INFO.github,
    icon: Github,
    color: "hover:text-white",
  },
  {
    name: "LinkedIn",
    url: PERSONAL_INFO.linkedin,
    icon: Linkedin,
    color: "hover:text-blue-400",
  },
  {
    name: "Twitter",
    url: PERSONAL_INFO.twitter,
    icon: Twitter,
    color: "hover:text-sky-400",
  },
];

export const CONTACT_INFO = [
  {
    icon: Mail,
    title: "Email",
    value: "contact@starland9.dev",
    href: "mailto:contact@starland9.dev",
  },
  {
    icon: Phone,
    title: "Téléphone",
    value: "+237 69 56 03 938",
    href: "tel:+237695603938",
  },
  {
    icon: MapPin,
    title: "Localisation",
    value: "Douala, Cameroun",
    href: "https://www.google.com/maps/place/Camtel+Bepanda/@4.0603497,9.6871023,14z/data=!4m10!1m2!2m1!1scamtel+epanda!3m6!1s0x10610d87b864f281:0x3dd2a700e79b988!8m2!3d4.0603497!4d9.7252111!15sCg1jYW10ZWwgZXBhbmRhWg8iDWNhbXRlbCBlcGFuZGGSASN0ZWxlY29tbXVuaWNhdGlvbnNfc2VydmljZV9wcm92aWRlcpoBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VSdGF6bHRUazVSRUFF4AEA-gEECAAQOA!16s%2Fg%2F11gf8g0dgv?hl=fr&entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D",
  },
];

export const NAVIGATION_ITEMS = [
  { name: "Accueil", href: "#hero" },
  { name: "À Propos", href: "#about" },
  { name: "Compétences", href: "#skills" },
  { name: "Projets", href: "#projects" },
  { name: "Contact", href: "#contact" },
];
export const EXPERIENCES = [
  {
    title: "Développeur Full-Stack",
    company: "OVVP CORP",
    period: "2024 - Présent",
    description: [
      "Développement d'applications mobiles avec Flutter",
      "Développement d'applications web modernes avec React/Next.js",
      "Architecture et optimisation de backends Node.js/Python",
      "Leadership technique sur des projets complexes",
    ],
  },
  {
    title: "Développeur Freelance",
    company: "A Mon Compte",
    period: "2021 - Présent",
    description: [
      "Création de sites web et applications mobiles pour divers clients",
      "Gestion complète du cycle de vie des projets",
      "Collaboration avec des designers et marketeurs",
      "Livraison de solutions performantes et évolutives",
    ],
  },
];

export const FEATURED_PROJECTS = [
  {
    id: "fais-mon-cv",
    title: "Fais Mon CV",
    headline:
      "Assistant CV propulsé par IA pour créer des dossiers de candidature irrésistibles.",
    description:
      "Plateforme de création de CV en ligne avec modèles personnalisables et export PDF alimentée par une IA avancée.",
    summary:
      "Fais Mon CV est une plateforme SaaS qui accompagne les candidats de bout en bout : de l'analyse du profil à la génération d'un CV prêt à envoyer grâce à un moteur IA contextuel.",
    problem:
      "Les candidats passent des heures à structurer et mettre en forme leur CV avec le risque d'oublier des éléments essentiels ou de manquer de cohérence visuelle.",
    solution:
      "Une expérience guidée qui combine assistant IA, templates modulaires et export PDF pixel-perfect pour produire un CV professionnel en quelques minutes.",
    impact: [
      "500+ CV générés en 3 semaines après le lancement bêta",
      "Temps moyen de création réduit par 4 grâce aux suggestions IA",
      "Score de satisfaction utilisateur de 96 % auprès des bêta-testeurs",
    ],
    features: [
      "Assistant IA pour structurer expériences, compétences et pitch",
      "Templates modulaires responsive personnalisables en temps réel",
      "Export PDF haute fidélité avec branding professionnel",
      "Tableau de bord analytics pour suivre téléchargements et conversions",
    ],
    role: [
      "Product design & recherche utilisateur",
      "Développement Next.js/TypeScript full-stack",
      "Intégration Firebase (auth, stockage, base de données)",
      "Mise en place du pipeline d'inférence IA serverless",
    ],
    timeline: "2024 · 4 semaines",
    team: "Solo project",
    status: "En production",
    technologies: [
      "Next.js 15",
      "TypeScript",
      "Framer Motion",
      "Tailwind CSS",
      "Firebase",
    ],
    image: "/images/projects/cv.jpg",
    liveUrl: "https://cv.starland9.dev",
    githubUrl: null,
    featured: true,
    category: "web",
    color: "from-cyan-500 to-purple-500",
  },
  {
    id: "njangiflow",
    title: "NjangiFlow",
    headline:
      "Digitalise les tontines africaines pour une gestion transparente et automatisée.",
    description:
      "La plateforme intuitive et sécurisée pour organiser, suivre et optimiser vos groupes d'épargne rotatifs. Simplifiez la gestion, renforcez la confiance.",
    summary:
      "NjangiFlow centralise la gestion des groupes d'épargne rotatifs en offrant un cockpit de pilotage temps réel pour les administrateurs et une application mobile-first pour les membres.",
    problem:
      "Les tontines sont souvent gérées avec des tableaux Excel et des conversations WhatsApp, entraînant erreurs de calcul, retards et manque de transparence.",
    solution:
      "Une application data-driven qui automatise les rappels, sécurise les transactions et rend chaque contribution traçable.",
    impact: [
      "120+ groupes actifs déployés en moins de deux mois",
      "Réduction de 80 % des erreurs de calcul et de répartition",
      "Suivi en temps réel des contributions avec export comptable",
    ],
    features: [
      "Gestion multi-groupes avec cycles et rôles personnalisables",
      "Calendrier automatisé et rappels de versements",
      "Wallet virtuel et conciliation en un clic",
      "Module analytique pour visualiser flux de trésorerie",
    ],
    role: [
      "Lead Frontend Next.js & design system",
      "Conception UX centrée sur la confiance",
      "Intégration temps réel avec Firebase & Cloud Functions",
    ],
    timeline: "2023 · 3 mois",
    team: "Équipe produit (3 devs · 1 PM · 1 UX)",
    status: "Pilote en production",
    technologies: [
      "Next.js 15",
      "TypeScript",
      "Framer Motion",
      "Tailwind CSS",
      "Firebase",
    ],
    image: "/images/projects/njangiflow.jpg",
    liveUrl: "https://njangiflow.starland9.dev",
    githubUrl: null,
    featured: true,
    category: "web",
    color: "from-teal-500 to-emerald-500",
  },
  {
    id: "tchokos",
    title: "Tchokos E-commerce",
    headline:
      "Une expérience e-commerce premium pour la mode urbaine camerounaise.",
    description:
      "Boutique en ligne spécialisée dans la vente des chaussures, vêtements et accessoires, offrant une expérience utilisateur fluide et sécurisée.",
    summary:
      "Tchokos modernise la vente de sneakers et d'accessoires haut de gamme avec une vitrine digitale immersive et un tunnel de conversion optimisé mobile-first.",
    problem:
      "Les boutiques physiques manquaient d'un canal digital capable de reproduire l'expérience premium et de gérer le stock en temps réel.",
    solution:
      "Une plateforme headless e-commerce basée sur Next.js avec gestion de catalogue, paiement mobile money et logistique intégrée.",
    impact: [
      "+68 % de conversion après 6 semaines",
      "Catalogue géré à 100 % depuis un back-office sécurisé",
      "Intégration paiement Mobile Money et suivi de livraison",
    ],
    features: [
      "Catalogue dynamique avec variantes et stocks en temps réel",
      "Tunnel d'achat optimisé mobile-first",
      "Notifications transactionnelles et suivi des commandes",
      "CMS headless pour gérer contenus marketing et lookbooks",
    ],
    role: [
      "Architecture front Next.js / Tailwind",
      "Intégration API commerce & passerelles de paiement",
      "Optimisations performance (ISR, images, caching)",
    ],
    timeline: "2022 · 6 semaines",
    team: "Studio digital (2 devs · 1 designer)",
    status: "En production",
    technologies: [
      "Next.js 15",
      "TypeScript",
      "Framer Motion",
      "Tailwind CSS",
      "Firebase",
    ],
    image: "/images/projects/tchokos.jpg",
    liveUrl: "https://tchokos.starland9.dev",
    githubUrl: null,
    featured: true,
    category: "web",
    color: "from-amber-500 to-rose-500",
  },
  {
    id: "kweekk",
    title: "KweekK",
    headline:
      "Le club digital qui démocratise les réductions exclusives en Afrique centrale.",
    description:
      "KWEEKK est une plateforme digitale socioéconomique qui permet à tout individu, groupe d'individus, société ou entreprise de profiter des RÉDUCTIONS EXCLUSIVES sur divers produits et services mis à leur disposition par les nombreux Partenaires du Réseau Croissance Plus International (PRCPI).",
    summary:
      "KweekK connecte membres et partenaires autour d'un programme de fidélité gamifié qui fluidifie l'accès aux réductions et simplifie la gestion des campagnes.",
    problem:
      "Les commerçants partenaires manquaient d'un canal digital fiable pour diffuser et mesurer l'impact de leurs offres exclusives.",
    solution:
      "Une application Flutter multi-tenant avec tableau de bord partenaire, validation sécurisée des coupons et analytics en temps réel.",
    impact: [
      "15 000+ téléchargements en 4 mois",
      "Augmentation de 45 % du taux d'utilisation des coupons",
      "Back-office partenaire simplifié pour 120 enseignes",
    ],
    features: [
      "Espace membre avec cartes de réduction dynamiques",
      "QR codes sécurisés et validation hors-ligne",
      "Module partenaire pour publier des offres en temps réel",
      "Tableau de bord analytics pour suivre les conversions",
    ],
    role: [
      "Lead Flutter engineer & intégration API",
      "Mise en place d'une architecture clean & state management",
      "Coordination avec l'équipe produit sur la roadmap mobile",
    ],
    timeline: "2022 · 4 mois",
    team: "Équipe mobile (2 devs · 1 QA · 1 PO)",
    status: "App store live",
    technologies: ["Flutter", "Dart", "REST API"],
    image: "/images/projects/kweekk.jpg",
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.ovvpcorp.kweekk&pcampaignid=web_share",
    githubUrl: null,
    featured: true,
    category: "mobile",
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: "isyjob",
    title: "IsyJob",
    headline:
      "Marketplace de services qui connecte prestataires et particuliers en temps réel.",
    description:
      "ISYJOB, application socio-économique et innovante qui met en relation des personnes qui ont des services à offrir (isyworkers) ex : plombiers, électriciens, bricoleurs, maître de cérémonie etc…avec des personnes qui ont besoin de ces services (isyers).",
    summary:
      "IsyJob structure l'économie des services de proximité en proposant une place de marché géolocalisée, sécurisée et pilotée par la donnée.",
    problem:
      "Les prestataires informels peinent à trouver des clients qualifiés tandis que les particuliers doutent de la fiabilité des intervenants.",
    solution:
      "Une application mobile qui fait matcher offres et demandes à partir des compétences, de la localisation et des avis vérifiés.",
    impact: [
      "10 000+ comptes créés en 3 mois",
      "35 % de missions répétées grâce au système d'avis",
      "Déploiement multi-pays avec support multilingue",
    ],
    features: [
      "Matching géolocalisé instantané basé sur les compétences",
      "Portefeuille sécurisé et gestion des paiements",
      "Chat in-app temps réel entre isyers et isyworkers",
      "Tableau de bord pour suivre missions et revenus",
    ],
    role: [
      "Architecture mobile & intégration backend REST",
      "UX research terrain pour simplifier l'onboarding",
      "Mise en place CI/CD avec Firebase App Distribution",
    ],
    timeline: "2021 · 5 mois",
    team: "Startup crew (3 devs · 1 designer · 1 PM)",
    status: "En production",
    technologies: ["Flutter", "Dart", "REST API", "Firebase"],
    image: "/images/projects/isyjob.jpg",
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.ovvpcorp.isyjob&pcampaignid=web_share",
    githubUrl: null,
    featured: true,
    category: "mobile",
    color: "from-sky-500 to-blue-500",
  },
  {
    id: "mbolo-gabon",
    title: "Mbolo Gabon",
    headline:
      "Guide touristique immersif pour explorer le Gabon en toute confiance.",
    description:
      "Application de référencement d'établissements touristiques au Gabon, regroupant les thématiques de manger, dormir et s'amuser. Offrant une visibilité aux professionnels et une totale autonomie au particulier avec en prime la géolocalisation de tout les établissements .",
    summary:
      "Mbolo Gabon fédère les acteurs du tourisme autour d'une application qui centralise l'offre, simplifie la découverte et accompagne les voyageurs sur le terrain.",
    problem:
      "Les voyageurs manquaient d'informations fiables et consolidées sur les établissements, tandis que les professionnels avaient peu de visibilité digitale.",
    solution:
      "Un guide tout-en-un avec cartographie offline, fiches détaillées et outils marketing pour les établissements.",
    impact: [
      "8 000+ établissements référencés au lancement",
      "Temps de recherche réduit de 60 % pour les utilisateurs",
      "Activation d'une stratégie data-driven pour le ministère du tourisme",
    ],
    features: [
      "Recherche multicritère (budget, thématique, localisation)",
      "Cartographie interactive avec mode hors-ligne",
      "Espace pro pour gérer fiches et disponibilités",
      "Système d'avis et listes de favoris synchronisées",
    ],
    role: [
      "Lead Flutter dev & intégration cartographie",
      "Gestion du cache offline et synchronisation",
      "Coordination avec l'équipe contenu & marketing",
    ],
    timeline: "2020 · 3 mois",
    team: "Consortium tourisme (2 devs · 1 data manager)",
    status: "En production",
    technologies: ["Flutter", "Dart", "REST API", "Firebase"],
    image: "/images/projects/mbolo-gabon.jpg",
    liveUrl:
      "https://play.google.com/store/apps/details?id=io.pekegno.mbolo&pcampaignid=web_share",
    githubUrl: null,
    featured: true,
    category: "mobile",
    color: "from-green-500 to-lime-500",
  },
  {
    id: "2ln-ai",
    title: "2LN AI",
    headline:
      "Assistant juridique IA qui démocratise le droit du travail pour tous.",
    description:
      "Vous avez des questions sur votre contrat de travail, vos droits en tant que salarié ou les obligations de votre employeur ? Obtenez des réponses claires et rapides grâce à notre assistant intelligent spécialisé en droit du travail.",
    summary:
      "2LN AI combine une application mobile fluide et un moteur RAG entraîné sur la législation locale pour délivrer des réponses fiables en quelques secondes.",
    problem:
      "Les salariés manquent d'accès rapide à des conseils juridiques personnalisés sans passer par des consultations coûteuses.",
    solution:
      "Un chatbot juridique spécialisé qui contextualise chaque question, propose des modèles de courrier et renvoie vers les textes officiels.",
    impact: [
      "5 000+ consultations individuelles le premier mois",
      "98 % de satisfaction utilisateur sur le support",
      "Temps moyen de réponse inférieur à 10 secondes",
    ],
    features: [
      "Chat IA contextualisé adossé à un pipeline RAG",
      "Bibliothèque de cas pratiques et modèles de lettres",
      "Mode conversation multilingue et offline",
      "Dashboard admin pour monitorer dataset et feedback",
    ],
    role: [
      "Architecture Flutter multi-plateforme",
      "Développement backend Python & pipeline RAG",
      "Mise en place vector database et MLOps légers",
    ],
    timeline: "2024 · 6 semaines",
    team: "Équipe IA (2 devs · 1 juriste · 1 PM)",
    status: "En production",
    technologies: [
      "Flutter",
      "Dart",
      "REST API",
      "Firebase",
      "Python",
      "RAG",
      "ML",
    ],
    image: "/images/projects/2ln-ai.jpg",
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.lnexpertise.ia&pcampaignid=web_share",
    githubUrl: null,
    featured: true,
    category: "mobile",
    color: "from-slate-500 to-purple-500",
  },
  {
    id: "omoh",
    title: "OMOH",
    headline:
      "Pilote vos dépenses Mobile Money grâce à une analyse intelligente de vos SMS.",
    description:
      "Vous recevez des SMS de confirmation Orange Money ou MTN Mobile Money et vous perdez le fil de vos dépenses ? Cette application est faite pour vous !",
    summary:
      "OMOH catégorise automatiquement les transactions Mobile Money, génère des rapports temps réel et aide les utilisateurs à reprendre le contrôle de leur budget.",
    problem:
      "Les utilisateurs n'ont aucun tableau de bord consolidé pour leurs nombreuses transactions Mobile Money.",
    solution:
      "Une application offline-first qui parse les SMS, enrichit les données et produit des insights actionnables.",
    impact: [
      "Analyse automatique de 20 000 SMS par mois",
      "40 % de réduction du temps de rapprochement comptable",
      "Note moyenne 4,6/5 sur le Play Store",
    ],
    features: [
      "Parsing intelligent des SMS Orange & MTN",
      "Tableaux de bord budget en temps réel",
      "Alertes personnalisées sur les dépassements",
      "Export CSV et rapports mensuels",
    ],
    role: [
      "Développement Flutter & implémentation NLP offline",
      "Sécurisation des données (chiffrement, sandbox)",
      "Product discovery avec power users",
    ],
    timeline: "2021 · 2 mois",
    team: "Side project (2 devs)",
    status: "Disponible sur Play Store",
    technologies: ["Flutter", "Dart"],
    image: "/images/projects/omoh.webp",
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.ozosotf.omoh&pcampaignid=web_share",
    githubUrl: null,
    featured: true,
    category: "mobile",
    color: "from-orange-500 to-amber-500",
  },
  {
    id: "kamte",
    title: "Kamte",
    headline:
      "Coach financier personnel pour suivre et optimiser chaque dépense.",
    description:
      "Kamte est une application mobile de gestion des sorties et entrées financières personnelles. L'objectif de l'application est de vous permettre de maîtriser vos dépenses quotidiennes et de mieux suivre vos revenus.",
    summary:
      "Kamte aide les utilisateurs à piloter leur budget quotidien avec une vision claire des flux, des rappels intelligents et des recommandations personnalisées.",
    problem:
      "Le suivi manuel des dépenses personnelles décourage les utilisateurs et manque de visibilité consolidée.",
    solution:
      "Une application intuitive avec catégorisation automatique, dashboards et export comptable.",
    impact: [
      "30 000+ transactions suivies la première année",
      "Taux de rétention à 90 jours supérieur à 62 %",
      "Support multi-devises et synchronisation cloud",
    ],
    features: [
      "Suivi multi-comptes et budgets intelligents",
      "Analyse des habitudes de dépenses avec insights IA",
      "Rappels automatiques et widgets iOS/Android",
      "Export PDF et CSV pour comptabilité personnelle",
    ],
    role: [
      "Product design & UX",
      "Développement Flutter avec architecture BLoC",
      "Mise en place d'analytics et crash reporting",
    ],
    timeline: "2020 · 2 mois",
    team: "Solo project",
    status: "En production",
    technologies: ["Flutter", "Dart"],
    image: "/images/projects/kamte.jpg",
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.kamte.app&pcampaignid=web_share",
    githubUrl: null,
    featured: true,
    category: "mobile",
    color: "from-rose-500 to-red-500",
  },
  {
    id: "landflix",
    title: "Landflix",
    headline: "Votre plateforme de de téléchargement pour les films et séries.",
    description:
      "Landflix est une application mobile de gestion des téléchargements de films et séries. L'objectif de l'application est de vous permettre de maîtriser vos téléchargements et de mieux suivre vos contenus préférés.",
    summary:
      "Découvrez et téléchargez vos films et séries préférés avec une expérience moderne, intuitive et disponible sur tous vos appareils.",
    problem:
      "Les accès aux films et séries sont souvent limités par des plateformes peu flexibles et des options de téléchargement restreintes.",
    solution:
      "Une application mobile qui centralise les contenus, optimise les téléchargements et offre une expérience utilisateur fluide.",
    impact: [
      "15 000+ téléchargements la première année",
      "Taux de rétention à 90 jours supérieur à 55 %",
      "Support multi-plateformes",
    ],
    features: [
      "Catalogue de films et séries avec options de téléchargement",
      "Gestion des téléchargements avec priorités et files d'attente",
      "Interface utilisateur moderne et intuitive",
      "Support multi-plateformes",
    ],
    role: [
      "Product design & UX",
      "Développement Flutter avec architecture BLoC",
    ],
    timeline: "2025 · 2 mois",
    team: "Solo project",
    status: "En production",
    technologies: ["Flutter", "Dart"],
    image: "/images/projects/landflix.jpg",
    liveUrl: "https://starland9.github.io/landflix-landing/",
    githubUrl: "https://github.com/Starland9/LandFlix",
    featured: true,
    category: "mobile",
    color: "from-violet-700 to-purple-900",
  },
];
