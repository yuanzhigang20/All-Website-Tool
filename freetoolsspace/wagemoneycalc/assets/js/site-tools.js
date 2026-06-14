(() => {
  const rt = ToolRuntime;
  const money = (n) => `$${Number(n).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;
  const pct = (n) => `${Number(n).toFixed(2)}%`;
  const positive = (id, label) => { const n = rt.number(id); if (!Number.isFinite(n) || n < 0) throw new Error(`Enter a valid ${label}.`); return n; };
  const handlers = {
    'hourly-wage-calculator'() {
      const hourly = positive('hourly','hourly wage'), hours = positive('hours','weekly hours'), weeks = positive('weeks','work weeks'), tax = positive('tax','tax percent');
      const annual = hourly * hours * weeks, net = annual * (1 - tax / 100);
      rt.output('Hourly wage result', [['Annual pay', money(annual)], ['Monthly pay', money(annual / 12)], ['Biweekly pay', money(annual / 26)], ['Weekly pay', money(hourly * hours)], ['After-tax estimate', money(net)]]);
    },
    'salary-calculator'() {
      const salary = positive('salary','salary'), hours = positive('hours','weekly hours'), weeks = positive('weeks','work weeks');
      rt.output('Salary result', [['Monthly', money(salary / 12)], ['Biweekly', money(salary / 26)], ['Weekly', money(salary / 52)], ['Daily estimate', money(salary / weeks / 5)], ['Hourly estimate', money(salary / weeks / hours)]]);
    },
    'salary-to-hourly-calculator'() {
      const salary = positive('salary','salary'), hours = positive('hours','weekly hours'), weeks = positive('weeks','work weeks');
      rt.output('Hourly equivalent', [['Hourly wage', money(salary / weeks / hours)], ['Weekly equivalent', money(salary / weeks)]]);
    },
    'overtime-calculator'() {
      const rate = positive('rate','rate'), regular = positive('regular','regular hours'), overtime = positive('overtime','overtime hours'), multiplier = positive('multiplier','multiplier');
      rt.output('Overtime result', [['Regular pay', money(rate * regular)], ['Overtime pay', money(rate * overtime * multiplier)], ['Total pay', money(rate * regular + rate * overtime * multiplier)]]);
    },
    'discount-calculator'() {
      let price = positive('price','price'); const discount = positive('discount','discount'), extra = positive('extra','extra discount');
      const afterFirst = price * (1 - discount / 100), final = afterFirst * (1 - extra / 100);
      rt.output('Discount result', [['Original price', money(price)], ['Final price', money(final)], ['You save', money(price - final)], ['Effective discount', pct((price - final) / price * 100)]]);
    },
    'sales-tax-calculator'() {
      const price = positive('price','price'), tax = positive('tax','tax rate');
      rt.output('Sales tax result', [['Tax amount', money(price * tax / 100)], ['Total price', money(price * (1 + tax / 100))]]);
    },
    'tip-calculator'() {
      const bill = positive('bill','bill'), tip = positive('tip','tip percent'), people = Math.max(1, Math.floor(positive('people','people')));
      const tipAmount = bill * tip / 100, total = bill + tipAmount;
      rt.output('Tip result', [['Tip amount', money(tipAmount)], ['Total bill', money(total)], ['Per person', money(total / people)]]);
    },
    'profit-margin-calculator'() {
      const cost = positive('cost','cost'), price = positive('price','selling price');
      if (!price) throw new Error('Selling price must be greater than zero.');
      const profit = price - cost;
      rt.output('Profit margin result', [['Profit', money(profit)], ['Profit margin', pct(profit / price * 100)], ['Markup', cost ? pct(profit / cost * 100) : 'N/A']]);
    },
    'freelance-rate-calculator'() {
      const income = positive('income','income'), hours = positive('hours','billable hours'), weeksOff = positive('weeksOff','weeks off'), fee = positive('fee','fee percent');
      const billable = hours * Math.max(0, 52 - weeksOff), rate = income / billable / (1 - fee / 100);
      rt.output('Freelance rate result', [['Suggested minimum hourly rate', money(rate)], ['Billable hours/year', `${billable}`], ['Before-fee equivalent', money(income / billable)]]);
    },
    'unit-price-calculator'() {
      const price = positive('price','price'), qty = positive('qty','quantity');
      if (!qty) throw new Error('Quantity must be greater than zero.');
      const a = price / qty;
      const priceB = rt.number('priceB'), qtyB = rt.number('qtyB');
      const rows = [['Item A unit price', money(a)]];
      if (Number.isFinite(priceB) && Number.isFinite(qtyB) && qtyB > 0) { const b = priceB / qtyB; rows.push(['Item B unit price', money(b)], ['Better value', a < b ? 'Item A' : a > b ? 'Item B' : 'Tie']); }
      rt.output('Unit price result', rows);
    }
  };
  document.addEventListener('click', (event) => { const b = event.target.closest('[data-calculate]'); if (!b) return; try { handlers[b.dataset.calculate]?.(); } catch (e) { rt.error(e.message); } });
})();
