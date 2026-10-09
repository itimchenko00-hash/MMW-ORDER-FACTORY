const http=require("node:http"),fs=require("node:fs"),path=require("node:path"),{URL}=require("node:url");
const {Pool}=require("pg");
const root=__dirname,activeCompanyRoot=path.join(root,"MMW-COMPANY","2 — WORKING","public"),port=Number(process.env.PORT)||10000;
const mime={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".svg":"image/svg+xml",".jpg":"image/jpeg",".jpeg":"image/jpeg",".png":"image/png",".webp":"image/webp",".json":"application/json; charset=utf-8",".ico":"image/x-icon"};
const safe=(base,rel)=>{const b=path.resolve(base),p=path.resolve(base,rel);return p===b||p.startsWith(b+path.sep)?p:null};
const existingFile=(candidates)=>{for(const [base,sub] of candidates){const f=safe(base,sub);if(f&&fs.existsSync(f)&&fs.statSync(f).isFile())return f}return null};
const pool=process.env.DATABASE_URL?new Pool({connectionString:process.env.DATABASE_URL,ssl:/neon\.tech/i.test(process.env.DATABASE_URL)?{rejectUnauthorized:false}:undefined,max:5,idleTimeoutMillis:30000,connectionTimeoutMillis:5000}):null;
let feedbackTableReady=null;
const feedbackLimits=new Map();
function json(res,status,payload){res.writeHead(status,{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"});res.end(JSON.stringify(payload))}
function normalizedPage(value){const p=String(value||"/").split("?")[0];if(!p.startsWith("/")||p.length>120||p.includes("..")||!/^[a-z0-9/_-]+$/i.test(p))return "/";return p}
async function ensureFeedbackTable(){
 if(!pool)throw new Error("DATABASE_URL is not configured");
 if(!feedbackTableReady)feedbackTableReady=pool.query(`
  CREATE TABLE IF NOT EXISTS mmw_site_feedback (
   id BIGSERIAL PRIMARY KEY,
   page_path VARCHAR(120) NOT NULL,
   author_name VARCHAR(60) NOT NULL,
   entry_type VARCHAR(12) NOT NULL CHECK (entry_type IN ('review','comment')),
   rating SMALLINT CHECK (rating IS NULL OR rating BETWEEN 1 AND 5),
   message TEXT NOT NULL,
   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
  CREATE INDEX IF NOT EXISTS mmw_site_feedback_page_created_idx ON mmw_site_feedback(page_path, created_at DESC);
 `).catch(err=>{feedbackTableReady=null;throw err});
 await feedbackTableReady;
}
function readJson(req,maxBytes=12000){return new Promise((resolve,reject)=>{let raw="",size=0;req.on("data",chunk=>{size+=chunk.length;if(size>maxBytes){reject(new Error("body_too_large"));req.destroy();return}raw+=chunk});req.on("end",()=>{try{resolve(JSON.parse(raw||"{}"))}catch{reject(new Error("invalid_json"))}});req.on("error",reject)})}
function checkRateLimit(req){const forwarded=req.headers["x-forwarded-for"];const ip=String(forwarded||req.socket.remoteAddress||"unknown").split(",")[0].trim();const now=Date.now(),windowMs=10*60*1000;const recent=(feedbackLimits.get(ip)||[]).filter(t=>now-t<windowMs);if(recent.length>=4){feedbackLimits.set(ip,recent);return false}recent.push(now);feedbackLimits.set(ip,recent);if(feedbackLimits.size>2000){for(const [key,times] of feedbackLimits){if(!times.length||now-times[times.length-1]>windowMs)feedbackLimits.delete(key)}}return true}
const feedbackWidget=`
<section id="mmw-feedback" aria-labelledby="mmw-feedback-title">
 <div class="mmwf-wrap">
  <div class="mmwf-heading"><div><span class="mmwf-eyebrow">ОБРАТНАЯ СВЯЗЬ</span><h2 id="mmw-feedback-title">Отзывы и комментарии</h2></div><p>Поделитесь впечатлением или задайте вопрос. Имя автора будет показано рядом с сообщением.</p></div>
  <div class="mmwf-grid">
   <form id="mmwf-form" class="mmwf-form">
    <label>Как к вам обращаться<input name="author" maxlength="60" required autocomplete="name" placeholder="Ваше имя"></label>
    <label>Тип сообщения<select name="kind"><option value="review">Отзыв</option><option value="comment">Комментарий</option></select></label>
    <label id="mmwf-rating-label">Оценка <span aria-hidden="true">★</span><select name="rating" id="mmwf-rating"><option value="5">5 — Отлично</option><option value="4">4 — Хорошо</option><option value="3">3 — Нормально</option><option value="2">2 — Есть замечания</option><option value="1">1 — Неудовлетворительно</option></select></label>
    <label>Ваше сообщение<textarea name="message" rows="4" maxlength="2000" required placeholder="Напишите отзыв или комментарий…"></textarea><small><span id="mmwf-count">0</span>/2000</small></label>
    <label class="mmwf-trap" aria-hidden="true">Не заполняйте это поле<input name="website" tabindex="-1" autocomplete="off"></label>
    <button class="mmwf-submit" type="submit">Опубликовать сообщение <span aria-hidden="true">↗</span></button>
    <p id="mmwf-status" class="mmwf-status" role="status" aria-live="polite">Сообщения публикуются после отправки и будут видны другим посетителям.</p>
   </form>
   <div class="mmwf-feed"><div class="mmwf-feedtop"><h3>Сообщения посетителей</h3><span id="mmwf-total">Загрузка…</span></div><div id="mmwf-items" class="mmwf-items" aria-live="polite"><p class="mmwf-muted">Загружаем сообщения…</p></div></div>
  </div>
 </div>
</section>
<style>
#mmw-feedback{padding:76px 0;background:#edf3ee;color:#10251f;border-top:1px solid #10251f16}#mmw-feedback *{box-sizing:border-box}#mmw-feedback .mmwf-wrap{max-width:1180px;padding:0 24px;margin:auto}#mmw-feedback .mmwf-heading{display:flex;justify-content:space-between;align-items:end;gap:28px;margin-bottom:28px}#mmw-feedback .mmwf-eyebrow{font-size:10px;font-weight:900;letter-spacing:.16em;color:#0b705b}#mmw-feedback h2{font-size:clamp(30px,4vw,48px);letter-spacing:-.055em;line-height:1;margin:12px 0 0}#mmw-feedback .mmwf-heading>p{max-width:430px;color:#5b6b64;font-size:13px;line-height:1.6;margin:0}#mmw-feedback .mmwf-grid{display:grid;grid-template-columns:minmax(260px,.8fr) minmax(0,1.2fr);gap:20px;align-items:start}#mmw-feedback .mmwf-form,#mmw-feedback .mmwf-feed{background:#fff;border:1px solid #10251f15;border-radius:22px;padding:22px;box-shadow:0 12px 34px #10251f08}#mmw-feedback .mmwf-form label{display:block;font-size:11px;font-weight:800;margin-bottom:14px;color:#344740}#mmw-feedback input,#mmw-feedback select,#mmw-feedback textarea{display:block;width:100%;margin-top:7px;padding:12px 13px;border:1px solid #10251f25;border-radius:11px;background:#fbfcfa;color:#10251f;font:inherit;font-size:13px;outline:none}#mmw-feedback textarea{resize:vertical;min-height:100px;line-height:1.5}#mmw-feedback input:focus,#mmw-feedback select:focus,#mmw-feedback textarea:focus{border-color:#0b705b;box-shadow:0 0 0 3px #0b705b17}#mmw-feedback label small{display:block;text-align:right;color:#718078;font-weight:500;margin-top:5px}#mmw-feedback .mmwf-submit{display:flex;justify-content:space-between;align-items:center;width:100%;padding:14px 16px;border-radius:999px;background:#08231d;color:#fff;font-size:12px;font-weight:850}#mmw-feedback .mmwf-submit:disabled{opacity:.55;cursor:wait}#mmw-feedback .mmwf-status{font-size:11px;line-height:1.5;color:#6a7a72;margin:12px 0 0}#mmw-feedback .mmwf-feedtop{display:flex;justify-content:space-between;align-items:center;gap:12px;padding-bottom:16px;border-bottom:1px solid #10251f13}#mmw-feedback .mmwf-feedtop h3{font-size:17px;letter-spacing:-.025em;margin:0}#mmw-feedback .mmwf-feedtop>span{font-size:10px;color:#65756d}#mmw-feedback .mmwf-items{display:grid;gap:12px;padding-top:14px}#mmw-feedback .mmwf-item{border:1px solid #10251f12;border-radius:15px;padding:15px;background:#fbfcfa}#mmw-feedback .mmwf-itemhead{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}#mmw-feedback .mmwf-author{font-size:13px;font-weight:900;color:#10251f;overflow-wrap:anywhere}#mmw-feedback .mmwf-meta{font-size:10px;color:#75837c;margin-top:4px}#mmw-feedback .mmwf-kind{font-size:9px;font-weight:850;letter-spacing:.06em;text-transform:uppercase;color:#0b705b;background:#e5f4ed;border-radius:999px;padding:6px 8px;white-space:nowrap}#mmw-feedback .mmwf-stars{font-size:12px;color:#9b7b32;letter-spacing:.08em;margin-top:8px}#mmw-feedback .mmwf-message{font-size:13px;line-height:1.65;color:#405149;white-space:pre-wrap;overflow-wrap:anywhere;margin:10px 0 0}#mmw-feedback .mmwf-muted{font-size:12px;line-height:1.6;color:#718078;padding:10px 0}#mmw-feedback .mmwf-trap{position:absolute!important;left:-10000px!important;width:1px!important;height:1px!important;overflow:hidden!important}#mmw-feedback .mmwf-disabled{opacity:.7}@media(max-width:760px){#mmw-feedback{padding:54px 0}#mmw-feedback .mmwf-heading{display:block}#mmw-feedback .mmwf-heading>p{margin-top:14px}#mmw-feedback .mmwf-grid{grid-template-columns:1fr}#mmw-feedback .mmwf-form,#mmw-feedback .mmwf-feed{padding:17px;border-radius:17px}}
</style>
<script>
(function(){
 const root=document.getElementById("mmw-feedback");if(!root)return;
 const form=document.getElementById("mmwf-form"),items=document.getElementById("mmwf-items"),status=document.getElementById("mmwf-status"),total=document.getElementById("mmwf-total"),kind=form.elements.kind,ratingLabel=document.getElementById("mmwf-rating-label"),rating=form.elements.rating,message=form.elements.message,count=document.getElementById("mmwf-count"),submit=form.querySelector("button[type=submit]");
 const page=location.pathname||"/";
 function updateKind(){const review=kind.value==="review";ratingLabel.hidden=!review;rating.disabled=!review}
 kind.addEventListener("change",updateKind);updateKind();message.addEventListener("input",()=>count.textContent=String(message.value.length));
 function element(tag,className,text){const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node}
 function render(list){items.replaceChildren();total.textContent=list.length+" "+(list.length===1?"сообщение":list.length>=2&&list.length<=4?"сообщения":"сообщений");if(!list.length){items.append(element("p","mmwf-muted","Пока нет сообщений на этой странице. Будьте первым — поделитесь впечатлением."));return}
 list.forEach(entry=>{const card=element("article","mmwf-item"),head=element("div","mmwf-itemhead"),authorBlock=element("div",""),author=element("div","mmwf-author",entry.author_name),meta=element("div","mmwf-meta",new Date(entry.created_at).toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"})),badge=element("span","mmwf-kind",entry.entry_type==="review"?"Отзыв":"Комментарий");authorBlock.append(author,meta);head.append(authorBlock,badge);card.append(head);if(entry.entry_type==="review"&&entry.rating){card.append(element("div","mmwf-stars","★".repeat(entry.rating)+"☆".repeat(5-entry.rating)+"  "+entry.rating+"/5"))}card.append(element("p","mmwf-message",entry.message));items.append(card)})
 }
 async function load(){try{const r=await fetch("/api/feedback?page="+encodeURIComponent(page),{headers:{Accept:"application/json"}});const data=await r.json();if(!r.ok||!data.ok)throw new Error(data.error||"load_failed");render(data.items||[]);if(data.configured===false)status.textContent="Публикация пока не подключена к постоянному хранилищу. Попробуйте позже."}catch(e){items.replaceChildren(element("p","mmwf-muted","Не удалось загрузить сообщения. Обновите страницу чуть позже."));total.textContent="Временно недоступно"}}
 form.addEventListener("submit",async e=>{e.preventDefault();if(!form.reportValidity())return;submit.disabled=true;status.textContent="Отправляем сообщение…";try{const payload={author:form.elements.author.value.trim(),kind:kind.value,rating:kind.value==="review"?Number(rating.value):null,message:message.value.trim(),website:form.elements.website.value,page};const r=await fetch("/api/feedback",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(payload)});const data=await r.json();if(!r.ok||!data.ok)throw new Error(data.message||"Не удалось опубликовать сообщение.");form.reset();count.textContent="0";updateKind();status.textContent="Спасибо! Ваше сообщение опубликовано.";await load()}catch(err){status.textContent=err.message||"Не удалось отправить сообщение. Попробуйте позже."}finally{submit.disabled=false}});
 load();
})();
</script>`;
async function handleFeedback(req,res,url){
 if(req.method==="GET"){
  if(!pool)return json(res,200,{ok:true,configured:false,items:[]});
  try{await ensureFeedbackTable();const page=normalizedPage(url.searchParams.get("page"));const result=await pool.query("SELECT id,page_path,author_name,entry_type,rating,message,created_at FROM mmw_site_feedback WHERE page_path=$1 ORDER BY created_at DESC LIMIT 100",[page]);return json(res,200,{ok:true,configured:true,items:result.rows})}
  catch(e){console.error("feedback GET failed:",e.message);return json(res,503,{ok:false,error:"feedback_unavailable",message:"Отзывы временно недоступны. Попробуйте позже."})}
 }
 if(req.method!=="POST"){res.setHeader("Allow","GET, POST");return json(res,405,{ok:false,error:"method_not_allowed"})}
 let data;try{data=await readJson(req)}catch(e){return json(res,e.message==="body_too_large"?413:400,{ok:false,error:e.message})}
 if(String(data.website||"").trim())return json(res,201,{ok:true});
 if(!checkRateLimit(req))return json(res,429,{ok:false,error:"rate_limited",message:"Слишком много сообщений за короткое время. Попробуйте через несколько минут."});
 const author=String(data.author||"").trim().replace(/\\s+/g," ");
 const message=String(data.message||"").trim();
 const kind=data.kind==="comment"?"comment":"review";
 const rating=kind==="review"?Number(data.rating):null;
 const page=normalizedPage(data.page);
 if(author.length<2||author.length>60)return json(res,400,{ok:false,error:"invalid_author",message:"Укажите имя длиной от 2 до 60 символов."});
 if(message.length<3||message.length>2000)return json(res,400,{ok:false,error:"invalid_message",message:"Сообщение должно содержать от 3 до 2000 символов."});
 if(kind==="review"&&(!Number.isInteger(rating)||rating<1||rating>5))return json(res,400,{ok:false,error:"invalid_rating",message:"Выберите оценку от 1 до 5."});
 if(!pool)return json(res,503,{ok:false,error:"storage_not_configured",message:"Публикация пока недоступна: постоянное хранилище отзывов ещё не подключено."});
 try{await ensureFeedbackTable();const result=await pool.query("INSERT INTO mmw_site_feedback(page_path,author_name,entry_type,rating,message) VALUES($1,$2,$3,$4,$5) RETURNING id,page_path,author_name,entry_type,rating,message,created_at",[page,author,kind,rating,message]);return json(res,201,{ok:true,item:result.rows[0]})}
 catch(e){console.error("feedback POST failed:",e.message);return json(res,503,{ok:false,error:"feedback_unavailable",message:"Не удалось сохранить сообщение. Попробуйте позже."})}
}
const server=http.createServer(async(req,res)=>{
 try{
  const u=new URL(req.url,"http://localhost"),p=u.pathname;
  if(p==="/healthz"){res.writeHead(200,{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"});return res.end(JSON.stringify({ok:true,service:"mmw-company"}))}
  if(p==="/api/feedback")return await handleFeedback(req,res,u);
  let rel=decodeURIComponent(p);if(rel==="/")rel="/index.html";
  let f=null;
  // MMW-COMPANY/2 is the sole public runtime source.
  if(rel.startsWith("/ASSETS/CARPATHIA/")||rel.startsWith("/assets/CARPATHIA/")){
   const prefix=rel.startsWith("/assets/CARPATHIA/")?"/assets/CARPATHIA/":"/ASSETS/CARPATHIA/";
   const carRel=rel.slice(prefix.length);
   f=existingFile([[path.join(root,"MMW-COMPANY","2 — WORKING","public","ASSETS","CARPATHIA"),carRel]]);
  }
  if(!f && (rel.startsWith("/assets/ENERGY-PARK/")||rel.startsWith("/ASSETS/ENERGY-PARK/"))){
   const prefix=rel.startsWith("/assets/ENERGY-PARK/")?"/assets/ENERGY-PARK/":"/ASSETS/ENERGY-PARK/";
   const energyRel=rel.slice(prefix.length);
   f=existingFile([[path.join(activeCompanyRoot,"ASSETS","ENERGY-PARK"),energyRel]]);
  }
  if(!f && (rel.startsWith("/assets/")||rel.startsWith("/ASSETS/"))){
   const sub=rel.slice(rel.startsWith("/assets/")?"/assets/".length:"/ASSETS/".length);
   const parts=sub.split("/");
   if(parts[0]==="ALADIN"){
    const aladinSub=parts.slice(1).join("/");
    const legacyGallery=aladinSub.startsWith("photos/web-selected/") ? aladinSub.slice("photos/web-selected/".length) : null;
    f=legacyGallery
      ? existingFile([[path.join(activeCompanyRoot,"ASSETS","ALADIN","photos","web-selected"),legacyGallery]])
      : existingFile([[path.join(activeCompanyRoot,"ASSETS","ALADIN"),aladinSub]]);
   }else{
    f=existingFile([[path.join(activeCompanyRoot,"ASSETS"),sub]]);
    if(!f && parts[0]==="CARPATHIA" && parts[1]==="photos" && parts[2]==="web-selected"){
     const alias=parts.slice(3).join("/");
     const map={
      "01-restoration-stay.jpg":"02-stay.jpg",
      "02-natural-environment.jpg":"03-nature.jpg",
      "03-local-experience.jpg":"04-food.jpg",
      "04-service-context.jpg":"07-service.jpg",
      "05-season-autumn.jpg":"season-autumn.jpg",
      "06-scale-model-context.jpg":"08-model.jpg",
      "07-family-guest-context.jpg":"06-guest.jpg",
      "08-active-experience.jpg":"05-experience.jpg",
      "09-winter-context.jpg":"season-winter.jpg",
      "10-spring-context.jpg":"season-spring.jpg",
      "11-summer-context.jpg":"season-summer.jpg",
      "12-mountain-guest-context.jpg":"01-hero.jpg"
     };
     if(map[alias]) f=existingFile([[path.join(activeCompanyRoot,"ASSETS","CARPATHIA","photos","web-selected"),map[alias]]]);
    }
   }
  }else if(rel.startsWith("/PROJECTS/")){
   f=existingFile([[path.join(activeCompanyRoot,"PROJECTS"),rel.slice("/PROJECTS/".length)]]);
  }else if(rel.startsWith("/public-energy/")){
   f=existingFile([[path.join(activeCompanyRoot,"public-energy"),rel.slice("/public-energy/".length)]]);
  }else{
   const sub=rel.slice(1);
   f=existingFile([[activeCompanyRoot,sub]]);
  }
  if(f){
   const ext=path.extname(f).toLowerCase();
   res.writeHead(200,{"Content-Type":mime[ext]||"application/octet-stream","Cache-Control":"no-cache"});
   if(ext===".html"){
    let html=fs.readFileSync(f,"utf8");
    if(/<\\/body\\s*>/i.test(html))html=html.replace(/<\\/body\\s*>/i,feedbackWidget+"</body>");
    else html+=feedbackWidget;
    return res.end(html);
   }
   return fs.createReadStream(f).pipe(res);
  }
  return res.writeHead(404,{"Content-Type":"text/plain; charset=utf-8"}),res.end("Not found");
 }catch(e){console.error(e);return res.writeHead(500,{"Content-Type":"text/plain; charset=utf-8"}),res.end("Server error")}
});
server.listen(port,"0.0.0.0",()=>console.log("MMW-COMPANY "+port));
