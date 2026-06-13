# 五个独立免费工具站 SEO + Google AdSense 需求文档

> 目标：建设 5 个互相独立的英文免费工具网站，每个网站使用独立域名、独立品牌、独立 SEO 关键词池、独立 sitemap、独立 Google Search Console 属性、独立 AdSense 审核与广告位规划。  
> 技术要求：只用前端实现，不需要后端，不需要数据库，不需要登录，不调用付费 API。  
> 变现目标：通过 Google 搜索自然流量进入工具页，接入 Google AdSense 展示广告获得收入。  
> 适合交给：Claude Code / Cursor / Windsurf / 前端开发 AI 执行。
> 每个域名网站在根目录下建立一个单独的文件
---

## 0. 总体战略说明

这不是一个“大而全工具站”，而是五个垂直工具站矩阵：

| 序号 | 独立网站方向 | 建议英文站名 | 核心人群 | 主要流量来源 |
|---|---|---|---|---|
| Site 1 | 日期时间计算器 | DateCalcTools | 普通用户、学生、HR、办公用户 | age calculator / date calculator / days between dates |
| Site 2 | 钱和工资计算器 | WageMoneyCalc | 员工、自由职业者、小商家 | salary calculator / hourly wage calculator / discount calculator |
| Site 3 | 数学基础计算器 | QuickMathTools | 学生、老师、家长、办公用户 | percentage calculator / fraction calculator / average calculator |
| Site 4 | 健康生活计算器 | HealthLifeCalc | 健身、减脂、健康生活用户 | BMI calculator / calorie calculator / BMR calculator |
| Site 5 | 单位转换工具 | UnitConvertHub | 全球普通用户、学生、工程/购物用户 | cm to inches / kg to lbs / celsius to fahrenheit |

五个站不要共用同一个首页，也不要放在同一个主域名的子目录。每个站要有自己的品牌感、首页、分类页、工具页、关于页、隐私政策、Cookie/广告说明、联系页、免责声明。

---

## 1. Google SEO 与 AdSense 合规原则

### 1.1 官方原则

Google AdSense 要求网站具备高质量、原创、能吸引用户的内容。不要只做一个输入框加按钮的薄页面。每个工具页都必须包含：

- 可真实使用的计算工具
- 清晰的公式或计算逻辑
- 示例计算
- 常见使用场景
- FAQ
- 相关工具内链
- 隐私、免责声明、联系信息

Google Search 的核心原则是创建对用户有帮助、可靠、以人为本的内容，而不是只为了操纵搜索排名。因此，每个站都要避免批量生成低质量重复页面。

### 1.2 每个工具页标准结构

每个工具页必须采用以下结构：

```text
H1: Tool Name
Short intro: one clear sentence explaining what the tool does.
Tool card: input fields + result area + reset/share/copy buttons.
Result explanation: explain what the result means.
Formula section: show the formula.
Example section: 2-3 real examples.
Use cases section: who should use this tool.
FAQ section: 5-8 questions.
Related tools section: 6 internal links.
Disclaimer: when needed, especially finance/health pages.
```

### 1.3 AdSense 广告位基本规则

- 广告不能误导用户点击。
- 广告不能贴得离按钮太近，避免 accidental clicks。
- 不要使用 “Click here” “Support us by clicking ads” 等诱导点击文案。
- 移动端首屏不要被广告完全占满。
- 工具按钮、输入框附近保持足够距离。
- 申请 AdSense 前，先让网站有完整内容，不要空页面。

### 1.4 每个站上线前必须有的基础页面

每个独立网站都必须有：

```text
/
/about/
/contact/
/privacy-policy/
/cookie-policy/
/terms-of-use/
/disclaimer/
/sitemap.xml
/robots.txt
```

### 1.5 每个站首发建议页面数量

为了避免 AdSense 审核时被认为内容太少，每个站首发建议不少于：

- 1 个首页
- 1 个分类页或工具索引页
- 10 个高质量工具页
- 5 个说明/合规页面

也就是每个站首发约 17 个页面，五个站合计约 85 个页面。

---

# Site 1：日期时间计算器网站

## 2.1 网站定位

### 建议站名

```text
DateCalcTools
```

### 建议域名方向

```text
datecalctools.com
easydatecalculator.com
daycounttools.com
quickdatecalc.com
```

### 网站 slogan

```text
Free date, age, and time calculators for everyday planning.
```

### 网站说明

