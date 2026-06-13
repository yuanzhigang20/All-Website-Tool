const screenshotSizes = [
  { label: 'iPhone 6.9-inch Portrait', width: 1320, height: 2868, platform: 'iPhone' },
  { label: 'iPhone 6.7-inch Portrait', width: 1290, height: 2796, platform: 'iPhone' },
  { label: 'iPhone 6.5-inch Portrait', width: 1242, height: 2688, platform: 'iPhone' },
  { label: 'iPhone 5.5-inch Portrait', width: 1242, height: 2208, platform: 'iPhone' },
  { label: 'iPad Pro 13-inch Portrait', width: 2064, height: 2752, platform: 'iPad' },
  { label: 'iPad Pro 12.9-inch Portrait', width: 2048, height: 2732, platform: 'iPad' },
  { label: 'Mac App Screenshot 16:10', width: 2880, height: 1800, platform: 'Mac' },
  { label: 'Apple Watch Screenshot', width: 396, height: 484, platform: 'Apple Watch' }
];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const value = (id, root = document) => $(`#${id}`, root)?.value.trim() || '';
const numberValue = (id, fallback = 0, root = document) => Number.parseFloat(value(id, root)) || fallback;
const escapeHtml = (text = '') => String(text).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const sentenceCase = (text = '') => text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
const splitList = (text = '') => text.split(/[\n,]+/).map((item) => item.trim()).filter(Boolean);
const words = (text = '') => text.toLowerCase().split(/[\s,]+/).map((item) => item.trim()).filter(Boolean);
const dedupe = (items) => [...new Set(items.map((item) => item.trim()).filter(Boolean))];

function resultBox(html) {
  const result = $('#result');
  if (result) result.innerHTML = html;
}

function item(title, body, extra = '') {
  return `<div class="output-item">${title ? `<h3>${escapeHtml(title)}</h3>` : ''}${body}${extra}</div>`;
}

async function copyText(text, button) {
  try {
    await navigator.clipboard.writeText(text);
    if (button) {
      const original = button.textContent;
      button.textContent = 'Copied';
      setTimeout(() => { button.textContent = original; }, 1200);
    }
  } catch {
    window.prompt('Copy this text:', text);
  }
}

function copyButton(text) {
  return `<button class="secondary" data-copy="${escapeHtml(text)}">Copy</button>`;
}

