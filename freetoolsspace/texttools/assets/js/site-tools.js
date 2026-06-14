(() => {
  const rt = ToolRuntime;
  const words = (text) => (text.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)?/g) || []);
  const sentences = (text) => (text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || []).map(s => s.trim()).filter(Boolean);
  const paragraphs = (text) => text.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);
  const titleCase = (text) => text.toLowerCase().replace(/\b[\w'’-]+\b/g, w => w.charAt(0).toUpperCase() + w.slice(1));
  const sentenceCase = (text) => text.toLowerCase().replace(/(^\s*[a-z])|([.!?]\s+[a-z])/g, m => m.toUpperCase());
  const wordsForCase = (text) => (text.toLowerCase().match(/[a-z0-9]+/g) || []);
  const handlers = {
    'word-counter'() {
      const text = rt.value('text');
      const wordList = words(text);
      const mins = wordList.length / 225;
      rt.output('Word count result', [
        ['Words', String(wordList.length)],
        ['Characters', String(text.length)],
        ['Characters without spaces', String(text.replace(/\s/g, '').length)],
        ['Sentences', String(sentences(text).length)],
        ['Paragraphs', String(paragraphs(text).length)],
        ['Estimated reading time', mins < 1 && wordList.length ? '< 1 minute' : `${Math.ceil(mins)} minutes`]
      ]);
    },
    'character-counter'() {
      const text = rt.value('text');
      rt.output('Character count result', [
        ['Characters with spaces', String(text.length)],
        ['Characters without spaces', String(text.replace(/\s/g, '').length)],
        ['Words', String(words(text).length)],
        ['Lines', String(text ? text.split(/\r?\n/).length : 0)],
        ['Paragraphs', String(paragraphs(text).length)]
      ]);
    },
    'case-converter'() {
      const text = rt.value('text');
      const mode = rt.value('mode');
      const tokens = wordsForCase(text);
      let converted = text;
      if (mode === 'Uppercase') converted = text.toUpperCase();
      else if (mode === 'Lowercase') converted = text.toLowerCase();
      else if (mode === 'Sentence case') converted = sentenceCase(text);
      else if (mode === 'camelCase') converted = tokens.map((w, i) => i ? w.charAt(0).toUpperCase() + w.slice(1) : w).join('');
      else if (mode === 'snake_case') converted = tokens.join('_');
      else if (mode === 'kebab-case slug') converted = tokens.join('-');
      else converted = titleCase(text);
      rt.output('Converted text', [['Format', mode], ['Output', converted]], converted);
    },
    'remove-duplicate-lines'() {
      let lines = rt.value('text').split(/\r?\n/);
      const trim = rt.bool('trim'), ignoreCase = rt.bool('ignoreCase');
      const seen = new Set(), out = [];
      for (let line of lines) {
        const original = trim ? line.trim() : line;
        if (!original) continue;
        const key = ignoreCase ? original.toLowerCase() : original;
        if (!seen.has(key)) { seen.add(key); out.push(original); }
      }
      if (rt.bool('sort')) out.sort((a,b) => a.localeCompare(b));
      const cleaned = out.join('\n');
      rt.output('Duplicate line cleanup', [['Original lines', String(lines.filter(Boolean).length)], ['Unique lines', String(out.length)], ['Removed duplicates', String(Math.max(0, lines.filter(Boolean).length - out.length))], ['Cleaned text', cleaned]], cleaned);
    }
  };
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-calculate]');
    if (!button) return;
    try { handlers[button.dataset.calculate]?.(); } catch (error) { rt.error(error.message); }
  });
})();
