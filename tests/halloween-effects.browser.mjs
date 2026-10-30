import assert from "node:assert/strict";
import { chromium } from "playwright";

const base = process.env.E2E_BASE_URL || "http://127.0.0.1:4321";
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });

async function activate(page, path) {
  const response = await page.goto(new URL(path, base).href, { waitUntil: "load" });
  assert.equal(response?.status(), 200, `${path} should load`);
  await page.evaluate(() => {
    document.documentElement.setAttribute("data-seasonal-theme", "halloween-tech-noir");
  });
}

async function waitFor(page, selector, count) {
  await page.waitForFunction(
    ([query, expected]) => document.querySelectorAll(query).length === expected,
    [selector, count],
  );
}

try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await activate(desktop, "/en/");
  await waitFor(desktop, ".halloween-walker", 3);
  assert.equal(await desktop.locator(".halloween-spider-pointer").count(), 1);
  assert.equal(await desktop.locator(".halloween-walker").count(), 3);
  const webImage = await desktop
    .locator(".home-hero")
    .evaluate((node) => getComputedStyle(node, "::before").backgroundImage);
  assert.match(webImage, /halloween-tech-noir\/web\.svg/);

  await desktop.mouse.move(350, 350);
  await desktop.waitForFunction(
    () => document.documentElement.getAttribute("data-halloween-cursor") === "on",
  );
  const pointerStyle = await desktop
    .locator(".halloween-spider-pointer")
    .evaluate((node) => getComputedStyle(node).pointerEvents);
  assert.equal(pointerStyle, "none");

  await desktop.mouse.down();
  await waitFor(desktop, ".halloween-silk-shot", 1);
  await desktop.mouse.up();

  // Decorations may not intercept real CTA actions.
  const cta = desktop.locator(".home-hero .hero-contact");
  await cta.evaluate((node) => {
    node.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        node.dataset.testClicked = "yes";
      },
      { once: true },
    );
  });
  await cta.click();
  assert.equal(await cta.getAttribute("data-test-clicked"), "yes");

  await desktop.evaluate(() => {
    document.documentElement.setAttribute("data-seasonal-theme", "default");
  });
  await waitFor(desktop, ".halloween-walker", 0);
  await waitFor(desktop, ".halloween-spider-pointer", 0);
  assert.equal(
    await desktop.evaluate(() => document.documentElement.hasAttribute("data-halloween-cursor")),
    false,
  );
  await desktop.close();

  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  await activate(mobile, "/es/");
  await waitFor(mobile, ".halloween-walker", 3);
  assert.equal(await mobile.locator(".halloween-spider-pointer").count(), 0);
  assert.equal(await mobile.locator(".halloween-walker:visible").count(), 1);
  await mobile.close();

  const reduced = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  await activate(reduced, "/en/");
  assert.equal(await reduced.locator(".halloween-walker").count(), 0);
  assert.equal(await reduced.locator(".halloween-spider-pointer").count(), 0);
  assert.equal(
    await reduced
      .locator(".home-hero")
      .evaluate((node) => getComputedStyle(node, "::before").animationName),
    "none",
  );
  await reduced.close();

  console.log(
    "Halloween effects E2E PASS: cursor/click, web, walkers, mobile, reduced motion, teardown",
  );
} finally {
  await browser.close();
}
