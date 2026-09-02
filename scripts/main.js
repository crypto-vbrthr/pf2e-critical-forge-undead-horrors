import { MODULE_ID, PACK_IDS } from "./packs/helpers.js";
import { UNDEAD_CRITICAL_HITS_PACK } from "./packs/undead-horrors.js";
import { SETTINGS, isPackEnabled, registerSettings } from "./settings.js";

let extension = null;

const PACKS = Object.freeze([
  { id: PACK_IDS.undeadCriticalHits, setting: SETTINGS.undeadCriticalHits, pack: UNDEAD_CRITICAL_HITS_PACK },
  // The next two entries become active automatically once their card packs are added.
  { id: PACK_IDS.undeadFumbles, setting: SETTINGS.undeadFumbles, pack: null },
  { id: PACK_IDS.criticalHitsAgainstUndead, setting: SETTINGS.criticalHitsAgainstUndead, pack: null }
]);

Hooks.once("init", () => {
  registerSettings(() => syncPackRegistration());
});

Hooks.once("pf2eCriticalForgeReady", (forge) => {
  try {
    extension = forge.extensions.forModule(MODULE_ID, {
      version: "0.1.1",
      requirements: {
        apiVersion: ">=0.9.7",
        extensionContractVersion: ">=1",
        capabilities: ["cards.multiDeckPacks"]
      }
    });
    extension.assertCompatible();
    syncPackRegistration();
    console.info(`${MODULE_ID} | Undead Horrors pack settings synchronized.`);
  } catch (error) {
    console.error(`${MODULE_ID} | Registration failed.`, error);
    ui?.notifications?.error?.("PF2E Critical Forge: Undead Horrors could not register its card packs. See console for details.");
  }
});

function syncPackRegistration() {
  if (!extension) return;

  for (const entry of PACKS) {
    const registered = Boolean(extension.getPack(entry.id));
    const shouldRegister = Boolean(entry.pack) && isPackEnabled(entry.setting);

    if (shouldRegister && !registered) {
      extension.registerPack(entry.pack);
      continue;
    }

    if (!shouldRegister && registered) extension.unregisterPack(entry.id);
  }
}
