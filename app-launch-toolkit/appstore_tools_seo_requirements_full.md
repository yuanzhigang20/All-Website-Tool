# App Store 免费工具站完整 SEO + 产品需求文档

> 项目用途：把本需求文档直接交给 Claude Code / Claude AI / Cursor / 其他 AI 编程工具，用来开发一个面向独立开发者、iOS 开发者、App 创业者的英文免费工具网站。  
> 目标：通过 Google SEO 获取自然搜索流量，后续接入 Google AdSense 广告，并可导流到用户自己的 App 开发服务、模板、咨询或其他工具站。  
> 推荐技术路线：第一版使用静态 HTML / SSG / 前端计算，不先做复杂后端。  
> 当前版本：v1.0 完整版  
> 更新时间：2026-06-12

---

## 0. 先确认：是否需要后端？

### 0.1 第一版结论

第一版建议 **不做后端**，优先做成静态站：

```text
HTML / CSS / JavaScript
或 Astro / Next.js SSG / Nuxt SSG / VitePress / Vue Static
Nginx 部署
Cloudflare CDN
Google Search Console
Google Analytics
后续再接 AdSense
```

原因：

1. 大多数 App Store 工具都是本地计算、文本生成、尺寸校验、清单生成，不需要用户账号。
2. 静态 HTML 更容易部署，成本最低，SEO 抓取稳定。
3. Google SEO 第一阶段更重视页面可抓取、内容完整、速度快、移动端体验好。
4. 工具页面越快上线，越早进入 Google 收录周期。

### 0.2 后端以后什么时候再加？

后续出现这些需求时再加后端：

```text
用户登录
保存历史项目
批量图片上传并云端处理
生成 PDF 并保存
AI API 生成 ASO 文案
邮件订阅
付费会员
团队协作
App Store Connect API 自动读取元数据
```

### 0.3 第一版建议实现方式

推荐三种之一：

#### 方案 A：纯静态 HTML + 原生 JS

适合最快上线。

```text
/tools/app-store-screenshot-size-checker/index.html
/tools/app-store-subtitle-generator/index.html
/assets/js/tools/*.js
/assets/css/style.css
```

#### 方案 B：Astro 静态站

最推荐。适合 SEO 内容站 + 工具站。

```text
Astro
Markdown content
Static output
Vanilla JS islands for tools
```

#### 方案 C：Next.js SSG

适合以后扩展复杂功能。

```text
Next.js App Router
generateStaticParams
static export 或 Node 部署
```

如果 Claude 开发，推荐优先：**Astro + TypeScript + 静态输出**。

---

## 1. 项目定位

### 1.1 网站定位

英文定位：

```text
Free App Store tools for indie developers, iOS makers, and app founders.
```

中文解释：

```text
一个给独立开发者、iOS 开发者、App 创业者使用的免费 App Store 上架工具站。
```

主要解决：

1. App Store 截图尺寸检查和生成。
2. App 名称、副标题、关键词、更新说明等元数据生成。
3. 隐私政策、审核说明、上线清单等文档辅助。
4. 订阅价格、本地化、ASO 等上线前准备。

### 1.2 网站目标用户

```text
indie app developers
solo iOS developers
small app startups
Swift / Flutter / React Native developers
developers preparing App Store submission
non-native English developers publishing apps in English
```

### 1.3 变现路径

第一阶段：

```text
Google SEO 自然流量
↓
免费工具使用
↓
AdSense 广告收入
```

第二阶段：

```text
免费工具
↓
开发者模板下载
↓
邮件订阅
↓
付费模板 / 咨询 / App 审核服务 / AI 生成额度
```

第三阶段：

```text
App Store 工具站
↓
导流到用户自己的 Java 全栈开发服务 / App 上架服务 / AI 开发服务
```

---

## 2. 域名和目录建议

### 2.1 域名建议

可以使用以下类型：

```text
applaunchtools.com
appstoretools.com
appstorekit.tools
ioslaunchkit.com
launchmyapp.tools
indieapptools.com
```

如果已经买好域名，直接使用现有域名即可。

### 2.2 URL 结构

推荐结构：

```text
/
/tools/
/tools/app-store-screenshot-size-checker/
/tools/app-store-screenshot-resizer/
/tools/app-store-title-generator/
/tools/app-store-subtitle-generator/
/tools/app-store-keyword-counter/
/tools/aso-keyword-generator/
/tools/whats-new-generator/
/tools/app-review-notes-generator/
/tools/privacy-policy-generator/
/tools/app-localization-checklist/
/tools/subscription-price-calculator/
/tools/app-store-listing-checker/

/guides/
/guides/app-store-screenshot-sizes/
/guides/how-to-write-app-store-subtitle/
/guides/app-store-keyword-field-guide/
/guides/app-privacy-policy-url-guide/
/guides/app-store-review-notes-guide/
/guides/app-store-localization-checklist/

/templates/
/templates/app-review-notes-template/
/templates/app-privacy-policy-template/
/templates/app-store-submission-checklist/
/templates/app-localization-checklist/

/about/
/contact/
/privacy-policy/
/terms/
```

---

## 3. SEO 总规则

### 3.1 每个页面必须具备

每个工具页必须包含：

```text
唯一 URL
唯一 title
唯一 meta description
唯一 H1
工具输入区
工具输出区
How it works 说明
Best practices 内容区
FAQ 区域
Related tools 内链
免责声明
结构化数据 JSON-LD
```

### 3.2 页面内容长度建议

```text
工具页：800 - 1,500 英文词
Guide 页：1,200 - 2,000 英文词
Template 页：800 - 1,500 英文词
首页：600 - 1,000 英文词
```

