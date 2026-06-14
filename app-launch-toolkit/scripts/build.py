from pathlib import Path
from html import escape
from shutil import copyfile, rmtree
import json

DIST = Path('dist')
BASE_URL = 'https://applaunchtoolkit.com'
SITE_NAME = 'App Launch Toolkit'
DISCLAIMER = 'This website is an independent toolset for app developers and is not affiliated with Apple Inc. App Store, iPhone, iPad, and related names are trademarks of Apple Inc.'

TOOLS = [
    ('screenshot-size-checker','app-store-screenshot-size-checker','App Store Screenshot Size Checker','App Store Screenshot Size Checker | Free iPhone & iPad Image Validator','Check if your App Store screenshots match common iPhone and iPad screenshot dimensions before uploading them to App Store Connect.','Image validation'),
    ('screenshot-resizer','app-store-screenshot-resizer','App Store Screenshot Resizer','App Store Screenshot Resizer | Resize iPhone & iPad Screenshots Online','Resize app screenshots for common App Store device sizes using a free browser-based tool. No upload required.','Image resizing'),
    ('title-generator','app-store-title-generator','App Store Title Generator','App Store Title Generator | Free App Name Ideas for iOS Apps','Generate App Store title ideas based on your app category, audience, features, and keywords.','Metadata writing'),
    ('subtitle-generator','app-store-subtitle-generator','App Store Subtitle Generator','App Store Subtitle Generator | Free iOS App Subtitle Ideas','Create short App Store subtitle ideas that describe your app’s core value, features, and audience.','Metadata writing'),
    ('keyword-counter','app-store-keyword-counter','App Store Keyword Counter','App Store Keyword Counter | Count Characters for ASO Keywords','Count characters in your App Store keyword field, clean duplicate words, and organize ASO keywords before submission.','ASO formatting'),
    ('whats-new-generator','whats-new-generator','App Store What’s New Generator','App Store What’s New Generator | Free Release Notes Writer','Generate clear App Store release notes for bug fixes, new features, improvements, and localization updates.','Release notes'),
    ('review-notes-generator','app-review-notes-generator','App Review Notes Generator','App Review Notes Generator | Free App Store Review Instructions Template','Create clear App Store review notes with test account, login steps, subscription details, and reviewer instructions.','Submission templates'),
    ('privacy-policy-generator','privacy-policy-generator','App Privacy Policy Generator','App Privacy Policy Generator | Free Template for iOS Apps','Create a starter privacy policy template for your iOS app with simple required fields and dropdown-based privacy options.','Legal template'),
    ('terms-generator','terms-of-use-generator','Terms of Use Generator','Terms of Use Generator | Free App Terms Template for iOS Apps','Generate a starter Terms of Use template for your app with accounts, subscriptions, user content, and usage rules.','Legal template'),
    ('aso-keyword-generator','aso-keyword-generator','ASO Keyword Generator','ASO Keyword Generator | Free App Store Keyword Ideas','Generate App Store keyword ideas from your app category, features, audience, and competitor-style terms.','ASO research'),
    ('localization-checklist','app-localization-checklist','App Localization Checklist','App Localization Checklist | Free iOS App Translation QA Tool','Generate a localization checklist for your iOS app, App Store metadata, screenshots, privacy policy, and in-app strings.','Launch checklist'),
    ('subscription-price-calculator','subscription-price-calculator','App Subscription Price Calculator','App Subscription Price Calculator | Monthly, Quarterly & Annual Pricing Tool','Compare monthly, quarterly, and yearly subscription prices for your app and estimate discounts, revenue, and local currency display.','Pricing'),
    ('listing-checker','app-store-listing-checker','App Store Listing Checker','App Store Listing Checker | Review Your App Metadata Before Submission','Check your App Store listing draft for title, subtitle, keywords, description, screenshots, privacy policy, and review notes.','Submission QA'),
]

GUIDES = [
    ('app-store-screenshot-sizes','App Store Screenshot Sizes Guide','App Store Screenshot Sizes Guide | iPhone & iPad Dimensions','Learn how to prepare iPhone and iPad App Store screenshots, understand common dimensions, and avoid upload issues.','app-store-screenshot-size-checker'),
    ('how-to-write-app-store-subtitle','How to Write App Store Subtitle','How to Write an App Store Subtitle | Examples & Checklist','Write a clear App Store subtitle that explains your app value, audience, and key feature without keyword stuffing.','app-store-subtitle-generator'),
    ('app-store-keyword-field-guide','App Store Keyword Field Guide','App Store Keyword Field Guide | ASO Keyword Formatting Tips','Understand how to organize App Store keyword field drafts, count characters, remove duplicates, and avoid risky terms.','app-store-keyword-counter'),
    ('app-privacy-policy-url-guide','App Privacy Policy URL Guide','App Privacy Policy URL Guide | What iOS Apps Should Include','Prepare a privacy policy URL for App Store Connect with analytics, ads, account, data deletion, and contact information.','privacy-policy-generator'),
    ('app-store-review-notes-guide','App Store Review Notes Guide','App Store Review Notes Guide | Test Accounts & Reviewer Instructions','Write clear App Review notes with login details, test steps, subscriptions, region notes, and support contact information.','app-review-notes-generator'),
    ('app-store-localization-checklist','App Store Localization Checklist Guide','App Store Localization Checklist Guide | iOS Translation QA','Plan app localization QA across App Store metadata, screenshots, in-app strings, legal pages, subscriptions, and support.','app-localization-checklist'),
]

