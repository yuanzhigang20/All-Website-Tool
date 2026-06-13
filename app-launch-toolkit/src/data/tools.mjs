export const tools = [
  {
    id: 'screenshot-size-checker',
    slug: 'app-store-screenshot-size-checker',
    name: 'App Store Screenshot Size Checker',
    title: 'App Store Screenshot Size Checker | Free iPhone & iPad Image Validator',
    description: 'Check if your App Store screenshots match common iPhone and iPad screenshot dimensions before uploading them to App Store Connect.',
    keyword: 'app store screenshot size checker',
    category: 'Image validation',
    intro: 'Upload PNG or JPG screenshots and validate their pixel dimensions directly in your browser. Images are never uploaded to a server.',
    h2s: ['How to check App Store screenshot sizes', 'Common App Store screenshot dimensions', 'Why screenshot size matters before submission', 'Portrait vs landscape screenshots', 'What to do if your screenshot does not match'],
    faq: [
      ['What size should App Store screenshots be?', 'App Store screenshot sizes depend on the device family and display size. This checker includes common iPhone and iPad sizes and reminds you to confirm final requirements in App Store Connect.'],
      ['Can I upload iPhone screenshots for all device sizes?', 'In many cases App Store Connect can reuse some screenshots, but you should prepare device-appropriate assets for the placements you plan to support.'],
      ['Why does App Store Connect reject my screenshots?', 'Common reasons include incorrect dimensions, unsupported format, transparency issues, or assets that do not match the selected device family.'],
      ['Can this tool check iPad screenshots?', 'Yes. Choose iPad or Auto Detect and the checker compares your image against common iPad screenshot dimensions.'],
      ['Does this tool upload my images to a server?', 'No. The browser reads image dimensions locally using the File API and Image object.']
    ],
    related: ['app-store-screenshot-resizer', 'app-store-listing-checker', 'app-localization-checklist']
  },
  {
    id: 'screenshot-resizer',
    slug: 'app-store-screenshot-resizer',
    name: 'App Store Screenshot Resizer',
    title: 'App Store Screenshot Resizer | Resize iPhone & iPad Screenshots Online',
    description: 'Resize app screenshots for common App Store device sizes using a free browser-based tool. No upload required.',
    keyword: 'app store screenshot resizer',
    category: 'Image resizing',
    intro: 'Resize one screenshot to a common App Store target size with contain, cover, or stretch modes. Canvas processing runs locally in your browser.',
    h2s: ['Resize App Store screenshots in your browser', 'Choose the right screenshot size', 'Contain vs cover crop mode', 'How to avoid blurry screenshots', 'Before you upload to App Store Connect'],
    faq: [
      ['Can I resize screenshots without losing quality?', 'Resizing down usually preserves quality better than resizing up. If the source image is smaller than the target, the output may look blurry.'],
      ['What is the best format for App Store screenshots?', 'PNG is a safe default for crisp UI screenshots. JPG can be smaller for image-heavy screenshots.'],
      ['Can I create iPhone 6.5-inch screenshots from another size?', 'Yes, but verify that the final result accurately represents your app on the target display.'],
      ['Are my screenshots uploaded?', 'No. The image is decoded and drawn on a browser canvas locally.'],
      ['Can I batch resize screenshots?', 'This first version resizes one image at a time so you can review each output.']
    ],
    related: ['app-store-screenshot-size-checker', 'app-store-listing-checker', 'app-store-screenshot-sizes']
  },
  {
    id: 'title-generator',
    slug: 'app-store-title-generator',
    name: 'App Store Title Generator',
    title: 'App Store Title Generator | Free App Name Ideas for iOS Apps',
    description: 'Generate App Store title ideas based on your app category, audience, features, and keywords.',
    keyword: 'app store title generator',
    category: 'Metadata writing',
    intro: 'Create rule-based app title ideas that combine brand, benefit, category, audience, and keywords without calling an AI API.',
    h2s: ['How to choose an App Store title', 'Brand name vs keyword title', 'Common app naming mistakes', 'How long should an app title be?'],
    faq: [
      ['What makes a good App Store title?', 'A good title is memorable, clear, relevant to the app, and avoids misleading or protected terms.'],
      ['Should I put keywords in my app name?', 'A relevant keyword can help clarity, but keyword stuffing makes the title harder to trust and read.'],
      ['Can two apps have the same name?', 'Availability and trademark risk vary. Check App Store Connect and legal rights before publishing.'],
      ['How do I make my app name sound professional?', 'Use plain language, avoid hype, and connect the name to a concrete benefit.'],
      ['Does this tool guarantee ASO ranking?', 'No. It is a brainstorming helper and does not guarantee ranking or approval.']
    ],
    related: ['app-store-subtitle-generator', 'aso-keyword-generator', 'app-store-keyword-counter']
  },
  {
    id: 'subtitle-generator',
    slug: 'app-store-subtitle-generator',
    name: 'App Store Subtitle Generator',
    title: 'App Store Subtitle Generator | Free iOS App Subtitle Ideas',
    description: 'Create short App Store subtitle ideas that describe your app’s core value, features, and audience.',
    keyword: 'app store subtitle generator',
    category: 'Metadata writing',
    intro: 'Generate short subtitle ideas from your benefit, feature, audience, keyword, and tone. Review final limits in App Store Connect.',
    h2s: ['What is an App Store subtitle?', 'How to write a clear app subtitle', 'Subtitle examples by app category', 'Common subtitle mistakes'],
    faq: [
      ['How long can an App Store subtitle be?', 'Apple sets the current limit in App Store Connect. This tool flags ideas over 30 characters as a practical reminder.'],
      ['Should my subtitle include keywords?', 'Use a keyword only if it reads naturally and accurately describes the app.'],
      ['What is the difference between title and subtitle?', 'The title identifies the app; the subtitle gives a concise value proposition or feature clue.'],
      ['Can I change my subtitle later?', 'You can update metadata with app versions according to App Store Connect rules.'],
      ['Does a subtitle affect ASO?', 'It may influence relevance and conversion, but no tool can guarantee ranking.']
    ],
    related: ['app-store-title-generator', 'how-to-write-app-store-subtitle', 'aso-keyword-generator']
  },
  {
    id: 'keyword-counter',
    slug: 'app-store-keyword-counter',
    name: 'App Store Keyword Counter',
    title: 'App Store Keyword Counter | Count Characters for ASO Keywords',
    description: 'Count characters in your App Store keyword field, clean duplicate words, and organize ASO keywords before submission.',
    keyword: 'app store keyword counter',
    category: 'ASO formatting',
    intro: 'Paste keywords, count characters, remove duplicates, and produce a clean comma-separated keyword field draft.',
    h2s: ['How to use the App Store keyword field', 'Why character count matters', 'How to clean duplicate keywords', 'Common ASO keyword mistakes'],
    faq: [
      ['How many characters are allowed in the App Store keyword field?', 'The common limit is 100 characters, but always verify the current limit in App Store Connect.'],
      ['Should I use spaces after commas?', 'Many ASO workflows remove spaces after commas to save characters.'],
      ['Should I repeat words from my app title?', 'Avoid unnecessary repetition unless you have a specific localization strategy.'],
      ['Can I use competitor names?', 'Using competitor or protected names can create policy and legal risk.'],
      ['How often should I update keywords?', 'Review keywords when you ship meaningful updates or learn from search performance.']
    ],
    related: ['aso-keyword-generator', 'app-store-title-generator', 'app-store-listing-checker']
  },
  {
    id: 'whats-new-generator',
    slug: 'whats-new-generator',
    name: 'App Store What’s New Generator',
    title: 'App Store What’s New Generator | Free Release Notes Writer',
    description: 'Generate clear App Store release notes for bug fixes, new features, improvements, and localization updates.',
    keyword: "app store what's new generator",
    category: 'Release notes',
    intro: 'Turn feature, fix, and improvement notes into copyable App Store release note drafts in multiple tones.',
    h2s: ['How to write App Store release notes', 'What to include in What’s New', 'Short vs detailed release notes', 'Release notes examples'],
    faq: [
      ['What should I write in App Store What’s New?', 'Summarize user-visible changes, improvements, and fixes honestly and clearly.'],
      ['Can I just write bug fixes?', 'You can, but more specific notes are often more useful and trustworthy.'],
      ['Should release notes include every change?', 'No. Focus on changes that matter to users.'],
      ['How long should release notes be?', 'Keep them concise unless the release has several user-facing changes.'],
      ['Can I mention upcoming features?', 'Avoid promising future features unless they are certain and appropriate for the listing.']
    ],
    related: ['app-store-listing-checker', 'app-review-notes-generator', 'app-store-submission-checklist']
  },
  {
    id: 'review-notes-generator',
    slug: 'app-review-notes-generator',
    name: 'App Review Notes Generator',
    title: 'App Review Notes Generator | Free App Store Review Instructions Template',
    description: 'Create clear App Store review notes with test account, login steps, subscription details, and reviewer instructions.',
    keyword: 'app review notes generator',
    category: 'Submission templates',
    intro: 'Generate reviewer instructions that explain login, test account details, subscription flows, region restrictions, and key features.',
    h2s: ['What are App Review notes?', 'When should you provide a test account?', 'What to include for subscriptions', 'Common review note mistakes'],
    faq: [
      ['Do I need to provide a test account for App Review?', 'If review requires login or restricted features, provide a test account and clear steps.'],
      ['What should I include in review notes?', 'Include credentials, features to test, special setup, subscriptions, demo video links, and contact details when relevant.'],
      ['Should I explain subscriptions?', 'Yes. Explain where subscriptions appear and that reviewers should use sandbox testing.'],
      ['Can I include a demo video link?', 'Yes, a demo video can help for complex flows.'],
      ['What if my app uses region-specific features?', 'Mention region restrictions and any configuration required to test them.']
    ],
    related: ['app-store-review-notes-guide', 'app-review-notes-template', 'app-store-listing-checker']
  },
  {
    id: 'privacy-policy-generator',
    slug: 'privacy-policy-generator',
    name: 'App Privacy Policy Generator',
    title: 'App Privacy Policy Generator | Free Template for iOS Apps',
    description: 'Create a starter privacy policy template for your iOS app with simple required fields and dropdown-based privacy options.',
    keyword: 'app privacy policy generator',
    category: 'Legal template',
    intro: 'Build a starter privacy policy template for your app. This is informational only and not legal advice.',
    h2s: ['Why App Store apps need a privacy policy URL', 'What to include in an app privacy policy', 'Privacy policy for analytics and third-party SDKs', 'Data deletion and user privacy choices'],
    faq: [
      ['Do iOS apps need a privacy policy?', 'Many apps need a privacy policy URL, especially when collecting data or using analytics, ads, accounts, or purchases.'],
      ['What is a Privacy Policy URL in App Store Connect?', 'It is the public URL where users and reviewers can read your app privacy practices.'],
      ['Can I use this template for my app?', 'You can use it as a starting point, but review it with a qualified professional before publishing.'],
      ['Do I need to mention analytics SDKs?', 'Yes. Disclose third-party services that collect or process data.'],
      ['Should I include data deletion instructions?', 'Yes, especially if users can create accounts or store personal information.']
    ],
    related: ['app-privacy-policy-url-guide', 'app-privacy-policy-template', 'app-store-listing-checker']
  },
  {
    id: 'terms-generator',
    slug: 'terms-of-use-generator',
    name: 'Terms of Use Generator',
    title: 'Terms of Use Generator | Free App Terms Template for iOS Apps',
    description: 'Generate a starter Terms of Use template for your app with accounts, subscriptions, user content, and usage rules.',
    keyword: 'terms of use generator',
    category: 'Legal template',
    intro: 'Create a starter Terms of Use template from a few essential fields and dropdown choices. This is informational only and not legal advice.',
    h2s: ['Why apps need Terms of Use', 'What app terms usually cover', 'Subscriptions and user accounts', 'User content and acceptable use'],
    faq: [
      ['Do I need Terms of Use for my app?', 'Many apps use terms to explain acceptable use, accounts, payments, user content, disclaimers, and limitations. Ask a qualified professional for your situation.'],
      ['Is this legal advice?', 'No. This generator provides a general starting template only.'],
      ['Should subscriptions be mentioned?', 'Yes, if your app has subscriptions or in-app purchases, explain that payments are handled by the App Store or applicable provider.'],
      ['Can I use this with a privacy policy?', 'Yes. Terms of Use and Privacy Policy pages usually serve different purposes and are often both linked from an app or website.'],
      ['Can this guarantee compliance?', 'No. Review the generated terms before publishing.']
    ],
    related: ['privacy-policy-generator', 'app-store-listing-checker', 'app-store-submission-checklist']
  },
  {
    id: 'aso-keyword-generator',
    slug: 'aso-keyword-generator',
    name: 'ASO Keyword Generator',
    title: 'ASO Keyword Generator | Free App Store Keyword Ideas',
    description: 'Generate App Store keyword ideas from your app category, features, audience, and competitor-style terms.',
    keyword: 'ASO keyword generator',
    category: 'ASO research',
    intro: 'Generate keyword ideas from category, features, audience, problems, and long-tail combinations. No ranking guarantees.',
    h2s: ['What is ASO keyword research?', 'How to choose App Store keywords', 'Short-tail vs long-tail app keywords', 'Common ASO keyword mistakes'],
    faq: [
      ['What is ASO?', 'App Store Optimization is the practice of improving metadata and conversion to help users discover and choose an app.'],
      ['How do I find keywords for my app?', 'Start with user intent, category terms, features, problems, and natural language phrases.'],
      ['Should I use competitor names?', 'Avoid protected or misleading competitor terms unless you have clear rights and policy confidence.'],
      ['How many keywords should I use?', 'Create a focused draft that fits the field limit and avoids duplicates.'],
      ['Does this tool guarantee ranking?', 'No. It only helps brainstorm and organize ideas.']
    ],
    related: ['app-store-keyword-counter', 'app-store-keyword-field-guide', 'app-store-title-generator']
  },
  {
    id: 'localization-checklist',
    slug: 'app-localization-checklist',
    name: 'App Localization Checklist',
    title: 'App Localization Checklist | Free iOS App Translation QA Tool',
    description: 'Generate a localization checklist for your iOS app, App Store metadata, screenshots, privacy policy, and in-app strings.',
    keyword: 'app localization checklist',
    category: 'Launch checklist',
    intro: 'Create a grouped localization QA checklist for App Store metadata, in-app strings, screenshots, legal content, and release tasks.',
    h2s: ['What to localize before publishing your app', 'App Store metadata localization', 'Screenshot localization checklist', 'In-app string QA'],
    faq: [
      ['What parts of an iOS app should be localized?', 'Metadata, screenshots, in-app strings, notifications, support content, and legal pages may all need localization.'],
      ['Do I need localized screenshots?', 'Localized screenshots can improve conversion when they show translated UI and benefits.'],
      ['Should I translate my privacy policy?', 'If you serve users in multiple languages, consider localizing important legal and support content.'],
      ['How do I test localization?', 'Use device language settings, pseudolocalization, real reviewers, and screenshots for each locale.'],
      ['What are common localization mistakes?', 'Truncated strings, untranslated screenshots, incorrect currencies, and support links that only work in one locale.']
    ],
    related: ['app-store-localization-checklist', 'app-localization-checklist-template', 'app-store-listing-checker']
  },
  {
    id: 'subscription-price-calculator',
    slug: 'subscription-price-calculator',
    name: 'App Subscription Price Calculator',
    title: 'App Subscription Price Calculator | Monthly, Quarterly & Annual Pricing Tool',
    description: 'Compare monthly, quarterly, and yearly subscription prices for your app and estimate discounts, revenue, and local currency display.',
    keyword: 'app subscription price calculator',
    category: 'Pricing',
    intro: 'Estimate monthly, quarterly, and annual subscription pricing, discounts, gross revenue, and net revenue after platform commission.',
    h2s: ['How to price an app subscription', 'Monthly vs yearly subscription pricing', 'How to calculate annual discounts', 'Revenue after platform commission'],
    faq: [
      ['What is a good monthly price for an app subscription?', 'It depends on value, category, audience, and market alternatives. Test pricing carefully.'],
      ['Should I offer yearly pricing?', 'Yearly pricing can improve cash flow and retention when the app provides ongoing value.'],
      ['How much discount should annual plans have?', 'Many apps use a meaningful but sustainable discount such as 15–40 percent.'],
      ['How do App Store commissions affect revenue?', 'Platform commission reduces net revenue, so model both gross and net outcomes.'],
      ['Can I set different prices by country?', 'Final regional price points must be configured in App Store Connect.']
    ],
    related: ['app-store-listing-checker', 'app-store-submission-checklist', 'privacy-policy-generator']
  },
  {
    id: 'listing-checker',
    slug: 'app-store-listing-checker',
    name: 'App Store Listing Checker',
    title: 'App Store Listing Checker | Review Your App Metadata Before Submission',
    description: 'Check your App Store listing draft for title, subtitle, keywords, description, screenshots, privacy policy, and review notes.',
    keyword: 'app store listing checker',
    category: 'Submission QA',
    intro: 'Review your App Store metadata draft and get a readiness score with critical issues, recommendations, and nice-to-have improvements.',
    h2s: ['What to check before App Store submission', 'App metadata checklist', 'Screenshots and privacy links', 'Review notes and test accounts'],
    faq: [
      ['What should I check before submitting to App Review?', 'Check required links, screenshots, title, subtitle, keywords, description, review notes, and login test accounts.'],
      ['Do I need a Privacy Policy URL?', 'Most apps that collect data, use accounts, analytics, ads, or purchases should provide one.'],
      ['How many screenshots should I upload?', 'Upload enough screenshots to show the core value and required device families.'],
      ['What if my app requires login?', 'Provide test credentials and clear instructions in review notes.'],
      ['Can this tool guarantee approval?', 'No. It is a checklist and cannot guarantee App Store approval.']
    ],
    related: ['app-store-submission-checklist', 'privacy-policy-generator', 'app-review-notes-generator']
  }
];

export const toolBySlug = Object.fromEntries(tools.map((tool) => [tool.slug, tool]));
