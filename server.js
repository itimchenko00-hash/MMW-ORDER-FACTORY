const express=require('express');
const path=require('path');
const fs=require('fs');
const app=express();
const PORT=process.env.PORT||10000;
const ALADIN=path.join(__dirname,'ЭТАЛОН-02','MMW-COMPANY','projects','ALADIN','website','aladin-presentation-suite.html');
if(!fs.existsSync(ALADIN)){console.error('[ALADIN-FATAL] Missing canonical ALADIN page:',ALADIN);process.exit(1)}
app.disable('x-powered-by');
app.use((req,res,next)=>{res.set('Cache-Control','no-store,no-cache,must-revalidate,proxy-revalidate,max-age=0');res.set('Pragma','no-cache');res.set('Expires','0');res.set('X-ALADIN-SOURCE','FACTORY-CANONICAL');res.set('X-ALADIN-REPO','itimchenko00-hash/MMW-ORDER-FACTORY');res.set('X-ALADIN-BRANCH','aladin-six-blocks-working');res.set('X-ALADIN-BUILD','ALADIN-DIRECT-2026-09-04-89361ae');next()});
app.get('/aladin',(req,res)=>{res.type('html').send(fs.readFileSync(ALADIN,'utf8'))});
app.get('/',(req,res)=>res.redirect('/aladin'));
app.use((req,res)=>res.status(404).send('ALADIN route not found'));
app.listen(PORT,()=>console.log(`[ALADIN-FACTORY] canonical source active on ${PORT}`));
