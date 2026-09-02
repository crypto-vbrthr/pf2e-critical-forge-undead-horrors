import { PACK_IDS } from "../constants.js";

const PACK_ID = PACK_IDS.CRITICAL_HITS_AGAINST_UNDEAD;
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
    slug: "broken-animation", key: "BrokenAnimation", tone: "dramatic", impact: "moderate",
    title: "Broken Animation", description: "The critical hit disrupts the force animating the dead. The undead is enfeebled 1 until the end of its next turn.",
    tags: ["animation", "debuff"],
    effect: targetEffect("Broken Animation", ONE_ROUND_END, [condition("enfeebled", 1)])
  },
  {
    slug: "deathly-instability", key: "DeathlyInstability", tone: "serious", impact: "light",
    title: "Deathly Instability", description: "The undead's unnatural balance wavers. It takes a -1 status penalty to Reflex saves until the end of its next turn.",
    tags: ["reflex", "debuff"],
    effect: targetEffect("Deathly Instability", ONE_ROUND_END, [modifier("reflex", -1, "status")])
  },
  {
    slug: "grave-energy-bleeds-away", key: "GraveEnergyBleedsAway", tone: "dramatic", impact: "light",
    title: "Grave Energy Bleeds Away", description: "Power leaks from the wound in cold wisps. The undead takes a -1 status penalty to attack rolls until the end of its next turn.",
    tags: ["attack", "debuff"],
    effect: targetEffect("Grave Energy Bleeds Away", ONE_ROUND_END, [modifier("attack", -1, "status")])
  },
  {
    slug: "disrupted-pattern", key: "DisruptedPattern", tone: "serious", impact: "light",
    title: "Disrupted Pattern", description: "The blow leaves the undead's animating pattern briefly vulnerable. It takes a -1 penalty to its next saving throw before the end of its next turn.",
    tags: ["saving-throw", "manual"], effect: null,
    metadata: { automation: "manual", reason: "The penalty applies only to the next saving throw." }
  },
  {
    slug: "exposed-necromancy", key: "ExposedNecromancy", tone: "dramatic", impact: "strong",
    title: "Exposed Necromancy", description: "The piercing critical tears into the power holding the undead together. It gains weakness 2 to vitality damage until the beginning of its next turn.",
    tags: ["piercing", "vitality", "weakness"], filters: { damageTypes: ["piercing"] },
    effect: targetEffect("Exposed Necromancy", ONE_ROUND_START, [weakness("vitality", 2)])
  },
  {
    slug: "deathly-opening", key: "DeathlyOpening", tone: "serious", impact: "moderate",
    title: "Deathly Opening", description: "The critical hit opens a gap in the undead's defense. It is off-guard until the beginning of its next turn.",
    tags: ["defense", "debuff"],
    effect: targetEffect("Deathly Opening", ONE_ROUND_START, [condition("off-guard")])
  },
  {
    slug: "severed-response", key: "SeveredResponse", tone: "dramatic", impact: "strong",
    title: "Severed Response", description: "The impact interrupts the undead's ability to answer threats. Until the beginning of its next turn, it can't use reactions.",
    tags: ["control", "manual"], effect: null,
    metadata: { automation: "manual" }
  },
  {
    slug: "grave-staggered", key: "GraveStaggered", tone: "dramatic", impact: "moderate",
    title: "Grave-Staggered", description: "The undead reels under a blow that would have dropped a living foe. It takes a 10-foot status penalty to all Speeds until the end of its next turn.",
    tags: ["movement", "debuff"],
    effect: targetEffect("Grave-Staggered", ONE_ROUND_END, [movement("all", -10, "status")])
  },
  {
    slug: "unholy-pattern-fractured", key: "UnholyPatternFractured", tone: "dramatic", impact: "light",
    title: "Unholy Pattern Fractured", description: "The force that anchors the undead's will fractures. It takes a -1 status penalty to Will saves until the end of its next turn.",
    tags: ["will", "debuff"],
    effect: targetEffect("Unholy Pattern Fractured", ONE_ROUND_END, [modifier("will", -1, "status")])
  },
  {
    slug: "animation-laid-bare", key: "AnimationLaidBare", tone: "dramatic", impact: "moderate",
    title: "Animation Laid Bare", description: "The piercing strike exposes a fleeting weakness in the undead's animation. The next attack against it before the beginning of its next turn gains a +1 circumstance bonus.",
    tags: ["piercing", "opening", "manual"], filters: { damageTypes: ["piercing"] }, effect: null,
    metadata: { automation: "manual", reason: "The bonus applies only to the next attack against this specific target." }
  },
  {
    slug: "unnatural-balance-broken", key: "UnnaturalBalanceBroken", tone: "serious", impact: "light",
    title: "Unnatural Balance Broken", description: "The hit throws the undead's unnatural balance out of alignment. It takes a -1 status penalty to Athletics and Acrobatics until the end of its next turn.",
    tags: ["athletics", "acrobatics", "debuff"],
    effect: targetEffect("Unnatural Balance Broken", ONE_ROUND_END, [modifier(["athletics", "acrobatics"], -1, "status")])
  },
  {
    slug: "grave-falters", key: "GraveFalters", tone: "dramatic", impact: "light",
    title: "The Grave Falters", description: "The undead's awareness flickers with the force sustaining it. It takes a -1 status penalty to Perception until the end of its next turn.",
    tags: ["perception", "debuff"],
    effect: targetEffect("The Grave Falters", ONE_ROUND_END, [modifier("perception", -1, "status")])
  },
  {
    slug: "shattered-frame", key: "ShatteredFrame", tone: "dramatic", impact: "moderate",
    title: "Shattered Frame", description: "The bludgeoning critical smashes the undead's physical structure out of alignment. The corporeal undead is clumsy 1 until the end of its next turn.",
    tags: ["corporeal", "bludgeoning", "debuff"], filters: { damageTypes: ["bludgeoning"], excludedTargetTraits: ["incorporeal"] },
    effect: targetEffect("Shattered Frame", ONE_ROUND_END, [condition("clumsy", 1)])
  },
  {
    slug: "cracked-husk", key: "CrackedHusk", tone: "dramatic", impact: "light",
    title: "Cracked Husk", description: "Bone, dead flesh, wrappings, or another physical shell splits under the blow. The corporeal undead takes a -1 status penalty to AC until the beginning of its next turn.",
    tags: ["corporeal", "defense"], filters: { excludedTargetTraits: ["incorporeal"] },
    effect: targetEffect("Cracked Husk", ONE_ROUND_START, [modifier("ac", -1, "status")])
  },
  {
    slug: "splintered-support", key: "SplinteredSupport", tone: "dramatic", impact: "moderate",
    title: "Splintered Support", description: "The impact damages a leg, spine, or other support. The corporeal undead takes a 10-foot status penalty to all Speeds until the end of its next turn.",
    tags: ["corporeal", "movement"], filters: { excludedTargetTraits: ["incorporeal"] },
    effect: targetEffect("Splintered Support", ONE_ROUND_END, [movement("all", -10, "status")])
  },
  {
    slug: "ruined-joint", key: "RuinedJoint", tone: "dramatic", impact: "moderate",
    title: "Ruined Joint", description: "The slashing critical tears through a joint or comparable point of articulation. The corporeal undead can't Step until the end of its next turn.",
    tags: ["corporeal", "slashing", "movement", "manual"], filters: { damageTypes: ["slashing"], excludedTargetTraits: ["incorporeal"] }, effect: null,
    metadata: { automation: "manual" }
  },
  {
    slug: "fractured-grip", key: "FracturedGrip", tone: "serious", impact: "light",
    title: "Fractured Grip", description: "The slashing critical ruins the undead's grip or striking limb. The corporeal undead takes a -1 status penalty to melee attack rolls until the end of its next turn.",
    tags: ["corporeal", "slashing", "melee"], filters: { damageTypes: ["slashing"], excludedTargetTraits: ["incorporeal"] },
    effect: targetEffect("Fractured Grip", ONE_ROUND_END, [modifier("melee-attack-roll", -1, "status")])
  },
  {
    slug: "pieces-missing", key: "PiecesMissing", tone: "dramatic", impact: "light",
    title: "Pieces Missing", description: "The slashing blow sends pieces of the corpse, wrappings, or equipment flying. Until the end of its next turn, the corporeal undead takes a -1 circumstance penalty to checks made as part of manipulate actions.",
    tags: ["corporeal", "slashing", "manipulate", "manual"], filters: { damageTypes: ["slashing"], excludedTargetTraits: ["incorporeal"] }, effect: null,
    metadata: { automation: "manual", reason: "The penalty is action-context specific rather than a general PF2e selector." }
  },
  {
    slug: "crushed-remains", key: "CrushedRemains", tone: "dramatic", impact: "light",
    title: "Crushed Remains", description: "The bludgeoning critical leaves the corporeal undead poorly able to exert force. It takes a -1 status penalty to Athletics until the end of its next turn, including Athletics-based physical maneuvers.",
    tags: ["corporeal", "bludgeoning", "athletics"], filters: { damageTypes: ["bludgeoning"], excludedTargetTraits: ["incorporeal"] },
    effect: targetEffect("Crushed Remains", ONE_ROUND_END, [modifier("athletics", -1, "status")])
  },
  {
    slug: "structural-collapse", key: "StructuralCollapse", tone: "dramatic", impact: "moderate",
    title: "Structural Collapse", description: "The bludgeoning critical buckles the undead's physical structure. Until the beginning of its next turn, the corporeal undead is off-guard against the creature that critically hit it.",
    tags: ["corporeal", "bludgeoning", "defense", "manual"], filters: { damageTypes: ["bludgeoning"], excludedTargetTraits: ["incorporeal"] }, effect: null,
    metadata: { automation: "manual", reason: "Off-guard applies only against the attacker that caused this critical hit." }
  },
  {
    slug: "predator-becomes-prey", key: "PredatorBecomesPrey", tone: "dramatic", impact: "moderate",
    title: "Predator Becomes Prey", description: "For a moment, the intelligent undead realizes it can still be destroyed. If it isn't immune to fear, it becomes frightened 1.",
    tags: ["intelligent", "fear", "mental"], filters: { excludedTargetTraits: ["mindless"] },
    effect: targetEffect("Predator Becomes Prey", ONE_ROUND_END, [condition("frightened", 1)])
  },
  {
    slug: "profane-arrogance-broken", key: "ProfaneArroganceBroken", tone: "dramatic", impact: "light",
    title: "Profane Arrogance Broken", description: "The intelligent undead's certainty fractures. It takes a -1 penalty to attacks against the creature that critically hit it until the end of its next turn.",
    tags: ["intelligent", "attack", "manual"], filters: { excludedTargetTraits: ["mindless"] }, effect: null,
    metadata: { automation: "manual", reason: "The penalty applies only against one specific attacker." }
  },
  {
    slug: "memory-of-mortality", key: "MemoryOfMortality", tone: "dramatic", impact: "moderate",
    title: "Memory of Mortality", description: "The impact awakens a fragmentary memory of being mortal, or of the death that made the creature what it is. The intelligent undead is stupefied 1 until the end of its next turn.",
    tags: ["intelligent", "memory", "debuff"], filters: { excludedTargetTraits: ["mindless"] },
    effect: targetEffect("Memory of Mortality", ONE_ROUND_END, [condition("stupefied", 1)])
  },
  {
    slug: "command-pattern-shattered", key: "CommandPatternShattered", tone: "dramatic", impact: "moderate",
    title: "Command Pattern Shattered", description: "The critical hit scrambles the simple pattern driving the mindless undead. It takes a -1 penalty to its next attack roll and its next Perception check before the end of its next turn.",
    tags: ["mindless", "attack", "perception", "manual"], filters: { targetTraits: ["mindless"] }, effect: null,
    metadata: { automation: "manual", reason: "Both penalties apply only to the next matching checks." }
  },
  {
    slug: "instinctive-breakdown", key: "InstinctiveBreakdown", tone: "dramatic", impact: "strong",
    title: "Instinctive Breakdown", description: "The primitive impulses animating the mindless dead fall out of sequence. Until the beginning of its next turn, it can't use reactions, and it takes a -1 status penalty to Reflex saves until the end of its next turn.",
    tags: ["mindless", "control", "reflex"], filters: { targetTraits: ["mindless"] },
    effect: targetEffect("Instinctive Breakdown", ONE_ROUND_END, [modifier("reflex", -1, "status")]),
    metadata: { automation: "partial", manualRemainder: "The undead can't use reactions until the beginning of its next turn." }
  },
  {
    slug: "unraveling-apparition", key: "UnravelingApparition", tone: "dramatic", impact: "moderate",
    title: "Unraveling Apparition", description: "The critical hit makes the incorporeal undead's outline fray and distort. It is clumsy 1 until the end of its next turn.",
    tags: ["incorporeal", "spirit", "debuff"], filters: { targetTraits: ["incorporeal"] },
    effect: targetEffect("Unraveling Apparition", ONE_ROUND_END, [condition("clumsy", 1)])
  },
  {
    slug: "spiritual-fracture", key: "SpiritualFracture", tone: "dramatic", impact: "light",
    title: "Spiritual Fracture", description: "A fracture runs through the apparition's spiritual structure. The incorporeal undead takes a -1 status penalty to Will saves until the end of its next turn.",
    tags: ["incorporeal", "spirit", "will"], filters: { targetTraits: ["incorporeal"] },
    effect: targetEffect("Spiritual Fracture", ONE_ROUND_END, [modifier("will", -1, "status")])
  },
  {
    slug: "forced-manifestation", key: "ForcedManifestation", tone: "dramatic", impact: "light",
    title: "Forced Manifestation", description: "The blow forces the apparition into unusually sharp focus. The incorporeal undead takes a -1 status penalty to AC until the beginning of its next turn.",
    tags: ["incorporeal", "spirit", "defense"], filters: { targetTraits: ["incorporeal"] },
    effect: targetEffect("Forced Manifestation", ONE_ROUND_START, [modifier("ac", -1, "status")])
  },
  {
    slug: "torn-from-the-veil", key: "TornFromTheVeil", tone: "dramatic", impact: "moderate",
    title: "Torn from the Veil", description: "The apparition loses its grip on the boundary between worlds. Until the beginning of its next turn, the incorporeal undead can't use reactions.",
    tags: ["incorporeal", "spirit", "control", "manual"], filters: { targetTraits: ["incorporeal"] }, effect: null,
    metadata: { automation: "manual" }
  },
  {
    slug: "essence-laid-bare", key: "EssenceLaidBare", tone: "dramatic", impact: "strong",
    title: "Essence Laid Bare", description: "The critical hit tears open the apparition's spiritual substance. The incorporeal undead gains weakness 2 to spirit damage until the beginning of its next turn.",
    tags: ["incorporeal", "spirit", "weakness"], filters: { targetTraits: ["incorporeal"] },
    effect: targetEffect("Essence Laid Bare", ONE_ROUND_START, [weakness("spirit", 2)])
  }
];

