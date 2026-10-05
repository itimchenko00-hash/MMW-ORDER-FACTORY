const http=require("http"),fs=require("fs"),path=require("path");
const root=path.join(__dirname,"public");
const port=process.env.PORT||10000;

const routes={
  "/project/aladin-residence":"/aladin.html",
  "/project/nexus-work":"/nexus.html",
  "/project/carpathia-eco-lodge":"/carpathia.html",
  "/project/agrohub":"/agrohub.html",
  "/project/energy-park":"/energy-park.html",
  "/project/education-training-hub":"/education-training-hub.html",
  "/project/health-wellness":"/health-wellness.html",
  "/project/sports-active-lifestyle":"/sports-active-lifestyle.html",
  "/project/service-hub":"/service-hub.html",
  "/project/digital-business":"/digital-business.html"
};

const mime={
  ".html":"text/html; charset=utf-8",
  ".css":"text/css; charset=utf-8",
  ".js":"text/javascript; charset=utf-8",
  ".svg":"image/svg+xml",
  ".png":"image/png",
  ".jpg":"image/jpeg",
  ".jpeg":"image/jpeg",
  ".webp":"image/webp",
  ".ico":"image/x-icon"
};

function safePath(requestUrl){
  let raw=(requestUrl||"/").split("?")[0];
  try{raw=decodeURIComponent(raw)}catch{}
  if(routes[raw]) return routes[raw];
  if(raw==="/" || raw==="") return "/index.html";
  return raw;
}

http.createServer((req,res)=>{
  const requestPath=(req.url||"/").split("?")[0];
  const target=safePath(req.url);
  const file=path.join(root,target.replace(/^\//,""));

  if(!file.startsWith(root+path.sep) && file!==path.join(root,"index.html")){
    res.writeHead(400,{"Content-Type":"text/plain; charset=utf-8"});
    return res.end("Bad request");
  }

  fs.readFile(file,(err,data)=>{
    if(err){
      res.writeHead(404,{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"no-store"});
      return res.end("Not found");
    }
    const ext=path.extname(file).toLowerCase();
    res.writeHead(200,{
      "Content-Type":mime[ext]||"application/octet-stream",
      "Cache-Control":"public,max-age=60"
    });
    res.end(data);
  });
}).listen(port,"0.0.0.0",()=>console.log("MMW-COMPANY on "+port));
