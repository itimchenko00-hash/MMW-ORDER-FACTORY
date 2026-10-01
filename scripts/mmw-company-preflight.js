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
 const factoryMap={};
 for(const m of source.matchAll(/(\\w+):"(\\/ASSETS\\/MMW-COMPANY\\/photos\\/[^"]+)"/g)) factoryMap[m[1]]=m[2];
 const media=[];
 for(const m of av.matchAll(/"([^"]+)":\\[(FACTORY_MEDIA\\.(\\w+)|"([^"]+)")/g)) media.push([m[1],m[2].startsWith("FACTORY_MEDIA.")?factoryMap[m[3]]:m[4]]);
 for(const m of av.matchAll(/data-title="([^"]+)" data-photo="([^"]+)"/g)) media.push(["FLOW:"+m[1],m[2]]);
 const used={};
 for(const [label,file] of media){
   if(!file) bad("ALADIN media missing for: "+label);
   else {
     (used[file]??=[]).push(label);
     if(file.startsWith("/ASSETS/")){
       const rel=file.replace(/^\\/ASSETS\\//,"ASSETS/");
       if(!fs.existsSync(path.join(root,rel))) bad("Missing ALADIN media asset: "+file);
     }
   }
 }
 for(const [file,labels] of Object.entries(used)) if(labels.length>1) bad("ALADIN duplicate media: "+file+" -> "+labels.join(", "));
 if(!av.includes("window.projectView=projectView")) bad("ALADIN renderer is not exported to window.projectView");
 if(!av.includes("aladin-interactive-card")) bad("ALADIN interactive cards missing");
 if(!av.includes("aladin-flow-node")) bad("ALADIN economics flow missing");
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
