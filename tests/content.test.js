import test from "node:test";
import assert from "node:assert/strict";
import { createUndeadCriticalHitsPack } from "../scripts/packs/undead-critical-hits.js";
import {
  UNDEAD_CRITICAL_HIT_CARDS,
  UNDEAD_CRITICAL_HIT_CONCEPT_COUNT
} from "../scripts/cards/undead-critical-hit-cards.js";

test("critical-hit deck contains 30 semantic outcomes mirrored for strike and spell attack criticals", () => {
  assert.equal(UNDEAD_CRITICAL_HIT_CONCEPT_COUNT, 30);
  assert.equal(UNDEAD_CRITICAL_HIT_CARDS.length, 60);

  const concepts = new Map();
  for (const card of UNDEAD_CRITICAL_HIT_CARDS) {
    assert.deepEqual(card.filters.sourceTraits.includes("undead"), true);
    assert.equal(card.deckType, "attack");
    const entries = concepts.get(card.metadata.conceptId) ?? [];
    entries.push(card.category);
    concepts.set(card.metadata.conceptId, entries);
  }

  assert.equal(concepts.size, 30);
  for (const categories of concepts.values()) {
    assert.deepEqual(categories.sort(), ["criticalHit", "spellCriticalHit"].sort());
  }
});

test("critical-hit pack exposes the mirrored attack deck", () => {
  const pack = createUndeadCriticalHitsPack({ enabled: true });
  assert.equal(pack.metadata.semanticCardCount, 30);
  assert.equal(pack.decks.attack.length, 60);
  assert.equal(pack.enabled, true);
});
