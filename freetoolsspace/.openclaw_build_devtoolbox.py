#!/usr/bin/env python3
from pathlib import Path
from datetime import date
import html, json, re

ROOT = Path('/Users/grant/IdeaProjects/All-Website-Tool/freetoolsspace')
SITE = ROOT / 'devtoolbox'
if SITE.exists():
    raise SystemExit('Collision: devtoolbox already exists; stop before overwriting existing folder.')

TODAY = '2026-06-14'
BASE = 'https://freetoolsspace.com/devtoolbox/'
THEME = ':root{--primary:#2563eb;--primary-dark:#1e3a8a;--accent:#f97316;--surface-2:#eff6ff;}'
TOOLS = [
    {
        'slug':'json-formatter', 'name':'JSON Formatter', 'h1':'JSON Formatter Online',
        'title':'JSON Formatter Online - Format, Validate & Minify JSON | DevToolBox',
        'desc':'Format, validate, minify, sort, and copy JSON with a free browser-based JSON formatter online.',
        'lede':'Paste JSON to format, validate, minify, sort keys, and copy clean output instantly in your browser.',
        'keyword':'json formatter online', 'tag':'JSON tools', 'calc':'json-formatter',
        'inputs':'<label class="full">JSON input<textarea id="json" rows="12">{"site":"FreeToolsSpace","tools":["JSON formatter","Base64 encoder"],"free":true}</textarea></label><label class="check-row full"><input id="sortKeys" type="checkbox"> Sort object keys alphabetically</label>',
        'formula':'formatted JSON = parsed JSON stringified with indentation; minified JSON = parsed JSON stringified without spaces',
        'uses':['Format API responses','Validate configuration snippets','Minify JSON before sharing','Sort keys for cleaner diffs','Debug browser storage data','Copy readable JSON for documentation']
    },
    {
        'slug':'base64-encoder-decoder', 'name':'Base64 Encoder Decoder', 'h1':'Base64 Encoder and Decoder',
        'title':'Base64 Encoder Decoder Online - Encode & Decode Text | DevToolBox',
        'desc':'Encode text to Base64 or decode Base64 to readable text with a free browser-based Base64 encoder decoder.',
        'lede':'Convert text to Base64 or decode Base64 strings locally in your browser without uploading data.',
        'keyword':'base64 encoder decoder online', 'tag':'Encoding tools', 'calc':'base64-tool',
        'inputs':'<label class="full">Text or Base64<textarea id="text" rows="9">Free online developer tools</textarea></label><label>Mode<select id="mode"><option>Encode to Base64</option><option>Decode from Base64</option></select></label>',
        'formula':'Base64 maps binary text bytes into A-Z, a-z, 0-9, +, /, and = padding characters',
        'uses':['Encode small text snippets','Decode Base64 API values','Check email or token samples','Prepare basic data URI text','Convert Unicode text safely','Copy encoded strings quickly']
    },
    {
        'slug':'url-encoder-decoder', 'name':'URL Encoder Decoder', 'h1':'URL Encoder and Decoder',
        'title':'URL Encoder Decoder Online - Percent Encode & Decode URLs | DevToolBox',
        'desc':'Encode URLs, decode percent-encoded text, and make query strings readable with a free online URL encoder decoder.',
        'lede':'Encode special characters for URLs or decode percent-encoded strings directly in your browser.',
        'keyword':'url encoder decoder online', 'tag':'Encoding tools', 'calc':'url-tool',
        'inputs':'<label class="full">URL or text<textarea id="text" rows="8">https://example.com/search?q=free tools & filters=json formatter</textarea></label><label>Mode<select id="mode"><option>Encode component</option><option>Decode component</option><option>Encode full URL safely</option></select></label>',
        'formula':'percent encoding replaces reserved characters with % followed by the character byte value in hexadecimal',
        'uses':['Encode query parameters','Decode tracking URLs','Clean copied browser links','Prepare API request values','Read escaped URL strings','Copy safe link fragments']
    },
    {
        'slug':'uuid-generator', 'name':'UUID Generator', 'h1':'UUID Generator Online',
        'title':'UUID Generator Online - Create Random Version 4 UUIDs | DevToolBox',
        'desc':'Generate random version 4 UUIDs in your browser, copy one or many identifiers, and choose uppercase output.',
        'lede':'Create random version 4 UUIDs locally for testing, mock data, database records, and development notes.',
        'keyword':'uuid generator online', 'tag':'Developer tools', 'calc':'uuid-generator',
        'inputs':'<label>How many UUIDs?<input id="count" type="number" min="1" max="100" value="10"></label><label class="check-row"><input id="uppercase" type="checkbox"> Uppercase output</label>',
        'formula':'UUID v4 uses random bits in the 8-4-4-4-12 hexadecimal format with version and variant bits set',
        'uses':['Generate test identifiers','Create mock database rows','Prepare sample API payloads','Fill spreadsheet IDs','Name temporary resources','Copy multiple IDs at once']
    }
]
PAGES = [
    ('about','About DevToolBox','Learn about DevToolBox, a free collection of browser-based developer utilities for formatting, encoding, decoding, and UUID generation.'),
    ('contact','Contact DevToolBox','Contact DevToolBox for feedback about free online developer tools on FreeToolsSpace.'),
    ('privacy-policy','Privacy Policy','Read the DevToolBox privacy policy for static browser-based tools that do not require accounts or uploads.'),
    ('cookie-policy','Cookie Policy','Read the DevToolBox cookie policy for this static tool collection.'),
    ('terms-of-use','Terms of Use','Read the DevToolBox terms of use for free educational browser utilities.'),
    ('disclaimer','Disclaimer','Read the DevToolBox disclaimer for browser-based developer utilities and generated outputs.'),
]

