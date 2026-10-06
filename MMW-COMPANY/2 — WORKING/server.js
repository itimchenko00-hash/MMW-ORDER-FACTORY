const http=require("http"),fs=require("fs"),path=require("path"),crypto=require("crypto"),PDFDocument=require("pdfkit");
const root=path.join(__dirname,"public"),dataDir=path.join(__dirname,"data"),ordersFile=path.join(dataDir,"orders.json"),port=process.env.PORT||10000;
if(!fs.existsSync(dataDir))fs.mkdirSync(dataDir,{recursive:true});
if(!fs.existsSync(ordersFile))fs.writeFileSync(ordersFile,"[]","utf8");
let writeQueue=Promise.resolve(),orderSeq=1;
const accessAttempts=new Map();
const fontRegular=path.join(__dirname,"../../node_modules/dejavu-fonts-ttf/ttf/DejaVuSans.ttf");
const fontBold=path.join(__dirname,"../../node_modules/dejavu-fonts-ttf/ttf/DejaVuSans-Bold.ttf");

const CATALOG={
 audit:{cat:"01 · Аналитика",name:"Аудит возможности",price:9000,unit:"проект",desc:"Первичная структурированная оценка исходной возможности: актив, идея, участок или бизнес.",basis:"Небольшой аналитический проект; итог зависит от объёма исходных данных."},
 site:{cat:"01 · Аналитика",name:"Анализ площадки",price:15000,unit:"площадка",desc:"Desk-анализ участка/территории: доступ, окружение, ограничения, инфраструктура и первичная пригодность.",basis:"Полевые изыскания и официальные заключения не входят."},
 market:{cat:"01 · Аналитика",name:"Исследование рынка",price:27000,unit:"рынок",desc:"Анализ спроса, аудитории, конкурентов, предложения и рыночной позиции проекта.",basis:"Глубина и география исследования влияют на итоговую стоимость."},
 feasibility:{cat:"01 · Аналитика",name:"Feasibility Study",price:45000,unit:"проект",desc:"Проверка жизнеспособности проекта: рынок, продукт, экономика, риски и варианты развития.",basis:"Комплексный аналитический этап; масштаб проекта влияет на стоимость."},
 concept:{cat:"02 · Разработка",name:"Концепция проекта",price:55000,unit:"проект",desc:"Формирование продукта, аудитории, сценариев использования, позиционирования и структуры реализации.",basis:"Многодисциплинарная проектная разработка."},
 economics:{cat:"02 · Разработка",name:"Экономическая модель",price:35000,unit:"модель",desc:"CAPEX/OPEX, выручка, сценарии, KPI, break-even, payback и чувствительность.",basis:"Финансовое моделирование на основании предоставленных исходных данных."},
 businessplan:{cat:"02 · Разработка",name:"Бизнес-план / инвестиционная модель",price:65000,unit:"проект",desc:"Рынок + продукт + финансовая модель + инвестиционная логика + риски.",basis:"Средний проектный объём; сложные задачи считаются отдельно."},
 investment:{cat:"02 · Разработка",name:"Инвестиционная упаковка",price:45000,unit:"проект",desc:"Структурирование проекта для презентации инвестору: экономика, сценарии, потребность в капитале и риски.",basis:"Юридические документы и внешние расходы не входят."},
 roadmap:{cat:"03 · Управление",name:"Проектный roadmap",price:18000,unit:"проект",desc:"Этапы, зависимости, контрольные точки, роли, ресурсы и следующий управленческий шаг.",basis:"Самостоятельный проектный этап без постоянного управления."},
 pm:{cat:"03 · Управление",name:"Project Management",price:45000,unit:"месяц",desc:"Координация задач, участников, сроков, решений и проектного контура.",basis:"Месячный ориентир; фактическая нагрузка подтверждается отдельно."},
 devmgmt:{cat:"03 · Управление",name:"Development Management",price:65000,unit:"месяц",desc:"Комплексное управление развитием проекта: продукт, подрядчики, экономика, сроки и коммерческие решения.",basis:"Постоянная функция с индивидуальным объёмом."},
 commercial:{cat:"03 · Управление",name:"Коммерческая архитектура",price:30000,unit:"этап",desc:"Модель продукта, каналов продаж, предложения, цены и коммерческой логики.",basis:"Маркетинговый бюджет и рекламные расходы не входят."},
 custom:{cat:"04 · Custom",name:"Custom Project Development",price:0,unit:"индивидуально",desc:"Разработка проекта под уникальную задачу клиента.",basis:"Цена формируется после анализа исходных данных."}
};
const PROJECTS=[
["ALADIN RESIDENCE",195000,"Анализ площадки + рынок + концепция + экономика + инвестиционная упаковка + roadmap"],
["NEXUS WORK",180000,"Рынок + концепция business hub + экономика + инвестиционная упаковка + roadmap"],
["CARPATHIA ECO LODGE",207000,"Рынок + концепция hospitality + экономика + инвестиционная упаковка + roadmap + расширенный продуктовый контур"],
["AGROHUB",195000,"Рынок + ресурсный контур + концепция + экономика + инвестиционная упаковка + roadmap"],
["NEXUS LOGISTICS",207000,"Рынок + логистический контур + концепция + экономика + инвестиционная упаковка + roadmap + расширенный операционный контур"],
["ENERGY PARK",222000,"Ресурс/нагрузка + концепция + экономика + инвестиционная упаковка + roadmap + расширенная системная проработка"]
];
PROJECTS.forEach(x=>{CATALOG["project:"+x[0]]={cat:"01B · Project products",name:x[0]+" — разработка",price:x[1],unit:"пакет",desc:"Разработка проектного продукта MMW по утверждённой концепции направления.",basis:x[2]}});

