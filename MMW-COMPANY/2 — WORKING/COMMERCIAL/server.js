const http=require("http");
const crypto=require("crypto");
const fs=require("fs");
const path=require("path");
const PDFDocument=require("pdfkit");
const {Pool}=require("pg");

const PORT=Number(process.env.PORT||3000);
const DATABASE_URL=process.env.DATABASE_URL||"";
const ACCESS_CODE_SECRET=process.env.ACCESS_CODE_SECRET||DATABASE_URL;
const COMPANY_EMAIL=process.env.COMPANY_EMAIL||"itimchenko00@gmail.com";
const ADMIN_SECRET=process.env.ADMIN_SECRET||"";
const loginAttempts=new Map();
const pool=DATABASE_URL?new Pool({connectionString:DATABASE_URL,ssl:DATABASE_URL.includes("render.com")?{rejectUnauthorized:false}:undefined,max:5}):null;
const schemaPath=path.join(__dirname,"schema.sql");
const FALLBACK_CATALOG=[
{id:"project-audit",kind:"service",project:null,name:"Предпроектный аудит",description:"Первичная проверка возможности: исходные данные, рынок, площадка и ключевые вопросы реализации.",price_uah:15000,price_note:"15 000 ₴ / проект",image_path:"https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/01-project-audit.jpg",sort_order:10},
{id:"project-concept",kind:"service",project:null,name:"PROJECT CONCEPT",description:"Разработка и структурирование концепции проекта с продуктовой логикой и планом дальнейшей проверки.",price_uah:49000,price_note:"49 000 ₴ / проект",image_path:"https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/02-project-concept.jpg",sort_order:20},
{id:"business-project",kind:"service",project:null,name:"BUSINESS PROJECT",description:"Бизнес-модель, финансовый контур, план запуска и рабочая структура проекта.",price_uah:119000,price_note:"119 000 ₴ / проект",image_path:"https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/03-business-project.jpg",sort_order:30},
{id:"investment-project",kind:"service",project:null,name:"INVESTMENT PROJECT",description:"Инвестиционная упаковка, экономика, структура сделки и материалы для работы с капиталом.",price_uah:169000,price_note:"169 000 ₴ / проект",image_path:"https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/04-investment-project.jpg",sort_order:40},
{id:"business-system",kind:"service",project:null,name:"BUSINESS SYSTEM",description:"Проектирование управленческой и операционной системы: процессы, роли, контроль и KPI.",price_uah:249000,price_note:"249 000 ₴ / проект",image_path:"https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/05-business-system.jpg",sort_order:50},
{id:"business-restart",kind:"service",project:null,name:"BUSINESS RESTART",description:"Диагностика действующего бизнеса, новая модель, план изменений и приоритеты.",price_uah:99000,price_note:"99 000 ₴ / проект",image_path:"https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/06-business-restart.jpg",sort_order:60},
{id:"business-investor",kind:"service",project:null,name:"BUSINESS + INVESTOR",description:"Бизнес-проект и комплексная подготовка к работе с инвестором.",price_uah:229000,price_note:"229 000 ₴ / проект",image_path:"https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/07-business-investor.jpg",sort_order:70},
{id:"custom-business-project",kind:"service",project:null,name:"CUSTOM BUSINESS PROJECT",description:"Индивидуальный комплексный проект под нестандартную задачу.",price_uah:299000,price_note:"299 000 ₴ / проект · Индивидуальный формат · от",image_path:"https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/08-custom-business-project.jpg",sort_order:80},
{id:"large-scale",kind:"service",project:null,name:"LARGE SCALE",description:"Крупный комплексный проект с расширенным сопровождением.",price_uah:499000,price_note:"499 000 ₴ / проект · Индивидуальный формат · от",image_path:"https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/09-large-scale.jpg",sort_order:90},
{id:"extended-estimate",kind:"service",project:null,name:"Расширенная смета",description:"Детализированный расчёт стоимости по согласованным исходным данным.",price_uah:12000,price_note:"12 000 ₴ / задача",image_path:"https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/10-estimate.jpg",sort_order:100},
{id:"site-survey",kind:"service",project:null,name:"Выезд / обследование объекта",description:"Первичное обследование площадки или объекта и фиксация исходных данных.",price_uah:8000,price_note:"8 000 ₴ / выезд",image_path:"https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/11-site-survey.jpg",sort_order:110},
{id:"document-set",kind:"service",project:null,name:"Дополнительный комплект документов",description:"Подготовка дополнительного набора рабочих форм и документов.",price_uah:7500,price_note:"7 500 ₴ / комплект",image_path:"https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/12-docs.jpg",sort_order:120},
{id:"project-support",kind:"service",project:null,name:"Проектное сопровождение",description:"Координация задач, участников, сроков и контрольных точек проекта.",price_uah:18000,price_note:"18 000 ₴ / месяц",image_path:"https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/13-management.jpg",sort_order:130},
{id:"urgent",kind:"service",project:null,name:"Срочное оформление",description:"Приоритетная подготовка согласованного объёма работ.",price_uah:10000,price_note:"10 000 ₴ / задача",image_path:"https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/14-urgent.jpg",sort_order:140},
{id:"aladin-start",kind:"service",project:"ALADIN RESIDENCE",name:"ALADIN RESIDENCE · старт проекта",description:"Стартовая предпроектная оценка конкретного проекта MMW-COMPANY.",price_uah:15000,price_note:"15 000 ₴ / проект",image_path:"https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/15-aladin-residence.jpg",sort_order:150},
{id:"nexus-work-start",kind:"service",project:"NEXUS WORK",name:"NEXUS WORK · старт проекта",description:"Стартовая предпроектная оценка конкретного проекта MMW-COMPANY.",price_uah:15000,price_note:"15 000 ₴ / проект",image_path:"https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/16-carpathia-eco-lodge.jpg",sort_order:160},
{id:"nexus-logistics-start",kind:"service",project:"NEXUS LOGISTICS",name:"NEXUS LOGISTICS · старт проекта",description:"Стартовая предпроектная оценка конкретного проекта MMW-COMPANY.",price_uah:15000,price_note:"15 000 ₴ / проект",image_path:"https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/18-nexus-logistics.jpg",sort_order:170},
{id:"carpathia-start",kind:"service",project:"CARPATHIA ECO LODGE",name:"CARPATHIA ECO LODGE · старт проекта",description:"Стартовая предпроектная оценка конкретного проекта MMW-COMPANY.",price_uah:15000,price_note:"15 000 ₴ / проект",image_path:"https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/16-carpathia-eco-lodge.jpg",sort_order:180},
{id:"agrohub-start",kind:"service",project:"AGROHUB",name:"AGROHUB · старт проекта",description:"Стартовая предпроектная оценка конкретного проекта MMW-COMPANY.",price_uah:15000,price_note:"15 000 ₴ / проект",image_path:"https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/19-agrohub.jpg",sort_order:190},
{id:"energy-park-start",kind:"service",project:"ENERGY PARK",name:"ENERGY PARK · старт проекта",description:"Стартовая предпроектная оценка конкретного проекта MMW-COMPANY.",price_uah:15000,price_note:"15 000 ₴ / проект",image_path:"https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/20-energy-park.jpg",sort_order:200}
];

