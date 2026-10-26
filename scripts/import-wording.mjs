#!/usr/bin/env node
// Import the final wording (Kreus's pass) into the site.
//   node scripts/import-wording.mjs [/path/to/wording/notes]
// Input folder: NN-slug.md notes (front matter title/date/tags/summary/merged_from),
// plus home-intro.md, about.md and an optional index.md (mapping, not published).
// Output: src/notes/NN-slug.md (replacing all existing notes), src/fragments/home-intro.md,
// src/pages/about.md. Free-form tags become `keywords`; the six site topics become `tags`.
import { readFileSync, writeFileSync, readdirSync, unlinkSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import yaml from "js-yaml";

const dir = process.argv[2] || "/workspace/site-review/wording/notes";
const legacy = JSON.parse(readFileSync("src/_data/legacy.json", "utf8"));
const byNumber = Object.fromEntries(legacy.map((l) => [l.number, l.id]));

// Original related links and featured flags, from the old site's JSON (git history).
const old = execSync("git show 45f8613:index.html", { encoding: "utf8", maxBuffer: 1 << 24 });
const oldNotes = JSON.parse(old.match(/<script id="ox-notes-data" type="application\/json">([\s\S]*?)<\/script>/)[1]).notes;
const oldById = Object.fromEntries(oldNotes.map((n) => [n.id, n]));

const TOPICS = {
  "hr service delivery": "hr-service", "hr service": "hr-service", "ai in hr": "ai-in-hr",
  "skills & talent": "skills-and-talent", "skills and talent": "skills-and-talent",
  "employee experience": "employee-experience", "future of work": "future-of-work",
  "governance & value": "governance-and-value", "governance and value": "governance-and-value",
};
const split = (src) => {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error("no front matter");
  return [yaml.load(m[1]) || {}, m[2]];
};
const curly = (s) => s.replace(/(\w)'(\w)/g, "$1’$2");
const dump = (fm) => yaml.dump(fm, { lineWidth: -1, quotingType: '"' });

const files = readdirSync(dir).filter((f) => /^\d+-.+\.md$/.test(f)).sort();
if (!files.length) throw new Error(`no NN-slug.md notes in ${dir}`);
for (const f of readdirSync("src/notes")) if (/^\d+-.+\.md$/.test(f)) unlinkSync(`src/notes/${f}`);

for (const f of files) {
  const [fm, body] = split(readFileSync(`${dir}/${f}`, "utf8"));
  const labels = [].concat(fm.tags || []).map(String);
  const topics = [...new Set(labels.map((t) => TOPICS[t.toLowerCase()]).filter(Boolean))];
  const keywords = labels.filter((t) => !TOPICS[t.toLowerCase()]);
  const merged = [].concat(fm.merged_from || []);
  const ids = fm.original_ids?.length ? fm.original_ids : merged.map((n) => byNumber[Number(String(n).replace("#", ""))]).filter(Boolean);
  const related = [...new Set(ids.flatMap((id) => oldById[id]?.related || []))].filter((id) => !ids.includes(id));
  const out = {
    title: curly(fm.title),
    date: String(fm.date).slice(0, 10),
    tags: topics.length ? topics : ["future-of-work"],
    keywords,
    summary: curly(fm.summary || ""),
    merged_from: merged,
    legacy_id: ids[0],
    original_ids: ids,
    ...(ids.some((id) => oldById[id]?.featured) ? { featured: true } : {}),
    ...(related.length ? { related } : {}),
    ...(fm.date_source ? { date_source: fm.date_source } : {}),
    // Kreus's hand-picked cross-links (NN-slug or slug), shown as a small "Related" line.
    ...(fm.related?.length ? { see_also: [].concat(fm.related).map((s) => String(s).replace(/^\d+-/, "")) } : {}),
    wording: "kreus",
  };
  writeFileSync(`src/notes/${f}`, "---\n" + dump(out) + "---\n\n" + body.trim() + "\n");
}

// Home intro: the "Intro paragraph" block of home-intro.md (or its whole body if unlabeled).
if (existsSync(`${dir}/home-intro.md`)) {
  const [, body] = split(readFileSync(`${dir}/home-intro.md`, "utf8"));
  const m = body.match(/\*\*Intro paragraph:\*\*\s*\n([\s\S]*?)(\n\s*\n\*\*|$)/);
  writeFileSync("src/fragments/home-intro.md", curly((m ? m[1] : body).trim()) + "\n");
}
// About: drop the leading H1 (the layout renders the title).
if (existsSync(`${dir}/about.md`)) {
  const [fm, body] = split(readFileSync(`${dir}/about.md`, "utf8"));
  // The footer already carries the content license, so drop a license sentence from the body.
  const text = body.replace(/^\s*# .*\n+/, "").replace(/ ?[^.\n]*\blicensed\b[^\n]*CC BY[^\n]*$/gm, "").replace(/\*Audentes Fortuna iuvat\.\*/, '<i lang="la">Audentes Fortuna iuvat.</i>');
  const out = { title: fm.title || "About", description: "Gabriele Barni: Senior Director HR at Lonza, from Milan, based near Basel. On people, work and AI." };
  writeFileSync("src/pages/about.md", "---\n" + dump(out) + "---\n\n" + curly(text.trim()) + "\n");
}
console.log(`Imported ${files.length} notes from ${dir}`);
