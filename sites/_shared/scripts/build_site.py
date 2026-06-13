from pathlib import Path
from html import escape
from shutil import copyfile, rmtree
import json
import sys

if len(sys.argv) < 2:
    print('Usage: python3 sites/_shared/scripts/build_site.py <site-dir>', file=sys.stderr)
    raise SystemExit(1)

ROOT = Path(sys.argv[1])
KEY = ROOT.name
DIST = ROOT / 'dist'
SHARED = Path('sites/_shared')

COMPLIANCE = ['about', 'contact', 'privacy-policy', 'cookie-policy', 'terms-of-use', 'disclaimer']

DATE_RELATED = ['age-calculator', 'date-calculator', 'days-between-dates-calculator', 'business-days-calculator', 'birthday-calculator', 'weekday-calculator']
UNIT_RELATED = ['cm-to-inches', 'inches-to-cm', 'kg-to-lbs', 'lbs-to-kg', 'celsius-to-fahrenheit', 'fahrenheit-to-celsius']
MATH = ['percentage-calculator','percentage-increase-calculator','percentage-decrease-calculator','fraction-calculator','fraction-to-decimal-calculator','average-calculator','ratio-calculator','random-number-generator','grade-calculator','gpa-calculator']
MONEY = ['hourly-wage-calculator','salary-calculator','salary-to-hourly-calculator','overtime-calculator','discount-calculator','sales-tax-calculator','tip-calculator','profit-margin-calculator','freelance-rate-calculator','unit-price-calculator']
HEALTH = ['bmi-calculator','bmr-calculator','calorie-calculator','water-intake-calculator','ideal-weight-calculator','body-fat-calculator','pregnancy-due-date-calculator','ovulation-calculator','macro-calculator','steps-to-calories-calculator']
FIN = 'This calculator is for general informational and educational purposes only. It does not provide financial, tax, legal, or payroll advice. Please verify results with a qualified professional or official source when needed.'
MED = 'This calculator is for general informational and educational purposes only. It is not medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for personal health questions.'

def field(id, label, type='number', **extra):
    data = {'id': id, 'label': label, 'type': type}
    data.update(extra)
    return data

def related(pool, slug):
    return [x for x in pool if x != slug][:5]

def basic_tool(slug, name, category, desc, formula, fields, pool, disclaimer=''):
    return {
        'id': slug, 'slug': slug, 'name': name, 'category': category,
        'title': f'{name} | Free Online Calculator', 'description': desc, 'intro': desc,
        'resultExplanation': f'The result explains the main {name.lower()} output based on the values you enter.',
        'formula': formula, 'fields': fields,
        'examples': [
            {'title': 'Everyday example', 'text': f'Enter realistic values to use the {name.lower()} for school, work, home, or planning.'},
            {'title': 'Formula example', 'text': f'The calculator applies: {formula}.'},
            {'title': 'Review example', 'text': 'Use the result as a helpful estimate and verify important decisions when needed.'}
        ],
        'useCases': ['School work','Everyday planning','Quick estimates','Mobile calculations','Reference checks','Learning formulas'],
        'faq': [[f'What does the {name} do?', desc], ['Is my data uploaded?', 'No. The calculation runs in your browser on this static site.'], ['Can I use it on mobile?', 'Yes. The calculator is responsive and keyboard accessible.'], ['Is the result exact?', 'It follows the displayed formula, but rounding and assumptions may apply.'], ['Should I verify important results?', 'Yes. Verify important results with official or professional sources.']],
        'related': related(pool, slug), 'disclaimer': disclaimer
    }

def pages(site, topic, disclaimer):
    name = site['name']; email = site['contactEmail']
    return [
        {'slug':'about','name':'About','title':f'About {name} | Free {topic} Tools','description':f'Learn about {name}, a free browser-based {topic.lower()} calculator website with helpful formulas and examples.','body':[f'{name} provides free browser-based {topic.lower()} calculators for everyday users.', 'The site is static and lightweight. Tools run in your browser without accounts, uploads, paid APIs, or a database.', 'Each calculator includes a formula, examples, common use cases, FAQ, and related links so the result is easier to understand.']},
        {'slug':'contact','name':'Contact','title':f'Contact {name} | Feedback and Calculator Reports','description':f'Contact {name} to report calculator issues, suggest new tools, or send website feedback.','body':[f'Email {email} with feedback, bug reports, or calculator suggestions.', 'For calculation issues, include the page URL, input values, result shown, and result expected.', 'Please do not send sensitive personal information.']},
        {'slug':'privacy-policy','name':'Privacy Policy','title':f'Privacy Policy | {name}','description':f'Read how {name} handles browser-local calculator inputs, cookies, analytics, and advertising disclosures.','body':['Calculator inputs run in your browser and are not uploaded by this static site.', 'If analytics are enabled, aggregate page usage, device type, referrer, and error information may be collected to improve the site. If Google AdSense or other advertising is enabled, third-party vendors including Google may use cookies or similar technologies to serve and measure ads.', 'Cookies may be used for analytics, preferences, security, and advertising if those services are enabled. You can control cookies through browser settings.', f'If you email us, we use your message to respond. Contact {email} for privacy questions.']},
        {'slug':'cookie-policy','name':'Cookie Policy','title':f'Cookie Policy | {name}','description':f'Learn how {name} may use cookies for preferences, analytics, security, and advertising services.','body':[f'{name} may use essential cookies or local storage for basic functionality and preferences.', 'Analytics cookies may help understand aggregate usage. Advertising cookies may be be used if Google AdSense or similar ad services are added.', 'You can control cookies through browser settings.']},
        {'slug':'terms-of-use','name':'Terms of Use','title':f'Terms of Use | {name}','description':f'Read the {name} terms for using free calculators, formulas, examples, and planning information.','body':[f'{name} provides calculators, formulas, and explanatory content for general informational and educational purposes only.', disclaimer, 'The website is provided as-is without a guarantee that every result is suitable for every situation.']},
        {'slug':'disclaimer','name':'Disclaimer','title':f'Disclaimer | {name}','description':f'Read the {name} disclaimer for calculator results, formulas, examples, and educational content.','body':[disclaimer, 'Always verify important results with qualified professionals or official sources when needed.', 'By using this site, you accept responsibility for decisions made from calculator outputs.']},
    ]

