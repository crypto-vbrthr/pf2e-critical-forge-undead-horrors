import test from "node:test";
import assert from "node:assert/strict";

const hooks = new Map();
const registeredSettings = new Map();
const settingValues = new Map([
  ["enableUndeadCriticalHits", true],
  ["enableUndeadCriticalFumbles", false],
  ["enableCriticalHitsAgainstUndead", true]
]);

globalThis.Hooks = {
  once(name, callback) {
    hooks.set(name, callback);
  }
};

globalThis.game = {
  settings: {
    register(moduleId, key, config) {
      registeredSettings.set(`${moduleId}.${key}`, config);
    },
    get(_moduleId, key) {
      return settingValues.get(key);
    }
  },
  i18n: { localize: (key) => key }
};

globalThis.ui = { notifications: { error() {} } };

await import("../scripts/main.js");

test("registers three world settings enabled by default", () => {
  hooks.get("init")();
  assert.equal(registeredSettings.size, 3);
  for (const config of registeredSettings.values()) {
    assert.equal(config.scope, "world");
    assert.equal(config.config, true);
    assert.equal(config.type, Boolean);
    assert.equal(config.default, true);
    assert.equal(config.requiresReload, true);
  }
});

test("registers three protected extension packs with independent enabled states", () => {
  let requirements = null;
  let registered = null;
  let replace = null;
  let compatibilityChecked = false;

  const extension = {
    assertCompatible() { compatibilityChecked = true; },
    registerPacks(packs, options) {
      registered = packs;
      replace = options.replace;
    }
  };

  hooks.get("pf2eCriticalForgeReady")({
    extensions: {
      forModule(moduleId, options) {
        assert.equal(moduleId, "pf2e-critical-forge-undead-horrors");
        requirements = options.requirements;
        return extension;
      }
    }
  });

  assert.equal(compatibilityChecked, true);
  assert.equal(requirements.apiVersion, ">=0.9.7");
  assert.deepEqual(requirements.capabilities, ["cards.multiDeckPacks"]);
  assert.equal(replace, true);
  assert.equal(registered.length, 3);
  assert.deepEqual(registered.map((pack) => pack.enabled), [true, false, true]);
  assert.equal(registered[0].decks.attack.length, 60);
  assert.deepEqual(registered.slice(1).map((pack) => pack.decks), [
    { attack: [] },
    { attack: [] }
  ]);
});
