import { MODULE_ID, MODULE_VERSION, SETTINGS } from "./constants.js";
import { registerSettings } from "./settings.js";
import { createUndeadCriticalHitsPack } from "./packs/undead-critical-hits.js";
import { createUndeadCriticalFumblesPack } from "./packs/undead-critical-fumbles.js";
import { createCriticalHitsAgainstUndeadPack } from "./packs/critical-hits-against-undead.js";

Hooks.once("init", () => {
  registerSettings();
});

Hooks.once("pf2eCriticalForgeReady", (forge) => {
  try {
    const extension = forge.extensions.forModule(MODULE_ID, {
      version: MODULE_VERSION,
      requirements: {
        apiVersion: ">=0.9.7",
        extensionContractVersion: ">=1",
        cardPackSchemaVersion: ">=1",
        capabilities: ["cards.multiDeckPacks"]
      }
    });

    extension.assertCompatible();
    extension.registerPacks(buildPacks(), { replace: true });
  } catch (error) {
    console.error(`${MODULE_ID} | Could not register Critical Forge packs.`, error);
    ui?.notifications?.error?.(
      game.i18n.localize("PF2E_CRITICAL_FORGE_UNDEAD_HORRORS.Errors.RegistrationFailed")
    );
  }
});

export function buildPacks() {
  return [
    createUndeadCriticalHitsPack({
      enabled: game.settings.get(MODULE_ID, SETTINGS.ENABLE_UNDEAD_CRITICAL_HITS)
    }),
    createUndeadCriticalFumblesPack({
      enabled: game.settings.get(MODULE_ID, SETTINGS.ENABLE_UNDEAD_CRITICAL_FUMBLES)
    }),
    createCriticalHitsAgainstUndeadPack({
      enabled: game.settings.get(MODULE_ID, SETTINGS.ENABLE_CRITICAL_HITS_AGAINST_UNDEAD)
    })
  ];
}
