# gabrielebarni.com

*A website at the crossroads of technology and humanity.*

Personal site of Gabriele Barni: short notes on people, work and AI, plus a
small lab (Meshtastic in Basel, r/risorseumane, a few X lists).

It is a static site built with [Eleventy](https://www.11ty.dev/) and plain CSS.
No framework, no cookies, no trackers, no third-party requests: fonts
(IBM Plex, OFL) and search ([Pagefind](https://pagefind.app/), runs in the
browser) are served from the site itself.

## Run it locally

Requires Node.js 20 or newer (CI uses 22, see `.nvmrc`).

```sh
npm ci            # exact versions from package-lock.json
npm start         # dev server with live reload at http://localhost:8080
npm run build     # production build into _site/ (Eleventy + Pagefind index)
npm run check:links
```

Search only works after `npm run build`, because the Pagefind index is
generated from the built pages. To try it, serve `_site/` (for example
`npx @11ty/eleventy --serve` after a build, or `python3 -m http.server -d _site`).

## Structure

```
src/
  notes/NN-slug.md      one file per note; URL is /writing/slug/
  pages/about.md        About page text
  pages/lab.md          Lab page (Meshtastic and friends)
  fragments/home-intro.md  homepage intro paragraph
  _data/site.js         title, tagline, headline, links, topic names
  _data/legacy.json     old note numbers and ids (for redirects)
  _includes/            Nunjucks layouts
  assets/               CSS, fonts, images (copied as-is)
  static/               CNAME, favicon.ico (copied to the site root)
scripts/
  extract-notes.mjs     one-off: notes from the old single-page index.html
  import-wording.mjs    import a folder of final notes (see below)
```

## Add a note

Create `src/notes/27-my-slug.md`:

```md
---
title: A short title that states the point
date: 2026-11-02
tags: [ai-in-hr]          # one or more of the six topics in src/_data/site.js
keywords: [pilots]        # optional free-form labels
summary: One sentence that appears in lists, feeds and link previews.
featured: true            # optional: list under "Essays" instead of "Short notes"
related: [vendor-evidence] # optional: old ids or note slugs
draft: true               # optional: not published
---

The note in Markdown.
```

The number only orders files on disk; the URL is `/writing/my-slug/`.
Push to `main` and the workflow publishes it.

## Old links

The old site was a single page with links like `/#notes/journey-owner`.
GitHub Pages can't redirect on the server, so a small inline script on the
homepage sends every old note id to its current note (merged notes included;
the cut note goes to /writing/). `/meshtastic.htm` redirects to `/lab/`.
The mapping comes from each note's `merged_from` and `original_ids`.

## Importing a new wording pass

```sh
node scripts/import-wording.mjs /path/to/wording/notes
```

This replaces all notes in `src/notes/` with the folder's `NN-slug.md` files
and updates the home intro and About text from `home-intro.md` and `about.md`.
Free-form tags become `keywords`; tags matching the six topics become `tags`.

## Preview build under /preview/

```sh
npm run build:preview   # _preview/: --pathprefix=/preview/, Pagefind index, robots noindex
```

All internal links, the search bundle and the old-link redirects respect the
path prefix, so the same source works at `/` and under `/preview/`.
Copy `_preview/` to `preview/` on the branch Pages serves (without `CNAME`).

## Deploy (one-time setup)

Deployment runs in GitHub Actions (`.github/workflows/deploy.yml`):
every push and pull request is built and link-checked; pushes to `main`
are deployed. In the repository go to **Settings → Pages → Build and
deployment → Source** and choose **GitHub Actions** (instead of "Deploy from
a branch"). The custom domain stays `www.gabrielebarni.com` (`src/static/CNAME`).

## License

- Code (templates, CSS, scripts): MIT, see `LICENSE`.
- Writing, page text and images: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/),
  see `LICENSE-CONTENT`. Reuse is welcome with attribution to Gabriele Barni.
- IBM Plex fonts: SIL Open Font License 1.1, see `src/assets/fonts/OFL-IBM-Plex.txt`.

Views are my own.

## Credits

Tux, the Linux penguin, was created by Larry Ewing (lewing@isc.tamu.edu) using The GIMP. The About page shows a small Tux in an HR T-shirt as a nod to that.
