import { MODULE_ID } from "./packs/helpers.js";

export const SETTINGS = Object.freeze({
  undeadCriticalHits: "packUndeadCriticalHits",
  undeadFumbles: "packUndeadFumbles",
  criticalHitsAgainstUndead: "packCriticalHitsAgainstUndead"
});

export function registerSettings(onPackSettingChanged) {
  registerPackSetting(SETTINGS.undeadCriticalHits, "UndeadCriticalHits", true, onPackSettingChanged);
  registerPackSetting(SETTINGS.undeadFumbles, "UndeadFumbles", true, onPackSettingChanged);
  registerPackSetting(SETTINGS.criticalHitsAgainstUndead, "CriticalHitsAgainstUndead", true, onPackSettingChanged);
}

export function isPackEnabled(settingKey) {
  return game.settings.get(MODULE_ID, settingKey) !== false;
}

function registerPackSetting(key, localizationKey, defaultValue, onChange) {
  game.settings.register(MODULE_ID, key, {
    name: `PF2E_CRITICAL_FORGE_UNDEAD_HORRORS.Settings.${localizationKey}.Name`,
    hint: `PF2E_CRITICAL_FORGE_UNDEAD_HORRORS.Settings.${localizationKey}.Hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: defaultValue,
    restricted: true,
    onChange: () => onChange?.()
  });
}