这是一个专注日期、年龄、天数、倒计时和工作日计算的免费工具网站。所有工具纯前端运行，不上传用户数据。

## 2.2 SEO 定位

### 核心关键词

```text
age calculator
date calculator
days between dates calculator
business days calculator
time duration calculator
countdown calculator
birthday calculator
```

### 长尾关键词

```text
calculate age from date of birth
how many days between two dates
working days between two dates
how old am I calculator
days until birthday calculator
add days to date calculator
date difference calculator
```

## 2.3 首页结构

### 首页 H1

```text
Free Date and Time Calculators
```

### 首页模块

1. Hero 区：一句话说明网站用途。
2. Popular Date Tools：展示 6 个热门工具。
3. Age & Birthday Tools：年龄和生日工具组。
4. Date Difference Tools：日期差、工作日、加减日期。
5. Time Tools：时间间隔、倒计时。
6. Why use DateCalcTools：说明纯前端、隐私安全、免费。
7. FAQ：关于日期计算的常见问题。

## 2.4 首发 10 个工具页

### 1. Age Calculator

URL:

```text
/age-calculator/
```

Title:

```text
Age Calculator - Calculate Age from Date of Birth
```

Meta description:

```text
Use this free age calculator to calculate your exact age in years, months, days, hours, and minutes from your date of birth.
```

功能：

- 输入出生日期。
- 选择计算到今天或指定日期。
- 输出 years / months / days。
- 输出 total days / total months / total weeks。
- 输出距离下次生日还有多少天。
- 支持复制结果。

页面内容：

- What is an age calculator?
- How to calculate age manually.
- Age calculation examples.
- Common use cases: school forms, HR, birthday planning, official forms.
- FAQ。

---

### 2. Date Calculator

URL:

```text
/date-calculator/
```

功能：

- 输入起始日期。
- 输入加减天数、周数、月数、年数。
- 选择 add 或 subtract。
- 输出目标日期和星期几。

关键词：

```text
add days to date calculator
subtract days from date calculator
date calculator online
```

---

### 3. Days Between Dates Calculator

URL:

```text
/days-between-dates-calculator/
```

功能：

- 输入开始日期和结束日期。
- 输出相差天数。
- 可选包含结束日期。
- 输出相差周数、月数近似值。

---

### 4. Business Days Calculator

URL:

```text
/business-days-calculator/
```

功能：

- 计算两个日期之间的工作日。
- 默认排除周六周日。
- 可选自定义假期日期。
- 输出 business days / weekends / total days。

---

### 5. Time Duration Calculator

URL:

```text
/time-duration-calculator/
```

功能：

- 输入开始时间和结束时间。
- 输出小时、分钟。
- 支持跨天。
- 用于工时、学习时间、会议时长。

---

### 6. Countdown Calculator

URL:

```text
/countdown-calculator/
```

功能：

- 输入未来日期。
- 输出剩余天、小时、分钟、秒。
- 支持复制倒计时文字。

---

### 7. Birthday Calculator

URL:

```text
/birthday-calculator/
```

功能：

- 输入生日。
- 输出年龄。
- 输出下次生日日期。
- 输出生日星期几。
- 输出距离下次生日天数。

---

### 8. Weekday Calculator

URL:

```text
/weekday-calculator/
```

功能：

- 输入任意日期。
- 输出该日期是星期几。
- 适合历史日期、生日、纪念日。

---

### 9. Weeks Between Dates Calculator

URL:

```text
/weeks-between-dates-calculator/
```

功能：

- 输入两个日期。
- 输出完整周数、剩余天数、总天数。

---

### 10. Months Between Dates Calculator

URL:

```text
/months-between-dates-calculator/
```

功能：

- 输入两个日期。
- 输出完整月数、剩余天数。
- 适合租期、项目周期、怀孕周期外的一般日期计算。

## 2.5 广告位规划

每个工具页广告位：

```text
Desktop:
- Header 下方 728x90 或 responsive ad
- 工具结果下方一个 responsive ad
- FAQ 前一个 in-article ad
- 右侧 sticky sidebar ad，可选

Mobile:
- 工具卡片下方一个 responsive ad
- 内容中部一个 in-article ad
- 页面底部一个 responsive ad
```

注意：不要在输入框和 Calculate 按钮中间放广告。

## 2.6 内链策略

Age Calculator 页面推荐内链：