def date_tool(id, slug, name, category, desc, formula, fields):
    return basic_tool(slug, name, category, desc, formula, fields, DATE_RELATED, 'DateCalcTools provides general date and time calculations for planning and education. Results should be verified for legal, payroll, medical, travel, or official deadline use.') | {'id': id, 'title': f'{name} | DateCalcTools'}

def table(headers, rows):
    return {'headers': headers, 'rows': [[str(a), str(b)] for a,b in rows]}

def unit_tool(id, slug, name, category, desc, formula, rows):
    t = basic_tool(slug, name, category, desc, formula, [field('value', 'Value to convert', 'number', step='any', value=1)], UNIT_RELATED, 'UnitConvertHub provides general unit conversion tools for education and everyday planning. Verify critical measurements with official sources.')
    t['id'] = id; t['title'] = f'{name} | UnitConvertHub'; t['table'] = table(['Input', 'Converted'], rows)
    return t

SITES = {}
SITES['datecalctools'] = {
 'site': {'name':'DateCalcTools','logoLetter':'D','baseUrl':'https://datecalctools.com','slogan':'Free date, age, and time calculators for everyday planning.','contactEmail':'hello@datecalctools.com','siteScript':'assets/js/calculators.js','theme':{'primary':'#1769e0','primaryDark':'#0f3f91','accent':'#11a7b8','surface2':'#e8f4ff'},'disclaimer':'DateCalcTools provides general date and time calculations for planning and education. Results should be verified for legal, payroll, medical, travel, or official deadline use.','toolsIndex':{'h1':'Free Date and Time Calculators','title':'Date Calculator Tools Index | DateCalcTools','description':'Browse free date, age, weekday, countdown, business day, and time duration calculators that run in your browser.','intro':'Choose a date calculator below. Every tool is free, browser-based, mobile-friendly, and designed for everyday planning.'}},
 'topic': 'Date and time',
 'home': {'eyebrow':'Date calculators','h1':'Free Date and Time Calculators','title':'Free Date and Time Calculators | DateCalcTools','description':'Use free browser-based date, age, business day, weekday, countdown, and time duration calculators for everyday planning.','intro':'Calculate ages, date differences, business days, weekdays, countdowns, and time durations with simple tools that run entirely in your browser.','cardTitle':'Why use DateCalcTools?','cardItems':['Pure front-end calculators with no sign-in','Date-only calculations designed to avoid time zone surprises','Helpful formulas, examples, FAQs, and related tools','Built for students, HR, office planning, and everyday users'],'sections':[{'title':'Popular Date Tools','text':'Start with the most common date calculations.','tools':['age-calculator','date-calculator','days-between-dates-calculator']},{'title':'Age and Birthday Tools','text':'Plan birthdays, forms, records, and milestones.','tools':['birthday-calculator','age-calculator','countdown-calculator']},{'title':'Planning and Workday Tools','text':'Estimate workdays, full weeks, full months, and time spans.','tools':['business-days-calculator','weeks-between-dates-calculator','months-between-dates-calculator']}]},
 'tools': [
    date_tool('age','age-calculator','Age Calculator','Age and birthday','Calculate age from a date of birth to today or any date, including years, months, days, totals, and next birthday timing.','Age = calculation date − birth date, adjusted for completed calendar years and months',[field('birthDate','Date of birth','date'), field('endDate','Calculate age on','date')]),
    date_tool('date-add','date-calculator','Date Calculator','Date math','Add or subtract days, weeks, months, and years from a start date and find the target weekday.','Target date = start date ± years ± months ± weeks × 7 ± days',[field('startDate','Start date','date'), field('operation','Operation','select', options=['Add','Subtract']), field('years','Years', value=0), field('months','Months', value=0), field('weeks','Weeks', value=0), field('days','Days', value=0)]),
    date_tool('days-between','days-between-dates-calculator','Days Between Dates Calculator','Date difference','Calculate the number of days between two dates, with an option to include the end date.','Days between = end date − start date; inclusive days = difference + 1',[field('startDate','Start date','date'), field('endDate','End date','date'), field('inclusive','Include end date','checkbox')]),
    date_tool('business-days','business-days-calculator','Business Days Calculator','Workdays','Count business days between two dates while excluding weekends and optional holiday dates.','Business days = inclusive days − weekend days − listed weekday holidays',[field('startDate','Start date','date'), field('endDate','End date','date'), field('holidays','Holiday dates, comma or line separated','textarea')]),
    date_tool('time-duration','time-duration-calculator','Time Duration Calculator','Time math','Calculate hours and minutes between two times, including overnight durations.','Duration = end time − start time; add 24 hours when crossing midnight',[field('startTime','Start time','time'), field('endTime','End time','time'), field('crossDay','End time is on the next day if needed','checkbox', checked=True)]),
    date_tool('countdown','countdown-calculator','Countdown Calculator','Countdowns','Calculate the time remaining until a future date and time in days, hours, minutes, and seconds.','Countdown = target date and time − current browser time',[field('targetDate','Future date','date'), field('targetTime','Future time','time', value='00:00')]),
    date_tool('birthday','birthday-calculator','Birthday Calculator','Age and birthday','Calculate age, next birthday date, birthday weekday, and days remaining until the next birthday.','Next birthday = birthday month/day this year, or next year if it has passed',[field('birthDate','Birthday','date')]),
    date_tool('weekday','weekday-calculator','Weekday Calculator','Weekdays','Enter any date and find the weekday for birthdays, anniversaries, events, and historical dates.','Weekday is derived from the calendar date using date-only calendar math',[field('date','Date','date')]),
    date_tool('weeks-between','weeks-between-dates-calculator','Weeks Between Dates Calculator','Date difference','Calculate full weeks, remaining days, and total days between two dates.','Full weeks = floor(total days ÷ 7); remaining days = total days mod 7',[field('startDate','Start date','date'), field('endDate','End date','date')]),
    date_tool('months-between','months-between-dates-calculator','Months Between Dates Calculator','Date difference','Calculate complete calendar months and remaining days between two dates.','Full months = completed calendar months between dates; remaining days = leftover days',[field('startDate','Start date','date'), field('endDate','End date','date')]),
 ]
}

