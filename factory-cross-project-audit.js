const fs=require('fs');const path=require('path');
const ROOT=__dirname;const COMPANY=path.join(ROOT,'ЭТАЛОН-03/MMW-COMPANY');const SITE=path.join(COMPANY,'site');const ASSETS=path.join(SITE,'assets');
const PROJECTS=['ALADIN','CARPATHIA','AGROHUB','ENERGY-PARK','NEXUS-LOGISTICS','NEXUS-WORK'];
const canonical=['home.html','company.html','projects.html','services.html','ready-to-sell.html','process.html','investors.html','knowledge.html','contact.html',...PROJECTS.map(x=>`projects/${x}.html`)];
let failed=false;const etalon2=[];const missing=[];const refs=[];
function walk(dir){if(!fs.existsSync(dir))return [];return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{const p=path.join(dir,e.name);return e.isDirectory()?walk(p):/\.(html|css|js|json)$/i.test(e.name)?[p]:[]})}
for(const rel of canonical){const p=path.join(SITE,rel);if(!fs.existsSync(p)){missing.push(rel);failed=true;continue}const text=fs.readFileSync(p,'utf8');if(/ЭТАЛОН-02|MMW-ORDER-FACTORY\/ЭТАЛОН-02|hook\.js/i.test(text))etalon2.push(rel);for(const m of text.matchAll(/\/assets\/([^'"?\\)\s>]+)/gi)){const a=m[1];refs.push(`${rel}:/${a}`);if(!fs.existsSync(path.join(ASSETS,a))){missing.push(`${rel}:/${a}`);failed=true}}}
const runtime=fs.readFileSync(path.join(COMPANY,'src/server.js'),'utf8');if(/ЭТАЛОН-02|hook\.js|bootstrap/i.test(runtime)){etalon2.push('src/server.js');failed=true}
const allCanonical=walk(SITE);for(const file of allCanonical){const text=fs.readFileSync(file,'utf8');if(/require\([^)]*hook|assets-server-bootstrap|unified-process-system|company-ui-hook/i.test(text)){etalon2.push(path.relative(ROOT,file))}}
console.log(`=== ETALON 03 CROSS-PROJECT / LEGACY AUDIT ===`);console.log(`canonical-files=${canonical.length} local-asset-refs=${refs.length} missing=${missing.length} legacy-findings=${etalon2.length}`);
if(missing.length){console.log('\n[MISSING]');missing.forEach(x=>console.log(x))}if(etalon2.length){console.log('\n[LEGACY / HOOK FINDINGS]');[...new Set(etalon2)].forEach(x=>console.log(x))}
process.exitCode=failed?1:0;
