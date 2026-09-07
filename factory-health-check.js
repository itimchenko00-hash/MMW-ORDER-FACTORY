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
let failed=false;
const seenExternal=[];
const missingAssets=[];
function inspect(name,file){
  if(!fs.existsSync(file)){console.error(`[FAIL] missing canonical page: ${name}`);failed=true;return ''}
  const html=fs.readFileSync(file,'utf8');
  const external=(html.match(/https:\/\/images\.unsplash\.com\//g)||[]).length;
  const refs=[...html.matchAll(/\/assets\/([^'"?\\)\s>]+)/gi)].map(m=>m[1]);
  console.log(`[PAGE] ${name}: local-assets=${refs.length} external-unsplash=${external}`);
  if(external){console.error(`[WARN] ${name}: runtime Unsplash references remain`);seenExternal.push(name)}
  for(const rel of refs){const target=path.join(ASSET_ROOT,rel);if(!fs.existsSync(target)){console.error(`[FAIL] ${name}: missing asset /assets/${rel}`);missingAssets.push(`${name}: /assets/${rel}`);failed=true}}
  return html;
}
for(const [name,file] of Object.entries(pages))inspect(name,file);
const srcRoot=path.join(ROOT,'ЭТАЛОН-02/MMW-COMPANY/src');
function walk(dir){if(!fs.existsSync(dir))return [];return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]).filter(f=>/\.(js|html|css)$/i.test(f))}
for(const file of walk(srcRoot)){
  const text=fs.readFileSync(file,'utf8');
  const external=(text.match(/https:\/\/images\.unsplash\.com\//g)||[]).length;
  if(external){const rel=path.relative(ROOT,file);console.error(`[WARN] source ${rel}: Unsplash references=${external}`);seenExternal.push(rel)}
  for(const rel of [...text.matchAll(/\/assets\/([^'"?\\)\s>]+)/gi)].map(m=>m[1])){if(!fs.existsSync(path.join(ASSET_ROOT,rel))){console.error(`[FAIL] source ${path.relative(ROOT,file)}: missing asset /assets/${rel}`);missingAssets.push(`${path.relative(ROOT,file)}: /assets/${rel}`);failed=true}}
}
const catalog=path.join(ROOT,'ЭТАЛОН-02/MMW-COMPANY/src/nexus-logistics-catalog-hook.js');
if(fs.existsSync(catalog)){
  const text=fs.readFileSync(catalog,'utf8');
  const imgs=[...text.matchAll(/\/assets\/NEXUS-LOGISTICS\/photos\/([^'"?]+)\.jpg/g)].map(m=>m[1]);
  const dup=imgs.filter((x,i)=>imgs.indexOf(x)!==i);
  console.log(`[CATALOG] NEXUS LOGISTICS images=${imgs.length} duplicates=${dup.length}`);
  if(dup.length){console.error(`[FAIL] duplicate catalog images: ${[...new Set(dup)].join(', ')}`);failed=true}
}
console.log(`[SUMMARY] external-unsplash-findings=${seenExternal.length} missing-assets=${missingAssets.length}`);
process.exitCode=failed?1:0;
