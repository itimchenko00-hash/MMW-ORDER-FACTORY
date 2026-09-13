const fs=require('fs');
const path=require('path');
const site=path.join(process.cwd(),'ЭТАЛОН-03/MMW-COMPANY/site');
const files=[];
function walk(dir){for(const name of fs.readdirSync(dir)){const p=path.join(dir,name);const st=fs.statSync(p);if(st.isDirectory())walk(p);else if(/\.html$/i.test(name))files.push(p)}}
walk(site);
function clean(html,file){
  const route=file.replace(site,'').replace(/\\/g,'/');
  html=html.replace(/<style[^>]*data-(?:etalon03|public-runtime)[^>]*>[\s\S]*?<\/style>/gi,'');
  html=html.replace(/FACTORY VISUAL MASTER 01/gi,'');
  html=html.replace(/FACTORY INFOGRAPHIC/gi,'BUSINESS SYSTEM');
  html=html.replace(/FACTORY THEMATIC MEDIA/gi,'');
  html=html.replace(/ONE SYSTEM · MULTIPLE PROJECT OUTPUTS/gi,'ONE SYSTEM · PROJECT PORTFOLIO');
  html=html.replace(/\bFactory\b/gi,'MMW methodology');
  html=html.replace(/ETALON[-–—]?03\s*[·•-]?\s*/gi,'');
  html=html.replace(/READY[-–—]?TO[-–—]?SELL BUSINESS PROJECT/gi,'BUSINESS PROJECT DEVELOPMENT');
  html=html.replace(/Пять отраслевых направлений/gi,'Шесть отраслевых направлений');
  html=html.replace(/PACKAGE READY\s*·\s*75%/gi,'CONCEPT PACKAGE · READY FOR REVIEW');
  html=html.replace(/Отдельные состояния Factory, Verified, Conserved, Approved и Production\./gi,'Отдельные статусы проекта и проверяемые этапы разработки.');
  html=html.replace(/Что нужно получить для Financial Master V2/gi,'Что необходимо подтвердить для финансовой модели');
  html=html.replace(/DEVELOP\s*→\s*TEST\s*→\s*VERIFY\s*→\s*CONSERVE\s*→\s*APPROVE\s*→\s*PRODUCTION/gi,'MARKET → MODEL → ECONOMICS → OPERATIONS → CAPITAL → SALES → IMPLEMENTATION');
  html=html.replace(/<section\b[^>]*>[\s\S]*?CONTROL ARCHITECTURE[\s\S]*?<\/section>/gi,'');
  html=html.replace(/<section\b[^>]*>[\s\S]*?READY-TO-SELL 100[\s\S]*?<\/section>/gi,'');
  html=html.replace(/<section\b[^>]*>[\s\S]*?READY-TO-SELL\s*100[\s\S]*?<\/section>/gi,'');
  if(/^\/projects\//i.test(route)){
    const markers=[/FINANCIAL MASTER\s*\/\s*CONCEPT\s+SCENARIO/i,/FINANCIAL MASTER\s*·\s*V1/i,/MMW PROJECT MASTER\s*[·•-]\s*V1/i,/REWORK REQUIRED/i,/SCENARIO COMPLETE/i];
    for(const marker of markers){const idx=html.search(marker);if(idx>=0){const mainEnd=html.toLowerCase().lastIndexOf('</main>');if(mainEnd>idx)html=html.slice(0,idx)+html.slice(mainEnd)}}
  }
  const commercial=html.search(/(?:MMW-COMPANY\s*[·•-]\s*)?COMMERCIAL MASTER/i);
  if(commercial>=0){const body=html.toLowerCase().lastIndexOf('</body>');if(body>commercial)html=html.slice(0,commercial)+html.slice(body)}
  html=html.replace(/READY-TO-SELL\s*100/gi,'PROJECT READINESS');
  html=html.replace(/\bFINANCIAL MASTER\b/gi,'FINANCIAL MODEL');
  html=html.replace(/\bPROJECT MASTER\b/gi,'BUSINESS PROJECT');
  html=html.replace(/\bREWORK REQUIRED\b/gi,'REVISION REQUIRED');
  html=html.replace(/\bSCENARIO COMPLETE\b/gi,'CONCEPT REVIEW COMPLETE');
  html=html.replace(/Financial Master V2/gi,'financial model');
  html=html.replace(/Следующий расчёт[^<.!?]*(?:\.|!|\?)/gi,'Следующий расчётный этап определяется после получения подтверждённых исходных данных.');
  html=html.replace(/\s{2,}/g,' ');
  return html;
}
let changed=0;
for(const file of files){const before=fs.readFileSync(file,'utf8');const after=clean(before,file);if(after!==before){fs.writeFileSync(file,after);changed++;}}
console.log(`Public sanitation complete: ${changed}/${files.length} HTML files updated.`);