- Birthday Calculator
- Days Between Dates Calculator
- Date Calculator
- Weekday Calculator
- Countdown Calculator
- Time Duration Calculator

---

# Site 2：钱和工资计算器网站

## 3.1 网站定位

### 建议站名

```text
WageMoneyCalc
```

### 建议域名方向

```text
wagemoneycalc.com
salarycalctools.com
paychecktools.com
moneymathcalc.com
```

### slogan

```text
Free salary, wage, discount, and money calculators for everyday decisions.
```

### 网站说明

这个站专注工资、时薪、折扣、税费、利润率、自由职业报价等日常金钱计算。只做教育性计算，不提供投资、贷款或财务建议。

## 3.2 SEO 定位

### 核心关键词

```text
salary calculator
hourly wage calculator
paycheck calculator
overtime calculator
discount calculator
sales tax calculator
tip calculator
profit margin calculator
```

### 长尾关键词

```text
hourly to salary calculator
salary to hourly calculator
calculate overtime pay
discount price calculator
sales tax calculator by percentage
profit margin calculator online
freelance rate calculator
```

## 3.3 首页结构

H1:

```text
Free Money and Salary Calculators
```

首页模块：

1. Popular Money Tools
2. Salary & Wage Calculators
3. Shopping Calculators
4. Small Business Calculators
5. Freelancer Calculators
6. FAQ
7. Disclaimer

## 3.4 首发 10 个工具页

### 1. Hourly Wage Calculator

URL:

```text
/hourly-wage-calculator/
```

Title:

```text
Hourly Wage Calculator - Convert Hourly Pay to Salary
```

功能：

- 输入时薪。
- 输入每周工作小时。
- 输入每年工作周数。
- 输出 daily / weekly / biweekly / monthly / annual pay。
- 可选输入税率，输出税后估算。

内容要求：

- Hourly to annual salary formula.
- Example: $20/hour, 40 hours/week.
- FAQ。
- 免责声明：估算仅供参考，不是税务建议。

---

### 2. Salary Calculator

URL:

```text
/salary-calculator/
```

功能：

- 输入年薪。
- 输出月薪、双周薪、周薪、日薪、时薪。
- 可选每周工作小时。

---

### 3. Salary to Hourly Calculator

URL:

```text
/salary-to-hourly-calculator/
```

功能：

- 输入年薪。
- 输入每周工作小时。
- 输入每年工作周数。
- 输出等效时薪。

---

### 4. Overtime Calculator

URL:

```text
/overtime-calculator/
```

功能：

- 输入基础时薪。
- 输入正常小时数。
- 输入加班小时数。
- 输入加班倍率，如 1.5x、2x。
- 输出总工资。

免责声明：不同地区劳动法不同，结果仅供估算。

---

### 5. Discount Calculator

URL:

```text
/discount-calculator/
```

功能：

- 输入原价。
- 输入折扣百分比。
- 输出节省金额和折后价。
- 支持额外折扣。

---

### 6. Sales Tax Calculator

URL:

```text
/sales-tax-calculator/
```

功能：

- 输入商品价格。
- 输入税率百分比。
- 输出税费和含税总价。

注意：不做自动定位税率，因为纯前端且不需要后端。

---

### 7. Tip Calculator

URL:

```text
/tip-calculator/
```

功能：

- 输入账单金额。
- 选择小费比例。
- 输入人数。
- 输出总金额和每人金额。

---

### 8. Profit Margin Calculator

URL:

```text
/profit-margin-calculator/
```

功能：

- 输入成本。
- 输入售价。
- 输出利润、利润率、加价率。

---

### 9. Freelance Rate Calculator

URL:

```text
/freelance-rate-calculator/
```

功能：

- 输入目标年收入。
- 输入每周可计费小时。
- 输入假期周数。
- 输入平台抽成。
- 输出建议最低时薪。

---

### 10. Unit Price Calculator

URL:

```text
/unit-price-calculator/
```

功能：

- 输入价格和数量。
- 输出每单位价格。
- 支持比较两个商品哪个更划算。

## 3.5 广告位规划

钱和工资类页面用户商业价值较高，但广告不能干扰工具使用。

推荐：

- 工具卡下方广告。
- 公式说明后广告。
- FAQ 前广告。
- 桌面侧边栏广告。

不要：

- 不要在计算结果内部插广告。
- 不要伪装成按钮。

## 3.6 免责声明文案

每个财务相关页面底部必须有：

