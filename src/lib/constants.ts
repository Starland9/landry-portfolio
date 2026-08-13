import {
  Code2,
  Database,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Server,
  Smartphone,
  Twitter,
} from "lucide-react";

export const PERSONAL_INFO = {
  name: "Starland9",
  fullName: "Landry Simo",
  title: "Software Engineer",
  subtitle: "Flutter · Django · Next.js",
  email: "contact@starland9.dev",
  github: "https://github.com/Starland9",
  linkedin: "https://www.linkedin.com/in/landry-simo9/",
  twitter: "https://x.com/starland237",
  location: "Douala, Cameroon",
  bio: "Software engineer with 4+ years of experience building production web and mobile applications. Specialized in Flutter for mobile, Django and Next.js for web, with strong backend ownership across REST API design, PostgreSQL, and deployment.",
  tagline:
    "I build production web and mobile applications — Flutter for mobile, Django and Next.js on the backend and web.",
};

export const SKILLS = [
  { name: "Flutter", category: "mobile" as const },
  { name: "Dart", category: "mobile" as const },
  { name: "Next.js", category: "frontend" as const },
  { name: "React", category: "frontend" as const },
  { name: "TypeScript", category: "frontend" as const },
  { name: "Tailwind CSS", category: "frontend" as const },
  { name: "Django", category: "backend" as const },
  { name: "Python", category: "backend" as const },
  { name: "Node.js", category: "backend" as const },
  { name: "REST API", category: "backend" as const },
  { name: "PostgreSQL", category: "database" as const },
  { name: "Firebase", category: "database" as const },
  { name: "Docker", category: "tools" as const },
  { name: "Git", category: "tools" as const },
  { name: "Godot Engine", category: "other" as const },
];

export const SKILL_CATEGORIES = [
  {
    name: "Core Stack",
    icon: Code2,
    color: "from-cyan-400 to-blue-500",
    technologies: ["Flutter", "Dart", "Django", "Python", "TypeScript", "Next.js"],
  },
  {
    name: "Backend & Infrastructure",
    icon: Server,
    color: "from-green-400 to-emerald-500",
    technologies: ["REST API", "PostgreSQL", "Docker", "Node.js", "JWT", "Firebase"],
  },
  {
    name: "Mobile",
    icon: Smartphone,
    color: "from-purple-400 to-pink-500",
    technologies: ["Flutter", "Dart", "Firebase", "Play Store", "CI/CD"],
  },
  {
    name: "Web & Frontend",
    icon: Globe,
    color: "from-blue-400 to-indigo-500",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
  },
  {
    name: "Databases",
    icon: Database,
    color: "from-orange-400 to-red-500",
    technologies: ["PostgreSQL", "Firebase / Firestore", "SQLite", "MongoDB"],
  },
  {
    name: "Other",
    icon: Code2,
    color: "from-slate-400 to-gray-500",
    technologies: ["Godot Engine", "GDScript", "GitHub Actions"],
  },
];

// Keep BIG_SKILLS for any legacy references — redirect to SKILL_CATEGORIES
export const BIG_SKILLS = SKILL_CATEGORIES;

export const TECH_STACK = [
  "Flutter",
  "Django",
  "Next.js",
  "TypeScript",
  "PostgreSQL",
  "Docker",
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
    name: "Twitter / X",
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
    icon: MapPin,
    title: "Location",
    value: "Douala, Cameroon",
    href: null,
  },
];

export const NAVIGATION_ITEMS = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const EXPERIENCES = [
  {
    title: "Full-Stack Developer",
    company: "OVVP CORP",
    period: "2024 – Present",
    description: [
      "Flutter mobile application development",
      "Web application development with React/Next.js",
      "Backend architecture with Node.js/Python",
      "Technical lead on complex multi-platform projects",
    ],
  },
  {
    title: "Freelance Developer",
    company: "Independent",
    period: "2021 – Present",
    description: [
      "Web and mobile application development for various clients",
      "End-to-end project ownership from architecture to deployment",
      "Collaboration with product teams and designers",
      "Delivery of production-ready, scalable applications",
    ],
  },
];

