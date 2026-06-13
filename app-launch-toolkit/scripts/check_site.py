from pathlib import Path
import re

expected = ['/']
expected += ['/tools/'] + [f'/tools/{slug}/' for slug in [
'app-store-screenshot-size-checker','app-store-screenshot-resizer','app-store-title-generator','app-store-subtitle-generator','app-store-keyword-counter','whats-new-generator','app-review-notes-generator','privacy-policy-generator','terms-of-use-generator','aso-keyword-generator','app-localization-checklist','subscription-price-calculator','app-store-listing-checker']]
expected += ['/guides/'] + [f'/guides/{slug}/' for slug in ['app-store-screenshot-sizes','how-to-write-app-store-subtitle','app-store-keyword-field-guide','app-privacy-policy-url-guide','app-store-review-notes-guide','app-store-localization-checklist']]
expected += ['/templates/'] + [f'/templates/{slug}/' for slug in ['app-review-notes-template','app-privacy-policy-template','app-store-submission-checklist','app-localization-checklist-template']]
expected += ['/about/','/contact/','/privacy-policy/','/terms/','/404.html']

dist = Path('dist')
errors = []

def file_for(route):
    if route == '/': return dist / 'index.html'
    if route.endswith('.html'): return dist / route.lstrip('/')
    return dist / route.lstrip('/') / 'index.html'

for route in expected:
    if not file_for(route).exists():
        errors.append(f'Missing route: {route}')

if not (dist / 'sitemap.xml').exists(): errors.append('Missing sitemap.xml')
if not (dist / 'robots.txt').exists(): errors.append('Missing robots.txt')

titles = {}
html_files = list(dist.rglob('*.html')) if dist.exists() else []
for file in html_files:
    html = file.read_text(encoding='utf-8')
    title = re.search(r'<title>(.*?)</title>', html)
    desc = re.search(r'<meta name="description" content="(.*?)">', html)
    if not title: errors.append(f'{file}: missing title')
    elif title.group(1) in titles: errors.append(f'{file}: duplicate title with {titles[title.group(1)]}')
    elif len(title.group(1)) < 10: errors.append(f'{file}: short title')
    else: titles[title.group(1)] = file
    if not desc or len(desc.group(1)) < 40: errors.append(f'{file}: missing/short description')
    for needle in ['rel="canonical"','property="og:title"','name="twitter:card"','<h1']:
        if needle not in html: errors.append(f'{file}: missing {needle}')
    for link in re.findall(r'href="(/[^"#?]*)', html):
        if link.startswith('/assets/') or link in ['/sitemap.xml','/robots.txt']:
            continue
        normalized = link if link.endswith('/') or link.endswith('.html') else link + '/'
        if normalized not in expected:
            errors.append(f'{file}: broken internal link {link}')

sitemap = (dist / 'sitemap.xml').read_text(encoding='utf-8') if (dist / 'sitemap.xml').exists() else ''
for route in expected:
    if route == '/404.html': continue
    url = 'https://applaunchtoolkit.com/' if route == '/' else 'https://applaunchtoolkit.com' + route
    if url not in sitemap:
        errors.append(f'sitemap missing {route}')

if errors:
    print('\n'.join(errors))
    raise SystemExit(1)
print(f'Site check passed: {len(expected)} expected routes, {len(html_files)} HTML files.')
