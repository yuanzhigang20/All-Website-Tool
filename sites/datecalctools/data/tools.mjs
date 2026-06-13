const commonFaq = (name, exact = 'The result is exact for the dates and options you enter, but official deadlines should always be verified with the organization that sets them.') => [
  [`What does the ${name} do?`, `It calculates ${name.toLowerCase().replace(' calculator', '')} results from the dates or times you enter and shows the calculation in a clear format.`],
  ['Is my data stored or uploaded?', 'No. The calculation runs in your browser. Date and time values are not sent to a server by this static site.'],
  ['Can I use this calculator on mobile?', 'Yes. The layout is responsive, labels are visible, and the calculator works with a keyboard or touch screen.'],
  ['Is the result exact or an estimate?', exact],
  ['Why should I verify important dates?', 'Rules for legal, payroll, school, medical, and travel deadlines can vary. Use this result as a planning aid, not as an official ruling.']
];

const related = ['age-calculator', 'date-calculator', 'days-between-dates-calculator', 'business-days-calculator', 'birthday-calculator', 'weekday-calculator'];

export const tools = [
  {
    id: 'age', slug: 'age-calculator', name: 'Age Calculator', category: 'Age and birthday',
    title: 'Age Calculator - Calculate Age from Date of Birth | DateCalcTools',
    description: 'Use this free age calculator to calculate your exact age in years, months, days, total days, weeks, months, and days until your next birthday.',
    intro: 'Calculate age from a date of birth to today or to any date, including years, months, days, total days, and next birthday timing.',
    resultExplanation: 'The result shows completed calendar years, months, and days, plus totals that are useful for forms, records, and planning.',
    formula: 'Age = calculation date − birth date, adjusted for completed calendar years and months',
    fields: [
      { id: 'birthDate', label: 'Date of birth', type: 'date', required: true },
      { id: 'endDate', label: 'Calculate age on', type: 'date' }
    ],
    examples: [
      { title: 'School form example', text: 'A child born on 2016-08-15 is 9 years old on 2026-06-13 because the August birthday has not arrived yet.' },
      { title: 'HR record example', text: 'An employee born on 1990-01-10 can calculate age on a benefit eligibility date instead of today.' },
      { title: 'Birthday planning example', text: 'The next birthday count helps plan invitations, gifts, and calendar reminders.' }
    ],
    useCases: ['School and camp forms', 'HR and onboarding records', 'Birthday planning', 'Personal milestones', 'Age verification drafts', 'Family history notes'],
    faq: commonFaq('Age Calculator'), related
  },
  {
    id: 'date-add', slug: 'date-calculator', name: 'Date Calculator', category: 'Date math',
    title: 'Date Calculator - Add or Subtract Days, Weeks, Months, and Years',
    description: 'Add or subtract days, weeks, months, and years from a start date with this free browser-based date calculator.',
    intro: 'Start with a date, choose add or subtract, then enter days, weeks, months, or years to find the target date and weekday.',
    resultExplanation: 'The target date is calculated using calendar arithmetic. Month-end dates clamp to the last valid day when needed.',
    formula: 'Target date = start date ± years ± months ± weeks × 7 ± days',
    fields: [
      { id: 'startDate', label: 'Start date', type: 'date', required: true },
      { id: 'operation', label: 'Operation', type: 'select', options: ['Add', 'Subtract'] },
      { id: 'years', label: 'Years', type: 'number', min: 0, value: 0 },
      { id: 'months', label: 'Months', type: 'number', min: 0, value: 0 },
      { id: 'weeks', label: 'Weeks', type: 'number', min: 0, value: 0 },
      { id: 'days', label: 'Days', type: 'number', min: 0, value: 0 }
    ],
    examples: [
      { title: 'Project planning example', text: 'Add 30 days to 2026-01-01 to get 2026-01-31 for a simple project milestone.' },
      { title: 'Month-end example', text: 'Adding 1 month to January 31 clamps to the last valid day of February.' },
      { title: 'Reminder example', text: 'Subtract 2 weeks from an event date to create a preparation reminder.' }
    ],
    useCases: ['Project milestones', 'Renewal reminders', 'Event planning', 'Warranty windows', 'School assignments', 'Travel planning'],
    faq: commonFaq('Date Calculator'), related
  },
  {
    id: 'days-between', slug: 'days-between-dates-calculator', name: 'Days Between Dates Calculator', category: 'Date difference',
    title: 'Days Between Dates Calculator - Count Days Online',
    description: 'Calculate the number of days between two dates, with an option to include the end date in the total.',
    intro: 'Enter a start date and end date to count days between them, including optional inclusive counting.',
    resultExplanation: 'Exclusive counting measures elapsed days from start to end. Inclusive counting adds the end date for calendar-style counts.',
    formula: 'Days between = end date − start date; inclusive days = difference + 1',
    fields: [
      { id: 'startDate', label: 'Start date', type: 'date', required: true },
      { id: 'endDate', label: 'End date', type: 'date', required: true },
      { id: 'inclusive', label: 'Include end date', type: 'checkbox' }
    ],
    examples: [
      { title: 'Simple count example', text: 'From 2026-01-01 to 2026-01-10 is 9 elapsed days or 10 inclusive calendar days.' },
      { title: 'Travel example', text: 'A trip starting Monday and ending Friday can be counted as 4 nights or 5 inclusive days.' },
      { title: 'Deadline example', text: 'Use inclusive counting when instructions say both the start and end dates count.' }
    ],
    useCases: ['Travel planning', 'Rental periods', 'Deadlines', 'School projects', 'Event countdowns', 'Simple date audits'],
    faq: commonFaq('Days Between Dates Calculator'), related
  },
  {
    id: 'business-days', slug: 'business-days-calculator', name: 'Business Days Calculator', category: 'Workdays',
    title: 'Business Days Calculator - Count Working Days Between Dates',
    description: 'Count business days between two dates while excluding weekends and optional custom holiday dates.',
    intro: 'Calculate working days between two dates, excluding Saturdays, Sundays, and any holiday dates you enter.',
    resultExplanation: 'The result separates business days, weekend days, custom holidays, and total calendar days for transparent planning.',
    formula: 'Business days = inclusive calendar days − weekend days − listed holidays that fall on weekdays',
    fields: [
      { id: 'startDate', label: 'Start date', type: 'date', required: true },
      { id: 'endDate', label: 'End date', type: 'date', required: true },
      { id: 'holidays', label: 'Holiday dates, comma or line separated', type: 'textarea' }
    ],
    examples: [
      { title: 'Work week example', text: 'Monday through Friday in the same week counts as 5 business days.' },
      { title: 'Holiday example', text: 'If a listed holiday falls on Wednesday, it is removed from the business day count.' },
      { title: 'Project example', text: 'Use this to estimate review windows that skip weekends.' }
    ],
    useCases: ['Project timelines', 'Office deadlines', 'Shipping estimates', 'HR requests', 'Invoice terms', 'Review windows'],
    faq: commonFaq('Business Days Calculator', 'It is exact for weekends and holiday dates you enter. It does not automatically know regional holidays.'), related
  },
  {
    id: 'time-duration', slug: 'time-duration-calculator', name: 'Time Duration Calculator', category: 'Time math',
    title: 'Time Duration Calculator - Hours and Minutes Between Times',
    description: 'Calculate hours and minutes between two times, including overnight durations for shifts, study sessions, and meetings.',
    intro: 'Find the duration between a start time and end time, with support for time ranges that cross midnight.',
    resultExplanation: 'The calculator returns total hours and minutes, decimal hours, and total minutes for scheduling or timesheet drafts.',
    formula: 'Duration = end time − start time; add 24 hours when the range crosses midnight',
    fields: [
      { id: 'startTime', label: 'Start time', type: 'time', required: true },
      { id: 'endTime', label: 'End time', type: 'time', required: true },
      { id: 'crossDay', label: 'End time is on the next day if needed', type: 'checkbox', checked: true }
    ],
    examples: [
      { title: 'Meeting example', text: '09:15 to 10:45 equals 1 hour 30 minutes.' },
      { title: 'Overnight example', text: '22:30 to 01:15 with next-day enabled equals 2 hours 45 minutes.' },
      { title: 'Study example', text: 'Use total minutes to track focus sessions.' }
    ],
    useCases: ['Work shifts', 'Study sessions', 'Meeting lengths', 'Workout timing', 'Travel segments', 'Timesheet drafts'],
    faq: commonFaq('Time Duration Calculator'), related: ['time-duration-calculator', 'date-calculator', 'business-days-calculator', 'countdown-calculator', 'weekday-calculator', 'days-between-dates-calculator']
  },
  {
    id: 'countdown', slug: 'countdown-calculator', name: 'Countdown Calculator', category: 'Countdowns',
    title: 'Countdown Calculator - Days, Hours, Minutes, and Seconds Until a Date',
    description: 'Calculate the time remaining until a future date and time in days, hours, minutes, and seconds.',
    intro: 'Enter a future date and optional time to calculate how long remains until that moment.',
    resultExplanation: 'The countdown splits the remaining time into days, hours, minutes, and seconds for easy sharing.',
    formula: 'Countdown = target date and time − current browser time',
    fields: [
      { id: 'targetDate', label: 'Future date', type: 'date', required: true },
      { id: 'targetTime', label: 'Future time', type: 'time', value: '00:00' }
    ],
    examples: [
      { title: 'Event example', text: 'Count down to a birthday, wedding, exam, launch, or trip.' },
      { title: 'Deadline example', text: 'Use a target time when the deadline is not at midnight.' },
      { title: 'Share example', text: 'Copy the result text for a message or reminder.' }
    ],
    useCases: ['Birthdays', 'Trips', 'Launch dates', 'School exams', 'Events', 'Personal goals'],
    faq: commonFaq('Countdown Calculator', 'It is based on your browser clock and local time zone, so check device time settings for important events.'), related
  },
  {
    id: 'birthday', slug: 'birthday-calculator', name: 'Birthday Calculator', category: 'Age and birthday',
    title: 'Birthday Calculator - Next Birthday, Age, and Weekday',
    description: 'Calculate age, next birthday date, birthday weekday, and days remaining until the next birthday.',
    intro: 'Enter a birthday to calculate age today, the next birthday date, weekday, and days remaining.',
    resultExplanation: 'The result combines age and next-birthday planning details in one summary.',
    formula: 'Next birthday = birthday month/day in the current year, or next year if it has already passed',
    fields: [{ id: 'birthDate', label: 'Birthday', type: 'date', required: true }],
    examples: [
      { title: 'Party planning example', text: 'See how many days remain until the next birthday.' },
      { title: 'Weekday example', text: 'Find whether a birthday falls on a weekend this year.' },
      { title: 'Milestone example', text: 'Check upcoming milestone ages for family planning.' }
    ],
    useCases: ['Birthday parties', 'Family calendars', 'Milestone planning', 'Card reminders', 'School forms', 'Personal records'],
    faq: commonFaq('Birthday Calculator'), related
  },
  {
    id: 'weekday', slug: 'weekday-calculator', name: 'Weekday Calculator', category: 'Weekdays',
    title: 'Weekday Calculator - Find the Day of the Week for Any Date',
    description: 'Enter any date and find the weekday, ISO date, and simple planning notes for birthdays, anniversaries, and history.',
    intro: 'Find out whether any date falls on Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, or Sunday.',
    resultExplanation: 'The result shows the weekday for the exact calendar date you enter.',
    formula: 'Weekday is derived from the calendar date using the browser Date object in UTC-safe date-only form',
    fields: [{ id: 'date', label: 'Date', type: 'date', required: true }],
    examples: [
      { title: 'Current date example', text: '2026-06-13 falls on a Saturday.' },
      { title: 'Birthday example', text: 'Check what weekday your birthday lands on this year.' },
      { title: 'History example', text: 'Look up weekdays for historical dates in the supported calendar range.' }
    ],
    useCases: ['Birthdays', 'Anniversaries', 'Event planning', 'Historical dates', 'Travel days', 'School calendars'],
    faq: commonFaq('Weekday Calculator'), related
  },
  {
    id: 'weeks-between', slug: 'weeks-between-dates-calculator', name: 'Weeks Between Dates Calculator', category: 'Date difference',
    title: 'Weeks Between Dates Calculator - Full Weeks and Remaining Days',
    description: 'Calculate full weeks, remaining days, and total days between two dates with this free online calculator.',
    intro: 'Enter two dates to convert the difference into total days, full weeks, and leftover days.',
    resultExplanation: 'The result is useful when a date span is easier to understand as weeks plus remaining days.',
    formula: 'Full weeks = floor(total days ÷ 7); remaining days = total days mod 7',
    fields: [
      { id: 'startDate', label: 'Start date', type: 'date', required: true },
      { id: 'endDate', label: 'End date', type: 'date', required: true }
    ],
    examples: [
      { title: 'Project example', text: 'A 17-day project equals 2 full weeks and 3 remaining days.' },
      { title: 'School example', text: 'Convert an assignment window into weeks for easier planning.' },
      { title: 'Travel example', text: 'Compare longer travel windows in full weeks.' }
    ],
    useCases: ['Project plans', 'School schedules', 'Travel windows', 'Training plans', 'Habit tracking', 'Rental periods'],
    faq: commonFaq('Weeks Between Dates Calculator'), related
  },
  {
    id: 'months-between', slug: 'months-between-dates-calculator', name: 'Months Between Dates Calculator', category: 'Date difference',
    title: 'Months Between Dates Calculator - Full Months and Remaining Days',
    description: 'Calculate complete months and remaining days between two dates for rentals, projects, subscriptions, and planning.',
    intro: 'Find the number of complete calendar months between two dates and the remaining days after those months.',
    resultExplanation: 'The result counts completed month boundaries first, then reports leftover days.',
    formula: 'Full months = completed calendar months between dates; remaining days = end date − date after adding full months',
    fields: [
      { id: 'startDate', label: 'Start date', type: 'date', required: true },
      { id: 'endDate', label: 'End date', type: 'date', required: true }
    ],
    examples: [
      { title: 'Rental example', text: 'Use complete months and days to describe a lease or stay length.' },
      { title: 'Project example', text: 'A project may be easier to explain as 3 months and 5 days than as only days.' },
      { title: 'Subscription example', text: 'Estimate elapsed months between signup and renewal dates.' }
    ],
    useCases: ['Rentals', 'Subscriptions', 'Project periods', 'Personal milestones', 'Warranty windows', 'General planning'],
    faq: commonFaq('Months Between Dates Calculator'), related
  }
];
