(() => {
  const rt = ToolRuntime;
  const cleanLines = (text) => String(text || '').split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  const escAttr = (text) => rt.escapeHtml(String(text || ''));
  const handlers = {
    'meta-description-generator'() {
      const title = rt.value('pageTitle'); const keyword = rt.value('keyword'); const summary = rt.value('summary'); const tone = rt.value('tone');
      const base = summary.replace(/\s+/g, ' ').trim();
      const variants = [];
      variants.push(`${base}${base.toLowerCase().includes(keyword.toLowerCase()) ? '' : ' Try this ' + keyword + ' tool today.'}`);
      variants.push(`${title}: ${base}`);
      variants.push(tone === 'Action focused' ? `Use ${keyword} to ${base.charAt(0).toLowerCase()+base.slice(1)}` : `Free ${keyword} tool for ${base.charAt(0).toLowerCase()+base.slice(1)}`);
      const rows = variants.map((v,i)=>{ let out=v.replace(/\s+/g,' ').trim(); if(out.length>160) out=out.slice(0,157).replace(/\s+\S*$/,'')+'...'; return [i+1,out,out.length]; });
      rt.setResult(`<div class="output-item"><h3>Meta description ideas</h3><div class="kv">${rows.map(r=>`<strong>Variant ${r[0]} (${r[2]} chars)</strong><span>${rt.escapeHtml(r[1])}</span>`).join('')}</div><pre id="meta-output">${rt.escapeHtml(rows.map(r=>r[1]).join('\n'))}</pre><div class="actions"><button class="secondary" data-copy-target="meta-output">Copy descriptions</button></div></div>`, 'success');
    },
    'robots-txt-generator'() {
      const site = rt.value('siteUrl').replace(/\/$/,''); const lines = [`User-agent: ${rt.value('agent') || '*'}`];
      cleanLines(rt.$('#allow')?.value).forEach(p=>lines.push(`Allow: ${p.startsWith('/')?p:'/'+p}`));
      cleanLines(rt.$('#disallow')?.value).forEach(p=>lines.push(`Disallow: ${p.startsWith('/')?p:'/'+p}`));
      const delay = Number.parseInt(rt.value('delay') || '0',10); if(delay>0) lines.push(`Crawl-delay: ${delay}`);
      if(rt.bool('includeSitemap') && site) lines.push('', `Sitemap: ${site}/sitemap.xml`);
      const out = lines.join('\n'); rt.setResult(`<div class="output-item"><h3>Robots.txt draft</h3><pre id="robots-output">${rt.escapeHtml(out)}</pre><div class="actions"><button class="secondary" data-copy-target="robots-output">Copy robots.txt</button></div></div>`, 'success');
    },
    'xml-sitemap-generator'() {
      const urls = cleanLines(rt.$('#urls')?.value); const lastmod = rt.value('lastmod'); const changefreq = rt.value('changefreq'); const priority = Math.max(0, Math.min(1, Number.parseFloat(rt.value('priority') || '0.7'))).toFixed(1);
      const body = urls.map(u => `  <url>\n    <loc>${escAttr(u)}</loc>\n    <lastmod>${escAttr(lastmod)}</lastmod>\n    <changefreq>${escAttr(changefreq)}</changefreq>\n    <priority>${priority}</priority>\n  </url>`).join('\n');
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`;
      rt.setResult(`<div class="output-item"><h3>XML sitemap</h3><div class="kv"><strong>URLs</strong><span>${urls.length}</span></div><pre id="sitemap-output">${rt.escapeHtml(xml)}</pre><div class="actions"><button class="secondary" data-copy-target="sitemap-output">Copy XML</button></div></div>`, 'success');
    },
    'open-graph-generator'() {
      const title=rt.value('ogTitle'), url=rt.value('ogUrl'), desc=rt.value('ogDesc'), image=rt.value('ogImage'), site=rt.value('siteName'), card=rt.value('twitterCard');
      const tags = [`<meta property="og:type" content="website">`,`<meta property="og:site_name" content="${escAttr(site)}">`,`<meta property="og:title" content="${escAttr(title)}">`,`<meta property="og:description" content="${escAttr(desc)}">`,`<meta property="og:url" content="${escAttr(url)}">`, image ? `<meta property="og:image" content="${escAttr(image)}">` : '',`<meta name="twitter:card" content="${escAttr(card)}">`,`<meta name="twitter:title" content="${escAttr(title)}">`,`<meta name="twitter:description" content="${escAttr(desc)}">`, image ? `<meta name="twitter:image" content="${escAttr(image)}">` : ''].filter(Boolean).join('\n');
      rt.setResult(`<div class="output-item"><h3>Social meta tags</h3><pre id="og-output">${rt.escapeHtml(tags)}</pre><div class="actions"><button class="secondary" data-copy-target="og-output">Copy tags</button></div></div>`, 'success');
    },
    'keyword-density-checker'() {
      const keyword = rt.value('targetKeyword').toLowerCase(); const text = (rt.$('#seoText')?.value || '').toLowerCase(); const topCount = Math.max(3, Math.min(20, Number.parseInt(rt.value('topCount') || '10',10)));
      const words = text.match(/[a-z0-9]+(?:'[a-z0-9]+)?/g) || []; const kwWords = keyword.match(/[a-z0-9]+(?:'[a-z0-9]+)?/g) || [];
      let occurrences = 0; if(kwWords.length){ for(let i=0;i<=words.length-kwWords.length;i++){ if(kwWords.every((w,j)=>words[i+j]===w)) occurrences++; } }
      const density = words.length ? (occurrences / words.length * 100).toFixed(2) : '0.00';
      const stop = new Set('the a an and or but to of in for on with is are was were be by as at from this that it your you our free online tool tools'.split(' ')); const counts = {};
      words.forEach(w=>{ if(w.length>2 && !stop.has(w)) counts[w]=(counts[w]||0)+1; });
      const top = Object.entries(counts).sort((a,b)=>b[1]-a[1] || a[0].localeCompare(b[0])).slice(0,topCount).map(([w,c])=>`${w}: ${c}`).join('\n');
      rt.setResult(`<div class="output-item"><h3>Keyword density analysis</h3><div class="kv"><strong>Total words</strong><span>${words.length}</span><strong>Keyword occurrences</strong><span>${occurrences}</span><strong>Density</strong><span>${density}%</span></div><h3>Top repeated terms</h3><pre id="density-output">${rt.escapeHtml(top)}</pre><div class="actions"><button class="secondary" data-copy="Keyword: ${rt.escapeHtml(keyword)}\nWords: ${words.length}\nOccurrences: ${occurrences}\nDensity: ${density}%\n\n${rt.escapeHtml(top)}">Copy analysis</button></div></div>`, 'success');
    }
  };
  document.addEventListener('click', (event) => { const button = event.target.closest('[data-calculate]'); if (!button) return; try { handlers[button.dataset.calculate]?.(); } catch (error) { rt.error(error.message); } });
})();
