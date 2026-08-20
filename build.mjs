// fractionalytics.io static build.
//
//   node build.mjs
//
// Reads src/posts/*.md and src/pages/*.md, writes plain HTML to the repo root for GitHub Pages.
// No dependencies, no toolchain, no CI. The generated HTML is committed, so what is in git is
// exactly what gets served.
//
// Two constraints shape the output, and both are deliberate:
//   1. EVERY WORD SHIPS IN THE SERVER RESPONSE. Nothing on this site is assembled by JavaScript.
//      The diagnostic has interactive scoring, but all six questions and all four verdicts are
//      in the HTML whether the script runs or not.
//   2. THE MARKUP STAYS THIN. CSS and the favicon live in their own files rather than inline,
//      because inlining them buries the text in a page that is mostly not text.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { QUESTIONS, VERDICTS, AUTHORITY_NOTE, verdictFor } from './src/diagnostic.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SITE = 'https://fractionalytics.io';
const AUTHOR = 'David Smith';
const BUILT = '2026-08-20';

/* ------------------------------------------------------------------ helpers */

const esc = (s) => String(s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

const escAttr = (s) => esc(s).replace(/"/g, '&quot;');

const slugify = (s) => String(s).toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

function longDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

// Meta descriptions want roughly 120 to 160 characters. Several deks are shorter than that, so
// short ones get the byline and date appended rather than being padded with filler.
function metaDesc(p) {
  const [y, m] = p.date.split('-').map(Number);
  let d = p.dek;
  if (d.length < 118) d = `${d} By David Smith, fractional CDO, ${MONTHS[m - 1]} ${y}.`;
  if (d.length > 162) d = `${d.slice(0, 158).replace(/[\s,;:.]+\S*$/, '')}...`;
  return d;
}

/* ------------------------------------------------- a small markdown renderer */

function inline(text) {
  let s = esc(text);
  s = s.replace(/`([^`]+)`/g, (_, c) => `<code>${c}</code>`);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
    const ext = /^https?:\/\//.test(href) && !href.startsWith(SITE);
    const rel = ext ? ' rel="noopener"' : '';
    return `<a href="${escAttr(href)}"${rel}>${label}</a>`;
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, (_, c) => `<strong>${c}</strong>`);
  s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, (_, pre, c) => `${pre}<em>${c}</em>`);
  return s;
}

function renderTable(rows) {
  const cells = (line) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
  const head = cells(rows[0]);
  const bodyRows = rows.slice(2).map(cells);
  const th = head.map((c) => `<th scope="col">${inline(c)}</th>`).join('');
  const tb = bodyRows.map((r) => {
    const tds = r.map((c, i) => (i === 0
      ? `<th scope="row">${inline(c)}</th>`
      : `<td>${inline(c)}</td>`)).join('');
    return `<tr>${tds}</tr>`;
  }).join('\n');
  return `<div class="table-scroll"><table>\n<thead><tr>${th}</tr></thead>\n<tbody>\n${tb}\n</tbody>\n</table></div>`;
}

// Returns { html, headings } so the build can hand a table of contents to the page template.
export function markdown(src) {
  const lines = src.split('\n');
  const out = [];
  const headings = [];
  let i = 0;

  const flushList = (tag, items) => {
    out.push(`<${tag}>`);
    for (const it of items) out.push(`<li>${inline(it)}</li>`);
    out.push(`</${tag}>`);
  };

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) { i++; continue; }

    // horizontal rule
    if (/^-{3,}$/.test(line.trim())) { out.push('<hr>'); i++; continue; }

    // heading
    const h = /^(#{1,4})\s+(.*)$/.exec(line);
    if (h) {
      const level = h[1].length;
      const text = h[2].trim();
      const id = slugify(text);
      if (level === 2) headings.push({ id, text });
      out.push(`<h${level} id="${escAttr(id)}">${inline(text)}</h${level}>`);
      i++;
      continue;
    }

    // table
    if (line.trim().startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) { rows.push(lines[i]); i++; }
      out.push(rows.length >= 2 ? renderTable(rows) : `<p>${inline(rows.join(' '))}</p>`);
      continue;
    }

    // blockquote
    if (line.trim().startsWith('>')) {
      const buf = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        buf.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      const paras = buf.join('\n').split(/\n\s*\n/).map((p) => `<p>${inline(p.replace(/\n/g, ' '))}</p>`);
      out.push(`<blockquote>${paras.join('')}</blockquote>`);
      continue;
    }

    // unordered list
    if (/^\s*[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ''));
        i++;
      }
      flushList('ul', items);
      continue;
    }

    // ordered list
    if (/^\s*\d+[.)]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+[.)]\s+/, ''));
        i++;
      }
      flushList('ol', items);
      continue;
    }

    // An image placeholder carried over from the LinkedIn original. The published pieces have
    // charts in them; the canon copies record the caption rather than the file. Render the
    // caption as a real figure so the description survives, and say plainly where the picture is,
    // rather than dropping the line or inventing an image to sit under it.
    if (/^\[IMAGE[.:\s]/i.test(line.trim())) {
      const buf2 = [];
      while (i < lines.length && lines[i].trim()) { buf2.push(lines[i].trim()); i++; }
      const whole = buf2.join(' ').replace(/^\[/, '').replace(/\]$/, '');
      const capMatch = /Caption:\s*(.*)$/i.exec(whole);
      const caption = capMatch ? capMatch[1].trim() : whole.replace(/^IMAGE[.:]\s*/i, '');
      out.push(`<figure class="figure-note">
<figcaption><span class="stamp">Figure, in the original</span> ${inline(caption)}</figcaption>
</figure>`);
      continue;
    }

    // paragraph
    const buf = [];
    while (i < lines.length && lines[i].trim()
      && !/^(#{1,4})\s/.test(lines[i])
      && !lines[i].trim().startsWith('|')
      && !lines[i].trim().startsWith('>')
      && !/^\s*[-*]\s+/.test(lines[i])
      && !/^\s*\d+[.)]\s+/.test(lines[i])
      && !/^-{3,}$/.test(lines[i].trim())) {
      buf.push(lines[i].trim());
      i++;
    }
    out.push(`<p>${inline(buf.join(' '))}</p>`);
  }

  return { html: out.join('\n'), headings };
}

/* ------------------------------------------------------------- frontmatter */

function parseDoc(raw) {
  const text = raw.split('\r\n').join('\n');
  if (!text.startsWith('---\n')) return { meta: {}, body: text.trim() };
  const end = text.indexOf('\n---\n', 3);
  const head = text.slice(4, end);
  const body = text.slice(end + 5).trim();
  const meta = {};
  for (const line of head.split('\n')) {
    const m = /^([A-Za-z][A-Za-z0-9_]*):\s*(.*)$/.exec(line);
    if (!m) continue;
    const key = m[1];
    let val = m[2].trim();
    if (val.startsWith('[') || val.startsWith('"')) {
      try { val = JSON.parse(val); } catch { /* leave the raw string */ }
    }
    meta[key] = val;
  }
  return { meta, body };
}

/* ------------------------------------------------------------------ layout */

const NAV = [
  { href: '/', label: 'Practice' },
  { href: '/diagnostic/', label: 'The Ladder Check' },
  { href: '/writing/', label: 'Writing' },
  { href: '/about/', label: 'About' },
];

function jsonld(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj, null, 0)}</script>`;
}

const ORG_ID = `${SITE}/#organization`;
const PERSON_ID = `${SITE}/#david-smith`;
const SITE_ID = `${SITE}/#website`;

const ORGANIZATION = {
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: 'Fractionalytics, LLC',
  alternateName: 'Fractionalytics',
  url: `${SITE}/`,
  logo: { '@type': 'ImageObject', url: `${SITE}/logo-stack.svg`, caption: 'Fractionalytics' },
  image: `${SITE}/og-card-2026-07.png`,
  email: 'david@fractionalytics.io',
  slogan: 'AI strategy, the data beneath it, and the systems to run it',
  description: 'Fractional Chief Data Officer practice. Data strategy, foundations, remediation and customer analytics for companies moving on AI, whose ambitions have outrun the state of their data.',
  founder: { '@id': PERSON_ID },
  employee: { '@id': PERSON_ID },
  address: { '@type': 'PostalAddress', addressLocality: 'Coral Gables', addressRegion: 'FL', addressCountry: 'US' },
  areaServed: [
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Place', name: 'Latin America' },
    { '@type': 'Place', name: 'Europe' },
  ],
  knowsAbout: [
    'AI readiness', 'Data strategy', 'Data foundations', 'Data remediation', 'Data quality',
    'Entity resolution', 'Identity resolution', 'Fractional Chief Data Officer',
    'Customer analytics', 'Customer lifetime value', 'Cohort analysis', 'Data diligence',
    'Customer data platforms', 'Modern data stack', 'dbt', 'Snowflake', 'Databricks', 'BigQuery',
  ],
  sameAs: ['https://www.linkedin.com/in/dksmith01/'],
};

const PERSON = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'David Smith',
  givenName: 'David',
  familyName: 'Smith',
  jobTitle: 'Fractional Chief Data Officer',
  description: 'Fractional Chief Data Officer. Sets AI strategy with leadership teams, builds the data and systems underneath it, and ships the highest-leverage pieces.',
  url: `${SITE}/about/`,
  email: 'david@fractionalytics.io',
  worksFor: { '@id': ORG_ID },
  homeLocation: { '@type': 'Place', name: 'Coral Gables, Florida' },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'The Wharton School, University of Pennsylvania' },
    { '@type': 'CollegeOrUniversity', name: 'Rice University' },
  ],
  knowsLanguage: ['en', 'es'],
  knowsAbout: ORGANIZATION.knowsAbout,
  sameAs: [
    'https://www.linkedin.com/in/dksmith01/',
    'https://www.youtube.com/watch?v=DdW_h7ugRhg',
  ],
};

