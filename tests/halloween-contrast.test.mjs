import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const theme = readFileSync(
  new URL("../src/styles/themes/halloween-tech-noir.css", import.meta.url),
  "utf8",
);
const header = readFileSync(
  new URL("../src/components/nav/SiteHeader.astro", import.meta.url),
  "utf8",
);
const button = readFileSync(new URL("../src/components/ui/Button.astro", import.meta.url), "utf8");

function color(token) {
  const expression = new RegExp(`^\\s*--${token}:\\s*(#[a-fA-F0-9]{6}|transparent);`, "m");
  const match = theme.match(expression);
  assert.ok(match, `Theme token missing: --${token}`);
  return match[1];
}

function luminance(value) {
  const channels = [1, 3, 5].map(
    (index) => Number.parseInt(value.slice(index, index + 2), 16) / 255,
  );
  const linear = channels.map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}

function contrast(foreground, background) {
  const top = Math.max(luminance(foreground), luminance(background));
  const bottom = Math.min(luminance(foreground), luminance(background));
  return (top + 0.05) / (bottom + 0.05);
}

function assertContrast(foreground, background, name) {
  const actual = contrast(foreground, background);
  assert.ok(actual >= 4.5, `${name}: ${actual.toFixed(2)}:1 is below WCAG AA 4.5:1`);
}

test("Halloween header Contact has readable normal and hover states", () => {
  assert.match(header, /--nav-contact-bg/);
  assert.match(header, /--nav-contact-fg/);
  assert.match(header, /:focus-visible/);
  assert.match(header, /aria-current="page"/);
  const normalBackground = color("nav-contact-bg");
  assert.equal(normalBackground, "transparent");
  assertContrast(color("nav-contact-fg"), color("color-canvas"), "Outlined Contact button");
  assertContrast(
    color("nav-contact-hover-fg"),
    color("nav-contact-hover-bg"),
    "Hover Contact button",
  );
});

test("Halloween primary buttons retain WCAG AA contrast across product pages", () => {
  assert.match(button, /--color-on-primary/);
  assertContrast(color("color-on-primary"), color("color-primary"), "Primary normal");
  assertContrast(color("color-on-primary"), color("color-primary-hover"), "Primary hover");
});

test("Halloween inverse buttons are readable on light and dark surfaces", () => {
  assert.match(button, /--color-on-inverse-button/);
  assert.match(button, /--color-on-inverse-button-hover/);
  assertContrast(color("color-on-inverse-button"), color("color-inverse"), "Inverse normal");
  assertContrast(color("color-on-inverse-button-hover"), color("color-canvas"), "Inverse hover");
});

test("Halloween header inherits no identical foreground/background colors", () => {
  assert.notEqual(color("nav-contact-fg"), color("nav-contact-bg"));
  assert.notEqual(color("nav-contact-hover-fg"), color("nav-contact-hover-bg"));
});
