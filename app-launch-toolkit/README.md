# App Launch Toolkit

A dependency-free static site for free App Store launch tools, guides, and templates. The site is built from source files into `dist/` and all tools run in the browser with no backend.

## What is included

- Home page, Tools index, Guides index, Templates index
- 13 working browser-local tools:
  - App Store Screenshot Size Checker
  - App Store Screenshot Resizer
  - App Store Title Generator
  - App Store Subtitle Generator
  - App Store Keyword Counter
  - App Store What’s New Generator
  - App Review Notes Generator
  - App Privacy Policy Generator
  - Terms of Use Generator
  - ASO Keyword Generator
  - App Localization Checklist
  - App Subscription Price Calculator
  - App Store Listing Checker
- 6 SEO guide pages
- 4 copy/download template pages
- About, Contact, Privacy Policy, Terms, and 404 pages
- Per-page title, meta description, canonical URL, Open Graph tags, Twitter card tags
- WebApplication, FAQPage, and BreadcrumbList JSON-LD where applicable
- `sitemap.xml` and `robots.txt`

## Build

This project intentionally does not require npm packages.

```bash
python3 scripts/build.py
python3 scripts/check_site.py
```

If `npm` is available, the same commands are exposed as:

```bash
npm run build
npm run check
```

## Preview locally

```bash
python3 scripts/build.py
python3 -m http.server 4173 -d dist
```

Then open <http://localhost:4173>.

## Configure before production

Update these values before deploying:

- `BASE_URL` in `scripts/build.py`
- `site.baseUrl` in `src/data/site.mjs` if you use the optional JS data source
- Contact email addresses in `scripts/build.py`, `src/data/site.mjs`, and `src/data/pages.mjs`
- Add real analytics/Search Console/AdSense snippets only after the privacy policy reflects the enabled services

## Deployment

Upload the generated `dist/` directory to any static host or Nginx document root. The generated files use clean directory URLs such as `/tools/app-store-screenshot-size-checker/`.

Example verification before deployment:

```bash
python3 scripts/build.py
python3 scripts/check_site.py
find dist -maxdepth 2 -type f | sort
```

## Notes

The site is independent and is not affiliated with Apple Inc. Tool output is for preparation only and does not guarantee App Store approval, ASO ranking, legal compliance, or revenue outcomes.
