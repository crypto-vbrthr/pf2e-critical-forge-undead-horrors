import { MODULE_VERSION, PACK_IDS } from "../constants.js";
import { CRITICAL_HITS_AGAINST_UNDEAD_CARDS } from "../cards/critical-hits-against-undead-cards.js";

export function createCriticalHitsAgainstUndeadPack({ enabled = true } = {}) {
  return {
    schemaVersion: 1,
    id: PACK_IDS.CRITICAL_HITS_AGAINST_UNDEAD,
    titleKey: "PF2E_CRITICAL_FORGE_UNDEAD_HORRORS.Packs.CriticalHitsAgainstUndead.Title",
    descriptionKey: "PF2E_CRITICAL_FORGE_UNDEAD_HORRORS.Packs.CriticalHitsAgainstUndead.Description",
    fallbackTitle: "Critical Hits against Undead",
    fallbackDescription: "Special consequences when an undead creature suffers a critical hit.",
    version: MODULE_VERSION,
    priority: 30,
    enabled,
    metadata: {
      theme: "undead-horrors",
      direction: "target-undead",
      outcome: "critical-hit",
      semanticCardCount: 30,
      categoryMirroring: ["criticalHit", "spellCriticalHit"]
    },
    decks: { attack: CRITICAL_HITS_AGAINST_UNDEAD_CARDS }
  };
}
