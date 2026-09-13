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
    .replace(/PACKAGE READY · 75%/gi,'PACKAGE READY · 100% CONCEPT PACKAGE');
}

function removeSectionContaining(html,pattern){
  const re=new RegExp('<section\\b[^>]*>[\\s\\S]*?'+pattern+'[\\s\\S]*?<\\/section>','gi');
  return html.replace(re,'');
}

function cleanPublicBlocks(html,route){
  const markers={
    commercial:'MMW-COMPANY\\s*[·•-]?\\s*COMMERCIAL MASTER',
    finance:'FINANCIAL MASTER\\s*\\/\\s*CONCEPT SCENARIO',
    projectMaster:'MMW PROJECT MASTER\\s*[·•-]?\\s*V1',
    governance:'CONTROL\\s+ARCHITECTURE',
    readyStandard:'READY[-–—]?TO[-–—]?SELL\\s+100',
    factoryFlow:'DEVELOP\\s*→\\s*TEST\\s*→\\s*VERIFY\\s*→\\s*CONSERVE\\s*→\\s*APPROVE\\s*→\\s*PRODUCTION'
  };
  html=removeSectionContaining(html,markers.commercial);
  if(route.startsWith('/projects/')){
    html=removeSectionContaining(html,markers.finance);
    html=removeSectionContaining(html,markers.projectMaster);
  }
  if(route==='/company'){
    html=removeSectionContaining(html,markers.governance);
    html=removeSectionContaining(html,markers.readyStandard);
  }
  if(route==='/process') html=removeSectionContaining(html,markers.factoryFlow);
  if(route==='/knowledge'){
    html=html.replace(/Отдельные состояния Factory, Verified, Conserved, Approved и Production\./gi,'Отдельные статусы проекта и проверяемые этапы разработки.');
  }
  html=html.replace(/<style[^>]*data-etalon03-[^>]*>[\s\S]*?<\/style>/gi,'');
  html=html.replace(/<style[^>]*data-public-runtime[^>]*>[\s\S]*?<\/style>/gi,'');
  return html;
}

function cleanFooter(html){
  return html.replace(/MMW-COMPANY\s*[·•-]\s*BUSINESS PROJECT DEVELOPMENT©?\s*2026\s*[·•-]?\s*/gi,'MMW-COMPANY · BUSINESS PROJECT DEVELOPMENT © 2026');
}

function sendHtml(file,res,route){
  try{
    let html=fs.readFileSync(path.join(site,file),'utf8');
    html=cleanText(html);
    html=cleanPublicBlocks(html,route);
    html=cleanFooter(html);
    res.type('html').send(html);
  }catch(e){
    console.error(e);
    res.status(404).sendFile(path.join(site,'404.html'));
  }
}

app.use('/company-assets',express.static(path.join(site,'assets')));
app.use('/assets',express.static(assets));
app.get('/media-manifest/:project.json',(req,res)=>{
  const project=String(req.params.project||'').toUpperCase();
  if(!projectNames.has(project)) return res.status(404).json({files:[]});
  try{
    const files=fs.readdirSync(path.join(assets,project,'photos')).filter(f=>/\.(jpe?g|png|webp)$/i.test(f)).sort();
    res.json({project,files,count:files.length});
  }catch{res.json({project,files:[],count:0});}
});
for(const [route,file] of Object.entries(routes)) app.get(route,(req,res)=>sendHtml(file,res,route));
app.use(express.static(site));
app.use((req,res)=>res.status(404).sendFile(path.join(site,'404.html')));
const port=process.env.PORT||3000;
app.listen(port,'0.0.0.0',()=>console.log(`MMW-COMPANY PUBLIC runtime listening on ${port}`));
