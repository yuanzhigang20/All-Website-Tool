from pathlib import Path
import re
import sys

if len(sys.argv) < 2:
    print('Usage: python3 sites/_shared/scripts/check_site.py <site-dir>', file=sys.stderr)
    raise SystemExit(1)

root = Path(sys.argv[1])
key = root.name
base_urls = {
    'datecalctools': 'https://datecalctools.com',
    'unitconverthub': 'https://unitconverthub.com',
    'quickmathtools': 'https://quickmathtools.com',
    'wagemoneycalc': 'https://wagemoneycalc.com',
    'healthlifecalc': 'https://healthlifecalc.com',
}
tool_routes = {
    'datecalctools': ['age-calculator','date-calculator','days-between-dates-calculator','business-days-calculator','time-duration-calculator','countdown-calculator','birthday-calculator','weekday-calculator','weeks-between-dates-calculator','months-between-dates-calculator'],
    'unitconverthub': ['cm-to-inches','inches-to-cm','kg-to-lbs','lbs-to-kg','celsius-to-fahrenheit','fahrenheit-to-celsius','meters-to-feet','feet-to-meters','ml-to-oz','oz-to-ml','liters-to-gallons','gallons-to-liters','square-feet-to-square-meters','km-to-miles','miles-to-km'],
    'quickmathtools': ['percentage-calculator','percentage-increase-calculator','percentage-decrease-calculator','fraction-calculator','fraction-to-decimal-calculator','average-calculator','ratio-calculator','random-number-generator','grade-calculator','gpa-calculator'],
    'wagemoneycalc': ['hourly-wage-calculator','salary-calculator','salary-to-hourly-calculator','overtime-calculator','discount-calculator','sales-tax-calculator','tip-calculator','profit-margin-calculator','freelance-rate-calculator','unit-price-calculator'],
    'healthlifecalc': ['bmi-calculator','bmr-calculator','calorie-calculator','water-intake-calculator','ideal-weight-calculator','body-fat-calculator','pregnancy-due-date-calculator','ovulation-calculator','macro-calculator','steps-to-calories-calculator'],
}
base = base_urls[key]
expected = ['/','/tools/'] + [f'/{slug}/' for slug in tool_routes[key]] + ['/about/','/contact/','/privacy-policy/','/cookie-policy/','/terms-of-use/','/disclaimer/','/404.html']
dist = root / 'dist'
errors = []

def file_for(route):
    if route == '/': return dist / 'index.html'
    if route.endswith('.html'): return dist / route.lstrip('/')
    return dist / route.lstrip('/') / 'index.html'

for route in expected:
    if not file_for(route).exists(): errors.append(f'Missing route: {route}')
for name in ['sitemap.xml','robots.txt','assets/css/styles.css','assets/js/runtime.js','assets/js/site-tools.js']:
    if not (dist / name).exists(): errors.append(f'Missing {name}')

html_files = list(dist.rglob('*.html')) if dist.exists() else []
titles = {}
descs = {}
for file in html_files:
    html = file.read_text(encoding='utf-8')
    route = str(file.relative_to(dist)).replace('index.html','')
    route = '/' + route if not route.startswith('/') else route
    if route == '/404.html': pass
    title = re.search(r'<title>(.*?)</title>', html)
    desc = re.search(r'<meta name="description" content="(.*?)">', html)
    if not title: errors.append(f'{file}: missing title')
    elif title.group(1) in titles: errors.append(f'{file}: duplicate title with {titles[title.group(1)]}')
    else: titles[title.group(1)] = file
    if not desc or len(desc.group(1)) < 40: errors.append(f'{file}: missing/short meta description')
    elif desc.group(1) in descs: errors.append(f'{file}: duplicate description with {descs[desc.group(1)]}')
    else: descs[desc.group(1)] = file
    for needle in ['rel="canonical"','property="og:title"','name="twitter:card"']:
        if needle not in html: errors.append(f'{file}: missing {needle}')
    h1s = len(re.findall(r'<h1[\s>]', html))
    if h1s != 1: errors.append(f'{file}: expected one h1, found {h1s}')
    if re.search(r'TODO|Lorem ipsum|Insert Date|placeholder content', html, re.I):
        errors.append(f'{file}: contains placeholder/TODO content')
    for link in re.findall(r'href="(/[^"#?]*)', html):
        if link.startswith('/assets/') or link in ['/sitemap.xml','/robots.txt']: continue
        normalized = link if link.endswith('/') or link.endswith('.html') else link + '/'
        if normalized not in expected: errors.append(f'{file}: broken internal link {link}')
    if route in [f'/{slug}/' for slug in tool_routes[key]]:
        for needle in ['FAQPage','SoftwareApplication','data-reset-tool','Copy Result','Formula','Related tools','Advertisement']:
            if needle not in html: errors.append(f'{file}: tool page missing {needle}')
        related = re.search(r'class="related"[\s\S]*?</div>', html)
        count = len(re.findall(r'<a ', related.group(0))) if related else 0
        if count < 5: errors.append(f'{file}: expected at least 5 related links, found {count}')
        if key == 'wagemoneycalc' and 'financial, tax, legal, or payroll advice' not in html:
            errors.append(f'{file}: missing finance disclaimer')
        if key == 'healthlifecalc' and 'not medical advice, diagnosis, or treatment' not in html:
            errors.append(f'{file}: missing health disclaimer')

sitemap = (dist / 'sitemap.xml').read_text(encoding='utf-8') if (dist / 'sitemap.xml').exists() else ''
robots = (dist / 'robots.txt').read_text(encoding='utf-8') if (dist / 'robots.txt').exists() else ''
for route in expected:
    if route == '/404.html': continue
    url = base + ('/' if route == '/' else route)
    if url not in sitemap: errors.append(f'sitemap missing {route}')
if f'{base}/sitemap.xml' not in robots: errors.append('robots missing correct sitemap URL')

if errors:
    print('\n'.join(errors))
    raise SystemExit(1)
print(f'{key} check passed: {len(expected)} expected routes, {len(html_files)} HTML files.')
