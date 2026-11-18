// Defaults for standalone pages (about.md, lab/, ...): URL is /<file name>/ unless permalink is set.
export default {
  layout: "layouts/page.njk",
  eleventyComputed: {
    permalink: (data) => data.permalink || `/${data.page.fileSlug}/`,
  },
};
