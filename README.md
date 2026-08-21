# fractionalytics.io

The Fractionalytics website. Static HTML on GitHub Pages, no dependencies and no CI.

## Build

```
node build.mjs
```

That reads `src/` and writes the HTML, `sitemap.xml`, `robots.txt`, `llms.txt`, `agents.md`,
`diagnostic.js` and `favicon.svg` to the repo root. **The generated files are committed**, so what
is in git is exactly what gets served. Run the build and commit the result in the same change; if
you edit a page in `src/` and forget, the site does not move.

To look at it before pushing:

```
python -m http.server 8791
```

## Layout

| Path | What it is |
|---|---|
| `src/pages/home.md` | The practice page (`/`) |
| `src/pages/about.md` | About David Smith (`/about/`) |
| `src/posts/*.md` | One published article each, full text, frontmatter on top |
| `src/diagnostic.mjs` | The six questions, the four results, and the scoring rule |
| `build.mjs` | Templates, markdown renderer, JSON-LD, sitemap, robots, llms.txt |
| `styles.css` | All the CSS. Hand-edited, not generated. |

## Adding an article

Drop a file in `src/posts/` with this frontmatter and the body below it, then rebuild. The list
pages, the sitemap, `llms.txt`, `agents.md` and the previous/next links all pick it up on their own.

```
---
title: "..."
dek: "One sentence. Shows under the headline and becomes the meta description."
date: 2026-09-01
origin: https://www.linkedin.com/pulse/...
tags: ["...", "..."]
series: "Part 3 of 3"      # optional
---
```

The prose is David's published text, reproduced verbatim. Pull it from `fra-strategy` (the canon
copies live in `content/canon/` and `content/`), strip the production comment block, and leave the
words alone.

## Two rules the build exists to enforce

**1. Every word ships in the server response.** Nothing here is assembled by JavaScript. The
self-assessment has interactive scoring, but all six questions and all four results are in the HTML
whether the script runs or not, and the page reads correctly with JavaScript off. Roughly 70% of AI
crawler requests execute no JavaScript, so anything a script builds is invisible to them.

**2. The markup stays thin.** CSS and the favicon are separate files rather than inlined, because
inlining them buries the text in a page that is mostly not text.

## The Ladder Check

The self-assessment is called **The Ladder Check** (named 2026-08-20). The page heading stays
the question itself; the name is what it is called in the nav, in `llms.txt` and out loud.

`src/diagnostic.mjs` is the single source of truth. `build.mjs` writes the scoring function into
`diagnostic.js` from that file rather than a second copy, and the client script clones the result
copy out of the HTML instead of carrying its own, so the page and the build cannot drift apart.

Three things in there are settled decisions, not defaults:

- **PASS has to stay reachable.** A self-assessment that never tells someone they are fine is a
  sales device wearing a diagnostic costume.
- **No score out of 100**, because a score invites gaming and comparison. It returns a named
  failure mode instead.
- **No email gate in front of the result.** Gating a verdict turns it into a lead-capture form and
  the reader can tell.

The ladder is a closed set of six here and deliberately open in the article it comes from. That is
not an inconsistency: an essay that terminates in a verdict gives false comfort, and an instrument
that does not terminate is not an instrument.
