const http=require("http"),fs=require("fs"),path=require("path"),crypto=require("crypto"),PDFDocument=require("pdfkit");
const root=path.join(__dirname,"public"),dataDir=path.join(__dirname,"data"),ordersFile=path.join(dataDir,"orders.json"),port=process.env.PORT||10000;
if(!fs.existsSync(dataDir))fs.mkdirSync(dataDir,{recursive:true});
if(!fs.existsSync(ordersFile))fs.writeFileSync(ordersFile,"[]","utf8");
let writeQueue=Promise.resolve();
let orderSeq=readOrders().length+1;
const accessAttempts=new Map();
const fontRegular=path.join(__dirname,"../../node_modules/dejavu-fonts-ttf/ttf/DejaVuSans.ttf");
const fontBold=path.join(__dirname,"../../node_modules/dejavu-fonts-ttf/ttf/DejaVuSans-Bold.ttf");
function readOrders(){try{return JSON.parse(fs.readFileSync(ordersFile,"utf8")||"[]")}catch{return[]}}
function saveOrders(items){writeQueue=writeQueue.then(()=>fs.promises.writeFile(ordersFile,JSON.stringify(items,null,2),"utf8"));return writeQueue}
function cleanPhone(v){return String(v||"").replace(/\D/g,"").slice(-15)}
function hashCode(code,salt){return crypto.scryptSync(String(code),salt,32).toString("hex")}
function makeCode(){return String(crypto.randomInt(10000,100000))}
const PRICE_MAP={
"audit":9000,"site":15000,"market":27000,"feasibility":45000,"concept":55000,"economics":35000,"businessplan":65000,"investment":45000,"roadmap":18000,"pm":45000,"devmgmt":65000,"commercial":30000,"custom":0,
"project:ALADIN RESIDENCE":195000,"project:NEXUS WORK":180000,"project:CARPATHIA ECO LODGE":207000,"project:AGROHUB":195000,"project:NEXUS LOGISTICS":207000,"project:ENERGY PARK":222000
};

