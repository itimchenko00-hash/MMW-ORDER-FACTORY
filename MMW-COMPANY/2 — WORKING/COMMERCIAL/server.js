const http=require("node:http");
const port=Number(process.env.PORT)||10000;
http.createServer((req,res)=>{res.writeHead(410,{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"});res.end(JSON.stringify({ok:false,disabled:true,service:"mmw-company-commercial",message:"Commercial contour retired. Use /order/ on MMW-COMPANY/2."}));}).listen(port,"0.0.0.0",()=>console.log("MMW-COMPANY commercial contour retired"));
