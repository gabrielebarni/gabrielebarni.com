#!/usr/bin/env node
// One-off migration: extract the 34 field notes embedded as JSON in the old
// single-page index.html into src/notes/NN-slug.md (original wording).
// Usage: node scripts/extract-notes.mjs [path/to/old/index.html]
// The old index.html is in git history (commit 45f8613); by default we read it from there.
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, readdirSync, unlinkSync } from "node:fs";

const src = process.argv[2]
  ? readFileSync(process.argv[2], "utf8")
  : execSync("git show 45f8613:index.html", { encoding: "utf8", maxBuffer: 1 << 24 });
const m = src.match(/<script id="ox-notes-data" type="application\/json">([\s\S]*?)<\/script>/);
if (!m) throw new Error("notes JSON not found");
const { sources, notes } = JSON.parse(m[1]);

const TAGS = {
  "HR service delivery": "hr-service", "AI in HR": "ai-in-hr", "Skills & talent": "skills-and-talent",
  "Employee experience": "employee-experience", "Future of work": "future-of-work", "Governance & value": "governance-and-value",
};
const q = (s) => JSON.stringify(s); // JSON strings are valid YAML scalars
const srcLink = (key) => {
  const s = sources[key];
  return s ? `[${s.title}](${s.url}) (${s.year})` : "";
};
const paras = (ps) => (ps || []).join("\n\n");

mkdirSync("src/notes", { recursive: true });
for (const f of readdirSync("src/notes")) if (/^\d+-.*\.md$/.test(f)) unlinkSync(`src/notes/${f}`);

const legacy = [];
notes.forEach((n, i) => {
  const num = String(i + 1).padStart(2, "0");
  legacy.push({ number: i + 1, id: n.id, title: n.title });
  const usedSources = new Set([n.source]);
  let body = "";
  if (n.sections) {
    body += paras(n.intro) + "\n\n";
    for (const sec of n.sections) {
      body += `## ${sec.heading}\n\n${paras(sec.paragraphs)}\n\n`;
      for (const c of [...(sec.cards || []), ...(sec.patterns || [])]) {
        body += `### ${c.title}\n\n${c.text}\n\n`;
        if (c.source) { body += `Source: ${srcLink(c.source)}\n\n`; usedSources.add(c.source); }
      }
      if (sec.items) body += sec.items.map((x) => `- ${x}`).join("\n") + "\n\n";
      if (sec.source) { body += `Source: ${srcLink(sec.source)}\n\n`; usedSources.add(sec.source); }
      if (sec.after) body += paras(sec.after) + "\n\n";
    }
    body += `<details>\n<summary>Research context and limitations</summary>\n\n${n.evidence}\n\nSource: ${srcLink(n.source)}\n\n</details>\n`;
  } else {
    body += `${n.opening}\n\n## ${n.perspectiveHeading}\n\n${n.perspective}\n\n## ${n.actionHeading}\n\n${n.action}\n\n${n.watch}\n\n`;
    body += `<details>\n<summary>Research behind this note</summary>\n\n${n.evidence}\n\nSource: ${srcLink(n.source)}\n\n</details>\n`;
  }
  const fm = [
    "---",
    `title: ${q(n.title)}`,
    `date: ${n.publishedAt || "2026-10-13"}`,
    `tags: [${q(TAGS[n.topic] || "future-of-work")}]`,
    `summary: ${q(n.deck)}`,
    `legacy_id: ${q(n.id)}`,
    `legacy_number: ${i + 1}`,
    n.featured ? "featured: true" : null,
    n.homeTitle ? `home_title: ${q(n.homeTitle)}` : null,
    n.related?.length ? `related: [${n.related.map(q).join(", ")}]` : null,
    n.sourceCheckedAt ? `source_checked: ${q(n.sourceCheckedAt)}` : null,
    "wording: original",
    "---",
  ].filter(Boolean).join("\n");
  writeFileSync(`src/notes/${num}-${n.id}.md`, fm + "\n\n" + body.trim() + "\n");
});
writeFileSync("src/_data/legacy.json", JSON.stringify(legacy, null, 2) + "\n");
console.log(`Wrote ${notes.length} notes to src/notes/ and src/_data/legacy.json`);
