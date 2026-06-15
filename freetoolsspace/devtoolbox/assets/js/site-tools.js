(() => {
  const rt = ToolRuntime;
  const handlers = {
    'json-formatter'() {
      const raw = rt.$('#json')?.value || '';
      try {
        const parsed = JSON.parse(raw);
        const sortKeys = rt.bool('sortKeys');
        const normalize = (value) => {
          if (Array.isArray(value)) return value.map(normalize);
          if (value && typeof value === 'object') {
            const out = {};
            Object.keys(value).sort().forEach(k => { out[k] = normalize(value[k]); });
            return out;
          }
          return value;
        };
        const data = sortKeys ? normalize(parsed) : parsed;
        const pretty = JSON.stringify(data, null, 2);
        const minified = JSON.stringify(data);
        rt.setResult(`<div class="output-item"><h3>Valid JSON</h3><div class="kv"><strong>Characters</strong><span>${pretty.length}</span><strong>Minified characters</strong><span>${minified.length}</span><strong>Top-level type</strong><span>${Array.isArray(data) ? 'Array' : typeof data}</span></div><h3>Formatted output</h3><pre id="formatted-output">${rt.escapeHtml(pretty)}</pre><div class="actions"><button class="secondary" data-copy-target="formatted-output">Copy formatted JSON</button><button class="secondary" data-copy="${rt.escapeHtml(minified)}">Copy minified JSON</button></div></div>`, 'success');
      } catch (err) { rt.error(`Invalid JSON: ${err.message}`); }
    },
    'base64-tool'() {
      const text = rt.$('#text')?.value || '';
      const mode = rt.value('mode');
      try {
        let output = '';
        if (mode === 'Decode from Base64') output = new TextDecoder().decode(Uint8Array.from(atob(text.replace(/\s/g,'')), c => c.charCodeAt(0)));
        else output = btoa(String.fromCharCode(...new TextEncoder().encode(text)));
        rt.output('Base64 result', [['Mode', mode], ['Input characters', String(text.length)], ['Output characters', String(output.length)], ['Output', output]], output);
      } catch (err) { rt.error(`Could not ${mode.toLowerCase()}: ${err.message}`); }
    },
    'url-tool'() {
      const text = rt.$('#text')?.value || '';
      const mode = rt.value('mode');
      try {
        let output = mode === 'Decode component' ? decodeURIComponent(text) : mode === 'Encode full URL safely' ? encodeURI(text) : encodeURIComponent(text);
        rt.output('URL encoding result', [['Mode', mode], ['Input characters', String(text.length)], ['Output characters', String(output.length)], ['Output', output]], output);
      } catch (err) { rt.error(`URL conversion failed: ${err.message}`); }
    },
    'uuid-generator'() {
      const count = Math.max(1, Math.min(100, Number.parseInt(rt.value('count') || '1', 10)));
      const upper = rt.bool('uppercase');
      const ids = Array.from({length: count}, () => crypto.randomUUID()).map(id => upper ? id.toUpperCase() : id);
      const output = ids.join('\n');
      rt.setResult(`<div class="output-item"><h3>Generated UUIDs</h3><div class="kv"><strong>Count</strong><span>${ids.length}</span><strong>Version</strong><span>4</span></div><pre id="uuid-output">${rt.escapeHtml(output)}</pre><div class="actions"><button class="secondary" data-copy-target="uuid-output">Copy UUIDs</button></div></div>`, 'success');
    }
  };
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-calculate]');
    if (!button) return;
    try { handlers[button.dataset.calculate]?.(); } catch (error) { rt.error(error.message); }
  });
})();
