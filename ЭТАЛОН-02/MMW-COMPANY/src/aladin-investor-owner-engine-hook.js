const fs=require('fs');
const path=require('path');
const express=require('express');
const ENGINE_FILE=path.join(__dirname,'..','projects','ALADIN','website','aladin-investor-owner-engine.html');
const ALADIN_FILE=path.resolve(path.join(__dirname,'..','projects','ALADIN','website','aladin-presentation-suite.html'));
const CARPATHIA_FILE=path.resolve(path.join(__dirname,'..','projects','CARPATHIA','website','carpathia-compact.html'));
const CARPATHIA_CATALOG_FILE=path.resolve(path.join(__dirname,'..','projects','CARPATHIA','website','carpathia-catalog.html'));
const PROJECT_FILES=new Set([
  ALADIN_FILE,
  path.resolve(path.join(__dirname,'..','projects','NEXUS-WORK','website','nexus-work-presentation-suite.html')),
  path.resolve(path.join(__dirname,'..','projects','NEXUS-LOGISTICS','website','nexus-logistics-presentation-v2.html')),
  CARPATHIA_FILE,
  path.resolve(path.join(__dirname,'..','projects','AGROHUB','website','agrohub-compact.html')),
  path.resolve(path.join(__dirname,'..','projects','ENERGY-PARK','website','energy-compact.html'))
]);
const originalSendFile=express.response.sendFile;
const COMMUNICATION=`<section id="communication" class="mmwCommunication"><style id="mmw-communication-style">.mmwCommunication{margin:30px 0 0;padding:0}.mmwCommunication .mmwCommBox{border:1px solid var(--line,#293943);border-radius:18px;background:linear-gradient(145deg,#101e26,#0a1218);padding:34px 28px}.mmwCommunication .mmwCommEyebrow{color:var(--accent2,#f1d894);font-size:10px;font-weight:900;letter-spacing:.2em;text-transform:uppercase;margin-bottom:8px}.mmwCommunication h2{font:700 clamp(34px,5vw,58px)/1.05 Georgia,serif;margin:0 0 10px;color:var(--text,#f4f1e9)}.mmwCommunication h2 em{color:var(--accent,#d7ad59);font-style:normal}.mmwCommunication p{color:var(--muted,#aeb9bd);max-width:760px;margin:0 0 24px;font-size:16px}.mmwCommunication .mmwCommGrid{display:grid;grid-template-columns:1fr auto;gap:22px;align-items:end}.mmwCommunication .mmwCommLabel{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--accent2,#f1d894);font-weight:900;margin-bottom:6px}.mmwCommunication .mmwCommTitle{font-size:22px;font-weight:800;color:var(--text,#f4f1e9);margin-bottom:7px}.mmwCommunication .mmwCommText{color:var(--muted,#aeb9bd);max-width:720px}.mmwCommunication .mmwCommButton{display:inline-flex;align-items:center;justify-content:center;white-space:nowrap;padding:12px 16px;border:1px solid var(--accent,#d7ad59);border-radius:10px;background:linear-gradient(135deg,var(--accent2,#f1d894),var(--accent,#d7ad59));color:#111;text-decoration:none;font-weight:900}.mmwCommunication .mmwCommButton:hover{filter:brightness(1.05)}@media(max-width:700px){.mmwCommunication .mmwCommGrid{grid-template-columns:1fr}.mmwCommunication .mmwCommButton{width:100%}.mmwCommunication .mmwCommBox{padding:25px 20px}}</style><div class="mmwCommBox"><div class="mmwCommEyebrow">Коммуникация</div><h2>Работаем вместе. <em>Строим проекты.</em></h2><p>Если вы хотите работать с MMW-COMPANY, присоединиться к проекту или предложить свою экспертизу — расскажите о себе.</p><div class="mmwCommGrid"><div><div class="mmwCommLabel">MMW-COMPANY</div><div class="mmwCommTitle">Вакансии и партнёрство</div><div class="mmwCommText">Мы формируем проектные команды под конкретные задачи: управление, финансы, строительство, девелопмент, продажи, маркетинг, IT, логистика и другие направления.<br><br>Открытые позиции, требования и условия сотрудничества будут опубликованы здесь отдельно.</div></div><a class="mmwCommButton" href="/#contact">Связаться с MMW-COMPANY →</a></div></div></section>`;

function carpathiaCatalogFragment(catalog){
  const section=catalog.match(/<section id="catalog"[\s\S]*?<\/section>/i)?.[0]||'';
  const styles=[...catalog.matchAll(/<style[\s\S]*?<\/style>/gi)].map(m=>m[0]).join('');
  return styles+section;
}

if(!express.response.__mmwAladinInvestorOwnerPatched){
  express.response.__mmwAladinInvestorOwnerPatched=true;
  express.response.sendFile=function(file,...args){
    const resolved=path.resolve(String(file));
    if(PROJECT_FILES.has(resolved)){
      try{
        let html=fs.readFileSync(resolved,'utf8');
        if(resolved===ALADIN_FILE){
          const engine=fs.readFileSync(ENGINE_FILE,'utf8');
          html=html.replace(/<section id="aladin-investor-owner-engine">[\s\S]*?<\/section>/gi,'');
          html=html.replace(/<section id="finance">[\s\S]*?<\/section>/gi,'');
          if(!html.includes('id="aladin-investor-owner-engine"')){
            if(html.includes('</main>')) html=html.replace('</main>',engine+'</main>');
            else if(html.includes('</body>')) html=html.replace('</body>',engine+'</body>');
            else html+=engine;
          }
        }
        if(resolved===CARPATHIA_FILE){
          const catalog=fs.readFileSync(CARPATHIA_CATALOG_FILE,'utf8');
          const fragment=carpathiaCatalogFragment(catalog);
          html=html.replace(/<section id="catalog"[\s\S]*?<\/section>/gi,'');
          html=html.replace(/<script id="mmw-carpathia-filters">[\s\S]*?<\/script>/gi,'');
          if(!html.includes('id="catalog"')){
            if(html.includes('</main>')) html=html.replace('</main>',fragment+'</main>');
            else if(html.includes('</body>')) html=html.replace('</body>',fragment+'</body>');
            else html+=fragment;
          }
        }
        html=html.replace(/<section id="communication"[\s\S]*?<\/section>/gi,'');
        if(html.includes('</main>')) html=html.replace('</main>',COMMUNICATION+'</main>');
        else if(html.includes('</body>')) html=html.replace('</body>',COMMUNICATION+'</body>');
        else html+=COMMUNICATION;
        this.type('html');
        return this.send(html);
      }catch(e){console.error('[MMW-FACTORY-INJECT]',e.stack||e.message)}
    }
    return originalSendFile.apply(this,[file,...args]);
  };
}