### 3.3 禁止做法

```text
不要只有一个输入框，没有正文
不要批量生成低质量 AI 文案
不要复制 Apple 官方文档原文
不要冒充 Apple 官方工具
不要使用 Apple 官方 logo 作为网站主 logo
不要暗示与 Apple 有官方合作关系
不要堆砌关键词
不要在第一版放太多广告
不要弹窗遮挡工具
```

### 3.4 品牌免责声明

全站 footer 和相关页面添加：

```text
This website is an independent toolset for app developers and is not affiliated with Apple Inc. App Store, iPhone, iPad, and related names are trademarks of Apple Inc.
```

---

## 4. 官方信息参考原则

开发时需遵守以下原则：

1. App Store 截图尺寸、元数据、隐私政策等规则应以 Apple Developer / App Store Connect 官方文档为准。
2. 不要把工具结果包装为“保证过审”。
3. 隐私政策生成器只能作为模板，不应声称是法律意见。
4. ASO 关键词生成器只能作为辅助建议，不能承诺排名。
5. AdSense 页面必须包含 Privacy Policy、Terms、Contact、About。

---

## 5. 首期 12 个工具页面总览

| 优先级 | 页面名称 | URL | 类型 | 是否需要后端 |
|---|---|---|---|---|
| P0 | App Store Screenshot Size Checker | `/tools/app-store-screenshot-size-checker/` | 图片尺寸检查 | 否 |
| P0 | App Store Screenshot Resizer | `/tools/app-store-screenshot-resizer/` | 图片尺寸转换 | 否，前端 Canvas 可做 |
| P0 | App Store Title Generator | `/tools/app-store-title-generator/` | 文案生成 | 否 |
| P0 | App Store Subtitle Generator | `/tools/app-store-subtitle-generator/` | 文案生成 | 否 |
| P0 | App Store Keyword Counter | `/tools/app-store-keyword-counter/` | 字符统计 | 否 |
| P0 | What’s New Generator | `/tools/whats-new-generator/` | 更新说明生成 | 否 |
| P1 | App Review Notes Generator | `/tools/app-review-notes-generator/` | 审核说明生成 | 否 |
| P1 | Privacy Policy Generator | `/tools/privacy-policy-generator/` | 模板生成 | 否 |
| P1 | ASO Keyword Generator | `/tools/aso-keyword-generator/` | 关键词建议 | 否，规则生成 |
| P1 | App Localization Checklist | `/tools/app-localization-checklist/` | 清单生成 | 否 |
| P1 | Subscription Price Calculator | `/tools/subscription-price-calculator/` | 价格换算 | 否，第一版手动汇率/输入汇率 |
| P1 | App Store Listing Checker | `/tools/app-store-listing-checker/` | 元数据检查 | 否 |

---

# 6. 页面详细需求

---

## 6.1 App Store Screenshot Size Checker

### SEO 信息

```text
URL: /tools/app-store-screenshot-size-checker/
Title: App Store Screenshot Size Checker | Free iPhone & iPad Image Validator
Meta Description: Check if your App Store screenshots match common iPhone and iPad screenshot dimensions before uploading them to App Store Connect.
Primary Keyword: app store screenshot size checker
Secondary Keywords: app store screenshot dimensions, iphone screenshot size checker, app store image validator, app screenshot size
```

### 页面目标

用户上传一张或多张截图，工具读取图片宽高，判断是否符合常见 App Store 截图尺寸类型，并提示是否可能需要调整。

### 输入字段

```text
Image upload: 支持 PNG/JPG/JPEG
Multiple files: 支持 1-10 张
Device category selector: iPhone / iPad / Mac / Apple Watch / Auto Detect
Orientation: Auto / Portrait / Landscape
```

### 前端逻辑

1. 使用 File API 读取图片。
2. 使用 Image 对象获取 naturalWidth / naturalHeight。
3. 对照内置尺寸表匹配。
4. 如果宽高互换，也识别为横屏。
5. 输出：matched / close match / unsupported。

### 内置尺寸表要求

不要写死为唯一标准，页面文案必须说明：

```text
Apple may update screenshot requirements. Always confirm final requirements in App Store Connect before submission.
```

尺寸表以配置文件维护：

```ts
const screenshotSizes = [
  { label: 'iPhone 6.9-inch Portrait', width: 1320, height: 2868, platform: 'iPhone' },
  { label: 'iPhone 6.7-inch Portrait', width: 1290, height: 2796, platform: 'iPhone' },
  { label: 'iPhone 6.5-inch Portrait', width: 1242, height: 2688, platform: 'iPhone' },
  { label: 'iPhone 5.5-inch Portrait', width: 1242, height: 2208, platform: 'iPhone' },
  { label: 'iPad Pro 13-inch Portrait', width: 2064, height: 2752, platform: 'iPad' },
  { label: 'iPad Pro 12.9-inch Portrait', width: 2048, height: 2732, platform: 'iPad' }
]
```

注意：实际尺寸需要开发时再次参考 Apple 官方最新截图规格文档更新。

### 输出结果

每张图显示：

```text
File name
Width x Height
Orientation
Matched device size
Status: Ready / Needs resize / Unknown size
Suggested next action
```

### 页面正文 H2

```text
How to check App Store screenshot sizes
Common App Store screenshot dimensions
Why screenshot size matters before submission
Portrait vs landscape screenshots
What to do if your screenshot does not match
FAQ
```

### FAQ

```text
What size should App Store screenshots be?
Can I upload iPhone screenshots for all device sizes?
Why does App Store Connect reject my screenshots?
Can this tool check iPad screenshots?
Does this tool upload my images to a server?
```

