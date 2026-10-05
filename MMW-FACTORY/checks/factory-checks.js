#!/usr/bin/env node
const fs=require("node:fs"),path=require("node:path"),cp=require("node:child_process");
const root=process.cwd(),report=[];
const add=(id,ok,msg,blocking=true)=>report.push({id,ok,msg,blocking});
const read=p=>{try{return fs.readFileSync(path.join(root,p),"utf8")}catch{return null}};
const exists=p=>fs.existsSync(path.join(root,p));
const walk=(dir,out=[])=>{if(!exists(dir))return out;for(const n of fs.readdirSync(path.join(root,dir),{withFileTypes:true})){const rel=path.join(dir,n.name);if(n.isDirectory())walk(rel,out);else out.push(rel)}return out};
const js=walk("src").concat(walk("public")).filter(p=>p.endsWith(".js"));
let syntaxOk=true;
for(const f of js){try{new Function(read(f));}catch(e){syntaxOk=false;add("JS-SYNTAX",false,f+": "+e.message)}}
if(!js.length)add("JS-SYNTAX",false,"No JS source files found");
else if(syntaxOk)add("JS-SYNTAX",true,js.length+" JavaScript files parsed");
const app=read("public/app.js")||"";
const forbidden=["ЭТАЛОН 03","Data Room","канонический","один источник","гарантированная доходность"];
const hits=forbidden.filter(x=>app.toLowerCase().includes(x.toLowerCase()));
add("PUBLIC-TERMS",hits.length===0,hits.length?"Forbidden public terms: "+hits.join(", "):"No blocked public terms found");
const media=[...app.matchAll(/media:\s*\[([\s\S]*?)\]/g)].flatMap(m=>[...m[1].matchAll(/["']([^"']+)["']/g)].map(x=>x[1]));
const dup=media.filter((x,i)=>media.indexOf(x)!==i);
add("MEDIA-DUPLICATES",dup.length===0,dup.length?"Duplicate media: "+[...new Set(dup)].join(", "):media.length+" project media references checked");
const catalog=read("src/company-catalog.js")||"";
const ids=[...catalog.matchAll(/id:"([^"]+)"/g)].map(x=>x[1]);
const duplicateIds=ids.filter((x,i)=>ids.indexOf(x)!==i);
add("CATALOG-IDS",duplicateIds.length===0,duplicateIds.length?"Duplicate catalog ids: "+[...new Set(duplicateIds)].join(", "):ids.length+" catalog ids checked");
const escaped=app.match(/\\n/g)||[];
add("LITERAL-ARTIFACTS",escaped.length===0,escaped.length?"Literal escaped-newline artifacts: "+escaped.length:"No literal escaped-newline artifacts");
const orders=read("src/company-orders.js")||"";
const productionGuard=/process\.env\.RENDER===["']true["']|process\.env\.NODE_ENV===["']production["']/.test(orders);
const postgresGuard=/PostgreSQL|DATABASE_URL|MMW_COMPANY_DATABASE_URL/.test(orders);
add("PRODUCTION-DB-GUARD",productionGuard&&postgresGuard,productionGuard&&postgresGuard?"Production persistence guard detected":"Production DB fail-fast guard not detected");
const workflow=read(".github/workflows/import-energy-media.yml");
if(workflow){const weak=/\|\|\s*true/.test(workflow);add("ENERGY-WORKFLOW",!weak,!weak?"Required media workflow is fail-closed":"Workflow contains '|| true' and may hide failures")}else add("ENERGY-WORKFLOW",false,"Energy media workflow not found",false);
const pkg=read("package.json");
if(pkg){try{JSON.parse(pkg);add("PACKAGE-JSON",true,"package.json parses")}catch(e){add("PACKAGE-JSON",false,e.message)}}else add("PACKAGE-JSON",false,"package.json not found");
try{const git=cp.execSync("git rev-parse HEAD",{encoding:"utf8"}).trim();add("GIT-CONTROL",!!git,git?"Checked commit "+git:"Git commit unavailable",false)}catch{add("GIT-CONTROL",false,"Git metadata unavailable",false)}
const blockers=report.filter(x=>!x.ok&&x.blocking);
console.log(JSON.stringify({factory:"MMW FACTORY",version:"1.0",status:blockers.length?"FAIL":"PASS",blockers:blockers.length,checks:report},null,2));
process.exit(blockers.length?1:0);
