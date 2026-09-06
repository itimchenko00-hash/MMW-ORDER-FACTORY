// MMW-COMPANY / FACTORY CONSTITUTION
// Highest-level runtime governance for every project served by the Factory.
// Principle: one request -> one project -> one authorized mutation scope.
const PROJECTS=Object.freeze({
  '/':'MMW-COMPANY',
  '/aladin':'ALADIN',
  '/finance':'ALADIN-FINANCE',
  '/nexus-work':'NEXUS-WORK',
  '/nexus-logistics':'NEXUS-LOGISTICS',
  '/carpathia':'CARPATHIA',
  '/agrohub':'AGROHUB',
  '/energy-park':'ENERGY-PARK'
});

function normalize(pathname){
  const p=String(pathname||'/').split('?')[0].replace(/\/$/,'')||'/';
  return p;
}
function projectFor(pathname){
  const p=normalize(pathname);
  return PROJECTS[p]||null;
}
function assertProject(req,project,operation='mutation'){
  const actual=projectFor(req?.path||req?.originalUrl||'/');
  if(!actual)throw new Error(`[CONSTITUTION] Unknown project route: ${req?.path||req?.originalUrl}`);
  if(actual!==project)throw new Error(`[CONSTITUTION] DENIED ${operation}: ${project} cannot mutate ${actual}`);
  return true;
}
function policy(req){
  const route=normalize(req?.path||req?.originalUrl||'/');
  return Object.freeze({route,project:projectFor(route),allowed:true});
}

function install(app){
  if(!app||app.__mmwConstitutionInstalled)return;
  app.__mmwConstitutionInstalled=true;
  app.use((req,res,next)=>{
    const p=policy(req);
    if(!p.project){
      res.status(404).set('X-MMW-Constitution','DENY').send('CONSTITUTION: unknown project route');
      return;
    }
    req.mmwConstitution=p;
    res.set('X-MMW-Constitution','ACTIVE');
    res.set('X-MMW-Project',p.project);
    next();
  });
}

module.exports=Object.freeze({PROJECTS,normalize,projectFor,assertProject,policy,install});
