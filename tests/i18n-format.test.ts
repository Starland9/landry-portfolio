import { test } from "node:test";
import assert from "node:assert/strict";
import {
  deepFrenchTypography,
  format,
  frenchTypography,
} from "../src/i18n/format.ts";

const NBSP = "\u00a0";
const NNBSP = "\u202f";

test("format replaces known placeholders only", () => {
  assert.equal(
    format("{count} projets depuis {year}", { count: 17, year: 2020 }),
    "17 projets depuis 2020",
  );
  assert.equal(format("Hello {name}", {}), "Hello {name}");
});

test("non-breaking space before : ; ! ? and %", () => {
  assert.equal(frenchTypography("Bonus : morpion"), `Bonus${NBSP}: morpion`);
  assert.equal(frenchTypography("Un projet ?"), `Un projet${NBSP}?`);
  assert.equal(frenchTypography("Gagné !"), `Gagné${NBSP}!`);
  assert.equal(frenchTypography("50 %"), `50${NBSP}%`);
});

test("URLs and text without spaces are untouched", () => {
  assert.equal(frenchTypography("https://example.com"), "https://example.com");
  assert.equal(frenchTypography("a:b"), "a:b");
});

test("thousands use a narrow no-break space", () => {
  assert.equal(frenchTypography("9 000+ tests"), `9${NNBSP}000+ tests`);
  assert.equal(frenchTypography("en 2024 2025"), "en 2024 2025");
});

test("guillemets get inner no-break spaces", () => {
  assert.equal(frenchTypography("« bonjour »"), `«${NBSP}bonjour${NBSP}»`);
});

test("deepFrenchTypography walks objects and arrays", () => {
  assert.deepEqual(
    deepFrenchTypography({ a: ["x ?"], b: { c: "y !" }, n: 1 }),
    {
      a: [`x${NBSP}?`],
      b: { c: `y${NBSP}!` },
      n: 1,
    },
  );
});
