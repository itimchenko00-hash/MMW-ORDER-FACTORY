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
const pool=DATABASE_URL?new Pool({connectionString:DATABASE_URL,ssl:DATABASE_URL.includes("render.com")?{rejectUnauthorized:false}:undefined,max:5}):null;
const schemaPath=path.join(__dirname,"schema.sql");

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

async function catalog(){if(!pool)return{version:3,status:"not_configured",currency:"UAH",items:[]};const r=await pool.query(`SELECT id,kind,project,name,description,price_uah,price_note,sort_order FROM catalog_items WHERE active=TRUE ORDER BY sort_order,id`);return{version:3,status:"ready",currency:"UAH",items:r.rows.map(x=>({...x,price_uah:Number(x.price_uah)}))};}

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
 doc.end();return done;
}

async function handle(req,res){
 const u=new URL(req.url,"http://localhost");
 if((u.pathname==="/health"||u.pathname==="/healthz")&&req.method==="GET"){let db="not_configured";if(pool){try{await pool.query("SELECT 1");db="ready";}catch{db="unavailable";}}return json(res,db==="unavailable"?503:200,{ok:db!=="unavailable",service:"mmw-company-commercial",stage:"commercial-core-v1",database:db});}
 if(u.pathname==="/api/catalog"&&req.method==="GET")return json(res,200,await catalog());
 if(u.pathname==="/api/orders"&&req.method==="POST"){try{return json(res,201,await createOrder(await body(req)));}catch(e){const s=e.status||(["invalid_items","catalog_item_unavailable","invalid_name","invalid_phone","invalid_email","invalid_comment","payload_too_large"].includes(e.message)?400:500);return json(res,s,{ok:false,error:e.message||"internal_error"});}}
 if(u.pathname==="/api/journal"&&req.method==="POST"){try{return json(res,200,{ok:true,...await journal(await body(req))});}catch(e){return json(res,e.status||400,{ok:false,error:e.message||"invalid_credentials"});}}
 if(u.pathname==="/api/messages"&&req.method==="POST"){try{return json(res,201,{ok:true,message:await message(await body(req))});}catch(e){return json(res,e.status||400,{ok:false,error:e.message||"invalid_message"});}}
 if(u.pathname==="/api/orders/pdf"&&req.method==="POST"){try{const data=await pdf(await body(req));res.writeHead(200,{"Content-Type":"application/pdf","Content-Disposition":"attachment; filename=\"MMW-order.pdf\"","Cache-Control":"no-store"});return res.end(data);}catch(e){return json(res,e.status||400,{ok:false,error:e.message||"pdf_generation_failed"});}}
 if(u.pathname==="/")return json(res,200,{ok:true,service:"mmw-company-commercial",message:"Commercial contour is isolated from the public site."});
 return json(res,404,{ok:false,error:"not_found"});
}
(async()=>{try{await schema();const s=http.createServer((q,r)=>handle(q,r).catch(e=>{console.error(e);json(r,500,{ok:false,error:"internal_error"});}));s.listen(PORT,"0.0.0.0",()=>console.log("commercial contour listening"));}catch(e){console.error(e);process.exit(1);}})();