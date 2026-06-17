# Site Bugfix + SEO Audit Report

Generated: 2026-06-16 20:48–21:00 GMT+8  
Project: `/Users/grant/IdeaProjects/All-Website-Tool/freetoolsspace`  
Deployment target: `root@153.75.235.56:/usr/share/nginx/html/`

## 1. Summary

- Scanned **178 HTML pages**.
- Public/indexable `index.html` pages found: **168**.
- `sitemap.xml` URLs: **168**.
- Metadata audit after fixes:
  - Missing title: **0**
  - Missing description: **0**
  - Pages without exactly one H1: **0**
  - Missing canonical: **0**
  - Duplicate titles: **0**
  - Duplicate descriptions: **0**
  - Broken internal links: **0**

## 2. Bugs found and fixed

- Fixed broken Related Tools links:
  - `/json-minifier-online/` now links to existing `/devtoolbox/json-formatter/`, `/devtoolbox/base64-encoder-decoder/`, and `/devtoolbox/url-encoder-decoder/` pages.
  - `/pdf-splitter-online/` now links to existing `/pdftoolbox/pdf-compressor/` instead of missing `/pdftoolbox/pdf-to-jpg/`.
  - `/url-slug-generator/` now links to existing `/seotoolbox/open-graph-generator/` instead of missing `/schema-markup-generator/`.
- Verified zero broken internal links after remediation.
- Verified representative local HTTP routes return 200.

## 3. UX fixes made

- Related-tool cards now lead users to real working pages instead of 404 targets.
- 404 pages keep helpful navigation but are explicitly marked `noindex,follow`, so users and crawlers can continue to useful pages without indexing error pages.

## 4. SEO changes made

- Fixed duplicate SEO metadata caused by 404 pages sharing collection-page titles/descriptions.
- Added `meta name="robots" content="noindex,follow"` to all 404 pages.
- Gave `imagetoolbox/404.html` and `seotoolbox/404.html` proper `Page Not Found | ...` titles.
- Updated 404 descriptions for DevToolBox, ImageToolBox, and SEOToolBox to be unique and accurate.
- Verified:
  - all pages have title, description, canonical, and one H1;
  - no duplicate titles/descriptions remain;
  - sitemap covers all 168 public `index.html` pages;
  - robots.txt allows crawling and references sitemap.

## 5. Performance changes made

- No heavy libraries were added.
- Static structure preserved.
- No URL structure changes were made.

## 6. Remaining issues needing human confirmation

- Browser automation was blocked by local browser navigation policy during this run, so visual desktop/mobile inspection was limited to static and HTTP checks.
- Existing broader uncommitted changes were present in this project before/around this run; this report focuses on the audit/fixes above.
- External CDN dependency remains on `/pdf-splitter-online/` for `pdf-lib`; acceptable for current functionality, but consider self-hosting if you want fewer third-party runtime dependencies.

## 7. Follow-up recommendations

- Run a visual mobile pass in Chrome/Safari for high-traffic tools after deployment.
- Add automated internal-link and metadata checks to CI or a local script.
- Consider a small Playwright smoke test for top tools: input, output, copy, clear, and no console errors.

## 8. Validation evidence

- Local static server route checks returned 200 for:
  - `/`
  - `/json-minifier-online/`
  - `/url-slug-generator/`
  - `/pdf-splitter-online/`
  - `/devtoolbox/json-formatter/`
  - `/imagetoolbox/`
  - `/seotoolbox/robots-txt-generator/`
  - `/sitemap.xml`
  - `/robots.txt`
- Sitemap parity check: **168 public pages**, **168 sitemap locs**, **0 missing**, **0 extra**.

Robots.txt:

```txt
User-agent: *
Allow: /

Sitemap: https://freetoolsspace.com/sitemap.xml
```

## 9. Final checked page status table

