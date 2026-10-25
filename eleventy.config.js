import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import site from "./src/_data/site.js";

/** Notes are NN-slug.md; the URL slug drops the NN- prefix. */
const noteSlug = (fileSlug) => fileSlug.replace(/^\d+-/, "");
const slugify = (s) =>
  String(s).toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function (eleventyConfig) {
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
  eleventyConfig.addFilter("absoluteUrl", (path) => new URL(path, site.url).href);
  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter("tagLabel", (slug) => site.tags[slug] || slug);
  /** Resolve legacy note ids (from the old single-page site) to current note URLs. */
  eleventyConfig.addFilter("findByLegacyId", (notes, id) =>
    (notes || []).find((n) => [n.data.legacy_id, ...(n.data.merged_from || [])].map(String).includes(String(id))));

  eleventyConfig.addCollection("notes", (api) =>
    api.getFilteredByGlob("src/notes/*.md").filter((n) => !n.data.draft).sort((a, b) => b.date - a.date || a.inputPath.localeCompare(b.inputPath)));
  eleventyConfig.addCollection("noteTags", (api) => {
    const tags = new Set();
    api.getFilteredByGlob("src/notes/*.md").forEach((n) => (n.data.tags || []).forEach((t) => t !== "notes" && tags.add(t)));
    return [...tags].sort();
  });

  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: { name: "notes", limit: 20 },
    metadata: { language: "en", title: site.title + " — Writing", subtitle: site.tagline, base: site.url + "/", author: { name: site.author } },
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
}
