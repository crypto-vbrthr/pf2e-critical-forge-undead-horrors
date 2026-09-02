import { MODULE_ID, SETTINGS } from "./constants.js";

export function registerSettings() {
  registerToggle(
    SETTINGS.ENABLE_UNDEAD_CRITICAL_HITS,
    "PF2E_CRITICAL_FORGE_UNDEAD_HORRORS.Settings.EnableUndeadCriticalHits.Name",
    "PF2E_CRITICAL_FORGE_UNDEAD_HORRORS.Settings.EnableUndeadCriticalHits.Hint"
  );

  registerToggle(
    SETTINGS.ENABLE_UNDEAD_CRITICAL_FUMBLES,
    "PF2E_CRITICAL_FORGE_UNDEAD_HORRORS.Settings.EnableUndeadCriticalFumbles.Name",
    "PF2E_CRITICAL_FORGE_UNDEAD_HORRORS.Settings.EnableUndeadCriticalFumbles.Hint"
  );

  registerToggle(
    SETTINGS.ENABLE_CRITICAL_HITS_AGAINST_UNDEAD,
    "PF2E_CRITICAL_FORGE_UNDEAD_HORRORS.Settings.EnableCriticalHitsAgainstUndead.Name",
    "PF2E_CRITICAL_FORGE_UNDEAD_HORRORS.Settings.EnableCriticalHitsAgainstUndead.Hint"
  );
}

function registerToggle(key, name, hint) {
  game.settings.register(MODULE_ID, key, {
    name,
    hint,
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
    requiresReload: true
  });
}