const WEBSITE = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: `${SITE}/`,
  name: 'Fractionalytics',
  description: 'AI strategy, the data beneath it, and the systems to run it.',
  inLanguage: 'en-US',
  publisher: { '@id': ORG_ID },
  copyrightHolder: { '@id': ORG_ID },
};

function breadcrumbLd(trail) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${SITE}${trail[trail.length - 1].href}#breadcrumb`,
    itemListElement: trail.map((t, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: t.label,
      item: `${SITE}${t.href}`,
    })),
  };
}

function crumbsHtml(trail) {
  const items = trail.map((t, idx) => {
    const last = idx === trail.length - 1;
    const inner = last
      ? `<span aria-current="page">${esc(t.label)}</span>`
      : `<a href="${escAttr(t.href)}">${esc(t.label)}</a>`;
    const sep = last ? '' : '<span aria-hidden="true"> /</span>';
    return `<li>${inner}${sep}</li>`;
  }).join('');
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${items}</ol></nav>`;
}

function layout(o) {
  const url = `${SITE}${o.href}`;
  const nav = NAV.map((n) => {
    const current = n.href === o.href ? ' aria-current="page"' : '';
    return `<li><a href="${n.href}"${current}>${n.label}</a></li>`;
  }).join('');

  const graph = [WEBSITE, ORGANIZATION, PERSON, ...(o.ld || [])];
  if (o.trail && o.trail.length > 1) graph.push(breadcrumbLd(o.trail));

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escAttr(o.metaTitle)}</title>
<meta name="description" content="${escAttr(o.description)}">
<meta name="author" content="${AUTHOR}">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
<link rel="canonical" href="${escAttr(url)}">
<meta property="og:type" content="${o.ogType || 'website'}">
<meta property="og:site_name" content="Fractionalytics">
<meta property="og:locale" content="en_US">
<meta property="og:url" content="${escAttr(url)}">
<meta property="og:title" content="${escAttr(o.metaTitle)}">
<meta property="og:description" content="${escAttr(o.description)}">
<meta property="og:image" content="${SITE}/og-card-2026-07.png">
<meta property="og:image:width" content="2400">
<meta property="og:image:height" content="1260">
<meta property="og:image:alt" content="Fractionalytics: AI strategy, the data beneath it, and the systems to run it">
${o.publishedTime ? `<meta property="article:published_time" content="${o.publishedTime}">\n<meta property="article:author" content="${AUTHOR}">\n` : ''}<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escAttr(o.metaTitle)}">
<meta name="twitter:description" content="${escAttr(o.description)}">
<meta name="twitter:image" content="${SITE}/og-card-2026-07.png">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600&family=Archivo:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="/styles.css">
<link rel="sitemap" type="application/xml" href="/sitemap.xml">
<link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt">
${jsonld({ '@context': 'https://schema.org', '@graph': graph })}
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<header class="masthead">
<div class="masthead-inner">
<a href="/" aria-label="Fractionalytics home"><img class="logo" src="/logo-stack.svg" alt="Fractionalytics" width="327" height="102"></a>
<nav class="sitenav" aria-label="Primary"><ul>${nav}</ul></nav>
</div>
</header>
<main id="main" class="wrap">
${o.body}
</main>
<footer class="sitefooter">
<div class="wrap">
<div class="footer-grid">
<section>
<h2>Fractionalytics</h2>
<ul>
<li><a href="/">The practice</a></li>
<li><a href="/diagnostic/">The Ladder Check</a></li>
<li><a href="/writing/">Writing</a></li>
<li><a href="/about/">About David Smith</a></li>
</ul>
</section>
<section>
<h2>Start here</h2>
<ul>
<li><a href="/writing/how-many-customers-do-you-have/">How Many Customers Do You Have?</a></li>
<li><a href="/writing/the-unsexy-data-work-that-actually-matters/">The Unsexy Data Work That Actually Matters</a></li>
<li><a href="/writing/the-more-ambitious-you-get-with-ai/">The more ambitious you get with AI</a></li>
</ul>
</section>
<section>
<h2>Contact</h2>
<ul>
<li><a href="mailto:david@fractionalytics.io">david@fractionalytics.io</a></li>
<li><a href="https://www.linkedin.com/in/dksmith01/" rel="noopener">LinkedIn</a></li>
<li>Coral Gables, Florida</li>
</ul>
</section>
<section>
<h2>For agents</h2>
<ul>
<li><a href="/llms.txt">llms.txt</a></li>
<li><a href="/agents.md">agents.md</a></li>
<li><a href="/sitemap.xml">sitemap.xml</a></li>
</ul>
</section>
</div>
<p class="colophon">Fractionalytics, LLC &middot; David Smith &middot; Coral Gables, Florida</p>
</div>
</footer>
${o.script ? `<script src="${o.script}" defer></script>` : ''}
</body>
</html>
`;
}