function json(res,status,payload){res.writeHead(status,{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"});res.end(JSON.stringify(payload));}
function normalizePhone(v){const s=String(v||"").trim().replace(/[\s().-]/g,"");if(/^00[1-9][0-9]{7,14}$/.test(s))return "+"+s.slice(2);if(/^\+[1-9][0-9]{7,14}$/.test(s))return s;throw Error("invalid_phone");}
function normalizeEmail(v){const s=String(v||"").trim().toLowerCase();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)||s.length>254)throw Error("invalid_email");return s;}
function normalizeName(v){const s=String(v||"").trim().replace(/\s+/g," ");if(s.length<2||s.length>160)throw Error("invalid_name");return s;}
function normalizeItems(items){if(!Array.isArray(items)||!items.length||items.length>50)throw Error("invalid_items");const seen=new Set();return items.map(x=>{const id=String(x?.id||"").trim(),q=Number(x?.quantity);if(!id||seen.has(id)||!Number.isInteger(q)||q<1||q>999)throw Error("invalid_items");seen.add(id);return{id,quantity:q};});}
function orderNumber(){return String(crypto.randomInt(1,10))+Array.from({length:11},()=>crypto.randomInt(0,10)).join("");}
function accessCode(n){const key=ACCESS_CODE_SECRET||"mmw-commercial";return String(crypto.createHmac("sha256",key).update(n).digest().readUInt32BE(0)%100000).padStart(5,"0");}
function hashCode(c){return crypto.createHash("sha256").update(c).digest("hex");}
function same(a,b){const x=Buffer.from(a,"hex"),y=Buffer.from(b,"hex");return x.length===y.length&&crypto.timingSafeEqual(x,y);}
async function body(req){const a=[];let n=0;for await(const c of req){n+=c.length;if(n>262144)throw Error("payload_too_large");a.push(c);}const s=Buffer.concat(a).toString();return s?JSON.parse(s):{};}
async function schema(){if(!pool)return false;await pool.query("CREATE EXTENSION IF NOT EXISTS pgcrypto");await pool.query(fs.readFileSync(schemaPath,"utf8"));return true;}

async function catalog(){
 if(!pool)return{version:3,status:"degraded",currency:"UAH",items:FALLBACK_CATALOG};
 try{
  const r=await pool.query(`SELECT id,kind,project,name,description,price_uah,price_note,image_path,sort_order FROM catalog_items WHERE active=TRUE ORDER BY sort_order,id`);
  return{version:3,status:"ready",currency:"UAH",items:r.rows.map(x=>({...x,price_uah:Number(x.price_uah)}))};
 }catch(e){
  console.error("catalog database unavailable; serving controlled fallback catalog:",e.message);
  return{version:3,status:"degraded",currency:"UAH",items:FALLBACK_CATALOG};
 }
}

async function createOrder(i){
 if(!pool){const e=Error("database_not_configured");e.status=503;throw e;}
 const name=normalizeName(i.name),phone=normalizePhone(i.phone),email=normalizeEmail(i.email),comment=String(i.comment||"").trim(),project=i.project?String(i.project).trim().slice(0,160):null;
 if(comment.length>2000)throw Error("invalid_comment");
 const req=normalizeItems(i.items),c=await pool.connect();
 try{
  await c.query("BEGIN");
  const ids=req.map(x=>x.id);
  const cat=await c.query(`SELECT id,kind,project,name,description,price_uah FROM catalog_items WHERE active=TRUE AND id=ANY($1::text[]) FOR SHARE`,[ids]);
  const m=new Map(cat.rows.map(x=>[x.id,x]));if(m.size!==ids.length)throw Error("catalog_item_unavailable");
  const lines=req.map(x=>{const r=m.get(x.id),u=Number(r.price_uah);return{...r,quantity:x.quantity,unitPrice:u,lineTotal:u*x.quantity};});
  const total=lines.reduce((s,x)=>s+x.lineTotal,0);
  let cr=await c.query(`SELECT id FROM customers WHERE phone_e164=$1 AND email=$2 LIMIT 1`,[phone,email]);
  let customerId;
  if(cr.rowCount){customerId=cr.rows[0].id;await c.query("UPDATE customers SET name=$1 WHERE id=$2",[name,customerId]);}
  else customerId=(await c.query(`INSERT INTO customers(name,phone_e164,email) VALUES($1,$2,$3) RETURNING id`,[name,phone,email])).rows[0].id;
  let number;for(let n=0;n<30;n++){const x=orderNumber();if(!(await c.query("SELECT 1 FROM orders WHERE order_number=$1",[x])).rowCount){number=x;break;}}if(!number)throw Error("order_number_generation_failed");
  const code=accessCode(number);
  const o=(await c.query(`INSERT INTO orders(order_number,access_code_hash,customer_id,project,total_uah,note) VALUES($1,$2,$3,$4,$5,$6) RETURNING id,order_number,status,currency,total_uah,created_at`,[number,hashCode(code),customerId,project,total.toFixed(2),comment])).rows[0];
  for(const x of lines)await c.query(`INSERT INTO order_items(order_id,catalog_item_id,item_kind,item_project,item_name,item_description,quantity,unit_price_uah,line_total_uah) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)`,[o.id,x.id,x.kind,x.project,x.name,x.description,x.quantity,x.unitPrice.toFixed(2),x.lineTotal.toFixed(2)]);
  await c.query(`INSERT INTO order_documents(order_id,type,version) VALUES($1,'statement',1)`,[o.id]);
  await c.query(`INSERT INTO order_events(order_id,event_type,status,details) VALUES($1,'created',$2,$3)`,[o.id,"new",JSON.stringify({source:"commercial_api"})]);
  await c.query("COMMIT");
  return{order:{id:o.id,order_number:o.order_number,access_code:code,status:o.status,currency:o.currency,total_uah:Number(o.total_uah),created_at:o.created_at},customer:{name,phone,email},items:lines};
 }catch(e){await c.query("ROLLBACK");throw e;}finally{c.release();}
}

async function authorize(i){
 if(!pool){const e=Error("database_not_configured");e.status=503;throw e;}
 const phone=normalizePhone(i.phone),number=String(i.orderNumber||"").trim(),code=String(i.code||"").trim();
 if(!/^\d{12}$/.test(number)||!/^\d{5}$/.test(code))throw Error("invalid_credentials");
 const r=await pool.query(`SELECT o.*,c.name customer_name,c.phone_e164,c.email FROM orders o JOIN customers c ON c.id=o.customer_id WHERE o.order_number=$1 AND c.phone_e164=$2`,[number,phone]);
 if(!r.rowCount||!same(r.rows[0].access_code_hash,hashCode(code))){const e=Error("invalid_credentials");e.status=401;throw e;}
 return r.rows[0];
}
async function journal(i){
 const o=await authorize(i);
 const [items,msg]=await Promise.all([
  pool.query(`SELECT catalog_item_id id,item_kind,item_project,item_name,item_description,quantity,unit_price_uah,line_total_uah FROM order_items WHERE order_id=$1 ORDER BY id`,[o.id]),
  pool.query(`SELECT id,author_type,message,created_at,read_at FROM order_messages WHERE order_id=$1 ORDER BY id`,[o.id])
 ]);
 await pool.query(`UPDATE order_messages SET read_at=NOW() WHERE order_id=$1 AND author_type='company' AND read_at IS NULL`,[o.id]);
 return{order:{order_number:o.order_number,project:o.project,status:o.status,currency:o.currency,total_uah:Number(o.total_uah),note:o.note,created_at:o.created_at,updated_at:o.updated_at},customer:{name:o.customer_name,phone:o.phone_e164,email:o.email},items:items.rows.map(x=>({...x,unit_price_uah:Number(x.unit_price_uah),line_total_uah:Number(x.line_total_uah)})),messages:msg.rows};
}
function rateLimit(key,windowMs=10*60*1000,max=8){const now=Date.now(),a=(loginAttempts.get(key)||[]).filter(t=>now-t<windowMs);if(a.length>=max){const e=Error("too_many_attempts");e.status=429;throw e;}a.push(now);loginAttempts.set(key,a);}
function adminAuth(i){if(!ADMIN_SECRET){const e=Error("admin_not_configured");e.status=503;throw e;}if(!i||Buffer.byteLength(String(i))!==Buffer.byteLength(ADMIN_SECRET)||!crypto.timingSafeEqual(Buffer.from(String(i),"utf8"),Buffer.from(ADMIN_SECRET,"utf8"))){const e=Error("admin_unauthorized");e.status=401;throw e;}}
async function adminOrders(i){adminAuth(i);if(!pool){const e=Error("database_not_configured");e.status=503;throw e;}const r=await pool.query(`SELECT o.order_number,o.project,o.status,o.currency,o.total_uah,o.created_at,o.updated_at,c.name,c.phone_e164,c.email FROM orders o JOIN customers c ON c.id=o.customer_id ORDER BY o.created_at DESC LIMIT 200`);return r.rows.map(x=>({...x,total_uah:Number(x.total_uah)}));}
async function adminStatus(i){adminAuth(i?.secret);if(!pool){const e=Error("database_not_configured");e.status=503;throw e;}const n=String(i.orderNumber||"").trim(),s=String(i.status||"").trim();if(!/^\d{12}$/.test(n)||!['new','review','contact','proposal','confirmed','in_progress','completed','cancelled'].includes(s))throw Error("invalid_status");const c=await pool.connect();try{await c.query("BEGIN");const r=await c.query("UPDATE orders SET status=$1 WHERE order_number=$2 RETURNING id,status",[s,n]);if(!r.rowCount){const e=Error("order_not_found");e.status=404;throw e;}await c.query(`INSERT INTO order_events(order_id,event_type,status,details) VALUES($1,'status_changed',$2,$3)`,[r.rows[0].id,s,JSON.stringify({source:"admin"})]);await c.query("COMMIT");return{ok:true,order_number:n,status:s};}catch(e){await c.query("ROLLBACK");throw e;}finally{c.release();}}
async function adminMessage(i){adminAuth(i?.secret);if(!pool){const e=Error("database_not_configured");e.status=503;throw e;}const n=String(i.orderNumber||"").trim(),m=String(i.message||"").trim();if(!/^\d{12}$/.test(n)||!m||m.length>4000)throw Error("invalid_message");const r=await pool.query(`SELECT id,status FROM orders WHERE order_number=$1`,[n]);if(!r.rowCount){const e=Error("order_not_found");e.status=404;throw e;}const x=await pool.query(`INSERT INTO order_messages(order_id,author_type,message) VALUES($1,'company',$2) RETURNING id,author_type,message,created_at`,[r.rows[0].id,m]);await pool.query(`INSERT INTO order_events(order_id,event_type,status,details) VALUES($1,'company_message',$2,$3)`,[r.rows[0].id,r.rows[0].status,JSON.stringify({message_id:x.rows[0].id})]);return x.rows[0];}
async function message(i){const o=await authorize(i),m=String(i.message||"").trim();if(!m||m.length>4000)throw Error("invalid_message");const r=await pool.query(`INSERT INTO order_messages(order_id,author_type,message) VALUES($1,'customer',$2) RETURNING id,author_type,message,created_at`,[o.id,m]);await pool.query(`INSERT INTO order_events(order_id,event_type,status,details) VALUES($1,'customer_message',$2,$3)`,[o.id,o.status,JSON.stringify({message_id:r.rows[0].id})]);return r.rows[0];}
function statusLabel(s){return({new:"Заявка получена",review:"Заявка рассматривается",contact:"Связываемся с вами",proposal:"Готовим предложение",confirmed:"Работа подтверждена",in_progress:"Проект в работе",completed:"Завершено",cancelled:"Заявка отменена"})[s]||s;}

async function pdf(i){
 const o=await authorize(i),j=await journal(i);
 const doc=new PDFDocument({size:"A4",margin:48,info:{Title:"MMW-COMPANY — заявление",Author:"MMW-COMPANY"}});
 const chunks=[];doc.on("data",x=>chunks.push(x));
 const done=new Promise((resolve,reject)=>{doc.on("end",()=>resolve(Buffer.concat(chunks)));doc.on("error",reject);});
 doc.fontSize(22).fillColor("#17352b").text("MMW-COMPANY");
 doc.fontSize(10).fillColor("#5b756b").text("Развитие проектов от возможности до результата");
 doc.moveDown().fontSize(16).fillColor("#17352b").text("Заявка / выписка");
 doc.fontSize(10).fillColor("#38544a").text("Номер: "+o.order_number).text("Дата: "+new Date(o.created_at).toLocaleString("uk-UA")).text("Статус: "+statusLabel(o.status));
 doc.moveDown().fontSize(12).fillColor("#17352b").text("Клиент");
 doc.fontSize(10).fillColor("#38544a").text("Имя: "+j.customer.name).text("Телефон: "+j.customer.phone).text("Email: "+j.customer.email);
 if(o.project)doc.text("Проект: "+o.project);
 doc.moveDown().fontSize(12).fillColor("#17352b").text("Состав заявки");
 j.items.forEach((x,n)=>doc.fontSize(10).fillColor("#38544a").text((n+1)+". "+x.item_name+" — "+x.quantity+" × "+x.unit_price_uah.toFixed(2)+" UAH = "+x.line_total_uah.toFixed(2)+" UAH"));
 doc.moveDown().fontSize(13).fillColor("#17352b").text("Итого: "+j.order.total_uah.toFixed(2)+" "+j.order.currency);
 if(o.note){doc.moveDown().fontSize(10).fillColor("#38544a").text("Комментарий: "+o.note);}
 doc.moveDown(1.5).fontSize(10).fillColor("#5b756b").text("Для журнала заявки используются номер заявки, телефон клиента и отдельный 5-значный код.");
 doc.moveDown().fillColor("#17352b").text("Контакт MMW-COMPANY: "+COMPANY_EMAIL);
 doc.end();const data=await done;if(pool){const contentHash=crypto.createHash("sha256").update(data).digest("hex");const vr=await pool.query("SELECT COALESCE(MAX(version),0)+1 AS version FROM order_documents WHERE order_id=$1 AND type='statement'",[o.id]);const version=Number(vr.rows[0].version);await pool.query("INSERT INTO order_documents(order_id,type,version,content_hash) VALUES($1,'statement',$2,$3)",[o.id,version,contentHash]);await pool.query("INSERT INTO order_events(order_id,event_type,status,details) VALUES($1,'pdf_generated',$2,$3)",[o.id,o.status,JSON.stringify({version,content_hash:contentHash})]);}return data;
}

async function handle(req,res){
 const u=new URL(req.url,"http://localhost");
 if((u.pathname==="/health"||u.pathname==="/healthz")&&req.method==="GET"){let db="not_configured";if(pool){try{await pool.query("SELECT 1");db="ready";}catch{db="unavailable";}}return json(res,db==="unavailable"?503:200,{ok:db!=="unavailable",service:"mmw-company-commercial",stage:"commercial-core-v1",database:db});}
 if(u.pathname==="/api/catalog"&&req.method==="GET")return json(res,200,await catalog());
 if(u.pathname==="/api/orders"&&req.method==="POST"){try{return json(res,201,await createOrder(await body(req)));}catch(e){const s=e.status||(["invalid_items","catalog_item_unavailable","invalid_name","invalid_phone","invalid_email","invalid_comment","payload_too_large"].includes(e.message)?400:500);return json(res,s,{ok:false,error:e.message||"internal_error"});}}
 if(u.pathname==="/api/journal"&&req.method==="POST"){try{const b=await body(req);rateLimit(String(b.phone||"")+":"+String(b.orderNumber||""));return json(res,200,{ok:true,...await journal(b)});}catch(e){return json(res,e.status||400,{ok:false,error:e.message||"invalid_credentials"});}}
 if(u.pathname==="/api/messages"&&req.method==="POST"){try{return json(res,201,{ok:true,message:await message(await body(req))});}catch(e){return json(res,e.status||400,{ok:false,error:e.message||"invalid_message"});}}
 if(u.pathname==="/api/admin/orders"&&req.method==="POST"){try{const b=await body(req);return json(res,200,{ok:true,orders:await adminOrders(b.secret)});}catch(e){return json(res,e.status||400,{ok:false,error:e.message||"admin_error"});}}
 if(u.pathname==="/api/admin/status"&&req.method==="POST"){try{return json(res,200,await adminStatus(await body(req)));}catch(e){return json(res,e.status||400,{ok:false,error:e.message||"admin_error"});}}
 if(u.pathname==="/api/admin/message"&&req.method==="POST"){try{return json(res,201,{ok:true,message:await adminMessage(await body(req))});}catch(e){return json(res,e.status||400,{ok:false,error:e.message||"admin_error"});}}
 if(u.pathname==="/api/orders/pdf"&&req.method==="POST"){try{const data=await pdf(await body(req));res.writeHead(200,{"Content-Type":"application/pdf","Content-Disposition":"attachment; filename=\"MMW-order.pdf\"","Cache-Control":"no-store"});return res.end(data);}catch(e){return json(res,e.status||400,{ok:false,error:e.message||"pdf_generation_failed"});}}
 if(u.pathname==="/"&&req.method==="GET"){const f=path.join(__dirname,"index.html");if(fs.existsSync(f)){res.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"});return res.end(fs.readFileSync(f));}return json(res,200,{ok:true,service:"mmw-company-commercial"});}
 return json(res,404,{ok:false,error:"not_found"});
}
(async()=>{try{try{await schema();}catch(e){console.error("database initialization failed; service remains available:",e.message);}const s=http.createServer((q,r)=>handle(q,r).catch(e=>{console.error(e);json(r,500,{ok:false,error:"internal_error"});}));s.listen(PORT,"0.0.0.0",()=>console.log("commercial contour listening"));}catch(e){console.error(e);process.exit(1);}})();