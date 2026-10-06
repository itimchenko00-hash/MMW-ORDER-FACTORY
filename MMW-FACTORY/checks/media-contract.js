#!/usr/bin/env node
const fs=require('node:fs');
const path=require('node:path');
const root=process.cwd();
const app=path.join(root,'public','app.js');
const server=path.join(root,'server.js');
const add=(id,ok,msg,blocking=true)=>checks.push({id,ok,msg,blocking});
const checks=[];
const exists=p=>fs.existsSync(path.join(root,p));
add('LIVE-APP',exists('public/app.js'),'Live application renderer exists');
add('LIVE-SERVER',exists('server.js'),'Live server exists');
if(exists('public/app.js')){
 const s=fs.readFileSync(app,'utf8');
 add('APP-SYNTAX',require('node:child_process').spawnSync(process.execPath,['--check',app]).status===0,'public/app.js syntax is valid');
 const required=['nexusWorkProject','carpathiaProject','aladinProject','logisticsProjectView','renderProductArchitecture','bindProductCards'];
 for(const fn of required)add('RENDERER-'+fn,s.includes('function '+fn+'('),'Renderer '+fn+' is present');
 const media=[...s.matchAll(/['\"](\/ASSETS\/[^'\"]+\.(?:jpg|jpeg|png|webp|svg))['\"]/gi)].map(m=>m[1]);
 const unique=[...new Set(media)];
 add('MEDIA-NO-EXTERNAL',![...s.matchAll(/['\"](https?:\\/\\/[^'\"]+)['\"]/gi)].length,'No runtime external image URLs in app.js');
 add('MEDIA-LOCAL',unique.length>0,'Local project media references exist');
 const missing=unique.filter(p=>!fs.existsSync(path.join(root,'public',p.replace(/^\//,'')))&&!fs.existsSync(path.join(root,p.replace(/^\//,''))));
 add('MEDIA-FILES',missing.length===0,'All referenced local media files exist'+(missing.length?' (missing: '+missing.slice(0,8).join(', ')+')':''));
 add('MEDIA-UNIQUE',unique.length===media.length,'No duplicated local media references');
 for(const [id,asset] of [['nexus-work','NEXUS-WORK'],['nexus-logistics','NEXUS-LOGISTICS'],['carpathia-eco-lodge','CARPATHIA'],['agrohub','AGROHUB'],['energy-park','ENERGY-PARK']])add('MEDIA-'+id,s.includes('/ASSETS/'+asset+'/'),'Media map for '+id+' exists');
}
if(exists('server.js')){
 const s=fs.readFileSync(server,'utf8');
 const routes=['nexus-work','nexus-logistics','carpathia','agrohub','energy-park','aladin'];
 for(const id of routes)add('ROUTE-'+id,s.includes('/'+(id==='carpathia'?'carpathia':id)+'.html'),'Legacy route '+id+' is explicitly handled');
}
console.log(JSON.stringify({factory:'MMW FACTORY',status:checks.some(x=>!x.ok&&x.blocking)?'FAIL':'PASS',checks},null,2));
process.exit(checks.some(x=>!x.ok&&x.blocking)?1:0);