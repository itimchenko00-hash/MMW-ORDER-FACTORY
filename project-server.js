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
 * Final runtime repair layer.
 * It deliberately replaces fragile inline handlers instead of adding another UI layer.
 * No project data or catalog content is duplicated.
 */
const stabilizationPatch=`<script>
(function(){
  function boot(){
    const $$=s=>Array.from(document.querySelectorAll(s));
    const $=s=>document.querySelector(s);

    // FLOW stages
    $$('.node').forEach(function(n){
      n.onclick=function(e){
        e.preventDefault();
        $$('.node').forEach(function(x){x.classList.remove('active')});
        n.classList.add('active');
        if(typeof renderStage==='function')renderStage(n.dataset.step);
      };
    });

    // Three calculator roles
    $$('.roleBtn').forEach(function(b){
      b.onclick=function(e){
        e.preventDefault();
        if(typeof setRole==='function')setRole(b.dataset.role);
      };
    });

    // Scenarios: the original code incorrectly called classList on a NodeList.
    $$('.scenarioBtn').forEach(function(b){
      b.onclick=function(e){
        e.preventDefault();
        $$('.scenarioBtn').forEach(function(x){x.classList.remove('active')});
        b.classList.add('active');
        var sales=$('#uSales'),price=$('#uPrice'),capex=$('#uCapex');
        if(sales)sales.value=b.dataset.occ||sales.value;
        if(price)price.value=b.dataset.price||price.value;
        if(capex)capex.value=b.dataset.capex||capex.value;
        if(typeof render==='function')render();
      };
    });

    // Catalog filters
    $$('.cat').forEach(function(b){
      b.onclick=function(e){
        e.preventDefault();
        $$('.cat').forEach(function(x){x.classList.remove('active')});
        b.classList.add('active');
        var c=b.dataset.cat||'all';
        $$('.offer').forEach(function(o){
          o.classList.toggle('hidden',c!=='all'&&o.dataset.cat!==c);
        });
      };
    });

    // Currency must react to select/change, not just input.
    var currency=$('#calcCurrency');
    if(currency)currency.onchange=function(){if(typeof render==='function')render();};

    // The current page has no standalone FX converter controls. Never call convert()
    // unless all required controls actually exist.
    ['fxFrom','fxTo','fxAmount'].forEach(function(id){
      var el=$('#'+id);
      if(el)el.onchange=el.oninput=function(){if(typeof convert==='function')convert();};
    });

    var refresh=$('#fxRefresh');
    if(refresh)refresh.onclick=function(){if(typeof loadFx==='function')loadFx();};

    if(typeof render==='function')render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
</script>`;

app.get('/aladin',(req,res)=>{
  const p=path.join(__dirname,ALADIN);
  if(!fs.existsSync(p))return res.status(404).send('ALADIN page not found');
  res.set('Cache-Control','no-store,no-cache,must-revalidate,max-age=0');
  res.set('X-ALADIN-SOURCE','PROJECT-ISOLATED-FINAL-REPAIR');
  let html=fs.readFileSync(p,'utf8');
  html=html.replace('</body>',stabilizationPatch+'</body>');
  res.type('html').send(html);
});
app.get('/health',(req,res)=>res.json({ok:true,service:'ALADIN-PROJECT',fx:!!fxCache.data}));
app.get('/',(req,res)=>res.redirect('/aladin'));
app.use((req,res)=>res.status(404).send('ALADIN route not found'));
app.listen(PORT,()=>console.log('[ALADIN] isolated project server active on '+PORT));