function json(res,status,data){const body=JSON.stringify(data);res.writeHead(status,{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store","X-Content-Type-Options":"nosniff"});res.end(body)}
function body(req){return new Promise((resolve,reject)=>{let s="";req.on("data",c=>{s+=c;if(s.length>200000)reject(new Error("payload too large"))});req.on("end",()=>{try{resolve(JSON.parse(s||"{}"))}catch{reject(new Error("invalid json"))}});req.on("error",reject)})}
function safeOrder(o){return{orderNumber:o.orderNumber,status:o.status,name:o.name,phoneMasked:o.phoneMasked,items:o.items.map(x=>({name:x.name,price:x.price,unit:x.unit})),total:o.total,comment:o.comment,createdAt:o.createdAt}}
function findOrder(phone,code){const p=cleanPhone(phone),c=String(code||"").replace(/\D/g,"");if(p.length<7||!/^[0-9]{5}$/.test(c))return null;return readOrders().find(o=>o.phone===p&&o.accessHash===hashCode(c,o.accessSalt))||null}
function statementPdf(res,o){
 const doc=new PDFDocument({size:"A4",margin:48,info:{Title:"MMW-COMPANY · ВЫПИСКА ЗАЯВКИ",Author:"MMW-COMPANY"}});
 res.writeHead(200,{"Content-Type":"application/pdf","Content-Disposition":'attachment; filename="MMW-COMPANY-'+o.orderNumber+'.pdf"',"Cache-Control":"no-store","X-Content-Type-Options":"nosniff"});
 doc.pipe(res);
 const regular=fs.existsSync(fontRegular)?fontRegular:"Helvetica",bold=fs.existsSync(fontBold)?fontBold:"Helvetica-Bold";
 doc.font(bold).fontSize(20).fillColor("#061a17").text("MMW-COMPANY");
 doc.font(regular).fontSize(8).fillColor("#0b705b").text("ВЫПИСКА ЗАЯВКИ · КОММЕРЧЕСКИЙ ДОКУМЕНТ");
 doc.moveDown(1);
 doc.moveTo(48,102).lineTo(547,102).strokeColor("#c8ad72").lineWidth(1).stroke();
 doc.moveDown(1.5);
 doc.font(bold).fontSize(15).fillColor("#061a17").text("ВЫПИСКА ЗАЯВКИ");
 doc.font(regular).fontSize(9).fillColor("#65736e").text("Состав запроса · ориентировочная стоимость · текущий статус");
 doc.moveDown(1.5);
 const label=(a,b)=>{doc.font(bold).fontSize(8).fillColor("#0b705b").text(a);doc.font(regular).fontSize(10).fillColor("#061a17").text(b);doc.moveDown(.65)};
 label("НОМЕР ЗАЯВКИ",o.orderNumber);
 label("СТАТУС",o.status==="NEW"?"Новая":o.status);
 label("КЛИЕНТ",o.name);
 label("ТЕЛЕФОН",o.phoneMasked);
 if(o.email)label("EMAIL",o.email);
 doc.moveDown(.4);
 doc.font(bold).fontSize(10).fillColor("#061a17").text("СОСТАВ ЗАПРОСА");
 doc.moveDown(.45);
 o.items.forEach((x,i)=>{doc.font(bold).fontSize(9).fillColor("#061a17").text((i+1)+". "+x.name,{continued:true});doc.font(regular).fontSize(9).text("  "+(x.price?x.price.toLocaleString("uk-UA")+" грн":"індивідуально")+" / "+x.unit);});
 doc.moveDown(.8);
 doc.moveTo(48,doc.y).lineTo(547,doc.y).strokeColor("#d8dedb").lineWidth(.7).stroke();
 doc.moveDown(.7);
 doc.font(bold).fontSize(13).fillColor("#061a17").text("ОРИЕНТИР: "+o.total.toLocaleString("uk-UA")+" грн");
 doc.font(regular).fontSize(8.5).fillColor("#65736e").moveDown(.6).text("Позиции с пометкой «индивидуально» требуют подтверждения окончательного объёма и условий. Внешние расходы, подрядчики и иные работы, не указанные в составе заявки, не включены.");
 if(o.comment){doc.moveDown(1);doc.font(bold).fontSize(8).fillColor("#0b705b").text("КОММЕНТАРИЙ КЛИЕНТА");doc.font(regular).fontSize(9).fillColor("#061a17").text(o.comment,{width:490});}
 doc.moveDown(1.5);
 doc.font(regular).fontSize(8).fillColor("#65736e").text("Документ фиксирует зарегистрированный запрос MMW-COMPANY и не является договором или окончательной сметой.");
 doc.moveDown(.5);
 doc.font(bold).fontSize(8).fillColor("#0b705b").text("MMW-COMPANY · itimchenko00@gmail.com");
 doc.end();
}
async function handleApi(req,res,u){
 if(req.method==="POST"&&u==="/api/orders"){try{const b=await body(req),name=String(b.name||"").trim(),phone=cleanPhone(b.phone),email=String(b.email||"").trim(),comment=String(b.comment||"").trim(),items=Array.isArray(b.items)?b.items.map(x=>({id:String(x.id||""),name:String(x.name||"").slice(0,160),price:Number(x.price)||0,unit:String(x.unit||"").slice(0,50)})).slice(0,30):[];if(name.length<2||phone.length<7||!items.length)return json(res,400,{error:"Нужны имя, корректный телефон и хотя бы одна позиция."});const normalized=items.filter(x=>Object.prototype.hasOwnProperty.call(PRICE_MAP,x.id)).map(x=>({...x,price:PRICE_MAP[x.id]}));if(!normalized.length)return json(res,400,{error:"Позиции заказа не распознаны."});const orders=readOrders(),year=new Date().getFullYear(),n=String(orderSeq++).padStart(6,"0"),orderNumber="MMW-"+year+"-"+n,code=makeCode(),salt=crypto.randomBytes(16).toString("hex"),total=normalized.reduce((s,x)=>s+x.price,0),order={orderNumber,name,phone,phoneMasked:"+"+phone.slice(0,3)+"••••"+phone.slice(-2),email,comment,items:normalized,total,status:"NEW",createdAt:new Date().toISOString(),accessSalt:salt,accessHash:hashCode(code,salt)};orders.push(order);await saveOrders(orders);return json(res,201,{orderNumber,accessCode:code,status:"NEW",total})}catch(e){return json(res,400,{error:e.message||"Ошибка заявки"})}}
 if(req.method==="POST"&&u==="/api/orders/access"){try{const b=await body(req),phone=cleanPhone(b.phone),code=String(b.code||"").replace(/\D/g,""),key=(req.socket.remoteAddress||"")+"|"+phone,now=Date.now();let a=accessAttempts.get(key)||{count:0,until:0};if(a.until>now&&a.count>=5)return json(res,429,{error:"Слишком много попыток. Повторите через 10 минут."});if(a.until<=now)a={count:0,until:now+600000};a.count++;accessAttempts.set(key,a);if(phone.length<7||!/^[0-9]{5}$/.test(code))return json(res,400,{error:"Введите телефон и код из 5 цифр."});const order=findOrder(phone,code);if(!order)return json(res,401,{error:"Заявка не найдена или код неверен."});accessAttempts.delete(key);return json(res,200,{order:safeOrder(order)})}catch(e){return json(res,400,{error:"Ошибка проверки доступа"})}}
 if(req.method==="POST"&&u==="/api/orders/pdf"){try{const b=await body(req),order=findOrder(b.phone,b.code);if(!order)return json(res,401,{error:"Заявка не найдена или код неверен."});if(b.orderNumber&&String(b.orderNumber)!==order.orderNumber)return json(res,403,{error:"Доступ к этой выписке не подтверждён."});return statementPdf(res,order)}catch(e){if(!res.headersSent)return json(res,400,{error:"Не удалось сформировать выписку."});res.end()}}
 return false;
}
const server=http.createServer(async(req,res)=>{const u=(req.url||"/").split("?")[0];if(u.startsWith("/api/")){const done=await handleApi(req,res,u);if(done!==false)return}let clean=decodeURIComponent(u);if(clean==="/"||!clean.includes("."))clean="/index.html";let f=path.join(root,clean.replace(/^\//,""));if(!f.startsWith(root)){res.writeHead(403);return res.end("Forbidden")}fs.readFile(f,(e,d)=>{if(e){res.writeHead(404,{"Content-Type":"text/plain; charset=utf-8"});return res.end("Not found")}const ext=path.extname(f),types={".html":"text/html; charset=utf-8",".css":"text/css",".js":"text/javascript",".svg":"image/svg+xml",".json":"application/json"};res.writeHead(200,{"Content-Type":types[ext]||"application/octet-stream","Cache-Control":"public,max-age=60","X-Content-Type-Options":"nosniff"});res.end(d)})});
server.listen(port,"0.0.0.0",()=>console.log("MMW-COMPANY on "+port));