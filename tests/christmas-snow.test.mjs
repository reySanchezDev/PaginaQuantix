import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { readFileSync } from "node:fs";
const source = readFileSync(new URL("../src/scripts/christmas-snow.js", import.meta.url), "utf8");
function setup({
  reducedMotion = false,
  blocked = false,
  background = "rgb(247, 243, 233)",
  backgroundImage = "none",
} = {}) {
  const events = {};
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
  const surface = {
    getBoundingClientRect: () => ({
      left: 0,
      right: 1440,
      top: 0,
      bottom: 900,
      width: 1440,
      height: 900,
    }),
  };
  const canvas = { hidden: true, getContext: () => ctx };
  const doc = {
    hidden: false,
    documentElement: { dataset: { seasonalTheme: "navidad-premium" } },
    body: {},
    querySelector: () => canvas,
    querySelectorAll: (selector) =>
      selector.startsWith("body,")
        ? [surface]
        : blocked
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
    getComputedStyle: () => ({ backgroundColor: background, backgroundImage }),
    document: doc,
    window: win,
    matchMedia: () => media,
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
    canvas,
    frames,
    events,
    seasonChanged: () => seasonChanged(),
    draws: () => draws,
    context: ctx,
  };
}
test("snow suspends its frame loop in a hidden tab", () => {
  const h = setup();
  assert.equal(h.canvas.hidden, false);
  assert.equal(h.canvas.width, 2160, "pixel ratio is capped at 1.5");
  assert.equal(h.frames.size, 1);
  h.doc.hidden = true;
  h.events["document:visibilitychange"]();
  assert.equal(h.frames.size, 0);
  h.doc.hidden = false;
  h.events["document:visibilitychange"]();
  assert.equal(h.frames.size, 1);
});
test("reduced motion and season retirement stop snow", () => {
  const reduced = setup({ reducedMotion: true });
  assert.equal(reduced.frames.size, 0);
  const h = setup();
  h.media.matches = true;
  h.events["media:change"]();
  assert.equal(h.frames.size, 0);
  h.media.matches = false;
  h.events["media:change"]();
  h.doc.documentElement.dataset.seasonalTheme = "default";
  h.seasonChanged();
  assert.equal(h.frames.size, 0);
  assert.equal(h.canvas.hidden, true);
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

test("snow adapts to light, dark and gradient backgrounds without changing density", () => {
  for (const [background, expected, backgroundImage = "none"] of [
    ["rgb(247, 243, 233)", "#718f97"],
    ["rgb(16, 45, 39)", "#edf7f4"],
    ["rgba(0, 0, 0, 0)", "#edf7f4", "linear-gradient(90deg, rgb(16, 45, 39), rgb(27, 76, 61))"],
  ]) {
    const h = setup({ background, backgroundImage });
    const [id, fn] = h.frames.entries().next().value;
    h.frames.delete(id);
    fn(100);
    assert.equal(h.context.fillStyle, expected);
    assert.ok(h.context.globalAlpha <= 0.48);
  }
});