# Reuse compact definitions for other sites.
unit_rows = [[1,1],[2,2],[5,5],[10,10],[15,15],[20,20],[25,25],[30,30],[40,40],[50,50],[75,75],[100,100],[150,150],[200,200],[500,500]]
SITES['unitconverthub'] = {'site': {'name':'UnitConvertHub','logoLetter':'U','baseUrl':'https://unitconverthub.com','slogan':'Fast free unit converters for length, weight, temperature, volume, and more.','contactEmail':'hello@unitconverthub.com','siteScript':'assets/js/converters.js','theme':{'primary':'#e56b1f','primaryDark':'#8f3b0d','accent':'#334155','surface2':'#fff1e8'},'disclaimer':'UnitConvertHub provides general unit conversion tools for education and everyday planning. Verify critical engineering, medical, legal, or commercial measurements with official sources.','toolsIndex':{'h1':'Free Online Unit Converter','title':'Unit Converter Tools Index | UnitConvertHub','description':'Browse free unit converters for length, weight, temperature, volume, area, speed, centimeters, inches, kilograms, pounds, and more.','intro':'Choose a converter below. Each page includes a quick calculator, formula, examples, conversion table, use cases, and FAQ.'}}, 'topic':'Unit conversion', 'home': {'eyebrow':'Unit converters','h1':'Free Online Unit Converter','title':'Free Online Unit Converter | UnitConvertHub','description':'Fast free unit converters for centimeters, inches, kilograms, pounds, Celsius, Fahrenheit, milliliters, ounces, liters, gallons, miles, and kilometers.','intro':'Convert common measurements with browser-based tools that show formulas, examples, tables, and practical use cases.','cardTitle':'Why use UnitConvertHub?','cardItems':['Quick converters with no account','Formula and examples on every page','Conversion tables for common values','Helpful for shopping, school, travel, cooking, and work'],'sections':[{'title':'Popular Converters','text':'Start with the most searched everyday conversions.','tools':['cm-to-inches','kg-to-lbs','celsius-to-fahrenheit']},{'title':'Length and Distance Converters','text':'Convert measurements for screens, clothing, DIY projects, maps, and travel.','tools':['inches-to-cm','meters-to-feet','km-to-miles']},{'title':'Volume and Temperature Converters','text':'Convert kitchen, drink, weather, oven, and household measurements.','tools':['ml-to-oz','liters-to-gallons','fahrenheit-to-celsius']}]}, 'tools': [
unit_tool('cm-to-inches','cm-to-inches','CM to Inches Converter','Length converter','Convert centimeters to inches for clothing sizes, screen dimensions, craft projects, and school work.','inches = centimeters / 2.54', [[1,0.3937],[2,0.7874],[5,1.9685],[10,3.9370],[15,5.9055],[20,7.8740],[25,9.8425],[30,11.8110],[40,15.7480],[50,19.6850],[75,29.5276],[100,39.3701],[150,59.0551],[180,70.8661],[200,78.7402]]),
unit_tool('inches-to-cm','inches-to-cm','Inches to CM Converter','Length converter','Convert inches to centimeters for product dimensions, clothing, monitors, furniture, and classroom problems.','centimeters = inches × 2.54', [[1,2.54],[2,5.08],[3,7.62],[4,10.16],[5,12.7],[6,15.24],[8,20.32],[10,25.4],[12,30.48],[24,60.96],[30,76.2],[36,91.44],[48,121.92],[60,152.4],[72,182.88]]),
unit_tool('kg-to-lbs','kg-to-lbs','KG to LBS Converter','Weight converter','Convert kilograms to pounds for body weight, luggage, gym plates, shipping, and product labels.','pounds = kilograms × 2.2046226218', [[1,2.2046],[2,4.4092],[5,11.0231],[10,22.0462],[20,44.0925],[30,66.1387],[40,88.1849],[50,110.2311],[60,132.2774],[70,154.3236],[80,176.3698],[90,198.4160],[100,220.4623],[150,330.6934],[200,440.9245]]),
unit_tool('lbs-to-kg','lbs-to-kg','LBS to KG Converter','Weight converter','Convert pounds to kilograms for fitness, travel, shipping, and international product measurements.','kilograms = pounds / 2.2046226218', [[1,0.4536],[5,2.2680],[10,4.5359],[20,9.0718],[50,22.6796],[75,34.0194],[100,45.3592],[125,56.6990],[150,68.0389],[175,79.3787],[200,90.7185],[250,113.3981],[300,136.0777],[400,181.4369],[500,226.7962]]),
unit_tool('c-to-f','celsius-to-fahrenheit','Celsius to Fahrenheit Converter','Temperature converter','Convert Celsius to Fahrenheit for weather, cooking, science class, travel, and appliance settings.','°F = °C × 9/5 + 32', [[-40,-40],[-20,-4],[-10,14],[0,32],[5,41],[10,50],[15,59],[20,68],[25,77],[30,86],[35,95],[37,98.6],[40,104],[50,122],[100,212]]),
unit_tool('f-to-c','fahrenheit-to-celsius','Fahrenheit to Celsius Converter','Temperature converter','Convert Fahrenheit to Celsius for weather, recipes, travel, classroom work, and science measurements.','°C = (°F − 32) × 5/9', [[-40,-40],[-4,-20],[14,-10],[32,0],[41,5],[50,10],[59,15],[68,20],[77,25],[86,30],[95,35],[98.6,37],[104,40],[122,50],[212,100]]),
unit_tool('meters-to-feet','meters-to-feet','Meters to Feet Converter','Length converter','Convert meters to feet for height, rooms, sports, travel, construction planning, and school work.','feet = meters × 3.280839895', unit_rows),
unit_tool('feet-to-meters','feet-to-meters','Feet to Meters Converter','Length converter','Convert feet to meters for room sizes, elevation, sports, travel, and international measurements.','meters = feet / 3.280839895', unit_rows),
unit_tool('ml-to-oz','ml-to-oz','ML to OZ Converter','Volume converter','Convert milliliters to US fluid ounces for cooking, drinks, skincare, medicine labels, and product sizes.','US fluid ounces = milliliters / 29.5735295625', unit_rows),
unit_tool('oz-to-ml','oz-to-ml','OZ to ML Converter','Volume converter','Convert US fluid ounces to milliliters for recipes, beverages, cosmetics, and product volume labels.','milliliters = US fluid ounces × 29.5735295625', unit_rows),
unit_tool('liters-to-gallons','liters-to-gallons','Liters to Gallons Converter','Volume converter','Convert liters to US gallons for fuel, aquariums, water containers, recipes, and household measurements.','US gallons = liters / 3.785411784', unit_rows),
unit_tool('gallons-to-liters','gallons-to-liters','Gallons to Liters Converter','Volume converter','Convert US gallons to liters for fuel economy, water tanks, aquariums, and household measurements.','liters = US gallons × 3.785411784', unit_rows),
unit_tool('sqft-to-sqm','square-feet-to-square-meters','Square Feet to Square Meters Converter','Area converter','Convert square feet to square meters for apartments, rooms, real estate, flooring, and renovation planning.','square meters = square feet × 0.09290304', unit_rows),
unit_tool('km-to-miles','km-to-miles','KM to Miles Converter','Distance converter','Convert kilometers to miles for running, driving, travel, races, and map distances.','miles = kilometers × 0.6213711922', unit_rows),
unit_tool('miles-to-km','miles-to-km','Miles to KM Converter','Distance converter','Convert miles to kilometers for travel, running, cycling, maps, and international distance comparisons.','kilometers = miles / 0.6213711922', unit_rows),
]}

