const http=require("http");
const fs=require("fs");
const path=require("path");
const PORT=Number(process.env.PORT)||10000;
const HOST="0.0.0.0";
const ROOT=path.join(__dirname,"public");
const MIME={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".json":"application/json; charset=utf-8",".svg":"image/svg+xml",".png":"image/png",".jpg":"image/jpeg",".webp":"image/webp"};
const server=http.createServer((req,res)=>{
  res.setHeader("X-Content-Type-Options","nosniff");
  res.setHeader("Cache-Control","no-store");
  let url;
  try{url=new URL(req.url,"http://"+req.headers.host).pathname}catch{url="/"}
  let file=path.normalize(path.join(ROOT,url));
  if(!file.startsWith(ROOT)) return res.writeHead(403).end("Forbidden");
  if(url==="/"||!path.extname(file)) file=path.join(ROOT,"index.html");
  fs.readFile(file,(err,data)=>{
    if(err){
      if(path.extname(file) && url!==" /") return res.writeHead(404).end("Not found");
      return fs.readFile(path.join(ROOT,"index.html"),(e,d)=>e?res.writeHead(500).end("Server error"):res.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}).end(d));
    }
    res.writeHead(200,{"Content-Type":MIME[path.extname(file)]||"application/octet-stream"}).end(data);
  });
});
server.keepAliveTimeout=120000;
server.headersTimeout=125000;
server.requestTimeout=120000;
server.listen(PORT,HOST,()=>console.log("MMW-COMPANY listening on "+HOST+":"+PORT));
