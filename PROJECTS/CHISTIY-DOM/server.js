const express=require('express');
const fs=require('fs');
const path=require('path');
const app=express();
const PORT=process.env.PORT||10000;
const site=path.join(__dirname,'03-PAGES','site.html');

app.get('/health',(req,res)=>res.type('text/plain').send('ok'));
app.use((req,res)=>{
  if(!fs.existsSync(site)) return res.status(404).send('Site not found');
  let html=fs.readFileSync(site,'utf8');
  const patch=`<script>
(()=>{
const data={
clean:[['Комплексне прибирання',170,'м²'],['Генеральне прибирання',90,'м²'],['Після ремонту',150,'м²'],['Щоденне прибирання',55,'м²'],['Сухе прибирання',50,'м²'],['Вологе прибирання',60,'м²']],
care:[['Диван',1350,'шт'],['Крісло',230,'шт'],['Килими',150,'м²'],['Штори',80,'м²'],['Матрац',500,'шт']],
glass:[['Вікна',90,'м²'],['Висотні роботи',235,'м²'],['Після будівництва',100,'м²'],['Фасади',70,'м²']],
special:[['Озонування',700,'послуга'],['Після пожежі',200,'м²'],['Після потопу',200,'м²'],['Хімчистка авто',2200,'авто'],['Видалення грибка',200,'м²']]
};
const money=v=>Math.round(v).toLocaleString('uk-UA')+' ₴';
function draw(key){
 const table=document.getElementById('priceTable'); if(!table)return;
 table.innerHTML=data[key].map((x,i)=>`<div class="price-card"><div><span class="tag">${x[2].toUpperCase()}</span><h3>${x[0]}</h3><p>Орієнтовна стартова вартість</p><div class="units"><span class="unit">${x[2]}</span><span class="unit">${money(x[1])} / ${x[2]}</span></div></div><div><div class="price-control"><input class="qty" data-i="${i}" type="number" min="0" step="0.1" value="0"><div><small style="color:var(--muted)">ставка</small><br><b>${money(x[1])}</b></div></div><div class="line-total"><small>сума позиції</small><b class="line-sum" data-i="${i}">0 ₴</b></div></div></div>`).join('');
 table.querySelectorAll('.qty').forEach(q=>q.addEventListener('input',total)); total();
}
function total(){let sum=0;const table=document.getElementById('priceTable');if(!table)return;table.querySelectorAll('.qty').forEach(q=>{const x=data[window.cdPriceKey||'clean'][+q.dataset.i],v=Math.max(0,+q.value||0),s=v*x[1];sum+=s;const o=table.querySelector('.line-sum[data-i="'+q.dataset.i+'"]');if(o)o.textContent=money(s)});const out=document.getElementById('estimateTotal');if(out)out.textContent=money(sum)}
window.cdPriceKey='clean';
window.addEventListener('DOMContentLoaded',()=>{
 const buttons=document.querySelectorAll('#priceNav button');
 buttons.forEach(b=>b.addEventListener('click',()=>{buttons.forEach(x=>x.classList.remove('active'));b.classList.add('active');window.cdPriceKey=b.dataset.price;draw(window.cdPriceKey)}));
 draw('clean');
});
})();
</script>`;
  res.type('html').send(html.replace('</body>',patch+'</body>'));
});

app.listen(PORT,'0.0.0.0',()=>console.log(`CHISTIY DOM listening on ${PORT}`));
