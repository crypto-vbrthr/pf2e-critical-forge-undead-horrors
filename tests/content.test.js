import test from "node:test";
import assert from "node:assert/strict";
import { createUndeadCriticalHitsPack } from "../scripts/packs/undead-critical-hits.js";
import { createUndeadCriticalFumblesPack } from "../scripts/packs/undead-critical-fumbles.js";
import {
  UNDEAD_CRITICAL_HIT_CARDS,
  UNDEAD_CRITICAL_HIT_CONCEPT_COUNT
} from "../scripts/cards/undead-critical-hit-cards.js";
import {
  UNDEAD_CRITICAL_FUMBLE_CARDS,
  UNDEAD_CRITICAL_FUMBLE_CONCEPT_COUNT
} from "../scripts/cards/undead-critical-fumble-cards.js";

function verifyMirroredConcepts(cards, semanticCount, categories) {
  assert.equal(cards.length, semanticCount * categories.length);
  const concepts = new Map();

  for (const card of cards) {
    assert.deepEqual(card.filters.sourceTraits.includes("undead"), true);
    assert.equal(card.deckType, "attack");
    const entries = concepts.get(card.metadata.conceptId) ?? [];
    entries.push(card.category);
    concepts.set(card.metadata.conceptId, entries);
  }

  assert.equal(concepts.size, semanticCount);
  for (const conceptCategories of concepts.values()) {
    assert.deepEqual(conceptCategories.sort(), [...categories].sort());
  }
}

test("critical-hit deck contains 30 semantic outcomes mirrored for strike and spell attack criticals", () => {
  assert.equal(UNDEAD_CRITICAL_HIT_CONCEPT_COUNT, 30);
  verifyMirroredConcepts(
    UNDEAD_CRITICAL_HIT_CARDS,
    UNDEAD_CRITICAL_HIT_CONCEPT_COUNT,
    ["criticalHit", "spellCriticalHit"]
  );
});

test("critical-fumble deck contains 30 semantic outcomes mirrored for strike and spell attack fumbles", () => {
  assert.equal(UNDEAD_CRITICAL_FUMBLE_CONCEPT_COUNT, 30);
  verifyMirroredConcepts(
    UNDEAD_CRITICAL_FUMBLE_CARDS,
    UNDEAD_CRITICAL_FUMBLE_CONCEPT_COUNT,
    ["criticalFumble", "spellCriticalFumble"]
  );
});

test("critical-hit pack exposes the mirrored attack deck", () => {
  const pack = createUndeadCriticalHitsPack({ enabled: true });
  assert.equal(pack.metadata.semanticCardCount, 30);
  assert.equal(pack.decks.attack.length, 60);
  assert.equal(pack.enabled, true);
});

test("critical-fumble pack exposes the mirrored attack deck", () => {
  const pack = createUndeadCriticalFumblesPack({ enabled: true });
  assert.equal(pack.metadata.semanticCardCount, 30);
  assert.equal(pack.decks.attack.length, 60);
  assert.equal(pack.enabled, true);
});
