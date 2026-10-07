const http=require("node:http"),fs=require("node:fs"),path=require("node:path"),{URL}=require("node:url");
const root=__dirname,port=Number(process.env.PORT)||10000;
const mime={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".svg":"image/svg+xml",".jpg":"image/jpeg",".jpeg":"image/jpeg",".png":"image/png",".webp":"image/webp",".json":"application/json; charset=utf-8",".ico":"image/x-icon"};
const safe=(base,rel)=>{const b=path.resolve(base),p=path.resolve(base,rel);return p===b||p.startsWith(b+path.sep)?p:null};
const existingFile=(candidates)=>{for(const [base,sub] of candidates){const f=safe(base,sub);if(f&&fs.existsSync(f)&&fs.statSync(f).isFile())return f}return null};
const server=http.createServer((req,res)=>{
 try{
  const u=new URL(req.url,"http://localhost"),p=u.pathname;
  if(p==="/healthz"){res.writeHead(200,{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"});return res.end(JSON.stringify({ok:true,service:"mmw-company"}))}
  let rel=decodeURIComponent(p);if(rel==="/")rel="/index.html";
  const legacyProjectRoutes={"/nexus-work.html":"/#/project/nexus-work","/nexus-logistics.html":"/#/project/nexus-logistics","/carpathia.html":"/#/project/carpathia-eco-lodge","/energy-park.html":"/#/project/energy-park","/aladin.html":"/#/project/aladin-residence"};
  if(legacyProjectRoutes[rel]){res.writeHead(302,{Location:legacyProjectRoutes[rel],"Cache-Control":"no-store"});return res.end()}
  let f=null;
  if(rel.startsWith("/ASSETS/")){
   const sub=rel.slice("/ASSETS/".length);
   const parts=sub.split("/");
   if(parts[0]==="ALADIN"){
    const aladinSub=parts.slice(1).join("/");
    const legacyGallery=aladinSub.startsWith("photos/web-selected/") ? aladinSub.slice("photos/web-selected/".length) : null;
    f=legacyGallery
      ? existingFile([[path.join(root,"public","ASSETS","ALADIN","photos","web-selected"),legacyGallery],[path.join(root,"ASSETS","ALADIN","photos","web-selected"),legacyGallery],[path.join(root,"public","assets","aladin","gallery"),legacyGallery],[path.join(root,"assets","aladin","gallery"),legacyGallery]])
      : existingFile([[path.join(root,"public","ASSETS","ALADIN"),aladinSub],[path.join(root,"ASSETS","ALADIN"),aladinSub]]);
   }else{
    f=existingFile([[path.join(root,"public","ASSETS"),sub],[path.join(root,"ASSETS"),sub]]);
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
server.listen(port,"0.0.0.0",()=>console.log("MMW-COMPANY "+port));