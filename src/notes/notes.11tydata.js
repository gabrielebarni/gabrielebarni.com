// Defaults for every note in src/notes/. Files are NN-slug.md; URL is /writing/slug/.
export default {
  layout: "layouts/note.njk",
  templateEngineOverride: "md",
  eleventyComputed: {
    permalink: (data) => (data.draft ? false : `/writing/${data.page.fileSlug.replace(/^\d+-/, "")}/`),
  },
};
