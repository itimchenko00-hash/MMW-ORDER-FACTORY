const http=require("node:http"),fs=require("node:fs"),path=require("node:path"),{URL}=require("node:url");
const root=__dirname,port=Number(process.env.PORT)||10000;
const mime={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".svg":"image/svg+xml",".jpg":"image/jpeg",".jpeg":"image/jpeg",".png":"image/png",".webp":"image/webp",".json":"application/json; charset=utf-8",".ico":"image/x-icon"};
const safe=(base,rel)=>{const b=path.resolve(base),p=path.resolve(base,rel);return p===b||p.startsWith(b+path.sep)?p:null};
const json=(res,status,data)=>{res.writeHead(status,{"Content-Type":mime[".json"],"Cache-Control":"no-store"});res.end(JSON.stringify(data))};
const server=http.createServer((req,res)=>{
 try{
  const u=new URL(req.url,"http://localhost"),p=u.pathname;
  if(p==="/healthz")return json(res,200,{ok:true,service:"mmw-company"});
  let rel=decodeURIComponent(p);if(rel==="/")rel="/index.html";
  const legacyProjectRoutes={"/nexus-work.html":"/#/project/nexus-work","/nexus-logistics.html":"/#/project/nexus-logistics","/carpathia.html":"/#/project/carpathia-eco-lodge","/agrohub.html":"/#/project/agrohub","/energy-park.html":"/#/project/energy-park","/aladin.html":"/#/project/aladin-residence"};
  if(legacyProjectRoutes[rel]){res.writeHead(302,{Location:legacyProjectRoutes[rel],"Cache-Control":"no-store"});return res.end()}
  let target;
  if(rel.startsWith("/ASSETS/")){
   const sub=rel.slice(8),base=path.join(root,"public","ASSETS");target={base,sub};
  }else if(rel.startsWith("/PROJECTS/"))target={base:path.join(root,"PROJECTS"),sub:rel.slice(10)};
  else if(rel.startsWith("/public-energy/"))target={base:path.join(root,"public-energy"),sub:rel.slice(15)};
  else target={base:path.join(root,"public"),sub:rel.slice(1)};
  const f=safe(target.base,target.sub);
  if(f&&fs.existsSync(f)&&fs.statSync(f).isFile()){res.writeHead(200,{"Content-Type":mime[path.extname(f).toLowerCase()]||"application/octet-stream","Cache-Control":"no-cache"});return res.end(fs.readFileSync(f))}
  return res.writeHead(404,{"Content-Type":"text/plain; charset=utf-8"}),res.end("Not found");
 }catch(e){console.error(e);return json(res,500,{error:"Не удалось обработать запрос."})}
});
server.listen(port,"0.0.0.0",()=>console.log("MMW-COMPANY "+port+" static-site"));