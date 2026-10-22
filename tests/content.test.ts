import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  ContentError,
  checkProjects,
  parseEducation,
  parseExperience,
  parseLanguages,
  parseProfile,
  parseProject,
  parseStack,
} from "../src/content/validate.ts";

const CONTENT = join(import.meta.dirname, "../src/content");
const PROJECTS = join(CONTENT, "projects");
const readJson = (path: string): unknown => JSON.parse(readFileSync(path, "utf8"));
const projectFiles = readdirSync(PROJECTS).filter((f) => f.endsWith(".json"));
const slugOf = (file: string) => file.replace(/\.json$/, "");

test("every project file is valid", () => {
  for (const file of projectFiles) {
    assert.doesNotThrow(() => parseProject(readJson(join(PROJECTS, file)), slugOf(file)), file);
  }
});

test("slugs are unique and exactly 6 projects are featured", () => {
  const projects = projectFiles.map((f) => parseProject(readJson(join(PROJECTS, f)), slugOf(f)));
  assert.doesNotThrow(() => checkProjects(projects));
});

test("every project file is imported in projects/index.ts", () => {
  const index = readFileSync(join(PROJECTS, "index.ts"), "utf8");
  for (const file of projectFiles) {
    assert.ok(index.includes(`"./${file}"`), `${file} is missing from projects/index.ts`);
  }
});

test("every project image exists in public/", () => {
  for (const file of projectFiles) {
    const { image } = parseProject(readJson(join(PROJECTS, file)), slugOf(file));
    assert.ok(existsSync(join(CONTENT, "../../public", image.src)), `${file}: ${image.src} not found`);
  }
});

test("the other content files are valid", () => {
  assert.doesNotThrow(() => parseProfile(readJson(join(CONTENT, "profile.json"))));
  assert.doesNotThrow(() => parseExperience(readJson(join(CONTENT, "experience.json"))));
  assert.doesNotThrow(() => parseStack(readJson(join(CONTENT, "stack.json"))));
  assert.doesNotThrow(() => parseEducation(readJson(join(CONTENT, "education.json"))));
  assert.doesNotThrow(() => parseLanguages(readJson(join(CONTENT, "languages.json"))));
});

// --- the validator rejects broken content with a precise message ---

const valid = () => structuredClone(readJson(join(PROJECTS, "secret.json"))) as Record<string, any>;

function rejects(mutate: (p: Record<string, any>) => void, field: RegExp, slug = "secret") {
  const project = valid();
  mutate(project);
  assert.throws(
    () => parseProject(project, slug),
    (error: unknown) => error instanceof ContentError && field.test(error.message),
  );
}

test("missing French headline", () => rejects((p) => delete p.headline.fr, /headline\.fr/));
test("empty English role list", () => rejects((p) => (p.role.en = []), /role\.en/));
test("bad slug format", () => rejects((p) => (p.slug = "Secret App"), /slug/, "Secret App"));
test("slug different from file name", () => rejects(() => {}, /nom du fichier/, "other"));
test("headline over 140 characters", () => rejects((p) => (p.headline.en = "x".repeat(141)), /headline\.en/));
test("unknown type", () => rejects((p) => (p.type = "desktop"), /type/));
test("unknown status", () => rejects((p) => (p.status = "Live"), /status/));
test("year out of range", () => rejects((p) => (p.year = 2010), /year/));
test("4 highlights", () => rejects((p) => p.highlights.push(p.highlights[0]), /highlights/));
test("non-https link", () => rejects((p) => (p.links.live = "http://example.com"), /links\.live/));
test("image outside /images/", () => rejects((p) => (p.image.src = "https://cdn.example.com/a.png"), /image\.src/));
test("zero image width", () => rejects((p) => (p.image.width = 0), /image\.width/));

test("duplicate slugs and wrong featured count are rejected", () => {
  const secret = parseProject(valid(), "secret");
  assert.throws(() => checkProjects([secret, secret], 2), /déjà utilisé/);
  assert.throws(() => checkProjects([secret], 6), /6 projets phares/);
});
