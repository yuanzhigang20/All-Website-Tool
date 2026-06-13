import { rm, mkdir, writeFile, copyFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { site, footerGroups } from '../src/data/site.mjs';
import { tools, toolBySlug } from '../src/data/tools.mjs';
import { guides } from '../src/data/guides.mjs';
import { templates } from '../src/data/templates.mjs';
import { pages } from '../src/data/pages.mjs';
import { screenshotSizes } from '../src/data/screenshot-sizes.mjs';

const dist = 'dist';
const routes = [];

const esc = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const json = (value) => esc(JSON.stringify(value));
const absUrl = (path) => `${site.baseUrl}${path === '/' ? '/' : path}`;
const routePath = (type, slug) => `/${type}/${slug}/`;

function pathForSlug(slug) {
  if (toolBySlug[slug]) return `/tools/${slug}/`;
  if (guides.some((item) => item.slug === slug)) return `/guides/${slug}/`;
  if (templates.some((item) => item.slug === slug)) return `/templates/${slug}/`;
  return '#';
}

function labelForSlug(slug) {
  return toolBySlug[slug]?.name || guides.find((item) => item.slug === slug)?.name || templates.find((item) => item.slug === slug)?.name || slug;
}

function nav() {
  return `<header class="site-header"><nav class="navbar" aria-label="Main navigation"><a class="logo" href="/"><span class="logo-mark">A</span><span>${esc(site.name)}</span></a><div class="nav-links">${site.nav.map((item) => `<a href="${item.href}">${esc(item.label)}</a>`).join('')}</div></nav></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="container footer-grid"><div><a class="logo" href="/"><span class="logo-mark">A</span><span>${esc(site.name)}</span></a><p>${esc(site.tagline)}</p><p class="small">${esc(site.disclaimer)}</p></div>${footerGroups.map((group) => `<div><h3>${esc(group.title)}</h3>${group.links.map((link) => `<a href="${link.href}">${esc(link.label)}</a>`).join('')}</div>`).join('')}</div></footer>`;
}

function layout({ path, title, description, h1, body, schema = [] }) {
  const schemaTags = schema.map((item) => `<script type="application/ld+json">${JSON.stringify(item)}</script>`).join('\n');
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${absUrl(path)}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(site.name)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${absUrl(path)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <link rel="stylesheet" href="/assets/css/styles.css">
  ${schemaTags}
</head>
<body>
${nav()}
${body}
${footer()}
<script src="/assets/js/tools.js" defer></script>
</body>
</html>`;
}

function breadcrumb(path, items) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: absUrl(item.href)
    }))
  };
  const html = `<div class="breadcrumb">${items.map((item, index) => index === items.length - 1 ? esc(item.label) : `<a href="${item.href}">${esc(item.label)}</a>`).join(' / ')}</div>`;
  return { html, schema };
}

function faqSection(faq) {
  return `<section class="faq"><h2>FAQ</h2>${faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</section>`;
}

function faqSchema(faq) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a }
    }))
  };
}

function toolSchema(tool) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    url: absUrl(routePath('tools', tool.slug)),
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
  };
}

function textSections(headings, toolName) {
  return headings.map((heading) => `<section><h2>${esc(heading)}</h2><p>${esc(sectionCopy(heading, toolName))}</p></section>`).join('');
}

function sectionCopy(heading, subject) {
  if (/screenshot/i.test(heading)) return `${subject} helps you prepare image assets before submission. Use the result as a practical preflight check, then confirm final requirements in App Store Connect before publishing.`;
  if (/keyword|ASO/i.test(heading)) return `Focus on relevant terms that match user intent. Avoid repetition, protected names, misleading claims, and keyword stuffing. The goal is clear metadata that supports discovery and conversion.`;
  if (/privacy|legal/i.test(heading)) return `Describe actual data practices in plain language. Generated text is only a starting point and should be reviewed for your app, region, SDKs, and legal obligations.`;
  if (/review|submission/i.test(heading)) return `Clear preparation reduces avoidable delays. Provide links, credentials, screenshots, and notes that help reviewers and users understand the app without overpromising outcomes.`;
  if (/localization/i.test(heading)) return `Localization is more than translation. Review metadata, screenshots, strings, dates, currencies, support links, and QA flows for each target locale.`;
  if (/price|revenue|subscription/i.test(heading)) return `Pricing should balance user value, retention, market expectations, and platform fees. Final price points must be configured using the options available in App Store Connect.`;
  return `Use ${subject} as a practical planning tool. Keep the final copy accurate, specific, and easy to understand for App Store reviewers and potential users.`;
}

function renderToolForm(tool) {
  const id = tool.id;
  const sizeOptions = screenshotSizes.map((size) => `<option value="${size.width}x${size.height}">${esc(size.label)} — ${size.width}×${size.height}</option>`).join('');
  const commonTop = `<p class="small">This tool runs in your browser. Verify final App Store requirements before submission.</p>`;
  if (id === 'screenshot-size-checker') return `${commonTop}<div class="form-grid"><label class="full">Screenshots (PNG/JPG, up to 10)<input id="imageFiles" type="file" accept="image/png,image/jpeg" multiple></label><label>Device category<select id="platform"><option>Auto Detect</option><option>iPhone</option><option>iPad</option><option>Mac</option><option>Apple Watch</option></select></label><label>Orientation<select id="orientation"><option>Auto</option><option>Portrait</option><option>Landscape</option></select></label></div><div class="actions"><button id="checkScreenshots">Check screenshots</button></div>`;
  if (id === 'screenshot-resizer') return `${commonTop}<div class="form-grid"><label class="full">Screenshot image<input id="resizeImage" type="file" accept="image/png,image/jpeg"></label><label>Target size<select id="targetSize">${sizeOptions}</select></label><label>Fit mode<select id="fitMode"><option value="contain">Contain with background</option><option value="cover">Cover and crop</option><option value="stretch">Stretch, not recommended</option></select></label><label>Background color<input id="bgColor" type="color" value="#ffffff"></label><label>Output format<select id="outputFormat"><option value="image/png">PNG</option><option value="image/jpeg">JPG</option></select></label><label>JPG quality<input id="quality" type="range" min="50" max="100" value="92"></label></div><div class="actions"><button id="resizeButton">Resize screenshot</button><a id="downloadImage" class="button secondary" download="app-store-screenshot.png" href="#">Download</a></div><canvas id="resizeCanvas" width="1" height="1" aria-label="Resized screenshot preview"></canvas>`;
  if (id === 'title-generator') return `<div class="form-grid"><label>App category<input id="category" value="Productivity"></label><label>Main function<input id="mainFunction" placeholder="track tasks"></label><label>Target audience<input id="audience" placeholder="freelancers"></label><label>Primary keyword<input id="primaryKeyword" placeholder="task planner"></label><label>Secondary keyword<input id="secondaryKeyword" placeholder="schedule"></label><label>Brand name (optional)<input id="brand" placeholder="FocusKit"></label><label>Tone<select id="tone"><option>Simple</option><option>Professional</option><option>Friendly</option><option>Premium</option><option>Playful</option></select></label><label>Length preference<select id="lengthPref"><option>Short</option><option>Medium</option><option>Keyword-rich</option></select></label></div><div class="actions"><button id="generateTitles">Generate titles</button></div><p class="small">Avoid protected brand names, misleading claims, or terms you do not have rights to use.</p>`;
  if (id === 'subtitle-generator') return `<div class="form-grid"><label>App type<input id="appType" placeholder="habit tracker"></label><label>Main benefit<input id="benefit" placeholder="build better routines"></label><label>Top feature<input id="feature" placeholder="daily reminders"></label><label>Target user<input id="audience" placeholder="busy professionals"></label><label>Primary keyword<input id="primaryKeyword" placeholder="habit tracker"></label><label>Tone<select id="tone"><option>Simple</option><option>Professional</option><option>Friendly</option><option>Premium</option><option>Playful</option></select></label><label class="full">Avoid words (optional)<input id="avoidWords" placeholder="free,best"></label></div><div class="actions"><button id="generateSubtitles">Generate subtitles</button></div>`;
  if (id === 'keyword-counter') return `<div class="form-grid"><label class="full">Keyword textarea<textarea id="keywords" placeholder="fitness,workout,tracker,health"></textarea></label><label>Separator mode<select id="separator"><option value="comma">comma</option><option value="space">space</option><option value="line">line break</option></select></label><label>Target limit<input id="limit" type="number" value="100" min="1"></label></div><div class="actions"><button id="analyzeKeywords">Analyze</button><button class="secondary" id="cleanKeywords">Clean format</button></div>`;
  if (id === 'whats-new-generator') return `<div class="form-grid"><label>Update type<select id="updateType"><option>Bug fixes</option><option>New features</option><option>UI improvements</option><option>Performance</option><option>Localization</option><option>Mixed</option></select></label><label>App name (optional)<input id="appName" placeholder="FocusKit"></label><label class="full">New features<textarea id="features" placeholder="New calendar view"></textarea></label><label class="full">Fixed issues<textarea id="fixes" placeholder="Fixed reminder sync issue"></textarea></label><label class="full">Improvements<textarea id="improvements" placeholder="Faster launch time"></textarea></label><label>Tone<select id="tone"><option>Simple</option><option>Friendly</option><option>Professional</option><option>Short</option></select></label><label class="check-row"><input id="thanks" type="checkbox" checked> Include thank-you line</label></div><div class="actions"><button id="generateNotes">Generate release notes</button></div>`;
  if (id === 'review-notes-generator') return `<div class="form-grid"><label>App name<input id="appName" placeholder="FocusKit"></label><label>Requires login?<select id="requiresLogin"><option>No</option><option>Yes</option></select></label><label>Test account username<input id="username" autocomplete="off"></label><label>Test account password<input id="password" type="password" autocomplete="new-password"></label><label>Subscription or IAP?<select id="hasIap"><option>No</option><option>Yes</option></select></label><label class="full">Key features to test<textarea id="features"></textarea></label><label class="full">Special configuration<textarea id="config"></textarea></label><label>Region restrictions<input id="regions"></label><label>Demo video URL<input id="demoUrl" type="url"></label><label>Contact email<input id="email" type="email"></label></div><div class="actions"><button id="generateReviewNotes">Generate review notes</button></div><p class="warning">Use a dedicated test account. Do not enter sensitive production passwords.</p>`;
  if (id === 'privacy-policy-generator') return `<p class="warning">This generator provides a general template for informational purposes only and does not provide legal advice.</p><div class="form-grid"><label>Company / developer name<input id="developer" placeholder="Example Studio"></label><label>App name<input id="appName" placeholder="FocusKit"></label><label>Contact email<input id="email" type="email"></label><label>Website URL<input id="website" type="url"></label><label class="full">Data collected (comma separated)<input id="dataCollected" placeholder="Email address, Usage analytics, Crash logs"></label><label class="full">Third-party services<input id="services" placeholder="Firebase, RevenueCat, Google Analytics"></label><label>Login methods<input id="loginMethods" placeholder="Apple, Email"></label><label class="check-row"><input id="rights" type="checkbox" checked> Include user rights section</label><label class="check-row"><input id="deletion" type="checkbox" checked> Include data deletion contact</label></div><div class="actions"><button id="generatePolicy">Generate policy</button><button class="secondary" id="downloadPolicyTxt">Download .txt</button><button class="secondary" id="downloadPolicyMd">Download .md</button></div>`;
  if (id === 'aso-keyword-generator') return `<div class="form-grid"><label>App category<input id="category" placeholder="Productivity"></label><label>Core feature<input id="feature" placeholder="task planning"></label><label>Target audience<input id="audience" placeholder="students"></label><label>Problem solved<input id="problem" placeholder="missed deadlines"></label><label>Primary keyword<input id="primaryKeyword" placeholder="planner"></label><label>Country / language<input id="locale" placeholder="US English"></label><label class="full">Competitor terms (optional)<input id="competitors" placeholder="Use only if you have rights and policy confidence"></label><label>Tone<select id="tone"><option value="broad">broad</option><option value="long-tail">long-tail</option><option value="feature-focused">feature-focused</option></select></label></div><div class="actions"><button id="generateKeywords">Generate keywords</button></div><p class="small">Avoid protected competitor names and misleading claims.</p>`;
  if (id === 'localization-checklist') return `<div class="form-grid"><label class="full">Target languages<input id="languages" placeholder="Spanish, French, German"></label><label>App type<input id="appType" placeholder="finance app"></label><label>Has subscriptions?<select id="subscriptions"><option>No</option><option>Yes</option></select></label><label>Has login?<select id="login"><option>No</option><option>Yes</option></select></label><label>Has push notifications?<select id="push"><option>No</option><option>Yes</option></select></label><label>Has localized screenshots?<select id="screenshots"><option>No</option><option>Yes</option></select></label><label>Has privacy policy localized?<select id="privacy"><option>No</option><option>Yes</option></select></label><label>Has customer support email?<select id="support"><option>Yes</option><option>No</option></select></label></div><div class="actions"><button id="generateChecklist">Generate checklist</button><button class="secondary" id="printChecklist">Print</button><button class="secondary" id="downloadChecklist">Download Markdown</button></div>`;
  if (id === 'subscription-price-calculator') return `<div class="form-grid"><label>Monthly price<input id="monthly" type="number" step="0.01" value="4.99"></label><label>Currency<input id="currency" value="USD"></label><label>Quarterly discount %<input id="quarterlyDiscount" type="number" value="10"></label><label>Annual discount %<input id="annualDiscount" type="number" value="30"></label><label>Estimated monthly subscribers<input id="subscribers" type="number" value="1000"></label><label>Apple commission<select id="commission"><option value="0.15">15%</option><option value="0.30">30%</option><option value="custom">custom</option></select></label><label>Custom commission %<input id="customCommission" type="number" value="15"></label><label>Monthly churn % (optional)<input id="churn" type="number" value="0"></label></div><div class="actions"><button id="calculatePricing">Calculate</button></div><p class="small">Final App Store pricing must be selected in App Store Connect according to Apple’s available price points and regional pricing options.</p>`;
  return `<div class="form-grid"><label>App name<input id="appName"></label><label>Subtitle<input id="subtitle"></label><label class="full">Keyword field<textarea id="keywords"></textarea></label><label class="full">Description<textarea id="description"></textarea></label><label>Promotional text<input id="promo"></label><label>What's New<input id="whatsNew"></label><label>Privacy Policy URL<input id="privacyUrl" type="url"></label><label>Support URL<input id="supportUrl" type="url"></label><label>Marketing URL<input id="marketingUrl" type="url"></label><label>Number of screenshots<input id="screenshots" type="number" value="0"></label><label>Has review notes?<select id="reviewNotes"><option>No</option><option>Yes</option></select></label><label>Requires login?<select id="requiresLogin"><option>No</option><option>Yes</option></select></label><label>Has test account?<select id="testAccount"><option>No</option><option>Yes</option></select></label></div><div class="actions"><button id="checkListing">Check listing</button></div><p class="small">This checklist cannot guarantee approval.</p>`;
}

function renderTool(tool) {
  const path = routePath('tools', tool.slug);
  const bc = breadcrumb(path, [{ label: 'Home', href: '/' }, { label: 'Tools', href: '/tools/' }, { label: tool.name, href: path }]);
  const body = `<main class="page-main"><div class="container">${bc.html}<p class="eyebrow">${esc(tool.category)}</p><h1>${esc(tool.name)}</h1><p class="lede">${esc(tool.intro)}</p><div class="tool-layout"><section class="tool-card" data-tool="${esc(tool.id)}"><h2>Free ${esc(tool.name)}</h2>${renderToolForm(tool)}</section><aside class="result-card"><h2>Results</h2><div id="result" class="output"><p class="small">Enter details and run the tool to see results here.</p></div></aside></div><article class="content">${textSections(tool.h2s, tool.name)}<section><h2>Related tools</h2><div class="related">${tool.related.map((slug) => `<a href="${pathForSlug(slug)}">${esc(labelForSlug(slug))}</a>`).join('')}</div></section><section><h2>Disclaimer</h2><p>${esc(site.disclaimer)}</p><p>Apple may update requirements. Always confirm final submission details in App Store Connect before publishing.</p></section>${faqSection(tool.faq)}</article></div></main>`;
  return layout({ path, title: tool.title, description: tool.description, body, schema: [bc.schema, toolSchema(tool), faqSchema(tool.faq)] });
}

function renderHome() {
  const path = '/';
  const popular = tools.slice(0, 6);
  const body = `<main><section class="hero"><div class="container hero-grid"><div><p class="eyebrow">Free App Store tools</p><h1>Free App Store Tools for Indie Developers</h1><p class="lede">Prepare screenshots, metadata, keywords, release notes, privacy links, and launch checklists before submitting your app.</p><div class="cta-row"><a class="button" href="/tools/">Browse Tools</a><a class="button secondary" href="/guides/">Read SEO Guides</a></div></div><div class="hero-card"><h2>Launch-ready checks</h2><ul><li>Browser-local image and text tools</li><li>SEO-friendly guides and templates</li><li>No backend required for first version</li><li>Independent from Apple Inc.</li></ul></div></div></section><section class="section"><div class="container"><h2>Popular tools</h2><div class="grid">${popular.map(card).join('')}</div></div></section><section class="section"><div class="container grid two"><div class="content"><h2>Launch checklist</h2><p>Use the listing checker, review notes generator, privacy policy generator, and localization checklist to reduce common pre-submission gaps.</p><a class="button" href="/tools/app-store-listing-checker/">Try Listing Checker</a></div><div class="content"><h2>SEO guides and templates</h2><p>Read practical guides and copy templates for screenshot sizes, subtitles, keyword fields, privacy policy URLs, and review notes.</p><a class="button secondary" href="/templates/">Browse Templates</a></div></div></section><section class="section"><div class="container"><div class="warning">${esc(site.disclaimer)}</div></div></section></main>`;
  return layout({ path, title: 'Free App Store Tools for Indie Developers | App Launch Toolkit', description: site.description, body, schema: [] });
}

function card(item, type = 'tools') {
  const path = item.slug ? (type === 'tools' ? `/tools/${item.slug}/` : `/${type}/${item.slug}/`) : item.href;
  return `<a class="card" href="${path}"><span class="tag">${esc(item.category || item.keyword || 'Resource')}</span><h3>${esc(item.name)}</h3><p>${esc(item.description)}</p></a>`;
}

function renderIndex(type, items, title, description, intro) {
  const path = `/${type}/`;
  const bc = breadcrumb(path, [{ label: 'Home', href: '/' }, { label: title, href: path }]);
  const body = `<main class="page-main"><div class="container">${bc.html}<h1>${esc(title)}</h1><p class="lede">${esc(intro)}</p><div class="grid">${items.map((item) => card(item, type)).join('')}</div></div></main>`;
  return layout({ path, title: `${title} | ${site.name}`, description, body, schema: [bc.schema] });
}

function renderGuide(guide) {
  const path = routePath('guides', guide.slug);
  const bc = breadcrumb(path, [{ label: 'Home', href: '/' }, { label: 'Guides', href: '/guides/' }, { label: guide.name, href: path }]);
  const body = `<main class="page-main"><div class="container">${bc.html}<p class="eyebrow">Guide</p><h1>${esc(guide.name)}</h1><p class="lede">${esc(guide.description)}</p><article class="content">${guide.sections.map((section) => `<section><h2>${esc(section)}</h2><p>${esc(sectionCopy(section, guide.name))}</p><p>Use this guidance as a practical workflow, not as a replacement for final App Store Connect checks or official documentation. Keep your copy accurate, user-focused, and specific to your app.</p></section>`).join('')}<section><h2>Try the related tool</h2><p><a class="button" href="/tools/${guide.toolSlug}/">Open ${esc(labelForSlug(guide.toolSlug))}</a></p></section>${faqSection(guide.faq)}</article></div></main>`;
  return layout({ path, title: guide.title, description: guide.description, body, schema: [bc.schema, faqSchema(guide.faq)] });
}

function renderTemplate(template) {
  const path = routePath('templates', template.slug);
  const bc = breadcrumb(path, [{ label: 'Home', href: '/' }, { label: 'Templates', href: '/templates/' }, { label: template.name, href: path }]);
  const body = `<main class="page-main"><div class="container">${bc.html}<p class="eyebrow">Template</p><h1>${esc(template.name)}</h1><p class="lede">${esc(template.description)}</p><article class="content"><section><h2>Copyable template</h2><div class="template-box"><pre id="templateText">${esc(template.template)}</pre></div><div class="actions"><button data-copy-target="templateText">Copy template</button><button data-download-target="templateText" data-filename="${template.slug}.md" class="secondary">Download Markdown</button></div></section><section><h2>How to use this template</h2><p>Replace placeholders, remove irrelevant sections, and verify the final content against your real app behavior before publishing.</p><p><a class="button secondary" href="/tools/${template.relatedTool}/">Open ${esc(labelForSlug(template.relatedTool))}</a></p></section><section><h2>Disclaimer</h2><p>Templates are informational and do not guarantee App Store approval, legal compliance, or search ranking.</p></section>${faqSection(template.faq)}</article></div></main>`;
  return layout({ path, title: template.title, description: template.description, body, schema: [bc.schema, faqSchema(template.faq)] });
}

function renderBasicPage(page) {
  const path = `/${page.slug}/`;
  const bc = breadcrumb(path, [{ label: 'Home', href: '/' }, { label: page.name, href: path }]);
  const body = `<main class="page-main"><div class="container">${bc.html}<h1>${esc(page.name)}</h1><article class="content">${page.body.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}</article></div></main>`;
  return layout({ path, title: page.title, description: page.description, body, schema: [bc.schema] });
}

function render404() {
  return layout({ path: '/404.html', title: `Page Not Found | ${site.name}`, description: 'The requested page could not be found.', body: `<main class="page-main"><div class="container"><h1>Page not found</h1><p class="lede">The page may have moved. Browse the free App Store tools instead.</p><a class="button" href="/tools/">Browse Tools</a></div></main>` });
}

async function writeRoute(path, html) {
  routes.push(path);
  const file = path === '/' ? join(dist, 'index.html') : path.endsWith('.html') ? join(dist, path) : join(dist, path, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}

function sitemap() {
  const urls = routes.filter((path) => path !== '/404.html').map((path) => `  <url><loc>${absUrl(path)}</loc></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, 'assets/css'), { recursive: true });
await mkdir(join(dist, 'assets/js'), { recursive: true });
await copyFile('src/assets/css/styles.css', join(dist, 'assets/css/styles.css'));
await copyFile('src/assets/js/tools.js', join(dist, 'assets/js/tools.js'));

await writeRoute('/', renderHome());
await writeRoute('/tools/', renderIndex('tools', tools, 'Free App Store Tools', 'Browse free App Store tools for screenshots, ASO keywords, subtitles, release notes, review notes, privacy policies, localization, pricing, and submission QA.', 'Use browser-based tools to prepare your App Store listing without accounts or backend uploads.'));
for (const tool of tools) await writeRoute(routePath('tools', tool.slug), renderTool(tool));
await writeRoute('/guides/', renderIndex('guides', guides, 'App Store SEO Guides', 'Read practical App Store guides for screenshots, subtitles, keyword fields, privacy policy URLs, review notes, and localization.', 'Learn how to prepare App Store assets and metadata with clear, independent guidance.'));
for (const guide of guides) await writeRoute(routePath('guides', guide.slug), renderGuide(guide));
await writeRoute('/templates/', renderIndex('templates', templates, 'App Store Templates', 'Copy App Store submission templates for review notes, privacy policies, launch checklists, and localization QA.', 'Copy and download practical templates for common App Store launch tasks.'));
for (const template of templates) await writeRoute(routePath('templates', template.slug), renderTemplate(template));
for (const page of pages) await writeRoute(`/${page.slug}/`, renderBasicPage(page));
await writeRoute('/404.html', render404());

await writeFile(join(dist, 'sitemap.xml'), sitemap());
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.baseUrl}/sitemap.xml\n`);

console.log(`Built ${routes.length} pages into ${dist}/`);
