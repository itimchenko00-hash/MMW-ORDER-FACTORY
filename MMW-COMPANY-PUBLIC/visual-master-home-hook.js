// VISUAL MASTER 01: serve and enhance the canonical MMW-COMPANY homepage at the root route.
const fs=require('fs');
const path=require('path');
const express=require('express');
const originalSend=express.response.send;
const HOME=path.join(process.cwd(),'MMW-COMPANY-PUBLIC','index.html');

function completeVisualMaster(source){
  let out=source;

  // Restore stable section anchors used by the Visual Master navigation.
  out=out.replace('<div class="companyPanel">','<div class="companyPanel" id="company">');
  out=out.replace('<div class="projects">','<div class="projects" id="projects">');
  out=out.replace('<div class="portfolioHero">','<div class="portfolioHero" id="portfolio">');

  // Add the missing strategic layer: what MMW actually does beyond construction.
  if(!out.includes('id="mmw-model"')){
    const model=`
<section id="mmw-model" class="vm-model">
  <div class="vm-model-head">
    <div class="eyebrow">02 / MMW OPERATING MODEL</div>
    <h2>DEVELOPER · ORGANIZER · PROJECT MANAGER · OPERATOR</h2>
    <p>MMW-COMPANY превращает идею, объект или бизнес-задачу в управляемую систему проекта: с рынком, моделью, экономикой, инвестициями, реализацией и коммерциализацией.</p>
  </div>
  <div class="vm-model-grid">
    <article><span>01</span><b>DEVELOPER</b><small>формируем продукт, концепцию и архитектуру проекта</small></article>
    <article><span>02</span><b>ORGANIZER</b><small>собираем участников, ресурсы, подрядчиков и партнёров</small></article>
    <article><span>03</span><b>PROJECT MANAGER</b><small>управляем сроками, бюджетом, решениями и контрольными точками</small></article>
    <article><span>04</span><b>OPERATOR</b><small>проектируем процессы, продажи, сервис и дальнейшую эксплуатацию</small></article>
  </div>
</section>`;
    out=out.replace('<footer class="footer">',model+'\n<footer class="footer">');
  }

  // Add a concise commercial CTA/contact block.
  if(!out.includes('id="contact"')){
    const contact=`
<section id="contact" class="vm-contact">
  <div class="vm-contact-head">
    <div class="eyebrow">06 / CONTACT</div>
    <h2>START A PROJECT</h2>
    <p>Есть идея, объект, бизнес-направление или инвестиционная задача? Начнём с короткого разговора и определим, какой контур проекта нужен именно вам.</p>
  </div>
  <div class="vm-contact-grid">
    <a class="vm-contact-card" href="mailto:itimchenko00@gmail.com"><span>01</span><b>BUSINESS PROJECT</b><small>новый проект — от идеи до бизнес-модели и коммерческой упаковки</small></a>
    <a class="vm-contact-card" href="mailto:itimchenko00@gmail.com"><span>02</span><b>PROJECT DEVELOPMENT</b><small>существующая идея, объект или направление — превращаем в систему</small></a>
    <a class="vm-contact-card" href="mailto:itimchenko00@gmail.com"><span>03</span><b>PARTNERSHIP</b><small>земля, капитал, компетенции, реализация и операционное партнёрство</small></a>
  </div>
  <a class="vm-contact-mail" href="mailto:itimchenko00@gmail.com">itimchenko00@gmail.com <strong>→</strong></a>
</section>`;
    out=out.replace('<footer class="footer">',contact+'\n<footer class="footer">');
  }

  // UX and responsive polish. This is additive: the protected Visual Master layout remains intact.
  out=out.replace('</style>','
<style>
html{scroll-padding-top:62px}body{background:#01070b}.site{box-shadow:0 0 0 1px rgba(215,168,63,.08),0 30px 100px rgba(0,0,0,.28)}
.top{box-shadow:0 8px 25px rgba(0,0,0,.14)}.brand{white-space:nowrap}.brand .mark{transition:transform .35s ease,box-shadow .35s ease}.brand:hover .mark{transform:rotate(135deg);box-shadow:0 0 18px rgba(240,202,112,.18)}
.nav a{position:relative;padding:20px 0}.nav a:after{content:"";position:absolute;left:0;right:100%;bottom:14px;height:1px;background:var(--gold2);transition:right .25s ease}.nav a:hover:after{right:0}
.btn{transition:background .2s ease,color .2s ease,transform .2s ease,box-shadow .2s ease}.btn:hover{background:var(--gold);color:#071018;transform:translateY(-1px);box-shadow:0 8px 22px rgba(215,168,63,.14)}
.methodCard,.project,.requestCard,.standardBox,.vm-model-grid article,.vm-contact-card{transition:transform .22s ease,border-color .22s ease,background .22s ease}.methodCard:hover,.requestCard:hover,.vm-model-grid article:hover,.vm-contact-card:hover{transform:translateY(-3px);border-color:rgba(240,202,112,.7);background:#0a202a}.project:hover{z-index:2}.project:hover img{transform:scale(1.04);opacity:.95}.project img{transition:transform .45s ease,opacity .35s ease}
.companyPanel,.chain,.method,.standard,.portfolioHero,.partner{scroll-margin-top:62px}.vm-model{border-top:1px solid var(--line);background:linear-gradient(135deg,#03121a,#020b11);padding:30px 28px 32px;position:relative;overflow:hidden}.vm-model:after{content:"MMW / OPERATING SYSTEM";position:absolute;right:22px;top:24px;color:rgba(240,202,112,.09);font:600 48px 'Barlow Condensed';letter-spacing:.08em}.vm-model-head{max-width:820px;position:relative;z-index:2}.vm-model h2{font-size:31px;line-height:.95;margin:6px 0 9px}.vm-model-head p{color:#aeb8b9;font-size:9px;line-height:1.55;max-width:700px}.vm-model-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:22px;position:relative;z-index:2}.vm-model-grid article{border:1px solid var(--line);padding:16px 14px;min-height:125px;background:linear-gradient(150deg,#09202a,#031017)}.vm-model-grid span{display:block;color:var(--gold2);font:600 10px 'Barlow Condensed'}.vm-model-grid b{display:block;font:600 16px 'Barlow Condensed';margin-top:9px}.vm-model-grid small{display:block;color:#929d9f;font-size:7px;line-height:1.45;margin-top:6px}
.vm-contact{border-top:1px solid var(--line);background:#020c12;padding:34px 28px 30px;position:relative;overflow:hidden}.vm-contact:before{content:"CONTACT / MMW-COMPANY";position:absolute;right:25px;top:24px;color:rgba(240,202,112,.12);font:700 46px 'Barlow Condensed';letter-spacing:.06em}.vm-contact-head{max-width:700px;position:relative;z-index:2}.vm-contact h2{font-size:34px;line-height:.95;margin:6px 0 9px}.vm-contact-head p{font-size:9px;line-height:1.55;color:#aeb7b8;max-width:620px}.vm-contact-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:22px 0 18px;position:relative;z-index:2}.vm-contact-card{display:block;border:1px solid var(--line);background:linear-gradient(145deg,#09202a,#031018);padding:15px;min-height:112px}.vm-contact-card span{display:block;color:var(--gold2);font:600 10px 'Barlow Condensed'}.vm-contact-card b{display:block;font:600 15px 'Barlow Condensed';margin-top:8px}.vm-contact-card small{display:block;color:#929d9f;font-size:7px;line-height:1.45;margin-top:5px}.vm-contact-mail{display:inline-flex;align-items:center;gap:22px;border:1px solid var(--gold);padding:12px 16px;color:var(--gold2);font:600 12px 'Barlow Condensed';letter-spacing:.04em;position:relative;z-index:2}.vm-contact-mail strong{font-size:17px}
@media(max-width:1050px){.vm-model-grid{grid-template-columns:repeat(2,1fr)}.vm-contact-grid{grid-template-columns:1fr 1fr}.vm-contact-card:last-child{grid-column:1/-1}}
@media(max-width:650px){html{scroll-padding-top:54px}.top{height:54px}.brand small{display:none}.vm-model{padding:27px 18px 28px}.vm-model:after,.vm-contact:before{font-size:28px;top:14px;right:15px}.vm-model h2{font-size:27px;max-width:330px}.vm-model-grid{grid-template-columns:1fr 1fr;gap:6px}.vm-model-grid article{min-height:132px;padding:13px 11px}.vm-model-grid b{font-size:14px}.vm-contact{padding:28px 18px}.vm-contact h2{font-size:30px}.vm-contact-grid{grid-template-columns:1fr;gap:6px}.vm-contact-card:last-child{grid-column:auto}.vm-contact-card{min-height:100px}}
@media(prefers-reduced-motion:reduce){*,*:before,*:after{scroll-behavior:auto!important;transition:none!important}}
</style>');

  return out;
}

let html=null;
try{
  html=completeVisualMaster(fs.readFileSync(HOME,'utf8'));
}catch(e){
  console.error('[MMW-VISUAL-MASTER] homepage read failed:',e.message);
}

express.response.send=function(body){
  const req=this.req;
  if(html && req && req.method==='GET' && (req.path==='/' || req.path==='/index.html')) return originalSend.call(this,html);
  return originalSend.call(this,body);
};
