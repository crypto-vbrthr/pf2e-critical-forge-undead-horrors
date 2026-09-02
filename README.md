# PF2E Critical Forge: Undead Horrors

Undead-themed critical-result expansion for **PF2E Critical Forge**.


## Part of the Forge Suite

**Critical Forge: Undead Horrors** is part of the **Forge Suite**, a growing collection of Foundry VTT modules and add-ons built for the busy Game Master. The suite is designed to reduce preparation and bookkeeping, make common GM tasks easier, and add useful tools that help make running and playing campaigns smoother and more enjoyable.

An overview of the Forge Suite, its modules, add-ons, and shared documentation is available here:

**Forge Suite:** https://github.com/crypto-vbrthr/pf2e-forge-suite


## Feedback, Bug Reports & Feature Requests

Found a bug, have an idea for an improvement, or would like to suggest a new feature?

Feedback is always welcome. Please feel free to open a new **GitHub Issue** at any time, whether you want to report a problem, suggest a quality-of-life improvement, propose a new feature, or share an idea for how the module could be made more useful.

When reporting a bug, please include as much relevant information as possible, such as the Foundry VTT version, PF2e system version, module version, steps to reproduce the issue, and any console errors or screenshots that may help identify the problem.

Suggestions and feature requests are equally welcome. Even small ideas can lead to useful improvements.

**Open an issue here:** https://github.com/crypto-vbrthr/pf2e-critical-forge-undead-horrors/issues


## v1.0.0

The module provides three independently configurable Critical Forge packs:

- Critical Hits by Undead
- Critical Fumbles by Undead
- Critical Hits against Undead

All three settings are world settings, enabled by default, and require a reload after changes.

### Implemented content

All three decks contain **30 distinct outcomes each**, for a total of **90 semantic outcomes**.

Critical Forge card schema v1 stores one category per card, so each semantic outcome is mirrored internally for weapon attacks and spell attacks. The complete module therefore contains **180 internal card definitions** representing the 90 distinct outcomes.

Every result requires the relevant attacker or target to have the `undead` trait. Additional filters distinguish corporeal, mindless, incorporeal, intelligent, and living-target situations where appropriate. Critical Hits against Undead also includes eight damage-type-sensitive outcomes for bludgeoning, slashing, and piercing criticals.

### Release status

Version 1.0.0 is the first stable release. The completed 90-outcome set has passed the full completeness, density, balance, filter, localization, automation, and release-readiness review. The final review:

- removes two same-pool effect duplicates by giving **Spectral Shock** and **Death Comes Apart** distinct mechanical identities;
- converts **Structural Collapse** from a target-specific manual result to an automated prone result;
- restricts **Rage Against the Living** to living-like targets rather than undead or constructs;
- aligns the German wording for the PF2e `manipulate` trait with the official **Handhaben** terminology;
- adds automated regression coverage for version alignment, localization parity, trait filters, living-target filters, and manual/partial automation metadata.

Most standard mechanical consequences use Critical Forge's Effect Engine directly. Effects that require target-specific predicates, reaction suppression, Step suppression, next-roll-only modifiers, or similar behavior remain manual or partially automated where automatic execution would otherwise be inaccurate.

### Known limitations

- Some effects remain manual or partially automated when Critical Forge cannot apply them accurately without target-specific or next-roll-only logic.
- The three pack toggles are world settings and currently require a reload after changes.
- Repository, manifest, and release-download URLs are intentionally omitted from `module.json` until the final hosting locations are published.

See [CHANGELOG.md](CHANGELOG.md) for release history.

## Requirements

- Foundry VTT 14
- PF2e 8.1.2 or newer
- PF2E Critical Forge 1.0.1-rc.6.1 or newer