### 隐私说明

```text
Your images are processed locally in your browser and are not uploaded to our server.
```

### Related Tools

```text
App Store Screenshot Resizer
App Store Listing Checker
App Store Submission Checklist
```

### 验收标准

```text
可以上传 1-10 张图片
可以显示每张图片宽高
可以识别横竖屏
可以匹配常见尺寸
不会把图片上传服务器
移动端可用
页面有完整 SEO 内容
```

---

## 6.2 App Store Screenshot Resizer

### SEO 信息

```text
URL: /tools/app-store-screenshot-resizer/
Title: App Store Screenshot Resizer | Resize iPhone & iPad Screenshots Online
Meta Description: Resize app screenshots for common App Store device sizes using a free browser-based tool. No upload required.
Primary Keyword: app store screenshot resizer
Secondary Keywords: resize app store screenshots, iphone screenshot resizer, app screenshot generator, app store image resizer
```

### 页面目标

用户上传截图，选择目标尺寸，工具用前端 Canvas 生成目标尺寸图片并下载。

### 输入字段

```text
Upload image
Target device size dropdown
Fit mode:
- Contain with background
- Cover and crop
- Stretch, not recommended
Background color picker
Output format: PNG / JPG
Quality slider for JPG
```

### 前端逻辑

1. 读取图片。
2. 用户选择目标宽高。
3. 根据 fit mode 计算绘制区域。
4. Canvas 输出 blob。
5. 用户下载。

### 输出结果

```text
Preview image
Original size
Target size
Download PNG/JPG
Warning if image is too small
```

### 正文 H2

```text
Resize App Store screenshots in your browser
Choose the right screenshot size
Contain vs cover crop mode
How to avoid blurry screenshots
Before you upload to App Store Connect
FAQ
```

### FAQ

```text
Can I resize screenshots without losing quality?
What is the best format for App Store screenshots?
Can I create iPhone 6.5-inch screenshots from another size?
Are my screenshots uploaded?
Can I batch resize screenshots?
```

### 验收标准

```text
支持 PNG/JPG
支持至少 6 个常见目标尺寸
支持 contain/cover/stretch
可下载生成图片
图片本地处理
有错误提示
有免责声明
```

---

## 6.3 App Store Title Generator

### SEO 信息

```text
URL: /tools/app-store-title-generator/
Title: App Store Title Generator | Free App Name Ideas for iOS Apps
Meta Description: Generate App Store title ideas based on your app category, audience, features, and keywords.
Primary Keyword: app store title generator
Secondary Keywords: app name generator, iOS app name ideas, app store name generator, mobile app title ideas
```

### 页面目标

根据用户输入的 App 类型、核心功能、关键词和风格，生成多个 App Store 标题方向。

### 输入字段

```text
App category: Productivity / Health / Pet / Finance / Education / Lifestyle / Utility / Other
Main function
Target audience
Primary keyword
Secondary keyword
Brand name optional
Tone: Simple / Professional / Friendly / Premium / Playful
Title length preference: Short / Medium / Keyword-rich
```

### 前端生成逻辑

规则模板组合，不需要 AI API：

```text
[Brand] - [Core Benefit]
[Primary Keyword] for [Audience]
[Action] [Object] Planner
[Benefit] Tracker
[Category] Manager
[Keyword]: [Short Benefit]
```

### 输出结果

输出 20 个标题建议，按类型分组：

```text
Short brand-style titles
Keyword-focused titles
Benefit-focused titles
Professional titles
```

每个标题显示：

```text
Title text
Character count
Potential issue warning
Copy button
```

### 内容提醒

页面须提醒：

```text
Avoid using protected brand names, misleading claims, or terms you do not have rights to use.
```

### 正文 H2

```text
How to choose an App Store title
Brand name vs keyword title
Common app naming mistakes
How long should an app title be?
FAQ
```

### FAQ

```text
What makes a good App Store title?
Should I put keywords in my app name?
Can two apps have the same name?
How do I make my app name sound professional?
Does this tool guarantee ASO ranking?
```

### 验收标准

```text
生成至少 20 个标题
显示字符数
支持复制
支持重新生成
移动端布局正常
无侵权暗示
```

---

## 6.4 App Store Subtitle Generator

### SEO 信息

```text
URL: /tools/app-store-subtitle-generator/
Title: App Store Subtitle Generator | Free iOS App Subtitle Ideas
Meta Description: Create short App Store subtitle ideas that describe your app’s core value, features, and audience.
Primary Keyword: app store subtitle generator
Secondary Keywords: app subtitle ideas, iOS app subtitle, app store metadata generator, ASO subtitle generator
```

### 页面目标

帮助用户生成适合 App Store 的短副标题。页面需要提醒开发者最终以 App Store Connect 限制为准。

### 输入字段

```text
App type
Main benefit
Top feature
Target user
Primary keyword
Tone
Avoid words optional
```

### 生成规则

模板：

```text
[Benefit] for [Audience]
[Feature] made simple
Track [Object] with ease
Plan, track, and manage [Object]
A simple way to [Action]
```

### 输出结果

```text
30 subtitle ideas
Character count
Keyword included: yes/no
Tone label
Copy button
```

### 正文 H2

```text
What is an App Store subtitle?
How to write a clear app subtitle
Subtitle examples by app category
Common subtitle mistakes
FAQ
```

### FAQ

```text
How long can an App Store subtitle be?
Should my subtitle include keywords?
What is the difference between title and subtitle?
Can I change my subtitle later?
Does a subtitle affect ASO?
```

### 验收标准

```text
生成 30 条结果
显示字符数
超长提示
支持复制
支持 tone 切换
```

