import { frenchTypography } from "@/i18n/format";
import { projects } from "./projects";
import {
  parseEducation,
  parseExperience,
  parseLanguages,
  parseProfile,
  parseStack,
} from "./validate";
import profileSource from "./profile.json";
import experienceSource from "./experience.json";
import stackSource from "./stack.json";
import educationSource from "./education.json";
import languagesSource from "./languages.json";
import type { Locale, Localized, Project, ProjectType } from "./types";

export type * from "./types";
export { projectStatuses, projectTypes } from "./types";

const profile = parseProfile(profileSource);
const experience = parseExperience(experienceSource);
const stack = parseStack(stackSource);
const education = parseEducation(educationSource);
const spokenLanguages = parseLanguages(languagesSource);

// Most recent first; projects of the same year keep their index order.
const byDate = projects
  .map((project, index) => ({ project, index }))
  .sort((a, b) => b.project.year - a.project.year || a.index - b.index)
  .map(({ project }) => project);

/** Text in the requested language, with French typography applied for `fr`. */
export function t(value: Localized<string>, locale: Locale): string {
  return locale === "fr" ? frenchTypography(value.fr) : value.en;
}

export function tList(value: Localized<string[]>, locale: Locale): string[] {
  return locale === "fr" ? value.fr.map(frenchTypography) : value.en;
}

export const getProfile = () => profile;
export const getExperience = () => experience;
export const getStack = () => stack;
export const getEducation = () => education;
export const getSpokenLanguages = () => spokenLanguages;

/** All projects, most recent first. */
export function getProjects(type?: ProjectType): Project[] {
  return type ? byDate.filter((p) => p.type === type) : byDate;
}

/** The 6 featured projects, in the order of `content/projects/index.ts`. */
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Project after `slug` in the /work order, wrapping around. */
export function getNextProject(slug: string): Project {
  const index = byDate.findIndex((p) => p.slug === slug);
  return byDate[(index + 1) % byDate.length] as Project;
}

/** "2024 — present", "2023 — 2024", or a single year when it starts and ends the same year. */
export function period(
  start: number,
  end: number | null,
  present: string,
): string {
  if (end === null) return `${start} — ${present}`;
  return end === start ? String(start) : `${start} — ${end}`;
}

export const projectCount = () => projects.length;
export const firstProjectYear = () => Math.min(...projects.map((p) => p.year));
