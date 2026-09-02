import { MODULE_VERSION, PACK_IDS } from "../constants.js";

export function createUndeadCriticalHitsPack({ enabled = true } = {}) {
  return {
    schemaVersion: 1,
    id: PACK_IDS.UNDEAD_CRITICAL_HITS,
    titleKey: "PF2E_CRITICAL_FORGE_UNDEAD_HORRORS.Packs.UndeadCriticalHits.Title",
    descriptionKey: "PF2E_CRITICAL_FORGE_UNDEAD_HORRORS.Packs.UndeadCriticalHits.Description",
    fallbackTitle: "Critical Hits by Undead",
    fallbackDescription: "Special critical-hit consequences when an undead creature is the attacker.",
    version: MODULE_VERSION,
    priority: 30,
    enabled,
    metadata: {
      theme: "undead-horrors",
      direction: "source-undead",
      outcome: "critical-hit"
    },
    decks: { attack: [] }
  };
}
