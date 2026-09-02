# PF2E Critical Forge: Undead Horrors

Undead-themed critical-result expansion for **PF2E Critical Forge**.

## v0.4.0

The module provides three independently configurable Critical Forge packs:

- Critical Hits by Undead
- Critical Fumbles by Undead
- Critical Hits against Undead

All three settings are world settings, enabled by default, and require a reload after changes.

### Implemented content

All three decks contain **30 distinct outcomes each**, for a total of **90 semantic outcomes**.

Critical Forge card schema v1 stores one category per card, so each semantic outcome is mirrored internally for weapon attacks and spell attacks. The complete module therefore contains **180 internal card definitions** representing the 90 distinct outcomes.

Every result requires the relevant attacker or target to have the `undead` trait. Additional filters distinguish corporeal, mindless, incorporeal, intelligent, and living-target situations where appropriate. Critical Hits against Undead also includes eight damage-type-sensitive outcomes for bludgeoning, slashing, and piercing criticals.

### v0.4.0 review pass

The completed 90-outcome set received a full completeness, density, balance, filter, localization, and automation review. The pass:

- removes two same-pool effect duplicates by giving **Spectral Shock** and **Death Comes Apart** distinct mechanical identities;
- converts **Structural Collapse** from a target-specific manual result to an automated prone result;
- restricts **Rage Against the Living** to living-like targets rather than undead or constructs;
- aligns the German wording for the PF2e `manipulate` trait with the official **Handhaben** terminology;
- adds automated regression coverage for version alignment, localization parity, trait filters, living-target filters, and manual/partial automation metadata.

Most standard mechanical consequences use Critical Forge's Effect Engine directly. Effects that require target-specific predicates, reaction suppression, Step suppression, next-roll-only modifiers, or similar behavior remain manual or partially automated where automatic execution would otherwise be inaccurate.

See [CHANGELOG.md](CHANGELOG.md) for release history.

## Requirements

- Foundry VTT 14
- PF2e 8.1.2 or newer
- PF2E Critical Forge 1.0.1-rc.6.1 or newer
