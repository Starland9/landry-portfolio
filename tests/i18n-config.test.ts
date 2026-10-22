import { test } from "node:test";
import assert from "node:assert/strict";
import {
  isLocale,
  localePath,
  negotiateLocale,
  switchLocalePath,
} from "../src/i18n/config.ts";

test("a valid cookie wins over Accept-Language", () => {
  assert.equal(negotiateLocale("fr", "en-US,en;q=0.9"), "fr");
  assert.equal(negotiateLocale("en", "fr-FR,fr;q=0.9"), "en");
});

test("an invalid cookie is ignored", () => {
  assert.equal(negotiateLocale("de", "fr-FR"), "fr");
});

test("Accept-Language is ranked by q", () => {
  assert.equal(negotiateLocale(null, "de,en;q=0.5,fr;q=0.9"), "fr");
  assert.equal(negotiateLocale(null, "de,fr;q=0.4,en;q=0.6"), "en");
});

test("regional tags map to their base language", () => {
  assert.equal(negotiateLocale(undefined, "fr-CA"), "fr");
  assert.equal(negotiateLocale(undefined, "en-GB,fr;q=0.8"), "en");
});

test("equal weights keep the header order", () => {
  assert.equal(negotiateLocale(null, "fr,en"), "fr");
});

test("unsupported or missing languages fall back to English", () => {
  assert.equal(negotiateLocale(null, "de-DE,es;q=0.8"), "en");
  assert.equal(negotiateLocale(null, ""), "en");
  assert.equal(negotiateLocale(null, null), "en");
});

test("malformed headers do not throw", () => {
  assert.equal(negotiateLocale(null, ";;,fr;q=abc,,en;q="), "en");
  assert.equal(negotiateLocale(null, "fr;q=0"), "en");
});

test("isLocale", () => {
  assert.ok(isLocale("fr"));
  assert.ok(!isLocale("FR"));
  assert.ok(!isLocale(undefined));
});

test("switchLocalePath keeps the rest of the path", () => {
  assert.equal(switchLocalePath("/fr/work/secret", "en"), "/en/work/secret");
  assert.equal(switchLocalePath("/en", "fr"), "/fr");
  assert.equal(switchLocalePath("/", "fr"), "/fr");
  assert.equal(switchLocalePath("/work", "en"), "/en/work");
});

test("localePath", () => {
  assert.equal(localePath("fr"), "/fr");
  assert.equal(localePath("en", "/work"), "/en/work");
  assert.equal(localePath("en", "cv"), "/en/cv");
});
