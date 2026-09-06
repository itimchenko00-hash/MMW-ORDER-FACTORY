const express=require('express');
const originalSend=express.response.send;

function addCarpathiaFilters(body){
  if(typeof body!=='string'||!body.includes('Каталог CARPATHIA.')) return body;
  const script=`<script id="mmw-carpathia-filters">(()=>{function apply(root,cat){const buttons=[...root.querySelectorAll('.filter[data-filter]')];const cards=[...root.querySelectorAll('.card[data-cat]')];const empty=root.querySelector('#emptyState');let shown=0;for(const card of cards){const visible=cat==='all'||card.dataset.cat===cat;card.hidden=!visible;if(visible)shown++}if(empty)empty.style.display=shown?'none':'block';for(const button of buttons){const active=button.dataset.filter===cat;button.classList.toggle('active',active);button.setAttribute('aria-pressed',active?'true':'false')}}function init(){const roots=[...document.querySelectorAll('.carpathiaCatalog')];for(const root of roots){if(root.dataset.filtersReady!=='1'){root.dataset.filtersReady='1';apply(root,'all')}}}document.addEventListener('click',event=>{const button=event.target.closest?.('.carpathiaCatalog .filter[data-filter]');if(!button)return;event.preventDefault();const root=button.closest('.carpathiaCatalog');if(!root)return;apply(root,button.dataset.filter);root.querySelector('#catalogGrid')?.scrollIntoView({behavior:'smooth',block:'start'})});if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();new MutationObserver(init).observe(document.documentElement,{childList:true,subtree:true})})();</script>`;
  return body.replace(/<\/body>/i,script+'</body>');
}

express.response.send=function(body){
  const route=this.req?.path||this.req?.originalUrl||'';
  if(route!=='/carpathia') return originalSend.call(this,body);
  return originalSend.call(this,addCarpathiaFilters(body));
};
