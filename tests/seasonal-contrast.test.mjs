import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// UX-039: theme palettes must not make readable text disappear against a hero.
// This catches CSS token regressions before the November seasonal theme ships.
const theme = readFileSync(
  new URL("../src/styles/themes/dia-de-muertos-premium.css", import.meta.url),
  "utf8",
);

function token(name) {
  const pattern = new RegExp(`\\-\\-${name}:\\s*(#[a-fA-F0-9]{6})\\s*;`);
  const match = theme.match(pattern);
  assert.ok(match, `Missing solid-color token: --${name}`);
  return match[1];
}

function luminance(hex) {
  const channels = hex.slice(1).match(/../g).map((part) => {
    const value = Number.parseInt(part, 16) / 255;
    return value <= 0.04045
      ? value / 12.92
      : ((value + 0.055) / 1.055) ** 2.4;
  });
  return (
    0.2126 * channels[0] +
    0.7152 * channels[1] +
    0.0722 * channels[2]
  );
}

function contrast(foreground, background) {
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

test("UX-039: light seasonal hero overrides inherited inverse foreground", () => {
  assert.match(
    theme,
    /html\[data-seasonal-theme="dia-de-muertos-premium"\] \.home-hero\s*\{[^}]*color:\s*var\(--color-ink\);/s,
  );
});

test("UX-039: normal hero copy and subtle text reach WCAG AA on both gradient stops", () => {
  const backgrounds = ["#fbf4e9", "#f5e1d2"];
  for (const name of ["color-ink", "color-ink-muted", "color-ink-subtle"]) {
    for (const background of backgrounds) {
      const ratio = contrast(token(name), background);
      assert.ok(
        ratio >= 4.5,
        `${name} on ${background} only reaches ${ratio.toFixed(2)}:1`,
      );
    }
  }
});

test("UX-039: violet hero heading and CTA text meet WCAG AA", () => {
  const backgrounds = ["#fbf4e9", "#f5e1d2"];
  for (const background of backgrounds) {
    assert.ok(
      contrast(token("color-primary"), background) >= 4.5,
      "Violet heading or link lacks accessible contrast",
    );
  }
  assert.ok(
    contrast(token("color-on-primary"), token("color-primary")) >= 4.5,
    "Hero CTA text lacks accessible contrast",
  );
});
