import { chromium } from "playwright";
import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, relative, sep } from "node:path";

const base = process.env.E2E_BASE_URL || "http://127.0.0.1:4321";
const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const walk = (folder) =>
  readdirSync(folder, { withFileTypes: true }).flatMap((item) =>
    item.isDirectory() ? walk(join(folder, item.name)) : [join(folder, item.name)],
  );
const routes = walk(dist)
  .filter(
    (file) =>
      file.endsWith(".html") && !file.endsWith("404.html") && !file.endsWith("/dist/index.html"),
  )
  .map((file) => {
    const pathname = relative(dist, file).split(sep).join("/");
    if (pathname === "index.html") return "/";
    return pathname.endsWith("/index.html")
      ? `/${pathname.slice(0, -10)}`
      : `/${pathname.slice(0, -5)}`;
  })
  .sort();

const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const problems = [];
let checked = 0;

const inspect = async (page, route, viewport) => {
  const controls = page.locator(".desktop-nav a.contact-link, .button, .menu-toggle");
  for (const element of await controls.all()) {
    if (!(await element.isVisible())) continue;
    const text = (await element.innerText()).trim() || (await element.getAttribute("aria-label"));
    const verify = async (state) => {
      const result = await element.evaluate((node) => {
        const parse = (value) => {
          const numbers = value.match(/[0-9.]+/g)?.map(Number) || [];
          if (numbers.length < 3) return null;
          return [...numbers.slice(0, 3), numbers[3] ?? 1];
        };
        const linear = (channel) => {
          const normalized = channel / 255;
          return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
        };
        const luminance = (rgb) =>
          0.2126 * linear(rgb[0]) + 0.7152 * linear(rgb[1]) + 0.0722 * linear(rgb[2]);
        const fg = parse(getComputedStyle(node).color);
        if (!fg) return null;
        // Compose transparent surfaces on the Halloween canvas. Opaque CTA
        // surfaces remain exact; semi-transparent header uses the dark canvas.
        let bg = [9, 11, 18, 1];
        const ancestors = [];
        for (let parent = node; parent; parent = parent.parentElement) ancestors.push(parent);
        for (const parent of ancestors.reverse()) {
          const paint = parse(getComputedStyle(parent).backgroundColor);
          if (paint && paint[3] > 0) {
            bg = [
              paint[0] * paint[3] + bg[0] * (1 - paint[3]),
              paint[1] * paint[3] + bg[1] * (1 - paint[3]),
              paint[2] * paint[3] + bg[2] * (1 - paint[3]),
              1,
            ];
          }
        }
        const ratio =
          (Math.max(luminance(fg), luminance(bg)) + 0.05) /
          (Math.min(luminance(fg), luminance(bg)) + 0.05);
        return { ratio, foreground: getComputedStyle(node).color, background: bg };
      });
      if (result) {
        checked++;
        if (result.ratio < 4.5) {
          problems.push(
            `${route} [${viewport}px] ${text || "unnamed control"} ${state} contrast ${result.ratio.toFixed(2)}:1 foreground=${result.foreground} background=${result.background.join(",")}`,
          );
        }
      }
    };
    await verify("normal");
    if (viewport >= 1024) {
      await element.hover();
      await verify("hover");
    }
    await element.focus();
    await verify("focus");
  }
};

try {
  for (const viewport of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width: viewport, height: 900 } });
    for (const route of routes) {
      const response = await page.goto(new URL(route, base).href, {
        waitUntil: "domcontentloaded",
      });
      if (!response || response.status() !== 200) {
        problems.push(`${route} [${viewport}px] HTTP ${response?.status() ?? "no response"}`);
        continue;
      }
      await page.waitForLoadState("load");
      await page.waitForTimeout(250);
      await page.addStyleTag({ content: "*{transition:none!important;animation:none!important}" });
      await page.evaluate(() => {
        document.documentElement.setAttribute("data-seasonal-theme", "halloween-tech-noir");
      });
      await inspect(page, route, viewport);
    }
    await page.close();
  }
} finally {
  await browser.close();
}

console.log(
  `Halloween contrast audit: ${routes.length} pages x 2 viewports, ${checked} control states`,
);
if (problems.length > 0) {
  for (const item of problems) console.error(item);
  process.exitCode = 1;
}
