import { test } from "node:test";
import assert from "node:assert/strict";
import {
  normalizeContact,
  validateContact,
  type ContactInput,
} from "../src/lib/contact/validate.ts";
import {
  createDuplicateGuard,
  createRateLimiter,
} from "../src/lib/contact/rate-limit.ts";

const messages = {
  name: "NAME",
  email: "EMAIL",
  messageShort: "SHORT",
  messageLong: "LONG",
};
const valid: ContactInput = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  reason: "job",
  message: "Hello, I have a role for you.",
  locale: "en",
};
const check = (patch: Partial<ContactInput>) =>
  validateContact({ ...valid, ...patch }, messages);

test("a valid message has no errors", () => {
  assert.deepEqual(check({}), {});
});

test("name length boundaries (2–100)", () => {
  assert.equal(check({ name: "A" }).name, "NAME");
  assert.equal(check({ name: "Al" }).name, undefined);
  assert.equal(check({ name: "x".repeat(100) }).name, undefined);
  assert.equal(check({ name: "x".repeat(101) }).name, "NAME");
});

test("line breaks in the name are refused", () => {
  assert.equal(check({ name: "Ada\nBcc: spam@example.com" }).name, "NAME");
});

test("e-mail format and length", () => {
  assert.equal(check({ email: "ada@example" }).email, "EMAIL");
  assert.equal(check({ email: "ada example.com" }).email, "EMAIL");
  assert.equal(check({ email: `${"a".repeat(250)}@x.io` }).email, "EMAIL");
});

test("message length boundaries (10–5000)", () => {
  assert.equal(check({ message: "x".repeat(9) }).message, "SHORT");
  assert.equal(check({ message: "x".repeat(10) }).message, undefined);
  assert.equal(check({ message: "x".repeat(5000) }).message, undefined);
  assert.equal(check({ message: "x".repeat(5001) }).message, "LONG");
});

test("normalizeContact trims and applies safe defaults", () => {
  const input = normalizeContact({
    name: "  Ada ",
    email: " a@b.co ",
    reason: "hack",
    message: "  hi  ",
    locale: "de",
  });
  assert.deepEqual(input, {
    name: "Ada",
    email: "a@b.co",
    reason: "other",
    message: "hi",
    locale: "en",
  });
  assert.equal(
    normalizeContact({ reason: "freelance", locale: "fr" }).reason,
    "freelance",
  );
  assert.equal(normalizeContact({ locale: "fr" }).locale, "fr");
});

test("rate limiter: 5 per hour per key, then allowed again", () => {
  let time = 0;
  const limiter = createRateLimiter({ now: () => time });
  for (let i = 0; i < 5; i++) assert.ok(limiter.check("1.2.3.4"));
  assert.equal(limiter.check("1.2.3.4"), false, "6th hit refused");
  assert.ok(limiter.check("5.6.7.8"), "other keys are independent");
  time = 60 * 60 * 1000;
  assert.ok(limiter.check("1.2.3.4"), "allowed after the window");
});

test("duplicate guard: same fingerprint within 60 s", () => {
  let time = 0;
  const guard = createDuplicateGuard({ now: () => time });
  assert.equal(guard.isDuplicate("a|hello"), false);
  guard.remember("a|hello");
  time = 30_000;
  assert.equal(guard.isDuplicate("a|hello"), true);
  assert.equal(guard.isDuplicate("a|other"), false);
  time = 60_000;
  assert.equal(guard.isDuplicate("a|hello"), false);
});
