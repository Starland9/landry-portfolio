// Shapes of the JSON files in src/content/ (see specs/001-ui-ux-redesign/data-model.md).

export type Locale = "fr" | "en";
export type Localized<T> = { fr: T; en: T };

export const projectTypes = ["web", "mobile", "other"] as const;
export type ProjectType = (typeof projectTypes)[number];

export const projectStatuses = [
  "live",
  "in-production",
  "pilot",
  "ongoing",
  "maintained",
] as const;
export type ProjectStatus = (typeof projectStatuses)[number];

export type ImageAsset = {
  src: string;
  width: number;
  height: number;
  alt: Localized<string>;
  /** Part kept visible when the image is cropped to fill its frame (default: center). */
  focus?: "top" | "center" | "bottom";
};

export type Links = {
  live: string | null;
  store: string | null;
  code: string | null;
};

export type Highlight = {
  value: Localized<string>;
  label: Localized<string>;
};

export type Project = {
  slug: string;
  title: string;
  type: ProjectType;
  year: number;
  featured: boolean;
  status: ProjectStatus;
  duration?: Localized<string>;
  team: Localized<string>;
  headline: Localized<string>;
  description: Localized<string>;
  summary: Localized<string>;
  problem: Localized<string>;
  solution: Localized<string>;
  role: Localized<string[]>;
  impact: Localized<string[]>;
  features: Localized<string[]>;
  technologies: string[];
  image: ImageAsset;
  links: Links;
  highlights?: Highlight[];
};

export type Profile = {
  fullName: string;
  handle: string;
  role: Localized<string>;
  lead: Localized<string>;
  bio: Localized<string>;
  freelanceNote: Localized<string>;
  location: Localized<string>;
  timezone: string;
  yearsOfExperience: number;
  mainStack: string[];
  availability: { open: boolean; label: Localized<string> };
  email: string;
  social: { github: string; linkedin: string; x: string };
  photo: ImageAsset | null;
  siteUrl: string;
};

export type Experience = {
  company: Localized<string>;
  role: Localized<string>;
  start: number;
  end: number | null;
  summary: Localized<string>;
  highlights: Localized<string[]>;
  /** Slugs of the projects built in this role. */
  projects?: string[];
};

export type StackGroup = {
  id: string;
  label: Localized<string>;
  items: string[];
};

export type Education = {
  title: Localized<string>;
  school: string;
  start: number | null;
  end: number | null;
};

export type SpokenLanguage = {
  language: Localized<string>;
  level?: Localized<string>;
};
