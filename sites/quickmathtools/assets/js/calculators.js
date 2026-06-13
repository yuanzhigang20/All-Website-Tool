(() => {
  const rt = ToolRuntime;
  const nums = (text) => text.split(/[\n,]+/).map((x) => Number.parseFloat(x.trim())).filter(Number.isFinite);
  const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
  const letter = (p) => p >= 90 ? 'A' : p >= 80 ? 'B' : p >= 70 ? 'C' : p >= 60 ? 'D' : 'F';
  const gp = { 'A+': 4, A: 4, 'A-': 3.7, 'B+': 3.3, B: 3, 'B-': 2.7, 'C+': 2.3, C: 2, 'C-': 1.7, D: 1, F: 0 };
  function fraction(n, d) {
    if (!d) throw new Error('Denominator cannot be zero.');
    const g = gcd(n, d);
    const sign = d < 0 ? -1 : 1;
    return `${sign * n / g}/${Math.abs(d) / g}`;
  }
  const handlers = {
    'percentage-calculator'() {
      const value = rt.number('value'); const percent = rt.number('percent');
      if (!Number.isFinite(value) || !Number.isFinite(percent)) throw new Error('Enter a value and percent.');
      rt.output('Percentage result', [['Result', `${value * percent / 100}`], ['Formula', `${percent}% of ${value}`]]);
    },
    'percentage-increase-calculator'() {
      const oldValue = rt.number('oldValue'); const newValue = rt.number('newValue');
      if (!oldValue || !Number.isFinite(newValue)) throw new Error('Enter valid old and new values.');
      rt.output('Increase result', [['Increase', `${((newValue - oldValue) / oldValue * 100).toFixed(2)}%`], ['Difference', `${newValue - oldValue}`]]);
    },
    'percentage-decrease-calculator'() {
      const oldValue = rt.number('oldValue'); const newValue = rt.number('newValue');
      if (!oldValue || !Number.isFinite(newValue)) throw new Error('Enter valid old and new values.');
      rt.output('Decrease result', [['Decrease', `${((oldValue - newValue) / oldValue * 100).toFixed(2)}%`], ['Difference', `${oldValue - newValue}`]]);
    },
    'fraction-calculator'() {
      const a = rt.number('a'), b = rt.number('b'), c = rt.number('c'), d = rt.number('d');
      if (!b || !d) throw new Error('Denominators cannot be zero.');
      let n, den;
      if (rt.value('op') === 'Add') { n = a * d + c * b; den = b * d; }
      else if (rt.value('op') === 'Subtract') { n = a * d - c * b; den = b * d; }
      else if (rt.value('op') === 'Multiply') { n = a * c; den = b * d; }
      else { if (!c) throw new Error('Cannot divide by zero.'); n = a * d; den = b * c; }
      rt.output('Fraction result', [['Simplified fraction', fraction(n, den)], ['Decimal', `${(n / den).toFixed(6)}`]]);
    },
    'fraction-to-decimal-calculator'() {
      const num = rt.number('num'), den = rt.number('den');
      if (!den) throw new Error('Denominator cannot be zero.');
      rt.output('Decimal result', [['Decimal', `${(num / den).toFixed(8)}`], ['Percentage', `${(num / den * 100).toFixed(4)}%`]]);
    },
    'average-calculator'() {
      const list = nums(rt.value('numbers'));
      if (!list.length) throw new Error('Enter at least one number.');
      const sum = list.reduce((a, b) => a + b, 0);
      rt.output('Average result', [['Mean', `${sum / list.length}`], ['Sum', `${sum}`], ['Count', `${list.length}`], ['Minimum', `${Math.min(...list)}`], ['Maximum', `${Math.max(...list)}`]]);
    },
    'ratio-calculator'() {
      const list = nums(rt.value('numbers')).map(Math.round);
      if (list.length < 2) throw new Error('Enter at least two ratio numbers.');
      const g = list.reduce((a, b) => gcd(a, b));
      const simplified = list.map((n) => n / g).join(':');
      const scale = rt.number('scale', 1);
      rt.output('Ratio result', [['Simplified ratio', simplified], ['Scaled ratio', list.map((n) => n / g * scale).join(':')]]);
    },
    'random-number-generator'() {
      const min = Math.ceil(rt.number('min')), max = Math.floor(rt.number('max')), count = Math.floor(rt.number('count'));
      if (max < min || count < 1) throw new Error('Enter a valid range and count.');
      if (rt.bool('unique') && count > max - min + 1) throw new Error('Count is too large for unique numbers in this range.');
      const out = [];
      while (out.length < count) { const n = Math.floor(Math.random() * (max - min + 1)) + min; if (!rt.bool('unique') || !out.includes(n)) out.push(n); }
      rt.output('Random numbers', [['Numbers', out.join(', ')], ['Range', `${min} to ${max}`]]);
    },
    'grade-calculator'() {
      const earned = rt.number('earned'), possible = rt.number('possible');
      if (!possible) throw new Error('Points possible must be greater than zero.');
      const pct = earned / possible * 100;
      rt.output('Grade result', [['Percentage', `${pct.toFixed(2)}%`], ['Letter grade', letter(pct)]]);
    },
    'gpa-calculator'() {
      const rows = rt.value('courses').split(/\n+/).map((line) => line.split(',').map((x) => x.trim())).filter((x) => x.length >= 2);
      let points = 0, credits = 0;
      for (const [grade, creditText] of rows) { const credit = Number.parseFloat(creditText); if (Number.isFinite(credit) && gp[grade.toUpperCase()] !== undefined) { points += gp[grade.toUpperCase()] * credit; credits += credit; } }
      if (!credits) throw new Error('Enter course lines like A,3.');
      rt.output('GPA result', [['GPA', `${(points / credits).toFixed(3)}`], ['Credits counted', `${credits}`]]);
    }
  };
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-calculate]');
    if (!button) return;
    try { handlers[button.dataset.calculate]?.(); } catch (error) { rt.error(error.message); }
  });
})();
