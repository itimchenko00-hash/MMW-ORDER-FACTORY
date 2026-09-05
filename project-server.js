const express=require('express');
const path=require('path');
const fs=require('fs');
const app=express();
const PORT=process.env.PORT||10000;
const ALADIN='ЭТАЛОН-02/MMW-COMPANY/projects/ALADIN/website/aladin-presentation-suite.html';

let fxCache={data:null,at:0};
async function loadFx(){
  if(fxCache.data&&Date.now()-fxCache.at<15*60*1000)return fxCache.data;
  const r=await fetch('https://api.frankfurter.dev/v1/latest?from=EUR');
  if(!r.ok)throw new Error('FX provider unavailable');
  const d=await r.json();
  fxCache={data:{base:d.base,date:d.date,rates:d.rates,provider:'Frankfurter / ECB reference data'},at:Date.now()};
  return fxCache.data;
}

app.get('/api/fx',async(req,res)=>{
  try{
    const data=await loadFx();
    res.set('Cache-Control','public,max-age=900');
    res.json({...data,updatedAt:new Date(fxCache.at).toISOString()});
  }catch(e){
    res.status(503).json({error:'fx_unavailable',message:'Курс временно недоступен'});
  }
});

/*
 * Minimal runtime stabilization layer.
 * It does not add duplicate UI or duplicate business logic.
 * It only takes control of the interactive elements that must remain reliable.
 */
const stabilizationPatch=`<script>
(function(){
  function ready(){
    const $$=s=>Array.from(document.querySelectorAll(s));
    const $=s=>document.querySelector(s);

    // Roles: use the three real buttons already present in the page.
    document.addEventListener('click',function(e){
      const role=e.target.closest('.roleBtn');
      if(role){
        e.preventDefault();
        e.stopImmediatePropagation();
        if(typeof setRole==='function')setRole(role.dataset.role);
        return;
      }

      // Scenarios: replace the broken NodeList.classList handler with a direct implementation.
      const scenario=e.target.closest('.scenarioBtn');
      if(scenario){
        e.preventDefault();
        e.stopImmediatePropagation();
        $$('.scenarioBtn').forEach(x=>x.classList.remove('active'));
        scenario.classList.add('active');
        const sales=$('#uSales'),price=$('#uPrice'),capex=$('#uCapex');
        if(sales)sales.value=scenario.dataset.occ||sales.value;
        if(price)price.value=scenario.dataset.price||price.value;
        if(capex)capex.value=scenario.dataset.capex||capex.value;
        if(typeof render==='function')render();
        return;
      }

      // Catalog: keep filtering deterministic and independent of any duplicate handlers.
      const cat=e.target.closest('.cat');
      if(cat){
        e.preventDefault();
        e.stopImmediatePropagation();
        $$('.cat').forEach(x=>x.classList.remove('active'));
        cat.classList.add('active');
        const value=cat.dataset.cat||'all';
        $$('.offer').forEach(o=>o.classList.toggle('hidden',value!=='all'&&o.dataset.cat!==value));
      }
    },true);

    // Currency selectors must react to SELECT change events, not only input events.
    const currency=$('#calcCurrency');
    if(currency){
      currency.addEventListener('change',function(){if(typeof render==='function')render();});
    }
    ['fxFrom','fxTo'].forEach(id=>{
      const el=$('#'+id);
      if(el)el.addEventListener('change',function(){if(typeof convert==='function')convert();});
    });

    // Keep the compact calculator visible and initialized.
    if(typeof render==='function')render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});
  else ready();
})();
</script>`;

app.get('/aladin',(req,res)=>{
  const p=path.join(__dirname,ALADIN);
  if(!fs.existsSync(p))return res.status(404).send('ALADIN page not found');
  res.set('Cache-Control','no-store,no-cache,must-revalidate,max-age=0');
  res.set('X-ALADIN-SOURCE','PROJECT-ISOLATED-ENHANCED');
  let html=fs.readFileSync(p,'utf8');
  html=html.replace('</body>',stabilizationPatch+'</body>');
  res.type('html').send(html);
});
app.get('/health',(req,res)=>res.json({ok:true,service:'ALADIN-PROJECT',fx:!!fxCache.data}));
app.get('/',(req,res)=>res.redirect('/aladin'));
app.use((req,res)=>res.status(404).send('ALADIN route not found'));
app.listen(PORT,()=>console.log('[ALADIN] isolated project server active on '+PORT));