---

## 6.5 App Store Keyword Counter

### SEO 信息

```text
URL: /tools/app-store-keyword-counter/
Title: App Store Keyword Counter | Count Characters for ASO Keywords
Meta Description: Count characters in your App Store keyword field, clean duplicate words, and organize ASO keywords before submission.
Primary Keyword: app store keyword counter
Secondary Keywords: ASO keyword counter, app store keyword field, iOS keyword character counter, app keyword tool
```

### 页面目标

帮助用户统计 App Store keyword 字段字符数、去重、格式检查。

### 输入字段

```text
Keyword textarea
Separator mode: comma / space / line break
Target limit: default 100 chars, editable
Locale selector optional
```

### 前端逻辑

```text
统计总字符数
统计关键词数量
去除首尾空格
识别重复关键词
识别空项
识别逗号后多余空格
支持一键清理
支持一键复制
```

### 输出结果

```text
Character count
Remaining characters
Duplicate keywords
Cleaned keyword string
Warnings
```

### 正文 H2

```text
How to use the App Store keyword field
Why character count matters
How to clean duplicate keywords
Common ASO keyword mistakes
FAQ
```

### FAQ

```text
How many characters are allowed in the App Store keyword field?
Should I use spaces after commas?
Should I repeat words from my app title?
Can I use competitor names?
How often should I update keywords?
```

### 免责声明

```text
This tool helps you format and count keywords. It does not guarantee search ranking or App Store approval.
```

### 验收标准

```text
准确统计字符数
可设置字符上限
可去重
可清理格式
支持复制
有 SEO 正文
```

---

## 6.6 What’s New Generator

### SEO 信息

```text
URL: /tools/whats-new-generator/
Title: App Store What’s New Generator | Free Release Notes Writer
Meta Description: Generate clear App Store release notes for bug fixes, new features, improvements, and localization updates.
Primary Keyword: app store what's new generator
Secondary Keywords: release notes generator, app update notes generator, what's new app store, app release notes template
```

### 页面目标

帮助开发者快速生成 App Store 更新说明。

### 输入字段

```text
Update type: Bug fixes / New features / UI improvements / Performance / Localization / Mixed
App name optional
New features textarea
Fixed issues textarea
Improvements textarea
Tone: Simple / Friendly / Professional / Short
Include thank-you line: yes/no
```

### 生成模板

```text
Thanks for using [App Name]. This update includes:
- [Feature]
- [Improvement]
- [Fix]

We also improved performance and fixed minor bugs to make the app more reliable.
```

### 输出结果

```text
Short version
Bullet version
Friendly version
Professional version
Copy button
```

### 正文 H2

```text
How to write App Store release notes
What to include in What’s New
Short vs detailed release notes
Release notes examples
FAQ
```

### FAQ

```text
What should I write in App Store What’s New?
Can I just write bug fixes?
Should release notes include every change?
How long should release notes be?
Can I mention upcoming features?
```

### 验收标准

```text
生成至少 4 个版本
支持复制
支持空输入兜底
不生成虚假承诺
语气自然
```

---

## 6.7 App Review Notes Generator

### SEO 信息

```text
URL: /tools/app-review-notes-generator/
Title: App Review Notes Generator | Free App Store Review Instructions Template
Meta Description: Create clear App Store review notes with test account, login steps, subscription details, and reviewer instructions.
Primary Keyword: app review notes generator
Secondary Keywords: app store review notes template, app review instructions, app submission notes, app store connect review notes
```

### 页面目标

帮助开发者生成给 App Review 团队看的审核说明。

### 输入字段

```text
App name
Does app require login? yes/no
Test account username
Test account password
Subscription or in-app purchase? yes/no
Key features to test
Special configuration
Region restrictions
Demo video URL optional
Contact email
```

### 输出模板

```text
Hello App Review Team,

Thank you for reviewing [App Name].

Test Account:
Username: [username]
Password: [password]

Main features to review:
1. [feature]
2. [feature]
3. [feature]

If you need to test subscriptions or in-app purchases, please use the sandbox environment.

Additional notes:
[notes]

Thank you.
```

### 正文 H2

```text
What are App Review notes?
When should you provide a test account?
What to include for subscriptions
Common review note mistakes
FAQ
```

### FAQ

```text
Do I need to provide a test account for App Review?
What should I include in review notes?
Should I explain subscriptions?
Can I include a demo video link?
What if my app uses region-specific features?
```

### 验收标准

```text
根据登录/订阅情况动态生成
支持复制
密码字段不保存
页面提示不要输入真实生产账号密码
```

---

## 6.8 Privacy Policy Generator

### SEO 信息

```text
URL: /tools/privacy-policy-generator/
Title: App Privacy Policy Generator | Free Template for iOS Apps
Meta Description: Create a starter privacy policy template for your iOS app based on data collection, analytics, login, and subscriptions.
Primary Keyword: app privacy policy generator
Secondary Keywords: iOS privacy policy template, app store privacy policy URL, mobile app privacy policy generator, app privacy template
```

### 页面目标

生成一个基础隐私政策模板，适合开发者作为起点，但必须明确不是法律意见。

### 输入字段

```text
Company / developer name
App name
Contact email
Website URL
Data collected:
- Account information
- Email address
- Name
- Pet data / user-generated data
- Photos
- Purchase data
- Usage analytics
- Crash logs
- Device identifiers
Third-party services:
- Google Analytics
- Firebase
- AdMob
- RevenueCat
- Supabase
- Custom backend
Login methods:
- Apple
- Google
- Email
- Phone
User rights section: yes/no
Data deletion contact: yes/no
```

