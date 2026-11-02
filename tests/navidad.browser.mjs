import assert from "node:assert/strict";
import { chromium } from "playwright";

const base = process.env.E2E_BASE_URL || "http://127.0.0.1:4321";
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });

async function visit(page, path, date) {
  await page.clock.setFixedTime(new Date(date));
  const response = await page.goto(new URL(path, base).href, { waitUntil: "load" });
  assert.equal(response?.status(), 200, `${path} must load`);
}

try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      isMobile: width === 390,
      hasTouch: width === 390,
    });
    await visit(page, width === 390 ? "/en/" : "/es/", "2026-12-15T18:00:00Z");

    assert.equal(await page.locator("html").getAttribute("data-seasonal-theme"), "navidad-premium");
    assert.equal(await page.locator("[data-seasonal-banner]").count(), 4);
    assert.equal(await page.locator('[data-seasonal-banner="navidad-premium"]').isVisible(), true);
    assert.equal(
      await page.locator('[data-seasonal-banner="dia-de-muertos-premium"]').isVisible(),
      false,
    );
    assert.equal(
      await page.locator('[data-seasonal-banner="halloween-tech-noir"]').isVisible(),
      false,
    );

    const visuals = await page.locator(".home-hero").evaluate((hero) => ({
      pine: getComputedStyle(hero, "::before").backgroundImage,
      particles: getComputedStyle(hero, "::after").animationName,
      noClickBlock: getComputedStyle(hero, "::before").pointerEvents,
      lights: getComputedStyle(document.querySelector(".site-header"), "::before").backgroundImage,
    }));
    assert.match(visuals.pine, /navidad-premium\/pine-branches\.svg/);
    assert.match(visuals.lights, /navidad-premium\/lights\.svg/);
    assert.equal(visuals.noClickBlock, "none");
    assert.notEqual(visuals.particles, "none");

    const cta = page.locator(".home-hero .hero-contact");
    assert.ok(await cta.getAttribute("href"), "The existing CTA must retain its link");
    await page.close();

    const reduced = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    await visit(reduced, "/en/", "2026-12-15T18:00:00Z");
    assert.equal(
      await reduced
        .locator(".home-hero")
        .evaluate((hero) => getComputedStyle(hero, "::after").animationName),
      "none",
    );
    await reduced.close();

    const restored = await browser.newPage({ viewport: { width, height: 900 } });
    await visit(restored, "/en/", "2027-01-01T06:00:00Z");
    assert.equal(await restored.locator("html").getAttribute("data-seasonal-theme"), "default");
    assert.equal(
      await restored.locator('[data-seasonal-banner="navidad-premium"]').isVisible(),
      false,
    );
    await restored.close();
  }
  console.log(
    "Navidad Premium E2E PASS: desktop, mobile, banner, visuals, reduced motion and restoration",
  );
} finally {
  await browser.close();
}
