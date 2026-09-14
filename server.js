const express=require('express');
const fs=require('fs');
const path=require('path');
const app=express();

const root=path.join(process.cwd(),'ЭТАЛОН-03/MMW-COMPANY');
const site=path.join(root,'site');
const assets=path.join(process.cwd(),'ASSETS');

const routes={
  '/':'home.html','/company':'company.html','/projects':'projects.html','/services':'services.html',
  '/ready-to-sell':'ready-to-sell.html','/process':'process.html','/investors':'investors.html',
  '/knowledge':'knowledge.html','/contact':'contact.html',
  '/projects/aladin':'projects/ALADIN.html','/projects/carpathia':'projects/CARPATHIA.html',
  '/projects/agrohub':'projects/AGROHUB.html','/projects/energy-park':'projects/ENERGY-PARK.html',
  '/projects/nexus-logistics':'projects/NEXUS-LOGISTICS.html','/projects/nexus-work':'projects/NEXUS-WORK.html'
};
const projects=['ALADIN','CARPATHIA','AGROHUB','ENERGY-PARK','NEXUS-LOGISTICS','NEXUS-WORK'];

function textOf(s){return s.replace(/<[^>]+>/g,' ').replace(/&[a-z]+;/gi,' ').replace(/\s+/g,' ').trim().toLowerCase()}
function roleFor(t){t=textOf(t);if(/identity|company|concept|idea|position|hero/.test(t))return'HERO';if(/market|клиент|сегмент|demand/.test(t))return'MARKET';if(/operating|operations|process|работает|запускается|service/.test(t))return'OPERATIONS';if(/econom|эконом|финанс|investment/.test(t))return'ECONOMICS';if(/implementation|реализа|construction|строитель|technical|техничес/.test(t))return'IMPLEMENTATION';if(/sales|продаж|partner|партнер/.test(t))return'SALES';if(/people|team|команд|community/.test(t))return'PEOPLE';if(/landscape|nature|природ|карпат/.test(t))return'LANDSCAPE';return'PRODUCT'}
const roleWords={HERO:['hero','masterplan','architecture','residence','office','warehouse','mountain','energy','logistics','camp','hotel'],MARKET:['market','people','business','office','city','customer','community'],PRODUCT:['product','catalog','townhouse','processing','storage','warehouse','workspace','hotel','energy','logistics'],OPERATIONS:['operation','process','processing','logistics','route','warehouse','control','service'],ECONOMICS:['investment','finance','model','economics','business'],IMPLEMENTATION:['construction','build','masterplan','infrastructure','engineering'],SALES:['sales','investment','business','partner'],PEOPLE:['people','team','meeting','community'],LANDSCAPE:['landscape','mountain','forest','field','nature','site','carpath']};

