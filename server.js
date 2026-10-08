const http=require("node:http"),fs=require("node:fs"),path=require("node:path"),{URL}=require("node:url");
const root=__dirname,port=Number(process.env.PORT)||10000;
const mime={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".svg":"image/svg+xml",".jpg":"image/jpeg",".jpeg":"image/jpeg",".png":"image/png",".webp":"image/webp",".json":"application/json; charset=utf-8",".ico":"image/x-icon"};
const safe=(base,rel)=>{const b=path.resolve(base),p=path.resolve(base,rel);return p===b||p.startsWith(b+path.sep)?p:null};
const existingFile=(candidates)=>{for(const [base,sub] of candidates){const f=safe(base,sub);if(f&&fs.existsSync(f)&&fs.statSync(f).isFile())return f}return null};
const server=http.createServer((req,res)=>{
 try{
  const u=new URL(req.url,"http://localhost"),p=u.pathname;
  if(p==="/healthz"){res.writeHead(200,{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"});return res.end(JSON.stringify({ok:true,service:"mmw-company"}))}\n  if(p==="/__energy-media-health"){const ep=path.join(root,"MMW-COMPANY","2 — WORKING","public","ASSETS","ENERGY-PARK","photos","web-selected");const files=["00-hero-energy-park.jpg","01-industrial-energy-site.jpg","02-grid-substation.jpg","03-industrial-solar.jpg","04-energy-storage.jpg","05-control-room.jpg","06-engineering-operator.jpg","07-energy-metering.jpg","08-industrial-grid.jpg","09-industrial-rooftops.jpg"].map(n=>{const f=path.join(ep,n);try{const b=fs.readFileSync(f);return {name:n,exists:true,size:b.length,magic:b.subarray(0,4).toString("hex")}}catch(e){return {name:n,exists:false,size:0,magic:""}}});res.writeHead(200,{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"});return res.end(JSON.stringify({root,files}))}
  let rel=decodeURIComponent(p);if(rel==="/")rel="/index.html";
  let f=null;
  // Deterministic active MMW-COMPANY/2 local media root.
  if(rel.startsWith("/ASSETS/CARPATHIA/")||rel.startsWith("/assets/CARPATHIA/")){
   const prefix=rel.startsWith("/assets/CARPATHIA/")?"/assets/CARPATHIA/":"/ASSETS/CARPATHIA/";
   const carRel=rel.slice(prefix.length);
   f=existingFile([[path.join(root,"MMW-COMPANY","2 — WORKING","public","ASSETS","CARPATHIA"),carRel]]);
  }
  if(!f && (rel.startsWith("/assets/")||rel.startsWith("/ASSETS/"))){
   const sub=rel.slice(rel.startsWith("/assets/")?"/assets/".length:"/ASSETS/".length);
   const parts=sub.split("/");
   if(!f && parts[0]==="ALADIN"){
    const aladinSub=parts.slice(1).join("/");
    const legacyGallery=aladinSub.startsWith("photos/web-selected/") ? aladinSub.slice("photos/web-selected/".length) : null;
    f=legacyGallery
      ? existingFile([[path.join(root,"public","ASSETS","ALADIN","photos","web-selected"),legacyGallery],[path.join(root,"ASSETS","ALADIN","photos","web-selected"),legacyGallery],[path.join(root,"public","assets","aladin","gallery"),legacyGallery],[path.join(root,"assets","aladin","gallery"),legacyGallery]])
      : existingFile([[path.join(root,"public","ASSETS","ALADIN"),aladinSub],[path.join(root,"ASSETS","ALADIN"),aladinSub]]);
   }else{
    f=existingFile([[path.join(root,"ASSETS"),sub],[path.join(root,"public","ASSETS"),sub],[path.join(root,"MMW-COMPANY","2 — WORKING","ASSETS"),sub],[path.join(root,"MMW-COMPANY","2 — WORKING","public","ASSETS"),sub]]);
    // CARPATHIA media remains local and controlled. If a generated alias is
    // absent from the build artifact, resolve it to the original local asset.
    if(!f && parts[0]==="CARPATHIA" && parts[1]==="photos" && parts[2]==="web-selected"){
     const alias=parts.slice(3).join("/");
     const map={
      "01-restoration-stay.jpg":"02-stay.jpg",
      "02-natural-environment.jpg":"03-nature.jpg",
      "03-local-experience.jpg":"04-food.jpg",
      "04-service-context.jpg":"07-service.jpg",
      "05-season-autumn.jpg":"season-autumn.jpg",
      "06-scale-model-context.jpg":"08-model.jpg",
      "07-family-guest-context.jpg":"06-guest.jpg",
      "08-active-experience.jpg":"05-experience.jpg",
      "09-winter-context.jpg":"season-winter.jpg",
      "10-spring-context.jpg":"season-spring.jpg",
      "11-summer-context.jpg":"season-summer.jpg",
      "12-mountain-guest-context.jpg":"01-hero.jpg"
     };
     if(map[alias]) f=existingFile([[path.join(root,"MEDIA-LIBRARY","CARPATHIA","photos","web-selected"),map[alias]]]);
    }
   }
  }else if(rel.startsWith("/PROJECTS/")){
   f=existingFile([[path.join(root,"PROJECTS"),rel.slice("/PROJECTS/".length)]]);
  }else if(rel.startsWith("/public-energy/")){
   f=existingFile([[path.join(root,"public-energy"),rel.slice("/public-energy/".length)]]);
  }else{
   const sub=rel.slice(1);
   f=existingFile([[path.join(root,"public"),sub],[path.join(root,"MMW-COMPANY","2 — WORKING","public"),sub]]);
  }
  if(f){
   const ext=path.extname(f).toLowerCase();
   res.writeHead(200,{"Content-Type":mime[ext]||"application/octet-stream","Cache-Control":"no-cache"});
   return fs.createReadStream(f).pipe(res);
  }
  return res.writeHead(404,{"Content-Type":"text/plain; charset=utf-8"}),res.end("Not found");
 }catch(e){console.error(e);return res.writeHead(500,{"Content-Type":"text/plain; charset=utf-8"}),res.end("Server error")}
});
server.listen(port,"0.0.0.0",()=>{const ep=path.join(root,"MMW-COMPANY","2 — WORKING","public","ASSETS","ENERGY-PARK","photos","web-selected");const probe=["00-hero-energy-park.jpg","01-industrial-energy-site.jpg","09-industrial-rooftops.jpg"].map(n=>{const f=path.join(ep,n);let size=0,magic="";try{const b=fs.readFileSync(f);size=b.length;magic=b.subarray(0,4).toString("hex")}catch(e){}return n+":"+size+":"+magic});console.log("MMW-COMPANY "+port+" | ENERGY_MEDIA "+probe.join("|"));});