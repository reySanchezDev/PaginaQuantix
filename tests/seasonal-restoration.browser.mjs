import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const base = process.env.E2E_BASE_URL || "http://127.0.0.1:4321";
const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const cutoff = "2027-01-01T06:00:00.000Z";
const justBefore = "2027-01-01T05:59:45.000Z";
const forbiddenSpiders =
  ".halloween-walker, .halloween-hanging-spider, .halloween-spider-pointer, .halloween-silk-shot";

function walk(folder) {
  return readdirSync(folder, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(folder, entry.name)) : [join(folder, entry.name)],
  );
}
const routes = walk(dist)
  .filter((file) => file.endsWith(".html") && !file.endsWith("404.html"))
  .map((file) => {
    const pathname = relative(dist, file).split(sep).join("/");
    if (pathname === "index.html") return null;
    return pathname.endsWith("/index.html")
      ? `/${pathname.slice(0, -10)}`
      : `/${pathname.slice(0, -5)}`;
  })
  .filter(Boolean)
  .sort();

async function visit(page, path, date) {
  await page.clock.setFixedTime(new Date(date));
  const response = await page.goto(new URL(path, base).href, { waitUntil: "load" });
  assert.equal(response?.status(), 200, `${path} must respond HTTP 200`);
}

async function state(page) {
  return page.evaluate(() => {
    const style = (selector, pseudo) => {
      const node = document.querySelector(selector);
      if (!node) return null;
      const css = getComputedStyle(node, pseudo);
      return {
        color: css.color,
        backgroundColor: css.backgroundColor,
        backgroundImage: css.backgroundImage,
        opacity: css.opacity,
      };
    };
    const root = document.documentElement;
    return {
      theme: root.getAttribute("data-seasonal-theme"),
      colorCanvas: getComputedStyle(root).getPropertyValue("--color-canvas").trim(),
      colorInk: getComputedStyle(root).getPropertyValue("--color-ink").trim(),
      themeColor: document.querySelector('meta[name="theme-color"]')?.content,
      favicon: document
        .querySelector('link[rel="icon"][type="image/svg+xml"]')
        ?.getAttribute("href"),
      brandIcons: Array.from(document.querySelectorAll(".brand__mark"), (node) =>
        node.getAttribute("src"),
      ),
      visibleBanners: Array.from(
        document.querySelectorAll("[data-seasonal-banner]:not([hidden])"),
        (node) => node.getAttribute("data-seasonal-banner"),
      ),
      header: style(".site-header"),
      headerOrnament: style(".site-header", "::after"),
      body: style("body"),
      hero: style(".home-hero"),
      heroFlowers: style(".home-hero", "::before"),
      heroParticles: style(".home-hero", "::after"),
      headerLights: style(".site-header", "::before"),
      heroHeadline: style(".home-hero h1"),
      heroLead: style(".home-hero .hero-lead"),
      footer: style(".site-footer"),
      footerOrnament: style(".site-footer", "::before"),
      spiderCount: document.querySelectorAll(
        ".halloween-walker, .halloween-hanging-spider, .halloween-spider-pointer, .halloween-silk-shot",
      ).length,
    };
  });
}

function assertDefault(snapshot, label) {
  assert.equal(snapshot.theme, "default", `${label}: theme must revert`);
  assert.equal(snapshot.colorCanvas, "#f6f4ee", `${label}: original canvas token`);
  assert.equal(snapshot.themeColor, "#f6f4ee", `${label}: browser theme color`);
  assert.equal(snapshot.favicon, "/favicon.svg", `${label}: original favicon`);
  assert.deepEqual(snapshot.visibleBanners, [], `${label}: no seasonal notices`);
  assert.equal(snapshot.spiderCount, 0, `${label}: no Halloween overlays`);
  assert.ok(
    snapshot.brandIcons.every((icon) => icon === "/favicon.svg"),
    label,
  );
  assert.equal(snapshot.headerOrnament?.backgroundImage, "none", label);
  if (snapshot.hero) {
    assert.equal(snapshot.heroFlowers?.backgroundImage, "none", label);
    assert.equal(snapshot.heroParticles?.backgroundImage, "none", label);
  }
}

const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
let checked = 0;
try {
  for (const [width, locale] of [
    [1440, "en"],
    [390, "es"],
  ]) {
    const settings = {
      viewport: { width, height: 900 },
      isMobile: width === 390,
      hasTouch: width === 390,
    };
    const baseline = await browser.newPage(settings);
    await visit(baseline, `/${locale}/`, cutoff);
    const expected = await state(baseline);
    assertDefault(expected, `/${locale}/ baseline`);
    await baseline.close();

    const live = await browser.newPage(settings);
    await live.clock.install({ time: new Date(justBefore) });
    const response = await live.goto(new URL(`/${locale}/`, base).href, {
      waitUntil: "load",
    });
    assert.equal(response?.status(), 200);
    const before = await state(live);
    assert.equal(before.theme, "navidad-premium");
    assert.deepEqual(before.visibleBanners, ["navidad-premium"]);
    assert.match(before.heroFlowers?.backgroundImage || "", /pine-branches\.svg/);
    assert.match(before.headerLights?.backgroundImage || "", /lights\.svg/);

    // The site's own 30-second timer must perform the change with no reload.
    await live.clock.fastForward(31_000);
    await live.waitForFunction(
      () => document.documentElement.getAttribute("data-seasonal-theme") === "default",
    );
    const after = await state(live);
    assertDefault(after, `/${locale}/ after midnight`);
    assert.deepEqual(
      after,
      expected,
      `/${locale}/ must exactly match a fresh corporate page, including images and CSS`,
    );
    assert.equal(await live.locator(forbiddenSpiders).count(), 0);
    const cta = live.locator(".home-hero .hero-contact");
    await cta.evaluate((node) => {
      node.addEventListener(
        "click",
        (event) => {
          event.preventDefault();
          node.dataset.restorationClicked = "yes";
        },
        { once: true },
      );
    });
    await cta.click();
    assert.equal(await cta.getAttribute("data-restoration-clicked"), "yes");
    await live.close();
    checked += 2;
  }

  for (const viewport of [1440, 390]) {
    const page = await browser.newPage({
      viewport: { width: viewport, height: 900 },
      isMobile: viewport === 390,
      hasTouch: viewport === 390,
    });
    for (const route of routes) {
      await visit(page, route, cutoff);
      const snapshot = await state(page);
      assertDefault(snapshot, `${route} [${viewport}px]`);
      checked++;
    }
    await page.close();
  }
  console.log(
    `Seasonal restoration E2E PASS: ${routes.length} routes in two viewports, ${checked} page states, live midnight rollover, exact corporate visual restoration, banners, icons and CTA`,
  );
} finally {
  await browser.close();
}