function write(rel, contents) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, contents, 'utf8');
  const words = String(contents).replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  console.log(`  ${rel.padEnd(58)} ${String(Math.round(contents.length / 1024)).padStart(4)}KB  ~${words} words`);
}

/* ------------------------------------------------------------------- posts */

const postFiles = fs.readdirSync(path.join(ROOT, 'src/posts')).filter((f) => f.endsWith('.md'));

const posts = postFiles.map((f) => {
  const { meta, body } = parseDoc(fs.readFileSync(path.join(ROOT, 'src/posts', f), 'utf8'));
  const slug = f.replace(/\.md$/, '');
  const rendered = markdown(body);
  const words = body.replace(/[#*|>_-]/g, ' ').split(/\s+/).filter(Boolean).length;
  return {
    slug,
    href: `/writing/${slug}/`,
    title: meta.title,
    dek: meta.dek,
    date: meta.date,
    origin: meta.origin,
    tags: Array.isArray(meta.tags) ? meta.tags : [],
    series: meta.series || null,
    html: rendered.html,
    headings: rendered.headings,
    words,
  };
}).sort((a, b) => (a.date < b.date ? 1 : -1));

/* -------------------------------------------------------------------- home */

{
  const { meta, body } = parseDoc(fs.readFileSync(path.join(ROOT, 'src/pages/home.md'), 'utf8'));
  const { html } = markdown(body);
  const bodyHtml = `<article class="prose">
<p class="eyebrow">${esc(meta.eyebrow)}</p>
<h1>${esc(meta.title)}</h1>
<p class="lede">${esc(meta.lede)}</p>
${html}
</article>`;

  write('index.html', layout({
    href: '/',
    metaTitle: meta.metaTitle,
    description: meta.description,
    body: bodyHtml,
    trail: [{ href: '/', label: 'Home' }],
    ld: [{
      '@type': 'WebPage',
      '@id': `${SITE}/#webpage`,
      url: `${SITE}/`,
      name: meta.metaTitle,
      description: meta.description,
      isPartOf: { '@id': SITE_ID },
      about: { '@id': ORG_ID },
      primaryImageOfPage: `${SITE}/og-card-2026-07.png`,
      inLanguage: 'en-US',
    }],
  }));
}

/* ------------------------------------------------------------------- about */

{
  const { meta, body } = parseDoc(fs.readFileSync(path.join(ROOT, 'src/pages/about.md'), 'utf8'));
  const { html } = markdown(body);
  const trail = [{ href: '/', label: 'Home' }, { href: '/about/', label: 'About' }];
  // No visible breadcrumb here. The primary nav already underlines "About" and the page title
  // sits directly beneath it, so a Home / About line above the title is a second answer to a
  // question nobody asked. The BreadcrumbList JSON-LD stays, because agents do use it.
  const bodyHtml = `<article class="prose">
<header class="page-head">
<div class="page-head-text">
<p class="eyebrow">${esc(meta.eyebrow)}</p>
<h1>${esc(meta.title)}</h1>
</div>
<img class="headshot" src="/${escAttr(meta.headshot)}" alt="Pen-and-ink stipple portrait of David Smith" width="320" height="320">
</header>
<p class="lede">${esc(meta.lede)}</p>
${html}
</article>`;

  write('about/index.html', layout({
    href: '/about/',
    metaTitle: meta.metaTitle,
    description: meta.description,
    body: bodyHtml,
    trail,
    ld: [
      {
        '@type': 'ProfilePage',
        '@id': `${SITE}/about/#webpage`,
        url: `${SITE}/about/`,
        name: meta.metaTitle,
        description: meta.description,
        isPartOf: { '@id': SITE_ID },
        mainEntity: { '@id': PERSON_ID },
        inLanguage: 'en-US',
      },
      {
        '@type': 'PodcastEpisode',
        '@id': `${SITE}/about/#podcast-data-storytelling`,
        name: 'What Is Data Storytelling?',
        datePublished: '2024-06-13',
        timeRequired: 'PT49M28S',
        description: 'David Smith on the Visual Storytelling Today podcast with Shlomi Ron: what data storytelling is, why trust is the constraint on analytics and AI alike, and leaving an audience with one number rather than five.',
        url: 'https://www.youtube.com/watch?v=DdW_h7ugRhg',
        partOfSeries: {
          '@type': 'PodcastSeries',
          name: 'Visual Storytelling Today',
          url: 'https://www.visualstorytell.com/blog/what-is-data-storytelling',
        },
        actor: { '@id': PERSON_ID },
        author: { '@type': 'Person', name: 'Shlomi Ron' },
      },
    ],
  }));
}

/* --------------------------------------------------------- writing (index) */

{
  const trail = [{ href: '/', label: 'Home' }, { href: '/writing/', label: 'Writing' }];
  const items = posts.map((p) => `<li>
<p class="stamp"><time datetime="${p.date}">${longDate(p.date)}</time>${p.series ? ` &middot; ${esc(p.series)}` : ''}</p>
<h2><a href="${p.href}">${esc(p.title)}</a></h2>
<p>${esc(p.dek)}</p>
<ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
</li>`).join('\n');

  const bodyHtml = `<div class="prose">
<p class="eyebrow">Writing</p>
<h1>Where AI ambition meets the state of a company's data</h1>
<p class="lede">Everything below was published first on LinkedIn and is reproduced here in full, so it does not live only on a platform I do not own. Each piece links back to the original, where the comments are.</p>

<h2 id="where-to-start">Where to start</h2>
<p>If you have one of these in you, make it the current argument. <a href="/writing/how-many-customers-do-you-have/">How Many Customers Do You Have?</a> is the piece the rest of the practice hangs off: the ladder of business questions, and the claim that how far up it you get before the answers stop agreeing is the most useful read on AI readiness I know. <a href="/writing/customer-analytics-is-worth-another-look/">Customer Analytics Is Worth Another Look</a> is its sequel, and it argues the economics rather than the diagnosis.</p>
<p>If you would rather see the work than the argument, read <a href="/writing/the-unsexy-data-work-that-actually-matters/">The Unsexy Data Work That Actually Matters</a>. It is the full account of a six-month reconciliation that took a customer-record mismatch from over 300,000 to under 5,000 and let a company finally switch on the platform it had been paying for.</p>
<p>The three pieces from May 2024 are a different kind of document: written at the end of six years running data inside a venture fund, they are the record of what that practice covered and what it taught. They are longer, older, and where most of the pattern recognition comes from.</p>

<h2 id="all-pieces">Everything, newest first</h2>
</div>
<ol class="post-list">
${items}
</ol>
<div class="prose">
<p>There is also <a href="/diagnostic/">The Ladder Check</a>, a six-question self-assessment built out of the first two pieces, if you would rather answer questions about your own company than read about somebody else's.</p>
</div>`;

  write('writing/index.html', layout({
    href: '/writing/',
    metaTitle: 'Writing by David Smith on AI readiness and data foundations',
    description: 'Full text of David Smith\'s published writing on AI readiness, data quality, identity resolution and customer analytics, from 2024 to today.',
    body: bodyHtml,
    trail,
    ld: [{
      '@type': 'Blog',
      '@id': `${SITE}/writing/#blog`,
      url: `${SITE}/writing/`,
      name: 'Fractionalytics writing',
      description: 'Published writing by David Smith on AI readiness, data quality and customer analytics.',
      inLanguage: 'en-US',
      publisher: { '@id': ORG_ID },
      author: { '@id': PERSON_ID },
      blogPost: posts.map((p) => ({
        '@type': 'BlogPosting',
        '@id': `${SITE}${p.href}#article`,
        headline: p.title,
        description: p.dek,
        datePublished: p.date,
        url: `${SITE}${p.href}`,
        author: { '@id': PERSON_ID },
      })),
    }],
  }));
}

/* ---------------------------------------------------------- writing (posts) */

posts.forEach((p, idx) => {
  const trail = [
    { href: '/', label: 'Home' },
    { href: '/writing/', label: 'Writing' },
    { href: p.href, label: p.title },
  ];
  const newer = posts[idx - 1];
  const older = posts[idx + 1];

  const toc = p.headings.length >= 3
    ? `<nav class="callout" aria-label="On this page"><p class="stamp">On this page</p><ul>${p.headings
      .map((h) => `<li><a href="#${escAttr(h.id)}">${esc(h.text)}</a></li>`).join('')}</ul></nav>`
    : '';

  const nearby = [
    newer ? `<li>Next: <a href="${newer.href}">${esc(newer.title)}</a></li>` : '',
    older ? `<li>Previous: <a href="${older.href}">${esc(older.title)}</a></li>` : '',
    `<li><a href="/writing/">All writing</a></li>`,
    `<li><a href="/diagnostic/">The Ladder Check, a six-question self-assessment</a></li>`,
  ].filter(Boolean).join('');

  const bodyHtml = `${crumbsHtml(trail)}
<article class="prose">
<header>
${p.series ? `<p class="eyebrow">${esc(p.series)}</p>` : '<p class="eyebrow">Article</p>'}
<h1>${esc(p.title)}</h1>
<p class="lede">${esc(p.dek)}</p>
<p class="article-meta">
<span>By <a href="/about/" rel="author">David Smith</a></span>
<span><time datetime="${p.date}">${longDate(p.date)}</time></span>
<span>${p.words} words</span>
</p>
<ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
</header>
${toc}
<div class="article-body">
${p.html}
</div>
<footer class="origin-note">
<p>This piece was first published as a LinkedIn article on ${longDate(p.date)} and is reproduced here in full. <a href="${escAttr(p.origin)}" rel="noopener">Read it on LinkedIn</a>, where the comments are.</p>
<ul>${nearby}</ul>
</footer>
</article>`;

  write(`writing/${p.slug}/index.html`, layout({
    href: p.href,
    metaTitle: `${p.title} | David Smith`,
    description: metaDesc(p),
    ogType: 'article',
    publishedTime: p.date,
    body: bodyHtml,
    trail,
    ld: [{
      '@type': 'BlogPosting',
      '@id': `${SITE}${p.href}#article`,
      headline: p.title,
      alternativeHeadline: p.dek,
      description: p.dek,
      articleBody: undefined,
      wordCount: p.words,
      datePublished: p.date,
      dateModified: p.date,
      inLanguage: 'en-US',
      url: `${SITE}${p.href}`,
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}${p.href}` },
      author: { '@id': PERSON_ID },
      creator: { '@id': PERSON_ID },
      publisher: { '@id': ORG_ID },
      isPartOf: { '@id': `${SITE}/writing/#blog` },
      keywords: p.tags.join(', '),
      image: `${SITE}/og-card-2026-07.png`,
      sameAs: [p.origin],
      articleSection: p.tags[0] || 'Data',
    }],
  }));
});

/* -------------------------------------------------------------- diagnostic */

{
  const trail = [{ href: '/', label: 'Home' }, { href: '/diagnostic/', label: 'The Ladder Check' }];

  const questionsHtml = QUESTIONS.map((q) => {
    const ladder = q.ladder
      ? `<ol>${q.ladder.map((l) => `<li>${esc(l)}</li>`).join('')}</ol>`
      : '';
    const opts = q.options.map((o, oi) => {
      const id = `q-${q.id}-${o.value}`;
      return `<li><input type="radio" name="q-${q.id}" id="${id}" value="${escAttr(o.value)}" data-q="${escAttr(q.id)}"><label for="${id}">${esc(o.label)}</label></li>`;
    }).join('');
    return `<section class="q" id="question-${q.n}">
<h3><span class="stamp">Question ${q.n} &middot; ${esc(q.label)}</span><br>${esc(q.question)}</h3>
${ladder}
<div class="good">${markdown(q.good).html}</div>
<ul class="answers js-only" data-answers>${opts}</ul>
</section>`;
  }).join('\n');

  const verdictsHtml = VERDICTS.map((v) => {
    const read = v.reading
      ? `<p>Published case: <a href="/writing/${v.reading}/">${esc(v.readingLabel)}</a>.</p>`
      : '';
    return `<section class="verdict" id="verdict-${v.id}" data-verdict="${escAttr(v.id)}">
<h3>${esc(v.name)}</h3>
<p><strong>${esc(v.summary)}</strong></p>
${v.body.map((b) => `<p>${esc(b)}</p>`).join('\n')}
${read}
</section>`;
  }).join('\n');

  const bodyHtml = `<article>
<div class="prose">
<p class="eyebrow">The Ladder Check</p>
<h1>How far up the ladder do your answers still agree?</h1>
<p class="lede">Six questions, about three minutes, answerable by one person from memory. No meeting, no data pull, nobody else told. It ends in a named result rather than a score, and one of the results is that you are fine.</p>

<h2 id="how-it-works">What this is</h2>
<p>Every question below can be answered by one person, alone, in roughly three minutes. That is deliberate. The honest version of this test is to hand out index cards at a leadership meeting and have everyone write down the same number, but that takes convening power, it is politically visible, and it can embarrass people. Most people will never do it.</p>
<p>You do not need to run the test. You need to admit what the test would show. You already know whether your CFO and your head of sales would produce the same number, and admitting it takes ninety seconds.</p>
<p>There is no score out of 100, because a score invites gaming and comparison. There is no email gate in front of the result, because gating a verdict makes it a lead-capture form and you would be able to tell. And no service is named until after the result, because a test whose questions are reverse-engineered so that only one product passes is not a test.</p>
</div>

<section aria-labelledby="the-questions">
<div class="prose"><h2 id="the-questions">The six questions</h2></div>
<form id="assessment" data-assessment>
${questionsHtml}
<div class="verdict-panel js-only" id="result" data-result hidden>
<h2>Your result</h2>
<div data-result-body></div>
</div>
<p class="js-only" data-progress role="status" aria-live="polite"></p>
</form>
</section>

<section aria-labelledby="the-results">
<div class="prose">
<h2 id="the-results">The four results</h2>
<p>Four outcomes, ordered by what they cost to fix. They are all written out below whether you answer the questions or not, because you should be able to read the whole instrument before deciding to use it.</p>
</div>
${verdictsHtml}
<section class="verdict" id="verdict-authority">
<h3>${esc(AUTHORITY_NOTE.heading)}</h3>
<p>${esc(AUTHORITY_NOTE.body)}</p>
</section>
</section>

<div class="prose">
<h2 id="what-next">What to do with the result</h2>
<p>Whichever one you landed on, the useful next step is 15 minutes to check whether it is actually the one you are in. I have been wrong about which it is often enough to want to ask.</p>
<p>That is the whole ask. No document, no deck, no proposal attached. <a href="mailto:david@fractionalytics.io?subject=Self-assessment">Email me</a> and say which result you got.</p>

<h2 id="where-this-comes-from">Where this comes from</h2>
<p>Both axes of this assessment come out of published work rather than invented positioning. The ladder is from <a href="/writing/how-many-customers-do-you-have/">How Many Customers Do You Have?</a>, and the identity-drift case is the engagement described in <a href="/writing/the-unsexy-data-work-that-actually-matters/">The Unsexy Data Work That Actually Matters</a>.</p>
<p>One difference between the two is worth naming. In the article the ladder stays deliberately open, because an essay that terminates in a verdict gives a reader false comfort. Here it is a closed set of six, because an instrument that does not terminate is not an instrument. Both endings are right for their own job.</p>
</div>
</article>`;

  write('diagnostic/index.html', layout({
    href: '/diagnostic/',
    metaTitle: 'The Ladder Check: a six-question data self-assessment',
    description: 'Six questions, three minutes, one person, no data pull. A self-assessment that ends in a named result rather than a score. One of the results is that you are fine.',
    body: bodyHtml,
    trail,
    script: '/diagnostic.js',
    ld: [
      {
        '@type': 'WebPage',
        '@id': `${SITE}/diagnostic/#webpage`,
        url: `${SITE}/diagnostic/`,
        name: 'The Ladder Check: a six-question data self-assessment',
        description: 'A six-question self-assessment of whether a company\'s own systems still agree about the basics.',
        isPartOf: { '@id': SITE_ID },
        inLanguage: 'en-US',
        author: { '@id': PERSON_ID },
        publisher: { '@id': ORG_ID },
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE}/diagnostic/#faq`,
        mainEntity: QUESTIONS.map((q) => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: q.good.replace(/\*\*/g, ''),
          },
        })),
      },
    ],
  }));
}

