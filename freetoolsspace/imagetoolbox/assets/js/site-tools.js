(() => {
  const rt = ToolRuntime;
  function fileInput(){ const file = rt.$('#imageFile')?.files?.[0]; if(!file) throw new Error('Choose an image file first.'); return file; }
  function readImage(file){ return new Promise((resolve,reject)=>{ const url=URL.createObjectURL(file); const img=new Image(); img.onload=()=>resolve({img,url}); img.onerror=()=>reject(new Error('Could not read image file.')); img.src=url; }); }
  function blobFromCanvas(canvas, format, quality){ return new Promise(resolve => canvas.toBlob(resolve, format, quality)); }
  function drawContain(ctx,img,w,h,bg){ ctx.fillStyle=bg||'#ffffff'; ctx.fillRect(0,0,w,h); const scale=Math.min(w/img.naturalWidth,h/img.naturalHeight); const dw=Math.round(img.naturalWidth*scale), dh=Math.round(img.naturalHeight*scale); ctx.drawImage(img, Math.round((w-dw)/2), Math.round((h-dh)/2), dw, dh); }
  async function render(opts){
    const file=fileInput(); const {img,url}=await readImage(file); let w=opts.width||img.naturalWidth, h=opts.height||img.naturalHeight;
    const canvas=document.createElement('canvas'); canvas.width=w; canvas.height=h; const ctx=canvas.getContext('2d');
    if(opts.mode==='contain') drawContain(ctx,img,w,h,opts.background); else { if(opts.background){ctx.fillStyle=opts.background; ctx.fillRect(0,0,w,h);} ctx.drawImage(img,0,0,w,h); }
    URL.revokeObjectURL(url); const format=opts.format||'image/jpeg'; const blob=await blobFromCanvas(canvas,format,opts.quality||0.85); if(!blob) throw new Error('Your browser could not export this format. Try JPEG or PNG.');
    const outUrl=URL.createObjectURL(blob); const ext=format.includes('webp')?'webp':format.includes('png')?'png':'jpg'; const name=(file.name.replace(/\.[^.]+$/,'')||'image')+'-imagetoolbox.'+ext; const saved=file.size-blob.size; const pct=file.size?((saved/file.size)*100).toFixed(1):'0.0';
    rt.setResult(`<div class="output-item"><h3>Image ready</h3><div class="kv"><strong>Original</strong><span>${(file.size/1024).toFixed(1)} KB</span><strong>Output</strong><span>${(blob.size/1024).toFixed(1)} KB</span><strong>Change</strong><span>${pct}% smaller</span><strong>Dimensions</strong><span>${w} × ${h}px</span></div><p><a class="download-link" href="${outUrl}" download="${rt.escapeHtml(name)}">Download image</a></p><img class="preview-img" alt="Converted image preview" src="${outUrl}"><p class="canvas-note">Processing happened locally in this browser tab.</p></div>`,'success');
  }
  const handlers={
    'image-compressor':async()=>{ const file=fileInput(); const {img,url}=await readImage(file); const max=Number(rt.value('maxWidth'))||img.naturalWidth; const scale=Math.min(1,max/img.naturalWidth); URL.revokeObjectURL(url); await render({width:Math.round(img.naturalWidth*scale),height:Math.round(img.naturalHeight*scale),format:rt.value('format')||'image/jpeg',quality:Number(rt.value('quality'))||0.8,background:'#ffffff'}); },
    'image-resizer':async()=>render({width:Math.max(1,Number(rt.value('width'))||1200),height:Math.max(1,Number(rt.value('height'))||800),mode:rt.value('mode'),format:rt.value('format')||'image/jpeg',quality:.9,background:'#ffffff'}),
    'png-to-jpg':async()=>{ const file=fileInput(); const {img,url}=await readImage(file); URL.revokeObjectURL(url); await render({width:img.naturalWidth,height:img.naturalHeight,format:'image/jpeg',quality:Number(rt.value('quality'))||.9,background:rt.value('background')||'#ffffff'}); },
    'webp-converter':async()=>{ const file=fileInput(); const {img,url}=await readImage(file); URL.revokeObjectURL(url); await render({width:img.naturalWidth,height:img.naturalHeight,format:rt.value('format')||'image/webp',quality:Number(rt.value('quality'))||.85,background:'#ffffff'}); }
  };
  document.addEventListener('click', async (event)=>{ const b=event.target.closest('[data-calculate]'); if(!b) return; try{ rt.setResult('<p class="small">Processing image...</p>'); await handlers[b.dataset.calculate]?.(); }catch(e){ rt.error(e.message); } });
})();
