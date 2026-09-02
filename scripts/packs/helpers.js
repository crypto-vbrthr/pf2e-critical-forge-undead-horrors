export const MODULE_ID = "pf2e-critical-forge-undead-horrors";
export const PACK_ID = `${MODULE_ID}.undead-horrors`;
export const ONE_ROUND = Object.freeze({ value: 1, unit: "rounds", expiry: "turn-end" });

const EMPTY_FILTERS = Object.freeze({
  damageTypes: [], weaponGroups: [], attackTraits: [], excludedAttackTraits: [], saveTypes: [],
  skillTypes: [], actionSlugs: [], itemTypes: [], itemTraits: [], excludedItemTraits: [],
  spellTraditions: [], spellTraits: [], sourceTraits: [], targetTraits: [],
  excludedSourceTraits: [], excludedTargetTraits: []
});

export function undeadCard({ id, key, category, tone = "dramatic", impact = "moderate", title, description, filters = {}, effect = null, tags = [] }) {
  return Object.freeze({
    schemaVersion: 1,
    id: `${MODULE_ID}.${id}`,
    packId: PACK_ID,
    category,
    deckType: "attack",
    tone,
    impact,
    titleKey: `PF2E_CRITICAL_FORGE_UNDEAD_HORRORS.Cards.${key}.Title`,
    descriptionKey: `PF2E_CRITICAL_FORGE_UNDEAD_HORRORS.Cards.${key}.Description`,
    fallbackTitle: title,
    fallbackDescription: description,
    weight: 1,
    tags: ["undead-horrors", ...tags],
    filters: { ...EMPTY_FILTERS, ...filters },
    conditions: null,
    effect,
    metadata: { theme: "undead" }
  });
}

export function effect(target, components, duration = ONE_ROUND) {
  return { target, nameKey: "PF2E_CRITICAL_FORGE_UNDEAD_HORRORS.EffectName", fallbackName: "Undead Horror", definition: { schemaVersion: 2, duration, components } };
}