export const FEATURED_PROJECTS = [
  {
    id: "g-buy-web",
    title: "G-Buy",
    headline:
      "Marketplace platform that digitizes group-buying commerce in Cameroon.",
    description:
      "A web platform connecting group-buying sellers and customers with structured purchase flows, trackable payments, and operational management.",
    summary:
      "G-Buy replaces informal group commerce tools (WhatsApp, spreadsheets, untracked payments) with a structured, traceable, and scalable platform for the Cameroonian market.",
    problem:
      "Group commerce operators relied on scattered manual tools, which limited operational visibility, payment reliability, and seller growth.",
    solution:
      "A Django + Next.js architecture with dedicated Client, Seller, and Admin spaces covering the full cycle: product discovery, ordering, partial payment, order tracking, and business analytics.",
    impact: [
      "Structured commercial flows with real-time order tracking",
      "Sellers equipped with integrated management tools",
      "Strengthened governance through an admin space and audit trail",
    ],
    features: [
      "Client space: product browsing with filters and search",
      "Client space: detailed product pages",
      "Client space: cart and checkout with partial payment (50%, 75%, 100%)",
      "Client space: real-time order tracking",
      "Client space: profile and purchase history",
      "Seller space: dashboard (revenue, orders, activity)",
      "Seller space: product management (create, edit, deactivate)",
      "Seller space: group sale campaign management",
      "Seller space: order management with status updates",
      "Admin space: user, seller, and revenue oversight",
      "Admin space: role assignment",
      "Admin space: seller account activation/deactivation",
      "Admin space: audit log",
    ],
    role: [
      "Full-stack architecture and development with Django + Next.js",
      "Business flow design for e-commerce and group-buying",
      "Client, Seller, and Admin space implementation",
    ],
    timeline: "2026 · In production",
    team: "Solo project",
    status: "In production",
    technologies: [
      "Django",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "REST API",
      "JWT",
    ],
    image: "/images/projects/g-buy.png",
    liveUrl: "https://www.gbuy-cm.com/",
    githubUrl: null,
    featured: true,
    category: "web",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "kweekk",
    title: "KweekK",
    headline:
      "Digital loyalty club delivering exclusive discounts across Central Africa.",
    description:
      "KweekK is a digital platform enabling individuals, groups, and businesses to access exclusive discounts on products and services from partner networks (PRCPI).",
    summary:
      "KweekK connects members and partners around a gamified loyalty program that streamlines access to discounts and simplifies campaign management.",
    problem:
      "Partner merchants lacked a reliable digital channel to distribute and measure the impact of their exclusive offers.",
    solution:
      "A multi-tenant Flutter application with a partner dashboard, secure coupon validation, and real-time analytics.",
    impact: [
      "Published on Google Play Store — verifiable via Play Store link",
      "Partner back-office for managing real-time offers",
      "Secure QR code validation with offline support",
    ],
    features: [
      "Member space with dynamic discount cards",
      "Secure QR codes with offline validation",
      "Partner module for publishing real-time offers",
      "Analytics dashboard to track conversions",
    ],
    role: [
      "Lead Flutter engineer and API integration",
      "Clean architecture and state management implementation",
      "Coordination with product team on mobile roadmap",
    ],
    timeline: "2022 · 4 months",
    team: "Mobile team (2 devs · 1 QA · 1 PO)",
    status: "Live on Play Store",
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
      "Service marketplace connecting providers and clients in real time.",
    description:
      "IsyJob connects service providers (plumbers, electricians, event managers, etc.) with people who need those services — geolocated, verified, and data-driven.",
    summary:
      "IsyJob structures the informal service economy with a geolocated, verified marketplace driven by reviews and real-time matching.",
    problem:
      "Informal service providers struggled to find qualified clients, while individuals doubted provider reliability.",
    solution:
      "A mobile application that matches offers and demand based on skills, location, and verified reviews.",
    impact: [
      "Published on Google Play Store — verifiable via Play Store link",
      "Geolocated real-time matching across skill categories",
      "In-app chat, secure wallet, and mission tracking",
    ],
    features: [
      "Instant geolocated matching based on skills",
      "Secure wallet and payment management",
      "Real-time in-app chat between clients and providers",
      "Dashboard to track missions and revenue",
    ],
    role: [
      "Mobile architecture and REST backend integration",
      "UX research to simplify onboarding",
      "CI/CD setup with Firebase App Distribution",
    ],
    timeline: "2021 · 5 months",
    team: "Startup crew (3 devs · 1 designer · 1 PM)",
    status: "In production",
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
    id: "gestion-stock-entrepot",
    title: "Warehouse Stock Manager",
    headline:
      "Full-stack warehouse management with Django 6/DRF backend and Next.js frontend.",
    description:
      "A full-stack application to manage products, stock, sales, purchases, inventories, and transfers between warehouses from a modern interface.",
    summary:
      "Warehouse Stock Manager is an operational management platform that centralizes all warehouse business flows: stock movements, sales, purchases, inventories, and vendor administration — with a versioned, JWT-secured REST API.",
    problem:
      "Manual stock tracking causes inventory errors, stockouts, and poor visibility across warehouse transfers.",
    solution:
      "A modern Django 6 + DRF + Next.js architecture that automates stock movements in real time, standardizes operations, and exposes a versioned REST API secured with JWT authentication.",
    impact: [
      "Full centralization of warehouse operations in a single platform",
      "Automated stock flows linked to sales, purchases, and transfers",
      "Strengthened traceability through a versioned JWT-secured API",
    ],
    features: [
      "Product management",
      "Warehouse and stock management",
      "Sales (decrements stock)",
      "Purchases (increments stock)",
      "Inventory management",
      "Transfers between warehouses",
      "Vendor management",
      "Versioned REST API + JWT authentication",
    ],
    role: [
      "Backend design and development with Django 6 and DRF",
      "Frontend development with Next.js",
      "Stock flow modeling and JWT API security",
    ],
    timeline: "2026 · Ongoing",
    team: "Solo project",
    status: "In production",
    technologies: [
      "Django 6",
      "Django REST Framework",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "JWT",
    ],
    image: "/images/projects/stock-entrepot.png",
    liveUrl: "https://stockpro-three.vercel.app/",
    githubUrl: null,
    featured: true,
    category: "web",
    color: "from-emerald-500 to-cyan-600",
  },
  {
    id: "fais-mon-cv",
    title: "Fais Mon CV",
    headline:
      "AI-powered CV assistant to create standout job application materials.",
    description:
      "An online CV creation platform with customizable templates and PDF export powered by an advanced AI engine.",
    summary:
      "Fais Mon CV is a SaaS platform that guides candidates from profile analysis to a ready-to-send CV, using a contextual AI engine.",
    problem:
      "Candidates spend hours structuring and formatting their CVs, risking missing key elements or inconsistent visual presentation.",
    solution:
      "A guided experience combining an AI assistant, modular templates, and pixel-perfect PDF export to produce a professional CV in minutes.",
    impact: [
      "Beta launched and deployed on Vercel",
      "AI-assisted structuring reduces manual formatting time",
      "PDF export with professional branding",
    ],
    features: [
      "AI assistant for structuring experience, skills, and pitch",
      "Modular responsive templates customizable in real time",
      "High-fidelity PDF export with professional branding",
      "Analytics dashboard to track downloads and conversions",
    ],
    role: [
      "Product design and user research",
      "Full-stack Next.js/TypeScript development",
      "Firebase integration (auth, storage, database)",
      "Serverless AI inference pipeline setup",
    ],
    timeline: "2024 · 4 weeks",
    team: "Solo project",
    status: "In production",
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
    featured: false,
    category: "web",
    color: "from-cyan-500 to-purple-500",
  },
  {
    id: "open-whatsapp-bot",
    title: "Open WhatsApp Bot",
    headline:
      "Open-source WhatsApp bot with clean architecture and modular plugins.",
    description:
      "An open-source WhatsApp application built with @whiskeysockets/baileys v6.7.9+, featuring a clean architecture, a modular plugin system, and production-ready deployment options.",
    summary:
      "A highly configurable community WhatsApp bot with AI support (ChatGPT, Gemini), group management, media download, and an advanced permission system. Optimized for production with Docker, PM2, and Heroku.",
    problem:
      "Existing WhatsApp bots lack flexibility, modularity, and support for modern features like integrated AI or advanced status management.",
    solution:
      "A complete WhatsApp bot architecture with auto-loadable plugin system, multi-database support (SQLite/PostgreSQL), and native AI integration.",
    impact: [
      "Open-source project with public GitHub repository",
      "Intelligent reconnection system with exponential backoff",
      "Production-ready with PM2, Docker, and Heroku support",
    ],
    features: [
      "Intelligent auto-reconnection with error handling",
      "Modular plugin system with auto-loading",
      "AI support (ChatGPT, Google Gemini)",
      "Automatic status viewer",
      "Media download (YouTube, Instagram, TikTok, etc.)",
      "Full group management (admin tools)",
      "Permission system (sudo users, admin commands)",
    ],
    role: [
      "Architecture and system design",
      "Backend development in Node.js with modular structure",
      "AI and external API integration",
      "Performance optimization and resource management",
      "Docker configuration and production deployment",
    ],
    timeline: "2025 · Active project",
    team: "Open-source community",
    status: "Actively maintained",
    technologies: [
      "Node.js",
      "TypeScript",
      "Baileys v6.7.9+",
      "SQLite/PostgreSQL",
      "ChatGPT API",
      "Google Gemini",
      "Docker",
      "PM2",
    ],
    image: "/images/projects/open-whatsapp-bot.png",
    liveUrl: "https://github.com/Starland9/OpenWhatsappBot",
    githubUrl: "https://github.com/Starland9/OpenWhatsappBot",
    featured: false,
    category: "Bot",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "flyers-maker",
    title: "FlyerGen AI",
    headline:
      "Create professional flyers in a few clicks, directly from the browser.",
    description:
      "A no-code web tool for designing, customizing, and exporting flyers and marketing visuals quickly, with responsive templates and high-quality export.",
    summary:
      "FlyerGen AI lets small businesses and creators produce polished marketing visuals without design skills: modular templates, drag-and-drop editor, and PNG/PDF export.",
    problem:
      "Small businesses and freelancers often lack resources to produce polished, adaptable marketing visuals for different formats.",
    solution:
      "An easy-to-use web editor combining professional templates, real-time editing, and optimized export for print or social media.",
    impact: [
      "MVP launched and deployed",
      "Quick adoption among micro-entrepreneurs and local associations",
      "Marketing visual creation reduced to minutes",
    ],
    features: [
      "Library of modular templates",
      "Drag-and-drop editor (text, images, shapes)",
      "Typography adjustments and color palette",
      "PNG / PDF high-resolution export with custom dimensions",
      "Mobile preview and social media crop",
      "Public link sharing for designs",
    ],
    role: [
      "UI/UX design and prototyping",
      "Next.js / TypeScript frontend development",
      "Gemini AI integration / export engine",
      "Vercel deployment and monitoring",
    ],
    timeline: "2025 · 3 weeks",
    team: "Solo project",
    status: "Live",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Gemini API",
      "Vercel",
      "Firebase",
    ],
    image: "/images/projects/flyers-maker.png",
    liveUrl: "https://flyers-maker.vercel.app/",
    githubUrl: null,
    featured: false,
    category: "web",
    color: "from-cyan-500 to-indigo-600",
  },
  {
    id: "njangiflow",
    title: "NjangiFlow",
    headline:
      "Digitalizes African rotating savings groups for transparent, automated management.",
    description:
      "An intuitive, secure platform for organizing, tracking, and optimizing rotating savings groups (tontines). Simplify management and reinforce trust.",
    summary:
      "NjangiFlow centralizes rotating savings group management, offering a real-time control panel for administrators and a mobile-first application for members.",
    problem:
      "Tontines are often managed with Excel spreadsheets and WhatsApp threads, leading to calculation errors, delays, and lack of transparency.",
    solution:
      "A data-driven application that automates reminders, secures transactions, and makes every contribution traceable.",
    impact: [
      "Pilot deployed in production",
      "Automated reminders and payment schedule management",
      "Real-time contribution tracking with accounting export",
    ],
    features: [
      "Multi-group management with customizable cycles and roles",
      "Automated calendar and payment reminders",
      "Virtual wallet and one-click reconciliation",
      "Analytics module for cash flow visualization",
    ],
    role: [
      "Lead Frontend Next.js and design system",
      "Trust-centered UX design",
      "Real-time integration with Firebase and Cloud Functions",
    ],
    timeline: "2023 · 3 months",
    team: "Product team (3 devs · 1 PM · 1 UX)",
    status: "Pilot in production",
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
    featured: false,
    category: "web",
    color: "from-teal-500 to-emerald-500",
  },
  {
    id: "tchokos",
    title: "Tchokos E-commerce",
    headline:
      "Premium e-commerce experience for Cameroonian urban fashion.",
    description:
      "An online store specializing in shoes, clothing, and accessories, with a smooth and secure user experience.",
    summary:
      "Tchokos modernizes high-end sneaker and accessory sales with an immersive digital storefront and a mobile-first optimized conversion funnel.",
    problem:
      "Physical stores lacked a digital channel capable of replicating the premium experience and managing stock in real time.",
    solution:
      "A headless Next.js e-commerce platform with catalog management, mobile money payment, and integrated logistics.",
    impact: [
      "Catalog fully managed from a secure back-office",
      "Mobile Money payment integration",
      "ISR and image optimization for performance",
    ],
    features: [
      "Dynamic catalog with variants and real-time stock",
      "Mobile-first optimized checkout funnel",
      "Transactional notifications and order tracking",
      "Headless CMS for marketing content and lookbooks",
    ],
    role: [
      "Next.js / Tailwind frontend architecture",
      "Commerce API and payment gateway integration",
      "Performance optimizations (ISR, images, caching)",
    ],
    timeline: "2022 · 6 weeks",
    team: "Digital studio (2 devs · 1 designer)",
    status: "In production",
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
    featured: false,
    category: "web",
    color: "from-amber-500 to-rose-500",
  },
  {
    id: "2ln-ai",
    title: "2LN AI",
    headline:
      "AI legal assistant democratizing labor law for employees.",
    description:
      "Questions about your employment contract, employee rights, or employer obligations? Get clear and fast answers via an AI assistant specialized in labor law.",
    summary:
      "2LN AI combines a fluid mobile application and a RAG engine trained on local legislation to deliver reliable answers within seconds.",
    problem:
      "Employees lack fast access to personalized legal advice without expensive consultations.",
    solution:
      "A specialized legal chatbot that contextualizes each question, suggests letter templates, and references official texts.",
    impact: [
      "Published on Google Play Store — verifiable via Play Store link",
      "RAG pipeline built on local legislation",
      "Multi-language conversation support",
    ],
    features: [
      "Contextualized AI chat backed by a RAG pipeline",
      "Library of practical cases and letter templates",
      "Multi-language conversation with offline mode",
      "Admin dashboard to monitor dataset and feedback",
    ],
    role: [
      "Multi-platform Flutter architecture",
      "Python backend and RAG pipeline development",
      "Vector database and lightweight MLOps setup",
    ],
    timeline: "2024 · 6 weeks",
    team: "AI team (2 devs · 1 legal expert · 1 PM)",
    status: "In production",
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
    featured: false,
    category: "mobile",
    color: "from-slate-500 to-purple-500",
  },
  {
    id: "omoh",
    title: "OMOH",
    headline:
      "Track your Mobile Money spending through intelligent SMS analysis.",
    description:
      "Receive Orange Money or MTN Mobile Money confirmation SMS and lose track of your expenses? This app is for you.",
    summary:
      "OMOH automatically categorizes Mobile Money transactions, generates real-time reports, and helps users regain control of their budget.",
    problem:
      "Users have no consolidated dashboard for their Mobile Money transactions across operators.",
    solution:
      "An offline-first application that parses SMS messages, enriches data, and produces actionable insights.",
    impact: [
      "Published on Google Play Store — verifiable via Play Store link",
      "Offline-first with local encryption for data privacy",
      "Automated SMS parsing for Orange and MTN",
    ],
    features: [
      "Intelligent SMS parsing for Orange & MTN",
      "Real-time budget dashboards",
      "Custom alerts for overspending",
      "CSV export and monthly reports",
    ],
    role: [
      "Flutter development and offline NLP implementation",
      "Data security (encryption, sandbox)",
      "Product discovery with power users",
    ],
    timeline: "2021 · 2 months",
    team: "Side project (2 devs)",
    status: "Available on Play Store",
    technologies: ["Flutter", "Dart"],
    image: "/images/projects/omoh.webp",
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.ozosotf.omoh&pcampaignid=web_share",
    githubUrl: null,
    featured: false,
    category: "mobile",
    color: "from-orange-500 to-amber-500",
  },
  {
    id: "mbolo-gabon",
    title: "Mbolo Gabon",
    headline:
      "Immersive tourist guide for exploring Gabon with confidence.",
    description:
      "An establishment directory app for Gabon, covering food, accommodation, and entertainment — with geolocation, professional visibility tools, and offline maps.",
    summary:
      "Mbolo Gabon federates tourism stakeholders around an app that centralizes the offer, simplifies discovery, and accompanies travelers on the ground.",
    problem:
      "Travelers lacked reliable, consolidated information about establishments, while professionals had limited digital visibility.",
    solution:
      "An all-in-one guide with offline mapping, detailed profiles, and marketing tools for establishments.",
    impact: [
      "Published on Google Play Store — verifiable via Play Store link",
      "Offline map with local caching and sync",
      "Professional space for managing listings and availability",
    ],
    features: [
      "Multi-criteria search (budget, theme, location)",
      "Interactive map with offline mode",
      "Professional space to manage listings and availability",
      "Reviews and synchronized favorite lists",
    ],
    role: [
      "Lead Flutter development and map integration",
      "Offline cache and synchronization management",
      "Coordination with content and marketing team",
    ],
    timeline: "2020 · 3 months",
    team: "Tourism consortium (2 devs · 1 data manager)",
    status: "In production",
    technologies: ["Flutter", "Dart", "REST API", "Firebase"],
    image: "/images/projects/mbolo-gabon.jpg",
    liveUrl:
      "https://play.google.com/store/apps/details?id=io.pekegno.mbolo&pcampaignid=web_share",
    githubUrl: null,
    featured: false,
    category: "mobile",
    color: "from-green-500 to-lime-500",
  },
  {
    id: "kamte",
    title: "Kamte",
    headline:
      "Personal finance manager for tracking and optimizing daily expenses.",
    description:
      "Kamte is a mobile personal finance app for tracking income and expenses — giving you full visibility over your daily spending and revenue.",
    summary:
      "Kamte helps users manage their daily budget with clear cash flow visibility, smart reminders, and personalized recommendations.",
    problem:
      "Manual expense tracking discourages users and lacks consolidated visibility.",
    solution:
      "An intuitive app with automatic categorization, dashboards, and accounting export.",
    impact: [
      "Published on Google Play Store — verifiable via Play Store link",
      "BLoC architecture for predictable state management",
      "Multi-currency support and cloud sync",
    ],
    features: [
      "Multi-account tracking and smart budgets",
      "Spending habit analysis with AI insights",
      "Automatic reminders and iOS/Android widgets",
      "PDF and CSV export for personal accounting",
    ],
    role: [
      "Product design and UX",
      "Flutter development with BLoC architecture",
      "Analytics and crash reporting setup",
    ],
    timeline: "2020 · 2 months",
    team: "Solo project",
    status: "In production",
    technologies: ["Flutter", "Dart"],
    image: "/images/projects/kamte.jpg",
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.kamte.app&pcampaignid=web_share",
    githubUrl: null,
    featured: false,
    category: "mobile",
    color: "from-rose-500 to-red-500",
  },
  {
    id: "landflix",
    title: "Landflix",
    headline: "Mobile app for managing movie and series downloads.",
    description:
      "Landflix is a mobile app for managing movie and series downloads — letting you track your preferred content and download queue.",
    summary:
      "Discover and download your favorite movies and series with a modern, intuitive experience available across your devices.",
    problem:
      "Access to films and series is often limited by inflexible platforms with restricted download options.",
    solution:
      "A mobile app that centralizes content, optimizes downloads, and offers a smooth user experience.",
    impact: [
      "GitHub repository publicly available",
      "BLoC architecture for state management",
      "Multi-platform Flutter support",
    ],
    features: [
      "Film and series catalog with download options",
      "Download management with priorities and queues",
      "Modern and intuitive user interface",
      "Cross-platform support",
    ],
    role: [
      "Product design and UX",
      "Flutter development with BLoC architecture",
    ],
    timeline: "2025 · 2 months",
    team: "Solo project",
    status: "In production",
    technologies: ["Flutter", "Dart"],
    image: "/images/projects/landflix.jpg",
    liveUrl: "https://starland9.github.io/landflix-landing/",
    githubUrl: "https://github.com/Starland9/LandFlix",
    featured: false,
    category: "mobile",
    color: "from-violet-700 to-purple-900",
  },
  {
    id: "social-dl",
    title: "Social DL",
    headline:
      "Web platform to download content from social networks in one click.",
    description:
      "Social DL is a web application for downloading videos, photos, and content from major social platforms (TikTok, Instagram, YouTube, etc.) simply and quickly.",
    summary:
      "A modern, minimal web tool to download your favorite social media content without ads or complications.",
    problem:
      "Users struggle to download content from social platforms with scattered, unreliable tools.",
    solution:
      "A centralized web platform supporting major social networks with a minimal, performant interface.",
    impact: [
      "GitHub repository publicly available",
      "Zero-account required access",
      "Multi-platform support (TikTok, Instagram, YouTube, Twitter, etc.)",
    ],
    features: [
      "Instant download from URL",
      "Multi-platform support (TikTok, Instagram, YouTube, Twitter, etc.)",
      "Minimalist and intuitive interface",
      "No account required, fully free",
    ],
    role: [
      "Full-stack development (Next.js and backend)",
      "Social media API integration",
      "Performance and UX optimization",
    ],
    timeline: "2025 · Ongoing",
    team: "Solo project",
    status: "In production",
    technologies: ["Next.js 15", "TypeScript", "Tailwind CSS", "REST API"],
    image: "/images/projects/social-dl.png",
    liveUrl: "https://social-dl.starland9.dev/",
    githubUrl: "https://github.com/Starland9/social-dl-web",
    featured: false,
    category: "web",
    color: "from-blue-500 to-cyan-500",
  },
];
