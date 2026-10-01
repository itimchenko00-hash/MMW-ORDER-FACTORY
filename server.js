const http=require("http");
const fs=require("fs");
const path=require("path");
const PORT=Number(process.env.PORT)||10000;
const HOST="0.0.0.0";
const PUBLIC_ROOT=path.resolve(__dirname,"public");
const PROJECT_ROOT=path.resolve(__dirname);
const MIME={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".json":"application/json; charset=utf-8",".svg":"image/svg+xml",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".webp":"image/webp"};

function safeFile(urlPath){
  const decoded=decodeURIComponent(urlPath);
  const clean=path.posix.normalize(decoded).replace(/^\/+/, "");
  const root=clean.startsWith("ASSETS/")?PROJECT_ROOT:PUBLIC_ROOT;
  const file=path.resolve(root,clean);
  const allowedRoot=root;
  return file===allowedRoot||file.startsWith(allowedRoot+path.sep)?file:null;
}

const server=http.createServer((req,res)=>{
  res.setHeader("X-Content-Type-Options","nosniff");
  res.setHeader("Referrer-Policy","strict-origin-when-cross-origin");
  res.setHeader("Cache-Control","no-store");
  let pathname="/";
  try{pathname=new URL(req.url||"/","http://"+(req.headers.host||"localhost")).pathname}catch{}
  if(pathname==="/healthz"){
    res.writeHead(200,{"Content-Type":"application/json; charset=utf-8"});
    return res.end(JSON.stringify({ok:true,service:"mmw-company-master"}));
  }
  let file=safeFile(pathname);
  if(!file)return res.writeHead(403).end("Forbidden");
  if(pathname==="/"||!path.extname(file))file=path.join(PUBLIC_ROOT,"index.html");
  fs.readFile(file,(err,data)=>{
    if(err)return res.writeHead(404,{"Content-Type":"text/plain; charset=utf-8"}).end("Not found");
    res.writeHead(200,{"Content-Type":MIME[path.extname(file)]||"application/octet-stream"}).end(data);
  });
});
server.keepAliveTimeout=120000;
server.headersTimeout=125000;
server.requestTimeout=120000;
server.listen(PORT,HOST,()=>console.log("MMW-COMPANY listening on "+HOST+":"+PORT));
process.on("SIGTERM",()=>server.close(()=>process.exit(0)));
process.on("SIGINT",()=>server.close(()=>process.exit(0)));
