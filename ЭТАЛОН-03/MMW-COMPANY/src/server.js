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
app.use('/company-assets',express.static(path.join(site,'assets')));
app.use('/assets',express.static(assets));
app.get('/media-manifest/:project.json',(req,res)=>{
  const project=String(req.params.project||'').toUpperCase();
  if(!projectNames.has(project))return res.status(404).json({files:[]});
  const dir=path.join(assets,project,'photos');
  let files=[];
  try{files=fs.readdirSync(dir).filter(f=>/\.(jpe?g|png|webp)$/i.test(f)).sort((a,b)=>a.localeCompare(b));}catch{}
  res.json({project,files,count:files.length});
});
function sendHtml(file,res){
  try{let html=fs.readFileSync(path.join(site,file),'utf8');const tag='<script src="/company-assets/thematic-media.js" defer></script>';if(!html.includes('/company-assets/thematic-media.js'))html=html.replace('</head>',tag+'</head>');res.type('html').send(html);}catch{res.status(404).sendFile(path.join(site,'404.html'));}}
for(const [route,file] of Object.entries(routes)) app.get(route,(req,res)=>sendHtml(file,res));
app.use(express.static(site));
app.use((req,res)=>res.status(404).sendFile(path.join(site,'404.html')));
const port=process.env.PORT||3000;
app.listen(port,'0.0.0.0',()=>console.log(`MMW-COMPANY ETALON 03 listening on ${port}`));