def esc(s): return html.escape(s, quote=True)

def head(title, desc, canonical, extra=''):
    return f'''<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>{esc(title)}</title><meta name="description" content="{esc(desc)}"><link rel="canonical" href="{canonical}"><meta property="og:type" content="website"><meta property="og:site_name" content="FreeToolsSpace"><meta property="og:title" content="{esc(title)}"><meta property="og:description" content="{esc(desc)}"><meta property="og:url" content="{canonical}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{esc(title)}"><meta name="twitter:description" content="{esc(desc)}"><link rel="stylesheet" href="/devtoolbox/assets/css/styles.css"><style>{THEME}</style>{extra}</head>'''

def header():
    return '''<header class="site-header"><nav class="navbar" aria-label="Main navigation"><a class="logo" href="/devtoolbox/"><span class="logo-mark">D</span><span>DevToolBox</span></a><div class="nav-links"><a href="/devtoolbox/tools/">Tools</a><a href="/devtoolbox/about/">About</a><a href="/devtoolbox/contact/">Contact</a><a href="/devtoolbox/privacy-policy/">Privacy</a></div></nav></header>'''

def footer():
    links = ''.join(f'<a href="/devtoolbox/{t["slug"]}/">{esc(t["name"])}</a>' for t in TOOLS)
    return f'''<footer class="site-footer"><div class="container footer-grid"><div><a class="logo" href="/devtoolbox/"><span class="logo-mark">D</span><span>DevToolBox</span></a><p>Free browser-based developer tools for JSON, Base64, URLs, and UUIDs.</p><p class="small">DevToolBox provides educational utilities. Review generated output before production use.</p></div><div><h3>Popular tools</h3>{links}</div><div><h3>Site pages</h3><a href="/devtoolbox/tools/">All tools</a><a href="/devtoolbox/about/">About</a><a href="/devtoolbox/contact/">Contact</a><a href="/devtoolbox/privacy-policy/">Privacy Policy</a><a href="/devtoolbox/cookie-policy/">Cookie Policy</a><a href="/devtoolbox/terms-of-use/">Terms of Use</a><a href="/devtoolbox/disclaimer/">Disclaimer</a></div><div><h3>About this site</h3><p>Free static developer utilities. No account, database, or paid API is required.</p><p>Contact: hello@freetoolsspace.com</p></div></div></footer><script src="/devtoolbox/assets/js/runtime.js" defer></script><script src="/devtoolbox/assets/js/site-tools.js" defer></script>'''

def cards():
    return ''.join(f'<a class="card" href="/devtoolbox/{t["slug"]}/"><span class="tag">{esc(t["tag"])}</span><h3>{esc(t["name"])}</h3><p>{esc(t["desc"])}</p></a>' for t in TOOLS)

SITE.mkdir()
(SITE/'assets/css').mkdir(parents=True)
(SITE/'assets/js').mkdir(parents=True)

css_src = (ROOT/'texttools/assets/css/styles.css').read_text()
(SITE/'assets/css/styles.css').write_text(css_src, encoding='utf-8')
(SITE/'assets/js/runtime.js').write_text((ROOT/'texttools/assets/js/runtime.js').read_text(), encoding='utf-8')

