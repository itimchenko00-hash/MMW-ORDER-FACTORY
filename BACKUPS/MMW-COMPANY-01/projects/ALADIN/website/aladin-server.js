const http=require('http');
const fs=require('fs');
const path=require('path');
const file=path.join(__dirname,'aladin-visual-system.html');
const server=http.createServer((req,res)=>{
  if(req.url==='/'||req.url.startsWith('/aladin')){
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});
    return fs.createReadStream(file).pipe(res);
  }
  res.writeHead(404);res.end('Not found');
});
server.listen(process.env.PORT||10000,'0.0.0.0');
