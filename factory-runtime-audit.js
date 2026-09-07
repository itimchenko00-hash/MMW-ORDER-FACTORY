const fs=require('fs');
const path=require('path');
const ROOT=__dirname;
const SRC=path.join(ROOT,'ЭТАЛОН-02/MMW-COMPANY/src');
const PROJECTS=path.join(ROOT,'ЭТАЛОН-02/MMW-COMPANY/projects');
const ASSETS=path.join(ROOT,'ASSETS');
const pages={
  'MMW-COMPANY':path.join(ROOT,'ЭТАЛОН-02/MMW-COMPANY/company/website/mmw-company-interactive-v11.html'),
  'ALADIN':path.join(PROJECTS,'ALADIN/website/aladin-presentation-suite.html'),
  'ALADIN-FINANCE':path.join(PROJECTS,'ALADIN/website/aladin-financial-system-v1.html'),
  'NEXUS-WORK':path.join(PROJECTS,'NEXUS-WORK/website/nexus-work-presentation-suite.html'),
  'NEXUS-LOGISTICS':path.join(PROJECTS,'NEXUS-WORK/website/nexus-work-presentation-suite.html'),
  'CARPATHIA':path.join(PROJECTS,'CARPATHIA/website/carpathia-compact.html'),
  'AGROHUB':path.join(PROJECTS,'AGROHUB/website/agrohub-compact.html'),
  'ENERGY-PARK':path.join(PROJECTS,'ENERGY-PARK/website/energy-compact.html')
};
// Correct NEXUS LOGISTICS path explicitly (kept separate to make ownership audit obvious).
pages['NEXUS-LOGISTICS']=path.join(PROJECTS,'NEXUS-LOGISTICS/website/nexus-logistics-presentation-v2.html');
const owner={...Object.fromEntries(Object.keys(pages).map(k=>[k,k])),'ALADIN-FINANCE':'ALADIN'};
const activeHooks=['final-cleanup-hook.js','products-cart-hook.js','order-catalog-hook.js','company-ui-hook.js','labels-cleanup-hook.js','unified-process-system-hook.js','language-switcher-hook.js','aladin-investor-owner-engine-hook.js','nexus-work-catalog-photo-hook.js','nexus-work-unified-hook.js','agrohub-catalog-hook.js','energy-catalog-hook.js','nexus-logistics-catalog-hook.js'];
let failures=0,warnings=0;
const fail=m=>{console.error(`[FAIL] ${m}`);failures++};const warn=m=>{console.warn(`[WARN] ${m}`);warnings++};const ok=m=>console.log(`[OK] ${m}`);
function read(file){return fs.existsSync(file)?fs.readFileSync(file,'utf8'):''} function assetRefs(text){return [...text.matchAll(/\/assets\/([^'"?\\)\s>]+)/gi)].map(m=>m[1])} function duplicateIds(html){const ids=[...html.matchAll(/\bid=["']([^"']+)["']/gi)].map(m=>m[1]);return [...new Set(ids.filter((id,i)=>ids.indexOf(id)!==i))]}
function walk(dir){if(!fs.existsSync(dir))return[];return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]).filter(f=>/\.(js|html|css)$/i.test(f))}
const bootstrap=read(path.join(ROOT,'assets-server-bootstrap.js'));const rootServer=read(path.join(ROOT,'server.js'));
if(!bootstrap)fail('assets-server-bootstrap.js missing');if(!rootServer)fail('root server.js missing');
for(const hook of activeHooks)if(!bootstrap.includes(`'${hook}'`))fail(`active hook missing from central loader: ${hook}`);
if(/require\(path\.join\(ROOT,'[^']+-hook\.js'\)\)/.test(rootServer))fail('root server.js still contains direct hook loading');else ok(`central hook loader declares ${activeHooks.length} active hooks`);
for(const [name,file] of Object.entries(pages)){const html=read(file);if(!html){fail(`missing canonical page: ${name}`);continue}const dup=duplicateIds(html);if(dup.length)warn(`${name}: duplicate DOM ids in source: ${dup.join(', ')}`);for(const rel of assetRefs(html)){if(!fs.existsSync(path.join(ASSETS,rel)))fail(`${name}: missing asset /assets/${rel}`);const top=rel.split('/')[0];if(top!==owner[name])fail(`${name}: cross-project asset /assets/${rel}`)}const unsplash=(html.match(/https:\/\/images\.unsplash\.com\//g)||[]).length;if(unsplash)warn(`${name}: ${unsplash} direct Unsplash reference(s) remain in canonical source`);ok(`${name}: source, ids and asset ownership checked`)}
const hookText=activeHooks.map(h=>read(path.join(SRC,h))).join('\n');for(const rel of assetRefs(hookText))if(!fs.existsSync(path.join(ASSETS,rel)))fail(`active hook missing asset /assets/${rel}`);if((rootServer.match(/require\([^\n]+hook\.js/g)||[]).length)fail('root server.js contains duplicate hook require(s)');
const aladin=read(path.join(PROJECTS,'ALADIN/website/aladin-investor-owner-engine.html'));if(aladin){for(const id of ['aoePrice','aoeSales','aoeBuildCost'])if(!new RegExp(`n\\('${id}'\\)`).test(aladin))fail(`ALADIN engine does not consume editable field ${id}`);if(/npv\(cash,18\)/.test(aladin))fail('ALADIN NPV still hardcodes 18%');if(!/Math\.pow\(1\+r,12\)-1/.test(aladin))warn('ALADIN IRR annualisation marker not found; manual review required');ok('ALADIN Financial Engine structural math contract checked')}else fail('ALADIN Financial Engine file missing');
const nexusText=walk(path.join(PROJECTS,'NEXUS-LOGISTICS')).map(read).join('\n');if(/2\.52M/.test(nexusText))fail('NEXUS LOGISTICS contains stale static 2.52M initial output');else ok('NEXUS LOGISTICS stale-value scan completed');
const runtime=read(path.join(SRC,'server.js'));for(const r of ['/aladin','/nexus-work','/nexus-logistics','/carpathia','/agrohub'])if(!runtime.includes(r))warn(`route token not found in server source: ${r}`);if(runtime.includes("'/energy'")&&!runtime.includes('/energy-park'))warn('ENERGY PARK currently exposes legacy /energy without canonical /energy-park alias');
for(const d of ['BACKUPS','CHECKPOINTS','PROJECTS','MMW-COMPANY','MMW-ORDER','ЭТАЛОН-02'])if(fs.existsSync(path.join(ROOT,d)))console.log(`[INVENTORY] ${d}: present; classify before deletion`);
console.log(`[SUMMARY] failures=${failures} warnings=${warnings} active-hooks=${activeHooks.length}`);process.exitCode=failures?1:0;
