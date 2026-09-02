import { MODULE_ID } from "./packs/helpers.js";
import { UNDEAD_HORRORS_PACK } from "./packs/undead-horrors.js";

Hooks.once("pf2eCriticalForgeReady", (forge) => {
  try {
    const extension = forge.extensions.forModule(MODULE_ID, {
      version: "0.1.0",
      requirements: {
        apiVersion: ">=0.9.7",
        extensionContractVersion: ">=1",
        capabilities: ["cards.multiDeckPacks"]
      }
    });
    extension.assertCompatible();
    extension.registerPack(UNDEAD_HORRORS_PACK);
    console.info(`${MODULE_ID} | Registered Undead Horrors test pack.`);
  } catch (error) {
    console.error(`${MODULE_ID} | Registration failed.`, error);
    ui?.notifications?.error?.("PF2E Critical Forge: Undead Horrors could not register its card pack. See console for details.");
  }
});
