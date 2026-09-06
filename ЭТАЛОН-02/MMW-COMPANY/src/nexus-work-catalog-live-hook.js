// NEXUS WORK — final interaction layer for the Factory catalog.
// Loaded last so catalog controls remain functional even when other response hooks modify the page.
const express=require('express');
const originalSend=express.response.send;

const liveScript=`<script id="nexus-work-catalog-live">(()=>{
function boot(){
  const d=document;
  const sym={UAH:'₴',USD:'$',EUR:'€',GBP:'£',USDT:'₮'};
  let rates={UAH:1};
  const money=(n,c)=>Math.round(Number(n)||0).toLocaleString('uk-UA')+' '+(sym[c]||c);
  function applyFilter(cat){
    d.querySelectorAll('.nx-cat-filter').forEach(b=>{
      const on=(b.getAttribute('data-cat')||'all')===cat;
      b.classList.toggle('on',on);
      b.classList.toggle('primary',on);
      b.setAttribute('aria-pressed',String(on));
    });
    d.querySelectorAll('.nx-cat-card').forEach(card=>{
      card.classList.toggle('hidden',cat!=='all' && card.getAttribute('data-cat')!==cat);
    });
  }
  function applyCurrency(){
    const sel=d.getElementById('nx-currency');
    if(!sel)return;
    const c=sel.value||'UAH';
    const r=Number(rates[c])||1;
    d.querySelectorAll('.nx-price[data-uah]').forEach(el=>el.textContent=money(Number(el.getAttribute('data-uah'))/r,c));
  }
  d.addEventListener('click',e=>{
    const b=e.target.closest&&e.target.closest('.nx-cat-filter');
    if(!b)return;
    e.preventDefault();
    e.stopPropagation();
    applyFilter(b.getAttribute('data-cat')||'all');
  },true);
  d.addEventListener('change',e=>{
    if(e.target && e.target.id==='nx-currency')applyCurrency();
  },true);
  window.nxCatalogFilter=applyFilter;
  window.nxCatalogCurrency=applyCurrency;
  applyFilter('all');
  applyCurrency();
  fetch('/api/market',{cache:'no-store'}).then(r=>r.ok?r.json():null).then(j=>{
    if(j&&j.UAH){
      rates.USD=Number(j.UAH.USD)||1;
      rates.EUR=Number(j.UAH.EUR)||1;
      rates.GBP=Number(j.UAH.GBP)||1;
      rates.USDT=Number(j.UAH.USD)||1;
    }
    applyCurrency();
  }).catch(()=>applyCurrency());
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();</script>`;

express.response.send=function(body){
  if(typeof body==='string'&&body.includes('</body>')&&body.includes('id="nexus-catalog"')){
    body=body.replace(/<script id="nexus-work-catalog-live">[\s\S]*?<\/script>/g,'');
    body=body.replace('</body>',liveScript+'</body>');
  }
  return originalSend.call(this,body);
};
