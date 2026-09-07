const fs=require('fs');
const path=require('path');
const ROOT=__dirname;
const PROJECT_ROOT=path.join(ROOT,'ЭТАЛОН-02/MMW-COMPANY/projects');
const ASSET_ROOT=path.join(ROOT,'ASSETS');
const CANONICAL={
 'MMW-COMPANY':'ЭТАЛОН-02/MMW-COMPANY/company/website/mmw-company-interactive-v11.html',
 'ALADIN':'ЭТАЛОН-02/MMW-COMPANY/projects/ALADIN/website/aladin-presentation-suite.html',
 'ALADIN-FINANCE':'ЭТАЛОН-02/MMW-COMPANY/projects/ALADIN/website/aladin-financial-system-v1.html',
 'NEXUS-WORK':'ЭТАЛОН-02/MMW-COMPANY/projects/NEXUS-WORK/website/nexus-work-presentation-suite.html',
 'NEXUS-LOGISTICS':'ЭТАЛОН-02/MMW-COMPANY/projects/NEXUS-LOGISTICS/website/nexus-logistics-presentation-v2.html',
 'CARPATHIA':'ЭТАЛОН-02/MMW-COMPANY/projects/CARPATHIA/website/carpathia-compact.html',
 'AGROHUB':'ЭТАЛОН-02/MMW-COMPANY/projects/AGROHUB/website/agrohub-compact.html',
 'ENERGY-PARK':'ЭТАЛОН-02/MMW-COMPANY/projects/ENERGY-PARK/website/energy-compact.html'
};
const exts=/\.(js|html|css|json)$/i;
function walk(dir){if(!fs.existsSync(dir))return [];return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{const p=path.join(dir,e.name);return e.isDirectory()?walk(p):exts.test(e.name)?[p]:[]});}
function textFiles(){return walk(path.join(ROOT,'ЭТАЛОН-02/MMW-COMPANY'));}
function assetFiles(){return walk(ASSET_ROOT);}
const allSources=textFiles();
const pages=[];
const external=[];
const missing=[];
const localRefs=[];
for(const [name,rel] of Object.entries(CANONICAL)){
 const file=path.join(ROOT,rel);
 if(!fs.existsSync(file)){missing.push(`canonical:${name}:${rel}`);continue;}
 const text=fs.readFileSync(file,'utf8');
 const ext=(text.match(/https?:\/\/images\.unsplash\.com\//g)||[]).length;
 const refs=[...text.matchAll(/\/assets\/([^'"?\\)\s>]+)/gi)].map(m=>m[1]);
 pages.push({name,local:refs.length,external:ext});
 refs.forEach(r=>{localRefs.push(`${name}:/${r}`);if(!fs.existsSync(path.join(ASSET_ROOT,r)))missing.push(`${name}:/${r}`)});
 if(ext)external.push(`${name}: ${ext}`);
}
for(const file of allSources){
 const text=fs.readFileSync(file,'utf8');
 const ext=(text.match(/https?:\/\/images\.unsplash\.com\//g)||[]).length;
 if(ext)external.push(`${path.relative(ROOT,file)}: ${ext}`);
 for(const r of [...text.matchAll(/\/assets\/([^'"?\\)\s>]+)/gi)].map(m=>m[1])){
  if(!fs.existsSync(path.join(ASSET_ROOT,r)))missing.push(`${path.relative(ROOT,file)}:/${r}`);
 }
}
const assets=assetFiles().map(f=>path.relative(ASSET_ROOT,f));
const byBase=new Map();
for(const rel of assets){const base=path.basename(rel).toLowerCase();if(!byBase.has(base))byBase.set(base,[]);byBase.get(base).push(rel)}
const duplicateBasenames=[...byBase.entries()].filter(([,v])=>v.length>1);
const hookDir=path.join(ROOT,'ЭТАЛОН-02/MMW-COMPANY/src');
const hooks=fs.existsSync(hookDir)?fs.readdirSync(hookDir).filter(n=>/hook\.js$/i.test(n)):[];
const bootstrap=fs.readFileSync(path.join(ROOT,'assets-server-bootstrap.js'),'utf8');
const server=fs.existsSync(path.join(ROOT,'server.js'))?fs.readFileSync(path.join(ROOT,'server.js'),'utf8'):'';
const loadedHooks=hooks.filter(h=>bootstrap.includes(h)||server.includes(h));
const unprovenHooks=hooks.filter(h=>!loadedHooks.includes(h));
const projectDirs=fs.existsSync(PROJECT_ROOT)?fs.readdirSync(PROJECT_ROOT,{withFileTypes:true}).filter(e=>e.isDirectory()).map(e=>e.name).sort():[];
const assetProjects=fs.existsSync(ASSET_ROOT)?fs.readdirSync(ASSET_ROOT,{withFileTypes:true}).filter(e=>e.isDirectory()).map(e=>e.name).sort():[];
const sameNameAcrossProjects=[];
for(const [base,vals] of byBase){const owners=[...new Set(vals.map(v=>v.split(path.sep)[0]))];if(owners.length>1)sameNameAcrossProjects.push({base,owners,files:vals});}
const report={generated:new Date().toISOString(),projects:{canonical:Object.keys(CANONICAL),physical:projectDirs,assetNamespaces:assetProjects},pages,external,missing,hookInventory:{all:hooks,loaded:loadedHooks,unproven:unprovenHooks},assetCollisions:{duplicateBasenames,sameNameAcrossProjects},counts:{assetFiles:assets.length,localRefs:localRefs.length,externalFindings:external.length,missingAssets:missing.length,duplicateBasenames:duplicateBasenames.length,crossProjectSameNames:sameNameAcrossProjects.length}};
console.log(JSON.stringify(report,null,2));
console.log('\n=== CROSS-PROJECT AUDIT ===');
console.log(`projects=${report.projects.canonical.length} canonical; physical=${projectDirs.length}; asset-namespaces=${assetProjects.length}`);
console.log(`assets=${assets.length}; local-refs=${localRefs.length}; missing=${missing.length}; external-unsplash-findings=${external.length}`);
console.log(`hooks=${hooks.length}; loaded=${loadedHooks.length}; unproven=${unprovenHooks.length}`);
console.log(`duplicate-basenames=${duplicateBasenames.length}; cross-project-same-names=${sameNameAcrossProjects.length}`);
if(missing.length)console.log('\n[MISSING]');missing.slice(0,100).forEach(x=>console.log(x));
if(external.length)console.log('\n[EXTERNAL MEDIA]');external.slice(0,100).forEach(x=>console.log(x));
if(unprovenHooks.length)console.log('\n[UNPROVEN HOOKS]');unprovenHooks.forEach(x=>console.log(x));
if(sameNameAcrossProjects.length)console.log('\n[CROSS-PROJECT ASSET NAME REUSE]');sameNameAcrossProjects.slice(0,100).forEach(x=>console.log(`${x.base} :: ${x.owners.join(', ')} :: ${x.files.join(' | ')}`));
process.exitCode=0;
