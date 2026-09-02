import { MODULE_VERSION, PACK_IDS } from "../constants.js";

export function createUndeadCriticalFumblesPack({ enabled = true } = {}) {
  return {
    schemaVersion: 1,
    id: PACK_IDS.UNDEAD_CRITICAL_FUMBLES,
    titleKey: "PF2E_CRITICAL_FORGE_UNDEAD_HORRORS.Packs.UndeadCriticalFumbles.Title",
    descriptionKey: "PF2E_CRITICAL_FORGE_UNDEAD_HORRORS.Packs.UndeadCriticalFumbles.Description",
    fallbackTitle: "Critical Fumbles by Undead",
    fallbackDescription: "Special critical-fumble consequences when an undead creature is the attacker.",
    version: MODULE_VERSION,
    priority: 30,
    enabled,
    metadata: {
      theme: "undead-horrors",
      direction: "source-undead",
      outcome: "critical-fumble"
    },
    decks: { attack: [] }
  };
}
