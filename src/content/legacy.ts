// Rebuilds the historical /api/projects response shape (English) from the JSON content.
// Contract: specs/001-ui-ux-redesign/contracts/api-projects.md
import en from "@/i18n/messages/en.json";
import { projects } from "./projects";
import type { Project } from "./types";

export type LegacyProject = {
  id: string;
  title: string;
  headline: string;
  description: string;
  summary: string;
  problem: string;
  solution: string;
  impact: string[];
  features: string[];
  role: string[];
  timeline: string;
  team: string;
  status: string;
  technologies: string[];
  image: string;
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  category: string;
};

function toLegacy(p: Project): LegacyProject {
  return {
    id: p.slug,
    title: p.title,
    headline: p.headline.en,
    description: p.description.en,
    summary: p.summary.en,
    problem: p.problem.en,
    solution: p.solution.en,
    impact: p.impact.en,
    features: p.features.en,
    role: p.role.en,
    timeline: p.duration ? `${p.year} · ${p.duration.en}` : String(p.year),
    team: p.team.en,
    status: en.status[p.status],
    technologies: p.technologies,
    image: p.image.src,
    liveUrl: p.links.live ?? p.links.store,
    githubUrl: p.links.code,
    featured: p.featured,
    category: p.type,
  };
}

export const legacyProjects: LegacyProject[] = projects.map(toLegacy);
