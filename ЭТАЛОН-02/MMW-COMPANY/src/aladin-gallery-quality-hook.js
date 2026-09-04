const express=require('express');
const fs=require('fs');
const originalSend=express.response.send;
const originalSendFile=express.response.sendFile;

// Factory-only ALADIN gallery refinement.
// PREMIUM GRAPHITE is intentionally untouched: it is the visual reference.
// The other five styles receive coherent 5-shot sequences.
const swaps={
  // COMPACT URBAN
  '12008034':'9976121','16059247':'16880297','17274555':'14705335','19026583':'10750999','16880297':'19857263',
  // SCANDINAVIAN
  '35018313':'6547200','31895796':'33640816','8251299':'7745939','6890403':'13549900','33838523':'10886585',
  // CONTEMPORARY BRICK
  '15522429':'15522429','17463572':'7028105','25857391':'7214736','7028105':'7031212','31057548':'15461833',
  // MEDITERRANEAN
  '10135256':'10135256','38791657':'17861664','5223143':'37030520','37692742':'5192377','23880098':'4800174',
  // MODERN MINIMAL
  '30484316':'30484316','30278097':'8134820','19916702':'6032398','11018249':'7045361','6588594':'7546552'
};

function isAladin(req){return !!req&&/^\/aladin(?:\/|$)/.test(req.path||'')}
function improve(body,req){
  if(!isAladin(req))return body;
  if(typeof body!=='string')return body;

  // Two-pass replacement prevents target IDs from being replaced again.
  const entries=Object.entries(swaps).filter(([a,b])=>a!==b);
  const token=i=>`__ALADIN_GALLERY_SWAP_${i}__`;
  for(let i=0;i<entries.length;i++){
    const[a]=entries[i];
    // Match all common Pexels URL forms, not only one exact filename shape.
    body=body.split(`photos/${a}/pexels-photo-${a}`).join(token(i));
    body=body.split(`photos/${a}/`).join(`photos/${token(i)}/`);
    body=body.split(`pexels-photo-${a}`).join(token(i));
  }
  for(let i=0;i<entries.length;i++){
    const[,b]=entries[i];
    body=body.split(token(i)).join(`photos/${b}/pexels-photo-${b}`);
  }
  return body;
}

express.response.send=function(body){return originalSend.call(this,improve(body,this.req))};

// Some Express versions/routes use sendFile instead of send. Read the ALADIN
// HTML through the same Factory transform so the published route definitely changes.
express.response.sendFile=function(filePath,options,callback){
  if(isAladin(this.req)&&typeof filePath==='string'&&/\.html?$/i.test(filePath)){
    try{
      const html=fs.readFileSync(filePath,'utf8');
      return originalSend.call(this,improve(html,this.req));
    }catch(e){
      if(typeof callback==='function')return callback(e);
      throw e;
    }
  }
  return originalSendFile.call(this,filePath,options,callback);
};
