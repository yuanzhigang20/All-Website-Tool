const ToolRuntime = (() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHtml = (text = '') => String(text).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const value = (id, root = document) => $(`#${id}`, root)?.value?.trim() || '';
  const number = (id, fallback = NaN, root = document) => {
    const parsed = Number.parseFloat(value(id, root));
    return Number.isFinite(parsed) ? parsed : fallback;
  };
  const bool = (id, root = document) => Boolean($(`#${id}`, root)?.checked);
  const result = $('#result');
  const setResult = (html, mode = '') => {
    if (!result) return;
    result.innerHTML = html;
    result.dataset.state = mode;
    result.setAttribute('aria-live', 'polite');
  };
  const error = (message) => setResult(`<p class="danger">${escapeHtml(message)}</p>`, 'error');
  const output = (title, rows, text = '') => {
    const rowHtml = rows.map(([key, val]) => `<strong>${escapeHtml(key)}</strong><span>${escapeHtml(val)}</span>`).join('');
    const copy = text || rows.map(([key, val]) => `${key}: ${val}`).join('\n');
    setResult(`<div class="output-item"><h3>${escapeHtml(title)}</h3><div class="kv">${rowHtml}</div><div class="actions"><button class="secondary" data-copy="${escapeHtml(copy)}">Copy Result</button></div></div>`, 'success');
  };
  const reset = (root = document) => {
    $$('input, textarea, select', root).forEach((field) => {
      if (field.type === 'checkbox') field.checked = field.defaultChecked;
      else field.value = field.defaultValue;
    });
    setResult('<p class="small">Enter values and calculate to see results here.</p>');
  };
  async function copyText(text, button) {
    try {
      await navigator.clipboard.writeText(text);
      if (button) {
        const original = button.textContent;
        button.textContent = 'Copied';
        setTimeout(() => { button.textContent = original; }, 1200);
      }
    } catch {
      window.prompt('Copy this result:', text);
    }
  }
  document.addEventListener('click', (event) => {
    const copyButton = event.target.closest('[data-copy]');
    if (copyButton) copyText(copyButton.dataset.copy || '', copyButton);
    const copyTarget = event.target.closest('[data-copy-target]');
    if (copyTarget) copyText(document.getElementById(copyTarget.dataset.copyTarget)?.textContent || '', copyTarget);
    const resetButton = event.target.closest('[data-reset-tool]');
    if (resetButton) reset(resetButton.closest('.tool-card') || document);
  });
  return { $, $$, value, number, bool, escapeHtml, setResult, error, output, reset };
})();