# Simplified data-driven sites.
def make_site(key, name, letter, base, slogan, email, theme, topic, pool, disclaimer, home_h1, desc, tools):
    SITES[key] = {'site': {'name':name,'logoLetter':letter,'baseUrl':base,'slogan':slogan,'contactEmail':email,'siteScript':'assets/js/calculators.js','theme':theme,'disclaimer':disclaimer,'toolsIndex':{'h1':home_h1,'title':f'{name} Tools Index | {home_h1}','description':f'Browse the full {name} tools index. {desc}','intro':desc}}, 'topic':topic, 'home': {'eyebrow':topic,'h1':home_h1,'title':f'{home_h1} | {name}','description':desc,'intro':desc,'cardTitle':'Free browser-based tools','cardItems':['No account or paid API','Formula and examples on every page','Mobile-friendly calculator pages','Built for helpful SEO content'],'sections':[{'title':'Popular Tools','text':'Start with commonly used calculators.','tools':pool[:3]},{'title':'More Calculators','text':'Use related tools for everyday planning and learning.','tools':pool[3:6]},{'title':'Helpful References','text':'Each page includes formula, examples, FAQ, and related links.','tools':pool[-3:]}]}, 'tools': tools}

make_site('quickmathtools','QuickMathTools','Q','https://quickmathtools.com','Simple free math calculators for school, work, and everyday numbers.','hello@quickmathtools.com',{'primary':'#6d28d9','primaryDark':'#4c1d95','accent':'#2563eb','surface2':'#f1ebff'},'Math calculators',MATH,'QuickMathTools provides educational math calculators. Verify important school, finance, engineering, or official results with the relevant source.','Free Online Math Calculators','Browse free percentage, fraction, average, ratio, random number, grade, and GPA calculators for school and everyday math.', [basic_tool(s, n, 'Math tools', d, f, fs, MATH) for s,n,d,f,fs in [
('percentage-calculator','Percentage Calculator','Calculate common percentage questions such as what is X percent of Y and percentage add or subtract.','result = value × percentage / 100',[field('value','Value', value=100), field('percent','Percent', value=10)]),
('percentage-increase-calculator','Percentage Increase Calculator','Calculate percentage increase from an old value to a new value.','increase % = (new value − old value) / old value × 100',[field('oldValue','Old value', value=100), field('newValue','New value', value=120)]),
('percentage-decrease-calculator','Percentage Decrease Calculator','Calculate percentage decrease from an old value to a new value.','decrease % = (old value − new value) / old value × 100',[field('oldValue','Old value', value=100), field('newValue','New value', value=80)]),
('fraction-calculator','Fraction Calculator','Add, subtract, multiply, or divide two fractions and simplify the result.','a/b ± c/d, a/b × c/d, or a/b ÷ c/d simplified',[field('a','First numerator', value=1), field('b','First denominator', value=2), field('op','Operation','select', options=['Add','Subtract','Multiply','Divide']), field('c','Second numerator', value=1), field('d','Second denominator', value=4)]),
('fraction-to-decimal-calculator','Fraction to Decimal Calculator','Convert a fraction to a decimal and percentage.','decimal = numerator / denominator',[field('num','Numerator', value=1), field('den','Denominator', value=4)]),
('average-calculator','Average Calculator','Calculate mean, sum, count, minimum, and maximum from a list of numbers.','mean = sum of values / count of values',[field('numbers','Numbers, comma or line separated','textarea', value='4, 8, 15, 16, 23, 42')]),
('ratio-calculator','Ratio Calculator','Simplify a ratio and scale it by a factor.','simplified ratio = each value divided by the greatest common divisor',[field('numbers','Ratio numbers, comma separated','text', value='12, 18'), field('scale','Scale factor', value=1)]),
('random-number-generator','Random Number Generator','Generate one or more random numbers between a minimum and maximum value.','random integer between min and max inclusive',[field('min','Minimum', value=1), field('max','Maximum', value=100), field('count','How many numbers', value=5), field('unique','No repeats','checkbox')]),
('grade-calculator','Grade Calculator','Calculate a grade percentage and simple letter grade from points earned and points possible.','grade % = points earned / points possible × 100',[field('earned','Points earned', value=85), field('possible','Points possible', value=100)]),
('gpa-calculator','GPA Calculator','Estimate GPA from course grades and credits using a simple 4.0 scale list.','GPA = sum(grade points × credits) / total credits',[field('courses','Courses as grade,credits lines','textarea', value='A,3\nB,4\nA-,3')])]])

