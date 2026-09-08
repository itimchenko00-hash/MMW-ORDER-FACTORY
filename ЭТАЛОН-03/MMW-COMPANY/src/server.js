const express=require('express');
const fs=require('fs');
const path=require('path');
const app=express();
const root=path.join(process.cwd(),'ЭТАЛОН-03/MMW-COMPANY');
const site=path.join(root,'site');
const assets=path.join(process.cwd(),'ASSETS');
const routes={
  '/':'home.html','/company':'company.html','/projects':'projects.html','/services':'services.html','/ready-to-sell':'ready-to-sell.html','/process':'process.html','/investors':'investors.html','/knowledge':'knowledge.html','/contact':'contact.html',
  '/projects/aladin':'projects/ALADIN.html','/projects/carpathia':'projects/CARPATHIA.html','/projects/agrohub':'projects/AGROHUB.html','/projects/energy-park':'projects/ENERGY-PARK.html','/projects/nexus-logistics':'projects/NEXUS-LOGISTICS.html','/projects/nexus-work':'projects/NEXUS-WORK.html'
};
const projectNames=new Set(['MMW-COMPANY','ALADIN','CARPATHIA','AGROHUB','ENERGY-PARK','NEXUS-LOGISTICS','NEXUS-WORK']);
const roleWords={HERO:['hero','masterplan','architecture','residence','office','warehouse','mountain','energy','logistics','camp','hotel'],MARKET:['market','people','business','office','city','customer','community'],PRODUCT:['product','catalog','townhouse','processing','storage','warehouse','workspace','hotel','energy','logistics'],OPERATIONS:['operation','process','processing','logistics','route','warehouse','control','service'],ECONOMICS:['investment','finance','model','economics','business'],IMPLEMENTATION:['construction','build','masterplan','infrastructure','engineering'],SALES:['sales','investment','business','partner'],PEOPLE:['people','team','meeting','community'],LANDSCAPE:['landscape','mountain','forest','field','nature','site','carpath']};
const roleFor=t=>{t=t.toLowerCase();if(/identity|company|concept|idea|position|hero/.test(t))return'HERO';if(/market|клиент|сегмент|demand/.test(t))return'MARKET';if(/operating|operations|process|работает|запускается|service/.test(t))return'OPERATIONS';if(/econom|эконом|финанс|investment/.test(t))return'ECONOMICS';if(/implementation|реализа|construction|строитель|technical|техничес/.test(t))return'IMPLEMENTATION';if(/sales|продаж|partner|партнер/.test(t))return'SALES';if(/people|team|команд|community/.test(t))return'PEOPLE';if(/landscape|nature|природ|карпат/.test(t))return'LANDSCAPE';return'PRODUCT'};
const cleanText=html=>html.replace(/FACTORY INFOGRAPHIC/gi,'BUSINESS SYSTEM').replace(/FACTORY THEMATIC MEDIA/gi,'').replace(/ONE SYSTEM · MULTIPLE PROJECT OUTPUTS/gi,'ONE SYSTEM · PROJECT PORTFOLIO').replace(/Factory status/gi,'Project standard').replace(/CONTROLLED/gi,'STRUCTURED').replace(/Защищённые и законсервированные версии не изменяются автоматически\./gi,'Утверждённые и законсервированные версии проекта не изменяются в рабочем контуре.').replace(/assumptions и KPI/gi,'допущения и KPI');
function listPhotos(project){try{return fs.readdirSync(path.join(assets,project,'photos')).filter(f=>/\.(jpe?g|png|webp)$/i.test(f)).sort((a,b)=>a.localeCompare(b));}catch{return[]}}
function mediaTransform(html,project){
  const files=listPhotos(project);if(!files.length)return html;
  const used=new Set();
  for(const m of html.matchAll(/(?:src|url\()\s*[=:\"']*([^\"')\s]+\.(?:jpe?g|png|webp))/gi))used.add(decodeURIComponent(path.basename(m[1])));
  const available=files.filter(f=>!used.has(f));
  const textOf=s=>s.replace(/<[^>]+>/g,' ').replace(/&[a-z]+;/gi,' ').replace(/\s+/g,' ').trim().toLowerCase();
  const score=(file,role,text)=>{const f=file.toLowerCase();return(roleWords[role]||[]).reduce((n,w)=>n+(f.includes(w)?10:0)+(text.includes(w)?2:0),0)};
  const take=(role,text,slot)=>{if(!available.length)return null;let best=slot%available.length,bestScore=-1;for(let i=0;i<available.length;i++){const idx=(slot+i)%available.length,s=score(available[idx],role,text);if(s>bestScore){bestScore=s;best=idx}}return available.splice(best,1)[0]};
  const src=file=>`/assets/${project}/photos/${encodeURIComponent(file)}`;
  const imageTag=(file,alt,cls='')=>`<img ${cls?`class="${cls}" `:''}loading="lazy" src="${src(file)}" alt="${alt}">`;
  let sectionIndex=0;
  html=html.replace(/<section\b([^>]*)>([\s\S]*?)<\/section>/gi,(full,attrs,body)=>{const t=textOf(body),role=roleFor(t),file=take(role,t,sectionIndex++);if(!file)return full;const figure=`<figure class="mmw-thematic-media"><img loading="lazy" src="${src(file)}" alt="${project} — ${role.toLowerCase()}"></figure>`;return `<section${attrs}>${figure}${body}</section>`;});
  let cardIndex=0;
  html=html.replace(/<article\b([^>]*)class="([^"]*\bcard\b[^"]*)"([^>]*)>([\s\S]*?)<\/article>/gi,(full,a,classes,b,body)=>{if(/<img\b|class=["'][^"']*\bvisual\b/i.test(body))return full;const t=textOf(body),role=roleFor(t),file=take(role,t,100+cardIndex++);if(!file)return full;return `<article${a}class="${classes}"${b}>${imageTag(file,project+' — '+role.toLowerCase(),'mmw-card-media')}${body}</article>`;});
  return html;
}
function presentationTransform(html,project){
  html=cleanText(html);
  html=html.replace('</head>',`<style data-factory-media>\n.mmw-thematic-media{margin:22px 0;border:1px solid var(--project-primary,var(--gold,#d7ad59));background:var(--panel,transparent);overflow:hidden}.mmw-thematic-media img{display:block;width:100%;height:clamp(150px,24vw,285px);object-fit:cover}.mmw-card-media{display:block;width:calc(100% + 48px);height:150px;object-fit:cover;margin:-24px -24px 18px;border-bottom:1px solid var(--project-primary,var(--gold,#d7ad59))}.product .mmw-card-media{height:190px;margin:-24px -24px 15px}@media(max-width:600px){.mmw-card-media{height:135px}.product .mmw-card-media{height:165px}}\n</style></head>`);
  return mediaTransform(html,project);
}
app.use('/company-assets',express.static(path.join(site,'assets')));
app.use('/assets',express.static(assets));
app.get('/media-manifest/:project.json',(req,res)=>{const project=String(req.params.project||'').toUpperCase();if(!projectNames.has(project))return res.status(404).json({files:[]});const files=listPhotos(project);res.json({project,files,count:files.length});});
function sendHtml(file,res,route){try{let html=fs.readFileSync(path.join(site,file),'utf8');const project=route==='/'||route==='/company'||route==='/projects'||route==='/services'||route==='/ready-to-sell'||route==='/process'||route==='/investors'||route==='/knowledge'||route==='/contact'?'MMW-COMPANY':route.includes('/aladin')?'ALADIN':route.includes('/carpathia')?'CARPATHIA':route.includes('/agrohub')?'AGROHUB':route.includes('/energy-park')?'ENERGY-PARK':route.includes('/nexus-logistics')?'NEXUS-LOGISTICS':'NEXUS-WORK';res.type('html').send(route==='/'?cleanText(html):presentationTransform(html,project));}catch{res.status(404).sendFile(path.join(site,'404.html'));}}
for(const [route,file] of Object.entries(routes))app.get(route,(req,res)=>sendHtml(file,res,route));
app.use(express.static(site));
app.use((req,res)=>res.status(404).sendFile(path.join(site,'404.html')));
const port=process.env.PORT||3000;app.listen(port,'0.0.0.0',()=>console.log(`MMW-COMPANY ETALON 03 listening on ${port}`));