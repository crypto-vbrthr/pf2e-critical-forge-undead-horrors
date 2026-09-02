# Changelog

All notable changes to **PF2E Critical Forge: Undead Horrors** are documented here.

## 1.0.0

### Release

- Promoted **Undead Horrors** to its first stable release after the v0.4.0 playtest and review passed in Foundry VTT.
- Confirmed all three independently configurable packs remain fully populated with 30 semantic outcomes each, for **90 distinct outcomes** and **180 mirrored internal card definitions**.
- Re-checked the public Critical Forge extension contract used by the add-on against **PF2E Critical Forge 1.0.1-rc.6.1** / API `0.9.7`.
- Kept Critical Card Pack schema `1` and the existing extension requirements unchanged.
- Finalized release documentation and recorded known automation limitations in the README.
- Updated release metadata to version `1.0.0`.

### Validation

- Full add-on test suite passes.
- All three packs pass the current Critical Forge pack validator with no errors or warnings.
- German and English localization coverage remains complete and aligned.
- Archive structure and ZIP integrity are verified for release packaging.

## 0.4.0

### Changed

- Completed the full completeness, density, balance, trait-filter, localization, and automation review across all 90 outcomes.
- Changed **Spectral Shock** from `stupefied 1` to **dazzled** for one round, removing overlap with the general Soul-Shaken result while giving incorporeal critical hits a distinct sensory consequence.
- Changed **Death Comes Apart** from `clumsy 1` to **prone**, removing overlap with Loose Bones and making the collapse mechanically distinct.
- Changed **Structural Collapse** to an automated **prone** result, replacing the narrower manual target-specific off-guard handling.
- Restricted **Rage Against the Living** to living-like targets by excluding undead and constructs.
- Corrected German wording for manipulate-trait actions to the official PF2e term **Handhaben**.
- Updated release metadata and documentation to version `0.4.0`.

### Tests

- Added release-metadata consistency coverage.
- Added German/English localization-key parity and card-localization coverage.
- Added review invariants for corporeal/incorporeal filters, living-target filters, and manual/partial automation metadata.
- Added regression checks for the three reviewed mechanical changes.

## 0.3.0

### Added

- Added the complete **Critical Hits against Undead** deck with 30 distinct outcomes.
- Mirrored the 30 outcomes for weapon and spell attack criticals, yielding 60 new internal Critical Forge card definitions.
- Added dedicated outcomes for corporeal, intelligent, mindless, and incorporeal undead.
- Added eight damage-type-sensitive outcomes for bludgeoning, slashing, and piercing criticals.
- Added temporary vitality and spirit weaknesses where appropriate.
- Added German and English localization for the third deck.
- Added automated registration/content coverage for all three decks.

### Changed

- Updated release metadata to version `0.3.0`.
- All three independently configurable packs are now fully populated.
- The initial Undead Horrors set now contains 90 semantic outcomes and 180 mirrored internal card definitions.

## 0.2.0

### Added

- Added the complete **Critical Fumbles by Undead** deck with 30 distinct outcomes.
- Mirrored the 30 outcomes for weapon and spell attack fumbles, yielding 60 internal Critical Forge card definitions.
- Added specialized results and filters for corporeal, intelligent, mindless, and incorporeal undead.
- Added German and English localization for the new fumble deck.
- Added automated registration/content coverage for both implemented decks.

### Changed

- Updated release metadata to version `0.2.0`.
- The **Critical Hits by Undead** and **Critical Fumbles by Undead** packs are now fully populated and can still be enabled or disabled independently in the module settings.

## 0.1.0

### Added

- Initial release of **PF2E Critical Forge: Undead Horrors**.
- Added three independently configurable Critical Forge packs:
  - Critical Hits by Undead
  - Critical Fumbles by Undead
  - Critical Hits against Undead
- Added the complete **Critical Hits by Undead** deck with 30 distinct outcomes.
- Mirrored the 30 outcomes for weapon and spell attacks, yielding 60 internal Critical Forge card definitions.
- Added trait-aware filtering for undead, mindless, incorporeal, intelligent, and living-target situations where appropriate.
- Added German and English localization.

