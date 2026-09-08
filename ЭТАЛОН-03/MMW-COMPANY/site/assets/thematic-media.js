(()=>{
const p=location.pathname.toLowerCase();
const project=p.includes('/projects/aladin')?'ALADIN':p.includes('/projects/carpathia')?'CARPATHIA':p.includes('/projects/agrohub')?'AGROHUB':p.includes('/projects/energy-park')?'ENERGY-PARK':p.includes('/projects/nexus-logistics')?'NEXUS-LOGISTICS':p.includes('/projects/nexus-work')?'NEXUS-WORK':'MMW-COMPANY';
const roleWords={HERO:['hero','masterplan','architecture','residence','office','warehouse','mountain','energy','logistics','camp','hotel'],MARKET:['market','people','business','office','city','customer','community'],PRODUCT:['product','catalog','townhouse','processing','storage','warehouse','workspace','hotel','energy','logistics'],OPERATIONS:['operation','process','processing','logistics','route','warehouse','control','service'],ECONOMICS:['investment','finance','model','economics','business'],IMPLEMENTATION:['construction','build','masterplan','infrastructure','engineering'],SALES:['sales','investment','business','partner'],PEOPLE:['people','team','meeting','community'],LANDSCAPE:['landscape','mountain','forest','field','nature','site','carpath']};
const roleFor=(text)=>{const t=text.toLowerCase();if(/identity|company|concept|idea|position|hero/.test(t))return'HERO';if(/market|клиент|сегмент|demand/.test(t))return'MARKET';if(/operating|operations|process|работает|запускается|service/.test(t))return'OPERATIONS';if(/econom|эконом|финанс|investment/.test(t))return'ECONOMICS';if(/implementation|реализа|construction|строитель|technical|техничес/.test(t))return'IMPLEMENTATION';if(/sales|продаж|partner|партнер/.test(t))return'SALES';if(/people|team|команд|community/.test(t))return'PEOPLE';if(/landscape|nature|природ|карпат/.test(t))return'LANDSCAPE';return'PRODUCT'};
const text=e=>(e.innerText||e.textContent||'').replace(/\s+/g,' ').trim().toLowerCase();
const fileName=u=>{try{return decodeURIComponent(new URL(u,location.origin).pathname.split('/').pop()||'')}catch{return''}};
const score=(file,role,t)=>{const f=file.toLowerCase();return(roleWords[role]||[]).reduce((n,w)=>n+(f.includes(w)?10:0)+(t.includes(w)?3:0),0)};
const style=document.createElement('style');style.textContent='.mmw-thematic-band{margin:22px 0;border:1px solid var(--project-primary,var(--gold,#d7ad59));background:var(--panel,transparent);overflow:hidden}.mmw-thematic-band img{display:block;width:100%;height:clamp(150px,24vw,285px);object-fit:cover}.mmw-thematic-band figcaption{display:flex;justify-content:space-between;gap:14px;padding:8px 12px;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--project-signal,var(--gold2,#f1d894))}.mmw-card-media{display:block;width:calc(100% + 48px);height:150px;object-fit:cover;margin:-24px -24px 18px;border-bottom:1px solid var(--project-primary,var(--gold,#d7ad59))}.product .mmw-card-media{height:190px;margin:-24px -24px 15px}@media(max-width:600px){.mmw-card-media{height:135px}.product .mmw-card-media{height:165px}}';document.head.appendChild(style);
fetch('/media-manifest/'+encodeURIComponent(project)+'.json').then(r=>r.ok?r.json():{files:[]}).then(data=>{
 const files=[...new Set(data.files||[])].filter(x=>/\.(jpe?g|png|webp)$/i.test(x));if(!files.length)return;
 const used=new Set();
 document.querySelectorAll('img[src]').forEach(img=>{const n=fileName(img.src);if(n)used.add(n)});
 document.querySelectorAll('[style*="background-image"],.visual').forEach(el=>{const m=(el.getAttribute('style')||'').match(/url\(["']?([^"')]+)["']?\)/i);if(m){const n=fileName(m[1]);if(n)used.add(n)}});
 const available=files.filter(f=>!used.has(f));
 const take=(role,t,slot)=>{
   if(!available.length)return null;
   let bestIndex=slot%available.length,best=-1;
   for(let i=0;i<available.length;i++){const idx=(slot+i)%available.length,s=score(available[idx],role,t);if(s>best){best=s;bestIndex=idx;if(s>=10)break}}
   return available.splice(bestIndex,1)[0];
 };
 [...document.querySelectorAll('main section')].forEach((section,i)=>{
   const t=text(section),role=roleFor(t);
   if(!section.querySelector(':scope>.mmw-thematic-band')){
     const file=take(role,t,i);if(file){
       const fig=document.createElement('figure');fig.className='mmw-thematic-band';
       const img=document.createElement('img');img.loading=i<2?'eager':'lazy';img.alt=project+' — '+role.toLowerCase();img.src='/assets/'+project+'/photos/'+encodeURIComponent(file);
       fig.appendChild(img);section.insertAdjacentElement('afterbegin',fig);
     }
   }
   section.querySelectorAll('.card').forEach((card,j)=>{
     if(card.querySelector('img,.visual'))return;
     const file=take(role,text(card),i*100+j);if(!file)return;
     const img=document.createElement('img');img.className='mmw-card-media';img.loading='lazy';img.alt=project+' — '+role.toLowerCase();img.src='/assets/'+project+'/photos/'+encodeURIComponent(file);card.insertAdjacentElement('afterbegin',img);
   });
 });
 document.documentElement.dataset.thematicMedia=project;
 document.documentElement.dataset.thematicMediaCount=String(files.length);
 document.documentElement.dataset.thematicMediaAssigned=String(files.length-available.length);
}).catch(()=>{});
})();