js = r'''(() => {
  const rt = ToolRuntime;
  const handlers = {
    'json-formatter'() {
      const raw = rt.$('#json')?.value || '';
      try {
        const parsed = JSON.parse(raw);
        const sortKeys = rt.bool('sortKeys');
        const normalize = (value) => {
          if (Array.isArray(value)) return value.map(normalize);
          if (value && typeof value === 'object') {
            const out = {};
            Object.keys(value).sort().forEach(k => { out[k] = normalize(value[k]); });
            return out;
          }
          return value;
        };
        const data = sortKeys ? normalize(parsed) : parsed;
        const pretty = JSON.stringify(data, null, 2);
        const minified = JSON.stringify(data);
        rt.setResult(`<div class="output-item"><h3>Valid JSON</h3><div class="kv"><strong>Characters</strong><span>${pretty.length}</span><strong>Minified characters</strong><span>${minified.length}</span><strong>Top-level type</strong><span>${Array.isArray(data) ? 'Array' : typeof data}</span></div><h3>Formatted output</h3><pre id="formatted-output">${rt.escapeHtml(pretty)}</pre><div class="actions"><button class="secondary" data-copy-target="formatted-output">Copy formatted JSON</button><button class="secondary" data-copy="${rt.escapeHtml(minified)}">Copy minified JSON</button></div></div>`, 'success');
      } catch (err) { rt.error(`Invalid JSON: ${err.message}`); }
    },
    'base64-tool'() {
      const text = rt.$('#text')?.value || '';
      const mode = rt.value('mode');
      try {
        let output = '';
        if (mode === 'Decode from Base64') output = new TextDecoder().decode(Uint8Array.from(atob(text.replace(/\s/g,'')), c => c.charCodeAt(0)));
        else output = btoa(String.fromCharCode(...new TextEncoder().encode(text)));
        rt.output('Base64 result', [['Mode', mode], ['Input characters', String(text.length)], ['Output characters', String(output.length)], ['Output', output]], output);
      } catch (err) { rt.error(`Could not ${mode.toLowerCase()}: ${err.message}`); }
    },
    'url-tool'() {
      const text = rt.$('#text')?.value || '';
      const mode = rt.value('mode');
      try {
        let output = mode === 'Decode component' ? decodeURIComponent(text) : mode === 'Encode full URL safely' ? encodeURI(text) : encodeURIComponent(text);
        rt.output('URL encoding result', [['Mode', mode], ['Input characters', String(text.length)], ['Output characters', String(output.length)], ['Output', output]], output);
      } catch (err) { rt.error(`URL conversion failed: ${err.message}`); }
    },
    'uuid-generator'() {
      const count = Math.max(1, Math.min(100, Number.parseInt(rt.value('count') || '1', 10)));
      const upper = rt.bool('uppercase');
      const ids = Array.from({length: count}, () => crypto.randomUUID()).map(id => upper ? id.toUpperCase() : id);
      const output = ids.join('\n');
      rt.setResult(`<div class="output-item"><h3>Generated UUIDs</h3><div class="kv"><strong>Count</strong><span>${ids.length}</span><strong>Version</strong><span>4</span></div><pre id="uuid-output">${rt.escapeHtml(output)}</pre><div class="actions"><button class="secondary" data-copy-target="uuid-output">Copy UUIDs</button></div></div>`, 'success');
    }
  };
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-calculate]');
    if (!button) return;
    try { handlers[button.dataset.calculate]?.(); } catch (error) { rt.error(error.message); }
  });
})();
'''
(SITE/'assets/js/site-tools.js').write_text(js, encoding='utf-8')

