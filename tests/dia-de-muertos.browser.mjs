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
    await visit(page, width === 390 ? "/en/" : "/es/", "2026-11-02T18:00:00Z");

    assert.equal(
      await page.locator("html").getAttribute("data-seasonal-theme"),
      "dia-de-muertos-premium",
    );
    const visuals = await page.locator(".home-hero").evaluate((hero) => ({
      flowers: getComputedStyle(hero, "::before").backgroundImage,
      noClickBlock: getComputedStyle(hero, "::before").pointerEvents,
      confetti: getComputedStyle(hero, "::after").animationName,
      bunting: getComputedStyle(document.querySelector(".site-header"), "::after")
        .backgroundImage,
    }));
    assert.match(visuals.flowers, /dia-de-muertos-premium\/flores\.svg/);
    assert.match(visuals.bunting, /dia-de-muertos-premium\/papel-picado\.svg/);
    assert.equal(visuals.noClickBlock, "none");

    const cta = page.locator(".home-hero .hero-contact");
    await cta.evaluate((node) => {
      node.addEventListener("click", (event) => {
        event.preventDefault();
        node.dataset.seasonalClick = "working";
      }, { once: true });
    });
    await cta.click();
    assert.equal(await cta.getAttribute("data-seasonal-click"), "working");
    await page.close();
  }

  const reduced = await browser.newPage({ reducedMotion: "reduce" });
  await visit(reduced, "/es/", "2026-11-02T18:00:00Z");
  assert.equal(
    await reduced.locator(".home-hero").evaluate(
      (node) => getComputedStyle(node, "::after").animationName,
    ),
    "none",
  );
  await reduced.close();

  const restored = await browser.newPage();
  await visit(restored, "/en/", "2026-11-03T06:00:00Z");
  assert.equal(
    await restored.locator("html").getAttribute("data-seasonal-theme"),
    "default",
    "The corporate theme returns at midnight Nicaragua time on November 3",
  );
  await restored.close();

  console.log("Dia de Muertos E2E PASS: themes, flowers, bunting, live clicks, mobile and restoration");
} finally {
  await browser.close();
}