### 输出内容

生成完整英文隐私政策结构：

```text
Privacy Policy
Effective Date
Introduction
Information We Collect
How We Use Information
Third-Party Services
Data Retention
Data Deletion
Children’s Privacy
International Users
Security
Changes to This Policy
Contact Us
```

### 重要免责声明

页面顶部和输出底部都要写：

```text
This generator provides a general template for informational purposes only and does not provide legal advice. You should review the policy with a qualified legal professional before publishing it.
```

### 正文 H2

```text
Why App Store apps need a privacy policy URL
What to include in an app privacy policy
Privacy policy for analytics and third-party SDKs
Data deletion and user privacy choices
FAQ
```

### FAQ

```text
Do iOS apps need a privacy policy?
What is a Privacy Policy URL in App Store Connect?
Can I use this template for my app?
Do I need to mention analytics SDKs?
Should I include data deletion instructions?
```

### 验收标准

```text
能生成完整模板
支持复制
支持下载 .txt / .md
有法律免责声明
不声称保证合规
```

---

## 6.9 ASO Keyword Generator

### SEO 信息

```text
URL: /tools/aso-keyword-generator/
Title: ASO Keyword Generator | Free App Store Keyword Ideas
Meta Description: Generate App Store keyword ideas from your app category, features, audience, and competitor-style terms.
Primary Keyword: ASO keyword generator
Secondary Keywords: app store keyword generator, iOS keyword ideas, app store optimization tool, app keyword research
```

### 页面目标

通过规则生成关键词建议，帮助开发者做 ASO 初步整理。

### 输入字段

```text
App category
Core feature
Target audience
Problem solved
Primary keyword
Country / language
Competitor terms optional, with warning
Tone: broad / long-tail / feature-focused
```

### 生成逻辑

关键词组来源：

```text
核心功能词
用户群体词
动作词
问题词
类别词
长尾组合词
近义词
```

示例：

```text
pet reminder
pet health tracker
dog medication reminder
cat feeding schedule
pet expense tracker
```

### 输出结果

```text
Keyword ideas
Long-tail keyword ideas
Feature keyword ideas
Audience keyword ideas
Suggested keyword field draft
Character count
Copy button
```

### 正文 H2

```text
What is ASO keyword research?
How to choose App Store keywords
Short-tail vs long-tail app keywords
Common ASO keyword mistakes
FAQ
```

### FAQ

```text
What is ASO?
How do I find keywords for my app?
Should I use competitor names?
How many keywords should I use?
Does this tool guarantee ranking?
```

### 验收标准

```text
生成至少 50 个关键词建议
支持分类展示
支持一键复制 100 字符以内草稿
支持去重
有免责声明
```

---

## 6.10 App Localization Checklist

### SEO 信息

```text
URL: /tools/app-localization-checklist/
Title: App Localization Checklist | Free iOS App Translation QA Tool
Meta Description: Generate a localization checklist for your iOS app, App Store metadata, screenshots, privacy policy, and in-app strings.
Primary Keyword: app localization checklist
Secondary Keywords: iOS localization checklist, app store localization, app translation checklist, mobile app localization QA
```

### 页面目标

帮助开发者生成 App 本地化上线检查清单。

### 输入字段

```text
Target languages: multi-select
App type
Has subscriptions? yes/no
Has login? yes/no
Has push notifications? yes/no
Has screenshots localized? yes/no
Has privacy policy localized? yes/no
Has customer support email? yes/no
```

### 输出清单

按模块分组：

```text
App Store Metadata
In-App Strings
Screenshots and Preview
Privacy and Legal
Notifications and Emails
Payments and Subscriptions
QA Testing
Release Preparation
```

### 正文 H2

```text
What to localize before publishing your app
App Store metadata localization
Screenshot localization checklist
In-app string QA
FAQ
```

### FAQ

```text
What parts of an iOS app should be localized?
Do I need localized screenshots?
Should I translate my privacy policy?
How do I test localization?
What are common localization mistakes?
```

### 验收标准

```text
根据选择动态生成清单
支持勾选状态
支持打印
支持下载 Markdown
移动端可用
```

---

## 6.11 Subscription Price Calculator

### SEO 信息

```text
URL: /tools/subscription-price-calculator/
Title: App Subscription Price Calculator | Monthly, Quarterly & Annual Pricing Tool
Meta Description: Compare monthly, quarterly, and yearly subscription prices for your app and estimate discounts, revenue, and local currency display.
Primary Keyword: app subscription price calculator
Secondary Keywords: subscription pricing calculator, app pricing calculator, iOS subscription price, app revenue calculator
```

### 页面目标

帮助开发者规划月/季/年订阅价格、折扣和收入预估。

### 输入字段

```text
Monthly price
Currency
Quarterly discount percentage
Annual discount percentage
Estimated monthly subscribers
Apple commission assumption: 15% / 30% / custom
Churn optional
```

### 计算逻辑

```text
Quarterly price = monthly price * 3 * (1 - quarterly discount)
Annual price = monthly price * 12 * (1 - annual discount)
Gross monthly revenue = monthly price * subscribers
Net revenue = gross * (1 - commission)
Annualized revenue estimate = monthly net * 12
```

### 输出结果

```text
Suggested quarterly price
Suggested annual price
Discount comparison
Gross revenue
Estimated net revenue
Simple pricing table
```

### 注意

不要声称一定符合 App Store 价格等级。页面应提示：

```text
Final App Store pricing must be selected in App Store Connect according to Apple’s available price points and regional pricing options.
```

### 正文 H2

```text
How to price an app subscription
Monthly vs yearly subscription pricing
How to calculate annual discounts
Revenue after platform commission
FAQ
```

