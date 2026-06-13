import { readFile, readdir, stat } from 'node:fs/promises';
import { join, resolve, extname } from 'node:path';
import { pathToFileURL } from 'node:url';

const siteDir = process.argv[2];
if (!siteDir) {
  console.error('Usage: node sites/_shared/scripts/check-site.mjs <site-dir>');
  process.exit(1);
}

const root = resolve(siteDir);
const dist = join(root, 'dist');
const { site } = await import(pathToFileURL(join(root, 'site.config.mjs')));
const { tools } = await import(pathToFileURL(join(root, 'data/tools.mjs')));
const { pages } = await import(pathToFileURL(join(root, 'data/pages.mjs')));
const expectedRoutes = ['/', '/tools/', ...tools.map((tool) => `/${tool.slug}/`), ...pages.map((page) => `/${page.slug}/`), '/404.html'];
const compliance = ['/about/', '/contact/', '/privacy-policy/', '/cookie-policy/', '/terms-of-use/', '/disclaimer/'];
const errors = [];
const htmlFiles = [];

async function exists(path) {
  try { await stat(path); return true; } catch { return false; }
}
function routeFile(route) {
  if (route === '/') return join(dist, 'index.html');
  if (route.endsWith('.html')) return join(dist, route);
  return join(dist, route, 'index.html');
}
async function walk(dir) {
  if (!(await exists(dir))) return;
  for (const entry of await readdir(dir)) {
    const path = join(dir, entry);
    const info = await stat(path);
    if (info.isDirectory()) await walk(path);
    else if (extname(path) === '.html') htmlFiles.push(path);
  }
}

for (const route of expectedRoutes) if (!(await exists(routeFile(route)))) errors.push(`Missing route: ${route}`);
for (const route of compliance) if (!expectedRoutes.includes(route)) errors.push(`Required compliance route missing from data: ${route}`);
if (!(await exists(join(dist, 'sitemap.xml')))) errors.push('Missing sitemap.xml');
if (!(await exists(join(dist, 'robots.txt')))) errors.push('Missing robots.txt');
await walk(dist);

const seenTitles = new Map();
const seenDescriptions = new Map();
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const route = file.replace(dist, '').replace(/\/index\.html$/, '/').replace(/\/404\.html$/, '/404.html') || '/';
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const desc = html.match(/<meta name="description" content="(.*?)">/)?.[1];
  if (!title) errors.push(`${file}: missing title`);
  else if (title.length < 10) errors.push(`${file}: short title`);
  else if (seenTitles.has(title)) errors.push(`${file}: duplicate title with ${seenTitles.get(title)}`);
  else seenTitles.set(title, file);
  if (!desc || desc.length < 40) errors.push(`${file}: missing/short meta description`);
  else if (seenDescriptions.has(desc)) errors.push(`${file}: duplicate meta description with ${seenDescriptions.get(desc)}`);
  else seenDescriptions.set(desc, file);
  for (const needle of ['rel="canonical"', 'property="og:title"', 'name="twitter:card"']) if (!html.includes(needle)) errors.push(`${file}: missing ${needle}`);
  const h1Count = (html.match(/<h1[\s>]/g) || []).length;
  if (h1Count !== 1) errors.push(`${file}: expected one h1, found ${h1Count}`);
  if (/TODO|Lorem ipsum|Insert Date|placeholder content/i.test(html)) errors.push(`${file}: contains placeholder/TODO content`);
  for (const link of [...html.matchAll(/href="(\/[^"#?]*)/g)].map((match) => match[1])) {
    if (link.startsWith('/assets/') || ['/sitemap.xml', '/robots.txt'].includes(link)) continue;
    const normalized = link.endsWith('/') || link.endsWith('.html') ? link : `${link}/`;
    if (!expectedRoutes.includes(normalized)) errors.push(`${file}: broken internal link ${link}`);
  }
  if (tools.some((tool) => route === `/${tool.slug}/`)) {
    for (const needle of ['FAQPage', 'SoftwareApplication', 'data-reset-tool', 'Copy Result', 'Formula', 'Related tools', 'Advertisement']) {
      if (!html.includes(needle)) errors.push(`${file}: tool page missing ${needle}`);
    }
    const relatedLinks = (html.match(/class="related"[\s\S]*?<\/div>/)?.[0].match(/<a /g) || []).length;
    if (relatedLinks < 5) errors.push(`${file}: expected at least 5 related links, found ${relatedLinks}`);
  }
}

const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8').catch(() => '');
const robots = await readFile(join(dist, 'robots.txt'), 'utf8').catch(() => '');
for (const route of expectedRoutes.filter((route) => route !== '/404.html')) {
  if (!sitemap.includes(route === '/' ? `${site.baseUrl}/` : `${site.baseUrl}${route}`)) errors.push(`sitemap missing ${route}`);
}
if (!robots.includes(`${site.baseUrl}/sitemap.xml`)) errors.push('robots missing correct sitemap URL');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`${site.name} check passed: ${expectedRoutes.length} expected routes, ${htmlFiles.length} HTML files.`);