index_extra = '<script type="application/ld+json">'+json.dumps({"@context":"https://schema.org","@type":"CollectionPage","name":"DevToolBox","url":BASE,"description":"Free online developer tools for JSON formatting, Base64 encoding, URL encoding, and UUID generation."}, separators=(',',':'))+'</script>'
index_html = f'''<!doctype html><html lang="en">{head('DevToolBox | Free Online Developer Tools for JSON, Base64, URLs and UUIDs','Use DevToolBox on FreeToolsSpace for free browser-based JSON formatting, Base64 encoding, URL encoding, decoding, and UUID generation utilities.',BASE,index_extra)}<body>{header()}<main><section class="hero"><div class="container hero-grid"><div><p class="eyebrow">Developer tools</p><h1>Free Online Developer Tools</h1><p class="lede">Format JSON, encode or decode Base64, encode URLs, and generate UUIDs with fast static utilities that run directly in your browser.</p><div class="cta-row"><a class="button" href="/devtoolbox/tools/">Browse Tools</a><a class="button secondary" href="/devtoolbox/about/">About DevToolBox</a></div></div><div class="hero-card"><h2>Frontend-only utilities</h2><ul><li>No login, upload, or backend required</li><li>Useful for developers, students, testers, and technical writers</li><li>Copy-ready results on every tool page</li><li>FAQ, examples, and related links included</li></ul></div></div></section><section class="section"><div class="container"><h2>Popular Developer Tools</h2><p class="lede">Start with common formatter, encoder, decoder, and identifier utilities.</p><div class="grid">{cards()}</div></div></section><section class="section"><div class="container"><h2>Choose the right developer utility</h2><p class="lede">DevToolBox focuses on safe static tools for everyday frontend and API workflows. Use it to inspect JSON, prepare encoded strings, understand escaped URLs, or create random identifiers for mock data.</p><div class="grid"><div class="card"><span class="tag">JSON</span><h3>Format and validate snippets</h3><p>Use the JSON formatter when reading API responses, checking config files, or minifying sample payloads.</p></div><div class="card"><span class="tag">Encoding</span><h3>Base64 and URL conversion</h3><p>Use encoding tools for short text snippets, query parameters, documentation examples, and readable decoded values.</p></div><div class="card"><span class="tag">Identifiers</span><h3>Generate UUIDs locally</h3><p>Create one or many UUID v4 values for test records, seed data, temporary resources, and mock API examples.</p></div></div></div></section><section class="section"><div class="container"><div class="warning">DevToolBox provides educational browser-based developer utilities. Review generated output before using it in production systems.</div></div></section></main>{footer()}</body></html>'''
(SITE/'index.html').write_text(index_html, encoding='utf-8')
(SITE/'404.html').write_text(index_html.replace('<title>DevToolBox | Free Online Developer Tools for JSON, Base64, URLs and UUIDs</title>','<title>Page Not Found | DevToolBox</title>').replace('<h1>Free Online Developer Tools</h1>','<h1>Page Not Found</h1>').replace('Format JSON, encode or decode Base64, encode URLs, and generate UUIDs with fast static utilities that run directly in your browser.','The page was not found. Use the links below to open a DevToolBox utility.'), encoding='utf-8')

