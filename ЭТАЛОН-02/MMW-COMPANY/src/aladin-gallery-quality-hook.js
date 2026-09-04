const express=require('express');
const originalSend=express.response.send;

// Factory-only ALADIN gallery refinement.
// PREMIUM GRAPHITE is intentionally untouched: it is the visual reference.
// The other five styles receive coherent 5-shot sequences:
// facade -> exterior/detail -> kitchen/living -> interior -> bathroom/detail.
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

function improve(body,req){
  if(typeof body!=='string'||!body.includes('</body>'))return body;
  if(!req||!/^\/aladin(?:\/|$)/.test(req.path||''))return body;
  for(const[a,b]of Object.entries(swaps))body=body.split(`photos/${a}/pexels-photo-${a}.jpeg`).join(`photos/${b}/pexels-photo-${b}.jpeg`);
  return body;
}

express.response.send=function(body){return originalSend.call(this,improve(body,this.req))};
