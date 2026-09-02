import { PACK_IDS } from "../constants.js";

const PACK_ID = PACK_IDS.UNDEAD_CRITICAL_HITS;
const ONE_ROUND_END = Object.freeze({ value: 1, unit: "rounds", expiry: "turn-end" });
const ONE_ROUND_START = Object.freeze({ value: 1, unit: "rounds", expiry: "turn-start" });

const EMPTY_FILTERS = Object.freeze({
  damageTypes: Object.freeze([]),
  weaponGroups: Object.freeze([]),
  attackTraits: Object.freeze([]),
  excludedAttackTraits: Object.freeze([]),
  saveTypes: Object.freeze([]),
  skillTypes: Object.freeze([]),
  actionSlugs: Object.freeze([]),
  itemTypes: Object.freeze([]),
  itemTraits: Object.freeze([]),
  excludedItemTraits: Object.freeze([]),
  spellTraditions: Object.freeze([]),
  spellTraits: Object.freeze([]),
  sourceTraits: Object.freeze([]),
  targetTraits: Object.freeze([]),
  excludedSourceTraits: Object.freeze([]),
  excludedTargetTraits: Object.freeze([])
});

const CONCEPTS = [
  {
    slug: "grave-chill", key: "GraveChill", tone: "dramatic", impact: "moderate",
    title: "Grave Chill", description: "Grave-cold power seeps into the victim. The target takes a 10-foot status penalty to all Speeds until the end of its next turn.",
    tags: ["cold", "movement", "debuff"],
    effect: targetEffect("Grave Chill", ONE_ROUND_END, [movement("all", -10, "status")])
  },
  {
    slug: "withering-blow", key: "WitheringBlow", tone: "serious", impact: "moderate",
    title: "Withering Blow", description: "The strike drains strength from living motion. The target is enfeebled 1 until the end of its next turn.",
    tags: ["debuff", "strength"],
    effect: targetEffect("Withering Blow", ONE_ROUND_END, [condition("enfeebled", 1)])
  },
  {
    slug: "numbing-touch", key: "NumbingTouch", tone: "dramatic", impact: "moderate",
    title: "Numbing Touch", description: "Deathly numbness crawls through muscle and nerve. The target is clumsy 1 until the end of its next turn.",
    tags: ["debuff", "dexterity"],
    effect: targetEffect("Numbing Touch", ONE_ROUND_END, [condition("clumsy", 1)])
  },
  {
    slug: "soul-shaken", key: "SoulShaken", tone: "dramatic", impact: "moderate",
    title: "Soul-Shaken", description: "The blow brushes something deeper than flesh. The target is stupefied 1 until the end of its next turn.",
    tags: ["spirit", "debuff"],
    effect: targetEffect("Soul-Shaken", ONE_ROUND_END, [condition("stupefied", 1)])
  },
  {
    slug: "face-of-death", key: "FaceOfDeath", tone: "dramatic", impact: "moderate",
    title: "Face of Death", description: "For one terrible heartbeat, the victim sees death staring back. The target becomes frightened 1.",
    tags: ["fear", "mental"], filters: { excludedTargetTraits: ["mindless"] },
    effect: targetEffect("Face of Death", ONE_ROUND_END, [condition("frightened", 1)])
  },
  {
    slug: "deathly-opening", key: "DeathlyOpening", tone: "serious", impact: "moderate",
    title: "Deathly Opening", description: "The unnatural impact tears open the target's guard. The target is off-guard until the end of its next turn.",
    tags: ["control", "defense"],
    effect: targetEffect("Deathly Opening", ONE_ROUND_END, [condition("off-guard")])
  },
  {
    slug: "frozen-reflexes", key: "FrozenReflexes", tone: "serious", impact: "light",
    title: "Frozen Reflexes", description: "The target's reactions turn sluggish and cold. It takes a -1 status penalty to Reflex saves until the end of its next turn.",
    tags: ["reflex", "debuff"],
    effect: targetEffect("Frozen Reflexes", ONE_ROUND_END, [modifier("reflex", -1, "status")])
  },
  {
    slug: "strength-of-the-grave", key: "StrengthOfTheGrave", tone: "dramatic", impact: "light",
    title: "Strength of the Grave", description: "The critical hit feeds the force animating the dead. The undead attacker gains 4 temporary Hit Points for 1 round.",
    tags: ["boon", "temporary-hit-points"],
    effect: sourceEffect("Strength of the Grave", ONE_ROUND_END, [{ type: "temporaryHitPoints", value: 4 }]),
    metadata: { balanceNote: "Fixed 4 THP in v0.1.0; the Effect Engine does not currently support level-scaled TempHP values in card templates." }
  },
  {
    slug: "unnatural-momentum", key: "UnnaturalMomentum", tone: "dramatic", impact: "light",
    title: "Unnatural Momentum", description: "The dead attacker flows straight into its next assault. It gains a +1 circumstance bonus to attack rolls for 1 round.",
    tags: ["boon", "attack"],
    effect: sourceEffect("Unnatural Momentum", ONE_ROUND_END, [modifier("attack", 1, "circumstance")])
  },
  {
    slug: "grasp-of-the-dead", key: "GraspOfTheDead", tone: "dramatic", impact: "strong",
    title: "Grasp of the Dead", description: "The victim's instincts freeze under the touch of death. Until the beginning of its next turn, the target can't use reactions.",
    tags: ["control", "manual"], effect: null, metadata: { automation: "manual" }
  },
  {
    slug: "necrotic-wound", key: "NecroticWound", tone: "serious", impact: "moderate",
    title: "Necrotic Wound", description: "The wound darkens at once as void energy gnaws at living tissue. The target takes 1d4 persistent void damage.",
    tags: ["void", "persistent-damage"], filters: { excludedTargetTraits: ["undead", "construct"] },
    effect: targetEffect("Necrotic Wound", null, [{ type: "persistentDamage", formula: "1d4", damageType: "void" }])
  },
  {
    slug: "withered-constitution", key: "WitheredConstitution", tone: "serious", impact: "light",
    title: "Withered Constitution", description: "The target's vitality gutters. It takes a -1 status penalty to Fortitude saves until the end of its next turn.",
    tags: ["living", "fortitude", "debuff"], filters: { excludedTargetTraits: ["undead", "construct"] },
    effect: targetEffect("Withered Constitution", ONE_ROUND_END, [modifier("fortitude", -1, "status")])
  },
  {
    slug: "deaths-pall", key: "DeathsPall", tone: "dramatic", impact: "moderate",
    title: "Death's Pall", description: "The target's guard falters specifically against the undead attacker. Until the undead finishes its next turn, the target takes a -1 status penalty to AC against that attacker.",
    tags: ["defense", "manual"], effect: null, metadata: { automation: "manual", reason: "Target-specific AC predicates are not encoded by the Critical Forge card Effect schema." }
  },
  {
    slug: "the-grave-hungers", key: "TheGraveHungers", tone: "dramatic", impact: "moderate",
    title: "The Grave Hungers", description: "A fragment of stolen vitality clings to the attacker. Against a living target, the undead gains 3 temporary Hit Points for 1 round.",
    tags: ["living", "boon", "temporary-hit-points"], filters: { excludedTargetTraits: ["undead", "construct"] },
    effect: sourceEffect("The Grave Hungers", ONE_ROUND_END, [{ type: "temporaryHitPoints", value: 3 }]),
    metadata: { balanceNote: "Fixed 3 THP in v0.1.0; damage-derived TempHP values are not supported by card templates." }
  },
  {
    slug: "deaths-weight", key: "DeathsWeight", tone: "serious", impact: "moderate",
    title: "Death's Weight", description: "The blow leaves the victim unable to make the careful footwork of a Step until the end of its next turn.",
    tags: ["movement", "manual"], effect: null, metadata: { automation: "manual" }
  },
  {
    slug: "deadening-blow", key: "DeadeningBlow", tone: "serious", impact: "light",
    title: "Deadening Blow", description: "The world seems muffled and distant. The target takes a -1 status penalty to Perception until the end of its next turn.",
    tags: ["perception", "debuff"],
    effect: targetEffect("Deadening Blow", ONE_ROUND_END, [modifier("perception", -1, "status")])
  },
  {
    slug: "rotting-pain", key: "RottingPain", tone: "serious", impact: "light",
    title: "Rotting Pain", description: "The injury makes every forceful or precise motion revolt. The target takes a -1 status penalty to Strength- and Dexterity-based checks until the end of its next turn.",
    tags: ["skill", "debuff"],
    effect: targetEffect("Rotting Pain", ONE_ROUND_END, [modifier(["str-based", "dex-based"], -1, "status")])
  },
  {
    slug: "graves-embrace", key: "GravesEmbrace", tone: "dramatic", impact: "light",
    title: "Grave's Embrace", description: "The target moves as if the grave itself were holding on. It takes a -1 status penalty to Athletics and Acrobatics until the end of its next turn.",
    tags: ["athletics", "acrobatics", "debuff"],
    effect: targetEffect("Grave's Embrace", ONE_ROUND_END, [modifier(["athletics", "acrobatics"], -1, "status")])
  },
  {
    slug: "unholy-persistence", key: "UnholyPersistence", tone: "dramatic", impact: "light",
    title: "Unholy Persistence", description: "The successful violence reinforces the undead's unnatural persistence. It gains a +1 status bonus to saving throws for 1 round.",
    tags: ["boon", "saving-throw"],
    effect: sourceEffect("Unholy Persistence", ONE_ROUND_END, [modifier("saving-throw", 1, "status")])
  },
  {
    slug: "death-does-not-tire", key: "DeathDoesNotTire", tone: "serious", impact: "light",
    title: "Death Does Not Tire", description: "Until the beginning of its next turn, the undead ignores the first -1 status penalty that would apply to one of its attack rolls.",
    tags: ["boon", "manual"], effect: null, metadata: { automation: "manual" }
  },
  {
    slug: "whispers-beyond-the-veil", key: "WhispersBeyondTheVeil", tone: "dramatic", impact: "light",
    title: "Whispers Beyond the Veil", description: "Voices from somewhere beyond death crowd the victim's thoughts. The target takes a -1 status penalty to Will saves until the end of its next turn.",
    tags: ["will", "spirit", "debuff"], filters: { excludedTargetTraits: ["mindless"] },
    effect: targetEffect("Whispers Beyond the Veil", ONE_ROUND_END, [modifier("will", -1, "status")])
  },
  {
    slug: "moment-of-mortality", key: "MomentOfMortality", tone: "dramatic", impact: "moderate",
    title: "Moment of Mortality", description: "The living body recoils from intimate contact with death. The target becomes sickened 1.",
    tags: ["living", "sickened"], filters: { excludedTargetTraits: ["undead", "construct", "incorporeal"] },
    effect: targetEffect("Moment of Mortality", ONE_ROUND_END, [condition("sickened", 1)])
  },
  {
    slug: "predator-of-the-living", key: "PredatorOfTheLiving", tone: "dramatic", impact: "light",
    title: "Predator of the Living", description: "The intelligent undead learns the victim's rhythm. It gains a +1 circumstance bonus to its next attack against that same target before the end of its next turn.",
    tags: ["intelligent", "living", "manual"], filters: { excludedSourceTraits: ["mindless"], excludedTargetTraits: ["undead", "construct"] },
    effect: null, metadata: { automation: "manual", reason: "The bonus is restricted to one specific target." }
  },
  {
    slug: "cruel-satisfaction", key: "CruelSatisfaction", tone: "dramatic", impact: "light",
    title: "Cruel Satisfaction", description: "The intelligent undead savors the opening. Until the end of its next turn, it gains a +1 status bonus to damage against the creature it critically hit.",
    tags: ["intelligent", "damage", "manual"], filters: { excludedSourceTraits: ["mindless"] },
    effect: null, metadata: { automation: "manual", reason: "The damage bonus is restricted to one specific target." }
  },
  {
    slug: "mindless-onslaught", key: "MindlessOnslaught", tone: "dramatic", impact: "moderate",
    title: "Mindless Onslaught", description: "The mindless dead lunges on without concern for defense. For 1 round it gains a +1 circumstance bonus to melee attack rolls and takes a -1 circumstance penalty to AC.",
    tags: ["mindless", "offense", "risk"], filters: { sourceTraits: ["mindless"] },
    effect: sourceEffect("Mindless Onslaught", ONE_ROUND_END, [modifier("melee-attack-roll", 1, "circumstance"), modifier("ac", -1, "circumstance")])
  },
  {
    slug: "unthinking-advance", key: "UnthinkingAdvance", tone: "dramatic", impact: "light",
    title: "Unthinking Advance", description: "Driven only by the next impact, the mindless undead immediately moves 5 feet toward the target if it can do so safely and without triggering a reaction.",
    tags: ["mindless", "movement", "manual"], filters: { sourceTraits: ["mindless"] },
    effect: null, metadata: { automation: "manual" }
  },
  {
    slug: "spectral-shock", key: "SpectralShock", tone: "dramatic", impact: "moderate",
    title: "Spectral Shock", description: "The incorporeal attacker passes too close to thought itself. The target is stupefied 1 until the end of its next turn.",
    tags: ["incorporeal", "spirit", "debuff"], filters: { sourceTraits: ["incorporeal"] },
    effect: targetEffect("Spectral Shock", ONE_ROUND_END, [condition("stupefied", 1)])
  },
  {
    slug: "through-flesh-and-soul", key: "ThroughFleshAndSoul", tone: "dramatic", impact: "strong",
    title: "Through Flesh and Soul", description: "The apparition cuts through body and spirit at once. The target takes a -1 status penalty to Will saves until the end of its next turn and can't use reactions until the beginning of that turn.",
    tags: ["incorporeal", "spirit", "control"], filters: { sourceTraits: ["incorporeal"] },
    effect: targetEffect("Through Flesh and Soul", ONE_ROUND_END, [modifier("will", -1, "status")]),
    metadata: { automation: "partial", manualRemainder: "The target can't use reactions until the beginning of its next turn." }
  },
  {
    slug: "unmoored-spirit", key: "UnmooredSpirit", tone: "dramatic", impact: "strong",
    title: "Unmoored Spirit", description: "Body and spirit slip briefly out of alignment. Until the beginning of its next turn, the target is off-guard and takes a -1 status penalty to Reflex saves.",
    tags: ["incorporeal", "spirit", "control"], filters: { sourceTraits: ["incorporeal"] },
    effect: targetEffect("Unmoored Spirit", ONE_ROUND_START, [condition("off-guard"), modifier("reflex", -1, "status")])
  },
  {
    slug: "cold-hand-of-the-beyond", key: "ColdHandOfTheBeyond", tone: "dramatic", impact: "strong",
    title: "Cold Hand of the Beyond", description: "Death clings to the wound. Until the end of its next turn, the living target can't benefit from fast healing or regeneration.",
    tags: ["living", "healing", "manual"], filters: { excludedTargetTraits: ["undead", "construct"] },
    effect: null, metadata: { automation: "manual", reason: "The Effect schema can grant fast healing and regeneration, but does not currently suppress existing sources." }
  }
];

