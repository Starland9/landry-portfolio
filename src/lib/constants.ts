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
    href: "mailto:landrysimo99@gmail.com",
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
    href: "https://goo.gl/maps/XXXX",
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
    title: "Développeur Full-Stack Senior",
    company: "Tech Innovation",
    period: "2023 - Présent",
    description: [
      "Développement d'applications web modernes avec React/Next.js",
      "Architecture et optimisation de backends Node.js/Python",
      "Leadership technique sur des projets complexes",
    ],
  },
  {
    title: "Développeur Frontend",
    company: "Digital Agency",
    period: "2021 - 2023",
    description: [
      "Création d'interfaces utilisateur innovantes",
      "Intégration d'APIs REST et GraphQL",
      "Optimisation des performances web",
    ],
  },
];
