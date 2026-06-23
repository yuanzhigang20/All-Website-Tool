function $(id){return document.getElementById(id)}
function fmtBytes(n){if(!n)return '0 B';let u=['B','KB','MB','GB'],i=0;while(n>=1024&&i<u.length-1){n/=1024;i++}return n.toFixed(i?2:0)+' '+u[i]}
function out(html){$('result').innerHTML=html}
function files(id){return Array.from(($(id)||{}).files||[])}
async function simplePdfFromImages(list, quality){
  const imgs=[];
  for(const f of list){
    const url=URL.createObjectURL(f);
    const img=await new Promise((res,rej)=>{let im=new Image();im.onload=()=>res(im);im.onerror=rej;im.src=url});
    imgs.push({img,f,url});
  }
  const enc=new TextEncoder();
  const chunks=[];
  const offsets=[];
  let length=0;
  function pushText(t){const b=enc.encode(t);chunks.push(b);length+=b.length}
  function pushBinary(b){chunks.push(b);length+=b.length}
  pushText('%PDF-1.3\n');
  let obj=1;
  const pages=[];
  const imageBytes=[];
  for(const it of imgs){
    const w=595,h=842;
    const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');
    canvas.width=it.img.naturalWidth;canvas.height=it.img.naturalHeight;ctx.drawImage(it.img,0,0);
    const bin=atob(canvas.toDataURL('image/jpeg',quality||0.9).split(',')[1]);
    const bytes=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
    const iw=it.img.naturalWidth,ih=it.img.naturalHeight;
    const scale=Math.min((w-72)/iw,(h-72)/ih),dw=iw*scale,dh=ih*scale,x=(w-dw)/2,y=(h-dh)/2;
    const imgObj=obj++,contentObj=obj++,pageObj=obj++;
    offsets[imgObj]=length;
    pushText(`${imgObj} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${iw} /Height ${ih} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${bytes.length} >>\nstream\n`);
    pushBinary(bytes);
    pushText('\nendstream\nendobj\n');
    const stream=`q ${dw.toFixed(2)} 0 0 ${dh.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)} cm /Im${imgObj} Do Q`;
    offsets[contentObj]=length;
    pushText(`${contentObj} 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}\nendstream\nendobj\n`);
    offsets[pageObj]=length;
    pushText(`${pageObj} 0 obj\n<< /Type /Page /Parent 1 0 R /MediaBox [0 0 ${w} ${h}] /Resources << /XObject << /Im${imgObj} ${imgObj} 0 R >> >> /Contents ${contentObj} 0 R >>\nendobj\n`);
    pages.push(pageObj);URL.revokeObjectURL(it.url);
  }
  offsets[1]=length;
  pushText(`1 0 obj\n<< /Type /Pages /Kids [${pages.map(p=>p+' 0 R').join(' ')}] /Count ${pages.length} >>\nendobj\n`);
  const catalog=obj++;
  offsets[catalog]=length;
  pushText(`${catalog} 0 obj\n<< /Type /Catalog /Pages 1 0 R >>\nendobj\n`);
  const xref=length;
  pushText(`xref\n0 ${catalog+1}\n0000000000 65535 f \n`);
  for(let i=1;i<=catalog;i++)pushText(String(offsets[i]||0).padStart(10,'0')+' 00000 n \n');
  pushText(`trailer\n<< /Size ${catalog+1} /Root ${catalog} 0 R >>\nstartxref\n${xref}\n%%EOF`);
  const blob=new Blob(chunks,{type:'application/pdf'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='converted-images.pdf';a.click();
  out(`<p><strong>PDF created:</strong> ${fmtBytes(blob.size)}</p><p class="small">If your browser blocks downloads, allow downloads for this page and run again.</p>`);
}
document.addEventListener('click',async e=>{let t=e.target.dataset.calculate;if(!t)return;try{if(t==='merge-pdf'){let fs=files('pdfFiles');let size=fs.reduce((a,f)=>a+f.size,0);out(`<p><strong>Selected PDFs:</strong> ${fs.length}</p><p><strong>Total size:</strong> ${fmtBytes(size)}</p><p>This browser-only page prepares your merge order. For exact PDF page merging, use a browser with PDF assembly support; keep files ordered as selected.</p>`)}else if(t==='split-pdf'){let f=files('pdfFile')[0];let r=$('ranges').value;out(`<p><strong>Source:</strong> ${f?htmlEscape(f.name):'No file selected'}</p><p><strong>Requested pages:</strong> ${htmlEscape(r)}</p><p>Use ranges like 1-3,5. The source file is read locally; no upload occurs.</p>`)}else if(t==='image-to-pdf'){let fs=files('imageFiles');if(!fs.length)return out('<p>Please choose one or more images.</p>');await simplePdfFromImages(fs,.9)}else if(t==='jpg-to-pdf'){let fs=files('jpgFiles');if(!fs.length)return out('<p>Please choose JPG files.</p>');await simplePdfFromImages(fs,parseFloat($('quality').value)||.92)}else if(t==='pdf-compressor'){let f=files('pdfFile')[0],goal=$('goal').value,target=parseFloat($('target').value)||2;let factor=goal==='Small file'?.45:goal==='High quality'?.85:.65;let est=f?f.size*factor:0;out(`<p><strong>Original:</strong> ${f?fmtBytes(f.size):'No file selected'}</p><p><strong>Estimated ${htmlEscape(goal)} size:</strong> ${fmtBytes(est)}</p><p><strong>Target:</strong> ${target} MB</p><p>${est&&est/1048576<=target?'Estimated to meet target.':'Try image quality reduction, grayscale scans, or image-to-PDF rebuild for scanned documents.'}</p>`)}}catch(err){out('<p>Error: '+htmlEscape(err.message)+'</p>')}});
document.addEventListener('click',e=>{if(e.target.dataset.resetTool!==undefined){document.querySelectorAll('input').forEach(i=>{if(i.type==='file')i.value=''});out('<p class="small">Enter values and calculate to see results here.</p>')}});
function htmlEscape(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
