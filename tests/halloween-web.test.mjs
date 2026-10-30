import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const file = (path) => new URL(path, import.meta.url);
const read = (path) => readFileSync(file(path), "utf8");
const layout = read("../src/layouts/BaseLayout.astro");
const css = read("../src/styles/themes/halloween-ambient.css");
const web = read("../public/themes/halloween-tech-noir/web.svg");
const globalStyles = read("../src/styles/global.css");

test("Halloween retains its cobweb without loading decorative scripts", () => {
  assert.match(layout, /\/themes\/calendar\.js/);
  assert.match(layout, /\/themes\/runtime\.js/);
  assert.match(globalStyles, /halloween-ambient\.css/);
  assert.match(css, /data-seasonal-theme="halloween-tech-noir"/);
  assert.match(css, /halloween-tech-noir\/web\.svg/);
  assert.doesNotMatch(layout, /halloween-tech-noir\/effects\.js/);
});

test("No spider asset, script, cursor or walking decoration remains", () => {
  assert.equal(existsSync(file("../public/themes/halloween-tech-noir/effects.js")), false);
  assert.equal(existsSync(file("../public/themes/halloween-tech-noir/spider.svg")), false);
  assert.doesNotMatch(css, /spider|walker|silk-shot|cursor:\s*none|@keyframes/i);
  assert.doesNotMatch(layout, /halloween-spider|halloween-hanging/);
});

test("The remaining cobweb is a valid, noninteractive local SVG", () => {
  assert.ok(web.trimStart().startsWith("<svg"));
  assert.match(web, /viewBox="0 0 500 355"/);
  assert.doesNotMatch(web, /<script|<foreignObject|onload=/i);
  assert.match(css, /pointer-events:\s*none/);
  assert.match(css, /\.home-hero::before/);
  assert.doesNotMatch(css, /\.cta-section::before|\.site-footer::before/);
  assert.match(css, /max-width: 47\.999rem/);
});
