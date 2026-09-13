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
const finance={
 ALADIN:{capex:'80–120 млн ₴',value:'67,4 млн ₴ модельной выручки реализуемой части',readiness:'75%',focus:'Улучшить маржу: земля, стройка, инфраструктура, маркетинг и финансирование должны войти в полную модель.'},
 'NEXUS-WORK':{capex:'50–100 млн ₴',value:'≈15,7 млн ₴/год модельной валовой выручки',readiness:'65%',focus:'Добавить CAPEX, OPEX, NOI/EBITDA, загрузку, аренду/продажи площадей и срок окупаемости.'},
 CARPATHIA:{capex:'50–120 млн ₴',value:'Модель доходов требует числового заполнения',readiness:'55%',focus:'Зафиксировать количество юнитов, ADR, occupancy, ancillary revenue, CAPEX/OPEX и сезонность.'},
 'NEXUS-LOGISTICS':{capex:'20–60 млн ₴',value:'≈1,97 млн ₴ demo revenue за модельный период',readiness:'70%',focus:'Разделить contribution margin и EBITDA; добавить fleet, overhead, working capital и масштабирование.'},
 AGROHUB:{capex:'60–150 млн ₴',value:'≈8,35 млн ₴/мес. модельного оборота',readiness:'75%',focus:'Добавить технологический CAPEX, энергию, персонал, OPEX, оборотный капитал и контрактную сырьевую базу.'},
 'ENERGY-PARK':{capex:'25–50 млн ₴',value:'≈4,98 млн ₴/год модельной стоимости энергопотока',readiness:'65%',focus:'Проверить тарифы, grid connection, storage, degradation, CAPEX/OPEX и режим self-consumption.'}
};
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
function financeTransform(html,project){
  const d=finance[project];if(!d)return html;
  const block=`<section class="mmw-finance"><div class="mmw-finance-head"><small>11 / PRELIMINARY INVESTMENT MODEL</small><h2>Финансовый контур проекта</h2><p>Предварительная рабочая оценка MMW-COMPANY. Не инвестиционное предложение и не утверждённая смета.</p></div><div class="mmw-finance-grid"><div><b>PROJECT READINESS</b><strong>${d.readiness}</strong><span>текущая зрелость проектного пакета</span></div><div><b>PRELIMINARY CAPEX</b><strong>${d.capex}</strong><span>диапазон для дальнейшей проверки</span></div><div><b>MODEL VALUE</b><strong>${d.value}</strong><span>текущий демонстрационный показатель</span></div></div><div class="mmw-finance-focus"><b>NEXT FINANCIAL WORK</b><p>${d.focus}</p></div><div class="mmw-finance-chain"><span>LAND</span><i>→</i><span>CAPEX</span><i>→</i><span>OPEX</span><i>→</i><span>REVENUE</span><i>→</i><span>EBITDA</span><i>→</i><span>ROI / IRR</span><i>→</i><span>PAYBACK</span></div></section>`;
  return html.replace('</main>',block+'</main>');
}
function presentationTransform(html,project){
  html=cleanText(html);
  html=financeTransform(html,project);
  html=html.replace('</head>',`<style data-factory-media>\n.mmw-thematic-media{margin:22px 0;border:1px solid var(--project-primary,var(--gold,#d7ad59));background:var(--panel,transparent);overflow:hidden}.mmw-thematic-media img{display:block;width:100%;height:clamp(150px,24vw,285px);object-fit:cover}.mmw-card-media{display:block;width:calc(100% + 48px);height:150px;object-fit:cover;margin:-24px -24px 18px;border-bottom:1px solid var(--project-primary,var(--gold,#d7ad59))}.product .mmw-card-media{height:190px;margin:-24px -24px 15px}@media(max-width:600px){.mmw-card-media{height:135px}.product .mmw-card-media{height:165px}}\n.mmw-finance{margin:54px 0 20px;padding:28px;border:1px solid var(--project-primary,var(--gold,#d7ad59));background:linear-gradient(145deg,rgba(255,255,255,.035),rgba(0,0,0,.12));border-radius:14px}.mmw-finance-head small{color:var(--project-primary,var(--gold,#d7ad59));letter-spacing:.16em;font-weight:800}.mmw-finance-head h2{margin:8px 0;font-size:clamp(28px,4vw,48px)}.mmw-finance-head p,.mmw-finance-focus p,.mmw-finance-grid span{color:var(--muted,#9eaea8)}.mmw-finance-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:22px 0}.mmw-finance-grid>div{padding:18px;border:1px solid var(--line,#405538);background:rgba(0,0,0,.12)}.mmw-finance-grid b,.mmw-finance-focus b{display:block;color:var(--project-primary,var(--gold,#d7ad59));font-size:11px;letter-spacing:.12em}.mmw-finance-grid strong{display:block;font-size:25px;margin:7px 0;color:var(--project-signal,var(--gold2,#f1d894))}.mmw-finance-focus{padding:17px;border-left:3px solid var(--project-primary,var(--gold,#d7ad59));background:rgba(0,0,0,.12)}.mmw-finance-focus p{margin:7px 0 0}.mmw-finance-chain{display:flex;flex-wrap:wrap;gap:7px;align-items:center;margin-top:18px;font-size:11px;font-weight:800}.mmw-finance-chain span{padding:7px 9px;border:1px solid var(--line,#405538);border-radius:7px}.mmw-finance-chain i{color:var(--project-primary,var(--gold,#d7ad59));font-style:normal}@media(max-width:700px){.mmw-finance-grid{grid-template-columns:1fr}.mmw-finance{padding:20px}}\n</style></head>`);
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