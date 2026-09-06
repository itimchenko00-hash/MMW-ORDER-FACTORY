// MMW FACTORY CONSTITUTION — non-invasive audit
// This module inspects ownership only. It must never rewrite project content.
const fs=require('fs');
const path=require('path');
const crypto=require('crypto');
const manifest=require(path.join(__dirname,'../../../FACTORY-CONSTITUTION-MANIFEST-2026-09-06.json'));
const ROOT=path.join(__dirname,'..');
function sha256(file){return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')}
function audit(){
  const routes=new Set(), ids=new Set(), report=[];
  for(const p of manifest.projects){
    if(routes.has(p.route))throw new Error(`CONSTITUTION duplicate route: ${p.route}`);
    if(ids.has(p.id))throw new Error(`CONSTITUTION duplicate project: ${p.id}`);
    routes.add(p.route); ids.add(p.id);
    const file=path.join(ROOT,p.canonical.replace('ЭТАЛОН-02/MMW-COMPANY/',''));
    if(!fs.existsSync(file))throw new Error(`CONSTITUTION missing canonical file: ${p.id} -> ${p.canonical}`);
    report.push({id:p.id,route:p.route,canonical:p.canonical,sha256:sha256(file),bytes:fs.statSync(file).size});
  }
  return {ok:true,mode:manifest.mode,productionBaseline:manifest.productionBaseline,diagnosticBaseline:manifest.diagnosticBaseline,projects:report};
}
if(require.main===module){console.log(JSON.stringify(audit(),null,2))}
module.exports={audit};