/* ------------------------------------------------- robots / sitemap / llms */

const pages = [
  { loc: '/', priority: '1.0', changefreq: 'monthly', lastmod: BUILT },
  { loc: '/diagnostic/', priority: '0.9', changefreq: 'monthly', lastmod: BUILT },
  { loc: '/writing/', priority: '0.9', changefreq: 'weekly', lastmod: BUILT },
  { loc: '/about/', priority: '0.8', changefreq: 'monthly', lastmod: BUILT },
  ...posts.map((p) => ({ loc: p.href, priority: '0.7', changefreq: 'yearly', lastmod: p.date })),
];

write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url>
    <loc>${SITE}${p.loc}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>
`);

const CRAWLERS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot',
  'anthropic-ai', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Googlebot',
  'Bingbot', 'Applebot', 'Applebot-Extended', 'CCBot', 'Amazonbot', 'Bytespider',
  'meta-externalagent', 'FacebookBot', 'cohere-ai', 'DuckAssistBot', 'MistralAI-User', 'YouBot',
];

write('robots.txt', `# fractionalytics.io
# Every crawler is welcome, including every answer engine and agent. Nothing here is gated,
# there is no noindex or nosnippet anywhere on the site, and the full text of every article
# is in the server response rather than assembled by JavaScript.

