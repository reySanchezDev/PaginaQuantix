import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const asset = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const effects = asset("../public/themes/halloween-tech-noir/effects.js");
const style = asset("../src/styles/themes/halloween-ambient.css");
const web = asset("../public/themes/halloween-tech-noir/web.svg");
const spiderAsset = asset("../public/themes/halloween-tech-noir/spider.svg");
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

test("Only the hanging spider and desktop cursor can be mounted", () => {
  assert.match(effects, /prefers-reduced-motion: reduce/);
  assert.match(effects, /hover: hover\) and \(pointer: fine/);
  assert.match(effects, /mountHangingSpider/);
  assert.match(effects, /settings\.spiderCursor/);
  assert.doesNotMatch(effects, /mountWalkers|ambientSpiders|halloween-walker/);
  assert.doesNotMatch(style, /halloween-walker|halloween-crawl/);
  assert.match(style, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(style, /max-width: 47\.999rem/);
});

test("Cobweb is lightweight decorative SVG without executable content", () => {
  assert.match(web, /<svg/);
  assert.ok(web.trimStart().startsWith("<svg"), "No non-XML comments may precede SVG root");
  assert.match(web, /viewBox="0 0 500 355"/);
  assert.match(effects, /halloween-tech-noir\/spider\.svg/);
  assert.match(spiderAsset, /viewBox="0 0 120 120"/);
  assert.match(effects, /halloween-hanging-spider/);
  assert.doesNotMatch(spiderAsset, /#ffc38c|<circle[^>]*cx="44"/i);
  assert.doesNotMatch(web, /<script|<foreignObject|onload=/i);
  assert.match(style, /halloween-tech-noir\/web\.svg/);
  assert.match(style, /halloween-hanging-spider::before/);
  assert.match(style, /mask-image:/);
});

test("The minimalist spider is readable and web remains limited to the hero", () => {
  assert.match(spiderAsset, /id="left-legs"/);
  assert.match(spiderAsset, /scale\(-1 1\)/);
  assert.match(style, /\.home-hero::before/);
  assert.doesNotMatch(style, /\.site-footer::before|\.cta-section::before/);
  assert.match(effects, /spider\.svg\?v=minimal-20261030/);
});
