// Pure module (no path aliases): validates the JSON content at load time so a
// missing field or translation fails `next build` with a precise message.

import type {
  Education,
  Experience,
  Highlight,
  ImageAsset,
  Links,
  Localized,
  Profile,
  Project,
  SpokenLanguage,
  StackGroup,
} from "./types.ts";

export class ContentError extends Error {
  constructor(file: string, field: string, reason: string) {
    super(`content/${file}: ${field} — ${reason}`);
    this.name = "ContentError";
  }
}

const PROJECT_TYPES = ["web", "mobile", "other"];
const PROJECT_STATUSES = [
  "live",
  "in-production",
  "pilot",
  "ongoing",
  "maintained",
];
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const HEADLINE_MAX = 140;

type Raw = Record<string, unknown>;

class Reader {
  readonly file: string;

  constructor(file: string) {
    this.file = file;
  }

  fail(field: string, reason: string): never {
    throw new ContentError(this.file, field, reason);
  }

  object(value: unknown, field: string): Raw {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      this.fail(field, "objet attendu");
    }
    return value as Raw;
  }

  string(value: unknown, field: string): string {
    if (typeof value !== "string" || value.trim() === "")
      this.fail(field, "texte non vide attendu");
    return value;
  }

  optionalString(value: unknown, field: string): string | null {
    return value === null || value === undefined
      ? null
      : this.string(value, field);
  }

  integer(
    value: unknown,
    field: string,
    min = -Infinity,
    max = Infinity,
  ): number {
    if (typeof value !== "number" || !Number.isInteger(value))
      this.fail(field, "entier attendu");
    if (value < min || value > max)
      this.fail(field, `doit être entre ${min} et ${max}`);
    return value;
  }

  boolean(value: unknown, field: string): boolean {
    if (typeof value !== "boolean") this.fail(field, "booléen attendu");
    return value;
  }

  url(value: unknown, field: string): string | null {
    if (value === null) return null;
    const url = this.string(value, field);
    if (!url.startsWith("https://"))
      this.fail(field, "URL https:// ou null attendue");
    return url;
  }

  oneOf<T extends string>(
    value: unknown,
    field: string,
    allowed: readonly string[],
  ): T {
    if (typeof value !== "string" || !allowed.includes(value)) {
      this.fail(field, `valeur attendue parmi ${allowed.join(", ")}`);
    }
    return value as T;
  }

  stringList(value: unknown, field: string, minItems = 1): string[] {
    if (!Array.isArray(value)) this.fail(field, "liste attendue");
    if (value.length < minItems)
      this.fail(field, `au moins ${minItems} élément(s) attendu(s)`);
    return value.map((item, i) => this.string(item, `${field}[${i}]`));
  }

  localized(value: unknown, field: string): Localized<string> {
    const obj = this.object(value, field);
    return {
      fr: this.string(obj.fr, `${field}.fr`),
      en: this.string(obj.en, `${field}.en`),
    };
  }

  localizedList(value: unknown, field: string): Localized<string[]> {
    const obj = this.object(value, field);
    return {
      fr: this.stringList(obj.fr, `${field}.fr`),
      en: this.stringList(obj.en, `${field}.en`),
    };
  }

  image(value: unknown, field: string): ImageAsset {
    const obj = this.object(value, field);
    const src = this.string(obj.src, `${field}.src`);
    if (!src.startsWith("/images/"))
      this.fail(`${field}.src`, "doit commencer par /images/");
    return {
      src,
      width: this.integer(obj.width, `${field}.width`, 1),
      height: this.integer(obj.height, `${field}.height`, 1),
      alt: this.localized(obj.alt, `${field}.alt`),
      focus:
        obj.focus === undefined
          ? undefined
          : this.oneOf(obj.focus, `${field}.focus`, [
              "top",
              "center",
              "bottom",
            ]),
    };
  }
}

/** Validates one project file. `fileSlug` is the file name without `.json`. */
export function parseProject(
  raw: unknown,
  fileSlug: string,
  now = new Date(),
): Project {
  const file = `projects/${fileSlug}.json`;
  const r = new Reader(file);
  const p = r.object(raw, "(racine)");

  const slug = r.string(p.slug, "slug");
  if (!SLUG.test(slug))
    r.fail("slug", "format attendu ^[a-z0-9]+(-[a-z0-9]+)*$");
  if (slug !== fileSlug)
    r.fail("slug", `doit être égal au nom du fichier (${fileSlug})`);

  const headline = r.localized(p.headline, "headline");
  for (const lang of ["fr", "en"] as const) {
    if (headline[lang].length > HEADLINE_MAX) {
      r.fail(
        `headline.${lang}`,
        `${HEADLINE_MAX} caractères maximum (${headline[lang].length})`,
      );
    }
  }

  const linksRaw = r.object(p.links, "links");
  const links: Links = {
    live: r.url(linksRaw.live, "links.live"),
    store: r.url(linksRaw.store, "links.store"),
    code: r.url(linksRaw.code, "links.code"),
  };

  let highlights: Highlight[] | undefined;
  if (p.highlights !== undefined) {
    const rawHighlights: unknown = p.highlights;
    if (!Array.isArray(rawHighlights))
      return r.fail("highlights", "liste attendue");
    if (rawHighlights.length > 3) r.fail("highlights", "0 à 3 éléments");
    highlights = rawHighlights.map((h: unknown, i: number) => {
      const obj = r.object(h, `highlights[${i}]`);
      return {
        value: r.localized(obj.value, `highlights[${i}].value`),
        label: r.localized(obj.label, `highlights[${i}].label`),
      };
    });
  }

  return {
    slug,
    title: r.string(p.title, "title"),
    type: r.oneOf(p.type, "type", PROJECT_TYPES),
    year: r.integer(p.year, "year", 2015, now.getFullYear() + 1),
    featured: r.boolean(p.featured, "featured"),
    status: r.oneOf(p.status, "status", PROJECT_STATUSES),
    duration:
      p.duration === undefined
        ? undefined
        : r.localized(p.duration, "duration"),
    team: r.localized(p.team, "team"),
    headline,
    description: r.localized(p.description, "description"),
    summary: r.localized(p.summary, "summary"),
    problem: r.localized(p.problem, "problem"),
    solution: r.localized(p.solution, "solution"),
    role: r.localizedList(p.role, "role"),
    impact: r.localizedList(p.impact, "impact"),
    features: r.localizedList(p.features, "features"),
    technologies: r.stringList(p.technologies, "technologies"),
    image: r.image(p.image, "image"),
    links,
    highlights,
  };
}