### FAQ

```text
What is a good monthly price for an app subscription?
Should I offer yearly pricing?
How much discount should annual plans have?
How do App Store commissions affect revenue?
Can I set different prices by country?
```

### 验收标准

```text
能计算月季年价格
支持 15/30/custom commission
支持复制价格表
支持移动端
有免责声明
```

---

## 6.12 App Store Listing Checker

### SEO 信息

```text
URL: /tools/app-store-listing-checker/
Title: App Store Listing Checker | Review Your App Metadata Before Submission
Meta Description: Check your App Store listing draft for title, subtitle, keywords, description, screenshots, privacy policy, and review notes.
Primary Keyword: app store listing checker
Secondary Keywords: app store metadata checker, app listing checklist, app submission checker, app store connect checklist
```

### 页面目标

用户输入 App Store 元数据草稿，工具给出检查结果和建议。

### 输入字段

```text
App name
Subtitle
Keyword field
Description
Promotional text optional
What's New optional
Privacy Policy URL
Support URL
Marketing URL optional
Number of screenshots
Has review notes? yes/no
Requires login? yes/no
Has test account? yes/no
```

### 检查逻辑

```text
App name empty warning
Subtitle empty warning
Keyword field character count
Description too short warning
Privacy Policy URL required warning
Support URL recommended
Screenshots count warning
Login app without test account warning
What's New empty warning for updates
Duplicate words warning
```

### 输出结果

```text
Overall readiness score
Critical issues
Recommended improvements
Nice-to-have suggestions
Copyable submission checklist
```

### 正文 H2

```text
What to check before App Store submission
App metadata checklist
Screenshots and privacy links
Review notes and test accounts
FAQ
```

### FAQ

```text
What should I check before submitting to App Review?
Do I need a Privacy Policy URL?
How many screenshots should I upload?
What if my app requires login?
Can this tool guarantee approval?
```

### 验收标准

```text
能输出 readiness score
能显示 critical/recommended/nice-to-have
支持复制清单
不承诺过审
```

---

# 7. Guide / Template 页面需求

除了工具页面，还要做内容页，增强 SEO 和内链。

## 7.1 Guide 页面清单

| 页面 | URL | 目标关键词 |
|---|---|---|
| App Store Screenshot Sizes Guide | `/guides/app-store-screenshot-sizes/` | app store screenshot sizes |
| How to Write App Store Subtitle | `/guides/how-to-write-app-store-subtitle/` | how to write app store subtitle |
| App Store Keyword Field Guide | `/guides/app-store-keyword-field-guide/` | app store keyword field |
| App Privacy Policy URL Guide | `/guides/app-privacy-policy-url-guide/` | app privacy policy url |
| App Review Notes Guide | `/guides/app-store-review-notes-guide/` | app store review notes |
| App Store Localization Checklist Guide | `/guides/app-store-localization-checklist/` | app store localization checklist |

每个 guide 页要求：

```text
1,200 - 2,000 英文词
至少 6 个 H2
至少 5 个 FAQ
链接到对应工具页
引用官方文档链接，不复制原文
```

## 7.2 Template 页面清单

| 页面 | URL | 目标关键词 |
|---|---|---|
| App Review Notes Template | `/templates/app-review-notes-template/` | app review notes template |
| App Privacy Policy Template | `/templates/app-privacy-policy-template/` | app privacy policy template |
| App Store Submission Checklist | `/templates/app-store-submission-checklist/` | app store submission checklist |
| App Localization Checklist Template | `/templates/app-localization-checklist/` | app localization checklist template |

每个 template 页要求：

```text
可复制模板
可下载 .md 或 .txt
有说明
有免责声明
链接到相关工具
```

---

# 8. 首页需求

## 8.1 SEO 信息

```text
URL: /
Title: Free App Store Tools for Indie Developers | App Launch Toolkit
Meta Description: Free tools for App Store screenshots, ASO keywords, subtitles, release notes, privacy policies, review notes, and iOS app launch checklists.
Primary Keyword: free app store tools
Secondary Keywords: app launch tools, iOS developer tools, app store connect tools, ASO tools
```

## 8.2 首页结构

```text
Hero section
- H1: Free App Store Tools for Indie Developers
- Subtitle: Prepare screenshots, metadata, keywords, release notes, privacy links, and launch checklists before submitting your app.
- CTA: Browse Tools

Popular Tools
- Screenshot Size Checker
- Screenshot Resizer
- Subtitle Generator
- Keyword Counter
- What’s New Generator
- Review Notes Generator

Launch Checklist Section
SEO Guides Section
Templates Section
Disclaimer Section
```

## 8.3 首页验收标准

```text
首屏清楚说明网站用途
工具卡片可以点击
移动端布局好
有 About / Privacy / Terms / Contact 链接
有独立品牌感，不冒充 Apple
```

---

# 9. 全站组件需求

## 9.1 Header

```text
Logo / Site name
Tools
Guides
Templates
About
```

## 9.2 Footer

```text
Tools links
Guides links
Templates links
Privacy Policy
Terms
Contact
Disclaimer: independent, not affiliated with Apple Inc.
```

## 9.3 Tool Layout

每个工具页使用统一布局：

```text
Breadcrumb
H1
Short intro
Tool card
Result card
How it works
Best practices
FAQ
Related tools
Disclaimer
```

## 9.4 CTA

每个页面底部可以加：

```text
Need a complete launch checklist? Try our App Store Listing Checker.
```

以后可改为导流付费服务：

```text
Need help launching your iOS app? Contact us for App Store submission support.
```

---

# 10. 结构化数据 Schema

