const fs=require('fs');const path=require('path');
const ROOT=__dirname;const COMPANY=path.join(ROOT,'ЭТАЛОН-03/MMW-COMPANY');const SITE=path.join(COMPANY,'site');const ASSETS=path.join(SITE,'assets');
const routes={
 '/':'home.html','/company':'company.html','/projects':'projects.html','/services':'services.html','/ready-to-sell':'ready-to-sell.html','/process':'process.html','/investors':'investors.html','/knowledge':'knowledge.html','/contact':'contact.html',
 '/projects/aladin':'projects/ALADIN.html','/projects/carpathia':'projects/CARPATHIA.html','/projects/agrohub':'projects/AGROHUB.html','/projects/energy-park':'projects/ENERGY-PARK.html','/projects/nexus-logistics':'projects/NEXUS-LOGISTICS.html','/projects/nexus-work':'projects/NEXUS-WORK.html'
};
let failed=false;const missing=[];const legacy=[];const external=[];const refs=[];
function exists(p,label){if(!fs.existsSync(p)){console.error(`[FAIL] ${label}: ${p}`);missing.push(label);failed=true;return false}return true}
for(const [route,file] of Object.entries(routes)){const p=path.join(SITE,file);if(exists(p,`canonical:${route}`)){const text=fs.readFileSync(p,'utf8');for(const m of text.matchAll(/\/assets\/([^'"?\\)\s>]+)/gi)){const rel=m[1];refs.push(`${route}:/${rel}`);if(!fs.existsSync(path.join(ASSETS,rel))){console.error(`[FAIL] ${route}: missing asset /assets/${rel}`);missing.push(`${route}:/${rel}`);failed=true}}for(const u of text.matchAll(/https?:\/\//gi)){}if(/images\.unsplash\.com/i.test(text)){console.error(`[WARN] ${route}: external Unsplash reference`);external.push(route)}}}
const server=path.join(COMPANY,'src/server.js');exists(server,'canonical runtime');if(fs.existsSync(server)){const s=fs.readFileSync(server,'utf8');if(/ЭТАЛОН-02|hook\.js|bootstrap/i.test(s)){console.error('[FAIL] canonical runtime still references legacy Etalon2/hooks/bootstrap');legacy.push('src/server.js');failed=true}if(!s.includes("0.0.0.0")){console.error('[FAIL] canonical runtime is not explicitly bound to 0.0.0.0');failed=true}}
const pkg=path.join(ROOT,'package.json');if(exists(pkg,'package.json')){const p=JSON.parse(fs.readFileSync(pkg,'utf8'));if(p.scripts?.start!=='node server.js'){console.error(`[FAIL] package start is ${p.scripts?.start}`);failed=true}}
const bootstrap=path.join(ROOT,'assets-server-bootstrap.js');if(fs.existsSync(bootstrap))console.log('[INFO] historical bootstrap file exists but is not expected to be used by npm start');
console.log(`[SUMMARY] routes=${Object.keys(routes).length} missing=${missing.length} legacy-runtime=${legacy.length} external-media=${external.length} local-asset-refs=${refs.length}`);
process.exitCode=failed?1:0;
