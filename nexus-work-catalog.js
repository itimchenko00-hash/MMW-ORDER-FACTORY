(()=>{
const d=document,sel=d.getElementById('nx-currency'),cards=[...d.querySelectorAll('.nx-cat-card')],prices=[...d.querySelectorAll('.nx-price')],filters=[...d.querySelectorAll('.nx-cat-filter')],sym={UAH:'₴',USD:'$',EUR:'€',GBP:'£',USDT:'₮'};
if(!sel)return;
let rates={UAH:1};
const fmt=(n,c)=>Math.round(n).toLocaleString('uk-UA')+' '+(sym[c]||c);
function render(){const c=sel.value,r=Number(rates[c])||1;prices.forEach(x=>x.textContent=fmt(Number(x.dataset.uah)/r,c))}
function filter(cat){filters.forEach(b=>{const active=b.dataset.cat===cat;b.classList.toggle('on',active);b.setAttribute('aria-pressed',String(active))});cards.forEach(x=>x.classList.toggle('hidden',cat!=='all'&&x.dataset.cat!==cat))}
filters.forEach(b=>b.addEventListener('click',e=>{e.preventDefault();filter(b.dataset.cat)}));
sel.addEventListener('change',render);
async function load(){try{const r=await fetch('/api/market',{cache:'no-store'});if(!r.ok)throw new Error('market '+r.status);const j=await r.json();if(j&&j.UAH){rates.USD=Number(j.UAH.USD)||rates.USD;rates.EUR=Number(j.UAH.EUR)||rates.EUR;rates.GBP=Number(j.UAH.GBP)||rates.GBP;rates.USDT=Number(j.UAH.USD)||rates.USDT}}catch(e){}render()}
filter('all');load();setInterval(load,60000)
})();
