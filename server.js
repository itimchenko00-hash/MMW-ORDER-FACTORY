const http=require("node:http"),fs=require("node:fs"),path=require("node:path"),{URL}=require("node:url"),{execFileSync}=require("node:child_process");
const root=__dirname;\nexecFileSync(process.execPath,[path.join(root,"MMW-COMPANY/2 — WORKING/scripts/import-nexus-work-media.cjs")],{stdio:"inherit"});\nconst port=Number(process.env.PORT)||10000;
const mime={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".svg":"image/svg+xml",".jpg":"image/jpeg",".jpeg":"image/jpeg",".png":"image/png",".webp":"image/webp",".json":"application/json; charset=utf-8",".ico":"image/x-icon"};
const safe=(base,rel)=>{const b=path.resolve(base),p=path.resolve(base,rel);return p===b||p.startsWith(b+path.sep)?p:null};
const server=http.createServer((req,res)=>{
 try{
  const u=new URL(req.url,"http://localhost"),p=u.pathname;
  if(p==="/healthz"){res.writeHead(200,{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"});return res.end(JSON.stringify({ok:true,service:"mmw-company"}))}
  let rel=decodeURIComponent(p);if(rel==="/")rel="/index.html";
  const legacyProjectRoutes={"/nexus-work.html":"/#/project/nexus-work","/nexus-logistics.html":"/#/project/nexus-logistics","/carpathia.html":"/#/project/carpathia-eco-lodge","/agrohub.html":"/#/project/agrohub","/energy-park.html":"/#/project/energy-park","/aladin.html":"/#/project/aladin-residence"};
  if(legacyProjectRoutes[rel]){res.writeHead(302,{Location:legacyProjectRoutes[rel],"Cache-Control":"no-store"});return res.end()}
  let target;
  if(rel.startsWith("/ASSETS/")){ target={base:path.join(root,"public","ASSETS"),sub:rel.slice(8)}; }else if(rel.startsWith("/PROJECTS/"))target={base:path.join(root,"PROJECTS"),sub:rel.slice(10)};
  else if(rel.startsWith("/public-energy/"))target={base:path.join(root,"public-energy"),sub:rel.slice(15)};
  else target={base:path.join(root,"public"),sub:rel.slice(1)};
  if(!target)return res.writeHead(404,{"Content-Type":"text/plain; charset=utf-8"}),res.end("Not found");
  const f=safe(target.base,target.sub);
  if(f&&fs.existsSync(f)&&fs.statSync(f).isFile()){
    res.writeHead(200,{"Content-Type":mime[path.extname(f).toLowerCase()]||"application/octet-stream","Cache-Control":"no-cache"});
    return res.end(fs.readFileSync(f));
  }
  return res.writeHead(404,{"Content-Type":"text/plain; charset=utf-8"}),res.end("Not found");
 }catch(e){console.error(e);return res.writeHead(500,{"Content-Type":"text/plain; charset=utf-8"}),res.end("Server error")}
});
server.listen(port,"0.0.0.0",()=>console.log("MMW-COMPANY "+port));