function photos(p){try{return fs.readdirSync(path.join(assets,p,'photos')).filter(f=>/\.(jpe?g|png|webp)$/i.test(f)).sort()}catch{return[]}}
function media(html,p){const files=photos(p);if(!files.length)return html;const used=new Set();for(const m of html.matchAll(/(?:src|url\()\s*[=:\"']*([^\"')\s]+\.(?:jpe?g|png|webp))/gi))used.add(decodeURIComponent(path.basename(m[1])));let available=files.filter(f=>!used.has(f));const take=(role,slot)=>{if(!available.length)return null;let bi=0,bs=-1;for(let i=0;i<available.length;i++){const f=available[i].toLowerCase(),s=(roleWords[role]||[]).reduce((n,w)=>n+(f.includes(w)?10:0),0);if(s>bs){bs=s;bi=i}}return available.splice(bi,1)[0]};const src=f=>`/assets/${p}/photos/${encodeURIComponent(f)}`;let i=0;return html.replace(/<section\b([^>]*)>([\s\S]*?)<\/section>/gi,(full,a,b)=>{const f=take(roleFor(b),i++);return f?`<section${a}><figure class="mmw-thematic-media"><img loading="lazy" src="${src(f)}" alt="${p} thematic image"></figure>${b}</section>`:full})}

const publicStyle=`<style data-public-system>
:root{--public-accent:#d9b98a;--public-signal:#f0d3a4;--public-line:rgba(255,255,255,.14);--public-panel:rgba(255,255,255,.035)}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{overflow-x:hidden}a{transition:.18s ease}nav a:hover,.btn:hover,.cta:hover{filter:brightness(1.08)}
.mmw-disclosure{margin:22px 0;padding:16px 18px;border:1px solid var(--public-line);border-left:2px solid var(--public-accent);background:var(--public-panel);color:#b8c0bd;font-size:13px;line-height:1.65}.mmw-disclosure strong{color:var(--public-signal)}
.mmw-thematic-media{margin:0 0 22px;border:1px solid var(--public-line);overflow:hidden}.mmw-thematic-media img{display:block;width:100%;height:min(42vw,360px);min-height:180px;object-fit:cover}
.price{white-space:nowrap}.footer{border-top:1px solid var(--public-line)!important}
@media(max-width:700px){nav{overflow-x:auto;white-space:nowrap}.mmw-thematic-media img{height:230px}}
</style>`;

function cutAfterMarkerBeforeMain(html,marker){const idx=html.search(marker);if(idx<0)return html;const mainEnd=html.toLowerCase().lastIndexOf('</main>');if(mainEnd>idx)return html.slice(0,idx)+html.slice(mainEnd);const bodyEnd=html.toLowerCase().lastIndexOf('</body>');if(bodyEnd>idx)return html.slice(0,idx)+html.slice(bodyEnd);return html}
function removeCommercialTail(html){const marker=html.search(/COMMERCIAL MASTER/i);if(marker<0)return html;const mainEnd=html.toLowerCase().lastIndexOf('</main>');if(mainEnd>marker)return html.slice(0,marker)+html.slice(mainEnd);const bodyEnd=html.toLowerCase().lastIndexOf('</body>');if(bodyEnd>marker)return html.slice(0,marker)+html.slice(bodyEnd);return html}

function publicClean(html,route){
  const isProject=route.startsWith('/projects/')&&route!='/projects';
  html=html.replace(/<style[^>]*data-(?:etalon03|public-runtime|public-media)[^>]*>[\s\S]*?<\/style>/gi,'');
  html=html.replace(/<!--?[\s\S]*?FACTORY[^>]*-->/gi,'');
  html=html.replace(/FACTORY VISUAL MASTER 01/gi,'').replace(/FACTORY INFOGRAPHIC/gi,'BUSINESS SYSTEM').replace(/FACTORY THEMATIC MEDIA/gi,'');
  html=html.replace(/ONE SYSTEM\s*·\s*MULTIPLE PROJECT OUTPUTS/gi,'ONE SYSTEM · PROJECT PORTFOLIO');
  html=html.replace(/\bFactory\b/gi,'MMW methodology').replace(/ETALON[-–—]?03\s*[·•-]?\s*/gi,'');

  // Remove internal/duplicate tails before any wording substitutions can hide their markers.
  html=removeCommercialTail(html);
  if(isProject)html=cutAfterMarkerBeforeMain(html,/FINANCIAL MASTER\s*\/\s*CONCEPT\s+SCENARIO/i);
  if(isProject)html=cutAfterMarkerBeforeMain(html,/FINANCIAL MASTER\s*·\s*V1/i);
  if(isProject)html=cutAfterMarkerBeforeMain(html,/MMW PROJECT MASTER\s*[·•-]\s*V1/i);
  if(isProject)html=cutAfterMarkerBeforeMain(html,/MMW PROJECT MASTER/i);
  html=html.replace(/<section\b[^>]*>[\s\S]*?CONTROL ARCHITECTURE[\s\S]*?<\/section>/gi,'');
  html=html.replace(/<section\b[^>]*>[\s\S]*?READY-TO-SELL\s*100[\s\S]*?<\/section>/gi,'');

  html=html.replace(/READY[-–—]?TO[-–—]?SELL BUSINESS PROJECT/gi,'BUSINESS PROJECT PACKAGE');
  html=html.replace(/READY[-–—]?TO[-–—]?SELL/gi,'PROJECT PACKAGE');
  html=html.replace(/готовый к продаже и адаптации бизнес-проект/gi,'структурированный бизнес-проект для рассмотрения и адаптации');
  html=html.replace(/готовый к реализации девелоперский бизнес-проект/gi,'концептуальный девелоперский бизнес-проект для рассмотрения');
  html=html.replace(/готовый к реализации/gi,'подготовленный к рассмотрению');
  html=html.replace(/готовая система для запуска/gi,'структурированная система для подготовки к запуску');
  html=html.replace(/готовый к продаже/gi,'подготовленный как концепция для коммерческой проверки');
  html=html.replace(/готовый бизнес-проект/gi,'концептуальный бизнес-проект');
  html=html.replace(/готовый продукт/gi,'концептуальный продукт');
  html=html.replace(/Пять отраслевых направлений/gi,'Шесть отраслевых направлений');
  html=html.replace(/PACKAGE READY\s*·\s*75%/gi,'CONCEPT PACKAGE · READY FOR REVIEW');
  html=html.replace(/Отдельные состояния Factory, Verified, Conserved, Approved и Production\./gi,'Отдельные статусы проекта и проверяемые этапы разработки.');
  html=html.replace(/Что нужно получить для Financial Master V2/gi,'Что необходимо подтвердить для финансовой модели');
  html=html.replace(/DEVELOP\s*→\s*TEST\s*→\s*VERIFY\s*→\s*CONSERVE\s*→\s*APPROVE\s*→\s*PRODUCTION/gi,'MARKET → MODEL → ECONOMICS → OPERATIONS → CAPITAL → SALES → IMPLEMENTATION');
  html=html.replace(/\bFINANCIAL MASTER\b/gi,'FINANCIAL MODEL').replace(/\bPROJECT MASTER\b/gi,'BUSINESS PROJECT');
  html=html.replace(/\bREWORK REQUIRED\b/gi,'REVISION REQUIRED').replace(/\bSCENARIO COMPLETE\b/gi,'CONCEPT REVIEW COMPLETE');
  html=html.replace(/Financial Master V2/gi,'financial model');
  html=html.replace(/Следующий расчёт[^<.!?]*(?:\.|!|\?)/gi,'Следующий расчётный этап определяется после получения подтверждённых исходных данных.');
  html=html.replace(/href="\/projects\/(ALADIN|NEXUS-WORK|CARPATHIA|NEXUS-LOGISTICS|AGROHUB|ENERGY-PARK)"/gi,(m,p)=>`href="/projects/${p.toLowerCase()}"`);
  html=html.replace(/href="\/projects\/([A-Z-]+)"/g,(m,p)=>`href="/projects/${p.toLowerCase()}"`);
  return html.replace(/\s{2,}/g,' ');
}

function finish(html,route){
  const isProject=route.startsWith('/projects/')&&route!='/projects';
  const project=isProject?route.split('/')[2].toUpperCase():null;
  if(isProject)html=media(html,project);
  html=publicClean(html,route);
  if(isProject&&!/mmw-disclosure/i.test(html)){
    const disclosure=`<div class="mmw-disclosure"><strong>Публичный статус проекта.</strong> Это концептуально разработанный бизнес-проект MMW-COMPANY. Страница описывает продуктовую, операционную и экономическую модель; она не подтверждает наличие построенного объекта, действующего бизнеса, привлечённого финансирования или гарантированной доходности. Реализация требует отдельной проверки рынка, участка/актива, технических, юридических и финансовых исходных данных.</div>`;
    html=html.replace(/(<main[^>]*>)/i,'$1'+disclosure);
  }
  html=html.replace(/<\/head>/i,publicStyle+'</head>');
  html=html.replace(/MMW-COMPANY\s*·\s*BUSINESS PROJECT DEVELOPMENT©?\s*2026(?:\s*·\s*[^<]*)?/gi,'MMW-COMPANY · BUSINESS PROJECT DEVELOPMENT © 2026');
  html=html.replace(/<span>©\s*2026\s*·\s*<\/span>/gi,'<span>© 2026</span>');
  return html.replace(/FACTORY VISUAL MASTER 01/gi,'');
}

function send(file,res,route){
  try{res.set('Cache-Control','no-store, no-cache, must-revalidate, proxy-revalidate');res.set('Pragma','no-cache');res.type('html').send(finish(fs.readFileSync(path.join(site,file),'utf8'),route))}
  catch(e){console.error(e);res.status(404).sendFile(path.join(site,'404.html'))}
}

app.use('/assets',express.static(assets));
app.use('/company-assets',express.static(path.join(site,'assets')));
for(const [r,f] of Object.entries(routes))app.get(r,(q,s)=>send(f,s,r));
app.get('/media-manifest/:project.json',(q,s)=>{const p=String(q.params.project||'').toUpperCase();if(!projects.includes(p))return s.status(404).json({files:[]});s.json({project:p,files:photos(p)})});
app.use(express.static(site));
app.use((q,s)=>s.status(404).sendFile(path.join(site,'404.html')));

const port=process.env.PORT||3000;
app.listen(port,'0.0.0.0',()=>console.log(`MMW-COMPANY PUBLIC runtime listening on ${port}`));
