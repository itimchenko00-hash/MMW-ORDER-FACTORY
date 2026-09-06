// MMW-COMPANY / FACTORY CONSTITUTION
// Highest-level runtime governance for every project served by the Factory.
// Principle: one request -> one project -> one authorized mutation scope.
const express=require('express');
const PROJECTS=Object.freeze({'/':'MMW-COMPANY','/aladin':'ALADIN','/finance':'ALADIN-FINANCE','/nexus-work':'NEXUS-WORK','/nexus-logistics':'NEXUS-LOGISTICS','/carpathia':'CARPATHIA','/agrohub':'AGROHUB','/energy-park':'ENERGY-PARK'});
function normalize(pathname){return String(pathname||'/').split('?')[0].replace(/\/$/,'')||'/'}
function projectFor(pathname){return PROJECTS[normalize(pathname)]||null}
function assertProject(req,project,operation='mutation'){
  const actual=projectFor(req?.path||req?.originalUrl||'/');
  if(!actual)throw new Error(`[CONSTITUTION] Unknown project route: ${req?.path||req?.originalUrl}`);
  if(actual!==project)throw new Error(`[CONSTITUTION] DENIED ${operation}: ${project} cannot mutate ${actual}`);
  return true;
}
function policy(req){const route=normalize(req?.path||req?.originalUrl||'/');const project=projectFor(route);return Object.freeze({route,project,allowed:Boolean(project)})}
function middleware(req,res,next){const p=policy(req);if(!p.project){res.status(404).set('X-MMW-Constitution','DENY').send('CONSTITUTION: unknown project route');return}req.mmwConstitution=p;res.set('X-MMW-Constitution','ACTIVE');res.set('X-MMW-Project',p.project);next()}
// Automatic installation: every Factory Express app receives Constitution middleware before its own middleware.
if(!express.application.__mmwConstitutionPatched){
  const originalUse=express.application.use;
  express.application.use=function(...args){
    if(!this.__mmwConstitutionInstalled){this.__mmwConstitutionInstalled=true;originalUse.call(this,middleware)}
    return originalUse.apply(this,args);
  };
  express.application.__mmwConstitutionPatched=true;
}
module.exports=Object.freeze({PROJECTS,normalize,projectFor,assertProject,policy,middleware});
