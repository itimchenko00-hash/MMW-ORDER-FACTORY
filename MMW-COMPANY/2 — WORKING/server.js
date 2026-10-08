const http=require("node:http"),fs=require("node:fs"),path=require("node:path"),{URL}=require("node:url"),{pathToFileURL}=require("node:url");
const root=path.resolve(__dirname,"..",".."),publicRoot=path.join(root,"MMW-COMPANY","2 — WORKING","public"),orderRoot=path.join(root,"MMW-COMPANY","2 — WORKING","ORDER"),port=Number(process.env.PORT)||10000;
const mime={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".svg":"image/svg+xml",".jpg":"image/jpeg",".jpeg":"image/jpeg",".png":"image/png",".webp":"image/webp",".json":"application/json; charset=utf-8",".ico":"image/x-icon",".txt":"text/plain; charset=utf-8",".xml":"application/xml; charset=utf-8"};
const safe=(base,rel)=>{const b=path.resolve(base),p=path.resolve(base,rel);return p===b||p.startsWith(b+path.sep)?p:null};
process.env.MMW_ORDER_STANDALONE="0";
process.env.APP_NAME=process.env.APP_NAME||"MMW-ORDER";
process.env.PUBLIC_BASE_URL=process.env.PUBLIC_BASE_URL||"https://mmw-company-2.onrender.com/order";
let orderApp=null,orderLoadError=null;
function selfTestOrder(){if(!orderApp)return;http.get({hostname:"127.0.0.1",port,path:"/order/api/health"},r=>{const chunks=[];r.on("data",c=>chunks.push(c));r.on("end",()=>console.log("[MMW-ORDER] self-test status="+r.statusCode+" body="+Buffer.concat(chunks).toString("utf8").slice(0,180)))}).on("error",e=>console.error("[MMW-ORDER] self-test error",e.message))}
import(pathToFileURL(path.join(orderRoot,"src","integrated-server.js")).href).then(m=>{orderApp=m.app;console.log("[MMW-ORDER] integrated app ready on /order/");setTimeout(selfTestOrder,1000)}).catch(e=>{orderLoadError=e;console.error("[MMW-ORDER] integrated app load failed",e.stack||e.message)});
function rewriteOrderResponse(res,body){
 const type=String(res.getHeader("content-type")||"");
 if(!/text\/html|javascript/.test(type))return body;
 let s=body.toString("utf8");
 s=s.replace(/(["'])\/api\//g,"$1/order/api/");
 s=s.replace(/(["'])\/styles\.css/g,"$1/order/styles.css");
 s=s.replace(/(["'])\/catalog\.js/g,"$1/order/catalog.js");
 s=s.replace(/(["'])\/app\.js/g,"$1/order/app.js");
 s=s.replace(/(["'])\/admin\.js/g,"$1/order/admin.js");
 return Buffer.from(s);
}
function serveOrder(req,res){
 if(!orderApp){res.writeHead(503,{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"});return res.end(JSON.stringify({error:"MMW-ORDER loading",detail:orderLoadError?String(orderLoadError.message):"try again"}))}
 const u=new URL(req.url,"http://localhost"),target=u.pathname==="/order"||u.pathname==="/order/"?"/":u.pathname.replace(/^\/order(?=\/|$)/,"")||"/";
 req.url=target+(u.search||"");
 const chunks=[],ow=res.write.bind(res),oe=res.end.bind(res);
 res.write=(chunk,...args)=>{if(chunk)chunks.push(Buffer.isBuffer(chunk)?chunk:Buffer.from(chunk));return true};
 res.end=(chunk,...args)=>{if(chunk)chunks.push(Buffer.isBuffer(chunk)?chunk:Buffer.from(chunk));let body=Buffer.concat(chunks);body=rewriteOrderResponse(res,body);res.removeHeader("content-length");res.setHeader("content-length",String(body.length));return oe(body,...args)};
 orderApp(req,res);
}
const server=http.createServer((req,res)=>{
 try{
  const u=new URL(req.url,"http://localhost"),p=u.pathname;
  if(p==="/healthz"){res.writeHead(200,{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"});return res.end(JSON.stringify({ok:true,service:"mmw-company-2",order:"integrated",orderReady:Boolean(orderApp),root:"MMW-COMPANY/2 — WORKING/public"}))}
  if(p==="/order"||p==="/order/"||p.startsWith("/order/"))return serveOrder(req,res);
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
server.listen(port,"0.0.0.0",()=>console.log("MMW-COMPANY/2 "+port+"; MMW-ORDER integrated on /order/"));
process.on("SIGTERM",()=>server.close(()=>process.exit(0)));
process.on("SIGINT",()=>server.close(()=>process.exit(0)));
