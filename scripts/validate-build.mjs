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
  if (!isRootRedirect && !/<meta\s+property="og:image"/i.test(html))
    errors.push(`${page}: missing social image`);

  const ids = [...html.matchAll(/\sid="([^"]+)"/gi)].map((match) => match[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length > 0)
    errors.push(`${page}: duplicate ids ${[...new Set(duplicates)].join(", ")}`);

  const links = [...html.matchAll(/\shref="(\/[^"#?]*)/gi)].map((match) => match[1]);
  for (const link of links) {
    if (!(await targetExists(link))) errors.push(`${page}: broken internal link ${link}`);
  }
}

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
