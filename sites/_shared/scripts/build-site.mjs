import { copyFile, mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const siteDir = process.argv[2];
if (!siteDir) {
  console.error('Usage: node sites/_shared/scripts/build-site.mjs <site-dir>');
  process.exit(1);
}

const root = resolve(siteDir);
const shared = resolve('sites/_shared');
const dist = join(root, 'dist');
const routes = [];

const { site } = await import(pathToFileURL(join(root, 'site.config.mjs')));
const { home } = await import(pathToFileURL(join(root, 'data/home.mjs')));
const { tools } = await import(pathToFileURL(join(root, 'data/tools.mjs')));
const { pages } = await import(pathToFileURL(join(root, 'data/pages.mjs')));
const toolBySlug = Object.fromEntries(tools.map((tool) => [tool.slug, tool]));

const esc = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');
const absUrl = (path) => `${site.baseUrl}${path === '/' ? '/' : path}`;
const pathForTool = (slug) => `/${slug}/`;

function schemaTag(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
}

function nav() {
  const links = [
    { label: 'Tools', href: '/tools/' },
    { label: 'About', href: '/about/' },
    { label: 'Contact', href: '/contact/' },
    { label: 'Privacy', href: '/privacy-policy/' }
  ];
  return `<header class="site-header"><nav class="navbar" aria-label="Main navigation"><a class="logo" href="/"><span class="logo-mark">${esc(site.logoLetter)}</span><span>${esc(site.name)}</span></a><div class="nav-links">${links.map((link) => `<a href="${link.href}">${esc(link.label)}</a>`).join('')}</div></nav></header>`;
}

function footer() {
  const popular = tools.slice(0, 5).map((tool) => `<a href="/${tool.slug}/">${esc(tool.name)}</a>`).join('');
  const compliance = pages.map((page) => `<a href="/${page.slug}/">${esc(page.name)}</a>`).join('');
  return `<footer class="site-footer"><div class="container footer-grid"><div><a class="logo" href="/"><span class="logo-mark">${esc(site.logoLetter)}</span><span>${esc(site.name)}</span></a><p>${esc(site.slogan)}</p><p class="small">${esc(site.disclaimer)}</p></div><div><h3>Popular tools</h3>${popular}</div><div><h3>Site pages</h3><a href="/tools/">All tools</a>${compliance}</div><div><h3>About this site</h3><p>Free browser-based tools. No account, database, or paid API is required.</p><p>Contact: ${esc(site.contactEmail)}</p></div></div></footer>`;
}

function layout({ path, title, description, body, schemas = [] }) {
  const theme = `:root{--primary:${site.theme.primary};--primary-dark:${site.theme.primaryDark};--accent:${site.theme.accent};--surface-2:${site.theme.surface2};}`;
  const schemaHtml = schemas.map(schemaTag).join('\n');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${absUrl(path)}"><meta property="og:type" content="website"><meta property="og:site_name" content="${esc(site.name)}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${absUrl(path)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><link rel="stylesheet" href="/assets/css/styles.css"><style>${theme}</style>${schemaHtml}</head><body>${nav()}${body}${footer()}<script src="/assets/js/runtime.js" defer></script><script src="/assets/js/site-tools.js" defer></script></body></html>`;
}

function breadcrumb(items) {
  const html = `<div class="breadcrumb">${items.map((item, index) => index === items.length - 1 ? esc(item.label) : `<a href="${item.href}">${esc(item.label)}</a>`).join(' / ')}</div>`;
  const schema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.label, item: absUrl(item.href) })) };
  return { html, schema };
}

function adSlot(position, format = 'responsive') {
  return `<div class="ad-slot ${position === 'sidebar' ? 'sidebar' : ''}" data-ad-position="${esc(position)}" data-ad-format="${esc(format)}">Advertisement</div>`;
}

function faqSection(faq) {
  return `<section class="faq"><h2>FAQ</h2>${faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</section>`;
}

function faqSchema(faq) {
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
}

function formField(field) {
  const attrs = [`id="${esc(field.id)}"`, field.required ? 'required' : '', field.min !== undefined ? `min="${esc(field.min)}"` : '', field.max !== undefined ? `max="${esc(field.max)}"` : '', field.step !== undefined ? `step="${esc(field.step)}"` : '', field.value !== undefined ? `value="${esc(field.value)}"` : '', field.placeholder ? `placeholder="${esc(field.placeholder)}"` : ''].filter(Boolean).join(' ');
  if (field.type === 'select') return `<label>${esc(field.label)}<select ${attrs}>${field.options.map((option) => `<option value="${esc(option.value ?? option)}">${esc(option.label ?? option)}</option>`).join('')}</select></label>`;
  if (field.type === 'textarea') return `<label class="full">${esc(field.label)}<textarea ${attrs}>${esc(field.value || '')}</textarea></label>`;
  if (field.type === 'checkbox') return `<label class="check-row"><input id="${esc(field.id)}" type="checkbox" ${field.checked ? 'checked' : ''}> ${esc(field.label)}</label>`;
  return `<label>${esc(field.label)}<input type="${esc(field.type || 'text')}" ${attrs}></label>`;
}

function renderTool(tool) {
  const path = pathForTool(tool.slug);
  const bc = breadcrumb([{ label: 'Home', href: '/' }, { label: 'Tools', href: '/tools/' }, { label: tool.name, href: path }]);
  const related = tool.related.map((slug) => `<a href="${pathForTool(slug)}">${esc(toolBySlug[slug]?.name || slug)}</a>`).join('');
  const examples = tool.examples.map((example) => `<div><h3>${esc(example.title)}</h3><p>${esc(example.text)}</p></div>`).join('');
  const useCases = tool.useCases.map((item) => `<li>${esc(item)}</li>`).join('');
  const table = tool.table ? `<section><h2>Common conversion table</h2><div class="conversion-table-wrap"><table class="conversion-table"><thead><tr>${tool.table.headers.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${tool.table.rows.map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></section>` : '';
  const body = `<main class="page-main"><div class="container">${bc.html}<p class="eyebrow">${esc(tool.category)}</p><h1>${esc(tool.name)}</h1><p class="lede">${esc(tool.intro)}</p>${adSlot('top', 'leaderboard')}<div class="tool-layout"><section class="tool-card" data-tool="${esc(tool.id)}"><h2>Free ${esc(tool.name)}</h2><p class="small">This calculator runs in your browser and does not upload your input.</p><div class="form-grid">${tool.fields.map(formField).join('')}</div><div class="actions"><button data-calculate="${esc(tool.id)}">Calculate</button><button class="secondary" data-reset-tool>Reset</button></div></section><aside class="result-card"><h2>Results</h2><div id="result" class="output"><p class="small">Enter values and calculate to see results here.</p></div>${adSlot('sidebar', 'rectangle')}</aside></div>${adSlot('after-tool', 'responsive')}<article class="content"><section><h2>What this result means</h2><p>${esc(tool.resultExplanation)}</p></section><section><h2>Formula</h2><div class="formula-box"><code>${esc(tool.formula)}</code></div></section><section><h2>Examples</h2><div class="example-list">${examples}</div></section>${table}<section><h2>Common use cases</h2><ul class="use-case-grid">${useCases}</ul></section><section><h2>Related tools</h2><div class="related">${related}</div></section>${tool.disclaimer ? `<section><h2>Disclaimer</h2><p>${esc(tool.disclaimer)}</p></section>` : ''}${adSlot('before-faq', 'in-article')}${faqSection(tool.faq)}</article></div></main>`;
  const software = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: tool.name, applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any', url: absUrl(path), offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } };
  const webPage = { '@context': 'https://schema.org', '@type': 'WebPage', name: tool.name, url: absUrl(path), description: tool.description };
  return layout({ path, title: tool.title, description: tool.description, body, schemas: [bc.schema, webPage, software, faqSchema(tool.faq)] });
}

function card(item) {
  return `<a class="card" href="${item.href || `/${item.slug}/`}"><span class="tag">${esc(item.category || 'Free tool')}</span><h3>${esc(item.name)}</h3><p>${esc(item.description || item.intro)}</p></a>`;
}

function renderHome() {
  const body = `<main><section class="hero"><div class="container hero-grid"><div><p class="eyebrow">${esc(home.eyebrow)}</p><h1>${esc(home.h1)}</h1><p class="lede">${esc(home.intro)}</p><div class="cta-row"><a class="button" href="/tools/">Browse Tools</a><a class="button secondary" href="/about/">About ${esc(site.name)}</a></div></div><div class="hero-card"><h2>${esc(home.cardTitle)}</h2><ul>${home.cardItems.map((item) => `<li>${esc(item)}</li>`).join('')}</ul></div></div></section>${home.sections.map((section) => `<section class="section"><div class="container"><h2>${esc(section.title)}</h2><p class="lede">${esc(section.text)}</p><div class="grid">${section.tools.map((slug) => card(toolBySlug[slug])).join('')}</div></div></section>`).join('')}<section class="section"><div class="container"><div class="warning">${esc(site.disclaimer)}</div></div></section></main>`;
  return layout({ path: '/', title: home.title, description: home.description, body });
}

function renderToolsIndex() {
  const bc = breadcrumb([{ label: 'Home', href: '/' }, { label: 'Tools', href: '/tools/' }]);
  const body = `<main class="page-main"><div class="container">${bc.html}<h1>${esc(site.toolsIndex.h1)}</h1><p class="lede">${esc(site.toolsIndex.intro)}</p><div class="grid">${tools.map(card).join('')}</div></div></main>`;
  return layout({ path: '/tools/', title: site.toolsIndex.title, description: site.toolsIndex.description, body, schemas: [bc.schema] });
}

function renderPage(page) {
  const path = `/${page.slug}/`;
  const bc = breadcrumb([{ label: 'Home', href: '/' }, { label: page.name, href: path }]);
  const body = `<main class="page-main"><div class="container">${bc.html}<h1>${esc(page.name)}</h1><article class="content">${page.body.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}</article></div></main>`;
  return layout({ path, title: page.title, description: page.description, body, schemas: [bc.schema] });
}

function render404() {
  return layout({ path: '/404.html', title: `Page Not Found | ${site.name}`, description: `The requested page could not be found on ${site.name}.`, body: `<main class="page-main"><div class="container"><h1>Page not found</h1><p class="lede">Browse the free tools instead.</p><a class="button" href="/tools/">Browse Tools</a></div></main>` });
}

async function writeRoute(path, html) {
  routes.push(path);
  const file = path === '/' ? join(dist, 'index.html') : path.endsWith('.html') ? join(dist, path) : join(dist, path, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html, 'utf8');
}

function sitemap() {
  const urls = routes.filter((path) => path !== '/404.html').map((path) => `  <url><loc>${absUrl(path)}</loc></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, 'assets/css'), { recursive: true });
await mkdir(join(dist, 'assets/js'), { recursive: true });
await copyFile(join(shared, 'assets/css/styles.css'), join(dist, 'assets/css/styles.css'));
await copyFile(join(shared, 'assets/js/runtime.js'), join(dist, 'assets/js/runtime.js'));
await copyFile(join(root, site.siteScript), join(dist, 'assets/js/site-tools.js'));

await writeRoute('/', renderHome());
await writeRoute('/tools/', renderToolsIndex());
for (const tool of tools) await writeRoute(pathForTool(tool.slug), renderTool(tool));
for (const page of pages) await writeRoute(`/${page.slug}/`, renderPage(page));
await writeRoute('/404.html', render404());
await writeFile(join(dist, 'sitemap.xml'), sitemap(), 'utf8');
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.baseUrl}/sitemap.xml\n`, 'utf8');

console.log(`Built ${routes.length} pages into ${dist}/`);
