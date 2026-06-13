export const templates = [
  {
    slug: 'app-review-notes-template',
    name: 'App Review Notes Template',
    title: 'App Review Notes Template | Copyable App Store Reviewer Instructions',
    description: 'Copy a practical App Review notes template for login, test accounts, subscriptions, demo videos, and reviewer instructions.',
    keyword: 'app review notes template',
    relatedTool: 'app-review-notes-generator',
    template: `Hello App Review Team,\n\nThank you for reviewing [App Name].\n\nTest Account:\nUsername: [test username]\nPassword: [test password]\n\nMain features to review:\n1. [feature or flow]\n2. [feature or flow]\n3. [feature or flow]\n\nSubscription or in-app purchase notes:\n[Explain where to find the purchase flow and use sandbox testing.]\n\nAdditional configuration:\n[Region, demo content, permissions, or setup steps.]\n\nContact:\n[contact email]\n\nThank you.`,
    faq: [
      ['What should review notes include?', 'Include only the information reviewers need to access and test the app.'],
      ['Can I paste this directly?', 'Yes, but replace every placeholder and remove sections that do not apply.'],
      ['Should I include real credentials?', 'Use a dedicated test account, not a personal or sensitive account.'],
      ['Do subscriptions need notes?', 'Yes, explain where reviewers can find subscription flows.'],
      ['Can I include support contact?', 'Yes, include a monitored email address.']
    ]
  },
  {
    slug: 'app-privacy-policy-template',
    name: 'App Privacy Policy Template',
    title: 'App Privacy Policy Template | Starter Template for iOS Apps',
    description: 'Copy a starter privacy policy template for iOS apps and customize sections for data collection, analytics, and user rights.',
    keyword: 'app privacy policy template',
    relatedTool: 'privacy-policy-generator',
    template: `Privacy Policy\nEffective Date: [date]\n\n[Developer or Company Name] operates [App Name]. This policy explains what information we collect, how we use it, and how users can contact us.\n\nInformation We Collect\n- [account information]\n- [analytics or crash data]\n- [purchase or subscription data]\n\nHow We Use Information\nWe use information to provide the app, improve reliability, support users, and comply with applicable obligations.\n\nThird-Party Services\nWe may use services such as [analytics provider], [crash reporting], or [payment infrastructure].\n\nData Deletion\nUsers can request deletion by contacting [email].\n\nContact\nFor privacy questions, contact [email].\n\nThis template is informational only and is not legal advice.`,
    faq: [
      ['Is this legal advice?', 'No. It is a starter template and should be reviewed by a qualified professional.'],
      ['What should I customize?', 'Customize data categories, third-party services, retention, deletion, and contact details.'],
      ['Do I need to mention analytics?', 'Yes, disclose analytics and similar SDKs.'],
      ['Can I download it?', 'Yes, use the page download button.'],
      ['Should apps with accounts include deletion instructions?', 'Yes, describe how users can request account or data deletion.']
    ]
  },
  {
    slug: 'app-store-submission-checklist',
    name: 'App Store Submission Checklist',
    title: 'App Store Submission Checklist | Copyable iOS Launch QA Template',
    description: 'Use a copyable App Store submission checklist for metadata, screenshots, privacy links, review notes, subscriptions, and QA.',
    keyword: 'app store submission checklist',
    relatedTool: 'app-store-listing-checker',
    template: `# App Store Submission Checklist\n\n## Metadata\n- [ ] App name is final\n- [ ] Subtitle is clear and within current limits\n- [ ] Keyword field is cleaned and counted\n- [ ] Description explains value and features\n\n## Screenshots\n- [ ] Required device screenshots are prepared\n- [ ] Dimensions are checked\n- [ ] Text is readable on mobile\n\n## Links and Legal\n- [ ] Privacy Policy URL works\n- [ ] Support URL works\n- [ ] Terms or marketing links are accurate\n\n## Review\n- [ ] Review notes are complete\n- [ ] Test account works if login is required\n- [ ] Subscription flow is explained\n\n## Final QA\n- [ ] No misleading claims\n- [ ] App build matches the listing\n- [ ] Final requirements verified in App Store Connect`,
    faq: [
      ['When should I use this checklist?', 'Use it before every first submission and major update.'],
      ['Does this guarantee approval?', 'No. It reduces common mistakes but cannot guarantee review outcomes.'],
      ['Should I check links on mobile?', 'Yes, verify privacy and support links work on multiple devices.'],
      ['Do updates need the full checklist?', 'Important updates should still review metadata, screenshots, and notes.'],
      ['Can I customize the checklist?', 'Yes, copy or download it and add app-specific tasks.']
    ]
  },
  {
    slug: 'app-localization-checklist-template',
    name: 'App Localization Checklist Template',
    title: 'App Localization Checklist Template | Copyable iOS Translation QA',
    description: 'Copy a localization QA checklist for App Store metadata, screenshots, app strings, legal content, notifications, and release tasks.',
    keyword: 'app localization checklist template',
    relatedTool: 'app-localization-checklist',
    template: `# App Localization Checklist\n\n## App Store Metadata\n- [ ] App name reviewed for each locale\n- [ ] Subtitle translated and checked\n- [ ] Keywords localized, not directly copied\n- [ ] Description proofread\n\n## Screenshots\n- [ ] UI text localized\n- [ ] Screenshot captions translated\n- [ ] Device sizes exported\n\n## In-App Experience\n- [ ] Core flows tested in each language\n- [ ] Long strings do not truncate\n- [ ] Dates, times, and numbers look correct\n\n## Legal and Support\n- [ ] Privacy policy reviewed\n- [ ] Support email or help page works\n- [ ] Subscription copy and currency display checked\n\n## Release\n- [ ] Locale-specific notes reviewed\n- [ ] Final device QA completed`,
    faq: [
      ['What is localization QA?', 'It is the process of checking that translated metadata and app UI work correctly for target users.'],
      ['Should I translate keywords?', 'Localize them based on search intent, not just direct translation.'],
      ['Do screenshots need QA?', 'Yes, screenshots often contain text and UI that must match the locale.'],
      ['Can I download the template?', 'Yes, use the download button on the template page.'],
      ['Should legal pages be localized?', 'Consider localizing important privacy and support content for users in each region.']
    ]
  }
];
