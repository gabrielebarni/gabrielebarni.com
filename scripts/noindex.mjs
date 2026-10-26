#!/usr/bin/env node
// Add <meta name="robots" content="noindex"> to every HTML page in a build folder
// (used for preview builds, so search engines don't index a second copy).
// Usage: node scripts/noindex.mjs _preview
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";
const dir = process.argv[2];
if (!dir) throw new Error("usage: noindex.mjs <dir>");
const TAG = '<meta name="robots" content="noindex">';
let n = 0;
const walk = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.html?$/.test(f)) {
      const s = readFileSync(p, "utf8");
      if (s.includes('name="robots"')) continue;
      writeFileSync(p, s.replace(/<head>/i, `<head>\n${TAG}`));
      n++;
    }
  }
};
walk(dir);
console.log(`noindex added to ${n} pages in ${dir}`);
