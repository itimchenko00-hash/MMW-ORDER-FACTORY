// MMW-COMPANY — unified project shell
// FACTORY-only presentation layer. Does not alter project source content.
const express=require('express');
const originalSend=express.response.send;
const PROJECTS={
  '/aladin':{name:'ALADIN RESIDENCE',kind:'RESIDENTIAL DEVELOPMENT',file:'/finance',color:'#d8b56b'},
  '/finance':{name:'ALADIN FINANCIAL SYSTEM',kind:'FINANCE / ENGINE',file:'/aladin',color:'#d8b56b'},
  '/nexus-work':{name:'NEXUS WORK',kind:'FLEXIBLE BUSINESS HUB',file:'/nexus-logistics',color:'#7fc8b5'},
  '/nexus-logistics':{name:'NEXUS LOGISTICS',kind:'LOGISTICS INFRASTRUCTURE',file:'/nexus-work',color:'#e0a86b'},
  '/carpathia':{name:'CARPATHIA ECO LODGE',kind:'HOSPITALITY / ECO TOURISM',file:'/agrohub',color:'#8fc59b'},
  '/agrohub':{name:'AGROHUB',kind:'AGRO / PROCESSING',file:'/energy-park',color:'#c9b56a'},
  '/energy-park':{name:'ENERGY PARK',kind:'ENERGY / PRODUCTION',file:'/projects',color:'#8bb8d8'}
};
const nav=[['ALADIN','/aladin'],['NEXUS WORK','/nexus-work'],['NEXUS LOGISTICS','/nexus-logistics'],['CARPATHIA','/carpathia'],['AGROHUB','/agrohub'],['ENERGY PARK','/energy-park']];
function shell(p){return `<style id="mmw-project-shell">.mmwProjectShell{position:sticky;top:0;z-index:9999;background:rgba(4,12,16,.94);backdrop-filter:blur(14px);border-bottom:1px solid rgba(216,181,107,.28);font:11px/1.2 Arial,sans-serif}.mmwProjectShell .inner{max-width:1180px;margin:auto;padding:9px 18px;display:flex;align-items:center;gap:14px}.mmwProjectShell .brand{font-weight:800;letter-spacing:.08em;color:#f4f7f3;white-space:nowrap}.mmwProjectShell .brand b{color:${p.color}}.mmwProjectShell .kind{color:#8f9d99;font-size:9px;letter-spacing:.08em;text-transform:uppercase}.mmwProjectShell .nav{margin-left:auto;display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end}.mmwProjectShell a{color:#c8d1cd;text-decoration:none;border:1px solid rgba(216,181,107,.18);padding:6px 8px;border-radius:6px}.mmwProjectShell a:hover{color:#fff;border-color:${p.color}}.mmwProjectShell .back{color:${p.color}}.mmwProjectShell .status{font-size:8px;color:#d8b56b;letter-spacing:.08em;border:1px solid rgba(216,181,107,.28);padding:6px 8px;border-radius:999px;white-space:nowrap}@media(max-width:760px){.mmwProjectShell .inner{display:block}.mmwProjectShell .kind{display:block;margin:4px 0 7px}.mmwProjectShell .nav{margin:0;justify-content:flex-start;overflow:auto;flex-wrap:nowrap}.mmwProjectShell .nav a{white-space:nowrap}.mmwProjectShell .status{display:none}}</style><div class="mmwProjectShell"><div class="inner"><a class="brand" href="/">MMW-<b>COMPANY</b></a><span class="kind">${p.kind}</span><span class="status">FACTORY · VALIDATION</span><nav class="nav"><a class="back" href="/">COMPANY</a>${nav.map(([n,u])=>`<a href="${u}">${n}</a>`).join('')}</nav></div></div>`}
express.response.send=function(body){
  try{
    const req=this.req;
    const key=Object.keys(PROJECTS).find(k=>req&&req.path===k);
    if(key && typeof body==='string' && /<html/i.test(body) && !body.includes('mmwProjectShell')){
      body=body.replace(/<body([^>]*)>/i,`<body$1>${shell(PROJECTS[key])}`);
    }
  }catch(e){console.error('[MMW-PROJECT-SHELL]',e.message)}
  return originalSend.call(this,body);
};