```text
This calculator is for general informational and educational purposes only. It does not provide financial, tax, legal, or payroll advice. Please verify results with a qualified professional or official source when needed.
```

---

# Site 3：数学基础计算器网站

## 4.1 网站定位

### 建议站名

```text
QuickMathTools
```

### 建议域名方向

```text
quickmathtools.com
simplemathcalc.com
mathhelpertools.com
easypercentagecalc.com
```

### slogan

```text
Simple free math calculators for school, work, and everyday numbers.
```

### 网站说明

面向学生、教师、家长、办公人群，提供百分比、分数、平均数、比例、随机数、成绩等基础数学工具。

## 4.2 SEO 定位

### 核心关键词

```text
percentage calculator
fraction calculator
average calculator
ratio calculator
grade calculator
GPA calculator
random number generator
```

### 长尾关键词

```text
what is x percent of y calculator
percentage increase calculator
percentage decrease calculator
fraction to decimal calculator
average of numbers calculator
ratio simplifier calculator
grade percentage calculator
```

## 4.3 首页结构

H1:

```text
Free Online Math Calculators
```

首页模块：

1. Popular Math Tools
2. Percentage Tools
3. Fraction Tools
4. School Tools
5. Random & Number Tools
6. Math Formula Guides
7. FAQ

## 4.4 首发 10 个工具页

### 1. Percentage Calculator

URL:

```text
/percentage-calculator/
```

功能模块：

- What is X% of Y?
- X is what percent of Y?
- Percentage increase.
- Percentage decrease.
- Add percentage.
- Subtract percentage.

页面内容：

- Percentage formula.
- Real examples: discount, test score, salary increase.
- FAQ。

---

### 2. Percentage Increase Calculator

URL:

```text
/percentage-increase-calculator/
```

功能：

- 输入 old value 和 new value。
- 输出增长百分比。

---

### 3. Percentage Decrease Calculator

URL:

```text
/percentage-decrease-calculator/
```

功能：

- 输入 old value 和 new value。
- 输出下降百分比。

---

### 4. Fraction Calculator

URL:

```text
/fraction-calculator/
```

功能：

- 分数加减乘除。
- 自动约分。
- 输出 mixed number。

---

### 5. Fraction to Decimal Calculator

URL:

```text
/fraction-to-decimal-calculator/
```

功能：

- 输入分子分母。
- 输出小数。
- 输出百分比。

---

### 6. Average Calculator

URL:

```text
/average-calculator/
```

功能：

- 输入多个数字，用逗号或换行分隔。
- 输出 mean、sum、count、min、max。

---

### 7. Ratio Calculator

URL:

```text
/ratio-calculator/
```

功能：

- 输入两个或多个数字。
- 输出最简比例。
- 支持比例放大缩小。

---

### 8. Random Number Generator

URL:

```text
/random-number-generator/
```

功能：

- 输入 min / max。
- 选择生成数量。
- 可选允许重复或不重复。
- 输出随机数列表。

---

### 9. Grade Calculator

URL:

```text
/grade-calculator/
```

功能：

- 输入总分和得分。
- 输出百分比成绩。
- 可选 letter grade。

---

### 10. GPA Calculator

URL:

```text
/gpa-calculator/
```

功能：

- 输入课程、学分、成绩。
- 输出 GPA。
- 支持添加/删除课程行。

## 4.5 广告位规划

数学站用户可能是学生，广告不要过度。

推荐：

- 工具下方。
- 示例区后。
- FAQ 前。

避免：

- 不要在学习公式中间插太多广告。
- 不要让广告遮挡输入区域。

## 4.6 内容差异化策略

数学工具竞争大，所以每个页面必须有：

- 简单解释。
- 手算公式。
- 三个实际生活案例。
- 常见错误提醒。
- 相关计算器内链。

---

# Site 4：健康生活计算器网站

## 5.1 网站定位

### 建议站名

```text
HealthLifeCalc
```

### 建议域名方向

```text
healthlifecalc.com
bodyhealthcalc.com
fitlifecalculator.com
everydayhealthcalc.com
```

### slogan

```text
Free health and lifestyle calculators for everyday wellness.
```

### 网站说明

提供 BMI、BMR、热量、饮水量、理想体重等健康生活估算工具。所有结果只做一般信息参考，不提供医疗诊断或治疗建议。

## 5.2 SEO 定位

### 核心关键词

