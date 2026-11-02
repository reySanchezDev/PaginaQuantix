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
    const banners = page.locator("[data-seasonal-banner]");
    assert.equal(await banners.count(), 3, "Every seasonal theme must have an explanation");
    assert.equal(
      await page.locator('[data-seasonal-banner="dia-de-muertos-premium"]').isVisible(),
      true,
    );
    assert.equal(await page.locator('[data-seasonal-banner="octubre-rosa"]').isVisible(), false);
    assert.equal(
      await page.locator('[data-seasonal-banner="halloween-tech-noir"]').isVisible(),
      false,
    );
    const visuals = await page.locator(".home-hero").evaluate((hero) => ({
      flowers: getComputedStyle(hero, "::before").backgroundImage,
      noClickBlock: getComputedStyle(hero, "::before").pointerEvents,
      confetti: getComputedStyle(hero, "::after").animationName,
      bunting: getComputedStyle(document.querySelector(".site-header"), "::after").backgroundImage,
    }));
    assert.match(visuals.flowers, /dia-de-muertos-premium\/flores\.svg/);
    assert.match(visuals.bunting, /dia-de-muertos-premium\/papel-picado\.svg/);
    assert.equal(visuals.noClickBlock, "none");

    // Regression: hero copy and real-product captions must remain legible.
    // The original seasonal release put nearly white text on a cream hero.
    const heroReadability = await page.locator(".home-hero").evaluate((hero) => {
      const parse = (value) =>
        (value.match(/[0-9.]+/g) || []).slice(0, 3).map((item) => Number(item));
      const luminance = (rgb) =>
        rgb
          .map((channel) => {
            const value = channel / 255;
            return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
          })
          .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
      const contrast = (fg, bg) => {
        const top = Math.max(luminance(fg), luminance(bg));
        const bottom = Math.min(luminance(fg), luminance(bg));
        return (top + 0.05) / (bottom + 0.05);
      };
      const backgrounds = ["#1d1530", "#302041", "#442a52"].map((hex) =>
        [1, 3, 5].map((position) => Number.parseInt(hex.slice(position, position + 2), 16)),
      );
      const selectors = [
        ".hero-copy > .eyebrow",
        ".hero-copy h1 span:first-child",
        ".hero-copy h1 span:last-child",
        ".hero-lead",
        ".hero-work-link",
        ".composition-note",
        ".composition-note span",
        ".hero-footnote p",
        ".hero-products a",
      ];
      const checked = selectors.map((selector) => {
        const element = hero.querySelector(selector);
        if (!element) return { selector, ratio: 0 };
        const fg = parse(getComputedStyle(element).color);
        return { selector, ratio: Math.min(...backgrounds.map((bg) => contrast(fg, bg))) };
      });
      return { checked, background: getComputedStyle(hero).backgroundImage };
    });
    assert.match(heroReadability.background, /linear-gradient/);
    for (const item of heroReadability.checked) {
      assert.ok(
        item.ratio >= 4.5,
        `${item.selector} has only ${item.ratio.toFixed(2)}:1 contrast against the hero`,
      );
    }
    const assets = await page.evaluate(async () => {
      const paths = [
        "/themes/dia-de-muertos-premium/papel-picado.svg?v=2",
        "/themes/dia-de-muertos-premium/flores.svg?v=2",
      ];
      return Promise.all(
        paths.map(async (path) => {
          const response = await fetch(path);
          const doc = new DOMParser().parseFromString(await response.text(), "image/svg+xml");
          const image = new Image();
          image.src = path;
          await image.decode();
          return {
            path,
            status: response.status,
            invalid: Boolean(doc.querySelector("parsererror")),
            paths: doc.querySelectorAll("path").length,
            width: image.naturalWidth,
          };
        }),
      );
    });
    assert.equal(assets.length, 2);
    for (const asset of assets) {
      assert.equal(asset.status, 200, asset.path);
      assert.equal(asset.invalid, false, asset.path);
      assert.ok(asset.width >= 300 && asset.paths > 5, asset.path);
    }

    const cta = page.locator(".home-hero .hero-contact");
    await cta.evaluate((node) => {
      node.addEventListener(
        "click",
        (event) => {
          event.preventDefault();
          node.dataset.seasonalClick = "working";
        },
        { once: true },
      );
    });
    await cta.click();
    assert.equal(await cta.getAttribute("data-seasonal-click"), "working");
    await page.close();
  }

  const reduced = await browser.newPage({ reducedMotion: "reduce" });
  await visit(reduced, "/es/", "2026-11-02T18:00:00Z");
  assert.equal(
    await reduced
      .locator(".home-hero")
      .evaluate((node) => getComputedStyle(node, "::after").animationName),
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
  for (const banner of await restored.locator("[data-seasonal-banner]").all()) {
    assert.equal(await banner.isVisible(), false, "No seasonal banner after November 2");
  }
  await restored.close();

  for (const campaign of [
    { date: "2026-10-20T18:00:00Z", theme: "octubre-rosa" },
    { date: "2026-10-31T18:00:00Z", theme: "halloween-tech-noir" },
  ]) {
    const past = await browser.newPage();
    await visit(past, "/en/", campaign.date);
    assert.equal(await past.locator("html").getAttribute("data-seasonal-theme"), campaign.theme);
    assert.equal(
      await past.locator(`[data-seasonal-banner="${campaign.theme}"]`).isVisible(),
      true,
      `The visitor must see an explanation for ${campaign.theme}`,
    );
    assert.equal(
      await past.locator("[data-seasonal-banner]:not([hidden])").count(),
      1,
      "Only the current campaign banner can be visible",
    );
    await past.close();
  }

  console.log(
    "Dia de Muertos E2E PASS: themes, flowers, bunting, live clicks, mobile and restoration",
  );
} finally {
  await browser.close();
}
