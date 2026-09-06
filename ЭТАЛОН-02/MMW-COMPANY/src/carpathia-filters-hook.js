const express=require('express');
const originalSend=express.response.send;

function addCarpathiaFilters(body){
  if(typeof body!=='string'||!body.includes('Каталог CARPATHIA.')) return body;
  const script=`<script id="mmw-carpathia-filters">(()=>{function init(){const root=document.querySelector('.carpathiaCatalog');if(!root||root.dataset.filtersReady==='1')return;root.dataset.filtersReady='1';const buttons=[...root.querySelectorAll('.filter[data-filter]')];const cards=[...root.querySelectorAll('.card[data-cat]')];const empty=root.querySelector('#emptyState');if(!buttons.length||!cards.length)return;function apply(cat){let shown=0;for(const card of cards){const visible=cat==='all'||card.dataset.cat===cat;card.hidden=!visible;if(visible)shown++}if(empty)empty.style.display=shown?'none':'block';for(const button of buttons){const active=button.dataset.filter===cat;button.classList.toggle('active',active);button.setAttribute('aria-pressed',active?'true':'false');}}for(const button of buttons)button.addEventListener('click',event=>{event.preventDefault();apply(button.dataset.filter);root.querySelector('#catalogGrid')?.scrollIntoView({behavior:'smooth',block:'start'});});apply('all')}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init()})();</script>`;
  return body.replace(/<\/body>/i,script+'</body>');
}

express.response.send=function(body){return originalSend.call(this,addCarpathiaFilters(body));};