## 10.1 Tool 页 JSON-LD

每个工具页添加 WebApplication schema：

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "App Store Screenshot Size Checker",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

## 10.2 FAQ Schema

每个页面 FAQ 添加 FAQPage schema。

注意：FAQ 页面内容必须真实显示在页面上。

## 10.3 Breadcrumb Schema

每个工具页添加 BreadcrumbList schema。

---

# 11. 技术 SEO 要求

## 11.1 必做

```text
sitemap.xml
robots.txt
canonical URL
title/meta description
Open Graph tags
Twitter card tags
lazy loading images
mobile responsive
fast loading
no broken links
custom 404 page
```

## 11.2 sitemap 要包含

```text
首页
所有工具页
所有 guides
所有 templates
About
Contact
Privacy Policy
Terms
```

## 11.3 robots.txt 示例

```txt
User-agent: *
Allow: /

Sitemap: https://YOUR_DOMAIN.com/sitemap.xml
```

## 11.4 canonical 示例

```html
<link rel="canonical" href="https://YOUR_DOMAIN.com/tools/app-store-screenshot-size-checker/" />
```

---

# 12. AdSense 前置要求

申请 AdSense 前，至少完成：

```text
12 个工具页上线
6 个 guide 页上线
4 个 template 页上线
About 页面
Contact 页面
Privacy Policy 页面
Terms 页面
全站无 broken link
没有 coming soon 空页面
每页有独立内容
每页工具可用
移动端体验正常
```

Privacy Policy 必须包含：

```text
Google AdSense / advertising cookies disclosure
Analytics disclosure
Cookie usage
Third-party vendors
Contact email
```

---

# 13. 基础页面需求

## 13.1 About

说明网站是独立开发者工具站，帮助开发者准备 App Store 提交材料。

## 13.2 Contact

包含邮箱、反馈说明、错误报告入口。

## 13.3 Privacy Policy

说明：

```text
本网站使用 analytics
可能使用 cookies
如果接入 AdSense，Google 和第三方供应商可能使用 cookies 投放广告
工具中的图片尽量本地处理，不上传服务器
联系邮箱
```

## 13.4 Terms

说明：

```text
工具仅供参考
不保证 App Store 审核通过
不提供法律意见
不与 Apple 官方关联
用户需自行验证最终要求
```

---

# 14. 开发任务拆分

## 阶段 1：项目初始化

| 编号 | 任务 | 状态 |
|---|---|---|
| 1.1 | 初始化静态站项目 | 未开始 |
| 1.2 | 搭建全站布局 Header/Footer | 未开始 |
| 1.3 | 创建首页 | 未开始 |
| 1.4 | 创建 Tools 列表页 | 未开始 |
| 1.5 | 创建 Guides 列表页 | 未开始 |
| 1.6 | 创建 Templates 列表页 | 未开始 |
| 1.7 | 创建 About/Contact/Privacy/Terms | 未开始 |
| 1.8 | 配置 sitemap/robots | 未开始 |

## 阶段 2：P0 工具页

| 编号 | 工具 | 状态 |
|---|---|---|
| 2.1 | Screenshot Size Checker | 未开始 |
| 2.2 | Screenshot Resizer | 未开始 |
| 2.3 | Title Generator | 未开始 |
| 2.4 | Subtitle Generator | 未开始 |
| 2.5 | Keyword Counter | 未开始 |
| 2.6 | What’s New Generator | 未开始 |

## 阶段 3：P1 工具页

| 编号 | 工具 | 状态 |
|---|---|---|
| 3.1 | App Review Notes Generator | 未开始 |
| 3.2 | Privacy Policy Generator | 未开始 |
| 3.3 | ASO Keyword Generator | 未开始 |
| 3.4 | App Localization Checklist | 未开始 |
| 3.5 | Subscription Price Calculator | 未开始 |
| 3.6 | App Store Listing Checker | 未开始 |

## 阶段 4：内容页

| 编号 | 页面 | 状态 |
|---|---|---|
| 4.1 | App Store Screenshot Sizes Guide | 未开始 |
| 4.2 | Subtitle Guide | 未开始 |
| 4.3 | Keyword Field Guide | 未开始 |
| 4.4 | Privacy Policy URL Guide | 未开始 |
| 4.5 | Review Notes Guide | 未开始 |
| 4.6 | Localization Checklist Guide | 未开始 |
| 4.7 | App Review Notes Template | 未开始 |
| 4.8 | Privacy Policy Template | 未开始 |
| 4.9 | Submission Checklist Template | 未开始 |
| 4.10 | Localization Checklist Template | 未开始 |

## 阶段 5：SEO 和上线

| 编号 | 任务 | 状态 |
|---|---|---|
| 5.1 | 检查所有 title/meta | 未开始 |
| 5.2 | 检查 canonical | 未开始 |
| 5.3 | 检查 FAQ schema | 未开始 |
| 5.4 | 检查 WebApplication schema | 未开始 |
| 5.5 | 检查 sitemap | 未开始 |
| 5.6 | Nginx 部署 | 未开始 |
| 5.7 | 接入 Cloudflare | 未开始 |
| 5.8 | 添加 Google Search Console | 未开始 |
| 5.9 | 添加 Google Analytics | 未开始 |
| 5.10 | Lighthouse 测试 | 未开始 |

---

# 15. 4 周进度计划表

## 第 1 周：站点骨架 + 6 个 P0 工具

| 天数 | 任务 |
|---|---|
| Day 1 | 初始化项目、全站布局、首页、基础页面 |
| Day 2 | Screenshot Size Checker |
| Day 3 | Screenshot Resizer |
| Day 4 | Title Generator + Subtitle Generator |
| Day 5 | Keyword Counter + What’s New Generator |
| Day 6 | 工具页 SEO 正文补齐 |
| Day 7 | 移动端和错误修复 |

