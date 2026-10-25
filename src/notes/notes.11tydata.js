// Defaults for every note in src/notes/. Files are NN-slug.md; URL is /writing/slug/.
export default {
  layout: "layouts/note.njk",
  templateEngineOverride: "md",
  eleventyComputed: {
    // From the Markdown source, so list pages don't need rendered content (220 wpm).
    readingMinutes: (data) => {
      const words = String(data.page.rawInput || "").replace(/<[^>]+>|\[|\]\([^)]*\)/g, " ").split(/\s+/).filter(Boolean).length;
      return Math.max(1, Math.round(words / 220));
    },
    permalink: (data) => (data.draft ? false : `/writing/${data.page.fileSlug.replace(/^\d+-/, "")}/`),
  },
};
