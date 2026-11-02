import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// UX-039: do not inherit white hero text on a light seasonal surface.
const theme = readFileSync(
  new URL("../src/styles/themes/dia-de-muertos-premium.css", import.meta.url),
  "utf8",
);

function token(name) {
  const pattern = new RegExp(`--${name}:\\s*(#[a-fA-F0-9]{6})\\s*;`);
  const match = theme.match(pattern);
  assert.ok(match, `Missing solid-color token: --${name}`);
  return match[1];
}

function luminance(hex) {
  const values = [1, 3, 5].map((start) => {
    const value = Number.parseInt(hex.slice(start, start + 2), 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * values[0] + 0.7152 * values[1] + 0.0722 * values[2];
}

function contrast(foreground, background) {
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

test("UX-039: light hero overrides the inverse foreground", () => {
  const hero = theme.split(".home-hero {")[1]?.split("}")[0];
  assert.ok(hero, "Seasonal hero is missing");
  assert.match(hero, /color:\s*var\(--color-ink\);/);
});

test("UX-039: normal copy reaches AA on both gradient stops", () => {
  for (const background of ["#fbf4e9", "#f5e1d2"]) {
    for (const name of ["color-ink", "color-ink-muted", "color-ink-subtle"]) {
      const ratio = contrast(token(name), background);
      assert.ok(
        ratio >= 4.5,
        `${name} on ${background} only reaches ${ratio.toFixed(2)}:1`,
      );
    }
  }
});

test("UX-039: violet heading and CTA foreground reach AA", () => {
  for (const background of ["#fbf4e9", "#f5e1d2"]) {
    assert.ok(contrast(token("color-primary"), background) >= 4.5);
  }
  assert.ok(
    contrast(token("color-on-primary"), token("color-primary")) >= 4.5,
  );
});
