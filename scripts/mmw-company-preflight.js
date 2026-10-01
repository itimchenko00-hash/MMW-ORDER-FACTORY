const fs=require("fs");
const path=require("path");
const root=path.resolve(__dirname,"..");
const app=path.join(root,"public","app.js");
const source=fs.readFileSync(app,"utf8");
const assets=path.join(root,"ASSETS","MMW-COMPANY","photos");
const fail=[];
function bad(msg){fail.push(msg)}
const refs=[...source.matchAll(/\/ASSETS\/MMW-COMPANY\/photos\/([^"'\\)]+)/g)].map(m=>m[1]);
if(!refs.length) bad("No local MMW-COMPANY Factory media references found");
for(const ref of refs){if(!fs.existsSync(path.join(assets,ref))) bad("Missing Factory asset: "+ref)}
const media=[...source.matchAll(/COMPANY_MEDIA\.([A-Za-z0-9_]+)/g)].map(m=>m[1]);
const duplicates=media.length-new Set(media).size;
if(duplicates>0) console.warn("Factory media references repeat across the full app; page-level uniqueness is checked separately.");
const pageNames=["home","companyPage","solutionsPage","systemPage","contactsPage"];
for(const name of pageNames){
 const start=source.indexOf("function "+name+"(");
 if(start<0){bad("Missing renderer: "+name);continue}
 const next=source.indexOf("\nfunction ",start+10);
 const body=source.slice(start,next<0?source.length:next);
 const refs=[...body.matchAll(/COMPANY_MEDIA\.([A-Za-z0-9_]+)/g)].map(m=>m[1]);
 if(!refs.length) bad(name+": no Factory media assignments");
 if(new Set(refs).size!==refs.length) bad(name+": duplicate Factory media assignment");
}
if(!source.includes('loading="lazy"')) bad("Native lazy-loaded image markup is missing");
if(fail.length){console.error("MMW-COMPANY PREFLIGHT FAILED");fail.forEach(x=>console.error(" - "+x));process.exit(1)}
console.log("MMW-COMPANY PREFLIGHT OK");
console.log("Factory assets checked:",new Set(refs).size);
console.log("Media refs checked:",media.length);