```text
BMI calculator
BMR calculator
calorie calculator
water intake calculator
ideal weight calculator
body fat calculator
pregnancy due date calculator
ovulation calculator
```

### 长尾关键词

```text
BMI calculator for men
BMI calculator for women
calorie needs calculator
how many calories should I eat
BMR calculator metric imperial
water intake calculator by weight
ideal body weight calculator
```

## 5.3 首页结构

H1:

```text
Free Health and Lifestyle Calculators
```

首页模块：

1. Popular Health Calculators
2. Body Measurement Tools
3. Calorie & Nutrition Tools
4. Wellness Tools
5. Women’s Health Tools
6. Health disclaimer
7. FAQ

## 5.4 首发 10 个工具页

### 1. BMI Calculator

URL:

```text
/bmi-calculator/
```

Title:

```text
BMI Calculator - Calculate Your Body Mass Index
```

功能：

- 支持 metric：cm + kg。
- 支持 imperial：feet/inches + lbs。
- 输出 BMI 数值。
- 输出基础分类。
- 显示计算公式。

页面内容：

- What is BMI?
- BMI formula.
- BMI categories.
- Limitations of BMI.
- FAQ。

免责声明：BMI 不能诊断健康状况。

---

### 2. BMR Calculator

URL:

```text
/bmr-calculator/
```

功能：

- 输入性别、年龄、身高、体重。
- 使用 Mifflin-St Jeor 公式。
- 输出基础代谢率。
- 支持 metric/imperial。

---

### 3. Calorie Calculator

URL:

```text
/calorie-calculator/
```

功能：

- 基于 BMR 和活动水平。
- 输出维持体重、减脂、增肌的估算热量。

---

### 4. Water Intake Calculator

URL:

```text
/water-intake-calculator/
```

功能：

- 输入体重。
- 输入活动水平。
- 输出每日建议饮水量估算。

---

### 5. Ideal Weight Calculator

URL:

```text
/ideal-weight-calculator/
```

功能：

- 输入身高和性别。
- 输出几个常见公式的估算范围。

---

### 6. Body Fat Calculator

URL:

```text
/body-fat-calculator/
```

功能：

- 输入性别、腰围、颈围、身高。
- 女性增加臀围。
- 输出估算体脂率。

免责声明：估算不等同于专业测量。

---

### 7. Pregnancy Due Date Calculator

URL:

```text
/pregnancy-due-date-calculator/
```

功能：

- 输入末次月经日期。
- 输出预产期估算。
- 输出当前孕周估算。

免责声明：必须提示咨询医生。

---

### 8. Ovulation Calculator

URL:

```text
/ovulation-calculator/
```

功能：

- 输入末次月经日期和周期长度。
- 输出排卵期估算。

免责声明：不用于避孕或医疗诊断。

---

### 9. Macro Calculator

URL:

```text
/macro-calculator/
```

功能：

- 输入目标热量。
- 选择蛋白质/碳水/脂肪比例。
- 输出每日克数。

---

### 10. Steps to Calories Calculator

URL:

```text
/steps-to-calories-calculator/
```

功能：

- 输入步数、体重、步幅可选。
- 输出估算消耗热量。

## 5.5 健康类免责声明

每个健康工具页底部必须有：

```text
This calculator is for general informational and educational purposes only. It is not medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for personal health questions.
```

## 5.6 AdSense 注意事项

健康类页面可以接 AdSense，但必须避免：

- 夸大疗效。
- 诊断疾病。
- 替代医生建议。
- 写“你一定需要减肥”这类伤害性表达。

内容表达要中性、健康、教育向。

---

# Site 5：单位转换工具网站

## 6.1 网站定位

### 建议站名

```text
UnitConvertHub
```

### 建议域名方向

```text
unitconverthub.com
quickunitconvert.com
easyunittools.com
convertmeasure.com
```

### slogan

```text
Fast free unit converters for length, weight, temperature, volume, and more.
```

### 网站说明

这是一个纯前端单位换算工具站，提供长度、重量、温度、容量、面积、速度等常见单位转换。适合大量长尾 SEO 页面。

## 6.2 SEO 定位

### 核心关键词

```text
unit converter
cm to inches
inches to cm
kg to lbs
lbs to kg
celsius to fahrenheit
fahrenheit to celsius
ml to oz
```

### 长尾关键词

```text
convert cm to inches online
how many inches in 10 cm
kg to pounds converter
celsius to fahrenheit formula
ml to fluid ounces converter
meters to feet calculator
square feet to square meters converter
```

