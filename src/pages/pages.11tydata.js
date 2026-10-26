// Defaults for standalone pages (about.md, lab.md, ...): URL is /<file name>/.
export default {
  layout: "layouts/page.njk",
  eleventyComputed: {
    permalink: (data) => data.permalink || `/${data.page.fileSlug}/`,
  },
};
