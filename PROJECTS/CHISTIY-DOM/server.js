const express=require('express');
const fs=require('fs');
const path=require('path');
const app=express();
const PORT=process.env.PORT||10000;
const projectRoot=__dirname;
const site=path.join(projectRoot,'03-PAGES','site.html');
const dataFile=path.join(projectRoot,'05-DATA','site-data.js');

app.get('/health',(req,res)=>res.type('text/plain').send('ok'));

app.use((req,res)=>{
  if(!fs.existsSync(site)) return res.status(404).send('Site not found');
  let html=fs.readFileSync(site,'utf8');

  // Archived COMPANY GALLERY must never be published from the working site.
  html=html.replace(/<section>\s*<div class="wrap">\s*<div class="head">\s*<div><div class="eyebrow">04 · COMPANY GALLERY<\/div>[\s\S]*?<\/section>\s*<section>\s*<div class="wrap">\s*<div class="head">\s*<div><div class="eyebrow">05 · VISUAL RESULT<\/div>/,'<section><div class="wrap"><div class="head"><div><div class="eyebrow">04 · VISUAL RESULT<\/div>');

  const priceSection='<section id="prices"><div class="wrap">'+
    '<div class="head"><div><div class="eyebrow">03 · PRICE SYSTEM</div><h2>Розрахуйте <em>свою вартість.</em></h2></div><p>Оберіть послуги, введіть фактичну кількість у правильній одиниці виміру — система автоматично покаже суму кожної позиції та загальний потенційний бюджет.</p></div>'+
    '<div class="estimator">'+
      '<div class="estimator-main">'+
        '<div class="price-layout">'+
          '<aside class="price-nav" id="priceNav">'+
            '<div class="price-nav-title">НАПРЯМ</div>'+
            '<button class="active" data-price="clean" type="button">ПРИБИРАННЯ<span>м²</span></button>'+
            '<button data-price="care" type="button">ХІМЧИСТКА<span>шт · м²</span></button>'+
            '<button data-price="glass" type="button">ВІКНА / ФАСАДИ<span>м²</span></button>'+
            '<button data-price="special" type="button">СПЕЦІАЛЬНІ<span>шт · м² · авто</span></button>'+
          '</aside>'+ 
          '<div class="price-table-wrap">'+
            '<div class="price-table-head"><div><span class="eyebrow">SELECT & QUANTITY</span><h3 id="priceCategoryTitle">Прибирання</h3></div><span class="price-help">0 = позиція не включена</span></div>'+ 
            '<div class="price-table" id="priceTable"></div>'+ 
          '</div>'+ 
        '</div>'+ 
        '<div class="estimate-panel" id="estimatePanel">'+
          '<div><span class="eyebrow">ESTIMATE ENGINE</span><strong id="estimateCount">0 позицій</strong><p>Розрахунок за опублікованими стартовими тарифами. Фінальна ціна може уточнюватися після огляду обʼєкта.</p></div>'+ 
          '<div class="estimate-total"><small>ПОТЕНЦІЙНА ВАРТІСТЬ</small><b id="estimateTotal">0 ₴</b></div>'+ 
        '</div>'+ 
        '<div class="estimate-actions"><button class="btn" id="clearEstimate" type="button">Очистити розрахунок</button><button class="btn primary" id="sendEstimate" type="button">Замовити за цим розрахунком →</button></div>'+ 
      '</div>'+ 
    '</div>'+ 
    '<div class="calc"><div class="eyebrow">QUICK CALCULATOR</div><h3>Швидкий розрахунок по площі</h3><div class="calc-grid"><div class="field"><label>ПЛОЩА, М²</label><input id="area" type="number" min="0" step="0.1" value="60" inputmode="decimal"></div><div class="field"><label>ТИП РОБІТ</label><select id="calcType"></select></div><div><div class="result" id="calcResult">5 400 ₴</div><small style="color:var(--m)">орієнтовно</small></div></div></div>'+
    '</div></section>';
  html=html.replace(/<section id="prices">[\s\S]*?<\/section>/,priceSection);

  // Remove the legacy inline estimator/client script. The runtime below is the single owner.
  html=html.replace(/<script>\s*\(\(\)=>\{const D=window\.CHISTIY_DOM_DATA[\s\S]*?<\/script>/,'');

  const estimatorStyle=`<style>
.estimator{margin-top:22px}.estimator-main{min-width:0}.price-layout{grid-template-columns:250px minmax(0,1fr);align-items:start}.price-nav{position:sticky;top:92px}.price-nav-title{padding:10px 14px 12px;color:var(--g);font-size:9px;letter-spacing:.16em;font-weight:800;border-bottom:1px solid var(--l)}.price-nav button span{font-size:9px;color:var(--m);font-weight:500;letter-spacing:0}.price-nav button.active span{color:var(--g2)}.price-table-wrap{min-width:0}.price-table-head{display:flex;justify-content:space-between;align-items:end;gap:20px;padding:0 0 13px}.price-table-head h3{margin:5px 0 0;font-size:28px}.price-help{font-size:10px;color:var(--m);text-align:right}.price-table{border-radius:15px}.price-card{transition:.18s ease}.price-card.selected{background:linear-gradient(100deg,#142a22,#0d1a16)}.price-info h3{margin:7px 0 5px}.price-input-area{min-width:0}.price-input-area>label{display:block;color:var(--m);font-size:9px;letter-spacing:.12em;font-weight:800;margin-bottom:6px}.price-input-area>label span{color:var(--g2)}.qty-control{display:grid;grid-template-columns:40px minmax(60px,1fr) 40px;gap:5px}.qty-control button{border:1px solid var(--l);background:#08120f;color:var(--g2);border-radius:7px;font-size:22px;line-height:1;cursor:pointer}.qty-control button:hover{border-color:var(--g);background:#0a1713}.qty-control input{text-align:center;font-weight:800}.line-total{margin-top:9px}.estimate-panel{margin-top:12px;padding:22px 24px;background:linear-gradient(145deg,#12231d,#0d1a16);border:1px solid var(--l);border-radius:15px;display:flex;justify-content:space-between;align-items:center;gap:24px}.estimate-panel.has-items{border-color:var(--g)}.estimate-panel strong{display:block;margin-top:4px;font:800 18px Manrope}.estimate-panel p{margin:5px 0 0;max-width:650px;color:var(--m);font-size:11px}.estimate-total{text-align:right}.estimate-total small{display:block;color:var(--m);font-size:9px;letter-spacing:.12em}.estimate-total b{display:block;margin-top:3px;font:800 clamp(28px,4vw,40px) Manrope;color:var(--g2)}.estimate-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:10px}.empty-price{padding:35px 20px;color:var(--m);text-align:center}.calc{margin-top:20px}.calc h3{margin:5px 0 16px;font-size:23px}@media(max-width:950px){.price-layout{grid-template-columns:1fr}.price-nav{position:static}.price-nav button{display:inline-flex;width:auto;min-width:160px;margin:4px}.price-nav-title{display:none}.price-table-head{margin-top:15px}.estimate-panel{align-items:flex-start}}@media(max-width:600px){.price-nav{display:flex;overflow-x:auto;gap:5px;padding:7px}.price-nav button{margin:0;min-width:max-content;white-space:nowrap;padding:12px}.price-card{grid-template-columns:1fr;gap:16px}.estimate-panel{display:block;padding:18px}.estimate-total{text-align:left;margin-top:15px}.estimate-actions{display:grid;grid-template-columns:1fr}.estimate-actions .btn{width:100%}.price-table-head{display:block}.price-help{text-align:left;display:block;margin-top:5px}}
</style>`;
  html=html.replace('</head>',estimatorStyle+'</head>');

  const data=fs.existsSync(dataFile)?fs.readFileSync(dataFile,'utf8'):'';
  const runtime=`<script>
(()=>{
'use strict';
const D=window.CHISTIY_DOM_DATA||{prices:{},quick:{},contacts:{}};
const money=v=>Math.round(Number(v)||0).toLocaleString('uk-UA')+' ₴';
const safe=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const labels={clean:'Прибирання',care:'Хімчистка',glass:'Вікна / фасади',special:'Спеціальні'};
const unitStep=unit=>['шт','авто','послуга'].includes(unit)?1:0.1;
const state={clean:{},care:{},glass:{},special:{}};
let current='clean';
function rowsFor(key){return Array.isArray(D.prices?.[key])?D.prices[key]:[];}
function renderPrice(){
 const table=document.getElementById('priceTable');if(!table)return;
 const rows=rowsFor(current);const title=document.getElementById('priceCategoryTitle');if(title)title.textContent=labels[current]||current;
 table.innerHTML=rows.map((x,i)=>{const name=x?.[0]??'Послуга',rate=Number(x?.[1])||0,unit=x?.[2]??'м²',q=Number(state[current][i]||0);return '<article class="price-card '+(q>0?'selected':'')+'" data-row="'+i+'"><div class="price-info"><span class="tag">'+safe(unit).toUpperCase()+'</span><h3>'+safe(name)+'</h3><div class="units"><span class="unit">'+safe(unit)+'</span><span class="unit">'+money(rate)+' / '+safe(unit)+'</span></div></div><div class="price-input-area"><label>КІЛЬКІСТЬ <span>'+safe(unit)+'</span></label><div class="qty-control"><button type="button" class="qty-minus" data-i="'+i+'" aria-label="Зменшити">−</button><input class="qty" data-i="'+i+'" type="number" min="0" step="'+unitStep(unit)+'" value="'+q+'" inputmode="decimal" aria-label="Кількість: '+safe(name)+'"><button type="button" class="qty-plus" data-i="'+i+'" aria-label="Збільшити">+</button></div><div class="line-total"><small>'+money(rate)+' × '+safe(unit)+'</small><b class="line-sum" data-i="'+i+'">'+money(q*rate)+'</b></div></div></article>';}).join('')||'<div class="empty-price">Для цієї категорії поки немає тарифів.</div>';
 table.querySelectorAll('.qty').forEach(q=>q.addEventListener('input',()=>setQty(Number(q.dataset.i),q.value)));
 table.querySelectorAll('.qty-minus').forEach(b=>b.addEventListener('click',()=>changeQty(Number(b.dataset.i),-1)));
 table.querySelectorAll('.qty-plus').forEach(b=>b.addEventListener('click',()=>changeQty(Number(b.dataset.i),1)));
 updateTotals();
}
function setQty(i,value){const row=rowsFor(current)[i];if(!row)return;const step=unitStep(row[2]);let v=Math.max(0,Number(value)||0);v=step===1?Math.round(v):Math.round(v*10)/10;state[current][i]=v;const card=document.querySelector('.price-card[data-row="'+i+'"]');if(card){card.classList.toggle('selected',v>0);const input=card.querySelector('.qty');if(input&&document.activeElement!==input)input.value=v;const out=card.querySelector('.line-sum');if(out)out.textContent=money(v*(Number(row[1])||0));}updateTotals();}
function changeQty(i,delta){const row=rowsFor(current)[i];if(!row)return;const step=unitStep(row[2]);setQty(i,Math.max(0,(Number(state[current][i])||0)+(delta*step)));}
function selectedItems(){const out=[];Object.keys(labels).forEach(key=>rowsFor(key).forEach((x,i)=>{const q=Number(state[key][i]||0);if(q>0)out.push({category:labels[key],name:x[0],rate:Number(x[1])||0,unit:x[2],qty:q,sum:q*(Number(x[1])||0)});}));return out;}
function updateTotals(){const items=selectedItems(),total=items.reduce((s,x)=>s+x.sum,0);const totalEl=document.getElementById('estimateTotal');if(totalEl)totalEl.textContent=money(total);const countEl=document.getElementById('estimateCount');if(countEl)countEl.textContent=items.length+' '+(items.length===1?'позиція':'позицій');const panel=document.getElementById('estimatePanel');if(panel)panel.classList.toggle('has-items',items.length>0);}
function wirePriceNav(){const buttons=[...document.querySelectorAll('#priceNav button')];buttons.forEach(b=>b.addEventListener('click',()=>{buttons.forEach(x=>x.classList.remove('active'));b.classList.add('active');current=b.dataset.price||'clean';renderPrice();}));}
function wireClear(){document.getElementById('clearEstimate')?.addEventListener('click',()=>{Object.keys(state).forEach(k=>state[k]={});renderPrice();});}
function estimateText(){const items=selectedItems(),total=items.reduce((s,x)=>s+x.sum,0);if(!items.length)return 'Потрібен розрахунок послуг.';return 'Попередній розрахунок Чистий Дім\\n'+items.map(x=>x.category+': '+x.name+' — '+x.qty+' '+x.unit+' × '+money(x.rate)+' = '+money(x.sum)).join('\\n')+'\\nРАЗОМ: '+money(total)+'\\n\\nФінальна ціна уточнюється після оцінки обʼєкта.';}
function wireSendEstimate(){document.getElementById('sendEstimate')?.addEventListener('click',()=>{const items=selectedItems();if(!items.length){document.getElementById('priceTable')?.scrollIntoView({behavior:'smooth',block:'center'});return;}const form=document.getElementById('orderForm');if(form){const object=form.querySelector('[name="object"]');if(object)object.value=estimateText();const service=form.querySelector('[name="service"]');if(service)service.value='Інше';document.getElementById('contact')?.scrollIntoView({behavior:'smooth'});}});}
function wireQuickCalc(){const area=document.getElementById('area'),type=document.getElementById('calcType'),result=document.getElementById('calcResult');if(!area||!type||!result)return;const quick=D.quick||{};type.innerHTML=Object.entries(quick).map(([name,rate])=>'<option value="'+Number(rate)+'">'+safe(name)+' · '+money(rate)+'/м²</option>').join('');const first=Object.values(quick)[0];if(first!=null)type.value=first;const calc=()=>{const a=Math.max(0,Number(area.value)||0),r=Math.max(0,Number(type.value)||0);result.textContent=money(a*r);};area.addEventListener('input',calc);type.addEventListener('change',calc);calc();}
function wireTabs(){document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelectorAll('.service').forEach(c=>c.style.display=(b.dataset.filter==='all'||c.dataset.cat===b.dataset.filter)?'flex':'none');}));}
function wireStats(){const map={HOME:'all',B2B:'business',CARE:'care',OUT:'outside'};document.querySelectorAll('.stats .stat').forEach(card=>{card.setAttribute('role','button');card.setAttribute('tabindex','0');const key=card.querySelector('b')?.textContent?.trim();const go=()=>{document.querySelector('#services')?.scrollIntoView({behavior:'smooth'});const tab=[...document.querySelectorAll('.tab')].find(x=>x.dataset.filter===map[key]);if(tab)tab.click();};card.addEventListener('click',go);card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go();}});});}
function wireOrderButtons(){document.querySelectorAll('.order').forEach(b=>b.addEventListener('click',()=>{const wanted=(b.dataset.service||'').toLowerCase(),sel=document.querySelector('[name="service"]');if(sel){[...sel.options].forEach(o=>{if(o.text.toLowerCase().includes(wanted.split(' / ')[0]))sel.value=o.value;});}document.getElementById('contact')?.scrollIntoView({behavior:'smooth'});}));}
function wireForm(){const form=document.getElementById('orderForm');if(!form)return;form.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(form);const text=fd.get('object')||'';const base='Заявка Чистий Дім\\nІм’я: '+(fd.get('name')||'')+'\\nТелефон: '+(fd.get('phone')||'')+'\\nПослуга: '+(fd.get('service')||'')+'\\n'+text;window.open('https://wa.me/'+(D.contacts?.kolomyia||'380964563546')+'?text='+encodeURIComponent(base),'_blank','noopener');});}
function boot(){wirePriceNav();wireClear();wireSendEstimate();wireQuickCalc();wireTabs();wireStats();wireOrderButtons();wireForm();renderPrice();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
</script>`;

  const injected=(data?'<script>'+data.replace(/^\s*<script>|<\/script>\s*$/g,'')+'</script>':'')+runtime;
  res.set('Cache-Control','no-store');
  res.type('html').send(html.replace('</body>',injected+'</body>'));
});

app.listen(PORT,'0.0.0.0',()=>console.log(`CHISTIY DOM listening on ${PORT}`));
