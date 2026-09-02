# PF2E Critical Forge: Undead Horrors

Undead-themed critical-result expansion for **PF2E Critical Forge**.

## v0.3.0

The module provides three independently configurable Critical Forge packs:

- Critical Hits by Undead
- Critical Fumbles by Undead
- Critical Hits against Undead

All three settings are world settings, enabled by default, and require a reload after changes.

### Implemented content

All three decks are now complete with **30 distinct outcomes each**, for a total of **90 semantic outcomes**.

Critical Forge card schema v1 stores one category per card, so each semantic outcome is mirrored internally for weapon attacks and spell attacks. The complete module therefore contains **180 internal card definitions** representing the 90 distinct outcomes.

Every result requires the relevant attacker or target to have the `undead` trait. Additional filters distinguish corporeal, mindless, incorporeal, intelligent, and living-target situations where appropriate. The new Critical Hits against Undead deck also includes a small number of damage-type-sensitive outcomes for bludgeoning, slashing, and piercing criticals.

Most standard mechanical consequences use Critical Forge's Effect Engine directly. Effects that require target-specific predicates, reaction suppression, Step suppression, next-roll-only modifiers, or similar behavior remain manual or partially automated where automatic execution would otherwise be inaccurate.

See [CHANGELOG.md](CHANGELOG.md) for release history and the next planned review pass.

## Requirements

- Foundry VTT 14
- PF2e 8.1.2 or newer
- PF2E Critical Forge 1.0.1-rc.6.1 or newer
