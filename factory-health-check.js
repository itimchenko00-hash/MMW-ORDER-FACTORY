const fs=require('fs');const path=require('path');
const ROOT=__dirname;
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
for(const [name,file] of Object.entries(pages)){
  if(!fs.existsSync(file)){console.error(`[FAIL] missing canonical page: ${name}`);failed=true;continue}
  const html=fs.readFileSync(file,'utf8');
  const external=(html.match(/https:\/\/images\.unsplash\.com\//g)||[]).length;
  const local=(html.match(/\/assets\//g)||[]).length;
  console.log(`[PAGE] ${name}: local-assets=${local} external-unsplash=${external}`);
  if(external) console.error(`[WARN] ${name}: runtime Unsplash references remain`);
}
const catalog=path.join(ROOT,'ЭТАЛОН-02/MMW-COMPANY/src/nexus-logistics-catalog-hook.js');
if(fs.existsSync(catalog)){
  const text=fs.readFileSync(catalog,'utf8');
  const imgs=[...text.matchAll(/\/assets\/NEXUS-LOGISTICS\/photos\/([^'"?]+)\.jpg/g)].map(m=>m[1]);
  const dup=imgs.filter((x,i)=>imgs.indexOf(x)!==i);
  console.log(`[CATALOG] NEXUS LOGISTICS images=${imgs.length} duplicates=${dup.length}`);
  if(dup.length){console.error(`[FAIL] duplicate catalog images: ${[...new Set(dup)].join(', ')}`);failed=true;}
}
process.exitCode=failed?1:0;
