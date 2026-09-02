# PF2E Critical Forge: Undead Horrors

Initial 0.1.0 integration build for PF2E Critical Forge.

This build intentionally contains five **Undead Critical Hit** test cards. All five require the attacking/source Actor to have the `undead` trait. The purpose of this build is to verify extension registration, localization, attack-deck selection, source-trait matching, exclusions, and Effect Engine handoff in Foundry before expanding the library.

Planned full library:
- 30 Undead Critical Hits
- 30 Undead Fumbles
- 30 Critical Hits Against Undead

## Test in Foundry
1. Enable PF2E Critical Forge and this module.
2. Use an undead NPC to critically hit a living target.
3. Confirm Undead Horrors cards can enter the Critical Forge candidate pool.
4. Repeat the same critical hit with a non-undead attacker and confirm these cards are not eligible.
5. Test `The Grave Remembers You` against a `mindless` target and confirm it is rejected.
6. Test `Dead Hands Do Not Release` with an `incorporeal` undead attacker and confirm it is rejected.
7. Apply a card effect and confirm the Effect Engine creates/applies the expected one-round consequence.

## Pack selection
The GM can choose which Undead Horrors packs are used in **Configure Settings → Module Settings**. Pack changes are synchronized live with PF2E Critical Forge. In 0.1.1, **Undead Critical Hits** contains the initial five test cards; the settings for **Undead Fumbles** and **Critical Hits Against Undead** are already reserved for the upcoming packs.