/** Collection-level rules: unique slugs and exactly `featuredCount` featured projects. */
export function checkProjects(
  projects: Project[],
  featuredCount = 6,
): Project[] {
  const seen = new Set<string>();
  for (const project of projects) {
    if (seen.has(project.slug)) {
      throw new ContentError(
        `projects/${project.slug}.json`,
        "slug",
        "déjà utilisé",
      );
    }
    seen.add(project.slug);
  }
  const featured = projects.filter((p) => p.featured).length;
  if (featured !== featuredCount) {
    throw new ContentError(
      "projects/index.ts",
      "featured",
      `${featuredCount} projets phares attendus, ${featured} trouvés`,
    );
  }
  return projects;
}

export function parseProfile(raw: unknown): Profile {
  const r = new Reader("profile.json");
  const p = r.object(raw, "(racine)");
  const availability = r.object(p.availability, "availability");
  const social = r.object(p.social, "social");
  const email = r.string(p.email, "email");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    r.fail("email", "adresse e-mail invalide");
  return {
    fullName: r.string(p.fullName, "fullName"),
    handle: r.string(p.handle, "handle"),
    role: r.localized(p.role, "role"),
    lead: r.localized(p.lead, "lead"),
    bio: r.localized(p.bio, "bio"),
    freelanceNote: r.localized(p.freelanceNote, "freelanceNote"),
    location: r.localized(p.location, "location"),
    timezone: r.string(p.timezone, "timezone"),
    yearsOfExperience: r.integer(p.yearsOfExperience, "yearsOfExperience", 0),
    mainStack: r.stringList(p.mainStack, "mainStack"),
    availability: {
      open: r.boolean(availability.open, "availability.open"),
      label: r.localized(availability.label, "availability.label"),
    },
    email,
    social: {
      github:
        r.url(social.github, "social.github") ??
        r.fail("social.github", "URL requise"),
      linkedin:
        r.url(social.linkedin, "social.linkedin") ??
        r.fail("social.linkedin", "URL requise"),
      x: r.url(social.x, "social.x") ?? r.fail("social.x", "URL requise"),
    },
    photo: p.photo === null ? null : r.image(p.photo, "photo"),
    siteUrl: r.url(p.siteUrl, "siteUrl") ?? r.fail("siteUrl", "URL requise"),
  };
}

function list(raw: unknown, file: string): unknown[] {
  if (!Array.isArray(raw))
    throw new ContentError(file, "(racine)", "liste attendue");
  return raw;
}

export function parseExperience(raw: unknown): Experience[] {
  const r = new Reader("experience.json");
  return list(raw, "experience.json").map((item, i) => {
    const e = r.object(item, `[${i}]`);
    return {
      company: r.localized(e.company, `[${i}].company`),
      role: r.localized(e.role, `[${i}].role`),
      start: r.integer(e.start, `[${i}].start`, 2000, 2100),
      end: e.end === null ? null : r.integer(e.end, `[${i}].end`, 2000, 2100),
      summary: r.localized(e.summary, `[${i}].summary`),
      highlights: r.localizedList(e.highlights, `[${i}].highlights`),
      projects:
        e.projects === undefined
          ? undefined
          : r.stringList(e.projects, `[${i}].projects`),
    };
  });
}

export function parseStack(raw: unknown): StackGroup[] {
  const r = new Reader("stack.json");
  return list(raw, "stack.json").map((item, i) => {
    const g = r.object(item, `[${i}]`);
    return {
      id: r.string(g.id, `[${i}].id`),
      label: r.localized(g.label, `[${i}].label`),
      items: r.stringList(g.items, `[${i}].items`),
    };
  });
}

export function parseEducation(raw: unknown): Education[] {
  const r = new Reader("education.json");
  return list(raw, "education.json").map((item, i) => {
    const e = r.object(item, `[${i}]`);
    return {
      title: r.localized(e.title, `[${i}].title`),
      school: r.string(e.school, `[${i}].school`),
      start:
        e.start === null
          ? null
          : r.integer(e.start, `[${i}].start`, 1990, 2100),
      end: e.end === null ? null : r.integer(e.end, `[${i}].end`, 1990, 2100),
    };
  });
}

export function parseLanguages(raw: unknown): SpokenLanguage[] {
  const r = new Reader("languages.json");
  return list(raw, "languages.json").map((item, i) => {
    const l = r.object(item, `[${i}]`);
    return {
      language: r.localized(l.language, `[${i}].language`),
      level:
        l.level === undefined
          ? undefined
          : r.localized(l.level, `[${i}].level`),
    };
  });
}
