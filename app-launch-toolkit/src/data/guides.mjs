export const guides = [
  {
    slug: 'app-store-screenshot-sizes',
    name: 'App Store Screenshot Sizes Guide',
    title: 'App Store Screenshot Sizes Guide | iPhone & iPad Dimensions',
    description: 'Learn how to prepare iPhone and iPad App Store screenshots, understand common dimensions, and avoid upload issues.',
    keyword: 'app store screenshot sizes',
    toolSlug: 'app-store-screenshot-size-checker',
    sections: ['Why screenshot sizes matter', 'Common iPhone screenshot dimensions', 'Common iPad screenshot dimensions', 'Portrait and landscape assets', 'How to validate screenshots before upload', 'Final checks in App Store Connect'],
    faq: [
      ['What are App Store screenshot sizes?', 'They are pixel dimensions App Store Connect accepts for each supported device family. Always confirm the latest values in official Apple tools before submission.'],
      ['Can I use one screenshot for every device?', 'Sometimes screenshots can be reused, but device-specific screenshots usually produce better previews and fewer layout surprises.'],
      ['Should screenshots be portrait or landscape?', 'Use the orientation that matches how people use your app and keep a consistent story across the listing.'],
      ['Do screenshots need to show real app UI?', 'Use honest screenshots that accurately represent the app experience and avoid misleading claims.'],
      ['How can I check dimensions locally?', 'Use the free screenshot size checker to read image dimensions in your browser without uploading files.']
    ]
  },
  {
    slug: 'how-to-write-app-store-subtitle',
    name: 'How to Write App Store Subtitle',
    title: 'How to Write an App Store Subtitle | Examples & Checklist',
    description: 'Write a clear App Store subtitle that explains your app value, audience, and key feature without keyword stuffing.',
    keyword: 'how to write app store subtitle',
    toolSlug: 'app-store-subtitle-generator',
    sections: ['What the subtitle should do', 'Keep the value proposition concrete', 'Use keywords naturally', 'Subtitle examples by category', 'Mistakes to avoid', 'Review before each release'],
    faq: [
      ['What should an App Store subtitle say?', 'It should communicate the app’s core value in a short, specific phrase.'],
      ['Should I include a keyword?', 'Include a relevant keyword if it improves clarity and reads naturally.'],
      ['Can I use promotional claims?', 'Avoid unverifiable claims such as best, number one, or guaranteed results.'],
      ['How often should I update it?', 'Review it when your positioning, target audience, or main feature changes.'],
      ['Can a subtitle guarantee downloads?', 'No. It can improve clarity and conversion, but downloads depend on many factors.']
    ]
  },
  {
    slug: 'app-store-keyword-field-guide',
    name: 'App Store Keyword Field Guide',
    title: 'App Store Keyword Field Guide | ASO Keyword Formatting Tips',
    description: 'Understand how to organize App Store keyword field drafts, count characters, remove duplicates, and avoid risky terms.',
    keyword: 'app store keyword field',
    toolSlug: 'app-store-keyword-counter',
    sections: ['What the keyword field is for', 'Character limits and formatting', 'Avoid duplicate words', 'Choosing relevant keywords', 'Localization considerations', 'A simple keyword review workflow'],
    faq: [
      ['How many characters can I use?', 'Many teams plan around 100 characters, but verify the current limit in App Store Connect.'],
      ['Should I add spaces after commas?', 'Removing spaces is a common way to save characters.'],
      ['Should I repeat words?', 'Avoid unnecessary repetition so you can use the limited space for more relevant terms.'],
      ['Can I use brand names?', 'Only use names you have rights to use and avoid misleading competitor references.'],
      ['How do I clean a keyword draft?', 'Paste it into the keyword counter, remove duplicates, and copy the cleaned string.']
    ]
  },
  {
    slug: 'app-privacy-policy-url-guide',
    name: 'App Privacy Policy URL Guide',
    title: 'App Privacy Policy URL Guide | What iOS Apps Should Include',
    description: 'Prepare a privacy policy URL for App Store Connect with analytics, ads, account, data deletion, and contact information.',
    keyword: 'app privacy policy url',
    toolSlug: 'privacy-policy-generator',
    sections: ['Why a privacy policy URL matters', 'What data practices to describe', 'Analytics and third-party SDKs', 'Ads and cookies', 'Data deletion requests', 'Publishing and reviewing your policy'],
    faq: [
      ['Do all apps need a privacy policy URL?', 'Many apps do, especially if they collect data, use SDKs, support accounts, ads, analytics, or purchases.'],
      ['Can I host it on a static page?', 'Yes, as long as it is public, stable, and matches your app’s actual practices.'],
      ['Is a generated policy legal advice?', 'No. Use generated text as a starting point and get qualified legal review.'],
      ['Should I mention AdSense or analytics?', 'For this website and apps using advertising or analytics, disclose cookies and third-party vendors.'],
      ['Where do I put the URL?', 'Add the public URL in the relevant App Store Connect metadata fields.']
    ]
  },
  {
    slug: 'app-store-review-notes-guide',
    name: 'App Store Review Notes Guide',
    title: 'App Store Review Notes Guide | Test Accounts & Reviewer Instructions',
    description: 'Write clear App Review notes with login details, test steps, subscriptions, region notes, and support contact information.',
    keyword: 'app store review notes',
    toolSlug: 'app-review-notes-generator',
    sections: ['When review notes are needed', 'How to provide test accounts safely', 'Explaining subscriptions and purchases', 'Region and configuration notes', 'Demo video links', 'Common mistakes'],
    faq: [
      ['When should I add review notes?', 'Add them when reviewers need credentials, setup steps, subscriptions, or context to test the app.'],
      ['Should I use production credentials?', 'Avoid real production accounts. Use a dedicated test account where possible.'],
      ['Can I include a password?', 'Yes for review, but do not reuse sensitive passwords and update credentials after review if needed.'],
      ['Should I mention sandbox purchases?', 'Yes, explain where purchase flows are and that sandbox testing should be used.'],
      ['What if the app is region-limited?', 'Explain supported regions and any required configuration.']
    ]
  },
  {
    slug: 'app-store-localization-checklist',
    name: 'App Store Localization Checklist Guide',
    title: 'App Store Localization Checklist Guide | iOS Translation QA',
    description: 'Plan app localization QA across App Store metadata, screenshots, in-app strings, legal pages, subscriptions, and support.',
    keyword: 'app store localization checklist',
    toolSlug: 'app-localization-checklist',
    sections: ['What to localize before launch', 'Metadata and keywords', 'Screenshots and preview assets', 'In-app string QA', 'Payments and subscriptions', 'Release day checks'],
    faq: [
      ['What should I localize first?', 'Start with metadata, screenshots, onboarding, paywalls, support text, and the most visible in-app strings.'],
      ['How do I test localized UI?', 'Change device language and region, inspect long strings, and test core flows.'],
      ['Should screenshots be translated?', 'Localized screenshots often improve trust and conversion.'],
      ['Do subscriptions need localization?', 'Plan localized paywall copy, currency display, legal links, and support messaging.'],
      ['Can I download a checklist?', 'Use the localization checklist tool to generate and download a Markdown checklist.']
    ]
  }
];
