import { readFile, readdir, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { tools } from '../src/data/tools.mjs';
import { guides } from '../src/data/guides.mjs';
import { templates } from '../src/data/templates.mjs';
import { pages } from '../src/data/pages.mjs';

const dist = 'dist';
const expectedRoutes = [
  '/',
  '/tools/',
  ...tools.map((tool) => `/tools/${tool.slug}/`),
  '/guides/',
  ...guides.map((guide) => `/guides/${guide.slug}/`),
  '/templates/',
  ...templates.map((template) => `/templates/${template.slug}/`),
  ...pages.map((page) => `/${page.slug}/`),
  '/404.html'
];

const errors = [];
const htmlFiles = [];

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir) {
  for (const entry of await readdir(dir)) {
    const path = join(dir, entry);
    const info = await stat(path);
    if (info.isDirectory()) await walk(path);
    else if (extname(path) === '.html') htmlFiles.push(path);
  }
}

function routeFile(route) {
  if (route === '/') return join(dist, 'index.html');
  if (route.endsWith('.html')) return join(dist, route);
  return join(dist, route, 'index.html');
}

for (const route of expectedRoutes) {
  if (!(await exists(routeFile(route)))) errors.push(`Missing route: ${route}`);
}
if (!(await exists(join(dist, 'sitemap.xml')))) errors.push('Missing sitemap.xml');
if (!(await exists(join(dist, 'robots.txt')))) errors.push('Missing robots.txt');

await walk(dist);

const seenTitles = new Map();
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const route = file.replace(/^dist/, '').replace(/\/index\.html$/, '/').replace(/\/404\.html$/, '/404.html') || '/';
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="(.*?)">/)?.[1];
  if (!title) errors.push(`${file}: missing title`);
  if (!description || description.length < 40) errors.push(`${file}: missing/short meta description`);
  if (!html.includes('rel="canonical"')) errors.push(`${file}: missing canonical`);
  if (!html.includes('property="og:title"')) errors.push(`${file}: missing Open Graph tags`);
  if (!html.includes('name="twitter:card"')) errors.push(`${file}: missing Twitter card`);
  if (!html.includes('<h1')) errors.push(`${file}: missing h1`);
  if (title) {
    if (seenTitles.has(title)) errors.push(`${file}: duplicate title also in ${seenTitles.get(title)}`);
    seenTitles.set(title, file);
  }
  const links = [...html.matchAll(/href="(\/[^"#?]*)/g)].map((match) => match[1]);
  for (const link of links) {
    if (link.startsWith('/assets/')) continue;
    const normalized = link.endsWith('/') || link.endsWith('.html') ? link : `${link}/`;
    if (!expectedRoutes.includes(normalized) && !['/sitemap.xml', '/robots.txt'].includes(normalized)) {
      errors.push(`${file}: broken internal link ${link}`);
    }
  }
}

const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
for (const route of expectedRoutes.filter((route) => route !== '/404.html')) {
  if (!sitemap.includes(route === '/' ? 'https://applaunchtoolkit.com/' : `https://applaunchtoolkit.com${route}`)) {
    errors.push(`sitemap missing ${route}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Site check passed: ${expectedRoutes.length} expected routes, ${htmlFiles.length} HTML files.`);