TEMPLATES = [
    ('app-review-notes-template','App Review Notes Template','App Review Notes Template | Copyable App Store Reviewer Instructions','Copy a practical App Review notes template for login, test accounts, subscriptions, demo videos, and reviewer instructions.','app-review-notes-generator','Hello App Review Team,\n\nThank you for reviewing [App Name].\n\nTest Account:\nUsername: [test username]\nPassword: [test password]\n\nMain features to review:\n1. [feature]\n2. [feature]\n3. [feature]\n\nThank you.'),
    ('app-privacy-policy-template','App Privacy Policy Template','App Privacy Policy Template | Starter Template for iOS Apps','Copy a starter privacy policy template for iOS apps and customize sections for data collection, analytics, and user rights.','privacy-policy-generator','Privacy Policy\nEffective Date: [date]\n\nInformation We Collect\n- [data categories]\n\nHow We Use Information\n[explain purposes]\n\nContact\n[email]\n\nThis template is not legal advice.'),
    ('app-store-submission-checklist','App Store Submission Checklist','App Store Submission Checklist | Copyable iOS Launch QA Template','Use a copyable App Store submission checklist for metadata, screenshots, privacy links, review notes, subscriptions, and QA.','app-store-listing-checker','# App Store Submission Checklist\n- [ ] App name is final\n- [ ] Subtitle is clear\n- [ ] Keywords are counted\n- [ ] Screenshots are checked\n- [ ] Privacy Policy URL works\n- [ ] Review notes are complete'),
    ('app-localization-checklist-template','App Localization Checklist Template','App Localization Checklist Template | Copyable iOS Translation QA','Copy a localization QA checklist for App Store metadata, screenshots, app strings, legal content, notifications, and release tasks.','app-localization-checklist','# App Localization Checklist\n- [ ] Metadata localized\n- [ ] Screenshots translated\n- [ ] In-app strings tested\n- [ ] Legal links reviewed\n- [ ] Subscription copy checked'),
]

PAGES = [
    ('about','About','About App Launch Toolkit | Independent App Store Tools','Learn about App Launch Toolkit, an independent free toolset that helps indie developers prepare App Store submissions.'),
    ('contact','Contact','Contact App Launch Toolkit | Feedback & Bug Reports','Contact App Launch Toolkit to send feedback, report tool issues, or suggest new App Store launch resources.'),
    ('privacy-policy','Privacy Policy','Privacy Policy | App Launch Toolkit','Read how App Launch Toolkit handles analytics, cookies, advertising disclosures, browser-local tools, and contact information.'),
    ('terms','Terms','Terms of Use | App Launch Toolkit','Read the App Launch Toolkit terms for using free App Store tools, templates, calculators, and guides.'),
]

FAQ = [
    ('Does this tool guarantee App Store approval?', 'No. It helps you prepare and check common issues, but final requirements and review decisions are controlled by App Store Connect and Apple review processes.'),
    ('Is this website affiliated with Apple?', 'No. This is an independent toolset for developers and is not affiliated with Apple Inc.'),
    ('Do the tools upload my files?', 'Image tools run in your browser and do not upload files from this static site.'),
    ('Should I verify official requirements?', 'Yes. Always confirm current requirements in App Store Connect and official Apple documentation before submission.'),
    ('Can I use these tools for commercial apps?', 'Yes, but you are responsible for validating metadata, legal text, pricing, and submission details for your app.'),
]

