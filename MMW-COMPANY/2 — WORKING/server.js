const http=require("node:http"),fs=require("node:fs"),path=require("node:path"),{URL}=require("node:url"),{spawn}=require("node:child_process");
const root=path.resolve(__dirname,"..",".."),publicRoot=path.join(root,"MMW-COMPANY","2 — WORKING","public"),orderRoot=path.join(root,"MMW-COMPANY","2 — WORKING","ORDER"),port=Number(process.env.PORT)||10000,orderPort=Number(process.env.ORDER_PORT)||10001;
const mime={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".svg":"image/svg+xml",".jpg":"image/jpeg",".jpeg":"image/jpeg",".png":"image/png",".webp":"image/webp",".json":"application/json; charset=utf-8",".ico":"image/x-icon",".txt":"text/plain; charset=utf-8",".xml":"application/xml; charset=utf-8"};
const safe=(base,rel)=>{const b=path.resolve(base),p=path.resolve(base,rel);return p===b||p.startsWith(b+path.sep)?p:null};
const orderEnv={...process.env,PORT:String(orderPort),PUBLIC_BASE_URL:process.env.PUBLIC_BASE_URL||"https://mmw-company-2.onrender.com/order",APP_NAME:"MMW-ORDER"};
const orderProcess=spawn(process.execPath,[path.join(orderRoot,"src","server.js")],{env:orderEnv,stdio:["ignore","pipe","pipe"]});
orderProcess.stdout.on("data",d=>process.stdout.write("[MMW-ORDER] "+d));orderProcess.stderr.on("data",d=>process.stderr.write("[MMW-ORDER] "+d));orderProcess.on("error",e=>console.error("[MMW-ORDER] child spawn error",e.message));orderProcess.on("exit",(code,signal)=>console.error("[MMW-ORDER] child exited",code,signal));console.log("[MMW-ORDER] child started pid="+orderProcess.pid+" port="+orderPort);
function proxyOrder(req,res){
 const u=new URL(req.url,"http://localhost"),target=u.pathname==="/order"||u.pathname==="/order/"?"/":u.pathname.replace(/^\/order(?=\/|$)/,"")||"/";
 const options={hostname:"127.0.0.1",port:orderPort,path:target+(u.search||""),method:req.method,headers:{...req.headers,host:"127.0.0.1:"+orderPort}};
 const pr=http.request(options,up=>{
   const headers={...up.headers};
   const type=String(headers["content-type"]||"");
   const chunks=[];
   up.on("data",c=>chunks.push(c));
   up.on("end",()=>{
     let body=Buffer.concat(chunks);
     if(/text\/html|javascript|text\/css|application\/json/.test(type)){
       let s=body.toString("utf8");
       if(/text\/html|javascript/.test(type)){
         s=s.replace(/(["'])\/api\//g,"$1/order/api/");
         s=s.replace(/(["'])\/styles\.css/g,"$1/order/styles.css");
         s=s.replace(/(["'])\/catalog\.js/g,"$1/order/catalog.js");
         s=s.replace(/(["'])\/app\.js/g,"$1/order/app.js");
         s=s.replace(/(["'])\/admin\.js/g,"$1/order/admin.js");
       }
       body=Buffer.from(s);
       delete headers["content-length"];headers["content-length"]=String(body.length);
     }
     res.writeHead(up.statusCode||502,headers);res.end(body);
   });
 });
 pr.on("error",e=>{console.error("[MMW-ORDER proxy]",e.message);if(!res.headersSent)res.writeHead(502,{"Content-Type":"application/json; charset=utf-8"});res.end(JSON.stringify({error:"MMW-ORDER unavailable"}));});
 req.pipe(pr);
}
const server=http.createServer((req,res)=>{
 try{
  const u=new URL(req.url,"http://localhost"),p=u.pathname;
  if(p==="/healthz"){res.writeHead(200,{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"});return res.end(JSON.stringify({ok:true,service:"mmw-company-2",order:"integrated",root:"MMW-COMPANY/2 — WORKING/public"}))}
  if(p==="/order"||p==="/order/"||p.startsWith("/order/"))return proxyOrder(req,res);
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
process.on("SIGTERM",()=>{orderProcess.kill("SIGTERM");server.close(()=>process.exit(0))});
process.on("SIGINT",()=>{orderProcess.kill("SIGINT");server.close(()=>process.exit(0))});
