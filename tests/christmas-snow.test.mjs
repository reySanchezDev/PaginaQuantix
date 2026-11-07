import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { readFileSync } from "node:fs";
const source = readFileSync(new URL("../src/scripts/christmas-snow.js", import.meta.url), "utf8");
function setup({ paused = false, reducedMotion = false, blocked = false } = {}) {
  const events = {};
  const storage = new Map(paused ? [["quantix-snow-paused", "1"]] : []);
  const frames = new Map();
  let nextFrame = 0;
  let draws = 0;
  let seasonChanged;
  const on = (key) => (name, fn) => {
    events[`${key}:${name}`] = fn;
  };
  const ctx = {
    setTransform() {},
    clearRect() {},
    beginPath() {},
    moveTo() {},
    lineTo() {},
    arc() {},
    stroke() {
      draws++;
    },
    fill() {
      draws++;
    },
  };
  const canvas = { hidden: true, getContext: () => ctx };
  const label = { textContent: "" };
  const button = {
    hidden: true,
    dataset: { pause: "Pause snow", resume: "Enable snow" },
    setAttribute(name, value) {
      this[name] = value;
    },
    querySelector: () => label,
    addEventListener: on("button"),
  };
  const doc = {
    hidden: false,
    documentElement: { dataset: { seasonalTheme: "navidad-premium" } },
    body: {},
    querySelector: (selector) => (selector.includes("toggle") ? button : canvas),
    querySelectorAll: () =>
      blocked
        ? [
            {
              getBoundingClientRect: () => ({
                left: -100,
                right: 2000,
                top: -100,
                bottom: 2000,
                width: 2100,
                height: 2100,
              }),
            },
          ]
        : [],
    addEventListener: on("document"),
  };
  const media = { matches: reducedMotion, addEventListener: on("media") };
  const win = {
    innerWidth: 1440,
    innerHeight: 900,
    devicePixelRatio: 3,
    addEventListener: on("window"),
  };
  vm.runInNewContext(source, {
    document: doc,
    window: win,
    matchMedia: () => media,
    localStorage: { getItem: (k) => storage.get(k), setItem: (k, v) => storage.set(k, v) },
    requestAnimationFrame: (fn) => {
      frames.set(++nextFrame, fn);
      return nextFrame;
    },
    cancelAnimationFrame: (id) => frames.delete(id),
    MutationObserver: class {
      constructor(fn) {
        seasonChanged = fn;
      }
      observe() {}
    },
    ResizeObserver: class {
      observe() {}
    },
  });
  return {
    doc,
    media,
    button,
    label,
    canvas,
    frames,
    storage,
    events,
    seasonChanged: () => seasonChanged(),
    draws: () => draws,
  };
}
test("snow pauses, persists preference and cancels its frame loop", () => {
  const h = setup();
  assert.equal(h.canvas.hidden, false);
  assert.equal(h.canvas.width, 2160, "pixel ratio is capped at 1.5");
  assert.equal(h.frames.size, 1);
  h.events["button:click"]();
  assert.equal(h.canvas.hidden, true);
  assert.equal(h.frames.size, 0);
  assert.equal(h.label.textContent, "Enable snow");
  assert.equal(h.storage.get("quantix-snow-paused"), "1");
  h.events["button:click"]();
  assert.equal(h.frames.size, 1);
  h.doc.hidden = true;
  h.events["document:visibilitychange"]();
  assert.equal(h.frames.size, 0);
  h.doc.hidden = false;
  h.events["document:visibilitychange"]();
  assert.equal(h.frames.size, 1);
});
test("reduced motion, saved pause and season retirement stop snow", () => {
  const reduced = setup({ reducedMotion: true });
  assert.equal(reduced.frames.size, 0);
  assert.equal(reduced.button.hidden, true);
  const saved = setup({ paused: true });
  assert.equal(saved.frames.size, 0);
  assert.equal(saved.button.hidden, false);
  const h = setup();
  h.media.matches = true;
  h.events["media:change"]();
  assert.equal(h.frames.size, 0);
  h.media.matches = false;
  h.events["media:change"]();
  h.doc.documentElement.dataset.seasonalTheme = "default";
  h.seasonChanged();
  assert.equal(h.frames.size, 0);
  assert.equal(h.button.hidden, true);
});
test("snow never draws over protected text or images", () => {
  for (const blocked of [false, true]) {
    const h = setup({ blocked });
    const [id, fn] = h.frames.entries().next().value;
    h.frames.delete(id);
    fn(100);
    assert.equal(h.draws() > 0, !blocked);
  }
});
