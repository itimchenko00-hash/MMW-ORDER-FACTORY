// MMW-COMPANY PUBLIC / COMMERCIAL V1 runtime.
// Public runtime serves the project source pages without internal Factory/QA/duplicate financial overlays.
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
function cleanText(html){return html
 .replace(/FACTORY VISUAL MASTER 01/gi,'BUSINESS PROJECT DEVELOPMENT')
 .replace(/FACTORY INFOGRAPHIC/gi,'BUSINESS SYSTEM')
 .replace(/FACTORY THEMATIC MEDIA/gi,'')
 .replace(/ONE SYSTEM · MULTIPLE PROJECT OUTPUTS/gi,'ONE SYSTEM · PROJECT PORTFOLIO')
 .replace(/Factory status/gi,'Project standard')
 .replace(/\bFactory\b/gi,'MMW methodology')
 .replace(/ETALON[-–—]?03\s*[·•-]?\s*/gi,'')
 .replace(/MMW PROJECT MASTER\s*[·•-]?\s*V1/gi,'PROJECT DEVELOPMENT PACKAGE')
 .replace(/MMW-COMPANY\s*[·•-]?\s*COMMERCIAL MASTER/gi,'MMW-COMPANY · COMMERCIAL SERVICES')
 .replace(/CONTROL\s+ARCHITECTURE/gi,'PROJECT STANDARD')
 .replace(/READY[-–—]?TO[-–—]?SELL\s+100/gi,'PROJECT STANDARD')
 .replace(/STRUCTURED\s*\/\s*PRESENT/gi,'Included')
 .replace(/Project status\s+STRUCTURED/gi,'Project status DEVELOPED')
 .replace(/Пять отраслевых направлений/gi,'Шесть отраслевых направлений')
 .replace(/Защищённые и законсервированные версии не изменяются автоматически\./gi,'Утверждённые версии проекта не изменяются автоматически.')
 .replace(/data-etalon03-[^=]+="[^"]*"/gi,'')
 .replace(/\/\*\s*ETALON-03 PROJECT COLOR SYSTEM[^*]*\*\//gi,'/* PROJECT COLOR SYSTEM */')
 .replace(/<style\s+data-etalon03-[^>]*>/gi,'<style data-project-style>')
 .replace(/PACKAGE READY · 75%/gi,'PACKAGE READY · 100% CONCEPT PACKAGE')
 .replace(/PACKAGE READY\s*·\s*75%/gi,'PACKAGE READY · 100% CONCEPT PACKAGE')
 .replace(/READY-TO-SELL BUSINESS PROJECT/gi,'BUSINESS PROJECT DEVELOPMENT');}
function stripCommercialBlock(html,route){if(['/','/company','/services'].includes(route))return html;return html.replace(/<section\b[^>]*>[\s\S]*?MMW-COMPANY\s*·\s*COMMERCIAL (?:MASTER|SERVICES)[\s\S]*?<\/section>/gi,'').replace(/<div\b[^>]*>[\s\S]*?MMW-COMPANY\s*·\s*COMMERCIAL (?:MASTER|SERVICES)[\s\S]*?<\/div>/gi,'');}
function listPhotos(project){try{return fs.readdirSync(path.join(assets,project,'photos')).filter(f=>/\.(jpe?g|png|webp)$/i.test(f)).sort((a,b)=>a.localeCompare(b));}catch{return[]}}
function mediaTransform(html,project){const files=listPhotos(project);if(!files.length)return html;const used=new Set();for(const m of html.matchAll(/(?:src|url\()\s*[=:\"']*([^\"')\s]+\.(?:jpe?g|png|webp))/gi))used.add(decodeURIComponent(path.basename(m[1])));const available=files.filter(f=>!used.has(f));const textOf=s=>s.replace(/<[^>]+>/g,' ').replace(/&[a-z]+;/gi,' ').replace(/\s+/g,' ').trim().toLowerCase();const score=(file,role,text)=>(roleWords[role]||[]).reduce((n,w)=>n+(file.toLowerCase().includes(w)?10:0)+(text.includes(w)?2:0),0);const take=(role,text,slot)=>{if(!available.length)return null;let best=0,bestScore=-1;for(let i=0;i<available.length;i++){const idx=(slot+i)%available.length,s=score(available[idx],role,text);if(s>bestScore){bestScore=s;best=idx}}return available.splice(best,1)[0]};const src=file=>`/assets/${project}/photos/${encodeURIComponent(file)}`;let sectionIndex=0;html=html.replace(/<section\b([^>]*)>([\s\S]*?)<\/section>/gi,(full,attrs,body)=>{if(/<img\b|background-image\s*:/i.test(body))return full;const t=textOf(body),file=take(roleFor(t),t,sectionIndex++);if(!file)return full;return `<section${attrs}><figure class="mmw-thematic-media"><img loading="lazy" src="${src(file)}" alt="${project} — thematic project view"></figure>${body}</section>`});let cardIndex=0;return html.replace(/<article\b([^>]*)class="([^"]*\bcard\b[^"]*)"([^>]*)>([\s\S]*?)<\/article>/gi,(full,a,classes,b,body)=>{if(/<img\b|class=["'][^"']*\bvisual\b/i.test(body))return full;const t=textOf(body),file=take(roleFor(t),t,100+cardIndex++);if(!file)return full;return `<article${a}class="${classes}"${b}><img class="mmw-card-media" loading="lazy" src="${src(file)}" alt="${project} — project detail">${body}</article>`})}
function injectStyle(html){return html.replace('</head>',`<style data-public-runtime>.mmw-thematic-media{margin:22px 0;border:1px solid var(--project-primary,var(--gold,#d7ad59));background:var(--panel,transparent);overflow:hidden}.mmw-thematic-media img{display:block;width:100%;height:clamp(150px,24vw,285px);object-fit:cover}.mmw-card-media{display:block;width:100%;height:170px;object-fit:cover;border-radius:12px;margin:0 0 16px;border-bottom:1px solid var(--project-primary,var(--gold,#d7ad59))}</style></head>`)}
function projectFor(route){if(['/','/company','/projects','/services','/ready-to-sell','/process','/investors','/knowledge','/contact'].includes(route))return'MMW-COMPANY';if(route.includes('/aladin'))return'ALADIN';if(route.includes('/carpathia'))return'CARPATHIA';if(route.includes('/agrohub'))return'AGROHUB';if(route.includes('/energy-park'))return'ENERGY-PARK';if(route.includes('/nexus-logistics'))return'NEXUS-LOGISTICS';return'NEXUS-WORK'}
function sendHtml(file,res,route){try{let html=fs.readFileSync(path.join(site,file),'utf8');html=cleanText(html);html=stripCommercialBlock(html,route);const project=projectFor(route);if(project!=='MMW-COMPANY')html=mediaTransform(html,project);html=injectStyle(html);res.type('html').send(html)}catch(e){console.error(e);res.status(404).sendFile(path.join(site,'404.html'))}}
app.use('/company-assets',express.static(path.join(site,'assets')));app.use('/assets',express.static(assets));
app.get('/media-manifest/:project.json',(req,res)=>{const project=String(req.params.project||'').toUpperCase();if(!projectNames.has(project))return res.status(404).json({files:[]});const files=listPhotos(project);res.json({project,files,count:files.length})});
for(const [route,file] of Object.entries(routes))app.get(route,(req,res)=>sendHtml(file,res,route));
app.use(express.static(site));
app.use((req,res)=>res.status(404).sendFile(path.join(site,'404.html')));
const port=process.env.PORT||3000;app.listen(port,'0.0.0.0',()=>console.log(`MMW-COMPANY PUBLIC / COMMERCIAL V1 listening on ${port}`));
