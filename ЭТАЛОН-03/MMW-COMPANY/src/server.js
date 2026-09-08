const express=require('express');
const path=require('path');
const app=express();
const root=path.join(process.cwd(),'ЭТАЛОН-03/MMW-COMPANY');
const site=path.join(root,'site');
const routes={
  '/':'home.html','/company':'company.html','/projects':'projects.html','/services':'services.html','/ready-to-sell':'ready-to-sell.html','/process':'process.html','/investors':'investors.html','/knowledge':'knowledge.html','/contact':'contact.html',
  '/projects/aladin':'projects/ALADIN.html','/projects/carpathia':'projects/CARPATHIA.html','/projects/agrohub':'projects/AGROHUB.html','/projects/energy-park':'projects/ENERGY-PARK.html','/projects/nexus-logistics':'projects/NEXUS-LOGISTICS.html','/projects/nexus-work':'projects/NEXUS-WORK.html'
};
app.use('/company-assets',express.static(path.join(site,'assets')));
app.use('/assets',express.static(path.join(process.cwd(),'ASSETS')));
for(const [route,file] of Object.entries(routes)) app.get(route,(req,res)=>res.sendFile(path.join(site,file)));
app.use(express.static(site));
app.use((req,res)=>res.status(404).sendFile(path.join(site,'404.html')));
const port=process.env.PORT||3000;
app.listen(port,'0.0.0.0',()=>console.log(`MMW-COMPANY ETALON 03 listening on ${port}`));
