// VISUAL MASTER 01: serve the canonical MMW-COMPANY-PUBLIC homepage at the root route.
const fs=require('fs');
const path=require('path');
const express=require('express');
const originalSend=express.response.send;
const HOME=path.join(process.cwd(),'MMW-COMPANY-PUBLIC','index.html');

function completeVisualMaster(source){
  let out=source;

  // Restore the section anchors used by the fixed Visual Master navigation.
  out=out.replace('<div class="companyPanel">','<div class="companyPanel" id="company">');
  out=out.replace('<div class="projects">','<div class="projects" id="projects">');
  out=out.replace('<div class="portfolioHero">','<div class="portfolioHero" id="portfolio">');

  // The current Visual Master source has no CONTACT section. Add the missing
  // final block without changing the existing architecture, project cards,
  // imagery, or protected visual system.
  if(!out.includes('id="contact"')){
    const contact=`
<section id="contact" class="vm-contact">
  <div class="vm-contact-head">
    <div class="eyebrow">06 / CONTACT</div>
    <h2>START A PROJECT</h2>
    <p>Если у вас есть идея, объект, направление бизнеса или инвестиционная задача — MMW-COMPANY может подготовить проектную архитектуру, экономику и коммерческую упаковку.</p>
  </div>
  <div class="vm-contact-grid">
    <div class="vm-contact-card"><span>01</span><b>BUSINESS PROJECT</b><small>разработка нового проекта от идеи до готовой бизнес-модели</small></div>
    <div class="vm-contact-card"><span>02</span><b>PROJECT DEVELOPMENT</b><small>упаковка существующей идеи, объекта или направления в систему</small></div>
    <div class="vm-contact-card"><span>03</span><b>PARTNERSHIP</b><small>земля, инвестиции, компетенции, реализация и операционное партнёрство</small></div>
  </div>
  <a class="vm-contact-mail" href="mailto:itimchenko00@gmail.com">itimchenko00@gmail.com <strong>→</strong></a>
</section>`;
    out=out.replace('<footer class="footer">',contact+'\n<footer class="footer">');
    out=out.replace('</style>','
<style>
.vm-contact{border-top:1px solid var(--line);background:#020c12;padding:34px 28px 30px;position:relative;overflow:hidden}.vm-contact:before{content:"CONTACT / MMW-COMPANY";position:absolute;right:25px;top:24px;color:rgba(240,202,112,.12);font:700 46px "Barlow Condensed";letter-spacing:.06em}.vm-contact-head{max-width:620px}.vm-contact h2{font-size:34px;line-height:.95;margin:6px 0 9px}.vm-contact-head p{font-size:10px;line-height:1.55;color:#aeb7b8;max-width:560px}.vm-contact-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:22px 0 18px}.vm-contact-card{border:1px solid var(--line);background:linear-gradient(145deg,#09202a,#031018);padding:15px;min-height:105px}.vm-contact-card span{display:block;color:var(--gold2);font:600 10px "Barlow Condensed"}.vm-contact-card b{display:block;font:600 15px "Barlow Condensed";margin-top:8px}.vm-contact-card small{display:block;color:#929d9f;font-size:7px;line-height:1.45;margin-top:5px}.vm-contact-mail{display:inline-flex;align-items:center;gap:22px;border:1px solid var(--gold);padding:12px 16px;color:var(--gold2);font:600 12px "Barlow Condensed";letter-spacing:.04em}.vm-contact-mail strong{font-size:17px}@media(max-width:650px){.vm-contact{padding:28px 18px}.vm-contact:before{font-size:30px;top:15px}.vm-contact-grid{grid-template-columns:1fr}.vm-contact h2{font-size:30px}}
</style>');
  }
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