## 6.3 首页结构

H1:

```text
Free Online Unit Converter
```

首页模块：

1. Popular Converters
2. Length Converters
3. Weight Converters
4. Temperature Converters
5. Volume Converters
6. Area Converters
7. Speed Converters
8. Conversion Formula Guides
9. FAQ

## 6.4 首发 15 个工具页

单位转换站可以比其他站首发更多页面，因为每个页面都比较简单，但必须写独特示例和转换表。

### 1. CM to Inches Converter

URL:

```text
/cm-to-inches/
```

Title:

```text
CM to Inches Converter - Convert Centimeters to Inches
```

功能：

- 输入 cm。
- 输出 inches。
- 显示公式：inches = cm / 2.54。
- 显示常用转换表。

内容：

- What is a centimeter?
- What is an inch?
- Formula.
- Examples.
- FAQ。

---

### 2. Inches to CM Converter

URL:

```text
/inches-to-cm/
```

公式：

```text
cm = inches × 2.54
```

---

### 3. KG to LBS Converter

URL:

```text
/kg-to-lbs/
```

公式：

```text
lbs = kg × 2.2046226218
```

---

### 4. LBS to KG Converter

URL:

```text
/lbs-to-kg/
```

公式：

```text
kg = lbs / 2.2046226218
```

---

### 5. Celsius to Fahrenheit Converter

URL:

```text
/celsius-to-fahrenheit/
```

公式：

```text
°F = °C × 9/5 + 32
```

---

### 6. Fahrenheit to Celsius Converter

URL:

```text
/fahrenheit-to-celsius/
```

公式：

```text
°C = (°F - 32) × 5/9
```

---

### 7. Meters to Feet Converter

URL:

```text
/meters-to-feet/
```

公式：

```text
feet = meters × 3.280839895
```

---

### 8. Feet to Meters Converter

URL:

```text
/feet-to-meters/
```

---

### 9. ML to OZ Converter

URL:

```text
/ml-to-oz/
```

说明：默认使用 US fluid ounces。

---

### 10. OZ to ML Converter

URL:

```text
/oz-to-ml/
```

---

### 11. Liters to Gallons Converter

URL:

```text
/liters-to-gallons/
```

说明：默认使用 US gallons。

---

### 12. Gallons to Liters Converter

URL:

```text
/gallons-to-liters/
```

---

### 13. Square Feet to Square Meters Converter

URL:

```text
/square-feet-to-square-meters/
```

---

### 14. KM to Miles Converter

URL:

```text
/km-to-miles/
```

---

### 15. Miles to KM Converter

URL:

```text
/miles-to-km/
```

## 6.5 单位转换页面固定内容模板

每个单位转换页必须包含：

```text
H1
Quick converter
Formula
Example conversions
Common conversion table
When to use this converter
Related converters
FAQ
```

转换表至少 15 行，例如 CM to Inches：

```text
1 cm = 0.3937 in
2 cm = 0.7874 in
5 cm = 1.9685 in
10 cm = 3.937 in
...
```

## 6.6 避免低质量程序化 SEO

单位转换站最容易被做成低质量批量页面，所以必须避免：

- 每页只有单位名替换。
- 内容段落完全重复。
- 没有独特示例。
- 没有常用转换表。
- 没有相关使用场景。

每页都要有独特使用场景。例如：

- cm to inches：服装尺码、屏幕尺寸、手工制作。
- kg to lbs：体重、行李、健身重量。
- ml to oz：厨房、饮品、化妆品容量。
- celsius to fahrenheit：天气、烤箱、科学实验。

---

# 7. 五个网站统一技术架构

## 7.1 技术栈

推荐：

```text
Astro + TypeScript + Vanilla JS
```

或：

```text
Vite + React + TypeScript
```

如果要极简：

```text
HTML + CSS + Vanilla JavaScript
```

最推荐 Astro，因为：

- 静态页面天然适合 SEO。
- 构建后可部署到任意静态服务器。
- 页面加载快。
- 可以为每个站复用组件模板。

## 7.2 不需要后端

所有计算都在浏览器完成：

- 不上传文件。
- 不保存数据。
- 不登录。
- 不调用 API。
- 不需要数据库。

## 7.3 每个站目录结构建议

每个网站独立仓库，也可以 monorepo 管理。

```text
/sites/datecalctools/
/sites/wagemoneycalc/
/sites/quickmathtools/
/sites/healthlifecalc/
/sites/unitconverthub/
```