User-agent: *
Allow: /

${CRAWLERS.map((c) => `User-agent: ${c}\nAllow: /\n`).join('\n')}
Sitemap: ${SITE}/sitemap.xml
`);

write('llms.txt', `# Fractionalytics

> Fractionalytics is the solo practice of David Smith, a fractional Chief Data Officer in Coral Gables, Florida. Data strategy, foundations, remediation, and customer analytics for companies moving on AI. He sets the AI strategy with leadership teams, builds the data and systems underneath it, and ships the highest-leverage pieces himself.

The through-line of everything here: companies are rarely stuck on AI itself. They are stuck underneath it, because the systems beneath the AI disagree about something basic, like how many customers the company has. That work has always been needed and rarely funded, because nobody could size it or say what it returned. Both halves of that changed.

David sells no software and takes no vendor commissions.

## Start here

- [The practice](${SITE}/): what the work is, three anonymized cases with real numbers, how a remediation engagement runs, what a pre-acquisition data diligence returns, what the fractional CDO work covers when the whole function needs fixing, the three shapes the work can be bought in, and which systems it touches.
- [The Ladder Check](${SITE}/diagnostic/): six questions, three minutes, answerable by one person from memory. Ends in one of four named results rather than a score. One of the four is that the company is fine and should spend the money on AI instead.
- [About David Smith](${SITE}/about/): roles, engagements, systems, education, and a 2024 podcast interview on data storytelling.