(SITE/'tools').mkdir()
tools_extra = '<script type="application/ld+json">'+json.dumps({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":BASE},{"@type":"ListItem","position":2,"name":"Tools","item":BASE+'tools/'}]}, separators=(',',':'))+'</script>'
tools_html = f'''<!doctype html><html lang="en">{head('DevToolBox Tools Index | Free Online Developer Utilities','Browse the full DevToolBox index for JSON formatting, Base64 encoding and decoding, URL encoding and decoding, and UUID generation.',BASE+'tools/',tools_extra)}<body>{header()}<main class="page-main"><div class="container"><div class="breadcrumb"><a href="/devtoolbox/">Home</a> / Tools</div><h1>Free Online Developer Tools</h1><p class="lede">Browse free JSON formatter, Base64 encoder decoder, URL encoder decoder, and UUID generator tools for everyday development tasks.</p><div class="grid">{cards()}</div></div></main>{footer()}</body></html>'''
(SITE/'tools/index.html').write_text(tools_html, encoding='utf-8')

for t in TOOLS:
    (SITE/t['slug']).mkdir()
    url = BASE + t['slug'] + '/'
    crumb = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":BASE},{"@type":"ListItem","position":2,"name":"Tools","item":BASE+'tools/'},{"@type":"ListItem","position":3,"name":t['name'],"item":url}]}
    faq = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":f"What does the {t['name']} do?","acceptedAnswer":{"@type":"Answer","text":t['desc']}},{"@type":"Question","name":"Is my data uploaded?","acceptedAnswer":{"@type":"Answer","text":"No. The tool runs in your browser on this static site."}},{"@type":"Question","name":"Can I use it on mobile?","acceptedAnswer":{"@type":"Answer","text":"Yes. The page is responsive and works on mobile browsers."}},{"@type":"Question","name":"Can I copy the result?","acceptedAnswer":{"@type":"Answer","text":"Yes. After processing, use the Copy Result button."}},{"@type":"Question","name":"Should I review generated output?","acceptedAnswer":{"@type":"Answer","text":"Yes. Review generated or converted output before using it in production systems."}}]}
    app = {"@context":"https://schema.org","@type":"SoftwareApplication","name":t['name'],"applicationCategory":"DeveloperApplication","operatingSystem":"Any","url":url,"offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}
    extra = ''.join('<script type="application/ld+json">'+json.dumps(x,separators=(',',':'))+'</script>' for x in (crumb,{"@context":"https://schema.org","@type":"WebPage","name":t['name'],"url":url,"description":t['desc']},app,faq))
    related = ''.join(f'<a href="/devtoolbox/{o["slug"]}/">{esc(o["name"])}</a>' for o in TOOLS if o['slug'] != t['slug']) + '<a href="/devtoolbox/tools/">All DevToolBox Tools</a>'
    use_cases = ''.join(f'<li>{esc(u)}</li>' for u in t['uses'])
    html_doc = f'''<!doctype html><html lang="en">{head(t['title'],t['desc'],url,extra)}<body>{header()}<main class="page-main"><div class="container"><div class="breadcrumb"><a href="/devtoolbox/">Home</a> / <a href="/devtoolbox/tools/">Tools</a> / {esc(t['name'])}</div><p class="eyebrow">{esc(t['tag'])}</p><h1>{esc(t['h1'])}</h1><p class="lede">{esc(t['lede'])}</p><div class="ad-slot" data-ad-position="top">Advertisement</div><div class="tool-layout"><section class="tool-card" data-tool="{esc(t['calc'])}"><h2>Free {esc(t['name'])}</h2><p class="small">This tool runs in your browser and does not upload your input. Results include a Copy Result button after processing.</p><div class="form-grid">{t['inputs']}</div><div class="actions"><button data-calculate="{esc(t['calc'])}">Process</button><button class="secondary" data-reset-tool>Reset</button></div></section><aside class="result-card"><h2>Results</h2><div id="result" class="output"><p class="small">Enter data and run the tool to see results here.</p></div><div class="ad-slot sidebar" data-ad-position="sidebar">Advertisement</div></aside></div><div class="ad-slot" data-ad-position="after-tool">Advertisement</div><article class="content"><section><h2>What this tool does</h2><p>The {esc(t['name'])} helps with {esc(t['keyword'])} tasks while keeping input in your own browser.</p></section><section><h2>Formula or rule</h2><div class="formula-box"><code>{esc(t['formula'])}</code></div></section><section><h2>Examples</h2><div class="example-list"><div><h3>Developer example</h3><p>Paste a small API value, config snippet, test string, or identifier list and process it before copying the result.</p></div><div><h3>Documentation example</h3><p>Use this tool when preparing README examples, query strings, sample payloads, or support notes.</p></div><div><h3>Testing example</h3><p>Use the output for quick mock data, local debugging, browser console checks, or QA notes.</p></div></div></section><section><h2>Common use cases</h2><ul class="use-case-grid">{use_cases}</ul></section><section><h2>Related tools</h2><div class="related">{related}</div></section><section><h2>Disclaimer</h2><p>DevToolBox provides educational browser-based developer utilities. Review generated or converted output before relying on it in production systems.</p></section><div class="ad-slot" data-ad-position="before-faq">Advertisement</div><section class="faq"><h2>FAQ</h2><details><summary>What does the {esc(t['name'])} do?</summary><p>{esc(t['desc'])}</p></details><details><summary>Is my data uploaded?</summary><p>No. The tool runs in your browser on this static site.</p></details><details><summary>Can I use it on mobile?</summary><p>Yes. The page is responsive and works on mobile browsers.</p></details><details><summary>Can I copy the result?</summary><p>Yes. After processing, use the Copy Result button.</p></details><details><summary>Should I review generated output?</summary><p>Yes. Review generated or converted output before using it in production systems.</p></details></section></article></div></main>{footer()}</body></html>'''
    (SITE/t['slug']/'index.html').write_text(html_doc, encoding='utf-8')

for slug, title, desc in PAGES:
    (SITE/slug).mkdir()
    body = f'''<!doctype html><html lang="en">{head(title+' | DevToolBox',desc,BASE+slug+'/')}<body>{header()}<main class="page-main"><div class="container"><div class="breadcrumb"><a href="/devtoolbox/">Home</a> / {esc(title)}</div><h1>{esc(title)}</h1><p class="lede">{esc(desc)}</p><article class="content"><p>DevToolBox is part of FreeToolsSpace and offers static browser utilities for common developer tasks. The tools are designed for quick educational and productivity use without accounts, uploads, databases, or backend processing.</p><p>For important production work, always review generated, encoded, decoded, or formatted output before using it in live systems.</p><h2>Popular tools</h2><div class="related">{''.join(f'<a href="/devtoolbox/{t["slug"]}/">{esc(t["name"])}</a>' for t in TOOLS)}</div></article></div></main>{footer()}</body></html>'''
    (SITE/slug/'index.html').write_text(body, encoding='utf-8')

# Update root homepage.
root_index = ROOT/'index.html'
text = root_index.read_text()
if '/devtoolbox/' in text:
    raise SystemExit('Collision: homepage already references /devtoolbox/.')
text = text.replace('Six independent browser tool sites', 'Seven independent browser tool sites')
text = text.replace('dates, unit conversions, math, wages, money, health, and lifestyle planning', 'dates, unit conversions, math, wages, money, health, lifestyle planning, text editing, and developer utilities')
text = text.replace('<a href="/texttools/">TextTools</a></div>', '<a href="/texttools/">TextTools</a><a href="/devtoolbox/">DevToolBox</a></div>')
text = text.replace('</ul>\n        <a class="open-link" href="/texttools/" aria-label="Open TextTools">Open TextTools →</a>\n      </article>\n      </div>', '</ul>\n        <a class="open-link" href="/texttools/" aria-label="Open TextTools">Open TextTools →</a>\n      </article>\n      <article class="tool-card" style="--accent:#2563eb">\n        <div class="card-index">07</div>\n        <p class="card-kicker">Developer Tools</p>\n        <h2><a href="/devtoolbox/">DevToolBox</a></h2>\n        <p>JSON formatting, Base64 encoding and decoding, URL encoding and decoding, and UUID generation.</p>\n        <ul><li>JSON Formatter</li><li>Base64 Encoder Decoder</li><li>UUID Generator</li></ul>\n        <a class="open-link" href="/devtoolbox/" aria-label="Open DevToolBox">Open DevToolBox →</a>\n      </article>\n      </div>')
text = text.replace('<li><a href="/texttools/">TextTools - word counter, character counter, case converter, and duplicate line remover</a></li></ul>', '<li><a href="/texttools/">TextTools - word counter, character counter, case converter, and duplicate line remover</a></li><li><a href="/devtoolbox/">DevToolBox - JSON formatter, Base64 encoder decoder, URL encoder decoder, and UUID generator</a></li></ul>')
text = text.replace('helping visitors and search engines find the right tool from the main hub or from each category index.', 'helping visitors and search engines find the right tool from the main hub or from each category index, including the new DevToolBox developer utilities.')
# Update JSON-LD graph minimally.
text = text.replace('{"@type":"ListItem","position":6,"name":"TextTools","url":"https://freetoolsspace.com/texttools/"}', '{"@type":"ListItem","position":6,"name":"TextTools","url":"https://freetoolsspace.com/texttools/"},{"@type":"ListItem","position":7,"name":"DevToolBox","url":"https://freetoolsspace.com/devtoolbox/"}')
root_index.write_text(text, encoding='utf-8')

# Update sitemap.
sitemap = ROOT/'sitemap.xml'
sm = sitemap.read_text()
if 'https://freetoolsspace.com/devtoolbox/' in sm:
    raise SystemExit('Collision: sitemap already references devtoolbox.')
urls = ['devtoolbox/','devtoolbox/tools/'] + [f'devtoolbox/{t["slug"]}/' for t in TOOLS] + [f'devtoolbox/{slug}/' for slug,_,_ in PAGES]
entries = ''.join(f'''  <url>\n    <loc>https://freetoolsspace.com/{u}</loc>\n    <lastmod>{TODAY}</lastmod>\n    <changefreq>{'weekly' if u in ['devtoolbox/','devtoolbox/tools/'] else 'monthly'}</changefreq>\n    <priority>{'0.8' if u == 'devtoolbox/' else '0.7'}</priority>\n  </url>\n''' for u in urls)
sm = sm.replace('</urlset>', entries + '</urlset>')
sitemap.write_text(sm, encoding='utf-8')

print('Created DevToolBox with', len(TOOLS), 'tools at', SITE)
print('Updated root index and sitemap entries:', len(urls))
