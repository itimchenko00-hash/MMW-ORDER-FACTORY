const http=require("node:http"),fs=require("node:fs"),path=require("node:path"),{URL}=require("node:url"),{execFileSync}=require("node:child_process");
const root=__dirname,publicRoot=path.join(root,"MMW-COMPANY","2 — WORKING","public"),port=Number(process.env.PORT)||10000;
const mime={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".svg":"image/svg+xml",".jpg":"image/jpeg",".jpeg":"image/jpeg",".png":"image/png",".webp":"image/webp",".json":"application/json; charset=utf-8",".ico":"image/x-icon",".txt":"text/plain; charset=utf-8",".xml":"application/xml; charset=utf-8"};
const safe=(base,rel)=>{const b=path.resolve(base),p=path.resolve(base,rel);return p===b||p.startsWith(b+path.sep)?p:null};

const catalogMedia=[
 ["01-project-audit.jpg","7947657","https://www.pexels.com/photo/black-magnifying-glass-on-the-table-7947657/"],
 ["02-project-concept.jpg","33175651","https://www.pexels.com/photo/financial-analysis-with-calculator-and-documents-33175651/"],
 ["03-business-project.jpg","9034211","https://www.pexels.com/photo/man-doing-a-presentation-beside-a-woman-9034211/"],
 ["04-investment-project.jpg","20142114","https://www.pexels.com/photo/financial-report-data-presentation-expense-and-cost-calculations-20142114/"],
 ["05-business-system.jpg","6804091","https://www.pexels.com/photo/project-manager-planning-tasks-6804091/"],
 ["06-business-restart.jpg","5324903","https://www.pexels.com/photo/colleagues-discussing-business-strategy-in-office-5324903/"],
 ["07-business-investor.jpg","8439701","https://www.pexels.com/photo/clients-consulting-an-accountant-8439701/"],
 ["08-custom-business-project.jpg","26966417","https://www.pexels.com/photo/coworking-office-space-with-pc-room-26966417/"],
 ["09-large-scale.jpg","33827307","https://www.pexels.com/photo/modern-office-interior-with-workstations-33827307/"],
 ["10-estimate.jpg","11427092","https://www.pexels.com/photo/man-working-on-a-construction-site-11427092/"],
 ["11-site-survey.jpg","7937329","https://www.pexels.com/photo/woman-in-suit-at-house-in-construction-7937329/"],
 ["12-docs.jpg","10376233","https://www.pexels.com/photo/businessman-working-with-documents-and-using-laptop-in-an-office-10376233/"],
 ["13-management.jpg","39219853","https://www.pexels.com/photo/professional-office-environment-with-teamwork-focus-39219853/"],
 ["14-urgent.jpg","29218404","https://www.pexels.com/photo/focus-on-time-in-office-meeting-setting-29218404/"],
 ["15-aladin-residence.jpg","7587880","https://www.pexels.com/photo/modern-house-exterior-7587880/"],
 ["16-carpathia-eco-lodge.jpg","33799052","https://www.pexels.com/photo/mountain-cabin-in-scenic-landscape-33799052/"],
 ["17-nexus-work.jpg","7854200","https://www.pexels.com/photo/minimalistic-contemporary-co-working-space-7854200/"],
 ["18-nexus-logistics.jpg","29786116","https://www.pexels.com/photo/warehouse-with-delivery-truck-exiting-the-loading-dock-29786116/"],
 ["19-agrohub.jpg","31929097","https://www.pexels.com/photo/farmer-in-a-green-agricultural-field-31929097/"],
 ["20-energy-park.jpg","27873672","https://www.pexels.com/photo/solar-panels-27873672/"]
];

function ensureCatalogMedia(){
 const dir=path.join(publicRoot,"ASSETS","MMW-COMPANY","catalog");
 fs.mkdirSync(dir,{recursive:true});
 const complete=catalogMedia.every(([f])=>fs.existsSync(path.join(dir,f))&&fs.statSync(path.join(dir,f)).size>1000);
 if(complete)return;
 const tmp=path.join(require("node:os").tmpdir(),"mmw-catalog-media");
 const zip=tmp+".zip";
 fs.rmSync(tmp,{recursive:true,force:true});fs.rmSync(zip,{force:true});fs.mkdirSync(tmp,{recursive:true});
 try{
  for(const [file,id] of catalogMedia){
   const out=path.join(tmp,file);
   const url="https://images.pexels.com/photos/"+id+"/pexels-photo-"+id+".jpeg?auto=compress&cs=tinysrgb&w=1800";
   execFileSync("curl",["-L","--fail","--retry","5","--retry-delay","2","--connect-timeout","20","--max-time","180","-A","Mozilla/5.0 MMW-COMPANY controlled media importer","-o",out,url],{stdio:"ignore"});
   if(!fs.existsSync(out)||fs.statSync(out).size<1000)throw new Error("Invalid media: "+file);
  }
  execFileSync("zip",["-q",zip,...fs.readdirSync(tmp).filter(f=>f.endsWith(".jpg"))],{cwd:tmp,stdio:"ignore"});
  fs.rmSync(dir,{recursive:true,force:true});fs.mkdirSync(dir,{recursive:true});
  execFileSync("unzip",["-q",zip,"-d",dir],{stdio:"ignore"});
  const sources=["# MMW-COMPANY catalog media provenance","","Controlled import: WEB SOURCE → CONTROLLED IMPORT → LOCAL FACTORY ASSET → SEMANTIC PLACEMENT → PROVENANCE → QA → LIVE","","All catalog photos are served locally from this directory. The browser does not load catalog photos from Pexels at runtime.","","| Asset | Source |","|---|---|",...catalogMedia.map(([f,,source])=>"| "+f+" | "+source+" |")].join("\n")+"\n";
  fs.writeFileSync(path.join(dir,"SOURCES.md"),sources);
  console.log("MMW-COMPANY catalog media: controlled local import completed ("+catalogMedia.length+" files)");
 }catch(e){
  console.error("MMW-COMPANY catalog media import failed:",e.message);
  fs.rmSync(dir,{recursive:true,force:true});
 }finally{fs.rmSync(tmp,{recursive:true,force:true});fs.rmSync(zip,{force:true});}
}

ensureCatalogMedia();

const server=http.createServer((req,res)=>{
 try{
  const u=new URL(req.url,"http://localhost"),p=u.pathname;
  if(p==="/healthz"){res.writeHead(200,{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"});return res.end(JSON.stringify({ok:true,service:"mmw-company-2",root:"MMW-COMPANY/2 — WORKING/public"}))}
  let rel=decodeURIComponent(p);if(rel==="/")rel="/index.html";
  const f=safe(publicRoot,rel.slice(1));
  if(f&&fs.existsSync(f)&&fs.statSync(f).isFile()){
   const ext=path.extname(f).toLowerCase();
   res.writeHead(200,{"Content-Type":mime[ext]||"application/octet-stream","Cache-Control":"no-cache"});
   return fs.createReadStream(f).pipe(res);
  }
  res.writeHead(404,{"Content-Type":"text/plain; charset=utf-8"});return res.end("Not found");
 }catch(e){console.error(e);res.writeHead(500,{"Content-Type":"text/plain; charset=utf-8"});return res.end("Server error")}
});
server.listen(port,"0.0.0.0",()=>console.log("MMW-COMPANY/2 "+port));