export const UNDEAD_CRITICAL_HIT_CONCEPT_COUNT = CONCEPTS.length;
export const UNDEAD_CRITICAL_HIT_CARDS = Object.freeze(CONCEPTS.flatMap((concept) => createCategoryVariants(concept)));

function createCategoryVariants(concept) {
  return [
    createCard(concept, "criticalHit", "strike"),
    createCard(concept, "spellCriticalHit", "spell")
  ];
}

function createCard(concept, category, variant) {
  const root = `PF2E_CRITICAL_FORGE_UNDEAD_HORRORS.Cards.UndeadCriticalHits.${concept.key}`;
  const filters = mergeFilters(concept.filters ?? {});
  filters.sourceTraits = [...new Set(["undead", ...filters.sourceTraits])];

  return Object.freeze({
    schemaVersion: 1,
    id: `${PACK_ID}.${concept.slug}.${variant}`,
    category,
    deckType: "attack",
    tone: concept.tone,
    impact: concept.impact,
    titleKey: `${root}.Title`,
    descriptionKey: `${root}.Description`,
    fallbackTitle: concept.title,
    fallbackDescription: concept.description,
    weight: concept.weight ?? 1,
    tags: ["undead-horrors", "undead-critical-hit", ...concept.tags],
    filters,
    effect: localizeEffect(concept.effect, root),
    metadata: {
      conceptId: `${PACK_ID}.${concept.slug}`,
      categoryVariant: variant,
      ...(concept.metadata ?? {})
    }
  });
}

function localizeEffect(effect, root) {
  if (!effect) return null;
  return {
    ...effect,
    nameKey: `${root}.EffectName`
  };
}

function mergeFilters(filters) {
  const merged = {};
  for (const [key, value] of Object.entries(EMPTY_FILTERS)) merged[key] = [...value];
  for (const [key, value] of Object.entries(filters)) merged[key] = [...value];
  return merged;
}

function targetEffect(fallbackName, duration, components) {
  return effect("target", fallbackName, duration, components);
}

function sourceEffect(fallbackName, duration, components) {
  return effect("source", fallbackName, duration, components);
}

function effect(target, fallbackName, duration, components) {
  return {
    target,
    fallbackName,
    definition: {
      schemaVersion: 2,
      ...(duration ? { duration } : {}),
      components
    }
  };
}

function condition(slug, value = undefined) {
  return value === undefined ? { type: "condition", slug } : { type: "condition", slug, value };
}

function modifier(selector, value, modifierType) {
  return { type: "modifier", selector, value, modifierType, predicate: [] };
}

function movement(movementType, value, modifierType) {
  return { type: "movement", movementType, value, modifierType };
}