make_site('wagemoneycalc','WageMoneyCalc','W','https://wagemoneycalc.com','Free salary, wage, discount, and money calculators for everyday decisions.','hello@wagemoneycalc.com',{'primary':'#047857','primaryDark':'#064e3b','accent':'#1d4ed8','surface2':'#e8fff4'},'Money calculators',MONEY,FIN,'Free Money and Salary Calculators','Browse free hourly wage, salary, overtime, discount, tax, tip, profit margin, freelance rate, and unit price calculators.', [basic_tool(s, n, 'Money tools', d, f, fs, MONEY, FIN) for s,n,d,f,fs in [
('hourly-wage-calculator','Hourly Wage Calculator','Convert hourly pay into daily, weekly, biweekly, monthly, and annual pay estimates.','annual pay = hourly rate × weekly hours × work weeks',[field('hourly','Hourly wage', value=20),field('hours','Hours per week', value=40),field('weeks','Work weeks per year', value=52),field('tax','Estimated tax percent optional', value=0)]),
('salary-calculator','Salary Calculator','Break an annual salary into monthly, biweekly, weekly, daily, and hourly estimates.','hourly estimate = annual salary / work weeks / weekly hours',[field('salary','Annual salary', value=60000),field('hours','Hours per week', value=40),field('weeks','Work weeks per year', value=52)]),
('salary-to-hourly-calculator','Salary to Hourly Calculator','Convert annual salary to an equivalent hourly wage estimate.','hourly = annual salary / work weeks / weekly hours',[field('salary','Annual salary', value=60000),field('hours','Hours per week', value=40),field('weeks','Work weeks per year', value=52)]),
('overtime-calculator','Overtime Calculator','Estimate total pay with regular hours, overtime hours, and overtime multiplier.','total pay = regular hours × rate + overtime hours × rate × multiplier',[field('rate','Base hourly rate', value=20),field('regular','Regular hours', value=40),field('overtime','Overtime hours', value=5),field('multiplier','Overtime multiplier', value=1.5)]),
('discount-calculator','Discount Calculator','Calculate sale price and savings from an original price and discount percentage.','sale price = original price × (1 − discount % / 100)',[field('price','Original price', value=100),field('discount','Discount percent', value=20),field('extra','Extra discount percent optional', value=0)]),
('sales-tax-calculator','Sales Tax Calculator','Calculate sales tax amount and total price from a price and tax rate.','total = price × (1 + tax rate / 100)',[field('price','Price before tax', value=100),field('tax','Sales tax percent', value=8)]),
('tip-calculator','Tip Calculator','Calculate tip, total bill, and per-person split amount.','total = bill × (1 + tip % / 100); per person = total / people',[field('bill','Bill amount', value=50),field('tip','Tip percent', value=18),field('people','Number of people', value=2)]),
('profit-margin-calculator','Profit Margin Calculator','Calculate profit, profit margin, and markup from cost and selling price.','profit margin = (price − cost) / price × 100',[field('cost','Cost', value=60),field('price','Selling price', value=100)]),
('freelance-rate-calculator','Freelance Rate Calculator','Estimate a minimum freelance hourly rate from target income, billable hours, time off, and platform fee.','rate = target income / billable hours after time off and fees',[field('income','Target annual income', value=80000),field('hours','Billable hours per week', value=25),field('weeksOff','Weeks off per year', value=4),field('fee','Platform fee percent', value=10)]),
('unit-price-calculator','Unit Price Calculator','Compare one or two products by price per unit to find the better value.','unit price = price / quantity',[field('price','Item A price', value=12),field('qty','Item A quantity', value=6),field('priceB','Item B price optional', value=10),field('qtyB','Item B quantity optional', value=4)])]])