TOOL_SEO = {
    'app-store-title-generator': {
        'intent': 'app name ideas, App Store title examples, iOS app name generator, ASO title generator',
        'sections': [
            ('How to write an App Store title that users understand', 'Start with the words a real user would use to describe the app. A good App Store title usually combines a memorable brand name with a plain-language category or benefit, such as a planner, scanner, tracker, editor, timer, budget tool, or habit app. The title should make sense in search results before a user reads the subtitle or screenshots.'),
            ('App name ideas vs ASO keywords', 'Keywords can help clarify what the app does, but the title still needs to sound trustworthy. Avoid stuffing several search terms into one name. If the brand is already strong, keep the title clean and use the subtitle, keyword field, and description to explain the use case. If the brand is new, one relevant category phrase can make the listing easier to understand.'),
            ('Title checklist before App Store submission', 'Check that the name is easy to pronounce, does not imply a feature the app lacks, avoids protected trademarks, and still reads clearly on small screens. Review competing search results, but do not copy competitor names or positioning. Keep several backup ideas because availability, legal review, or product positioning may change before launch.'),
            ('Examples of useful title patterns', 'Common patterns include Brand + Category, Brand + Main Benefit, Category + Audience, and Short Brand + Keyword. For example, a focus timer might test names around focus, Pomodoro, study, timer, sessions, and deep work, then choose the version that best matches the actual product experience.')
        ],
        'faq': [
            ('What is an App Store title generator?', 'It is a brainstorming tool that creates app name ideas from your category, audience, feature, benefit, brand, and keyword inputs.'),
            ('Should my app title include a keyword?', 'Use a keyword only when it improves clarity and accurately describes the app. A readable title is usually better than a stuffed title.'),
            ('How do I choose between several app name ideas?', 'Shortlist names that are clear, memorable, available, and aligned with the app’s main value. Then review them with the subtitle and screenshots as a complete listing.'),
            ('Can this tool check trademark availability?', 'No. You should perform your own legal and marketplace checks before publishing a final name.'),
            ('Does changing my app title improve rankings?', 'A clearer title can help relevance and conversion, but no generator can guarantee ranking or downloads.')
        ]
    },
    'app-store-subtitle-generator': {
        'intent': 'App Store subtitle examples, iOS subtitle generator, app subtitle ideas, ASO subtitle writing',
        'sections': [
            ('What an App Store subtitle should do', 'The subtitle should explain the app’s core value in one compact phrase. It can name the user, the task, the benefit, or the main feature. The best subtitles are specific enough to help a user decide whether the app matches their need, but short enough to stay readable in search and product pages.'),
            ('Subtitle examples by intent', 'A productivity app might emphasize planning, focus, notes, or reminders. A fitness app might highlight workouts, tracking, coaching, or habits. A finance app might mention budgets, bills, expenses, or savings. Use words that describe the real product rather than generic claims such as best, ultimate, or number one.'),
            ('How to use keywords naturally', 'Choose one primary phrase that belongs in the subtitle and write around user benefit. If the phrase sounds awkward, move it to the keyword field or description. The subtitle should support conversion as well as discovery, so clarity matters more than maximum keyword density.'),
            ('Before you save the subtitle', 'Read the title and subtitle together. Remove repeated words unless repetition is intentional. Check character limits in App Store Connect, verify localization needs, and make sure the phrase still matches the screenshots, onboarding, and feature set users will actually see.')
        ],
        'faq': [
            ('What is an App Store subtitle generator?', 'It creates short subtitle ideas from your app type, benefit, feature, audience, keyword, tone, and words to avoid.'),
            ('How long should an App Store subtitle be?', 'Use the current limit shown in App Store Connect. Many teams draft around 30 characters, then verify before release.'),
            ('Can I repeat words from the app title?', 'Avoid unnecessary repetition. Use the subtitle to add a new benefit, audience, or feature clue.'),
            ('Should I localize subtitles?', 'Yes, important markets should get localized subtitles based on local search intent rather than direct translation only.'),
            ('Can a better subtitle increase downloads?', 'A clearer subtitle can improve understanding and conversion, but downloads depend on many listing and product factors.')
        ]
    },
    'app-store-listing-checker': {
        'intent': 'App Store submission checklist, app listing checker, iOS metadata checklist, App Store launch QA',
        'sections': [
            ('What to check before submitting an App Store listing', 'A strong listing connects metadata, screenshots, links, review notes, and app behavior. Before submission, verify that the title, subtitle, keywords, description, promotional text, privacy policy URL, support URL, screenshots, and review instructions all describe the same product accurately.'),
            ('High-risk gaps that delay review', 'Common avoidable issues include broken privacy links, missing test accounts, unclear subscription instructions, screenshots that do not match the app, vague review notes, keyword stuffing, unsupported claims, and metadata that references unavailable features. Fix these before sending the build to review.'),
            ('How to use the readiness score', 'The score is a prioritization aid, not a guarantee. Treat critical issues as blockers, recommendations as pre-launch improvements, and nice-to-have notes as polish. Re-run the check after every meaningful metadata change or major app update.'),
            ('Build a repeatable launch QA workflow', 'Save a copy of your checklist for each release. Review links on mobile, test credentials in a clean environment, confirm screenshots by device family, and keep a short change log of metadata decisions so future updates are faster and safer.')
        ],
        'faq': [
            ('What is an App Store listing checker?', 'It is a pre-submission checklist that reviews metadata, links, screenshots, privacy policy, review notes, and login-test readiness.'),
            ('Does this checker guarantee App Review approval?', 'No. It helps catch common preparation gaps, but Apple controls review requirements and decisions.'),
            ('What should I fix first?', 'Fix broken links, missing privacy policy URLs, missing test accounts for login apps, inaccurate screenshots, and misleading metadata first.'),
            ('Should I use it for updates or only first launches?', 'Use it for first launches, major updates, pricing changes, localization launches, and any release that changes metadata or review instructions.'),
            ('Can this replace App Store Connect validation?', 'No. Use it before submission, then verify everything again inside App Store Connect.')
        ]
    }
}

TOOL_BY_SLUG = {slug: name for _, slug, name, *_ in TOOLS}
ROUTES = []


def abs_url(path):
    return f'{BASE_URL}{path}'


def nav():
    links = ''.join(f'<a href="/{href}/">{label}</a>' for label, href in [('Tools','tools'),('Guides','guides'),('Templates','templates'),('About','about')])
    return f'<header class="site-header"><nav class="navbar"><a class="logo" href="/"><span class="logo-mark">A</span><span>{SITE_NAME}</span></a><div class="nav-links">{links}</div></nav></header>'


