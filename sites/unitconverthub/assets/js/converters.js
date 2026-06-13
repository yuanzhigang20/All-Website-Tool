(() => {
  const rt = ToolRuntime;
  const factors = {
    'cm-to-inches': { fn: (v) => v / 2.54, label: 'Inches' },
    'inches-to-cm': { fn: (v) => v * 2.54, label: 'Centimeters' },
    'kg-to-lbs': { fn: (v) => v * 2.2046226218, label: 'Pounds' },
    'lbs-to-kg': { fn: (v) => v / 2.2046226218, label: 'Kilograms' },
    'c-to-f': { fn: (v) => v * 9 / 5 + 32, label: 'Fahrenheit' },
    'f-to-c': { fn: (v) => (v - 32) * 5 / 9, label: 'Celsius' },
    'meters-to-feet': { fn: (v) => v * 3.280839895, label: 'Feet' },
    'feet-to-meters': { fn: (v) => v / 3.280839895, label: 'Meters' },
    'ml-to-oz': { fn: (v) => v / 29.5735295625, label: 'US fluid ounces' },
    'oz-to-ml': { fn: (v) => v * 29.5735295625, label: 'Milliliters' },
    'liters-to-gallons': { fn: (v) => v / 3.785411784, label: 'US gallons' },
    'gallons-to-liters': { fn: (v) => v * 3.785411784, label: 'Liters' },
    'sqft-to-sqm': { fn: (v) => v * 0.09290304, label: 'Square meters' },
    'km-to-miles': { fn: (v) => v * 0.6213711922, label: 'Miles' },
    'miles-to-km': { fn: (v) => v / 0.6213711922, label: 'Kilometers' }
  };
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-calculate]');
    if (!button) return;
    const config = factors[button.dataset.calculate];
    if (!config) return;
    const value = rt.number('value');
    if (!Number.isFinite(value)) return rt.error('Enter a valid number to convert.');
    const converted = config.fn(value);
    const rounded = Math.abs(converted) >= 1000 ? converted.toLocaleString(undefined, { maximumFractionDigits: 4 }) : Number(converted.toFixed(6)).toString();
    rt.output('Conversion result', [
      ['Input', `${value}`],
      ['Converted value', `${rounded} ${config.label}`],
      ['Rounded display', rounded]
    ]);
  });
})();
