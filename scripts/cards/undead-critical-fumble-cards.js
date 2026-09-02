import { PACK_IDS } from "../constants.js";

const PACK_ID = PACK_IDS.UNDEAD_CRITICAL_FUMBLES;
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
    slug: "loose-bones", key: "LooseBones", tone: "dramatic", impact: "moderate",
    title: "Loose Bones", description: "Something in the undead frame slips out of place. The undead is clumsy 1 until the end of its next turn.",
    tags: ["corporeal", "debuff"], filters: { excludedSourceTraits: ["incorporeal"] },
    effect: sourceEffect("Loose Bones", ONE_ROUND_END, [condition("clumsy", 1)])
  },
  {
    slug: "rotten-joint", key: "RottenJoint", tone: "dramatic", impact: "moderate",
    title: "Rotten Joint", description: "A decayed joint buckles under the failed motion. The undead takes a 10-foot status penalty to all Speeds until the end of its next turn.",
    tags: ["corporeal", "movement"], filters: { excludedSourceTraits: ["incorporeal"] },
    effect: sourceEffect("Rotten Joint", ONE_ROUND_END, [movement("all", -10, "status")])
  },
  {
    slug: "overextended-corpse", key: "OverextendedCorpse", tone: "dramatic", impact: "moderate",
    title: "Overextended Corpse", description: "The dead body follows its own failed momentum too far. The undead is off-guard until the beginning of its next turn.",
    tags: ["defense", "debuff"],
    effect: sourceEffect("Overextended Corpse", ONE_ROUND_START, [condition("off-guard")])
  },
  {
    slug: "cracked-frame", key: "CrackedFrame", tone: "serious", impact: "light",
    title: "Cracked Frame", description: "The fumble leaves the corporeal shell badly aligned. The undead takes a -1 status penalty to AC until the beginning of its next turn.",
    tags: ["corporeal", "defense"], filters: { excludedSourceTraits: ["incorporeal"] },
    effect: sourceEffect("Cracked Frame", ONE_ROUND_START, [modifier("ac", -1, "status")])
  },
  {
    slug: "dead-weight", key: "DeadWeight", tone: "serious", impact: "light",
    title: "Dead Weight", description: "Its own lifeless mass works against the undead. It takes a -1 status penalty to attack rolls until the end of its next turn.",
    tags: ["attack", "debuff"],
    effect: sourceEffect("Dead Weight", ONE_ROUND_END, [modifier("attack", -1, "status")])
  },
  {
    slug: "unsteady-remains", key: "UnsteadyRemains", tone: "serious", impact: "light",
    title: "Unsteady Remains", description: "The remains wobble and fail to answer cleanly. The undead takes a -1 status penalty to Reflex saves until the end of its next turn.",
    tags: ["corporeal", "reflex"], filters: { excludedSourceTraits: ["incorporeal"] },
    effect: sourceEffect("Unsteady Remains", ONE_ROUND_END, [modifier("reflex", -1, "status")])
  },
  {
    slug: "animating-force-falters", key: "AnimatingForceFalters", tone: "dramatic", impact: "moderate",
    title: "Animating Force Falters", description: "The force driving the dead body stutters. The undead is enfeebled 1 until the end of its next turn.",
    tags: ["animation", "debuff"],
    effect: sourceEffect("Animating Force Falters", ONE_ROUND_END, [condition("enfeebled", 1)])
  },
  {
    slug: "necromantic-misfire", key: "NecromanticMisfire", tone: "dramatic", impact: "moderate",
    title: "Necromantic Misfire", description: "Necromantic energy recoils through the undead's pattern. The undead is stupefied 1 until the end of its next turn.",
    tags: ["necromancy", "debuff"],
    effect: sourceEffect("Necromantic Misfire", ONE_ROUND_END, [condition("stupefied", 1)])
  },
  {
    slug: "grave-energy-leak", key: "GraveEnergyLeak", tone: "dramatic", impact: "strong",
    title: "Grave Energy Leak", description: "The fumble tears open the power holding the corpse or spirit together. The undead gains weakness 2 to vitality damage until the beginning of its next turn.",
    tags: ["vitality", "weakness"],
    effect: sourceEffect("Grave Energy Leak", ONE_ROUND_START, [weakness("vitality", 2)]),
    metadata: { balanceNote: "Fixed weakness 2 keeps the result useful without making a single fumble scale explosively with level." }
  },
  {
    slug: "exposed-animation", key: "ExposedAnimation", tone: "dramatic", impact: "moderate",
    title: "Exposed Animation", description: "The undead's animating force is briefly exposed. The next damaging hit against it before the beginning of its next turn deals 2 additional vitality damage.",
    tags: ["vitality", "manual"], effect: null,
    metadata: { automation: "manual", reason: "The bonus damage applies only to the next damaging hit." }
  },
  {
    slug: "wrong-way-around", key: "WrongWayAround", tone: "dramatic", impact: "moderate",
    title: "Wrong Way Around", description: "A limb, weapon, or entire posture ends up pointed the wrong way. Until the beginning of its next turn, the corporeal undead can't use reactions.",
    tags: ["corporeal", "control", "manual"], filters: { excludedSourceTraits: ["incorporeal"] }, effect: null,
    metadata: { automation: "manual" }
  },
  {
    slug: "collapsed-posture", key: "CollapsedPosture", tone: "serious", impact: "light",
    title: "Collapsed Posture", description: "The undead's posture folds in on itself. It takes a -1 status penalty to Athletics and Acrobatics until the end of its next turn.",
    tags: ["corporeal", "athletics", "acrobatics"], filters: { excludedSourceTraits: ["incorporeal"] },
    effect: sourceEffect("Collapsed Posture", ONE_ROUND_END, [modifier(["athletics", "acrobatics"], -1, "status")])
  },
  {
    slug: "dragging-limb", key: "DraggingLimb", tone: "dramatic", impact: "moderate",
    title: "Dragging Limb", description: "A leg or comparable support drags uselessly for a moment. The corporeal undead can't Step until the end of its next turn.",
    tags: ["corporeal", "movement", "manual"], filters: { excludedSourceTraits: ["incorporeal"] }, effect: null,
    metadata: { automation: "manual" }
  },
  {
    slug: "parts-everywhere", key: "PartsEverywhere", tone: "dramatic", impact: "light",
    title: "Parts Everywhere", description: "Loose pieces, straps, fingers, or fragments scatter at the worst possible moment. Until the end of its next turn, the corporeal undead takes a -1 circumstance penalty to checks made as part of manipulate actions.",
    tags: ["corporeal", "manipulate", "manual"], filters: { excludedSourceTraits: ["incorporeal"] }, effect: null,
    metadata: { automation: "manual", reason: "The penalty is action-context specific rather than a general PF2e selector." }
  },
  {
    slug: "grave-dust", key: "GraveDust", tone: "dramatic", impact: "light",
    title: "Grave Dust", description: "Dust, rot, ectoplasm, or grave debris clouds the undead's awareness. It takes a -1 status penalty to Perception until the end of its next turn.",
    tags: ["perception", "debuff"],
    effect: sourceEffect("Grave Dust", ONE_ROUND_END, [modifier("perception", -1, "status")])
  },
  {
    slug: "twisted-anatomy", key: "TwistedAnatomy", tone: "dramatic", impact: "light",
    title: "Twisted Anatomy", description: "The failed attack leaves the body in an impossible fighting posture. The corporeal undead takes a -1 status penalty to melee attack rolls until the end of its next turn.",
    tags: ["corporeal", "melee", "debuff"], filters: { excludedSourceTraits: ["incorporeal"] },
    effect: sourceEffect("Twisted Anatomy", ONE_ROUND_END, [modifier("melee-attack-roll", -1, "status")])
  },
  {
    slug: "body-remembers-death", key: "BodyRemembersDeath", tone: "dramatic", impact: "light",
    title: "The Body Remembers Death", description: "For a moment the corpse becomes what it truly is: dead weight. The corporeal undead takes a -1 status penalty to Fortitude saves until the end of its next turn.",
    tags: ["corporeal", "fortitude"], filters: { excludedSourceTraits: ["incorporeal"] },
    effect: sourceEffect("The Body Remembers Death", ONE_ROUND_END, [modifier("fortitude", -1, "status")])
  },
  {
    slug: "unliving-imbalance", key: "UnlivingImbalance", tone: "serious", impact: "light",
    title: "Unliving Imbalance", description: "The failed motion leaves the corporeal undead easy to shove, trip, or otherwise physically unbalance. It takes a -1 circumstance penalty to relevant defenses and checks until the end of its next turn.",
    tags: ["corporeal", "maneuver", "manual"], filters: { excludedSourceTraits: ["incorporeal"] }, effect: null,
    metadata: { automation: "manual", reason: "The penalty applies only when resolving physical maneuvers such as Shove or Trip." }
  },
  {
    slug: "hunger-without-control", key: "HungerWithoutControl", tone: "dramatic", impact: "moderate",
    title: "Hunger Without Control", description: "Frustration strips away the intelligent undead's discipline. It is off-guard against the creature it fumbled against until the beginning of its next turn.",
    tags: ["intelligent", "defense", "manual"], filters: { excludedSourceTraits: ["mindless"] }, effect: null,
    metadata: { automation: "manual", reason: "Off-guard applies only against one specific creature." }
  },
  {
    slug: "predators-frustration", key: "PredatorsFrustration", tone: "dramatic", impact: "light",
    title: "Predator's Frustration", description: "The intelligent undead fixates on its failure. It takes a -1 circumstance penalty to attacks against the creature it fumbled against until the end of its next turn.",
    tags: ["intelligent", "attack", "manual"], filters: { excludedSourceTraits: ["mindless"] }, effect: null,
    metadata: { automation: "manual", reason: "The attack penalty is restricted to one specific target." }
  },
  {
    slug: "moment-of-recognition", key: "MomentOfRecognition", tone: "dramatic", impact: "moderate",
    title: "Moment of Recognition", description: "For one impossible instant, the intelligent undead remembers being something else. It is stupefied 1 until the end of its next turn.",
    tags: ["intelligent", "memory", "debuff"], filters: { excludedSourceTraits: ["mindless"] },
    effect: sourceEffect("Moment of Recognition", ONE_ROUND_END, [condition("stupefied", 1)])
  },
  {
    slug: "rage-against-the-living", key: "RageAgainstTheLiving", tone: "dramatic", impact: "moderate",
    title: "Rage Against the Living", description: "Failure turns discipline into murderous fury. Until the beginning of its next turn, the intelligent undead takes a -1 circumstance penalty to AC; until the end of that turn, it deals 1 additional damage to the creature it fumbled against.",
    tags: ["intelligent", "risk", "manual"], filters: { excludedSourceTraits: ["mindless"] },
    effect: sourceEffect("Rage Against the Living", ONE_ROUND_START, [modifier("ac", -1, "circumstance")]),
    metadata: { automation: "partial", manualRemainder: "The +1 damage applies only against the creature the undead fumbled against until the end of its next turn." }
  },
  {
    slug: "mindless-confusion", key: "MindlessConfusion", tone: "dramatic", impact: "strong",
    title: "Mindless Confusion", description: "The mindless animation loses its simple rhythm. Until the beginning of its next turn, the undead takes a -1 circumstance penalty to AC and can't use reactions.",
    tags: ["mindless", "defense", "control"], filters: { sourceTraits: ["mindless"] },
    effect: sourceEffect("Mindless Confusion", ONE_ROUND_START, [modifier("ac", -1, "circumstance")]),
    metadata: { automation: "partial", manualRemainder: "The undead can't use reactions until the beginning of its next turn." }
  },
  {
    slug: "unthinking-lurch", key: "UnthinkingLurch", tone: "dramatic", impact: "light",
    title: "Unthinking Lurch", description: "The broken command sends the mindless dead stumbling 5 feet in a random safe direction, if such movement is possible without entering an obvious hazard.",
    tags: ["mindless", "movement", "manual"], filters: { sourceTraits: ["mindless"] }, effect: null,
    metadata: { automation: "manual" }
  },
  {
    slug: "broken-command", key: "BrokenCommand", tone: "serious", impact: "moderate",
    title: "Broken Command", description: "The simple directive animating the corpse skips a beat. The mindless undead takes a -1 status penalty to Perception until the end of its next turn and a -1 circumstance penalty to its next attack before then.",
    tags: ["mindless", "command", "debuff"], filters: { sourceTraits: ["mindless"] },
    effect: sourceEffect("Broken Command", ONE_ROUND_END, [modifier("perception", -1, "status")]),
    metadata: { automation: "partial", manualRemainder: "Apply a -1 circumstance penalty to the undead's next attack before the end of its next turn." }
  },
  {
    slug: "unstable-manifestation", key: "UnstableManifestation", tone: "dramatic", impact: "moderate",
    title: "Unstable Manifestation", description: "The incorporeal form ripples and loses its shape. The undead is clumsy 1 until the end of its next turn.",
    tags: ["incorporeal", "spirit", "debuff"], filters: { sourceTraits: ["incorporeal"] },
    effect: sourceEffect("Unstable Manifestation", ONE_ROUND_END, [condition("clumsy", 1)])
  },
  {
    slug: "fading-presence", key: "FadingPresence", tone: "dramatic", impact: "light",
    title: "Fading Presence", description: "The apparition's presence flickers at the edge of reality. It takes a -1 status penalty to AC until the beginning of its next turn.",
    tags: ["incorporeal", "spirit", "defense"], filters: { sourceTraits: ["incorporeal"] },
    effect: sourceEffect("Fading Presence", ONE_ROUND_START, [modifier("ac", -1, "status")])
  },
  {
    slug: "out-of-phase", key: "OutOfPhase", tone: "dramatic", impact: "moderate",
    title: "Out of Phase", description: "The spirit slips a fraction too far from the world. Until the beginning of its next turn, the incorporeal undead can't use reactions.",
    tags: ["incorporeal", "spirit", "control", "manual"], filters: { sourceTraits: ["incorporeal"] }, effect: null,
    metadata: { automation: "manual" }
  },
  {
    slug: "spiritual-feedback", key: "SpiritualFeedback", tone: "dramatic", impact: "light",
    title: "Spiritual Feedback", description: "The failed attack reverberates through the apparition's own essence. It takes a -1 status penalty to Will saves until the end of its next turn.",
    tags: ["incorporeal", "spirit", "will"], filters: { sourceTraits: ["incorporeal"] },
    effect: sourceEffect("Spiritual Feedback", ONE_ROUND_END, [modifier("will", -1, "status")])
  },
  {
    slug: "death-comes-apart", key: "DeathComesApart", tone: "dramatic", impact: "moderate",
    title: "Death Comes Apart", description: "For a grotesque instant the dead body simply stops being a coherent body. The corporeal undead is clumsy 1 until the end of its next turn; the exact collapse is narrative and leaves no permanent injury.",
    tags: ["corporeal", "collapse", "debuff"], filters: { excludedSourceTraits: ["incorporeal"] },
    effect: sourceEffect("Death Comes Apart", ONE_ROUND_END, [condition("clumsy", 1)])
  }
];

export const UNDEAD_CRITICAL_FUMBLE_CONCEPT_COUNT = CONCEPTS.length;
export const UNDEAD_CRITICAL_FUMBLE_CARDS = Object.freeze(CONCEPTS.flatMap((concept) => createCategoryVariants(concept)));

function createCategoryVariants(concept) {
  return [
    createCard(concept, "criticalFumble", "strike"),
    createCard(concept, "spellCriticalFumble", "spell")
  ];
}

function createCard(concept, category, variant) {
  const root = `PF2E_CRITICAL_FORGE_UNDEAD_HORRORS.Cards.UndeadCriticalFumbles.${concept.key}`;
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
    tags: ["undead-horrors", "undead-critical-fumble", ...concept.tags],
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

function sourceEffect(fallbackName, duration, components) {
  return {
    target: "source",
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