export const CRITICAL_HITS_AGAINST_UNDEAD_CONCEPT_COUNT = CONCEPTS.length;
export const CRITICAL_HITS_AGAINST_UNDEAD_CARDS = Object.freeze(CONCEPTS.flatMap((concept) => createCategoryVariants(concept)));

function createCategoryVariants(concept) {
  return [
    createCard(concept, "criticalHit", "strike"),
    createCard(concept, "spellCriticalHit", "spell")
  ];
}

function createCard(concept, category, variant) {
  const root = `PF2E_CRITICAL_FORGE_UNDEAD_HORRORS.Cards.CriticalHitsAgainstUndead.${concept.key}`;
  const filters = mergeFilters(concept.filters ?? {});
  filters.targetTraits = [...new Set(["undead", ...filters.targetTraits])];

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
    tags: ["undead-horrors", "critical-hit-against-undead", ...concept.tags],
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
  return { ...effect, nameKey: `${root}.EffectName` };
}

function mergeFilters(filters) {
  const merged = {};
  for (const [key, value] of Object.entries(EMPTY_FILTERS)) merged[key] = [...value];
  for (const [key, value] of Object.entries(filters)) merged[key] = [...value];
  return merged;
}

function targetEffect(fallbackName, duration, components) {
  return {
    target: "target",
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

function weakness(weaknessType, value) {
  return { type: "weakness", weaknessType, value };
}