make_site('healthlifecalc','HealthLifeCalc','H','https://healthlifecalc.com','Free health and lifestyle calculators for everyday wellness.','hello@healthlifecalc.com',{'primary':'#059669','primaryDark':'#065f46','accent':'#0ea5e9','surface2':'#e7fff5'},'Health calculators',HEALTH,MED,'Free Health and Lifestyle Calculators','Browse free BMI, BMR, calorie, water intake, ideal weight, body fat, pregnancy, ovulation, macro, and steps calculators.', [basic_tool(s, n, 'Health tools', d, f, fs, HEALTH, MED) for s,n,d,f,fs in [
('bmi-calculator','BMI Calculator','Calculate body mass index from metric height and weight inputs.','BMI = weight in kg / height in meters²',[field('weight','Weight kg', value=70),field('height','Height in cm', value=175)]),
('bmr-calculator','BMR Calculator','Estimate basal metabolic rate using the Mifflin-St Jeor formula.','BMR = 10×kg + 6.25×cm − 5×age + sex adjustment',[field('weight','Weight kg', value=70),field('height','Height cm', value=175),field('age','Age', value=30),field('sex','Sex formula','select', options=['Male','Female'])]),
('calorie-calculator','Calorie Calculator','Estimate daily calories from BMR and activity level for general planning.','daily calories = BMR × activity factor',[field('weight','Weight kg', value=70),field('height','Height cm', value=175),field('age','Age', value=30),field('sex','Sex formula','select', options=['Male','Female']),field('activity','Activity level','select', options=['Sedentary','Light','Moderate','Active','Very active'])]),
('water-intake-calculator','Water Intake Calculator','Estimate daily water intake from body weight and activity level.','water ml ≈ body weight kg × 35 plus activity adjustment',[field('weight','Weight kg', value=70),field('activity','Activity level','select', options=['Low','Moderate','High'])]),
('ideal-weight-calculator','Ideal Weight Calculator','Estimate ideal body weight ranges from height and sex using common formulas.','Devine estimate uses height over 5 feet and sex-specific base weight',[field('height','Height cm', value=175),field('sex','Sex formula','select', options=['Male','Female'])]),
('body-fat-calculator','Body Fat Calculator','Estimate body fat percentage from circumference measurements using a Navy-style formula.','body fat estimate uses waist, neck, height, and hip for female formula',[field('sex','Sex formula','select', options=['Male','Female']),field('waist','Waist cm', value=80),field('neck','Neck cm', value=38),field('hip','Hip cm for female formula', value=95),field('height','Height cm', value=175)]),
('pregnancy-due-date-calculator','Pregnancy Due Date Calculator','Estimate a due date from the first day of the last menstrual period.','estimated due date = last menstrual period + 280 days',[field('date','First day of last menstrual period','date')]),
('ovulation-calculator','Ovulation Calculator','Estimate ovulation window from last menstrual period and cycle length.','estimated ovulation date = next period date − 14 days',[field('date','First day of last period','date'),field('cycle','Cycle length in days', value=28)]),
('macro-calculator','Macro Calculator','Calculate daily protein, carbohydrate, and fat grams from calories and macro percentages.','grams = calories × macro percent / calories per gram',[field('calories','Daily calories', value=2000),field('protein','Protein percent', value=30),field('carbs','Carb percent', value=40),field('fat','Fat percent', value=30)]),
('steps-to-calories-calculator','Steps to Calories Calculator','Estimate calories burned from steps, body weight, and stride length.','calories ≈ distance km × weight kg × 0.57',[field('steps','Steps', value=10000),field('weight','Weight kg', value=70),field('stride','Stride length meters', value=0.75)])]])

DATA = SITES[KEY]
SITE = DATA['site']; TOOLS = DATA['tools']; PAGES = pages(SITE, DATA['topic'], SITE['disclaimer']); HOME = DATA['home']
TOOL_BY_SLUG = {t['slug']: t for t in TOOLS}
ROUTES = []

def abs_url(path): return SITE['baseUrl'] + ('/' if path == '/' else path)
def schema(obj): return f'<script type="application/ld+json">{json.dumps(obj, ensure_ascii=False)}</script>'
def nav():
    links = ''.join(f'<a href="{href}">{label}</a>' for label, href in [('Tools','/tools/'),('About','/about/'),('Contact','/contact/'),('Privacy','/privacy-policy/')])
    return f'<header class="site-header"><nav class="navbar" aria-label="Main navigation"><a class="logo" href="/"><span class="logo-mark">{escape(SITE["logoLetter"])}</span><span>{escape(SITE["name"])}</span></a><div class="nav-links">{links}</div></nav></header>'
