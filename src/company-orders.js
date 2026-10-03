const fs=require("node:fs"),path=require("node:path"),crypto=require("node:crypto");
const {items}=require("./company-catalog");
const file=path.resolve(process.env.MMW_COMPANY_DATA_DIR||".data/mmw-company-orders.json");
fs.mkdirSync(path.dirname(file),{recursive:true});
if(!fs.existsSync(file))fs.writeFileSync(file,"[]");
const byId=new Map(items.map(x=>[x.id,x]));
const read=()=>JSON.parse(fs.readFileSync(file,"utf8"));
const write=x=>fs.writeFileSync(file,JSON.stringify(x,null,2));
const normalize=raw=>(Array.isArray(raw)?raw:[]).map(x=>{const p=byId.get(String(x.id));if(!p)return null;return {id:p.id,name:p.name,price:p.price,qty:Math.max(1,Math.min(99,Number(x.qty)||1)),from:!!p.from}}).filter(Boolean);
function code(){return String(crypto.randomInt(10000,100000))}
function createOrder(p){
 const items2=normalize(p.items); if(!items2.length)throw new Error("Корзина пуста");
 const total=items2.reduce((s,x)=>s+x.price*x.qty,0),createdAt=new Date().toISOString(),accessToken=crypto.randomBytes(24).toString("hex");
 let accessCode,id,rows=read();
 for(let i=0;i<50;i++){accessCode=code();id="MMW-C-"+new Date().toISOString().slice(0,10).replace(/-/g,"")+"-"+accessCode;if(!rows.some(x=>x.id===id||x.accessCode===accessCode))break}
 const order={id,accessCode,accessToken,createdAt,status:"Новая",customerName:String(p.customerName||"").trim().slice(0,120),phone:String(p.phone||"").trim().slice(0,50),email:String(p.email||"").trim().slice(0,160),company:String(p.company||"").trim().slice(0,160),projectType:String(p.projectType||"").trim().slice(0,120),address:String(p.address||"").trim().slice(0,300),comment:String(p.comment||"").trim().slice(0,3000),items:items2,total};
 rows.push(order);write(rows);return order;
}
function publicOrder(o){const {accessToken,...safe}=o;return safe}
function getByCode(c){return read().find(x=>x.accessCode===String(c||"").trim())||null}
function listByToken(t){return read().filter(x=>x.accessToken===t).sort((a,b)=>b.createdAt.localeCompare(a.createdAt)).map(publicOrder)}
function all(){return read().sort((a,b)=>b.createdAt.localeCompare(a.createdAt)).map(publicOrder)}
function updateStatus(id,status){const allowed=["Новая","В работе","Ожидает уточнения","Выполнена","Отменена"];if(!allowed.includes(status))throw new Error("Недопустимый статус");const rows=read(),o=rows.find(x=>x.id===id);if(!o)return null;o.status=status;write(rows);return publicOrder(o)}
module.exports={createOrder,getByCode,listByToken,all,updateStatus};
