import { access, readdir, readFile } from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("../", import.meta.url)));
const distRoot = join(projectRoot, "dist");

async function collect(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? collect(path) : path;
    }),
  );
  return nested.flat();
}

const htmlFiles = (await collect(distRoot)).filter((file) => extname(file) === ".html");
const errors = [];
const checkedSocialImages = new Map();

function count(source, pattern) {
  return source.match(pattern)?.length ?? 0;
}

async function targetExists(pathname) {
  const clean = decodeURIComponent(pathname).replace(/^\/+/, "");
  const candidates = [join(distRoot, clean), join(distRoot, clean, "index.html")];
  for (const candidate of candidates) {
    try {
      await access(candidate);
      return true;
    } catch {}
  }
  return false;
}

async function validateSocialImage(pathname) {
  if (checkedSocialImages.has(pathname)) return checkedSocialImages.get(pathname);
  const validation = (async () => {
    const file = join(distRoot, decodeURIComponent(pathname).replace(/^\/+/, ""));
    try {
      const image = await readFile(file);
      const width = image.readUInt32BE(16);
      const height = image.readUInt32BE(20);
      return width === 1200 && height === 630;
    } catch {
      return false;
    }
  })();
  checkedSocialImages.set(pathname, validation);
  return validation;
}

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const page = `/${relative(distRoot, file).replace(/index\.html$/, "")}`;
  const isRootRedirect = file === join(distRoot, "index.html");
  const isNoindex = /<meta\s+name="robots"\s+content="noindex/i.test(html);

  if (!isRootRedirect && count(html, /<main\b/gi) !== 1)
    errors.push(`${page}: expected one main landmark`);
  if (!isRootRedirect && count(html, /<h1\b/gi) !== 1) errors.push(`${page}: expected one h1`);
  if (!isRootRedirect && !/<html\s+lang="(?:es|en)"/i.test(html))
    errors.push(`${page}: missing valid lang`);
  if (!isRootRedirect && !isNoindex && !/<link\s+rel="canonical"/i.test(html))
    errors.push(`${page}: missing canonical`);
  if (!isRootRedirect && !isNoindex && count(html, /hreflang=/gi) < 3)
    errors.push(`${page}: incomplete hreflang set`);
  if (!isRootRedirect) {
    const socialImage = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i)?.[1];
    const socialAlt = html.match(/<meta\s+property="og:image:alt"\s+content="([^"]+)"/i)?.[1];
    const twitterImage = html.match(/<meta\s+name="twitter:image"\s+content="([^"]+)"/i)?.[1];
    const twitterAlt = html.match(/<meta\s+name="twitter:image:alt"\s+content="([^"]+)"/i)?.[1];

    if (!socialImage) {
      errors.push(`${page}: missing social image`);
    } else {
      const imageUrl = new URL(socialImage);
      if (!(await validateSocialImage(imageUrl.pathname)))
        errors.push(`${page}: social image is missing or not 1200x630 (${imageUrl.pathname})`);
      if (twitterImage !== socialImage)
        errors.push(`${page}: Open Graph and Twitter images differ`);

      const locale = page.startsWith("/es/") ? "es" : page.startsWith("/en/") ? "en" : undefined;
      if (locale && !imageUrl.pathname.endsWith(`-${locale}.png`))
        errors.push(`${page}: social image does not match page locale`);

      const product = page.match(/^\/(?:es\/productos|en\/products)\/([^/]+)\//)?.[1];
      if (product && !imageUrl.pathname.endsWith(`/${product}-${locale}.png`))
        errors.push(`${page}: product social image does not match product route`);
    }
    if (!socialAlt || !twitterAlt) errors.push(`${page}: missing social image alt text`);
  }

  const ids = [...html.matchAll(/\sid="([^"]+)"/gi)].map((match) => match[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length > 0)
    errors.push(`${page}: duplicate ids ${[...new Set(duplicates)].join(", ")}`);

  const links = [...html.matchAll(/\shref="(\/[^"#?]*)/gi)].map((match) => match[1]);
  for (const link of links) {
    if (!(await targetExists(link))) errors.push(`${page}: broken internal link ${link}`);
  }
}

const vercelConfig = JSON.parse(await readFile(join(projectRoot, "vercel.json"), "utf8"));
const rootRedirects = vercelConfig.redirects?.filter((redirect) => redirect.source === "/") ?? [];
const hasLocaleRedirect = (locale, type) =>
  rootRedirects.some(
    (redirect) =>
      redirect.destination === `/${locale}/` &&
      redirect.permanent === false &&
      redirect.has?.some((condition) => condition.type === type),
  );

if (!hasLocaleRedirect("es", "header"))
  errors.push("vercel.json: missing temporary Spanish Accept-Language redirect");
if (!hasLocaleRedirect("es", "cookie") || !hasLocaleRedirect("en", "cookie"))
  errors.push("vercel.json: missing persisted locale redirects");
if (!rootRedirects.some((redirect) => redirect.destination === "/en/" && !redirect.has))
  errors.push("vercel.json: missing English locale fallback");

const robots = await readFile(join(distRoot, "robots.txt"), "utf8");
const sitemapMatch = robots.match(/^Sitemap:\s+(\S+)/im);

if (!sitemapMatch) {
  errors.push("robots.txt: missing sitemap declaration");
} else {
  const sitemapUrl = new URL(sitemapMatch[1]);
  const sitemapPath = join(distRoot, sitemapUrl.pathname.replace(/^\/+/, ""));

  try {
    const sitemapIndex = await readFile(sitemapPath, "utf8");
    const childSitemaps = [...sitemapIndex.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (match) => new URL(match[1]).pathname,
    );

    for (const childPath of childSitemaps) {
      const sitemap = await readFile(join(distRoot, childPath.replace(/^\/+/, "")), "utf8");
      if (sitemap.includes("<loc>https://www.quantix.software/</loc>")) {
        errors.push("sitemap: redirecting root URL must be excluded");
      }
    }
  } catch {
    errors.push(`robots.txt: declared sitemap does not exist (${sitemapUrl.pathname})`);
  }
}

if (errors.length > 0) {
  console.error(`Build validation failed:\n${[...new Set(errors)].join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`Build validation passed (${htmlFiles.length} HTML files).`);
}
