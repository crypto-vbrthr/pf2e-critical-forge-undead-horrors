# PF2E Critical Forge: Undead Horrors

Undead-themed critical-result expansion for **PF2E Critical Forge**.

## v0.2.0

The module provides three independently configurable Critical Forge packs:

- Critical Hits by Undead
- Critical Fumbles by Undead
- Critical Hits against Undead

All three settings are world settings, enabled by default, and require a reload after changes.

### Implemented content

**Critical Hits by Undead** contains 30 distinct outcomes.

**Critical Fumbles by Undead** contains 30 distinct outcomes.

Critical Forge card schema v1 stores one category per card, so each semantic outcome is mirrored internally for weapon attacks and spell attacks. The two completed decks therefore contain 120 internal card definitions representing 60 distinct outcomes.

Every result requires the relevant attacker or target to have the `undead` trait. Additional filters distinguish corporeal, mindless, incorporeal, intelligent, and living-target situations where appropriate.

Most standard mechanical consequences use Critical Forge's Effect Engine directly. Effects that require target-specific predicates, reaction suppression, Step suppression, immediate movement, or similar behavior remain manual where automatic execution would otherwise be inaccurate.

**Critical Hits against Undead** remains registered but is reserved for the next content pass, planned for v0.3.0.

See [CHANGELOG.md](CHANGELOG.md) for release history and the next planned expansion.

## Requirements

- Foundry VTT 14
- PF2e 8.1.2 or newer
- PF2E Critical Forge 1.0.1-rc.6.1 or newer