## 第 2 周：6 个 P1 工具

| 天数 | 任务 |
|---|---|
| Day 8 | App Review Notes Generator |
| Day 9 | Privacy Policy Generator |
| Day 10 | ASO Keyword Generator |
| Day 11 | Localization Checklist |
| Day 12 | Subscription Price Calculator |
| Day 13 | App Store Listing Checker |
| Day 14 | 全部工具页联调 |

## 第 3 周：Guide + Template 内容页

| 天数 | 任务 |
|---|---|
| Day 15 | Screenshot Sizes Guide |
| Day 16 | Subtitle Guide + Keyword Guide |
| Day 17 | Privacy Policy URL Guide + Review Notes Guide |
| Day 18 | Localization Guide |
| Day 19 | 4 个 Template 页面 |
| Day 20 | 内链和 FAQ schema |
| Day 21 | 内容 QA |

## 第 4 周：部署、SEO、Search Console

| 天数 | 任务 |
|---|---|
| Day 22 | sitemap/robots/canonical |
| Day 23 | Nginx 部署 |
| Day 24 | Cloudflare + HTTPS |
| Day 25 | Search Console + Analytics |
| Day 26 | Lighthouse 优化 |
| Day 27 | 移动端测试 |
| Day 28 | 最终验收，上线记录 |

---

# 16. Claude AI 开发提示词

将下面这段直接发给 Claude：

```text
你是资深全栈工程师 + SEO 产品经理。请根据我提供的 Markdown 需求文档，开发一个英文 App Store 免费工具站。第一版优先做静态站，不要做复杂后端。要求：

1. 使用 Astro / Next.js SSG / 静态 HTML 任选一种适合 SEO 的方式。
2. 每个工具页必须有独立 URL、title、meta description、H1、工具区、正文说明、FAQ、Related Tools、免责声明。
3. 工具必须可用，不能只是静态展示。
4. 图片处理工具必须尽量在浏览器本地完成，不上传服务器。
5. 生成类工具先用规则模板实现，不调用 AI API。
6. 加 sitemap.xml、robots.txt、canonical、Open Graph、FAQ schema、WebApplication schema。
7. 全站英文内容，语气专业、简洁、适合独立开发者。
8. 不要冒充 Apple 官方，不要使用 Apple 官方 logo 作为网站 logo。
9. 页面必须移动端适配，Lighthouse SEO 尽量 90+。
10. 开发完成后给我：启动命令、部署说明、目录结构、已完成页面清单、未完成事项。

请先从首页、全站布局、Tools 列表页、P0 的 6 个工具页开始开发。
```

---

# 17. 下次新会话继续提示词

如果中途没做完，下次新开会话，把下面这段发给 ChatGPT / Claude：

```text
我正在做一个 App Store 免费工具站，用于 Google SEO + 后续 AdSense。网站面向独立开发者和 iOS 开发者。技术路线是静态 HTML / SSG 优先，不先做后端。已经有一份需求文档《App Store 免费工具站完整 SEO + 产品需求文档》。请继续按照文档执行。

当前项目页面规划：
P0 工具：Screenshot Size Checker、Screenshot Resizer、Title Generator、Subtitle Generator、Keyword Counter、What’s New Generator。
P1 工具：App Review Notes Generator、Privacy Policy Generator、ASO Keyword Generator、Localization Checklist、Subscription Price Calculator、App Store Listing Checker。
还需要 Guides、Templates、About、Contact、Privacy、Terms、sitemap、robots、schema、Nginx 部署。

请先问我当前完成到哪一步，然后继续输出下一步开发任务、代码或验收清单。
```

---

# 18. 最终验收清单

## 18.1 功能验收

```text
12 个工具全部可用
所有按钮可点击
所有复制功能正常
所有下载功能正常
图片工具本地处理
移动端可用
错误提示清楚
```

## 18.2 SEO 验收

```text
每页唯一 title
每页唯一 meta description
每页唯一 H1
每页 canonical
每页 FAQ
工具页 WebApplication schema
FAQPage schema
Breadcrumb schema
sitemap.xml 正常
robots.txt 正常
无 noindex 误配置
无 broken links
```

## 18.3 内容验收

```text
不复制 Apple 官方原文
不冒充 Apple 官方
不承诺审核通过
不承诺 ASO 排名
隐私政策生成器有法律免责声明
订阅计算器有价格免责声明
Review Notes 不保存密码
```

## 18.4 部署验收

```text
HTTPS 正常
www 和非 www 统一跳转
页面 200 正常
404 页面正常
静态资源缓存正常
Cloudflare 正常
Search Console 验证成功
Analytics 正常
```

---

# 19. Nginx 部署示例

```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN.com www.YOUR_DOMAIN.com;

    return 301 https://YOUR_DOMAIN.com$request_uri;
}

server {
    listen 443 ssl http2;
    server_name YOUR_DOMAIN.com;

    root /var/www/appstore-tools;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|svg|webp|ico)$ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000";
    }

    access_log /var/log/nginx/appstore-tools.access.log;
    error_log /var/log/nginx/appstore-tools.error.log;
}
```

---

# 20. 备注

这个项目应先做成“免费工具 + SEO 内容 + 模板下载”的站，不要一开始做复杂 SaaS。  
真正开始有 Google 流量后，再考虑：

```text
AI ASO 文案生成
批量截图处理
App Store launch checklist account
邮件订阅
付费模板
App 审核辅助服务
```