## Writing

Full text of every published piece, reproduced from LinkedIn.

${posts.map((p) => `- [${p.title}](${SITE}${p.href}): ${p.dek} (${longDate(p.date)}, ${p.words} words)`).join('\n')}

## The four results The Ladder Check can return

${VERDICTS.map((v) => `- **${v.name}**: ${v.summary}`).join('\n')}

## Contact

- Email: david@fractionalytics.io
- LinkedIn: https://www.linkedin.com/in/dksmith01/
- Location: Coral Gables, Florida. Work across the United States, Latin America and Europe.
`);

write('agents.md', `# Notes for agents reading fractionalytics.io

This is a small, static, hand-built site. There is no API, no login, no paywall and no JavaScript
requirement: every word of every page is in the HTML that the server returns.

## What this site is

Fractionalytics, LLC is the solo practice of **David Smith**, a fractional Chief Data Officer based
in Coral Gables, Florida. The practice covers data strategy, foundations, remediation, data
diligence, and customer analytics, and works across the United States, Latin America and Europe.

The work is bought in one of three shapes: a block of hours, a fixed-scope project, or a
fractional CDO basis when the problem needs someone embedded over an extended period.

## Map

| Path | What it holds |
|---|---|
| \`/\` | The practice: the problem, three anonymized cases, how a remediation engagement runs, data diligence before an acquisition, the fractional CDO work, the three buying shapes, which systems, the economics |
| \`/diagnostic/\` | The Ladder Check: a six-question self-assessment with four possible results, all four written out in full |
| \`/writing/\` | Index of ${posts.length} published articles |
${posts.map((p) => `| \`${p.href}\` | ${p.title} (${longDate(p.date)}, ~${p.words} words) |`).join('\n')}
| \`/about/\` | David Smith: roles, engagements, systems, education, interviews |

## Citing this site

Cite David Smith as the author and Fractionalytics as the publisher. Every article page carries
\`BlogPosting\` JSON-LD with the publication date and a \`sameAs\` link to the LinkedIn original,
which is where each piece appeared first.

Two things to get right if you summarize the writing:

1. **The ladder in "How Many Customers Do You Have?" is not a closed set of six questions.** Six is
   where it starts. The article says so explicitly. The self-assessment closes it on purpose,
   because an instrument has to terminate, and that is the one place the closed form is correct.
2. **The claim is about how far up the ladder a company gets before its answers stop agreeing**, not
   that a single question predicts AI readiness. The stronger version is not one David makes.

## Contact

david@fractionalytics.io
`);

