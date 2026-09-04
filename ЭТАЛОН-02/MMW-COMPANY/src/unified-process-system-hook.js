const express=require('express');
const originalSend=express.response.send;

const stages=[
  {key:'DIAGNOSE',title:'Диагностика',label:'PROJECT BRIEF',items:['Задача','Активы','Ограничения','Цели'],out:'PROJECT BRIEF'},
  {key:'CONCEPT',title:'Концепция',label:'PROJECT CONCEPT',items:['IDEA','PRODUCT','POSITIONING','VALUE'],out:'PROJECT CONCEPT'},
  {key:'MARKET',title:'Исследование',label:'MARKET STRATEGY',items:['RESEARCH','MARKET','COMPETITORS','STRATEGY'],out:'MARKET STRATEGY'},
  {key:'ECONOMY',title:'Экономика',label:'ECONOMIC MODEL',items:['BUSINESS MODEL','REVENUE','FINANCIAL MODEL','KPI','SCENARIOS'],out:'ECONOMIC MODEL'},
  {key:'SYSTEM',title:'Система',label:'OPERATING SYSTEM',items:['TEAM','FLOW','MANAGEMENT','CONTROL'],out:'OPERATING SYSTEM'},
  {key:'PACKAGE',title:'Упаковка',label:'PROJECT PACKAGE',items:['DOCUMENTS','SALES','INVESTMENT','PRESENTATION'],out:'PROJECT PACKAGE'},
  {key:'LAUNCH',title:'Launch',label:'ACTIVE PROJECT',items:['ROADMAP','MILESTONES','CONTROL','LAUNCH'],out:'ACTIVE PROJECT'}
];

function unifiedSection(){
  const tabs=stages.map((s,i)=>`<button class="pds-tab${i===0?' active':''}" type="button" data-stage="${s.key}"><span>${s.key}</span><strong>${s.title}</strong></button>`).join('');
  const panels=stages.map((s,i)=>`<div class="pds-panel${i===0?' active':''}" data-panel="${s.key}"><div class="pds-copy"><span class="pds-kicker">${s.key}</span><h3>${s.title}</h3><p class="pds-label">${s.label}</p><div class="pds-items">${s.items.map(x=>`<span>${x}</span>`).join('')}</div></div><div class="pds-flow"><div class="pds-node">INPUT</div><div class="pds-line"></div><div class="pds-core">${s.items.slice(0,3).map(x=>`<span>${x}</span>`).join('')}</div><div class="pds-line"></div><div class="pds-node output">OUTPUT<strong>${s.out}</strong></div></div></div>`).join('');
  return `<section id="system" class="pds-section"><span id="process" class="pds-anchor"></span><div class="wrap"><div class="head"><div><div class="eyebrow">PROJECT DEVELOPMENT SYSTEM</div><h2>Одна задача. <em>Полная архитектура.</em></h2></div><p>Единый интерактивный путь от исходной задачи до готового проекта. Каждый этап формирует результат для следующего.</p></div><div class="pds"><div class="pds-tabs">${tabs}</div><div class="pds-stage">${panels}</div><div class="pds-footer"><span>INPUT → ARCHITECTURE → OUTPUT</span><span>PROJECT DEVELOPMENT SYSTEM</span></div></div></div></section>`;
}

const css=`<style id="pds-style">.pds-section{position:relative}.pds-anchor{position:absolute;top:-84px}.pds{border:1px solid var(--l);border-radius:20px;overflow:hidden;background:linear-gradient(145deg,var(--p2),var(--p));box-shadow:0 20px 70px #00000024}.pds-tabs{display:grid;grid-template-columns:repeat(7,1fr);border-bottom:1px solid var(--l)}.pds-tab{appearance:none;border:0;border-right:1px solid var(--l);background:transparent;color:var(--m);padding:18px 10px 16px;text-align:left;cursor:pointer;min-height:76px}.pds-tab:last-child{border-right:0}.pds-tab span{display:block;font-size:9px;letter-spacing:.14em;font-weight:800;margin-bottom:6px}.pds-tab strong{font:700 13px Manrope;color:var(--t)}.pds-tab.active{background:#d8b56b0d;box-shadow:inset 0 -2px var(--g)}.pds-tab.active span,.pds-tab.active strong{color:var(--g2)}.pds-stage{min-height:320px}.pds-panel{display:none;grid-template-columns:.8fr 1.2fr;gap:35px;padding:34px}.pds-panel.active{display:grid;animation:pdsIn .28s ease}.pds-copy{display:flex;flex-direction:column;justify-content:center}.pds-kicker{color:var(--g);font-size:10px;letter-spacing:.18em;font-weight:800}.pds-copy h3{font-size:36px;line-height:1.05;margin:9px 0 4px}.pds-label{color:var(--g2);font:700 13px Manrope;letter-spacing:.04em;margin:0 0 20px}.pds-items{display:flex;gap:7px;flex-wrap:wrap}.pds-items span{border:1px solid var(--l);border-radius:999px;padding:6px 9px;color:var(--m);font-size:10px}.pds-flow{display:flex;align-items:center;justify-content:center;gap:10px}.pds-node,.pds-core{border:1px solid var(--l);border-radius:12px;padding:15px 12px;text-align:center;min-width:92px;color:var(--m);font-size:9px;letter-spacing:.13em}.pds-node.output{color:var(--g)}.pds-node strong{display:block;color:var(--t);font:700 12px Manrope;letter-spacing:0;margin-top:6px}.pds-core{display:flex;flex-direction:column;gap:8px;min-width:145px;background:#08120f}.pds-core span{color:var(--g2);font-size:10px;letter-spacing:.08em}.pds-line{height:1px;flex:1;background:linear-gradient(90deg,transparent,var(--g),transparent);min-width:18px}.pds-footer{display:flex;justify-content:space-between;gap:20px;border-top:1px solid var(--l);padding:13px 18px;color:var(--m);font-size:9px;letter-spacing:.13em}.pds-footer span:last-child{color:var(--g)}@keyframes pdsIn{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}@media(max-width:950px){.pds-tabs{grid-template-columns:repeat(4,1fr)}.pds-panel{grid-template-columns:1fr}.pds-flow{min-height:170px}}@media(max-width:600px){.pds-tabs{grid-template-columns:1fr 1fr}.pds-tab{min-height:65px}.pds-panel{padding:24px 18px}.pds-copy h3{font-size:29px}.pds-flow{gap:5px}.pds-node{min-width:70px;padding:12px 6px}.pds-core{min-width:105px}.pds-footer{display:block}.pds-footer span{display:block;margin:4px 0}}</style>`;
const js=`<script id="pds-script">(()=>{const root=document.querySelector('.pds');if(!root)return;root.querySelectorAll('.pds-tab').forEach(b=>b.addEventListener('click',()=>{const key=b.dataset.stage;root.querySelectorAll('.pds-tab').forEach(x=>x.classList.toggle('active',x===b));root.querySelectorAll('.pds-panel').forEach(x=>x.classList.toggle('active',x.dataset.panel===key));}));})();</script>`;

express.response.send=function(body){
  if(typeof body==='string'&&body.includes('</body>')&&body.includes('MMW-COMPANY')){
    body=body.replace(/<section id="system">[\s\S]*?<\/section>\s*<section id="products">/,unifiedSection()+'<section id="products">');
    body=body.replace(/<section id="process">[\s\S]*?<\/section>/,'');
    body=body.replace('</head>',css+'</head>');
    body=body.replace('</body>',js+'</body>');
  }
  return originalSend.call(this,body);
};