| URL/path | Page type | Opens OK | Mobile OK | Title | Description | H1 | Canonical | Robots | Structured data |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| `/compress-image-to-100kb/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/csv-duplicate-row-remover/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/datecalctools/404.html` | 404 | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/datecalctools/about/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/datecalctools/age-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/datecalctools/birthday-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/datecalctools/business-days-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/datecalctools/contact/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/datecalctools/cookie-policy/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/datecalctools/countdown-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/datecalctools/date-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/datecalctools/days-between-dates-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/datecalctools/disclaimer/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/datecalctools/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/datecalctools/months-between-dates-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/datecalctools/privacy-policy/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/datecalctools/terms-of-use/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/datecalctools/time-duration-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/datecalctools/tools/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/datecalctools/weekday-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/datecalctools/weeks-between-dates-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/devtoolbox/404.html` | 404 | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/devtoolbox/about/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/devtoolbox/base64-encoder-decoder/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/devtoolbox/contact/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/devtoolbox/cookie-policy/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/devtoolbox/disclaimer/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/devtoolbox/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/devtoolbox/json-formatter/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/devtoolbox/privacy-policy/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/devtoolbox/terms-of-use/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/devtoolbox/tools/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/devtoolbox/url-encoder-decoder/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/devtoolbox/uuid-generator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/healthlifecalc/404.html` | 404 | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/healthlifecalc/about/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/healthlifecalc/bmi-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/healthlifecalc/bmr-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/healthlifecalc/body-fat-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/healthlifecalc/calorie-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/healthlifecalc/contact/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/healthlifecalc/cookie-policy/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/healthlifecalc/disclaimer/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/healthlifecalc/ideal-weight-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/healthlifecalc/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/healthlifecalc/macro-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/healthlifecalc/ovulation-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/healthlifecalc/pregnancy-due-date-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/healthlifecalc/privacy-policy/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/healthlifecalc/steps-to-calories-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/healthlifecalc/terms-of-use/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/healthlifecalc/tools/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/healthlifecalc/water-intake-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/image-cropper-online/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/image-optimization-tools/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/imagetoolbox/404.html` | 404 | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/imagetoolbox/about/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/imagetoolbox/contact/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/imagetoolbox/cookie-policy/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/imagetoolbox/disclaimer/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/imagetoolbox/image-compressor/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/imagetoolbox/image-resizer/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/imagetoolbox/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/imagetoolbox/png-to-jpg-converter/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/imagetoolbox/privacy-policy/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/imagetoolbox/terms-of-use/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/imagetoolbox/tools/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/imagetoolbox/webp-converter/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/json-minifier-online/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/pdf-splitter-online/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/pdftoolbox/404.html` | 404 | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/pdftoolbox/about/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/pdftoolbox/contact/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/pdftoolbox/cookie-policy/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/pdftoolbox/disclaimer/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/pdftoolbox/image-to-pdf/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/pdftoolbox/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/pdftoolbox/jpg-to-pdf/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/pdftoolbox/merge-pdf/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/pdftoolbox/pdf-compressor/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/pdftoolbox/privacy-policy/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/pdftoolbox/split-pdf/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/pdftoolbox/terms-of-use/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/pdftoolbox/tools/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/png-to-webp-converter/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/quickmathtools/404.html` | 404 | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/quickmathtools/about/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/quickmathtools/average-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/quickmathtools/contact/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/quickmathtools/cookie-policy/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/quickmathtools/disclaimer/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/quickmathtools/fraction-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/quickmathtools/fraction-to-decimal-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/quickmathtools/gpa-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/quickmathtools/grade-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/quickmathtools/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/quickmathtools/percentage-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/quickmathtools/percentage-decrease-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/quickmathtools/percentage-increase-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/quickmathtools/privacy-policy/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/quickmathtools/random-number-generator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/quickmathtools/ratio-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/quickmathtools/terms-of-use/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/quickmathtools/tools/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/seotoolbox/404.html` | 404 | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/seotoolbox/about/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/seotoolbox/contact/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/seotoolbox/cookie-policy/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/seotoolbox/disclaimer/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/seotoolbox/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/seotoolbox/keyword-density-checker/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/seotoolbox/meta-description-generator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/seotoolbox/open-graph-generator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/seotoolbox/privacy-policy/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/seotoolbox/robots-txt-generator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/seotoolbox/terms-of-use/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/seotoolbox/tools/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/seotoolbox/xml-sitemap-generator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/text-diff-checker/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/texttools/404.html` | 404 | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/texttools/about/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/texttools/case-converter/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/texttools/character-counter/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/texttools/contact/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/texttools/cookie-policy/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/texttools/disclaimer/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/texttools/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/texttools/privacy-policy/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/texttools/remove-duplicate-lines/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/texttools/terms-of-use/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/texttools/tools/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/texttools/word-counter/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/unitconverthub/404.html` | 404 | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/unitconverthub/about/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/unitconverthub/celsius-to-fahrenheit/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/unitconverthub/cm-to-inches/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/unitconverthub/contact/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/unitconverthub/cookie-policy/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/unitconverthub/disclaimer/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/unitconverthub/fahrenheit-to-celsius/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/unitconverthub/feet-to-meters/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/unitconverthub/gallons-to-liters/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/unitconverthub/inches-to-cm/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/unitconverthub/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/unitconverthub/kg-to-lbs/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/unitconverthub/km-to-miles/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/unitconverthub/lbs-to-kg/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/unitconverthub/liters-to-gallons/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/unitconverthub/meters-to-feet/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/unitconverthub/miles-to-km/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/unitconverthub/ml-to-oz/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/unitconverthub/oz-to-ml/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/unitconverthub/privacy-policy/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/unitconverthub/square-feet-to-square-meters/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/unitconverthub/terms-of-use/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/unitconverthub/tools/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/url-slug-generator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/wagemoneycalc/404.html` | 404 | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/wagemoneycalc/about/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/wagemoneycalc/contact/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/wagemoneycalc/cookie-policy/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/wagemoneycalc/disclaimer/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/wagemoneycalc/discount-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/wagemoneycalc/freelance-rate-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/wagemoneycalc/hourly-wage-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/wagemoneycalc/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | N/A |
| `/wagemoneycalc/overtime-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/wagemoneycalc/privacy-policy/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/wagemoneycalc/profit-margin-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/wagemoneycalc/salary-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/wagemoneycalc/salary-to-hourly-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/wagemoneycalc/sales-tax-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/wagemoneycalc/terms-of-use/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/wagemoneycalc/tip-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/wagemoneycalc/tools/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/wagemoneycalc/unit-price-calculator/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
| `/word-character-counter/` | Public | Yes | Not browser-tested | Yes | Yes | Yes | Yes | Yes | Yes |