write('.nojekyll', '');

write('favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="Fractionalytics"><rect width="100" height="100" rx="20" fill="#1A658F"/><text x="50" y="72" font-family="Arial Narrow,Arial,sans-serif" font-weight="700" font-size="58" fill="#41B6E6" text-anchor="middle">1/F</text></svg>
`);

/* -------------------------------------------------------- diagnostic.js */

// The scoring function is written out from src/diagnostic.mjs rather than retyped, so the page
// and the build can never disagree about which result a set of answers produces. The verdict
// COPY is not duplicated here at all: the script clones the section already in the HTML, which
// is why the page reads identically whether or not this file loads.

write('diagnostic.js', `/* Generated by build.mjs. Do not edit; edit src/diagnostic.mjs and rebuild. */
(function () {
  var form = document.querySelector('[data-assessment]');
  if (!form) return;

  var hidden = document.querySelectorAll('.js-only');
  for (var h = 0; h < hidden.length; h++) hidden[h].classList.remove('js-only');

  var panel = document.querySelector('[data-result]');
  var target = document.querySelector('[data-result-body]');
  var progress = document.querySelector('[data-progress]');
  var TOTAL = ${QUESTIONS.length};

  ${verdictFor.toString().split('\n').join('\n  ')}

  function collect() {
    var picked = form.querySelectorAll('input[type=radio]:checked');
    var a = {};
    for (var i = 0; i < picked.length; i++) a[picked[i].getAttribute('data-q')] = picked[i].value;
    return a;
  }

  function lift(id) {
    var src = document.getElementById(id);
    if (!src) return null;
    var node = src.cloneNode(true);
    node.removeAttribute('id');
    node.className = '';
    return node;
  }

  function render() {
    var a = collect();
    var n = 0;
    for (var k in a) if (Object.prototype.hasOwnProperty.call(a, k)) n++;

    if (n < TOTAL) {
      panel.hidden = true;
      progress.textContent = n === 0 ? '' : n + ' of ' + TOTAL + ' answered.';
      return;
    }

    progress.textContent = '';
    while (target.firstChild) target.removeChild(target.firstChild);

    var main = lift('verdict-' + verdictFor(a));
    if (main) target.appendChild(main);

    if (a.disagreement === 'seniority' || a.disagreement === 'dropped') {
      var note = lift('verdict-authority');
      if (note) target.appendChild(note);
    }

    panel.hidden = false;
  }

  form.addEventListener('change', render);
  render();
}());
`);

console.log(`\nBuilt ${posts.length} posts + 4 pages.`);