def footer():
    popular = ''.join(f'<a href="/{t["slug"]}/">{escape(t["name"])}</a>' for t in TOOLS[:5])
    comp = ''.join(f'<a href="/{p["slug"]}/">{escape(p["name"])}</a>' for p in PAGES)
    return f'<footer class="site-footer"><div class="container footer-grid"><div><a class="logo" href="/"><span class="logo-mark">{escape(SITE["logoLetter"])}</span><span>{escape(SITE["name"])}</span></a><p>{escape(SITE["slogan"])}</p><p class="small">{escape(SITE["disclaimer"])}</p></div><div><h3>Popular tools</h3>{popular}</div><div><h3>Site pages</h3><a href="/tools/">All tools</a>{comp}</div><div><h3>About this site</h3><p>Free browser-based tools. No account, database, or paid API is required.</p><p>Contact: {escape(SITE["contactEmail"])}</p></div></div></footer>'
def layout(path, title, desc, body, schemas=None):
    theme = SITE['theme']; style = f':root{{--primary:{theme["primary"]};--primary-dark:{theme["primaryDark"]};--accent:{theme["accent"]};--surface-2:{theme["surface2"]};}}'
    return f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>{escape(title)}</title><meta name="description" content="{escape(desc)}"><link rel="canonical" href="{abs_url(path)}"><meta property="og:type" content="website"><meta property="og:site_name" content="{escape(SITE["name"])}"><meta property="og:title" content="{escape(title)}"><meta property="og:description" content="{escape(desc)}"><meta property="og:url" content="{abs_url(path)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{escape(title)}"><meta name="twitter:description" content="{escape(desc)}"><link rel="stylesheet" href="/assets/css/styles.css"><style>{style}</style>{"".join(schema(s) for s in (schemas or []))}</head><body>{nav()}{body}{footer()}<script src="/assets/js/runtime.js" defer></script><script src="/assets/js/site-tools.js" defer></script></body></html>'
def breadcrumb(items):
    html = '<div class="breadcrumb">' + ' / '.join(escape(label) if i == len(items)-1 else f'<a href="{href}">{escape(label)}</a>' for i,(label,href) in enumerate(items)) + '</div>'
    obj = {'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':i+1,'name':label,'item':abs_url(href)} for i,(label,href) in enumerate(items)]}
    return html, obj
def ad(pos): return f'<div class="ad-slot {"sidebar" if pos == "sidebar" else ""}" data-ad-position="{pos}">Advertisement</div>'
def form_field(f):
    attrs = f'id="{escape(f["id"])}"'
    if 'value' in f: attrs += f' value="{escape(str(f["value"]))}"'
    if 'step' in f: attrs += f' step="{escape(str(f["step"]))}"'
    typ = f.get('type','number')
    if typ == 'select': return f'<label>{escape(f["label"])}<select {attrs}>' + ''.join(f'<option value="{escape(str(o))}">{escape(str(o))}</option>' for o in f['options']) + '</select></label>'
    if typ == 'textarea': return f'<label class="full">{escape(f["label"])}<textarea {attrs}>{escape(str(f.get("value","")))}</textarea></label>'
    if typ == 'checkbox': return f'<label class="check-row"><input id="{escape(f["id"])}" type="checkbox" {"checked" if f.get("checked") else ""}> {escape(f["label"])}</label>'
    return f'<label>{escape(f["label"])}<input type="{typ}" {attrs}></label>'
def faq(faqs): return '<section class="faq"><h2>FAQ</h2>' + ''.join(f'<details><summary>{escape(q)}</summary><p>{escape(a)}</p></details>' for q,a in faqs) + '</section>'
def faq_schema(faqs): return {'@context':'https://schema.org','@type':'FAQPage','mainEntity':[{'@type':'Question','name':q,'acceptedAnswer':{'@type':'Answer','text':a}} for q,a in faqs]}
def card(t): return f'<a class="card" href="/{t["slug"]}/"><span class="tag">{escape(t["category"])}</span><h3>{escape(t["name"])}</h3><p>{escape(t["description"])}</p></a>'
def render_home():
    sections = ''.join(f'<section class="section"><div class="container"><h2>{escape(s["title"])}</h2><p class="lede">{escape(s["text"])}</p><div class="grid">{"".join(card(TOOL_BY_SLUG[x]) for x in s["tools"] if x in TOOL_BY_SLUG)}</div></div></section>' for s in HOME['sections'])
    body = f'<main><section class="hero"><div class="container hero-grid"><div><p class="eyebrow">{escape(HOME["eyebrow"])}</p><h1>{escape(HOME["h1"])}</h1><p class="lede">{escape(HOME["intro"])}</p><div class="cta-row"><a class="button" href="/tools/">Browse Tools</a><a class="button secondary" href="/about/">About {escape(SITE["name"])}</a></div></div><div class="hero-card"><h2>{escape(HOME["cardTitle"])}</h2><ul>{"".join(f"<li>{escape(i)}</li>" for i in HOME["cardItems"])}</ul></div></div></section>{sections}<section class="section"><div class="container"><div class="warning">{escape(SITE["disclaimer"])}</div></div></section></main>'
    return layout('/', HOME['title'], HOME['description'], body)
