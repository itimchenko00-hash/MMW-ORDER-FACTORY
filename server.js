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
  let sectionIndex=0;
  html=html.replace(/<section\b([^>]*)>([\s\S]*?)<\/section>/gi,(full,attrs,body)=>{const t=textOf(body),role=roleFor(t),file=take(role,t,sectionIndex++);if(!file)return full;return `<section${attrs}><figure class="mmw-thematic-media"><img loading="lazy" src="${src(file)}" alt="${project} — ${role.toLowerCase()}"></figure>${body}</section>`});
  let cardIndex=0;
  return html.replace(/<article\b([^>]*)class="([^"]*\bcard\b[^"]*)"([^>]*)>([\s\S]*?)<\/article>/gi,(full,a,classes,b,body)=>{if(/<img\b|class=["'][^"']*\bvisual\b/i.test(body))return full;const t=textOf(body),role=roleFor(t),file=take(role,t,100+cardIndex++);if(!file)return full;return `<article${a}class="${classes}"${b}><img loading="lazy" class="mmw-card-media" src="${src(file)}" alt="${project} — ${role.toLowerCase()}">${body}</article>`});
}
function cleanText(html){
  return html
    .replace(/FACTORY VISUAL MASTER 01/gi,'')
    .replace(/FACTORY INFOGRAPHIC/gi,'BUSINESS SYSTEM')
    .replace(/FACTORY THEMATIC MEDIA/gi,'')
    .replace(/ONE SYSTEM · MULTIPLE PROJECT OUTPUTS/gi,'ONE SYSTEM · PROJECT PORTFOLIO')
    .replace(/Factory status/gi,'Project status')
    .replace(/\bFactory\b/gi,'MMW methodology')
    .replace(/ETALON[-–—]?03\s*[·•-]?\s*/gi,'')
    .replace(/READY[-–—]?TO[-–—]?SELL BUSINESS PROJECT/gi,'BUSINESS PROJECT DEVELOPMENT')
    .replace(/Защищённые и законсервированные версии не изменяются автоматически\./gi,'Утверждённые версии проекта не изменяются автоматически.')
    .replace(/Пять отраслевых направлений/gi,'Шесть отраслевых направлений')
    .replace(/PACKAGE READY · 75%/gi,'PACKAGE READY · 100% CONCEPT PACKAGE')
    .replace(/Отдельные состояния Factory, Verified, Conserved, Approved и Production\./gi,'Отдельные статусы проекта и проверяемые этапы разработки.');
}
function stripClassBlock(html,className){
  const re=new RegExp('<(?:section|div|aside|article)\\b[^>]*class=["\\\'][^"\\\']*\\b'+className+'\\b[^"\\\']*["\\\'][^>]*>[\\s\\S]*?<\\/(?:section|div|aside|article)>','gi');
  return html.replace(re,'');
}
function removeSectionContaining(html,pattern){
  const re=new RegExp('<section\\b[^>]*>[\\s\\S]*?'+pattern+'[\\s\\S]*?<\\/section>','gi');
  return html.replace(re,'');
}
function cleanPublicBlocks(html,route){
  html=stripClassBlock(html,'mmw-commercial');
  html=stripClassBlock(html,'mmw-finance');
  html=stripClassBlock(html,'mmw-master');
  html=stripClassBlock(html,'mmw-governance');
  html=stripClassBlock(html,'mmw-ready');
  html=removeSectionContaining(html,'COMMERCIAL MASTER');
  if(route.startsWith('/projects/')){
    html=removeSectionContaining(html,'FINANCIAL MASTER\\s*\\/\\s*CONCEPT SCENARIO');
    html=removeSectionContaining(html,'MMW PROJECT MASTER\\s*[·•-]?\\s*V1');
  }
  if(route==='/company'){
    html=removeSectionContaining(html,'CONTROL\\s+ARCHITECTURE');
    html=removeSectionContaining(html,'READY[-–—]?TO[-–—]?SELL\\s+100');
  }
  if(route==='/process') html=html.replace(/DEVELOP\\s*→\\s*TEST\\s*→\\s*VERIFY\\s*→\\s*CONSERVE\\s*→\\s*APPROVE\\s*→\\s*PRODUCTION[\s\S]*?(?=<\/section>)/gi,'');
  html=html.replace(/<style[^>]*data-etalon03-[^>]*>[\s\S]*?<\/style>/gi,'');
  html=html.replace(/<style[^>]*data-public-runtime[^>]*>[\s\S]*?<\/style>/gi,'');
  return html;
}
function injectMediaCss(html){
  const css='<style data-public-media>figure.mmw-thematic-media{margin:0 0 22px;border:1px solid rgba(255,255,255,.12);border-radius:14px;overflow:hidden;background:#111}figure.mmw-thematic-media img{display:block;width:100%;height:min(42vw,360px);min-height:180px;object-fit:cover;object-position:center}.mmw-card-media{display:block;width:100%;height:150px;object-fit:cover;border-radius:10px;margin:0 0 14px}</style>';
  return html.replace('</head>',css+'</head>');
}
function cleanFooter(html){return html.replace(/MMW-COMPANY\s*[·•-]\s*BUSINESS PROJECT DEVELOPMENT©?\s*2026\s*[·•-]?\s*/gi,'MMW-COMPANY · BUSINESS PROJECT DEVELOPMENT © 2026').replace(/\s*·\s*READY[-–—]?TO[-–—]?SELL BUSINESS PROJECT/gi,'');}
function sendHtml(file,res,route){
  try{
    let html=fs.readFileSync(path.join(site,file),'utf8');
    html=cleanText(html);
    const project=route.startsWith('/projects/')?route.split('/')[2].toUpperCase():'MMW-COMPANY';
    if(route.startsWith('/projects/')) html=mediaTransform(html,project);
    html=cleanPublicBlocks(html,route);
    html=injectMediaCss(html);
    html=cleanFooter(html);
    res.type('html').send(html);
  }catch(e){console.error(e);res.status(404).sendFile(path.join(site,'404.html'));}
}
app.use('/company-assets',express.static(path.join(site,'assets')));
app.use('/assets',express.static(assets));
app.get('/media-manifest/:project.json',(req,res)=>{const project=String(req.params.project||'').toUpperCase();if(!projectNames.has(project))return res.status(404).json({files:[]});try{const files=fs.readdirSync(path.join(assets,project,'photos')).filter(f=>/\.(jpe?g|png|webp)$/i.test(f)).sort();res.json({project,files,count:files.length});}catch{res.json({project,files:[],count:0});}});
for(const [route,file] of Object.entries(routes)) app.get(route,(req,res)=>sendHtml(file,res,route));
app.use(express.static(site));
app.use((req,res)=>res.status(404).sendFile(path.join(site,'404.html')));
const port=process.env.PORT||3000;
app.listen(port,'0.0.0.0',()=>console.log(`MMW-COMPANY PUBLIC runtime listening on ${port}`));