每个站内部：

```text
src/
  components/
    Header.astro
    Footer.astro
    ToolCard.astro
    AdSlot.astro
    FAQ.astro
    RelatedTools.astro
    Disclaimer.astro
  layouts/
    BaseLayout.astro
    ToolLayout.astro
  pages/
    index.astro
    about.astro
    contact.astro
    privacy-policy.astro
    cookie-policy.astro
    terms-of-use.astro
    disclaimer.astro
    tools/*.astro
  data/
    tools.ts
    faqs.ts
    seo.ts
public/
  favicon.svg
  robots.txt
```

## 7.4 前端功能要求

每个工具页面都要有：

- 输入验证。
- 错误提示。
- Reset 按钮。
- Copy Result 按钮。
- Result card。
- 无刷新计算。
- 移动端适配。
- keyboard accessible。
- 表单 label 完整。

## 7.5 SEO 技术要求

每个页面必须有：

- 唯一 title。
- 唯一 meta description。
- canonical URL。
- Open Graph tags。
- Twitter card tags。
- JSON-LD structured data。
- H1 只有一个。
- 合理 H2/H3 结构。
- sitemap.xml。
- robots.txt。
- 页面加载速度优秀。

## 7.6 结构化数据建议

工具页使用：

```text
SoftwareApplication
FAQPage
BreadcrumbList
WebPage
```

注意：结构化数据必须和页面可见内容一致。

## 7.7 性能要求

- 首页 Lighthouse Performance ≥ 90。
- SEO ≥ 95。
- Accessibility ≥ 90。
- 首屏 JS 尽量少。
- CSS 不要过大。
- 所有图标使用 SVG。
- 不使用重型 UI 库。

---

# 8. 五个站的独立品牌差异

虽然五个站可以共用代码模板，但前端表现要略有差异，避免像复制站群。

## 8.1 DateCalcTools 风格

- 主色：蓝色 / 青色。
- 视觉关键词：calendar, time, planning。
- 图标：calendar, clock, birthday cake。

## 8.2 WageMoneyCalc 风格

- 主色：绿色 / 深蓝。
- 视觉关键词：money, salary, shopping, business。
- 图标：dollar, wallet, receipt。

## 8.3 QuickMathTools 风格

- 主色：紫色 / 靛蓝。
- 视觉关键词：numbers, formula, school。
- 图标：calculator, percent, fraction。

## 8.4 HealthLifeCalc 风格

- 主色：绿色 / 柔和蓝。
- 视觉关键词：wellness, body, healthy lifestyle。
- 图标：heart, water, body scale。

## 8.5 UnitConvertHub 风格

- 主色：橙色 / 深灰。
- 视觉关键词：measure, ruler, conversion。
- 图标：ruler, scale, thermometer。

---

# 9. 每个站的 AdSense 接入方案

## 9.1 申请前准备

每个站申请 AdSense 前要完成：

- 至少 15-20 个完整页面。
- 所有工具能正常使用。
- 没有 broken links。
- Privacy Policy 中说明使用 Google AdSense / cookies。
- Contact 页面可访问。
- About 页面说明网站目的。
- 页面不是空模板。
- 移动端体验正常。

## 9.2 广告组件

创建统一组件：

```text
AdSlot
```

参数：

```text
position: top | after-tool | in-content | sidebar | bottom
format: responsive | leaderboard | rectangle | in-article
```

开发阶段展示 placeholder：

```text
Advertisement
```

上线 AdSense 后替换为 Google 广告代码。

## 9.3 推荐广告位

每个工具页：

```text
1. Header 下方：不影响首屏工具使用。
2. Tool result 下方：用户完成计算后可见。
3. 内容中段：公式或示例之后。
4. FAQ 前：长内容页补充。
5. Desktop sidebar：可选。
```

## 9.4 禁止广告位

```text
- Calculate 按钮上方紧贴广告
- 输入框中间广告
- 结果文字伪装成广告
- 广告标题写成 Download / Continue / Start
- 移动端首屏连续多个广告
```

---

# 10. SEO 内容生产规范

## 10.1 每个工具页最少正文规模

每个页面除工具以外，正文建议：

```text
800 - 1500 English words
```

单位转换页可以稍短，但必须有转换表、公式和示例。

## 10.2 FAQ 模板

每个页面至少 5 个 FAQ：