def footer():
    return f'''<footer class="site-footer"><div class="container footer-grid"><div><a class="logo" href="/"><span class="logo-mark">A</span><span>{SITE_NAME}</span></a><p>Free App Store tools for indie developers.</p><p class="small">{escape(DISCLAIMER)}</p></div><div><h3>Tools</h3><a href="/tools/app-store-screenshot-size-checker/">Screenshot Checker</a><a href="/tools/app-store-subtitle-generator/">Subtitle Generator</a><a href="/tools/app-store-listing-checker/">Listing Checker</a></div><div><h3>Guides</h3><a href="/guides/app-store-screenshot-sizes/">Screenshot Sizes</a><a href="/guides/app-store-keyword-field-guide/">Keyword Field</a><a href="/guides/app-privacy-policy-url-guide/">Privacy URL</a></div><div><h3>Company</h3><a href="/about/">About</a><a href="/contact/">Contact</a><a href="/privacy-policy/">Privacy Policy</a><a href="/terms/">Terms</a></div></div></footer>'''


def schema_tag(obj):
    return f'<script type="application/ld+json">{json.dumps(obj, ensure_ascii=False)}</script>'


def layout(path, title, desc, body, schemas=None):
    schemas = schemas or []
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>{escape(title)}</title><meta name="description" content="{escape(desc)}"><link rel="canonical" href="{abs_url(path)}"><meta property="og:type" content="website"><meta property="og:site_name" content="{SITE_NAME}"><meta property="og:title" content="{escape(title)}"><meta property="og:description" content="{escape(desc)}"><meta property="og:url" content="{abs_url(path)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{escape(title)}"><meta name="twitter:description" content="{escape(desc)}"><link rel="stylesheet" href="/assets/css/styles.css">{''.join(schema_tag(s) for s in schemas)}</head><body>{nav()}{body}{footer()}<script src="/assets/js/tools.js" defer></script></body></html>'''


def breadcrumb(items):
    html = '<div class="breadcrumb">' + ' / '.join(f'<a href="{href}">{escape(label)}</a>' if i < len(items)-1 else escape(label) for i, (label, href) in enumerate(items)) + '</div>'
    schema = {'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':i+1,'name':label,'item':abs_url(href)} for i,(label,href) in enumerate(items)]}
    return html, schema


def faq_schema(items=None):
    items = items or FAQ
    return {'@context':'https://schema.org','@type':'FAQPage','mainEntity':[{'@type':'Question','name':q,'acceptedAnswer':{'@type':'Answer','text':a}} for q,a in items]}


def faq_html(items=None):
    items = items or FAQ
    return '<section class="faq"><h2>FAQ</h2>' + ''.join(f'<details><summary>{escape(q)}</summary><p>{escape(a)}</p></details>' for q,a in items) + '</section>'


def seo_sections(slug, name):
    custom = TOOL_SEO.get(slug)
    if custom:
        intent = f'<section class="search-intent"><h2>Search intent covered</h2><p>This page targets practical queries around {escape(custom["intent"])}. The tool is designed for developers who need a fast draft or preflight check before working in App Store Connect.</p></section>'
        body = ''.join(f'<section><h2>{escape(heading)}</h2><p>{escape(copy)}</p></section>' for heading, copy in custom['sections'])
        return intent + body
    return ''.join(f'<section><h2>{heading}</h2><p>{escape(name)} helps independent developers prepare a stronger App Store submission. Use the tool output as a practical draft, then verify final limits, dimensions, and policy details in App Store Connect before publishing.</p></section>' for heading in ['How it works','Best practices','Common mistakes','Before you submit'])


def related_links(slug):
    related = {
        'app-store-title-generator': [('Subtitle Generator','/tools/app-store-subtitle-generator/'),('ASO Keyword Generator','/tools/aso-keyword-generator/'),('Keyword Counter','/tools/app-store-keyword-counter/')],
        'app-store-subtitle-generator': [('Title Generator','/tools/app-store-title-generator/'),('Subtitle Guide','/guides/how-to-write-app-store-subtitle/'),('ASO Keyword Generator','/tools/aso-keyword-generator/')],
        'app-store-listing-checker': [('Submission Checklist Template','/templates/app-store-submission-checklist/'),('Privacy Policy Generator','/tools/privacy-policy-generator/'),('Review Notes Generator','/tools/app-review-notes-generator/')]
    }.get(slug, [])
    if not related:
        return ''
    return '<section><h2>Related App Store launch resources</h2><div class="related">' + ''.join(f'<a href="{href}">{escape(label)}</a>' for label, href in related) + '</div></section>'


def tool_form(tool_id):
    forms = {
        'screenshot-size-checker': '<div class="form-grid"><label class="full">Screenshots<input id="imageFiles" type="file" accept="image/png,image/jpeg" multiple></label><label>Device category<select id="platform"><option>Auto Detect</option><option>iPhone</option><option>iPad</option><option>Mac</option><option>Apple Watch</option></select></label><label>Orientation<select id="orientation"><option>Auto</option><option>Portrait</option><option>Landscape</option></select></label></div><div class="actions"><button id="checkScreenshots">Check screenshots</button></div>',
        'screenshot-resizer': '<div class="form-grid"><label class="full">Screenshot image<input id="resizeImage" type="file" accept="image/png,image/jpeg"></label><label>Target size<select id="targetSize"><option value="1320x2868">iPhone 6.9 — 1320×2868</option><option value="1290x2796">iPhone 6.7 — 1290×2796</option><option value="1242x2688">iPhone 6.5 — 1242×2688</option><option value="2064x2752">iPad Pro 13 — 2064×2752</option><option value="2048x2732">iPad Pro 12.9 — 2048×2732</option><option value="2880x1800">Mac 16:10 — 2880×1800</option></select></label><label>Fit mode<select id="fitMode"><option value="contain">Contain with background</option><option value="cover">Cover and crop</option><option value="stretch">Stretch, not recommended</option></select></label><label>Background color<input id="bgColor" type="color" value="#ffffff"></label><label>Output format<select id="outputFormat"><option value="image/png">PNG</option><option value="image/jpeg">JPG</option></select></label><label>JPG quality<input id="quality" type="range" min="50" max="100" value="92"></label></div><div class="actions"><button id="resizeButton">Resize screenshot</button><a id="downloadImage" class="button secondary" download="app-store-screenshot.png" href="#">Download</a></div><canvas id="resizeCanvas"></canvas>',
        'title-generator': '<div class="form-grid"><label>App category<input id="category" value="Productivity"></label><label>Main function<input id="mainFunction"></label><label>Target audience<input id="audience"></label><label>Primary keyword<input id="primaryKeyword"></label><label>Secondary keyword<input id="secondaryKeyword"></label><label>Brand name<input id="brand"></label><label>Tone<select id="tone"><option>Simple</option><option>Professional</option><option>Friendly</option><option>Premium</option><option>Playful</option></select></label><label>Length preference<select id="lengthPref"><option>Short</option><option>Medium</option><option>Keyword-rich</option></select></label></div><div class="actions"><button id="generateTitles">Generate titles</button></div>',
        'subtitle-generator': '<div class="form-grid"><label>App type<input id="appType"></label><label>Main benefit<input id="benefit"></label><label>Top feature<input id="feature"></label><label>Target user<input id="audience"></label><label>Primary keyword<input id="primaryKeyword"></label><label>Tone<select id="tone"><option>Simple</option><option>Professional</option><option>Friendly</option></select></label><label class="full">Avoid words<input id="avoidWords"></label></div><div class="actions"><button id="generateSubtitles">Generate subtitles</button></div>',
        'keyword-counter': '<div class="form-grid"><label class="full">Keyword textarea<textarea id="keywords"></textarea></label><label>Separator mode<select id="separator"><option value="comma">comma</option><option value="space">space</option><option value="line">line break</option></select></label><label>Target limit<input id="limit" type="number" value="100"></label></div><div class="actions"><button id="analyzeKeywords">Analyze</button><button class="secondary" id="cleanKeywords">Clean format</button></div>',
        'whats-new-generator': '<div class="form-grid"><label>Update type<select id="updateType"><option>Bug fixes</option><option>New features</option><option>Mixed</option></select></label><label>App name<input id="appName"></label><label class="full">New features<textarea id="features"></textarea></label><label class="full">Fixed issues<textarea id="fixes"></textarea></label><label class="full">Improvements<textarea id="improvements"></textarea></label><label>Tone<select id="tone"><option>Simple</option><option>Friendly</option><option>Professional</option><option>Short</option></select></label><label class="check-row"><input id="thanks" type="checkbox" checked> Include thank-you line</label></div><div class="actions"><button id="generateNotes">Generate release notes</button></div>',
        'review-notes-generator': '<div class="form-grid"><label>App name<input id="appName"></label><label>Requires login?<select id="requiresLogin"><option>No</option><option>Yes</option></select></label><label>Test username<input id="username"></label><label>Test password<input id="password" type="password"></label><label>Subscription or IAP?<select id="hasIap"><option>No</option><option>Yes</option></select></label><label class="full">Key features<textarea id="features"></textarea></label><label class="full">Special configuration<textarea id="config"></textarea></label><label>Region restrictions<input id="regions"></label><label>Demo video URL<input id="demoUrl"></label><label>Contact email<input id="email"></label></div><div class="actions"><button id="generateReviewNotes">Generate review notes</button></div><p class="warning">Use a dedicated test account. Do not enter sensitive production passwords.</p>',
        'privacy-policy-generator': '<p class="warning">This generator is informational only and is not legal advice. It now asks only for the essentials; most privacy choices are dropdowns.</p><div class="form-grid"><label>Developer / company name<input id="developer" placeholder="Example Studio"></label><label>App name<input id="appName" placeholder="FocusKit"></label><label>Contact email<input id="email" placeholder="privacy@example.com"></label><label>App type<select id="appType"><option>Utility / productivity app</option><option>Content or community app</option><option>Health, finance, or sensitive-data app</option><option>Kids or family app</option><option>Other app</option></select></label><label>Data collected<select id="dataProfile"><option>Basic analytics only</option><option>No personal data</option><option>Account and profile data</option><option>User content or photos</option><option>Health, finance, or sensitive data</option></select></label><label>Login accounts<select id="accounts"><option>No accounts</option><option>Optional accounts</option><option>Required accounts</option></select></label><label>Payments or subscriptions<select id="payments"><option>No payments</option><option>Subscriptions or in-app purchases</option></select></label><label>Ads / analytics<select id="tracking"><option>Analytics only</option><option>No ads or analytics</option><option>Ads and analytics</option></select></label><label>Data deletion<select id="deletionMode"><option>Email request</option><option>In-app account deletion</option><option>No account data stored</option></select></label><label class="full">Third-party services (optional)<input id="services" placeholder="Firebase, RevenueCat, AdMob"></label></div><div class="actions"><button id="generatePolicy">Generate policy</button><button class="secondary" id="downloadPolicyTxt">Download .txt</button><button class="secondary" id="downloadPolicyMd">Download .md</button></div>',
        'terms-generator': '<p class="warning">This generator creates a general Terms of Use starting point. It is not legal advice.</p><div class="form-grid"><label>Developer / company name<input id="developer" placeholder="Example Studio"></label><label>App name<input id="appName" placeholder="FocusKit"></label><label>Contact email<input id="email" placeholder="support@example.com"></label><label>App type<select id="appType"><option>Utility / productivity app</option><option>Content or community app</option><option>Health, finance, or sensitive-data app</option><option>Kids or family app</option><option>Other app</option></select></label><label>Accounts<select id="accounts"><option>No accounts</option><option>Optional accounts</option><option>Required accounts</option></select></label><label>Payments<select id="payments"><option>No paid features</option><option>Subscriptions or in-app purchases</option></select></label><label>User content<select id="userContent"><option>No user-generated content</option><option>Users can create or upload content</option></select></label><label>Minimum age<select id="age"><option>13+</option><option>16+</option><option>18+</option><option>No age-specific statement</option></select></label><label class="full">Governing law / region (optional)<input id="region" placeholder="California, United States"></label></div><div class="actions"><button id="generateTerms">Generate terms</button><button class="secondary" id="downloadTermsTxt">Download .txt</button><button class="secondary" id="downloadTermsMd">Download .md</button></div>',
        'aso-keyword-generator': '<div class="form-grid"><label>App category<input id="category"></label><label>Core feature<input id="feature"></label><label>Target audience<input id="audience"></label><label>Problem solved<input id="problem"></label><label>Primary keyword<input id="primaryKeyword"></label><label>Country / language<input id="locale"></label><label class="full">Competitor terms<input id="competitors"></label><label>Tone<select id="tone"><option value="broad">broad</option><option value="long-tail">long-tail</option><option value="feature-focused">feature-focused</option></select></label></div><div class="actions"><button id="generateKeywords">Generate keywords</button></div>',
        'localization-checklist': '<div class="form-grid"><label class="full">Target languages<input id="languages"></label><label>App type<input id="appType"></label><label>Has subscriptions?<select id="subscriptions"><option>No</option><option>Yes</option></select></label><label>Has login?<select id="login"><option>No</option><option>Yes</option></select></label><label>Has push notifications?<select id="push"><option>No</option><option>Yes</option></select></label><label>Has localized screenshots?<select id="screenshots"><option>No</option><option>Yes</option></select></label><label>Has privacy policy localized?<select id="privacy"><option>No</option><option>Yes</option></select></label><label>Has customer support email?<select id="support"><option>Yes</option><option>No</option></select></label></div><div class="actions"><button id="generateChecklist">Generate checklist</button><button class="secondary" id="printChecklist">Print</button><button class="secondary" id="downloadChecklist">Download Markdown</button></div>',
        'subscription-price-calculator': '<div class="form-grid"><label>Monthly price<input id="monthly" type="number" step="0.01" value="4.99"></label><label>Currency<input id="currency" value="USD"></label><label>Quarterly discount %<input id="quarterlyDiscount" type="number" value="10"></label><label>Annual discount %<input id="annualDiscount" type="number" value="30"></label><label>Estimated monthly subscribers<input id="subscribers" type="number" value="1000"></label><label>Apple commission<select id="commission"><option value="0.15">15%</option><option value="0.30">30%</option><option value="custom">custom</option></select></label><label>Custom commission %<input id="customCommission" type="number" value="15"></label><label>Monthly churn %<input id="churn" type="number" value="0"></label></div><div class="actions"><button id="calculatePricing">Calculate</button></div>',
        'listing-checker': '<div class="form-grid"><label>App name<input id="appName"></label><label>Subtitle<input id="subtitle"></label><label class="full">Keyword field<textarea id="keywords"></textarea></label><label class="full">Description<textarea id="description"></textarea></label><label>Promotional text<input id="promo"></label><label>What\'s New<input id="whatsNew"></label><label>Privacy Policy URL<input id="privacyUrl"></label><label>Support URL<input id="supportUrl"></label><label>Marketing URL<input id="marketingUrl"></label><label>Number of screenshots<input id="screenshots" type="number" value="0"></label><label>Has review notes?<select id="reviewNotes"><option>No</option><option>Yes</option></select></label><label>Requires login?<select id="requiresLogin"><option>No</option><option>Yes</option></select></label><label>Has test account?<select id="testAccount"><option>No</option><option>Yes</option></select></label></div><div class="actions"><button id="checkListing">Check listing</button></div>'
    }
    return forms[tool_id]


def card(slug, name, desc, prefix):
    return f'<a class="card" href="/{prefix}/{slug}/"><span class="tag">Free</span><h3>{escape(name)}</h3><p>{escape(desc)}</p></a>'


def write_route(path, html):
    ROUTES.append(path)
    if path == '/':
        target = DIST / 'index.html'
    elif path.endswith('.html'):
        target = DIST / path.lstrip('/')
    else:
        target = DIST / path.lstrip('/') / 'index.html'
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(html, encoding='utf-8')


def render_home():
    tool_cards = ''.join(card(slug, name, desc, 'tools') for _, slug, name, _, desc, _ in TOOLS[:6])
    workflow = '<section class="section"><div class="container"><div class="content"><h2>App Store launch workflow</h2><p>Start with a clear app title, write a subtitle that explains the core value, then run a final listing check before submission. This workflow helps indie developers cover ASO metadata, App Store review notes, screenshots, privacy links, and launch QA without creating an account.</p><div class="related"><a href="/tools/app-store-title-generator/">Generate title ideas</a><a href="/tools/app-store-subtitle-generator/">Write subtitle options</a><a href="/tools/app-store-listing-checker/">Check the listing</a><a href="/templates/app-store-submission-checklist/">Copy the submission checklist</a></div></div></div></section>'
    body = f'<main><section class="hero"><div class="container hero-grid"><div><p class="eyebrow">Free App Store tools</p><h1>Free App Store Tools for Indie Developers</h1><p class="lede">Prepare screenshots, metadata, keywords, release notes, privacy links, and launch checklists before submitting your app.</p><div class="cta-row"><a class="button" href="/tools/">Browse Tools</a><a class="button secondary" href="/guides/">Read SEO Guides</a></div></div><div class="hero-card"><h2>Launch-ready checks</h2><ul><li>Browser-local image and text tools</li><li>SEO-friendly guides and templates</li><li>No backend required</li><li>Independent from Apple Inc.</li></ul></div></div></section><section class="section"><div class="container"><h2>Popular Tools</h2><div class="grid">{tool_cards}</div></div></section>{workflow}<section class="section"><div class="container"><div class="warning">{escape(DISCLAIMER)}</div></div></section></main>'
    write_route('/', layout('/', 'Free App Store Tools for Indie Developers | App Launch Toolkit', 'Free tools for App Store screenshots, ASO keywords, subtitles, release notes, privacy policies, review notes, and iOS app launch checklists.', body))


def render_tool(tool):
    tool_id, slug, name, title, desc, category = tool
    path = f'/tools/{slug}/'
    bc, bc_schema = breadcrumb([('Home','/'),('Tools','/tools/'),(name,path)])
    sections = seo_sections(slug, name)
    faqs = TOOL_SEO.get(slug, {}).get('faq', FAQ)
    body = f'<main class="page-main"><div class="container">{bc}<p class="eyebrow">{escape(category)}</p><h1>{escape(name)}</h1><p class="lede">{escape(desc)}</p><div class="tool-layout"><section class="tool-card" data-tool="{tool_id}"><h2>Free {escape(name)}</h2><p class="small">This tool runs in your browser and does not require a backend account.</p>{tool_form(tool_id)}</section><aside class="result-card"><h2>Results</h2><div id="result" class="output"><p class="small">Enter details and run the tool to see results here.</p></div></aside></div><article class="content">{sections}{related_links(slug)}<section><h2>Disclaimer</h2><p>{escape(DISCLAIMER)}</p><p>Apple may update requirements. Always confirm final submission details in App Store Connect before publishing.</p></section>{faq_html(faqs)}</article></div></main>'
    app_schema = {'@context':'https://schema.org','@type':'WebApplication','name':name,'applicationCategory':'DeveloperApplication','operatingSystem':'Any','url':abs_url(path),'offers':{'@type':'Offer','price':'0','priceCurrency':'USD'}}
    write_route(path, layout(path, title, desc, body, [bc_schema, app_schema, faq_schema(faqs)]))


def render_index(prefix, title, desc, items):
    path = f'/{prefix}/'
    bc, schema = breadcrumb([('Home','/'),(title,path)])
    cards = ''.join(card(slug, name, item_desc, prefix) for slug, name, _, item_desc, *_ in items)
    body = f'<main class="page-main"><div class="container">{bc}<h1>{escape(title)}</h1><p class="lede">{escape(desc)}</p><div class="grid">{cards}</div></div></main>'
    write_route(path, layout(path, f'{title} | {SITE_NAME}', desc, body, [schema]))


def render_guide(guide):
    slug, name, title, desc, tool_slug = guide
    path = f'/guides/{slug}/'
    bc, schema = breadcrumb([('Home','/'),('Guides','/guides/'),(name,path)])
    sections = ''.join(f'<section><h2>{escape(h)}</h2><p>Use this guide to plan accurate App Store metadata and launch assets. Keep copy specific, avoid misleading claims, and confirm current requirements in official Apple tools before release.</p><p>For best results, pair this page with the related browser-based tool and review every output before submitting.</p></section>' for h in ['Overview','Recommended workflow','SEO and conversion tips','Common mistakes','Quality checklist','Final review'])
    body = f'<main class="page-main"><div class="container">{bc}<p class="eyebrow">Guide</p><h1>{escape(name)}</h1><p class="lede">{escape(desc)}</p><article class="content">{sections}<p><a class="button" href="/tools/{tool_slug}/">Open related tool</a></p>{faq_html()}</article></div></main>'
    write_route(path, layout(path, title, desc, body, [schema, faq_schema()]))


def render_template(template):
    slug, name, title, desc, tool_slug, text = template
    path = f'/templates/{slug}/'
    bc, schema = breadcrumb([('Home','/'),('Templates','/templates/'),(name,path)])
    body = f'<main class="page-main"><div class="container">{bc}<p class="eyebrow">Template</p><h1>{escape(name)}</h1><p class="lede">{escape(desc)}</p><article class="content"><section><h2>Copyable template</h2><div class="template-box"><pre id="templateText">{escape(text)}</pre></div><div class="actions"><button data-copy-target="templateText">Copy template</button><button class="secondary" data-download-target="templateText" data-filename="{slug}.md">Download Markdown</button></div></section><section><h2>How to use this template</h2><p>Replace placeholders, remove irrelevant sections, and verify the final content against your real app behavior before publishing.</p><p><a class="button secondary" href="/tools/{tool_slug}/">Open related tool</a></p></section><section><h2>Disclaimer</h2><p>Templates are informational and do not guarantee approval, legal compliance, or ranking.</p></section>{faq_html()}</article></div></main>'
    write_route(path, layout(path, title, desc, body, [schema, faq_schema()]))


def render_page(page):
    slug, name, title, desc = page
    path = f'/{slug}/'
    bc, schema = breadcrumb([('Home','/'),(name,path)])
    extra = {
        'about': 'App Launch Toolkit is an independent resource for app makers preparing App Store submissions. It focuses on practical static tools, checklists, and guides for screenshots, metadata, release notes, privacy links, subscriptions, localization, and review preparation.',
        'contact': 'Email hello@applaunchtoolkit.com with feedback, bug reports, page URLs, and suggested improvements. Do not send sensitive credentials or private app data.',
        'privacy-policy': 'This static site minimizes data collection. Image tools run locally in your browser. If analytics or advertising such as Google AdSense is added later, cookies and third-party vendors may be used and disclosed here.',
        'terms': 'Tools and templates are informational only. They do not guarantee App Store approval, ASO ranking, legal compliance, or revenue outcomes. You are responsible for final verification.'
    }[slug]
    body = f'<main class="page-main"><div class="container">{bc}<h1>{escape(name)}</h1><article class="content"><p>{escape(extra)}</p><p>{escape(DISCLAIMER)}</p></article></div></main>'
    write_route(path, layout(path, title, desc, body, [schema]))


if DIST.exists():
    rmtree(DIST)
(DIST / 'assets/css').mkdir(parents=True)
(DIST / 'assets/js').mkdir(parents=True)
copyfile('src/assets/css/styles.css', DIST / 'assets/css/styles.css')
copyfile('src/assets/js/tools.js', DIST / 'assets/js/tools.js')

render_home()
render_index('tools', 'Free App Store Tools', 'Browse free App Store tools for screenshots, ASO keywords, subtitles, release notes, review notes, privacy policies, localization, pricing, and submission QA.', [(slug, name, title, desc) for _, slug, name, title, desc, _ in TOOLS])
for tool in TOOLS:
    render_tool(tool)
render_index('guides', 'App Store SEO Guides', 'Read practical App Store guides for screenshots, subtitles, keyword fields, privacy policy URLs, review notes, and localization.', GUIDES)
for guide in GUIDES:
    render_guide(guide)
render_index('templates', 'App Store Templates', 'Copy App Store submission templates for review notes, privacy policies, launch checklists, and localization QA.', TEMPLATES)
for template in TEMPLATES:
    render_template(template)
for page in PAGES:
    render_page(page)
write_route('/404.html', layout('/404.html', f'Page Not Found | {SITE_NAME}', 'The requested page could not be found. Browse free App Store tools, guides, and templates from App Launch Toolkit.', '<main class="page-main"><div class="container"><h1>Page not found</h1><p class="lede">Browse the free App Store tools instead.</p><a class="button" href="/tools/">Browse Tools</a></div></main>'))

sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + ''.join(f'  <url><loc>{abs_url(route)}</loc></url>\n' for route in ROUTES if route != '/404.html') + '</urlset>\n'
(DIST / 'sitemap.xml').write_text(sitemap, encoding='utf-8')
(DIST / 'robots.txt').write_text(f'User-agent: *\nAllow: /\n\nSitemap: {BASE_URL}/sitemap.xml\n', encoding='utf-8')
print(f'Built {len(ROUTES)} pages into {DIST}/')
