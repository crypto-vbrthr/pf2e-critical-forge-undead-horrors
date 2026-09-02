import { MODULE_ID, PACK_ID, undeadCard, effect } from "./helpers.js";

const undeadHit = { sourceTraits: ["undead"] };

export const UNDEAD_HORRORS_PACK = Object.freeze({
  schemaVersion: 1,
  id: PACK_ID,
  titleKey: "PF2E_CRITICAL_FORGE_UNDEAD_HORRORS.Pack.Title",
  descriptionKey: "PF2E_CRITICAL_FORGE_UNDEAD_HORRORS.Pack.Description",
  fallbackTitle: "Undead Horrors",
  fallbackDescription: "Critical consequences born from undeath, and devastating blows struck against the undead.",
  version: "0.1.0",
  priority: 20,
  enabled: true,
  metadata: { theme: "undead-horror", module: MODULE_ID, phase: "test-cards" },
  decks: {
    attack: [
      undeadCard({
        id: "undead-hit.grave-cold-blood", key: "GraveColdBlood", category: "criticalHit",
        title: "Grave-Cold Blood", description: "Deathly cold floods the wound and makes every movement stiff and reluctant.",
        filters: undeadHit, tags: ["undead-attacker", "cold", "control"],
        effect: effect("target", [{ type: "condition", slug: "clumsy", value: 1 }])
      }),
      undeadCard({
        id: "undead-hit.the-grave-remembers-you", key: "TheGraveRemembersYou", category: "criticalHit",
        title: "The Grave Remembers You", description: "For a heartbeat, the victim sees the shape of its own death staring back from the attacker.",
        filters: { ...undeadHit, excludedTargetTraits: ["mindless"] }, tags: ["undead-attacker", "fear", "mental"],
        effect: effect("target", [{ type: "condition", slug: "frightened", value: 1 }])
      }),
      undeadCard({
        id: "undead-hit.stolen-vitality", key: "StolenVitality", category: "criticalHit", impact: "strong",
        title: "Stolen Vitality", description: "The blow leaves the victim hollowed out, as though something essential has been dragged toward the grave.",
        filters: { ...undeadHit, excludedTargetTraits: ["undead", "construct"] }, tags: ["undead-attacker", "vitality", "drain"],
        effect: effect("target", [{ type: "condition", slug: "drained", value: 1 }])
      }),
      undeadCard({
        id: "undead-hit.dead-hands-do-not-release", key: "DeadHandsDoNotRelease", category: "criticalHit",
        title: "Dead Hands Do Not Release", description: "The corpse's grip lingers with impossible strength, spoiling the victim's footing and defense.",
        filters: { ...undeadHit, excludedSourceTraits: ["incorporeal"] }, tags: ["undead-attacker", "physical", "control"],
        effect: effect("target", [{ type: "condition", slug: "off-guard" }])
      }),
      undeadCard({
        id: "undead-hit.deaths-momentum", key: "DeathsMomentum", category: "criticalHit", impact: "light",
        title: "Death's Momentum", description: "The successful strike feeds the unnatural force animating the dead, sharpening its next assault.",
        filters: undeadHit, tags: ["undead-attacker", "boon"],
        effect: effect("source", [{ type: "modifier", selector: "attack-roll", value: 1, modifierType: "circumstance", predicate: [] }])
      })
    ]
  }
});
