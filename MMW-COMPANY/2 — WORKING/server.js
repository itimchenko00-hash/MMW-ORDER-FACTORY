const http=require("http"),fs=require("fs"),path=require("path");
const root=path.join(__dirname,"public"),port=process.env.PORT||10000;
const routes={
"/project/aladin-residence":"/aladin.html",
"/project/nexus-work":"/nexus.html",
"/project/carpathia-eco-lodge":"/carpathia.html",
"/project/agrohub":"/agrohub.html",
"/project/energy-park":"/energy-park.html"
};
http.createServer((req,res)=>{
 let u=(req.url||"/").split("?")[0];
 u=routes[u]||u;
 if(u==="/"||!u.includes("."))u="/index.html";
 let f=path.join(root,u.replace(/^\//,""));
 fs.readFile(f,(e,d)=>{
  if(e){res.writeHead(404,{"Content-Type":"text/plain; charset=utf-8"});return res.end("Not found")}
  let ext=path.extname(f);
  let t={".html":"text/html; charset=utf-8",".css":"text/css",".js":"text/javascript",".svg":"image/svg+xml"}[ext]||"application/octet-stream";
  res.writeHead(200,{"Content-Type":t,"Cache-Control":"public,max-age=60"});
  res.end(d)
 })
}).listen(port,"0.0.0.0",()=>console.log("MMW-COMPANY on "+port));