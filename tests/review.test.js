import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { MODULE_VERSION } from "../scripts/constants.js";
import { UNDEAD_CRITICAL_HIT_CARDS } from "../scripts/cards/undead-critical-hit-cards.js";
import { UNDEAD_CRITICAL_FUMBLE_CARDS } from "../scripts/cards/undead-critical-fumble-cards.js";
import { CRITICAL_HITS_AGAINST_UNDEAD_CARDS } from "../scripts/cards/critical-hits-against-undead-cards.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const semantic = (cards) => cards.filter((card, index) =>
  cards.findIndex((candidate) => candidate.metadata.conceptId === card.metadata.conceptId) === index
);

const HIT_BY = semantic(UNDEAD_CRITICAL_HIT_CARDS);
const FUMBLE_BY = semantic(UNDEAD_CRITICAL_FUMBLE_CARDS);
const HIT_AGAINST = semantic(CRITICAL_HITS_AGAINST_UNDEAD_CARDS);
const ALL = [...HIT_BY, ...FUMBLE_BY, ...HIT_AGAINST];

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), "utf8"));
}

function flatten(value, prefix = "", out = new Map()) {
  for (const [key, child] of Object.entries(value)) {
    const full = prefix ? `${prefix}.${key}` : key;
    if (child && typeof child === "object" && !Array.isArray(child)) flatten(child, full, out);
    else out.set(full, child);
  }
  return out;
}

function getPath(object, dotted) {
  return dotted.split(".").reduce((value, key) => value?.[key], object);
}

function includesAll(actual, expected) {
  return expected.every((value) => actual.includes(value));
}

function intersects(left, right) {
  return left.some((value) => right.includes(value));
}

function eligible(card, context) {
  const f = card.filters;
  if (f.damageTypes.length && !intersects(f.damageTypes, context.damageTypes ?? [])) return false;
  if (f.sourceTraits.length && !includesAll(context.sourceTraits ?? [], f.sourceTraits)) return false;
  if (f.targetTraits.length && !includesAll(context.targetTraits ?? [], f.targetTraits)) return false;
  if (intersects(f.excludedSourceTraits, context.sourceTraits ?? [])) return false;
  if (intersects(f.excludedTargetTraits, context.targetTraits ?? [])) return false;
  return true;
}

function concept(cards, slug) {
  const found = cards.find((card) => card.metadata.conceptId.endsWith(`.${slug}`));
  assert.ok(found, `Missing reviewed concept ${slug}`);
  return found;
}

test("release metadata is aligned at 0.4.0", () => {
  const moduleJson = readJson("module.json");
  const packageJson = readJson("package.json");
  assert.equal(MODULE_VERSION, "0.4.0");
  assert.equal(moduleJson.version, MODULE_VERSION);
  assert.equal(packageJson.version, MODULE_VERSION);
});

test("German and English localization trees have identical key coverage", () => {
  const de = flatten(readJson("lang/de.json"));
  const en = flatten(readJson("lang/en.json"));
  assert.deepEqual([...de.keys()].sort(), [...en.keys()].sort());
  assert.equal([...de.values()].some((value) => value === ""), false);
  assert.equal([...en.values()].some((value) => value === ""), false);
});

test("every card title, description, and automated effect name resolves in both languages", () => {
  const de = readJson("lang/de.json");
  const en = readJson("lang/en.json");
  for (const card of ALL) {
    for (const localization of [de, en]) {
      assert.equal(typeof getPath(localization, card.titleKey), "string", card.titleKey);
      assert.equal(typeof getPath(localization, card.descriptionKey), "string", card.descriptionKey);
      if (card.effect?.nameKey) assert.equal(typeof getPath(localization, card.effect.nameKey), "string", card.effect.nameKey);
    }
  }
});

test("manual and partial results declare their automation remainder explicitly", () => {
  for (const card of ALL) {
    if (!card.effect) assert.equal(card.metadata.automation, "manual", card.metadata.conceptId);
    if (card.metadata.automation === "partial") {
      assert.ok(card.effect, card.metadata.conceptId);
      assert.equal(typeof card.metadata.manualRemainder, "string", card.metadata.conceptId);
      assert.ok(card.metadata.manualRemainder.length > 0, card.metadata.conceptId);
    }
  }
});

