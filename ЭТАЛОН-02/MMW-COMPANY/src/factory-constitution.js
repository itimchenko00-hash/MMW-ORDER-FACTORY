// MMW-COMPANY / FACTORY CONSTITUTION
const express=require('express');
const fs=require('fs');
const {AsyncLocalStorage}=require('async_hooks');
const PROJECTS=Object.freeze({'/':'MMW-COMPANY','/aladin':'ALADIN','/finance':'ALADIN-FINANCE','/nexus-work':'NEXUS-WORK','/nexus-logistics':'NEXUS-LOGISTICS','/carpathia':'CARPATHIA','/agrohub':'AGROHUB','/energy-park':'ENERGY-PARK','/nexus-work-media':'NEXUS-WORK','/api/market':'NEXUS-WORK'});
const FILE_PROJECTS=Object.freeze([['projects/ALADIN/','ALADIN'],['projects/NEXUS-WORK/','NEXUS-WORK'],['projects/NEXUS-LOGISTICS/','NEXUS-LOGISTICS'],['projects/CARPATHIA/','CARPATHIA'],['projects/AGROHUB/','AGROHUB'],['projects/ENERGY-PARK/','ENERGY-PARK'],['company/website/','MMW-COMPANY']]);
const storage=new AsyncLocalStorage();
function normalize(pathname){return String(pathname||'/').split('?')[0].replace(/\/$/,'')||'/'}
function projectFor(pathname){const route=normalize(pathname);if(PROJECTS[route])return PROJECTS[route];for(const key of Object.keys(PROJECTS)){if(key!=='/'&&route.startsWith(key+'/'))return PROJECTS[key]}return null}
function assertProject(req,project,operation='mutation'){const actual=projectFor(req?.path||req?.originalUrl||'/');if(!actual)throw new Error(`[CONSTITUTION] Unknown project route`);if(actual!==project)throw new Error(`[CONSTITUTION] DENIED ${operation}: ${project} cannot mutate ${actual}`);return true}
function policy(req){const route=normalize(req?.path||req?.originalUrl||'/');const project=projectFor(route);return Object.freeze({route,project,allowed:Boolean(project)})}
function fileProject(file){const f=String(file||'').replace(/\\/g,'/');const hit=FILE_PROJECTS.find(([prefix])=>f.includes(prefix));return hit?hit[1]:null}
function deny(message){const e=new Error(`[CONSTITUTION] DENIED: ${message}`);e.code='MMW_CONSTITUTION_DENY';throw e}
function middleware(req,res,next){const p=policy(req);if(!p.project){res.status(404).set('X-MMW-Constitution','DENY').send('CONSTITUTION: unknown project route');return}req.mmwConstitution=p;res.set('X-MMW-Constitution','ACTIVE');res.set('X-MMW-Project',p.project);storage.run({project:p.project,route:p.route},next)}
if(!fs.__mmwConstitutionFsPatched){const originalRead=fs.readFileSync;fs.readFileSync=function(file,...args){const ctx=storage.getStore();const target=fileProject(file);if(ctx&&target&&ctx.project!==target)deny(`${ctx.project} attempted to read ${target} file`);return originalRead.call(this,file,...args)};fs.__mmwConstitutionFsPatched=true}
if(!express.response.__mmwConstitutionSendFilePatched){const originalSendFile=express.response.sendFile;express.response.sendFile=function(file,...args){const ctx=storage.getStore();const target=fileProject(file);if(ctx&&target&&ctx.project!==target)deny(`${ctx.project} attempted to send ${target} file`);return originalSendFile.call(this,file,...args)};express.response.__mmwConstitutionSendFilePatched=true}
if(!express.application.__mmwConstitutionPatched){const originalUse=express.application.use;express.application.use=function(...args){if(!this.__mmwConstitutionInstalled){this.__mmwConstitutionInstalled=true;originalUse.call(this,middleware)}return originalUse.apply(this,args)};express.application.__mmwConstitutionPatched=true}
module.exports=Object.freeze({PROJECTS,normalize,projectFor,assertProject,policy,fileProject,deny,middleware});