function downloadText(filename, text, type = 'text/markdown') {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function readImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

function matchSize(width, height, platformFilter = 'Auto Detect') {
  const candidates = screenshotSizes.filter((size) => platformFilter === 'Auto Detect' || size.platform === platformFilter);
  let closest = null;
  for (const size of candidates) {
    const exact = (size.width === width && size.height === height) || (size.width === height && size.height === width);
    if (exact) return { status: 'Ready', label: size.label, platform: size.platform, delta: 0 };
    const direct = Math.abs(size.width - width) + Math.abs(size.height - height);
    const rotated = Math.abs(size.width - height) + Math.abs(size.height - width);
    const delta = Math.min(direct, rotated);
    if (!closest || delta < closest.delta) closest = { status: delta <= 120 ? 'Needs resize' : 'Unknown size', label: size.label, platform: size.platform, delta };
  }
  return closest || { status: 'Unknown size', label: 'No matching table entry', delta: Infinity };
}

function initScreenshotChecker(root) {
  $('#checkScreenshots', root)?.addEventListener('click', async () => {
    const files = [...($('#imageFiles', root)?.files || [])].slice(0, 10);
    if (!files.length) return resultBox('<p class="warning">Choose 1–10 PNG or JPG screenshots first.</p>');
    const platform = value('platform', root) || 'Auto Detect';
    const desiredOrientation = value('orientation', root) || 'Auto';
    const rows = [];
    for (const file of files) {
      if (!/^image\/(png|jpeg)$/.test(file.type)) continue;
      const img = await readImage(file);
      const orientation = img.naturalWidth >= img.naturalHeight ? 'Landscape' : 'Portrait';
      const match = matchSize(img.naturalWidth, img.naturalHeight, platform);
      const orientationWarning = desiredOrientation !== 'Auto' && desiredOrientation !== orientation ? ` <span class="warning">Expected ${desiredOrientation}</span>` : '';
      rows.push(item(file.name, `<div class="kv"><strong>Size</strong><span>${img.naturalWidth} × ${img.naturalHeight}</span><strong>Orientation</strong><span>${orientation}${orientationWarning}</span><strong>Matched device</strong><span>${escapeHtml(match.label)}</span><strong>Status</strong><span>${match.status}</span><strong>Next action</strong><span>${match.status === 'Ready' ? 'Ready for a final App Store Connect check.' : match.status === 'Needs resize' ? 'Resize or export to the closest target dimensions.' : 'Check Apple requirements and export a supported size.'}</span></div>`));
      URL.revokeObjectURL(img.src);
    }
    resultBox(`${rows.join('')}<p class="success">Images were processed locally in your browser and were not uploaded.</p>`);
  });
}

function initScreenshotResizer(root) {
  $('#resizeButton', root)?.addEventListener('click', async () => {
    const file = $('#resizeImage', root)?.files?.[0];
    if (!file) return resultBox('<p class="warning">Choose a PNG or JPG image first.</p>');
    const img = await readImage(file);
    const [targetW, targetH] = value('targetSize', root).split('x').map(Number);
    const mode = value('fitMode', root);
    const canvas = $('#resizeCanvas', root);
    const ctx = canvas.getContext('2d');
    canvas.width = targetW; canvas.height = targetH;
    ctx.fillStyle = value('bgColor', root) || '#ffffff';
    ctx.fillRect(0, 0, targetW, targetH);
    let dw = targetW, dh = targetH, dx = 0, dy = 0;
    if (mode !== 'stretch') {
      const scale = mode === 'cover' ? Math.max(targetW / img.naturalWidth, targetH / img.naturalHeight) : Math.min(targetW / img.naturalWidth, targetH / img.naturalHeight);
      dw = img.naturalWidth * scale;
      dh = img.naturalHeight * scale;
      dx = (targetW - dw) / 2;
      dy = (targetH - dh) / 2;
    }
    ctx.drawImage(img, dx, dy, dw, dh);
    const format = value('outputFormat', root) || 'image/png';
    const quality = numberValue('quality', 92, root) / 100;
    const url = canvas.toDataURL(format, quality);
    const download = $('#downloadImage', root);
    download.href = url;
    download.download = `app-store-screenshot-${targetW}x${targetH}.${format.includes('jpeg') ? 'jpg' : 'png'}`;
    const warn = img.naturalWidth < targetW || img.naturalHeight < targetH ? '<p class="warning">Source image is smaller than the target in at least one dimension; the result may look blurry.</p>' : '';
    resultBox(item('Resized screenshot', `<div class="kv"><strong>Original</strong><span>${img.naturalWidth} × ${img.naturalHeight}</span><strong>Target</strong><span>${targetW} × ${targetH}</span><strong>Fit mode</strong><span>${escapeHtml(mode)}</span><strong>Format</strong><span>${format.includes('jpeg') ? 'JPG' : 'PNG'}</span></div>${warn}`));
    URL.revokeObjectURL(img.src);
  });
}

function renderSuggestions(groups) {
  return Object.entries(groups).map(([group, suggestions]) => item(group, suggestions.map((text) => `<p><strong>${escapeHtml(text)}</strong> <span class="badge">${text.length} chars</span> ${copyButton(text)}</p>`).join(''))).join('');
}

function initTitleGenerator(root) {
  $('#generateTitles', root)?.addEventListener('click', () => {
    const brand = value('brand', root) || 'Your App';
    const fn = value('mainFunction', root) || 'plan tasks';
    const audience = value('audience', root) || 'indie developers';
    const primary = value('primaryKeyword', root) || 'app planner';
    const secondary = value('secondaryKeyword', root) || 'tracker';
    const category = value('category', root) || 'Productivity';
    const benefit = fn.replace(/^(to\s+)/i, '');
    const groups = {
      'Short brand-style titles': [brand, `${brand} Go`, `${brand} Kit`, `${brand} Studio`, `${brand} Flow`],
      'Keyword-focused titles': [`${sentenceCase(primary)} for ${audience}`, `${brand}: ${sentenceCase(primary)}`, `${sentenceCase(primary)} & ${sentenceCase(secondary)}`, `${sentenceCase(category)} ${sentenceCase(primary)}`, `${sentenceCase(primary)} Planner`],
      'Benefit-focused titles': [`${sentenceCase(benefit)} Faster`, `Plan ${secondary} with ease`, `Simple ${primary}`, `${sentenceCase(benefit)} Manager`, `${sentenceCase(audience)} ${sentenceCase(secondary)}`],
      'Professional titles': [`${brand} - ${sentenceCase(benefit)}`, `${sentenceCase(category)} Manager`, `${sentenceCase(primary)} Pro`, `${sentenceCase(secondary)} Dashboard`, `${sentenceCase(benefit)} Toolkit`]
    };
    resultBox(renderSuggestions(groups));
  });
}

function initSubtitleGenerator(root) {
  $('#generateSubtitles', root)?.addEventListener('click', () => {
    const benefit = value('benefit', root) || 'Plan your day';
    const feature = value('feature', root) || 'Smart reminders';
    const audience = value('audience', root) || 'busy teams';
    const keyword = value('primaryKeyword', root) || value('appType', root) || 'planner';
    const avoid = words(value('avoidWords', root));
    const templates = [
      `${benefit} for ${audience}`, `${feature} made simple`, `Track ${keyword} with ease`, `Plan, track, and manage ${keyword}`, `A simple way to ${benefit.toLowerCase()}`,
      `${sentenceCase(keyword)} for ${audience}`, `${sentenceCase(feature)} for every day`, `Organize ${keyword} faster`, `Your ${keyword} companion`, `Better ${keyword} habits`,
      `Simple ${keyword} tracking`, `${sentenceCase(benefit)} in minutes`, `${sentenceCase(feature)} for ${audience}`, `Focus on ${keyword}`, `Manage ${keyword} clearly`,
      `Daily ${keyword} made easy`, `Build better ${keyword}`, `Plan smarter with ${keyword}`, `Less chaos, more ${keyword}`, `Your ${keyword} dashboard`,
      `${sentenceCase(keyword)} without clutter`, `Fast ${keyword} planning`, `Reliable ${keyword} reminders`, `Calm ${keyword} management`, `${sentenceCase(keyword)} that fits`,
      `Make ${keyword} easier`, `${sentenceCase(audience)} ${keyword}`, `Modern ${keyword} tools`, `Clear ${keyword} progress`, `Stay on top of ${keyword}`
    ].filter((text) => !avoid.some((word) => text.toLowerCase().includes(word)));
    resultBox(item('Subtitle ideas', templates.slice(0, 30).map((text) => `<p><strong>${escapeHtml(text)}</strong> <span class="badge">${text.length} chars</span> <span class="badge">keyword: ${text.toLowerCase().includes(keyword.toLowerCase()) ? 'yes' : 'no'}</span> ${text.length > 30 ? '<span class="warning">May be too long</span>' : ''} ${copyButton(text)}</p>`).join('')));
  });
}

function parseKeywords(root) {
  const raw = value('keywords', root);
  const sep = value('separator', root);
  const parts = sep === 'space' ? raw.split(/\s+/) : sep === 'line' ? raw.split(/\n+/) : raw.split(',');
  return parts.map((part) => part.trim()).filter(Boolean);
}

function initKeywordCounter(root) {
  const analyze = () => {
    const list = parseKeywords(root);
    const cleaned = dedupe(list.map((item) => item.toLowerCase())).join(',');
    const duplicates = list.filter((item, idx) => list.map((x) => x.toLowerCase()).indexOf(item.toLowerCase()) !== idx);
    const limit = numberValue('limit', 100, root);
    resultBox(item('Keyword analysis', `<div class="kv"><strong>Character count</strong><span>${cleaned.length}</span><strong>Remaining</strong><span>${limit - cleaned.length}</span><strong>Keyword count</strong><span>${dedupe(list).length}</span><strong>Duplicates</strong><span>${duplicates.length ? escapeHtml(dedupe(duplicates).join(', ')) : 'None'}</span></div><h3>Cleaned keyword string</h3><pre>${escapeHtml(cleaned)}</pre><div class="actions">${copyButton(cleaned)}</div>${cleaned.length > limit ? '<p class="danger">This draft is over the target character limit.</p>' : '<p class="success">This draft is within the target character limit.</p>'}`));
    return cleaned;
  };
  $('#analyzeKeywords', root)?.addEventListener('click', analyze);
  $('#cleanKeywords', root)?.addEventListener('click', () => { $('#keywords', root).value = analyze(); });
}

function initWhatsNew(root) {
  $('#generateNotes', root)?.addEventListener('click', () => {
    const app = value('appName', root) || 'the app';
    const features = splitList(value('features', root));
    const fixes = splitList(value('fixes', root));
    const improvements = splitList(value('improvements', root));
    const thanks = $('#thanks', root)?.checked;
    const all = [...features.map((x) => `New: ${x}`), ...improvements.map((x) => `Improved: ${x}`), ...fixes.map((x) => `Fixed: ${x}`)];
    const fallback = all.length ? all : ['Improved reliability', 'Fixed minor bugs', 'Enhanced the overall app experience'];
    const prefix = thanks ? `Thanks for using ${app}. ` : '';
    const versions = {
      'Short version': `${prefix}This update includes ${fallback.slice(0, 2).join(', ').toLowerCase()}.`,
      'Bullet version': `${prefix}This update includes:\n${fallback.map((x) => `- ${x}`).join('\n')}`,
      'Friendly version': `${prefix}We polished the experience with ${fallback.join(', ').toLowerCase()}. We hope this makes ${app} easier to use.`,
      'Professional version': `${prefix}This release includes user-facing improvements, reliability updates, and fixes: ${fallback.join('; ')}.`
    };
    resultBox(Object.entries(versions).map(([title, text]) => item(title, `<pre>${escapeHtml(text)}</pre><div class="actions">${copyButton(text)}</div>`)).join(''));
  });
}

function initReviewNotes(root) {
  $('#generateReviewNotes', root)?.addEventListener('click', () => {
    const app = value('appName', root) || '[App Name]';
    const lines = [`Hello App Review Team,`, '', `Thank you for reviewing ${app}.`];
    if (value('requiresLogin', root) === 'Yes') lines.push('', 'Test Account:', `Username: ${value('username', root) || '[test username]'}`, `Password: ${value('password', root) || '[test password]'}`);
    lines.push('', 'Main features to review:');
    (splitList(value('features', root)).length ? splitList(value('features', root)) : ['[feature or flow]', '[feature or flow]', '[feature or flow]']).forEach((feature, i) => lines.push(`${i + 1}. ${feature}`));
    if (value('hasIap', root) === 'Yes') lines.push('', 'If you need to test subscriptions or in-app purchases, please use the sandbox environment. The purchase flow is available in the app where described above.');
    if (value('regions', root)) lines.push('', `Region restrictions: ${value('regions', root)}`);
    if (value('demoUrl', root)) lines.push('', `Demo video: ${value('demoUrl', root)}`);
    if (value('config', root)) lines.push('', `Additional notes:\n${value('config', root)}`);
    if (value('email', root)) lines.push('', `Contact: ${value('email', root)}`);
    lines.push('', 'Thank you.');
    const text = lines.join('\n');
    resultBox(item('Review notes draft', `<pre>${escapeHtml(text)}</pre><div class="actions">${copyButton(text)}</div>`));
  });
}

function initPrivacyPolicy(root) {
  let latest = '';
  const generate = () => {
    const developer = value('developer', root) || '[Developer Name]';
    const app = value('appName', root) || '[App Name]';
    const email = value('email', root) || '[contact email]';
    const appType = value('appType', root) || 'Utility / productivity app';
    const dataProfile = value('dataProfile', root) || 'Basic analytics only';
    const accounts = value('accounts', root) || 'No accounts';
    const payments = value('payments', root) || 'No payments';
    const tracking = value('tracking', root) || 'Analytics only';
    const deletionMode = value('deletionMode', root) || 'Email request';
    const services = value('services', root);
    const collected = {
      'No personal data': 'We do not intentionally collect personal information through the app. Limited technical information may still be processed by app stores or device platforms.',
      'Basic analytics only': 'We may collect basic usage analytics, device information, crash logs, and similar diagnostic information to improve reliability and product quality.',
      'Account and profile data': 'We may collect account details such as email address, profile information, authentication identifiers, usage analytics, and crash logs.',
      'User content or photos': 'We may collect information you create or upload in the app, such as user-generated content, photos, files, account details, usage analytics, and crash logs.',
      'Health, finance, or sensitive data': 'The app may process sensitive information you choose to provide. Describe the exact categories here before publishing this policy.'
    }[dataProfile] || dataProfile;
    const accountText = accounts === 'No accounts' ? 'The app does not require users to create an account.' : `${accounts} may be used to personalize the app, sync data, or provide support.`;
    const paymentText = payments === 'No payments' ? '' : '\n\nPayments and Subscriptions\nPurchases and subscriptions are processed by the App Store or other payment providers. We do not receive full payment card details.';
    const trackingText = tracking === 'No ads or analytics' ? 'We do not intentionally use third-party advertising or analytics SDKs in the app.' : tracking === 'Ads and analytics' ? 'We may use analytics and advertising services to measure app performance, understand aggregate usage, and support ads. These services may use identifiers or similar technologies according to their own policies.' : 'We may use analytics services to understand aggregate usage, diagnose issues, and improve the app.';
    const deletionText = deletionMode === 'In-app account deletion' ? 'You can request or start account deletion inside the app where the deletion option is provided.' : deletionMode === 'No account data stored' ? 'Because the app does not store account data, there may be no account record to delete. You can still contact us with privacy questions.' : `You can request deletion by contacting ${email}.`;
    const serviceText = services ? `\n\nThird-Party Services\nThe app may use third-party services such as ${services}. These services process information according to their own terms and privacy policies.` : '';
    latest = `Privacy Policy\nEffective Date: [Insert Date]\n\nIntroduction\n${developer} operates ${app}, a ${appType.toLowerCase()}. This Privacy Policy explains what information we collect, how we use it, and how users can contact us.\n\nInformation We Collect\n${collected}\n\nAccounts\n${accountText}\n\nHow We Use Information\nWe use information to provide the app, maintain security, improve reliability, respond to support requests, process purchases when applicable, and understand aggregate usage.\n\nAnalytics, Ads, and Tracking\n${trackingText}${serviceText}${paymentText}\n\nData Retention\nWe retain information only as long as reasonably necessary for the purposes described in this policy, unless a longer period is required by law.\n\nData Deletion\n${deletionText}\n\nChildren’s Privacy\nThe app is not intended to knowingly collect personal information from children without appropriate consent. If your app is directed to children, replace this section with a policy reviewed by a qualified professional.\n\nChanges to This Policy\nWe may update this policy from time to time. The latest version should be posted at your public privacy policy URL.\n\nContact Us\nFor privacy questions, contact ${email}.\n\nDisclaimer\nThis generator provides a general template for informational purposes only and does not provide legal advice. You should review the policy with a qualified legal professional before publishing it.`;
    resultBox(item('Privacy policy template', `<pre>${escapeHtml(latest)}</pre><div class="actions">${copyButton(latest)}</div>`));
  };
  $('#generatePolicy', root)?.addEventListener('click', generate);
  $('#downloadPolicyTxt', root)?.addEventListener('click', () => { if (!latest) generate(); downloadText('privacy-policy.txt', latest, 'text/plain'); });
  $('#downloadPolicyMd', root)?.addEventListener('click', () => { if (!latest) generate(); downloadText('privacy-policy.md', latest); });
}

function initTermsGenerator(root) {
  let latest = '';
  const generate = () => {
    const developer = value('developer', root) || '[Developer Name]';
    const app = value('appName', root) || '[App Name]';
    const email = value('email', root) || '[support email]';
    const appType = value('appType', root) || 'Utility / productivity app';
    const accounts = value('accounts', root) || 'No accounts';
    const payments = value('payments', root) || 'No paid features';
    const userContent = value('userContent', root) || 'No user-generated content';
    const age = value('age', root) || '13+';
    const region = value('region', root);
    const accountSection = accounts === 'No accounts' ? 'The app does not require an account. You are responsible for maintaining access to your device and any local data.' : `${accounts} may be available or required. You are responsible for keeping your login credentials secure and for activity under your account.`;
    const paymentSection = payments === 'No paid features' ? 'The app may be offered without paid features. If paid features are added later, the terms should be updated before launch.' : 'Some features may be offered through subscriptions or in-app purchases. Purchases are handled by the App Store or applicable payment provider and may be subject to their terms, renewal rules, and refund policies.';
    const contentSection = userContent === 'No user-generated content' ? 'The app is not designed as a public user-content hosting service.' : 'If you create or upload content, you remain responsible for that content and must not upload illegal, infringing, harmful, or misleading material.';
    const ageSection = age === 'No age-specific statement' ? '' : `\n\nAge Requirement\nYou should be at least ${age} or have permission from a parent or guardian to use the app.`;
    const lawSection = region ? `\n\nGoverning Law\nThese terms are intended to be governed by the laws of ${region}, unless applicable law requires otherwise.` : '';
    latest = `Terms of Use\nEffective Date: [Insert Date]\n\nIntroduction\nThese Terms of Use apply to ${app}, provided by ${developer}. By using the app, you agree to these terms. If you do not agree, do not use the app.\n\nUse of the App\n${app} is a ${appType.toLowerCase()}. You agree to use it only for lawful purposes and in a way that does not harm the app, other users, or third-party rights.\n\nAccounts\n${accountSection}\n\nPaid Features\n${paymentSection}\n\nUser Content\n${contentSection}\n\nAcceptable Use\nYou may not misuse the app, attempt to disrupt its operation, reverse engineer restricted parts, violate applicable laws, or use the app to infringe third-party rights.${ageSection}\n\nNo Guarantee\nThe app is provided on an “as is” and “as available” basis. We do not guarantee that it will be uninterrupted, error-free, or suitable for every purpose.\n\nLimitation of Liability\nTo the maximum extent permitted by law, ${developer} is not liable for indirect, incidental, special, consequential, or punitive damages arising from use of the app.\n\nChanges to the Terms\nWe may update these terms from time to time. Continued use of the app after changes means you accept the updated terms.${lawSection}\n\nContact\nFor questions about these terms, contact ${email}.\n\nDisclaimer\nThis generator provides a general template for informational purposes only and does not provide legal advice. You should review the terms with a qualified legal professional before publishing them.`;
    resultBox(item('Terms of Use template', `<pre>${escapeHtml(latest)}</pre><div class="actions">${copyButton(latest)}</div>`));
  };
  $('#generateTerms', root)?.addEventListener('click', generate);
  $('#downloadTermsTxt', root)?.addEventListener('click', () => { if (!latest) generate(); downloadText('terms-of-use.txt', latest, 'text/plain'); });
  $('#downloadTermsMd', root)?.addEventListener('click', () => { if (!latest) generate(); downloadText('terms-of-use.md', latest); });
}

function initAsoKeywordGenerator(root) {
  $('#generateKeywords', root)?.addEventListener('click', () => {
    const category = value('category', root) || 'productivity';
    const feature = value('feature', root) || 'task planning';
    const audience = value('audience', root) || 'creators';
    const problem = value('problem', root) || 'busy schedules';
    const primary = value('primaryKeyword', root) || 'planner';
    const seeds = dedupe([primary, category, feature, audience, problem, ...words(value('competitors', root))]);
    const longTail = seeds.flatMap((seed) => [`${seed} app`, `${seed} tracker`, `${seed} planner`, `${seed} reminder`, `${seed} organizer`, `best ${seed}`, `simple ${seed}`]);
    const featureIdeas = [`${feature}`, `${feature} tool`, `${feature} calendar`, `${feature} reminders`, `${feature} dashboard`, `${feature} checklist`, `${feature} schedule`];
    const audienceIdeas = [`${audience} app`, `${audience} planner`, `${audience} tracker`, `${audience} productivity`, `${audience} organizer`];
    const all = dedupe([...seeds, ...longTail, ...featureIdeas, ...audienceIdeas]).slice(0, 70);
    let draft = '';
    for (const kw of all) if ((draft ? `${draft},${kw}` : kw).length <= 100) draft = draft ? `${draft},${kw}` : kw;
    resultBox([item('Keyword ideas', all.slice(0, 25).map((x) => `<span class="badge">${escapeHtml(x)}</span> `).join('')), item('Long-tail keyword ideas', longTail.slice(0, 25).map((x) => `<span class="badge">${escapeHtml(x)}</span> `).join('')), item('Feature and audience ideas', [...featureIdeas, ...audienceIdeas].map((x) => `<span class="badge">${escapeHtml(x)}</span> `).join('')), item('Suggested 100-character draft', `<pre>${escapeHtml(draft)}</pre><p>${draft.length}/100 characters</p><div class="actions">${copyButton(draft)}</div>`)].join(''));
  });
}

function initLocalizationChecklist(root) {
  let latest = '';
  const generate = () => {
    const languages = splitList(value('languages', root) || 'Spanish, French');
    const groups = {
      'App Store Metadata': ['Translate app name and subtitle', 'Localize description and promotional text', 'Research keywords per locale', 'Proofread release notes'],
      'In-App Strings': ['Test core flows in each language', 'Check truncation and layout', 'Review dates, numbers, and currencies'],
      'Screenshots and Preview': ['Export screenshots for each target device', 'Translate screenshot captions', value('screenshots', root) === 'No' ? 'Create localized screenshot set' : 'Verify localized screenshots'],
      'Privacy and Legal': [value('privacy', root) === 'No' ? 'Review privacy policy localization need' : 'Verify localized privacy policy', 'Check support and contact links'],
      'Notifications and Emails': [value('push', root) === 'Yes' ? 'Localize push notification copy' : 'Confirm no notification copy is needed', 'Review transactional email text'],
      'Payments and Subscriptions': [value('subscriptions', root) === 'Yes' ? 'Localize paywall and subscription terms' : 'Confirm no subscription copy is needed', 'Check regional currency display'],
      'QA Testing': languages.map((lang) => `Complete device QA in ${lang}`).join('|').split('|'),
      'Release Preparation': ['Check final metadata in App Store Connect', 'Confirm reviewer notes mention locale-specific setup']
    };
    latest = Object.entries(groups).map(([title, rows]) => `## ${title}\n${rows.map((row) => `- [ ] ${row}`).join('\n')}`).join('\n\n');
    resultBox(Object.entries(groups).map(([title, rows]) => item(title, rows.map((row) => `<label class="check-row"><input type="checkbox"> ${escapeHtml(row)}</label>`).join(''))).join(''));
  };
  $('#generateChecklist', root)?.addEventListener('click', generate);
  $('#printChecklist', root)?.addEventListener('click', () => window.print());
  $('#downloadChecklist', root)?.addEventListener('click', () => { if (!latest) generate(); downloadText('app-localization-checklist.md', latest); });
}

function initSubscriptionCalculator(root) {
  $('#calculatePricing', root)?.addEventListener('click', () => {
    const monthly = numberValue('monthly', 4.99, root);
    const currency = value('currency', root) || 'USD';
    const qDisc = numberValue('quarterlyDiscount', 10, root) / 100;
    const aDisc = numberValue('annualDiscount', 30, root) / 100;
    const subscribers = numberValue('subscribers', 1000, root);
    const commission = value('commission', root) === 'custom' ? numberValue('customCommission', 15, root) / 100 : Number(value('commission', root) || 0.15);
    const quarterly = monthly * 3 * (1 - qDisc);
    const annual = monthly * 12 * (1 - aDisc);
    const gross = monthly * subscribers;
    const net = gross * (1 - commission);
    const table = `Monthly: ${currency} ${monthly.toFixed(2)}\nQuarterly: ${currency} ${quarterly.toFixed(2)}\nAnnual: ${currency} ${annual.toFixed(2)}\nGross monthly revenue: ${currency} ${gross.toFixed(2)}\nEstimated net monthly revenue: ${currency} ${net.toFixed(2)}\nEstimated annualized net revenue: ${currency} ${(net * 12).toFixed(2)}`;
    resultBox(item('Pricing estimate', `<div class="kv"><strong>Quarterly price</strong><span>${currency} ${quarterly.toFixed(2)}</span><strong>Annual price</strong><span>${currency} ${annual.toFixed(2)}</span><strong>Gross monthly revenue</strong><span>${currency} ${gross.toFixed(2)}</span><strong>Estimated net revenue</strong><span>${currency} ${net.toFixed(2)}</span><strong>Annualized net</strong><span>${currency} ${(net * 12).toFixed(2)}</span></div><h3>Copyable pricing table</h3><pre>${escapeHtml(table)}</pre><div class="actions">${copyButton(table)}</div>`));
  });
}

function initListingChecker(root) {
  $('#checkListing', root)?.addEventListener('click', () => {
    const critical = [];
    const recommended = [];
    const nice = [];
    if (!value('appName', root)) critical.push('App name is empty.');
    if (!value('privacyUrl', root)) critical.push('Privacy Policy URL is missing.');
    if (value('requiresLogin', root) === 'Yes' && value('testAccount', root) !== 'Yes') critical.push('Login is required but no test account is marked as available.');
    if (!value('subtitle', root)) recommended.push('Subtitle is empty.');
    if (value('keywords', root).length > 100) recommended.push('Keyword field appears to be over 100 characters.');
    if (value('description', root).length < 250) recommended.push('Description is short; explain value, features, and audience more clearly.');
    if (!value('supportUrl', root)) recommended.push('Support URL is recommended.');
    if (numberValue('screenshots', 0, root) < 3) recommended.push('Add enough screenshots to explain the core app experience.');
    if (!value('whatsNew', root)) nice.push('Add What’s New text for updates.');
    if (!value('marketingUrl', root)) nice.push('A marketing URL can help users learn more.');
    const duplicateWords = words(`${value('appName', root)} ${value('subtitle', root)} ${value('keywords', root)}`).filter((word, index, arr) => arr.indexOf(word) !== index && word.length > 3);
    if (duplicateWords.length) nice.push(`Review repeated words: ${dedupe(duplicateWords).slice(0, 8).join(', ')}.`);
    const score = Math.max(0, 100 - critical.length * 25 - recommended.length * 10 - nice.length * 3);
    const checklist = [`Readiness score: ${score}/100`, ...critical.map((x) => `[Critical] ${x}`), ...recommended.map((x) => `[Recommended] ${x}`), ...nice.map((x) => `[Nice-to-have] ${x}`)].join('\n');
    resultBox(`<div class="output-item"><div class="score">${score}</div><p>Readiness score out of 100</p></div>${item('Critical issues', critical.length ? critical.map((x) => `<p class="danger">${escapeHtml(x)}</p>`).join('') : '<p class="success">No critical issues found.</p>')}${item('Recommended improvements', recommended.length ? recommended.map((x) => `<p>${escapeHtml(x)}</p>`).join('') : '<p>No major recommendations.</p>')}${item('Nice-to-have suggestions', nice.length ? nice.map((x) => `<p>${escapeHtml(x)}</p>`).join('') : '<p>No nice-to-have suggestions.</p>')}${item('Copyable submission checklist', `<pre>${escapeHtml(checklist)}</pre><div class="actions">${copyButton(checklist)}</div>`)}`);
  });
}

function initGenericCopyDownload() {
  document.addEventListener('click', (event) => {
    const copy = event.target.closest('[data-copy]');
    if (copy) copyText(copy.dataset.copy, copy);
    const copyTarget = event.target.closest('[data-copy-target]');
    if (copyTarget) copyText($(`#${copyTarget.dataset.copyTarget}`)?.innerText || '', copyTarget);
    const download = event.target.closest('[data-download-target]');
    if (download) downloadText(download.dataset.filename || 'template.md', $(`#${download.dataset.downloadTarget}`)?.innerText || '');
  });
}

const initializers = {
  'screenshot-size-checker': initScreenshotChecker,
  'screenshot-resizer': initScreenshotResizer,
  'title-generator': initTitleGenerator,
  'subtitle-generator': initSubtitleGenerator,
  'keyword-counter': initKeywordCounter,
  'whats-new-generator': initWhatsNew,
  'review-notes-generator': initReviewNotes,
  'privacy-policy-generator': initPrivacyPolicy,
  'terms-generator': initTermsGenerator,
  'aso-keyword-generator': initAsoKeywordGenerator,
  'localization-checklist': initLocalizationChecklist,
  'subscription-price-calculator': initSubscriptionCalculator,
  'listing-checker': initListingChecker
};

initGenericCopyDownload();
const toolRoot = $('[data-tool]');
if (toolRoot) initializers[toolRoot.dataset.tool]?.(toolRoot);
