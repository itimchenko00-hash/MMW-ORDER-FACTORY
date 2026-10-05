#!/usr/bin/env node
const fs=require('node:fs'),path=require('node:path');
const root=process.cwd(),file=p=>path.join(root,p),checks=[];
const add=(id,ok,msg,blocking=true)=>checks.push({id,ok,msg,blocking});
const app=fs.readFileSync(file('public/app.js'),'utf8');
const required=['aladin-residence','nexus-work','nexus-logistics','carpathia-eco-lodge','agrohub','energy-park'];
const missing=required.filter(id=>!app.includes('"'+id+'"'));
add('PROJECT-SET',missing.length===0,missing.length?'Missing project ids: '+missing.join(', '):'All six controlled project ids found');
for(const id of required){
 const start=app.indexOf('"'+id+'":{');
 const next=app.indexOf('\n"',start+4);
 const block=start>=0?app.slice(start,next>start?next:Math.min(app.length,start+30000)):'';
 const fields=['name:','type:','status:','summary:','audience:','site:','media:','sections:','eco:'];
 const miss=fields.filter(x=>!block.includes(x));
 add('PROJECT-SCHEMA-'+id,miss.length===0,miss.length?'Missing fields: '+miss.join(', '):'Required project fields present');
}
const mediaBlocks=[...app.matchAll(/media:\s*\[([\s\S]*?)\]/g)].map(m=>[...m[1].matchAll(/["']([^"']+)["']/g)].map(x=>x[1]));
const projectMedia=mediaBlocks.slice(0,6).flat();
const dup=projectMedia.filter((x,i)=>projectMedia.indexOf(x)!==i);
add('PROJECT-MEDIA-UNIQUENESS',dup.length===0,dup.length?'Duplicate project media: '+[...new Set(dup)].join(', '):projectMedia.length+' project media references are unique');
add('PROJECT-MEDIA-MINIMUM',mediaBlocks.length>=6&&mediaBlocks.slice(0,6).every(x=>x.length>0),mediaBlocks.length>=6?'All controlled projects contain media arrays':'Not all controlled projects contain media arrays');
const mechanics=required.map(id=>{const i=app.indexOf('"'+id+'":{');const s=app.slice(i,i+1200);return [id,/mechanic:"[^"]+"/.test(s)]});
add('PROJECT-MECHANICS',mechanics.every(x=>x[1]),mechanics.filter(x=>!x[1]).map(x=>x[0]).join(', ')||'Each controlled project declares an interaction mechanic');
const catalog=fs.readFileSync(file('src/company-catalog.js'),'utf8');
const catalogIds=[...catalog.matchAll(/id:"([^"]+)"/g)].map(m=>m[1]);
const badCatalog=catalogIds.filter(id=>!required.includes(id)&&id.includes('-'));
add('CATALOG-CONTROLLED-IDS',badCatalog.length===0,'Catalog ids remain within the controlled project/service namespace');
const economics=required.map(id=>{const i=app.indexOf('"'+id+'":{');const s=app.slice(i,i+25000);return [id,s.includes('eco:{')||s.includes('eco: {')]});
add('PROJECT-ECONOMICS',economics.every(x=>x[1]),economics.filter(x=>!x[1]).map(x=>x[0]).join(', ')||'Each controlled project declares an economics contour');
const report={factory:'MMW FACTORY',check:'project-integrity',version:'1.0',status:checks.some(x=>!x.ok&&x.blocking)?'FAIL':'PASS',blockers:checks.filter(x=>!x.ok&&x.blocking).length,checks};
console.log(JSON.stringify(report,null,2));
process.exit(report.blockers?1:0);
