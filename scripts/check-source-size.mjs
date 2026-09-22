import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const sourceRoot = fileURLToPath(new URL("../src/", import.meta.url));
const extensions = new Set([".astro", ".css", ".mjs", ".ts"]);
const maximumLines = 300;

async function collect(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? collect(path) : path;
    }),
  );
  return files.flat();
}

const files = (await collect(sourceRoot)).filter((file) => extensions.has(extname(file)));
const oversized = [];

for (const file of files) {
  const lines = (await readFile(file, "utf8")).split(/\r?\n/).length;
  if (lines > maximumLines) {
    oversized.push(`${relative(root, file)}: ${lines} lines`);
  }
}

if (oversized.length > 0) {
  console.error(
    `Source files must stay at or below ${maximumLines} lines:\n${oversized.join("\n")}`,
  );
  process.exitCode = 1;
} else {
  console.log(`Source size check passed (${files.length} files, max ${maximumLines} lines).`);
}
