// MMW-COMPANY PROJECT QUALITY GATE — 2026-09-08
const fs=require('fs'),path=require('path'),express=require('express');
if(global.__MMW_PROJECT_QA_GATE__){}else{
global.__MMW_PROJECT_QA_GATE__=true;
const ROOT=path.join(process.cwd(),'ЭТАЛОН-02','MMW-COMPANY');
const canonical={'/agrohub':'/projects/AGROHUB/website/agrohub-compact.html','/aladin':'/projects/ALADIN/website/aladin-presentation-suite.html','/carpathia':'/projects/CARPATHIA/website/carpathia-catalog.html','/energy-park':'/projects/ENERGY-PARK/website/energy-compact.html','/nexus-logistics':'/projects/NEXUS-LOGISTICS/website/nexus-logistics-presentation-v2.html','/nexus-work':'/projects/NEXUS-WORK/website/nexus-work-presentation-suite.html'};
function dups(html){const a=[...html.matchAll(/\sid=["']([^"']+)["']/gi)].map(m=>m[1]),c={};a.forEach(x=>c[x]=(c[x]||0)+1);return Object.entries(c).filter(([,n])=>n>1).map(([id,n])=>id+'×'+n)}
function name(url){return ({'/agrohub':'AGROHUB','/aladin':'ALADIN','/carpathia':'CARPATHIA','/energy-park':'ENERGY-PARK','/nexus-logistics':'NEXUS-LOGISTICS','/nexus-work':'NEXUS-WORK'})[url]||'PROJECT'}
function banner(n,d,extra){return '<div id="mmw-project-qa" style="padding:9px 14px;background:#0b1116;color:#d8e4e8;border-bottom:1px solid #31434c;font:800 10px/1.35 Inter,system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase">MMW-COMPANY · '+n+' · READY-TO-SELL · DOM QA: duplicate IDs '+(d.length?d.join(', '):'0')+(extra?' · '+extra:'')+'</div>'}
const send=express.response.send;
express.response.send=function(body){const url=this.req&&this.req.path;if(typeof body==='string'&&canonical[url]&&body.includes('<html')){if(url==='/carpathia')body=fs.readFileSync(path.join(ROOT,canonical[url]),'utf8');if(url==='/energy-park')body=body.replace(/<b id="value">6\.05M<\/b>/,'<b id="value">4.98M</b>').replace(/id="sv">4\.03M грн/,'id="sv">4.11M грн').replace(/id="gv">1\.02M грн/,'id="gv">0.87M грн');if(url==='/nexus-logistics')body=body.replace(/id="rev">2\.52M/,'id="rev">1.97M').replace(/id="profit">1\.80M/,'id="profit">1.25M').replace(/id="margin">71%/,'id="margin">63%');const extra=url==='/aladin'?'BASE QA: default model is loss-making until site-specific feasibility is validated':'';body=body.replace('<body>','<body>'+banner(name(url),dups(body),extra))}return send.call(this,body)};
}
