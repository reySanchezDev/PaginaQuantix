import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const asset = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const effects = asset("../public/themes/halloween-tech-noir/effects.js");
const style = asset("../src/styles/themes/halloween-ambient.css");
const web = asset("../public/themes/halloween-tech-noir/web.svg");
const layout = asset("../src/layouts/BaseLayout.astro");
const globalStyle = asset("../src/styles/global.css");

test("Halloween effects are installed in the existing layout and theme stylesheet", () => {
  assert.match(layout, /halloween-tech-noir\/effects\.js/);
  assert.match(globalStyle, /halloween-ambient\.css/);
  assert.match(effects, /data-seasonal-theme/);
  assert.match(effects, /halloween-tech-noir/);
});

test("Decorative spiders cannot block links, keyboard focus or clicks", () => {
  assert.match(style, /pointer-events:\s*none/);
  assert.match(effects, /pointerdown/);
  assert.doesNotMatch(effects, /preventDefault\(|stopPropagation\(/);
  assert.match(effects, /controller\.abort\(\)/);
  assert.match(effects, /teardown\(\)/);
});

test("Motion preferences and pointer capability gate cursor and roaming spiders", () => {
  assert.match(effects, /prefers-reduced-motion: reduce/);
  assert.match(effects, /hover: hover\) and \(pointer: fine/);
  assert.match(effects, /settings\.ambientSpiders/);
  assert.match(effects, /settings\.spiderCursor/);
  assert.match(style, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(style, /max-width: 47\.999rem/);
});

test("Cobweb is lightweight decorative SVG without executable content", () => {
  assert.match(web, /<svg/);
  assert.ok(web.trimStart().startsWith("<svg"), "No non-XML comments may precede SVG root");
  assert.match(web, /viewBox="0 0 560 560"/);
  assert.match(effects, /viewBox="0 0 96 96"/);
  assert.doesNotMatch(web, /<script|<foreignObject|onload=/i);
  assert.match(style, /halloween-tech-noir\/web\.svg/);
});