test("corporeal and incorporeal specializations cannot cross-match", () => {
  for (const card of FUMBLE_BY.filter((card) => card.tags.includes("corporeal"))) {
    assert.ok(card.filters.excludedSourceTraits.includes("incorporeal"), card.metadata.conceptId);
  }
  for (const card of FUMBLE_BY.filter((card) => card.tags.includes("incorporeal"))) {
    assert.ok(card.filters.sourceTraits.includes("incorporeal"), card.metadata.conceptId);
  }
  for (const card of HIT_AGAINST.filter((card) => card.tags.includes("corporeal"))) {
    assert.ok(card.filters.excludedTargetTraits.includes("incorporeal"), card.metadata.conceptId);
  }
  for (const card of HIT_AGAINST.filter((card) => card.tags.includes("incorporeal"))) {
    assert.ok(card.filters.targetTraits.includes("incorporeal"), card.metadata.conceptId);
  }
});

test("living-target results exclude undead and constructs", () => {
  for (const card of [...HIT_BY, ...FUMBLE_BY].filter((card) => card.tags.includes("living"))) {
    assert.ok(card.filters.excludedTargetTraits.includes("undead"), card.metadata.conceptId);
    assert.ok(card.filters.excludedTargetTraits.includes("construct"), card.metadata.conceptId);
  }
});

test("reviewed density changes remain distinct", () => {
  const spectralShock = concept(HIT_BY, "spectral-shock");
  const deathComesApart = concept(FUMBLE_BY, "death-comes-apart");
  const structuralCollapse = concept(HIT_AGAINST, "structural-collapse");

  assert.deepEqual(spectralShock.effect.definition.components, [{ type: "condition", slug: "dazzled" }]);
  assert.deepEqual(deathComesApart.effect.definition.components, [{ type: "condition", slug: "prone" }]);
  assert.deepEqual(structuralCollapse.effect.definition.components, [{ type: "condition", slug: "prone" }]);
  assert.equal(structuralCollapse.metadata.automation, undefined);
});

test("Rage Against the Living cannot match undead or construct targets", () => {
  const rage = concept(FUMBLE_BY, "rage-against-the-living");
  assert.ok(rage.filters.excludedTargetTraits.includes("undead"));
  assert.ok(rage.filters.excludedTargetTraits.includes("construct"));
});

test("German manipulate-trait wording uses the official Handhaben terminology", () => {
  const de = readJson("lang/de.json");
  const text = de.PF2E_CRITICAL_FORGE_UNDEAD_HORRORS.Cards.UndeadCriticalFumbles.PartsEverywhere.Description;
  assert.match(text, /Kategorie Handhaben/);
  assert.doesNotMatch(text, /Merkmal Manipulieren/);
});

test("representative encounter profiles retain healthy eligible-card density", () => {
  const profiles = [
    ["critical hit by corporeal undead vs living", HIT_BY, { sourceTraits: ["undead"], targetTraits: ["humanoid"], damageTypes: ["slashing"] }, 20],
    ["critical fumble by incorporeal undead", FUMBLE_BY, { sourceTraits: ["undead", "incorporeal"], targetTraits: ["humanoid"], damageTypes: ["void"] }, 12],
    ["critical hit against mindless corporeal undead", HIT_AGAINST, { sourceTraits: ["humanoid"], targetTraits: ["undead", "mindless"], damageTypes: ["bludgeoning"] }, 15],
    ["critical hit against incorporeal undead", HIT_AGAINST, { sourceTraits: ["humanoid"], targetTraits: ["undead", "incorporeal"], damageTypes: ["spirit"] }, 12]
  ];

  for (const [name, cards, context, minimum] of profiles) {
    const count = cards.filter((card) => eligible(card, context)).length;
    assert.ok(count >= minimum, `${name}: only ${count} eligible outcomes`);
  }
});
