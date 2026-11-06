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
    assert.equal(
      await page
        .locator(".site-header")
        .evaluate((header) => getComputedStyle(header, "::before").pointerEvents),
      "none",
      "The garland must never intercept navigation clicks",
    );

    const garland = await page.evaluate(async () => {
      const response = await fetch("/themes/navidad-premium/lights.svg?v=2");
      const svg = new DOMParser().parseFromString(await response.text(), "image/svg+xml");
      const image = new Image();
      image.src = "/themes/navidad-premium/lights.svg?v=2";
      await image.decode();
      return {
        status: response.status,
        errors: svg.querySelectorAll("parsererror").length,
        wirePaths: [...svg.querySelectorAll('path[d^="M0 27"]')].map((node) =>
          node.getAttribute("d"),
        ),
        leds: svg.querySelectorAll("[data-led]").length,
        phases: [...svg.querySelectorAll("[data-led]")].map((node) => node.getAttribute("style")),
        animation: svg.querySelector("style")?.textContent || "",
        naturalWidth: image.naturalWidth,
      };
    });
    assert.equal(garland.status, 200);
    assert.equal(garland.errors, 0);
    assert.equal(garland.naturalWidth, 720);
    assert.equal(garland.wirePaths.length, 2, "Two strokes outline the same continuous cable");
    assert.ok(
      garland.wirePaths.every((path) => path.endsWith("720 27")),
      "Cable must begin and end at exactly y=27 to avoid visible tile seams",
    );
    assert.equal(garland.leds, 6, "Six individually powered bulbs per seamless SVG tile");
    assert.equal(new Set(garland.phases).size, 6, "LED bulbs must have independent pulse timings");
    assert.match(garland.animation, /@keyframes qx-led-aura/);
    assert.match(garland.animation, /prefers-reduced-motion: reduce/);

    if (width === 1440) {
      const header = await page.locator(".site-header").boundingBox();
      assert.ok(header, "Header should be visible for illumination test");
      const clip = {
        x: 0,
        y: header.y + header.height + 3,
        width: 720,
        height: 33,
      };
      const firstFrame = await page.screenshot({ clip, animations: "allow" });
      await page.waitForTimeout(900);
      const secondFrame = await page.screenshot({ clip, animations: "allow" });
      assert.notDeepEqual(
        firstFrame,
        secondFrame,
        "The garland bulbs must visibly pulse in the actual browser, not just contain animation markup",
      );
    }

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
    assert.match(
      await reduced
        .locator(".site-header")
        .evaluate((header) => getComputedStyle(header, "::before").backgroundImage),
      /lights-static\.svg/,
      "Reduced-motion users must see steady, warm lights without animation",
    );
    const staticGarland = await reduced.evaluate(async () => {
      const response = await fetch("/themes/navidad-premium/lights-static.svg?v=2");
      const doc = new DOMParser().parseFromString(await response.text(), "image/svg+xml");
      const img = new Image();
      img.src = "/themes/navidad-premium/lights-static.svg?v=2";
      await img.decode();
      return {
        status: response.status,
        errors: doc.querySelectorAll("parsererror").length,
        hasAnimations: Boolean(doc.querySelector("style, animate, animateTransform")),
        leds: doc.querySelectorAll("[data-led]").length,
      };
    });
    assert.equal(staticGarland.status, 200);
    assert.equal(staticGarland.errors, 0);
    assert.equal(staticGarland.hasAnimations, false);
    assert.equal(staticGarland.leds, 6);
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