function cleanPhone(v){let p=String(v||"").trim().replace(/\D/g,"");if(p.startsWith("00"))p=p.slice(2);return p.slice(0,15)}
function hashCode(code,salt){return crypto.scryptSync(String(code),salt,32).toString("hex")}
function makeCode(){return String(crypto.randomInt(10000,100000))}
function nextOrderNumber(){const year=new Date().getFullYear();return "MMW-"+year+"-"+String(orderSeq++).padStart(6,"0")}
function json(res,status,data){const body=JSON.stringify(data);res.writeHead(status,{"Content-Type":"application/json; charset=utf-8","Content-Length":Buffer.byteLength(body),"Cache-Control":"no-store","X-Content-Type-Options":"nosniff"});res.end(body);return true}
function body(req){return new Promise((resolve,reject)=>{let s="";req.on("data",c=>{s+=c;if(s.length>300000){reject(new Error("payload too large"));req.destroy()}});req.on("end",()=>{try{resolve(JSON.parse(s||"{}"))}catch{reject(new Error("invalid json"))}});req.on("error",reject)})}
function readOrders(){try{return JSON.parse(fs.readFileSync(ordersFile,"utf8")||"[]")}catch{return[]}}
function saveOrders(items){writeQueue=writeQueue.then(()=>fs.promises.writeFile(ordersFile,JSON.stringify(items,null,2),"utf8"));return writeQueue}
function itemFromRequest(x){
 const id=String(x?.id||"");
 const meta=CATALOG[id];
 if(!meta)return null;
 const qty=Math.max(1,Math.min(99,Number.parseInt(x.qty,10)||1));
 return {id,name:meta.name,category:meta.cat,description:meta.desc,basis:meta.basis,unit:meta.unit,unitPrice:meta.price,quantity:qty,lineTotal:meta.price*qty,custom:meta.price===0};
}
function detailedOrder(o){
 return {orderNumber:o.orderNumber,status:o.status,createdAt:o.createdAt,updatedAt:o.updatedAt||o.createdAt,customer:{name:o.name,phoneMasked:o.phoneMasked,email:o.email},items:o.items,pricing:{subtotal:o.subtotal,total:o.total,currency:"UAH",individualItems:o.items.filter(x=>x.custom).map(x=>x.name)},comment:o.comment,access:{phoneRequired:true,codeDigits:5},notice:"Выписка фиксирует зарегистрированный запрос и ориентировочную стоимость. Договор, окончательная смета и обязательство выполнить внешние расходы оформляются отдельно."};
}
function findOrder(phone,code){const p=cleanPhone(phone),c=String(code||"").replace(/\D/g,"");if(p.length<7||!/^[0-9]{5}$/.test(c))return null;return readOrders().find(o=>o.phone===p&&o.accessHash===hashCode(c,o.accessSalt))||null}
function statementPdf(res,o){
 const doc=new PDFDocument({size:"A4",margin:44,info:{Title:"MMW-COMPANY · ВЫПИСКА ЗАКАЗА "+o.orderNumber,Author:"MMW-COMPANY"}});
 res.writeHead(200,{"Content-Type":"application/pdf","Content-Disposition":'attachment; filename="MMW-COMPANY-'+o.orderNumber+'.pdf"',"Cache-Control":"no-store","X-Content-Type-Options":"nosniff"});doc.pipe(res);
 const regular=fs.existsSync(fontRegular)?fontRegular:"Helvetica",bold=fs.existsSync(fontBold)?fontBold:"Helvetica-Bold",money=n=>n?Number(n).toLocaleString("uk-UA")+" грн":"Индивидуально";
 const title=(t,s)=>{doc.font(bold).fontSize(10).fillColor("#0b705b").text(t);doc.font(regular).fontSize(9).fillColor("#061a17").text(s);doc.moveDown(.45)};
 doc.font(bold).fontSize(21).fillColor("#061a17").text("MMW-COMPANY");doc.font(regular).fontSize(8).fillColor("#0b705b").text("ПОДРОБНАЯ ВЫПИСКА ЗАКАЗА · COMMERCIAL PROJECT DEVELOPMENT");
 doc.moveDown(.7);doc.moveTo(44,88).lineTo(551,88).strokeColor("#c8ad72").lineWidth(1).stroke();doc.moveDown(1);
 doc.font(bold).fontSize(15).fillColor("#061a17").text("ЗАКАЗ "+o.orderNumber);doc.font(regular).fontSize(8.5).fillColor("#65736e").text("Зарегистрированный запрос · состав · стоимость · статус · данные клиента");doc.moveDown(1);
 title("СТАТУС",o.status==="NEW"?"Новая":o.status);title("ДАТА И ВРЕМЯ",new Date(o.createdAt).toLocaleString("uk-UA"));title("КЛИЕНТ",o.name);title("ТЕЛЕФОН",o.phoneMasked);title("EMAIL",o.email);
 doc.moveDown(.4);doc.font(bold).fontSize(11).fillColor("#061a17").text("СОСТАВ ЗАКАЗА");doc.moveDown(.45);
 o.items.forEach((x,i)=>{doc.font(bold).fontSize(9).fillColor("#061a17").text((i+1)+". "+x.name);doc.font(regular).fontSize(8).fillColor("#65736e").text(x.category+" · "+x.unit);doc.font(regular).fontSize(8.5).fillColor("#061a17").text("Количество: "+x.quantity+"  |  Цена за единицу: "+money(x.unitPrice)+"  |  Сумма: "+money(x.lineTotal));doc.font(regular).fontSize(8).fillColor("#65736e").text("Результат: "+x.description);doc.font(regular).fontSize(8).fillColor("#65736e").text("Основание цены: "+x.basis);doc.moveDown(.55)});
 doc.moveTo(44,doc.y).lineTo(551,doc.y).strokeColor("#d8dedb").lineWidth(.7).stroke();doc.moveDown(.6);
 doc.font(bold).fontSize(12).fillColor("#061a17").text("ИТОГ: "+money(o.total));doc.font(regular).fontSize(8).fillColor("#65736e").text("Индивидуальные позиции: "+(o.items.some(x=>x.custom)?"есть":"нет"));doc.moveDown(.9);
 if(o.comment){doc.font(bold).fontSize(9).fillColor("#0b705b").text("ЗАДАЧА / КОММЕНТАРИЙ КЛИЕНТА");doc.font(regular).fontSize(8.5).fillColor("#061a17").text(o.comment,{width:500});doc.moveDown(.8)}
 doc.font(bold).fontSize(9).fillColor("#0b705b").text("ДОСТУП К ЖУРНАЛУ");doc.font(regular).fontSize(8.5).fillColor("#061a17").text("Для повторного доступа используйте тот же номер телефона и персональный код из 5 цифр, выданный при оформлении заказа.");
 doc.moveDown(.8);doc.font(regular).fontSize(7.8).fillColor("#65736e").text("Документ фиксирует зарегистрированный заказ и ориентир стоимости на момент оформления. Он не является договором, счётом на оплату или окончательной сметой. Внешние расходы, государственные сборы, подрядчики и работы, не включённые в состав заказа, оплачиваются/согласовываются отдельно.");
 doc.moveDown(.5);doc.font(bold).fontSize(8).fillColor("#0b705b").text("MMW-COMPANY · itimchenko00@gmail.com");doc.end();
}
async function handleApi(req,res,u){
 if(req.method==="GET"&&u==="/api/health")return json(res,200,{ok:true,service:"MMW-COMPANY",catalogItems:Object.keys(CATALOG).length,storage:"file"});
 if(req.method==="POST"&&u==="/api/orders"){
  try{
   const b=await body(req),name=String(b.name||"").trim(),phone=cleanPhone(b.phone),email=String(b.email||"").trim(),comment=String(b.comment||"").trim();
   const requested=Array.isArray(b.items)?b.items.slice(0,50):[];
   if(name.length<2||phone.length<7||!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||comment.length<5||!requested.length)return json(res,400,{ok:false,error:"Заполните имя, международный телефон, email, описание задачи и добавьте хотя бы одну позицию."});
   const items=requested.map(itemFromRequest).filter(Boolean);if(!items.length)return json(res,400,{ok:false,error:"Позиции заказа не распознаны. Обновите каталог и повторите выбор."});
   const orders=readOrders(),orderNumber=nextOrderNumber(),code=makeCode(),salt=crypto.randomBytes(16).toString("hex"),subtotal=items.reduce((s,x)=>s+x.lineTotal,0);
   const order={orderNumber,name,phone,phoneMasked:phone.length>5?"+"+phone.slice(0,3)+"••••"+phone.slice(-2):"••••••",email,comment,items,subtotal,total:subtotal,status:"NEW",createdAt:new Date().toISOString(),accessSalt:salt,accessHash:hashCode(code,salt)};
   orders.push(order);await saveOrders(orders);
   const detail=detailedOrder(order);
   console.log("MMW ORDER CREATED",JSON.stringify({orderNumber,phone,items:items.map(x=>({id:x.id,quantity:x.quantity,lineTotal:x.lineTotal})),total:subtotal}));
   return json(res,201,{ok:true,orderNumber,accessCode:code,status:order.status,total:subtotal,order:detail});
  }catch(e){console.error("MMW ORDER ERROR",e);return json(res,500,{ok:false,error:"Не удалось зарегистрировать заказ. Заявка не создана. Повторите отправку."})}
 }
 if(req.method==="POST"&&u==="/api/orders/access"){
  try{const b=await body(req),phone=cleanPhone(b.phone),code=String(b.code||"").replace(/\D/g,""),key=(req.socket.remoteAddress||"")+"|"+phone,now=Date.now();let a=accessAttempts.get(key)||{count:0,until:0};if(a.until>now&&a.count>=5)return json(res,429,{ok:false,error:"Слишком много попыток. Повторите через 10 минут."});if(a.until<=now)a={count:0,until:now+600000};a.count++;accessAttempts.set(key,a);if(phone.length<7||!/^[0-9]{5}$/.test(code))return json(res,400,{ok:false,error:"Введите международный телефон и код из 5 цифр."});const order=findOrder(phone,code);if(!order)return json(res,401,{ok:false,error:"Заявка не найдена или код неверен."});accessAttempts.delete(key);return json(res,200,{ok:true,order:detailedOrder(order)})}catch(e){return json(res,400,{ok:false,error:"Ошибка проверки доступа"})}
 }
 if(req.method==="POST"&&u==="/api/orders/pdf"){
  try{const b=await body(req),order=findOrder(b.phone,b.code);if(!order)return json(res,401,{ok:false,error:"Заявка не найдена или код неверен."});if(b.orderNumber&&String(b.orderNumber)!==order.orderNumber)return json(res,403,{ok:false,error:"Доступ к этой выписке не подтверждён."});return statementPdf(res,order)}catch(e){if(!res.headersSent)return json(res,500,{ok:false,error:"Не удалось сформировать PDF-выписку."});res.end()}
 }
 return false;
}
const existing=readOrders();if(existing.length)orderSeq=existing.reduce((m,o)=>Math.max(m,Number(String(o.orderNumber||"").split("-").pop())||0),0)+1;
const server=http.createServer(async(req,res)=>{const u=(req.url||"/").split("?")[0];if(u.startsWith("/api/")){const done=await handleApi(req,res,u);if(done!==false)return}let clean;try{clean=decodeURIComponent(u)}catch{res.writeHead(400);return res.end("Bad request")}if(clean==="/"||!clean.includes("."))clean="/catalog.html";let f=path.join(root,clean.replace(/^\//,""));if(!f.startsWith(root)){res.writeHead(403);return res.end("Forbidden")}fs.readFile(f,(e,d)=>{if(e){res.writeHead(404,{"Content-Type":"text/plain; charset=utf-8"});return res.end("Not found")}const ext=path.extname(f),types={".html":"text/html; charset=utf-8",".css":"text/css",".js":"text/javascript",".svg":"image/svg+xml",".json":"application/json"};res.writeHead(200,{"Content-Type":types[ext]||"application/octet-stream","Cache-Control":"no-store","X-Content-Type-Options":"nosniff"});res.end(d)})});
server.listen(port,"0.0.0.0",()=>console.log("MMW-COMPANY on "+port));