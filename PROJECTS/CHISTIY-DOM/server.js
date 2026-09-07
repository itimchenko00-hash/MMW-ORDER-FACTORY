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
  const data=fs.existsSync(dataFile)?fs.readFileSync(dataFile,'utf8'):'';
  const runtime=`<script>
(()=>{
'use strict';
const D=window.CHISTIY_DOM_DATA||{prices:{},quick:{}};
const money=v=>Math.round(Number(v)||0).toLocaleString('uk-UA')+' ₴';
const safe=(v)=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function renderPrice(key){
 const table=document.getElementById('priceTable');
 if(!table)return;
 const rows=D.prices?.[key]||[];
 table.innerHTML=rows.map((x,i)=>`<div class="price-card"><div><span class="tag">${safe(x[2]).toUpperCase()}</span><h3>${safe(x[0])}</h3><p>Орієнтовна стартова вартість</p><div class="units"><span class="unit">${safe(x[2])}</span><span class="unit">${money(x[1])} / ${safe(x[2])}</span></div></div><div><div class="price-control"><input class="qty" data-i="${i}" type="number" min="0" step="${x[2]==='шт'||x[2]==='авто'||x[2]==='послуга'?'1':'0.1'}" value="0" inputmode="decimal" aria-label="Кількість: ${safe(x[0])}"><div><small style="color:var(--muted)">ставка</small><br><b>${money(x[1])}</b></div></div><div class="line-total"><small>сума позиції</small><b class="line-sum" data-i="${i}">0 ₴</b></div></div></div>`).join('');
 table.querySelectorAll('.qty').forEach(q=>q.addEventListener('input',updateTotal));
 updateTotal();
}
function updateTotal(){
 const table=document.getElementById('priceTable'); if(!table)return;
 const rows=D.prices?.[window.cdPriceKey||'clean']||[]; let sum=0;
 table.querySelectorAll('.qty').forEach(q=>{const i=Number(q.dataset.i),x=rows[i],v=Math.max(0,Number(q.value)||0),s=v*(Number(x?.[1])||0);sum+=s;const out=table.querySelector('.line-sum[data-i="'+i+'"]');if(out)out.textContent=money(s);});
 const total=document.getElementById('estimateTotal');if(total)total.textContent=money(sum);
}
function wirePrice(){
 const buttons=[...document.querySelectorAll('#priceNav button')];
 buttons.forEach(b=>b.addEventListener('click',()=>{buttons.forEach(x=>x.classList.remove('active'));b.classList.add('active');window.cdPriceKey=b.dataset.price||'clean';renderPrice(window.cdPriceKey);}));
 const active=buttons.find(b=>b.classList.contains('active'))||buttons[0];
 window.cdPriceKey=active?.dataset.price||'clean';
 if(active)buttons.forEach(x=>x.classList.toggle('active',x===active));
 renderPrice(window.cdPriceKey);
}
function wireHero(){
 const map={HOME:'#services',B2B:'#services',CARE:'#services',OUT:'#services'};
 document.querySelectorAll('.stats .stat').forEach(card=>{card.setAttribute('role','button');card.setAttribute('tabindex','0');const key=card.querySelector('b')?.textContent?.trim();const go=()=>{document.querySelector(map[key]||'#services')?.scrollIntoView({behavior:'smooth'});const target={HOME:'all',B2B:'business',CARE:'care',OUT:'outside'}[key];const tab=[...document.querySelectorAll('.tab')].find(x=>(x.dataset.filter||'').toLowerCase()===target);if(tab)tab.click();};card.addEventListener('click',go);card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go();}});});
}
function wireGallery(){
 document.querySelectorAll('.gallery img').forEach(img=>{img.addEventListener('error',()=>{img.style.display='none';const f=img.closest('figure');if(f&&!f.querySelector('.gallery-fallback')){const a=document.createElement('a');a.className='gallery-fallback';a.href=f.dataset.source||'#';a.target='_blank';a.rel='noopener';a.textContent='Відкрити оригінальне фото у відкритому профілі →';f.appendChild(a);}}, {once:true});});
}
function wireForm(){
 const form=document.querySelector('.form');if(!form)return;
 form.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(form);const name=fd.get('name')||'';const phone=fd.get('phone')||'';const service=fd.get('service')||'';const object=fd.get('object')||'';const text=`Заявка Чистий Дім%0AІм'я: ${encodeURIComponent(name)}%0AТелефон: ${encodeURIComponent(phone)}%0AПослуга: ${encodeURIComponent(service)}%0AОб'єкт: ${encodeURIComponent(object)}`;window.open('https://wa.me/'+(D.contacts?.kolomyia||'380964563546')+'?text='+text,'_blank','noopener');});
}
function boot(){wirePrice();wireHero();wireGallery();wireForm();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
</script>`;
  const injected=(data?'<script>'+data.replace(/^\s*<script>|<\/script>\s*$/g,'')+'<\/script>':'')+runtime;
  res.set('Cache-Control','no-store');
  res.type('html').send(html.replace('</body>',injected+'</body>'));
});

app.listen(PORT,'0.0.0.0',()=>console.log(`CHISTIY DOM listening on ${PORT}`));
