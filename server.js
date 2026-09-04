const express=require('express');
const path=require('path');
const fs=require('fs');
const app=express();
const PORT=process.env.PORT||10000;
const ALADIN=path.join(__dirname,'ЭТАЛОН-02','MMW-COMPANY','projects','ALADIN','website','aladin-presentation-suite.html');
const URBAN_OVERRIDE=path.join(__dirname,'ЭТАЛОН-02','MMW-COMPANY','projects','ALADIN','website','aladin-compact-urban-override.js');
const SCANDINAVIAN_OVERRIDE=path.join(__dirname,'ЭТАЛОН-02','MMW-COMPANY','projects','ALADIN','website','aladin-scandinavian-override.js');
const BRICK_OVERRIDE=path.join(__dirname,'ЭТАЛОН-02','MMW-COMPANY','projects','ALADIN','website','aladin-contemporary-brick-override.js');
if(!fs.existsSync(ALADIN)){console.error('[ALADIN-FATAL] Missing canonical ALADIN page:',ALADIN);process.exit(1)}
if(!fs.existsSync(URBAN_OVERRIDE)){console.error('[ALADIN-FATAL] Missing COMPACT URBAN override:',URBAN_OVERRIDE);process.exit(1)}
if(!fs.existsSync(SCANDINAVIAN_OVERRIDE)){console.error('[ALADIN-FATAL] Missing SCANDINAVIAN override:',SCANDINAVIAN_OVERRIDE);process.exit(1)}
if(!fs.existsSync(BRICK_OVERRIDE)){console.error('[ALADIN-FATAL] Missing CONTEMPORARY BRICK override:',BRICK_OVERRIDE);process.exit(1)}
app.disable('x-powered-by');
app.use((req,res,next)=>{res.set('Cache-Control','no-store,no-cache,must-revalidate,proxy-revalidate,max-age=0');res.set('Pragma','no-cache');res.set('Expires','0');res.set('X-ALADIN-SOURCE','FACTORY-CANONICAL');res.set('X-ALADIN-REPO','itimchenko00-hash/MMW-ORDER-FACTORY');res.set('X-ALADIN-BRANCH','aladin-six-blocks-working');res.set('X-ALADIN-BUILD','ALADIN-RECOVERY-2026-09-04');next()});
app.get('/aladin',(req,res)=>{let html=fs.readFileSync(ALADIN,'utf8');const urban=fs.readFileSync(URBAN_OVERRIDE,'utf8');const scandinavian=fs.readFileSync(SCANDINAVIAN_OVERRIDE,'utf8');const brick=fs.readFileSync(BRICK_OVERRIDE,'utf8');html=html.replace('</body>','<script>'+urban+'\n'+scandinavian+'\n'+brick+'</script></body>');res.type('html').send(html)});
app.get('/',(req,res)=>res.redirect('/aladin'));
app.use((req,res)=>res.status(404).send('ALADIN route not found'));
app.listen(PORT,()=>console.log(`[ALADIN-FACTORY] canonical source active on ${PORT}`));
