# PF2E Critical Forge: Undead Horrors

Undead-themed critical-result expansion for **PF2E Critical Forge**.

## v0.1.0 content pass 1

The module provides three independently configurable Critical Forge packs:

- Critical Hits by Undead
- Critical Fumbles by Undead
- Critical Hits against Undead

All three settings are world settings, enabled by default, and require a reload after changes.

### Implemented content

**Critical Hits by Undead** now contains 30 approved semantic outcomes. Critical Forge card schema v1 stores one category per card, so every semantic outcome is mirrored internally as a `criticalHit` and `spellCriticalHit` definition. This yields 60 internal card definitions while presenting the same 30 outcomes in weapon-attack and spell-attack contexts.

Every outcome requires the attacker to have the `undead` trait. Additional filters distinguish mindless, incorporeal, intelligent, and living-target situations where appropriate.

Most mechanical consequences use Critical Forge's Effect Engine directly. Effects that need target-specific predicates, reaction suppression, Step suppression, immediate movement, or suppression of existing fast healing/regeneration remain explicitly manual in v0.1.0 rather than being approximated incorrectly.

The other two packs remain registered but empty for the next content passes.

## Requirements

- Foundry VTT 14
- PF2e 8.1.2 or newer
- PF2E Critical Forge 1.0.1-rc.6.1 or newer
