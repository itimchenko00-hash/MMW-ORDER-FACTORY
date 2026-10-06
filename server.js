const http=require("node:http"),fs=require("node:fs"),path=require("node:path"),{URL}=require("node:url");
const {items,CATALOG_VERSION}=require("./src/company-catalog"),{initOrders,createOrder,getByCode,getByCredentials,getByPhoneCode,listByToken,all,updateStatus,usingDatabase}=require("./src/company-orders"),{orderPdf}=require("./src/company-pdf");
const root=__dirname,port=Number(process.env.PORT)||10000;
const mime={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".svg":"image/svg+xml",".jpg":"image/jpeg",".jpeg":"image/jpeg",".png":"image/png",".webp":"image/webp",".json":"application/json; charset=utf-8",".ico":"image/x-icon"};
const safe=(base,rel)=>{const b=path.resolve(base),p=path.resolve(base,rel);return p===b||p.startsWith(b+path.sep)?p:null};
const limits=new Map(),WINDOW=10*60*1000,MAX=30,ACCESS_WINDOW=10*60*1000,ACCESS_MAX=8;
const json=(res,status,data)=>{res.writeHead(status,{"Content-Type":mime[".json"],"Cache-Control":"no-store"});res.end(JSON.stringify(data))};
const body=async req=>new Promise((resolve,reject)=>{let s="";req.on("data",c=>{s+=c;if(s.length>150000)reject(new Error("payload too large"))});req.on("end",()=>{try{resolve(s?JSON.parse(s):{})}catch(e){reject(e)}});req.on("error",reject)});
const allowedRoots=[path.join(root,"public"),path.join(root,"ASSETS"),path.join(root,"PROJECTS"),path.join(root,"public-energy")];
const server=http.createServer(async(req,res)=>{
 try{
  const u=new URL(req.url,"http://localhost"),p=u.pathname;
  if(p==="/healthz")return json(res,200,{ok:true,service:"mmw-company-from-scratch",catalog:CATALOG_VERSION});
  if(p==="/api/catalog")return json(res,200,{version:CATALOG_VERSION,items});
  if(p==="/api/admin/orders"&&req.method==="GET"){const key=String(req.headers["x-admin-key"]||"");if(!process.env.MMW_COMPANY_ADMIN_KEY||key!==process.env.MMW_COMPANY_ADMIN_KEY)return json(res,401,{error:"Доступ запрещён."});return json(res,200,{orders:await all()})}
  const sm=p.match(/^\/api\/admin\/orders\/([^/]+)\/status$/);if(sm&&req.method==="PATCH"){if(!process.env.MMW_COMPANY_ADMIN_KEY||String(req.headers["x-admin-key"]||"")!==process.env.MMW_COMPANY_ADMIN_KEY)return json(res,401,{error:"Доступ запрещён."});const b=await body(req),o=await updateStatus(decodeURIComponent(sm[1]),String(b.status||""));if(!o)return json(res,404,{error:"Заявка не найдена."});return json(res,200,{order:o})}
  if(p==="/api/orders"&&req.method==="POST"){
   const ip=req.socket.remoteAddress||"unknown",now=Date.now(),recent=(limits.get(ip)||[]).filter(x=>now-x<WINDOW);if(recent.length>=MAX)return json(res,429,{error:"Слишком много запросов. Повторите позже."});recent.push(now);limits.set(ip,recent);
   const b=await body(req);if(!b.customerName?.trim()||!b.phone?.trim()||!b.email?.trim()||!b.company?.trim()||!b.projectType?.trim()||!b.address?.trim()||!b.comment?.trim()||!Array.isArray(b.items)||!b.items.length)return json(res,400,{error:"Заполните все поля заявки и добавьте позицию."});
   const phoneDigits=String(b.phone).replace(/\D/g,"");if(!/^\d{7,15}$/.test(phoneDigits))return json(res,400,{error:"Введите телефон в международном формате: от 7 до 15 цифр."});
   if(!/^\S+@\S+\.\S+$/.test(b.email))return json(res,400,{error:"Проверьте email."});
   const o=await createOrder(b);return json(res,201,{order:{...o,accessToken:undefined},accessCode:o.accessCode});
  }
  if(p==="/api/order-access"&&req.method==="POST"){
   const ip=req.socket.remoteAddress||"unknown",now=Date.now();
   const b=await body(req),phone=String(b.phone||"").trim(),code=String(b.code||"").trim();if(!phone)return json(res,400,{error:"Введите номер телефона, указанный в заявке."});if(!/^\d{5}$/.test(code))return json(res,400,{error:"Введите ровно 5 цифр кода доступа."});const o=await getByPhoneCode(phone,code);if(!o){const failed=(limits.get("access-failed:"+ip)||[]).filter(x=>now-x<ACCESS_WINDOW);if(failed.length>=ACCESS_MAX)return json(res,429,{error:"Слишком много неверных попыток. Повторите позже."});failed.push(now);limits.set("access-failed:"+ip,failed);return json(res,404,{error:"Номер телефона или код доступа не совпадают."});}return json(res,200,{order:{...o,accessToken:undefined}});
  }
  const m=p.match(/^\/api\/orders\/([^/]+)\/pdf$/);if(m&&req.method==="GET"){const code=String(u.searchParams.get("code")||"").trim(),o=await getByCode(code);if(!o||o.id!==decodeURIComponent(m[1]))return json(res,404,{error:"Заявка или код доступа не найдены."});const pdf=await orderPdf(o);res.writeHead(200,{"Content-Type":"application/pdf","Content-Disposition":'attachment; filename="'+o.id+'.pdf"',"Cache-Control":"no-store"});return res.end(pdf)}
  let rel=decodeURIComponent(p);if(rel==="/")rel="/index.html";
  if(rel==="/nexus-work.html"){res.writeHead(302,{Location:"/#/project/nexus-work", "Cache-Control":"no-store"});return res.end()}
  const target=rel.startsWith("/ASSETS/")?{base:fs.existsSync(path.join(root,"ASSETS",rel.slice(8)))?path.join(root,"ASSETS"):path.join(root,"public","ASSETS"),sub:rel.slice(8)}:rel.startsWith("/PROJECTS/")?{base:path.join(root,"PROJECTS"),sub:rel.slice(10)}:rel.startsWith("/public-energy/")?{base:path.join(root,"public-energy"),sub:rel.slice(15)}:{base:path.join(root,"public"),sub:rel.slice(1)};
  const f=safe(target.base,target.sub);
  if(f&&fs.existsSync(f)&&fs.statSync(f).isFile()){res.writeHead(200,{"Content-Type":mime[path.extname(f).toLowerCase()]||"application/octet-stream","Cache-Control":"no-cache"});return res.end(fs.readFileSync(f))}
  return res.writeHead(404,{"Content-Type":"text/plain; charset=utf-8"}),res.end("Not found");
 }catch(e){console.error(e);return json(res,500,{error:"Не удалось обработать запрос."})}
});
initOrders().then(()=>server.listen(port,"0.0.0.0",()=>console.log("MMW-COMPANY "+port+" database="+(usingDatabase?"postgres":"local-fallback")))).catch(e=>{console.error("MMW-COMPANY database initialization failed",e);process.exit(1)});
