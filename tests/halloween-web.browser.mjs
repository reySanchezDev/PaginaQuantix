import assert from "node:assert/strict";
import { chromium } from "playwright";

const base = process.env.E2E_BASE_URL || "http://127.0.0.1:4321";
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const forbidden = ".halloween-walker, .halloween-hanging-spider, .halloween-spider-pointer, .halloween-silk-shot";

async function inspect(page, route, mobile = false) {
  const response = await page.goto(new URL(route, base).href, { waitUntil: "load" });
  assert.equal(response?.status(), 200, `${route} must load`);
  await page.evaluate(() => {
    document.documentElement.setAttribute("data-seasonal-theme", "halloween-tech-noir");
  });

  assert.equal(await page.locator(forbidden).count(), 0, "No spiders or click silk allowed");
  assert.equal(
    await page.locator('script[src*="halloween-tech-noir/effects.js"]').count(),
    0,
    "Spider effects script must not be loaded",
  );

  const web = await page.locator(".home-hero").evaluate(async (node) => {
    const style = getComputedStyle(node, "::before");
    const background = style.backgroundImage;
    const asset = await fetch("/themes/halloween-tech-noir/web.svg");
    const xml = new DOMParser().parseFromString(await asset.text(), "image/svg+xml");
    const image = new Image();
    image.src = "/themes/halloween-tech-noir/web.svg";
    await image.decode();
    return {
      background,
      display: style.display,
      width: Number.parseFloat(style.width),
      opacity: Number.parseFloat(style.opacity),
      pointerEvents: style.pointerEvents,
      response: asset.status,
      parserErrors: xml.querySelectorAll("parsererror").length,
      naturalWidth: image.naturalWidth,
    };
  });
  assert.match(web.background, /halloween-tech-noir\/web\.svg/);
  assert.ok(web.width > 0 && web.opacity >= 0.5);
  assert.equal(web.pointerEvents, "none");
  assert.equal(web.response, 200);
  assert.equal(web.parserErrors, 0);
  assert.ok(web.naturalWidth >= 500);
  if (mobile) assert.ok(web.width <= 160, "Mobile cobweb must remain discreet");

  const button = page.locator(".home-hero .hero-contact");
  await button.evaluate((node) => {
    node.addEventListener("click", (event) => {
      event.preventDefault();
      node.dataset.webOnlyClick = "ok";
    }, { once: true });
  });
  await button.click();
  assert.equal(await button.getAttribute("data-web-only-click"), "ok");
  const actualCursor = await button.evaluate((node) => getComputedStyle(node).cursor);
  assert.notEqual(actualCursor, "none", "The native pointer must be restored");

  await page.evaluate(() => {
    document.documentElement.setAttribute("data-seasonal-theme", "default");
  });
  assert.equal(await page.locator(forbidden).count(), 0);
  assert.equal(
    await page.locator(".home-hero").evaluate(
      (node) => getComputedStyle(node, "::before").backgroundImage,
    ),
    "none",
    "The cobweb must disappear outside Halloween",
  );
}

try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await inspect(desktop, "/en/");
  await desktop.close();

  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  await inspect(mobile, "/es/", true);
  await mobile.close();

  const reduced = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  await inspect(reduced, "/en/");
  await reduced.close();

  console.log("Halloween web-only E2E PASS: SVG renders, zero spiders, native cursor, clickable CTA, mobile and reduced motion");
} finally {
  await browser.close();
}
