const fs=require('fs');const path=require('path');
const ROOT=__dirname;
const ASSET_ROOT=path.join(ROOT,'ASSETS');
const pages={
  'MMW-COMPANY':path.join(ROOT,'ЭТАЛОН-02/MMW-COMPANY/company/website/mmw-company-interactive-v11.html'),
  'ALADIN':path.join(ROOT,'ЭТАЛОН-02/MMW-COMPANY/projects/ALADIN/website/aladin-presentation-suite.html'),
  'ALADIN-FINANCE':path.join(ROOT,'ЭТАЛОН-02/MMW-COMPANY/projects/ALADIN/website/aladin-financial-system-v1.html'),
  'NEXUS-WORK':path.join(ROOT,'ЭТАЛОН-02/MMW-COMPANY/projects/NEXUS-WORK/website/nexus-work-presentation-suite.html'),
  'NEXUS-LOGISTICS':path.join(ROOT,'ЭТАЛОН-02/MMW-COMPANY/projects/NEXUS-LOGISTICS/website/nexus-logistics-presentation-v2.html'),
  'CARPATHIA':path.join(ROOT,'ЭТАЛОН-02/MMW-COMPANY/projects/CARPATHIA/website/carpathia-compact.html'),
  'AGROHUB':path.join(ROOT,'ЭТАЛОН-02/MMW-COMPANY/projects/AGROHUB/website/agrohub-compact.html'),
  'ENERGY-PARK':path.join(ROOT,'ЭТАЛОН-02/MMW-COMPANY/projects/ENERGY-PARK/website/energy-compact.html')
};
const projectRoots={'MMW-COMPANY':'MMW-COMPANY','ALADIN':'ALADIN','ALADIN-FINANCE':'ALADIN','NEXUS-WORK':'NEXUS-WORK','NEXUS-LOGISTICS':'NEXUS-LOGISTICS','CARPATHIA':'CARPATHIA','AGROHUB':'AGROHUB','ENERGY-PARK':'ENERGY-PARK'};
let failed=false;const seenExternal=[];const missingAssets=[];const crossProject=[];
function assetRefs(text){return [...text.matchAll(/\/assets\/([^'"?\\)\s>]+)/gi)].map(m=>m[1])}
function checkOwnedAssets(owner,label,text){for(const rel of assetRefs(text)){const top=rel.split('/')[0];if(projectRoots[owner]&&top!==projectRoots[owner]){const msg=`${label}: cross-project asset /assets/${rel} (owner=${owner})`;console.error(`[FAIL] ${msg}`);crossProject.push(msg);failed=true}}}
function inspect(name,file){
 if(!fs.existsSync(file)){console.error(`[FAIL] missing canonical page: ${name}`);failed=true;return ''}
 const html=fs.readFileSync(file,'utf8');const external=(html.match(/https:\/\/images\.unsplash\.com\//g)||[]).length;const refs=assetRefs(html);
 console.log(`[PAGE] ${name}: local-assets=${refs.length} external-unsplash=${external}`);
 if(external){console.error(`[WARN] ${name}: runtime Unsplash references remain`);seenExternal.push(name)}
 for(const rel of refs){if(!fs.existsSync(path.join(ASSET_ROOT,rel))){console.error(`[FAIL] ${name}: missing asset /assets/${rel}`);missingAssets.push(`${name}: /assets/${rel}`);failed=true}}
 checkOwnedAssets(projectRoots[name],name,html);return html;
}
for(const [name,file] of Object.entries(pages))inspect(name,file);
const srcRoot=path.join(ROOT,'ЭТАЛОН-02/MMW-COMPANY/src');
function walk(dir){if(!fs.existsSync(dir))return [];return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]).filter(f=>/\.(js|html|css)$/i.test(f))}
for(const file of walk(srcRoot)){
 const text=fs.readFileSync(file,'utf8');const relFile=path.relative(ROOT,file);const external=(text.match(/https:\/\/images\.unsplash\.com\//g)||[]).length;
 if(external){console.error(`[WARN] source ${relFile}: Unsplash references=${external}`);seenExternal.push(relFile)}
 for(const rel of assetRefs(text)){if(!fs.existsSync(path.join(ASSET_ROOT,rel))){console.error(`[FAIL] source ${relFile}: missing asset /assets/${rel}`);missingAssets.push(`${relFile}: /assets/${rel}`);failed=true}}
 let owner='MMW-COMPANY';const m=relFile.match(/projects\/([^/]+)/);if(m)owner=m[1];checkOwnedAssets(owner,relFile,text);
}
const catalog=path.join(ROOT,'ЭТАЛОН-02/MMW-COMPANY/src/nexus-logistics-catalog-hook.js');
if(fs.existsSync(catalog)){const text=fs.readFileSync(catalog,'utf8');const imgs=[...text.matchAll(/\/assets\/NEXUS-LOGISTICS\/photos\/([^'"?]+)\.(?:jpg|jpeg|png|svg)/gi)].map(m=>m[1]);const dup=imgs.filter((x,i)=>imgs.indexOf(x)!==i);console.log(`[CATALOG] NEXUS LOGISTICS images=${imgs.length} duplicates=${dup.length}`);if(dup.length){console.error(`[FAIL] duplicate catalog images: ${[...new Set(dup)].join(', ')}`);failed=true}}
console.log(`[SUMMARY] external-unsplash-findings=${seenExternal.length} missing-assets=${missingAssets.length} cross-project-assets=${crossProject.length}`);
process.exitCode=failed?1:0;
