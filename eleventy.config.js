import { readFileSync } from "node:fs";
import { RenderPlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import site from "./src/_data/site.js";

/** Notes are NN-slug.md; the URL slug drops the NN- prefix. */
const noteSlug = (fileSlug) => fileSlug.replace(/^\d+-/, "");
/** Old note number -> old id, e.g. 30 -> "ninety-days" (src/_data/legacy.json). */
const legacy = JSON.parse(readFileSync(new URL("./src/_data/legacy.json", import.meta.url), "utf8"));
/** Normalise a legacy reference ("ninety-days", "#30", 30) to the old id. */
const legacyId = (ref) => {
  const m = String(ref).trim().match(/^#?(\d+)$/);
  if (!m) return String(ref).trim().replace(/^#?notes\//, "");
  return legacy.find((l) => l.number === Number(m[1]))?.id ?? String(ref);
};
const noteLegacyIds = (n) => [n.data.legacy_id, ...[].concat(n.data.merged_from || [])].filter((x) => x != null).map(legacyId);
const slugify = (s) =>
  String(s).toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(RenderPlugin);
  // Curly quotes and dashes in Markdown text; raw HTML is left alone.
  eleventyConfig.amendLibrary("md", (md) => md.set({ typographer: true }));
  eleventyConfig.ignores.add("src/fragments/**");
  eleventyConfig.ignores.add("src/assets/**"); // copied as-is, never templated
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });

  eleventyConfig.addFilter("noteSlug", noteSlug);
  eleventyConfig.addFilter("slugify", slugify);
  eleventyConfig.addFilter("readableDate", (d) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" }));
  eleventyConfig.addFilter("longDate", (d) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }));
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("readingTime", (html) => {
    const words = String(html || "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 220));
  });
  eleventyConfig.addFilter("fullUrl", (path) => new URL(path, site.url).href);
  eleventyConfig.addFilter("json", (v) => JSON.stringify(v).replace(/</g, "\\u003c"));
  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter("tagLabel", (slug) => site.tags[slug] || slug);
  /** Resolve legacy note ids (from the old single-page site) to current note URLs. */
  eleventyConfig.addFilter("findByLegacyId", (notes, id) =>
    (notes || []).find((n) => noteLegacyIds(n).includes(legacyId(id))) ||
    (notes || []).find((n) => noteSlug(n.page.fileSlug) === String(id)));

  eleventyConfig.addCollection("notes", (api) =>
    api.getFilteredByGlob("src/notes/*.md").filter((n) => !n.data.draft).sort((a, b) => b.date - a.date || !!b.data.featured - !!a.data.featured || a.inputPath.localeCompare(b.inputPath)));
  /** { oldId: newUrl } for every note of the old single-page site; cut notes go to /writing/. */
  eleventyConfig.addCollection("legacyRedirects", (api) => {
    const notes = api.getFilteredByGlob("src/notes/*.md").filter((n) => !n.data.draft);
    const map = {};
    for (const l of legacy) map[l.id] = "/writing/";
    for (const n of notes) for (const id of noteLegacyIds(n)) map[id] = n.url;
    return map;
  });
  /** Oldest first, as the feed plugin expects (it reverses and takes the newest). */
  eleventyConfig.addCollection("notesFeed", (api) =>
    api.getFilteredByGlob("src/notes/*.md").filter((n) => !n.data.draft).sort((a, b) => a.date - b.date || !!a.data.featured - !!b.data.featured || b.inputPath.localeCompare(a.inputPath)));
  eleventyConfig.addCollection("noteTags", (api) => {
    const tags = new Set();
    api.getFilteredByGlob("src/notes/*.md").forEach((n) => (n.data.tags || []).forEach((t) => t !== "notes" && tags.add(t)));
    return [...tags].sort();
  });

  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: { name: "notesFeed", limit: 50 },
    metadata: { language: "en", title: site.title + " — Writing", subtitle: site.tagline, base: site.url + "/", author: { name: site.author } },
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
}
