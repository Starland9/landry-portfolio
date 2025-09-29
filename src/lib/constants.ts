export const PERSONAL_INFO = {
  name: "Starland9",
  fullName: "Landry (Starland9)",
  title: "Développeur Full-Stack",
  subtitle: "Full-Stack Developer & UI/UX Enthusiast",
  email: "contact@starland9.dev",
  github: "https://github.com/Starland9",
  linkedin: "https://linkedin.com/in/starland9",
  twitter: "https://twitter.com/starland9",
  location: "France",
  bio: "Développeur passionné avec plus de 4 ans d'expérience dans la création d'applications web et mobiles performantes. Je me spécialise dans l'écosystème JavaScript/TypeScript et les technologies modernes du web.",
  tagline:
    "Je crée des expériences web exceptionnelles qui allient performance, esthétique et innovation. Passionné par les technologies modernes et les interfaces utilisateur révolutionnaires.",
};

export const SKILLS = [
  { name: "React/Next.js", level: 95, category: "frontend" as const },
  { name: "TypeScript", level: 92, category: "frontend" as const },
  { name: "Node.js", level: 90, category: "backend" as const },
  { name: "Python", level: 85, category: "backend" as const },
  { name: "PostgreSQL", level: 85, category: "database" as const },
  { name: "MongoDB", level: 80, category: "database" as const },
  { name: "Docker", level: 75, category: "tools" as const },
  { name: "AWS", level: 70, category: "tools" as const },
  { name: "UI/UX Design", level: 88, category: "other" as const },
];

export const TECH_STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "PostgreSQL",
];

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: PERSONAL_INFO.github,
    icon: "Github",
    color: "hover:text-white",
  },
  {
    name: "LinkedIn",
    url: PERSONAL_INFO.linkedin,
    icon: "Linkedin",
    color: "hover:text-blue-400",
  },
  {
    name: "Twitter",
    url: PERSONAL_INFO.twitter,
    icon: "Twitter",
    color: "hover:text-sky-400",
  },
];

export const NAVIGATION_ITEMS = [
  { name: "Accueil", href: "#hero" },
  { name: "À Propos", href: "#about" },
  { name: "Compétences", href: "#skills" },
  { name: "Projets", href: "#projects" },
  { name: "Contact", href: "#contact" },
];
