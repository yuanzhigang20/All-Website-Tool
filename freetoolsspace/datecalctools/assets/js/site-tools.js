(() => {
  const rt = ToolRuntime;
  const MS_DAY = 86400000;
  const pad = (n) => String(n).padStart(2, '0');
  const parseDate = (value) => {
    if (!value) return null;
    const [y, m, d] = value.split('-').map(Number);
    if (!y || !m || !d) return null;
    return new Date(Date.UTC(y, m - 1, d));
  };
  const fmt = (date) => `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
  const weekday = (date) => date.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
  const diffDays = (a, b) => Math.round((b - a) / MS_DAY);
  const daysInMonth = (y, m0) => new Date(Date.UTC(y, m0 + 1, 0)).getUTCDate();
  function addMonths(date, months) {
    const y = date.getUTCFullYear();
    const m = date.getUTCMonth() + months;
    const targetY = y + Math.floor(m / 12);
    const targetM = ((m % 12) + 12) % 12;
    const d = Math.min(date.getUTCDate(), daysInMonth(targetY, targetM));
    return new Date(Date.UTC(targetY, targetM, d));
  }
  function addDate(date, { years = 0, months = 0, weeks = 0, days = 0 }, sign = 1) {
    let next = addMonths(date, sign * (years * 12 + months));
    next = new Date(next.getTime() + sign * (weeks * 7 + days) * MS_DAY);
    return next;
  }
  function ageParts(birth, end) {
    let years = end.getUTCFullYear() - birth.getUTCFullYear();
    let months = end.getUTCMonth() - birth.getUTCMonth();
    let days = end.getUTCDate() - birth.getUTCDate();
    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), 0));
      days += prevMonth.getUTCDate();
    }
    if (months < 0) { years -= 1; months += 12; }
    return { years, months, days };
  }
  function nextBirthday(birth, from) {
    const y = from.getUTCFullYear();
    let next = new Date(Date.UTC(y, birth.getUTCMonth(), Math.min(birth.getUTCDate(), daysInMonth(y, birth.getUTCMonth()))));
    if (next < from) next = new Date(Date.UTC(y + 1, birth.getUTCMonth(), Math.min(birth.getUTCDate(), daysInMonth(y + 1, birth.getUTCMonth()))));
    return next;
  }
  const requireDate = (id, label) => {
    const date = parseDate(rt.value(id));
    if (!date) throw new Error(`Enter a valid ${label}.`);
    return date;
  };
  const nonNegative = (id) => Math.max(0, Math.floor(rt.number(id, 0)));

  const handlers = {
    age() {
      const birth = requireDate('birthDate', 'date of birth');
      const end = parseDate(rt.value('endDate')) || new Date();
      const today = new Date(Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()));
      if (birth > today) throw new Error('Date of birth must be on or before the calculation date.');
      const age = ageParts(birth, today);
      const totalDays = diffDays(birth, today);
      const nb = nextBirthday(birth, today);
      rt.output('Age result', [
        ['Age', `${age.years} years, ${age.months} months, ${age.days} days`],
        ['Total days', `${totalDays.toLocaleString()} days`],
        ['Total weeks', `${Math.floor(totalDays / 7).toLocaleString()} weeks and ${totalDays % 7} days`],
        ['Approx. total months', `${(age.years * 12 + age.months).toLocaleString()} months`],
        ['Next birthday', `${fmt(nb)} (${weekday(nb)})`],
        ['Days until next birthday', `${diffDays(today, nb)} days`]
      ]);
    },
    'date-add'() {
      const start = requireDate('startDate', 'start date');
      const sign = rt.value('operation') === 'Subtract' ? -1 : 1;
      const target = addDate(start, { years: nonNegative('years'), months: nonNegative('months'), weeks: nonNegative('weeks'), days: nonNegative('days') }, sign);
      rt.output('Date result', [
        ['Start date', `${fmt(start)} (${weekday(start)})`],
        ['Operation', rt.value('operation')],
        ['Target date', `${fmt(target)} (${weekday(target)})`]
      ]);
    },
    'days-between'() {
      const start = requireDate('startDate', 'start date');
      const end = requireDate('endDate', 'end date');
      if (end < start) throw new Error('End date must be on or after start date.');
      const days = diffDays(start, end);
      const inclusive = rt.bool('inclusive') ? days + 1 : days;
      rt.output('Days between result', [
        ['Exclusive days', `${days} days`],
        ['Selected count', `${inclusive} days`],
        ['Approx. weeks', `${Math.floor(inclusive / 7)} weeks and ${inclusive % 7} days`],
        ['Approx. months', `${(inclusive / 30.4375).toFixed(2)} months`]
      ]);
    },
    'business-days'() {
      const start = requireDate('startDate', 'start date');
      const end = requireDate('endDate', 'end date');
      if (end < start) throw new Error('End date must be on or after start date.');
      const holidaySet = new Set(rt.value('holidays').split(/[\n,]+/).map((x) => x.trim()).filter(Boolean));
      let business = 0, weekends = 0, holidays = 0, total = 0;
      for (let t = start.getTime(); t <= end.getTime(); t += MS_DAY) {
        total += 1;
        const d = new Date(t);
        const day = d.getUTCDay();
        if (day === 0 || day === 6) weekends += 1;
        else if (holidaySet.has(fmt(d))) holidays += 1;
        else business += 1;
      }
      rt.output('Business days result', [
        ['Business days', `${business}`],
        ['Weekend days', `${weekends}`],
        ['Listed weekday holidays', `${holidays}`],
        ['Total calendar days', `${total}`]
      ]);
    },
    'time-duration'() {
      const st = rt.value('startTime');
      const en = rt.value('endTime');
      if (!st || !en) throw new Error('Enter a start time and end time.');
      const [sh, sm] = st.split(':').map(Number);
      const [eh, em] = en.split(':').map(Number);
      let start = sh * 60 + sm;
      let end = eh * 60 + em;
      if (end < start && rt.bool('crossDay')) end += 1440;
      if (end < start) throw new Error('End time is earlier than start time. Enable next-day mode for overnight durations.');
      const minutes = end - start;
      rt.output('Time duration result', [
        ['Duration', `${Math.floor(minutes / 60)} hours ${minutes % 60} minutes`],
        ['Decimal hours', `${(minutes / 60).toFixed(2)}`],
        ['Total minutes', `${minutes}`]
      ]);
    },
    countdown() {
      const date = rt.value('targetDate');
      if (!date) throw new Error('Enter a future date.');
      const target = new Date(`${date}T${rt.value('targetTime') || '00:00'}`);
      const now = new Date();
      const diff = target - now;
      if (diff <= 0) throw new Error('Target date and time must be in the future.');
      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      rt.output('Countdown result', [
        ['Time remaining', `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`],
        ['Target', target.toLocaleString()],
        ['Current browser time', now.toLocaleString()]
      ]);
    },
    birthday() {
      const birth = requireDate('birthDate', 'birthday');
      const todayRaw = new Date();
      const today = new Date(Date.UTC(todayRaw.getFullYear(), todayRaw.getMonth(), todayRaw.getDate()));
      if (birth > today) throw new Error('Birthday must be today or in the past.');
      const age = ageParts(birth, today);
      const nb = nextBirthday(birth, today);
      rt.output('Birthday result', [
        ['Current age', `${age.years} years, ${age.months} months, ${age.days} days`],
        ['Next birthday', `${fmt(nb)} (${weekday(nb)})`],
        ['Days until next birthday', `${diffDays(today, nb)} days`],
        ['Birth date weekday', weekday(birth)]
      ]);
    },
    weekday() {
      const date = requireDate('date', 'date');
      rt.output('Weekday result', [
        ['Date', fmt(date)],
        ['Weekday', weekday(date)],
        ['ISO date', fmt(date)]
      ]);
    },
    'weeks-between'() {
      const start = requireDate('startDate', 'start date');
      const end = requireDate('endDate', 'end date');
      if (end < start) throw new Error('End date must be on or after start date.');
      const days = diffDays(start, end);
      rt.output('Weeks between result', [
        ['Total days', `${days}`],
        ['Full weeks', `${Math.floor(days / 7)}`],
        ['Remaining days', `${days % 7}`]
      ]);
    },
    'months-between'() {
      const start = requireDate('startDate', 'start date');
      const end = requireDate('endDate', 'end date');
      if (end < start) throw new Error('End date must be on or after start date.');
      let months = (end.getUTCFullYear() - start.getUTCFullYear()) * 12 + end.getUTCMonth() - start.getUTCMonth();
      let anchor = addMonths(start, months);
      if (anchor > end) { months -= 1; anchor = addMonths(start, months); }
      rt.output('Months between result', [
        ['Full months', `${months}`],
        ['Remaining days', `${diffDays(anchor, end)}`],
        ['Total days', `${diffDays(start, end)}`]
      ]);
    }
  };

  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-calculate]');
    if (!button) return;
    try { handlers[button.dataset.calculate]?.(); }
    catch (error) { rt.error(error.message); }
  });
})();
