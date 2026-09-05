const express=require('express');
const path=require('path');
const fs=require('fs');
const app=express();
const PORT=process.env.PORT||10000;
const ALADIN='ЭТАЛОН-02/MMW-COMPANY/projects/ALADIN/website/aladin-presentation-suite.html';

let fxCache={data:null,at:0};
async function loadFx(){
  if(fxCache.data&&Date.now()-fxCache.at<15*60*1000)return fxCache.data;
  const r=await fetch('https://api.frankfurter.app/latest?from=EUR');
  if(!r.ok)throw new Error('FX provider unavailable');
  const d=await r.json();
  fxCache={data:{base:d.base,date:d.date,rates:d.rates,provider:'Frankfurter / ECB reference data'},at:Date.now()};
  return fxCache.data;
}

app.get('/api/fx',async(req,res)=>{
  try{
    const data=await loadFx();
    res.set('Cache-Control','public,max-age=900');
    res.json({...data,updatedAt:new Date(fxCache.at).toISOString()});
  }catch(e){
    res.status(503).json({error:'fx_unavailable',message:'Курс временно недоступен'});
  }
});

app.get('/aladin',(req,res)=>{
  const p=path.join(__dirname,ALADIN);
  if(!fs.existsSync(p))return res.status(404).send('ALADIN page not found');
  res.set('Cache-Control','no-store,no-cache,must-revalidate,max-age=0');
  res.set('X-ALADIN-SOURCE','PROJECT-ISOLATED-ENHANCED');
  res.type('html').send(fs.readFileSync(p,'utf8'));
});
app.get('/health',(req,res)=>res.json({ok:true,service:'ALADIN-PROJECT',fx:!!fxCache.data}));
app.get('/',(req,res)=>res.redirect('/aladin'));
app.use((req,res)=>res.status(404).send('ALADIN route not found'));
app.listen(PORT,()=>console.log('[ALADIN] isolated project server active on '+PORT));