```text
1. What does this calculator do?
2. What formula does it use?
3. Is the result exact or an estimate?
4. Can I use this calculator on mobile?
5. Is my data stored or uploaded?
```

再加 2-3 个页面专属 FAQ。

## 10.3 页面语气

- 英文自然。
- 简短句子。
- 解释清楚。
- 不夸张。
- 不承诺专业建议。
- 不堆砌关键词。

## 10.4 内链规则

每个工具页至少链接到：

- 同站 5 个相关工具。
- 首页。
- 分类页。
- 免责声明或隐私页。

站与站之间不要过度互链。可以在 footer 放：

```text
Other free calculator sites by our team
```

但建议初期不要大量交叉链接，避免像低质量站群。

---

# 11. 上线顺序建议

不要五个站同时粗糙上线。建议分批：

## 阶段 1：先上线 DateCalcTools

原因：日期类工具实现简单、风险低、无需免责声明复杂化。

首发页面：

- 首页
- 10 个工具页
- 5 个基础页面

## 阶段 2：上线 UnitConvertHub

原因：可以批量扩展，长尾词多。

首发页面：

- 首页
- 15 个转换页
- 5 个基础页面

## 阶段 3：上线 QuickMathTools

原因：基础数学需求稳定。

首发页面：

- 首页
- 10 个工具页
- 5 个基础页面

## 阶段 4：上线 WageMoneyCalc

原因：商业价值高，但免责声明要写好。

## 阶段 5：上线 HealthLifeCalc

原因：流量大，但健康类内容要谨慎，不做医疗建议。

---

# 12. 验收标准

## 12.1 功能验收

每个工具页：

- 输入合法数据后结果正确。
- 输入非法数据有错误提示。
- Reset 可清空。
- Copy Result 可复制。
- 移动端正常。
- 不刷新页面即可计算。

## 12.2 SEO 验收

每个页面：

- title 唯一。
- meta description 唯一。
- H1 唯一。
- 有 canonical。
- 有结构化数据。
- 有 FAQ。
- 有相关工具内链。
- sitemap 包含该页面。
- robots 没有误屏蔽。

## 12.3 AdSense 验收

每个站：

- About 页面完整。
- Contact 页面完整。
- Privacy Policy 提到 cookies 和 advertising。
- Terms of Use 完整。
- Disclaimer 完整。
- 广告位不误导点击。
- 移动端广告不遮挡工具。

## 12.4 性能验收

- Lighthouse Performance ≥ 90。
- SEO ≥ 95。
- Accessibility ≥ 90。
- 无明显 CLS 布局跳动。
- 首屏工具快速可用。

---

# 13. 给开发 AI 的总执行提示词

下面这段可以直接喂给 Claude Code / Cursor：

```text
请根据本需求文档，开发 5 个互相独立的英文免费工具网站。每个网站使用独立品牌、独立首页、独立工具页、独立 SEO meta、独立 sitemap、独立 robots.txt、独立合规页面。所有工具必须纯前端运行，不需要后端、不需要数据库、不需要登录、不上传用户数据。

优先使用 Astro + TypeScript 实现静态站点。每个工具页都必须包含真实可用的计算器、公式说明、示例、FAQ、相关工具内链、免责声明。页面结构必须符合 SEO 和 Google AdSense 审核需求，不能做只有输入框和按钮的薄内容页面。

请先实现 Site 1 DateCalcTools，再实现 Site 5 UnitConvertHub，然后依次实现 QuickMathTools、WageMoneyCalc、HealthLifeCalc。开发时复用组件，但每个站必须有不同品牌、颜色、文案和 SEO 定位，避免像重复站点。
```

---

# 14. 最终结论

这五组应该拆成五个独立网站，而不是一个网站的五个分类：

```text
DateCalcTools.com       日期时间工具站
WageMoneyCalc.com       钱和工资工具站
QuickMathTools.com      数学基础工具站
HealthLifeCalc.com      健康生活工具站
UnitConvertHub.com      单位转换工具站
```

这样做的好处：

- 每个域名关键词更垂直。
- 每个站更容易建立主题相关性。
- SEO 内容结构更清晰。
- AdSense 可以逐站申请和测试。
- 后续可以单独扩展、出售或改版。

但要注意：五个站都必须认真做内容和工具体验，不能只是换皮复制。Google 更看重有帮助、原创、能吸引用户的内容，因此每个站都必须做成真正有用的免费工具站。
