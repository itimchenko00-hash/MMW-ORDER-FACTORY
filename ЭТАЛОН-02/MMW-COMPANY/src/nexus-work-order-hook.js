// NEXUS WORK — final presentation ordering layer.
// Factory-only: reorders only the canonical NEXUS WORK HTML response.
const express=require('express');
const originalSend=express.response.send;
function reorder(body){
  if(typeof body!=='string'||!body.includes('NEXUS WORK')) return body;
  const markers=[
    '<section class="section nx-enh nx-reveal" id="nexus-product">',
    '<section class="section nx-enh nx-reveal" id="nexus-visuals">',
    '<section class="section nx-enh nx-reveal" id="nexus-scenarios">',
    '<section class="section nx-enh nx-reveal" id="nexus-network">',
    '<section class="section nx-cat" id="nexus-catalog">'
  ];
  const starts=markers.map(m=>body.indexOf(m));
  if(starts.some(x=>x<0)) return body;
  const sections={};
  for(let i=0;i<markers.length;i++){
    const start=starts[i];
    const end=body.indexOf('</section>',start);
    if(end<0) return body;
    sections[markers[i]]=body.slice(start,end+10);
  }
  for(const m of markers) body=body.replace(sections[m],'');
  const anchor='<section class="section"><div class="wrap"><div class="head"><div><div class="ey">03 / VALUE LOGIC</div>';
  const development='<section class="section" id="economics"><div class="wrap"><div class="head"><div><div class="ey">04 / DEVELOPMENT</div>';
  // SPACE SYSTEM → THEMATIC ENVIRONMENT → PRODUCT ARCHITECTURE → CATALOG.
  const spacePos=body.indexOf('</section>',body.indexOf('<section class="section" id="space">'));
  if(spacePos<0) return body;
  const flow=sections[markers[1]]+sections[markers[0]]+sections[markers[4]];
  body=body.slice(0,spacePos+10)+flow+body.slice(spacePos+10);
  const valueEnd=body.indexOf('</section>',body.indexOf(anchor));
  if(valueEnd>=0) body=body.slice(0,valueEnd+10)+sections[markers[2]]+body.slice(valueEnd+10);
  const devEnd=body.indexOf('</section>',body.indexOf(development));
  if(devEnd>=0) body=body.slice(0,devEnd+10)+sections[markers[3]]+body.slice(devEnd+10);
  return body;
}
express.response.send=function(body){return originalSend.call(this,reorder(body))};
