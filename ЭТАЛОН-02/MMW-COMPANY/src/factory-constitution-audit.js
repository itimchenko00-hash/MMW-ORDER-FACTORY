// MMW-COMPANY / FACTORY CONSTITUTION
// NON-INVASIVE: audit only. Never rewrites project files or patches runtime APIs.
const fs=require('fs');
const path=require('path');
const crypto=require('crypto');
const ROOT=path.join(__dirname,'..');
const MANIFEST=path.join(__dirname,'..','..','..','FACTORY-CONSTITUTION-MANIFEST-2026-09-06.json');

function sha256(file){return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')}
function audit(){
  const manifest=JSON.parse(fs.readFileSync(MANIFEST,'utf8'));
  const routes=manifest.routes||{};
  const result={constitution:manifest.constitution,version:manifest.version,baseline:manifest.baseline,mode:manifest.mode,protected:manifest.protected||[],routes:{},violations:[]};
  for(const [route,project] of Object.entries(routes)) result.routes[route]={project};
  const canonical={
    'MMW-COMPANY':'company/website/mmw-company-interactive-v11.html',
    'ALADIN':'projects/ALADIN/website/aladin-presentation-suite.html',
    'ALADIN-FINANCE':'projects/ALADIN/website/aladin-financial-system-v1.html',
    'NEXUS-WORK':'projects/NEXUS-WORK/website/nexus-work-presentation-suite.html',
    'NEXUS-LOGISTICS':'projects/NEXUS-LOGISTICS/website/nexus-logistics-presentation-v2.html',
    'CARPATHIA':'projects/CARPATHIA/website/carpathia-compact.html',
    'AGROHUB':'projects/AGROHUB/website/agrohub-compact.html',
    'ENERGY-PARK':'projects/ENERGY-PARK/website/energy-compact.html'
  };
  for(const [project,relative] of Object.entries(canonical)){
    const file=path.join(ROOT,relative);
    if(!fs.existsSync(file)){result.violations.push({type:'MISSING_CANONICAL_FILE',project,file:relative});continue}
    result.routes[Object.entries(routes).find(([,p])=>p===project)?.[0]||project].canonical={path:relative,bytes:fs.statSync(file).size,sha256:sha256(file)};
  }
  result.ok=result.violations.length===0;
  return result;
}

if(require.main===module) console.log(JSON.stringify(audit(),null,2));
module.exports={audit};
