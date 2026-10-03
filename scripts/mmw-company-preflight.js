const fs=require("fs");
const path=require("path");
const root=path.resolve(__dirname,"..");
const app=path.join(root,"public","app.js");
const source=fs.readFileSync(app,"utf8");
const assets=path.join(root,"ASSETS","MMW-COMPANY","photos");
const aladin=path.join(root,"ASSETS","ALADIN");
const fail=[];
function bad(msg){fail.push(msg)}
const modeMatch=source.match(/const PROJECT_PAGE_MODE="([^"]+)"/);
const PROJECT_PAGE_MODE=modeMatch?modeMatch[1]:"";
const refs=[...source.matchAll(/\/ASSETS\/MMW-COMPANY\/photos\/([^"'\\)]+)/g)].map(m=>m[1]);
if(!refs.length) bad("No local MMW-COMPANY Factory media references found");
for(const ref of refs){if(!fs.existsSync(path.join(assets,ref))) bad("Missing Factory asset: "+ref)}
try{new Function(source)}catch(e){bad("app.js syntax error: "+e.message)}
const aladinInfographics=["core-flow.svg","site-selection.svg","product-architecture.svg","energy-home.svg","market-audience.svg","investment-model.svg","team-ecosystem.svg","risk-control.svg","delivery-roadmap.svg"];
for(const file of aladinInfographics){if(!fs.existsSync(path.join(aladin,"infographics",file))) bad("Missing ALADIN infographic: "+file)}
const aladinPhotos=["photo-1500382017468-9049fed747ef-002b586210cb.jpg","photo-1503387762-592deb58ef4e-a53fab6cda3f.jpg","photo-1503387762-592deb58ef4e-ee9dea25d3ff.jpg","photo-1556912167-f556f1f39fdf-9716a32a85d9.jpg","photo-1560518883-ce09059eeffa-ed0295d3197c.jpg","photo-1600566753190-17f0baa2a6c3-63dc9b79017a.jpg","photo-1600585154340-be6161a56a0c-7295de861872.jpg","photo-1600585154526-990dced4db0d-02223b5ceb7c.jpg","photo-1600607687920-4e2a09cf159d-bf70bc3cf605.jpg"];
for(const file of aladinPhotos){if(!fs.existsSync(path.join(aladin,"photos",file))) bad("Missing ALADIN photo: "+file)}
const aladinView=path.join(root,"public","aladin-project-view.js");
if(!fs.existsSync(aladinView)) bad("Missing ALADIN project renderer");
else {
 const av=fs.readFileSync(aladinView,"utf8");
 try{new Function(av)}catch(e){bad("aladin-project-view.js syntax error: "+e.message)}
 const resolveFactory=(key)=>{
   const needle=key+':"';
   const i=source.indexOf(needle);
   if(i<0) return null;
   const s=i+needle.length;
   const e=source.indexOf('"',s);
   return e<0?null:source.slice(s,e);
 };
 const media=[];
 for(const line of av.split("\n")){
   if(line.includes('":[FACTORY_MEDIA.')){
     const titleEnd=line.indexOf('":[');
     const title=titleEnd>0?line.slice(1,titleEnd):line;
     const aliasStart=line.indexOf('FACTORY_MEDIA.')+"FACTORY_MEDIA.".length;
     let aliasEnd=aliasStart;
     while(aliasEnd<line.length && /[A-Za-z0-9_]/.test(line[aliasEnd])) aliasEnd++;
     media.push([title,resolveFactory(line.slice(aliasStart,aliasEnd))]);
   }
   if(line.includes('data-title="') && line.includes('data-photo="')){
     const t0=line.indexOf('data-title="')+12, t1=line.indexOf('"',t0);
     const p0=line.indexOf('data-photo="')+12, p1=line.indexOf('"',p0);
     media.push(["FLOW:"+line.slice(t0,t1),line.slice(p0,p1)]);
   }
 }
 const used={};
 for(const [label,file] of media){
   if(!file) bad("ALADIN media missing for: "+label);
   else {
     (used[file]??=[]).push(label);
     if(file.startsWith("/ASSETS/")){
       const rel=file.slice(1);
       if(!fs.existsSync(path.join(root,rel))) bad("Missing ALADIN media asset: "+file);
     }
   }
 }
 for(const [file,labels] of Object.entries(used)) if(labels.length>1) bad("ALADIN duplicate media: "+file+" -> "+labels.join(", "));
 if(!av.includes("window.projectView=projectView")) bad("ALADIN renderer is not exported to window.projectView");
 if(!av.includes("aladin-interactive-card")) bad("ALADIN interactive cards missing");
 if(!av.includes("aladin-flow-node")) bad("ALADIN economics flow missing");
}
// ALADIN interactive renderer: validate syntax, local media existence, section structure, and page-level media uniqueness.
const aladinViewPath=path.join(root,"public","aladin-project-view.js");
if(!fs.existsSync(aladinViewPath)) bad("Missing ALADIN interactive renderer: public/aladin-project-view.js");
else{
 const aladinView=fs.readFileSync(aladinViewPath,"utf8");
 try{new Function(aladinView)}catch(e){bad("aladin-project-view.js syntax error: "+e.message)}
 if(!aladinView.includes("window.projectView=projectView")) bad("ALADIN renderer is not attached to window.projectView");
 for(const section of ["overview","product","market","model","economics","team","risks","next"]){
  if(!aladinView.includes('id="'+section+'"')) bad("ALADIN section missing: "+section);
 }
 for(const legacy of ["aladin-section-visual","aladin-team-card","aladin-role-grid","aladin-card-media"]){
  if(aladinView.includes(legacy)) bad("Obsolete ALADIN visual class remains: "+legacy);
 }
 const factoryMap={};
 for(const m of source.matchAll(/([A-Za-z0-9_]+):"(\/ASSETS\/MMW-COMPANY\/photos\/[^"]+)"/g)) factoryMap[m[1]]=m[2];

 // Strict uniqueness applies to the 20 semantic card assignments in interactiveMeta.
 const metaStart=aladinView.indexOf("const interactiveMeta={");
 const metaEnd=aladinView.indexOf("\n};",metaStart);
 if(metaStart<0||metaEnd<0){bad("ALADIN interactiveMeta map missing");}
 else{
  const metaBlock=aladinView.slice(metaStart,metaEnd);
  const semanticMedia=[...metaBlock.matchAll(/\["([^"]+)",/g)].map(m=>m[1]);
  if(semanticMedia.length!==27) bad("ALADIN semantic/team media coverage must be exactly 27; found "+semanticMedia.length);
  if(new Set(semanticMedia).size!==semanticMedia.length) bad("ALADIN semantic card media contains duplicates");
  for(const mediaPath of semanticMedia){
   if(/^https:\/\/images\.unsplash\.com\//.test(mediaPath)) continue;
   const rel=mediaPath.replace(/^\/ASSETS\//,"");
   if(!fs.existsSync(path.join(root,"ASSETS",rel))) bad("Missing ALADIN semantic media asset: "+mediaPath);
  }
 }

 // Local ALADIN assets used by hero/flow remain protected and are only checked for existence.
 for(const m of aladinView.matchAll(/"(\/ASSETS\/ALADIN\/photos\/[^"]+)"/g)){
  const rel=m[1].replace(/^\/ASSETS\//,"");
  if(!fs.existsSync(path.join(root,"ASSETS",rel))) bad("Missing ALADIN support media asset: "+m[1]);
 }

}
const projectStart=source.indexOf("function projectView(p){");
const projectEnd=source.indexOf("\nfunction home()",projectStart);
const projectBody=source.slice(projectStart,projectEnd);
if(projectStart<0||projectEnd<0) bad("Missing projectView renderer");
if(!projectBody.includes("aladin-residence")) bad("ALADIN route missing from projectView");
if(PROJECT_PAGE_MODE!=="clean-commercial"){
 for(const file of ["product-architecture.svg","market-audience.svg","core-flow.svg","investment-model.svg","team-ecosystem.svg","risk-control.svg","delivery-roadmap.svg"]){
  if(!projectBody.includes(file)) bad("ALADIN renderer missing dedicated infographic: "+file);
 }
 if((projectBody.match(/mediaFigure\(media\[/g)||[]).length<3) bad("Project renderer lost photo assignments");
} else if(!projectBody.includes("aladin-residence")) bad("Clean ALADIN project renderer missing");
if(!source.includes('loading="lazy"')) bad("Native lazy-loaded image markup is missing");
const media=[...source.matchAll(/(?:COMPANY_MEDIA|FACTORY_MEDIA)\.([A-Za-z0-9_]+)/g)].map(m=>m[1]);
const duplicates=media.length-new Set(media).size;
if(duplicates>0) console.warn("Factory media references repeat across the full app; page-level uniqueness is checked separately.");
const pageNames=["home","companyPage","solutionsPage","systemPage","contactsPage"];
for(const name of pageNames){
 const start=source.indexOf("function "+name+"(");
 if(start<0){bad("Missing renderer: "+name);continue}
 const next=source.indexOf("\nfunction ",start+10);
 const body=source.slice(start,next<0?source.length:next);
 const refs=[...body.matchAll(/(?:COMPANY_MEDIA|FACTORY_MEDIA)\.([A-Za-z0-9_]+)/g)].map(m=>m[1]);
 if(!refs.length) bad(name+": no Factory media assignments");
 if(new Set(refs).size!==refs.length) bad(name+": duplicate Factory media assignment");
}
if(fail.length){console.error("MMW-COMPANY PREFLIGHT FAILED");fail.forEach(x=>console.error(" - "+x));process.exit(1)}
console.log("MMW-COMPANY PREFLIGHT OK");
console.log("Factory assets checked:",new Set(refs).size);
console.log("Media refs checked:",media.length);
console.log("ALADIN infographics checked:",aladinInfographics.length);
console.log("ALADIN photos checked:",aladinPhotos.length);

// CONSTITUTION STANDARD GATE
const standardPath=path.join(root,"PROJECTS","PROJECT-CREATION-STANDARD.md");
const mediaRegisterPath=path.join(root,"PROJECTS","FACTORY-MEDIA-COPY-REGISTER.md");
const visualStandardPath=path.join(root,"PROJECTS","project-visual-standard.json");
for(const required of [standardPath,mediaRegisterPath,visualStandardPath]){
 if(!fs.existsSync(required)) bad("Missing project standard file: "+path.relative(root,required));
}
if(fs.existsSync(visualStandardPath)){
 try{
  const visual=JSON.parse(fs.readFileSync(visualStandardPath,"utf8"));
  const requiredProjects=["aladin-residence","nexus-work","nexus-logistics","carpathia-eco-lodge","agrohub","energy-park"];
  for(const id of requiredProjects){
   const v=visual.projects&&visual.projects[id];
   if(!v||!Array.isArray(v.colors)||v.colors.length<2||!v.infographic||!v.effects||!v.cards) bad("Project visual standard incomplete: "+id);
  }
 }catch(e){bad("project-visual-standard.json invalid: "+e.message)}
}
if(fs.existsSync(standardPath)){
 const constitution=fs.readFileSync(standardPath,"utf8");
 for(const rule of ["FROZEN/CONSERVE/ARCHIVE","Replace canonical content","Factory Library","Future project gate"]) if(!constitution.includes(rule)) bad("Project standard missing rule: "+rule);
}

const appSource=fs.readFileSync(path.join(root,"public","app.js"),"utf8");
if((appSource.match(/data-project-card=/g)||[]).length<20) bad("Project card standard coverage is too low");
if((appSource.match(/bindProjectInteractions/g)||[]).length!==2) bad("Project interaction owner is duplicated or missing");
if(appSource.includes("project-detail-trigger")) bad("Legacy duplicate project interaction trigger remains");
const aladinSource=fs.readFileSync(path.join(root,"public","aladin-project-view.js"),"utf8");
if(!aladinSource.includes("project-page project-aladin-residence")) bad("ALADIN is not attached to the constitutional project identity layer");
if((aladinSource.match(/__mmwAladinInteractiveBound/g)||[]).length<2) bad("ALADIN interactive owner missing");