def render_index():
    bc, bcs = breadcrumb([('Home','/'),('Tools','/tools/')])
    body = f'<main class="page-main"><div class="container">{bc}<h1>{escape(SITE["toolsIndex"]["h1"])}</h1><p class="lede">{escape(SITE["toolsIndex"]["intro"])}</p><div class="grid">{"".join(card(t) for t in TOOLS)}</div></div></main>'
    return layout('/tools/', SITE['toolsIndex']['title'], SITE['toolsIndex']['description'], body, [bcs])
def render_tool(t):
    path = f'/{t["slug"]}/'; bc,bcs = breadcrumb([('Home','/'),('Tools','/tools/'),(t['name'],path)])
    examples = ''.join(f'<div><h3>{escape(e["title"])}</h3><p>{escape(e["text"])}</p></div>' for e in t['examples'])
    uses = ''.join(f'<li>{escape(u)}</li>' for u in t['useCases'])
    rel = ''.join(f'<a href="/{r}/">{escape(TOOL_BY_SLUG.get(r,{}).get("name",r))}</a>' for r in t['related'])
    tbl = ''
    if t.get('table'):
        tbl = f'<section><h2>Common conversion table</h2><div class="conversion-table-wrap"><table class="conversion-table"><thead><tr>{"".join(f"<th>{escape(h)}</th>" for h in t["table"]["headers"])}</tr></thead><tbody>{"".join("<tr>" + "".join(f"<td>{escape(c)}</td>" for c in row) + "</tr>" for row in t["table"]["rows"])}</tbody></table></div></section>'
    body = f'<main class="page-main"><div class="container">{bc}<p class="eyebrow">{escape(t["category"])}</p><h1>{escape(t["name"])}</h1><p class="lede">{escape(t["intro"])}</p>{ad("top")}<div class="tool-layout"><section class="tool-card" data-tool="{escape(t["id"])}"><h2>Free {escape(t["name"])}</h2><p class="small">This calculator runs in your browser and does not upload your input. Results include a Copy Result button after calculation.</p><div class="form-grid">{"".join(form_field(f) for f in t["fields"])}</div><div class="actions"><button data-calculate="{escape(t["id"])}">Calculate</button><button class="secondary" data-reset-tool>Reset</button></div></section><aside class="result-card"><h2>Results</h2><div id="result" class="output"><p class="small">Enter values and calculate to see results here.</p></div>{ad("sidebar")}</aside></div>{ad("after-tool")}<article class="content"><section><h2>What this result means</h2><p>{escape(t["resultExplanation"])}</p></section><section><h2>Formula</h2><div class="formula-box"><code>{escape(t["formula"])}</code></div></section><section><h2>Examples</h2><div class="example-list">{examples}</div></section>{tbl}<section><h2>Common use cases</h2><ul class="use-case-grid">{uses}</ul></section><section><h2>Related tools</h2><div class="related">{rel}</div></section><section><h2>Disclaimer</h2><p>{escape(t.get("disclaimer") or SITE["disclaimer"])}</p></section>{ad("before-faq")}{faq(t["faq"])}</article></div></main>'
    sw = {'@context':'https://schema.org','@type':'SoftwareApplication','name':t['name'],'applicationCategory':'UtilitiesApplication','operatingSystem':'Any','url':abs_url(path),'offers':{'@type':'Offer','price':'0','priceCurrency':'USD'}}
    wp = {'@context':'https://schema.org','@type':'WebPage','name':t['name'],'url':abs_url(path),'description':t['description']}
    return layout(path, t['title'], t['description'], body, [bcs, wp, sw, faq_schema(t['faq'])])
def render_page(p):
    path = f'/{p["slug"]}/'; bc,bcs = breadcrumb([('Home','/'),(p['name'],path)])
    return layout(path, p['title'], p['description'], f'<main class="page-main"><div class="container">{bc}<h1>{escape(p["name"])}</h1><article class="content">{"".join(f"<p>{escape(x)}</p>" for x in p["body"])}</article></div></main>', [bcs])
def write_route(path, html):
    ROUTES.append(path)
    target = DIST / ('index.html' if path == '/' else (path.lstrip('/') if path.endswith('.html') else path.lstrip('/') + 'index.html'))
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(html, encoding='utf-8')

if DIST.exists(): rmtree(DIST)
(DIST/'assets/css').mkdir(parents=True)
(DIST/'assets/js').mkdir(parents=True)
copyfile(SHARED/'assets/css/styles.css', DIST/'assets/css/styles.css')
copyfile(SHARED/'assets/js/runtime.js', DIST/'assets/js/runtime.js')
copyfile(ROOT/SITE['siteScript'], DIST/'assets/js/site-tools.js')
write_route('/', render_home()); write_route('/tools/', render_index())
for t in TOOLS: write_route(f'/{t["slug"]}/', render_tool(t))
for p in PAGES: write_route(f'/{p["slug"]}/', render_page(p))
write_route('/404.html', layout('/404.html', f'Page Not Found | {SITE["name"]}', f'The requested page could not be found on {SITE["name"]}.', '<main class="page-main"><div class="container"><h1>Page not found</h1><p class="lede">Browse the free tools instead.</p><a class="button" href="/tools/">Browse Tools</a></div></main>'))
sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + ''.join(f'  <url><loc>{abs_url(r)}</loc></url>\n' for r in ROUTES if r != '/404.html') + '</urlset>\n'
(DIST/'sitemap.xml').write_text(sitemap, encoding='utf-8')
(DIST/'robots.txt').write_text(f'User-agent: *\nAllow: /\n\nSitemap: {SITE["baseUrl"]}/sitemap.xml\n', encoding='utf-8')
print(f'Built {len(ROUTES)} pages into {DIST}/')
